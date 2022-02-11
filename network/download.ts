import { dirname } from "https://deno.land/std@0.123.0/path/mod.ts";
import { ensureDir } from "https://deno.land/std@0.123.0/fs/ensure_dir.ts";
import { writeAll } from "https://deno.land/std@0.123.0/streams/conversion.ts";

async function free(response: Response) {
  // consume response data to free up memory
  await response.arrayBuffer();
}

export type DownloadOptions = {
  createDirs?: boolean;
  onProgress?: (downloadedBytes: number, totalBytes: number) => void;
};

export async function download(
  url: string | Request | URL,
  outputPath: string,
  options?: DownloadOptions,
): Promise<void> {
  const response = await fetch(url);

  if (response.status !== 200) {
    await free(response);
    throw new Error(
      `Download failed: server returned code ${response.status}. URL: ${url}`,
    );
  }

  if (!response.body) {
    await free(response);
    throw new Error(
      `Download failed: body is null. URL: ${url}`,
    );
  }

  let downloadedBytes = 0;
  const totalBytes = parseInt(response.headers.get("content-length") ?? "", 10);

  if (options?.createDirs) await ensureDir(dirname(outputPath));

  const file = await Deno.create(outputPath);
  try {
    for await (const chunk of response.body) {
      downloadedBytes += chunk.length;
      options?.onProgress?.(downloadedBytes, totalBytes);
      await writeAll(file, chunk);
    }
  } finally {
    Deno.close(file.rid);
  }
}
