// Ported from https://github.com/deno-library/progress
// Copyright 2020 zfx. All rights reserved. MIT license.
import { bgGreen, bgWhite } from "https://deno.land/std@0.151.0/fmt/colors.ts";
import { writeAllSync } from "https://deno.land/std@0.151.0/streams/conversion.ts";
import { isWindows } from "https://deno.land/std@0.151.0/_util/os.ts";
import { ms } from "./ms.ts";

const encoder = new TextEncoder();

export interface ProgressBarOptions {
  title?: string;
  total?: number;
  width?: number;
  barWidth?: number;
  maxWidth?: number;
  complete?: string;
  preciseBar?: string[];
  incomplete?: string;
  clear?: boolean;
  interval?: number;
  display?: string;
  stream?: typeof Deno.stderr;
}

export class ProgressBar {
  stream: typeof Deno.stderr;
  title: string;
  total?: number;
  width?: number;
  barWidth: number;
  maxWidth?: number;
  complete: string;
  preciseBar: string[];
  incomplete: string;
  clear: boolean;
  interval: number;
  display: string;
  // states
  #isCompleted = false;
  #lastStr = "";
  #start = Date.now();
  #lastRender = 0;

  /**
   * Title, total, complete, incomplete, can also be set or changed in the render method
   *
   * @param title Progress bar title, default: ''
   * @param total total number of ticks to complete,
   * @param width deprecated in favor of barWidth; the displayed width of the progress, default: 50
   * @param barWidth new prop to replace width; the displayed width of the progress, default: 50
   * @param maxWidth maximum width of bar + text
   * @param complete completion character, default: colors.bgGreen(' '), can use any string
   * @param incomplete incomplete character, default: colors.bgWhite(' '), can use any string
   * @param clear  clear the bar on completion, default: false
   * @param interval  minimum time between updates in milliseconds, default: 16
   * @param display  What is displayed and display order, default: ':title :percent :bar :time :completed/:total'
   */
  constructor(
    {
      title = "",
      total,
      width = 50,
      barWidth = 50,
      maxWidth,
      complete = bgGreen(" "),
      incomplete = bgWhite(" "),
      preciseBar = [],
      clear = false,
      interval = 16,
      display = ":title :percent :bar :time :completed/:total",
      stream = Deno.stderr,
    }: ProgressBarOptions = {},
  ) {
    this.stream = stream;
    this.title = title;
    this.total = total;
    this.complete = complete;
    this.preciseBar = preciseBar.concat(complete);
    this.incomplete = incomplete;
    this.clear = clear;
    this.interval = interval;
    this.display = display;

    this.maxWidth = maxWidth;
    this.barWidth = Math.min(
      this.#ttyColumns,
      barWidth === 50 && !!width && width !== 50 ? width : barWidth,
    );

    Deno.addSignalListener("SIGINT", () => {
      this.end();
      Deno.exit();
    });
  }

  /**
   * "render" the progress bar
   *
   * - `completed` - completed value
   * - `options` - optional parameters
   *   - `title` - progress bar title
   *   - `total` - total number of ticks to complete
   *   - `complete` - completion character, If you want to change at a certain moment. For example, it turns red at 20%
   *   - `incomplete` - incomplete character, If you want to change at a certain moment. For example, it turns red at 20%
   */
  render(completed: number, options: {
    title?: string;
    total?: number;
    complete?: string;
    preciseBar?: string[];
    incomplete?: string;
  } = {}): void {
    if (this.#isCompleted || !this.#isTTY) return;

    if (completed < 0) {
      throw new Error("d must greater than or equal to 0");
    }

    const total = options.total ?? this.total ?? 100;
    const now = Date.now();
    const elapsed = now - this.#lastRender;
    if (elapsed < this.interval && completed < total) return;

    this.#lastRender = now;
    const time = ((now - this.#start) / 1000).toFixed(1) + "s";
    const formattedTime = ms(now - this.#start);
    const eta = completed == 0
      ? "-"
      : ((completed >= total)
        ? 0
        : (total / completed - 1) * (now - this.#start) / 1000).toFixed(1) +
        "s";

    const percent = ((completed / total) * 100).toFixed(2) + "%";

    // :title :percent :bar :formattedTime :time :eta :completed/:total
    let str = this.display
      .replace(":title", options.title ?? this.title)
      .replace(":formattedTime", formattedTime)
      .replace(":time", time)
      .replace(":eta", eta)
      .replace(":percent", percent)
      .replace(":completed", `${completed}`)
      .replace(":total", `${total}`);

    // compute the available space (non-zero) for the bar
    let availableSpace = Math.max(
      0,
      this.#ttyColumns - str.replace(":bar", "").length,
    );
    if (availableSpace && isWindows) availableSpace -= 1;

    const width = Math.min(this.barWidth, availableSpace);
    const finished = completed >= total;

    const preciseBar = options.preciseBar ?? this.preciseBar;
    const precision = preciseBar.length > 1;

    // :bar
    const completeLength = width * completed / total;
    const roundedCompleteLength = Math.floor(completeLength);

    let precise = "";
    if (precision) {
      const preciseLength = completeLength - roundedCompleteLength;
      precise = finished
        ? ""
        : preciseBar[Math.floor(preciseBar.length * preciseLength)];
    }

    const complete = new Array(roundedCompleteLength).fill(
      options.complete ?? this.complete,
    ).join("");
    const incomplete = new Array(
      Math.max(width - roundedCompleteLength - (precision ? 1 : 0), 0),
    ).fill(options.incomplete ?? this.incomplete).join("");

    str = str.replace(":bar", complete + precise + incomplete);

    // add spaces to cover up characters render from previous render
    str += " ".repeat(this.#ttyColumns);
    // barDiff counts control characters to render the color of the bar
    const barDiff = (complete.length + precise.length + incomplete.length) -
      width;
    // clips the bar + text at displayable width
    str = str.substring(0, this.#ttyColumns + barDiff);

    if (str !== this.#lastStr) {
      this.#hideCursor(str);
      this.#lastStr = str;
    }

    if (finished) this.end();
  }

  /**
   * end: end a progress bar.
   * No need to call in most cases, unless you want to end before 100%
   */
  end(): void {
    this.#isCompleted = true;
    if (this.clear) {
      this.#write("\r");
      this.#clearLine();
    } else {
      this.#breakLine();
    }
    this.#showCursor();
  }

  /**
   * interrupt the progress bar and write a message above it
   *
   * @param message The message to write
   */
  console(message: string | number): void {
    this.#clearLine();
    this.#hideCursor(`${message}`);
    this.#breakLine();
    this.#hideCursor(this.#lastStr);
  }

  get #isTTY() {
    return Deno.isatty(this.stream.rid);
  }

  get #ttyColumns(): number {
    let n = 100;

    try {
      n = Deno.consoleSize(this.stream.rid).columns;
    } catch {
      //
    }

    return this.maxWidth ? Math.min(n, this.maxWidth) : n;
  }

  #breakLine() {
    this.#write("\r\n");
  }

  #clearLine() {
    this.#write("\x1b[2K");
  }

  #hideCursor(msg: string) {
    this.#write(`\r${msg}\x1b[?25l`);
  }

  #showCursor() {
    this.#write("\x1b[?25h");
  }

  #write(msg: string) {
    writeAllSync(this.stream, encoder.encode(msg));
  }
}
