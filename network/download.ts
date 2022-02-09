import { writeAll } from "https://deno.land/std@0.123.0/streams/conversion.ts";

async function free(response: Response) {
  // consume response data to free up memory
  await response.arrayBuffer();
}

export async function download(
  url: string | Request | URL,
  outputPath: string,
  progressCallback?: (downloadedBytes: number, totalBytes: number) => void,
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

  const file = await Deno.create(outputPath);
  try {
    for await (const chunk of response.body) {
      downloadedBytes += chunk.length;
      progressCallback?.(downloadedBytes, totalBytes);
      await writeAll(file, chunk);
    }
  } finally {
    Deno.close(file.rid);
  }
}
