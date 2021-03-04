# subprocess

Usage:

```typescript
import * as subprocess from "https://deno.land/x/stdx/subprocess/mod.ts";
```

- [subprocess](#subprocess)
    - [output()](#output)
    - [stderrOutput()](#stderroutput)
    - [run()](#run)

### output()

Capture stdout output from a command.

```typescript
import * as subprocess from "https://deno.land/x/stdx/subprocess/mod.ts";

const stdout: string = await subprocess.output(["deno", "--version"]);
```

### stderrOutput()

Capture stderr output from a command.

```typescript
import * as subprocess from "https://deno.land/x/stdx/subprocess/mod.ts";

const stderr: string = await subprocess.stderrOutput(["deno", "--version"]);
```

### run()

Run a command.

```typescript
import * as subprocess from "https://deno.land/x/stdx/subprocess/mod.ts";

const { code, success } = await subprocess.run(["deno", "--version"]);
```

Run a command without printing to stdout and stderr.

```typescript
import * as subprocess from "https://deno.land/x/stdx/subprocess/mod.ts";

const result = await subprocess.run(["deno", "--version"], { stderr: "null", stdout: "null" });
```

Run a command with captured output.

```typescript
import * as subprocess from "https://deno.land/x/stdx/subprocess/mod.ts";

const result = await subprocess.run(["deno", "--version"], { stderr: "piped", stdout: "piped" });
const { code, success, stderr, stdout } = result
```
