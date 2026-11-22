// main.ts - news-image-20261122 entrypoint.
//
// The entry is one pre-built front-page image (entry.png). This program
// writes it byte for byte into the output directory, then reads the copy
// back and compares it with the bundled original, so every run produces
// exactly the same bytes.
//
// The image is the Sunday 22 November 2026 front page of "THE WORLD": a
// newspaper page typeset from verified news of Sunday 22 November, with
// editorial illustrations made for the three photo stories. All page text
// is set in real fonts, so no headline or caption can come out garbled.
// No network is used at run time; everything the program needs ships in
// this repo.
//
// EVENING EDITION: the five stories are the day's own outcomes, refreshed
// at 17:30 WIB from the morning draft: the COP31 final text dropping
// fossil fuels with the deal in the balance; Mexico capturing
// "El Chapo Isidro" in a Sinaloa raid; two more tankers hit off Oman on
// Saturday; the US and Israel weighing a new assault on Iran; a Russian
// drone strike on a Kyiv apartment block with at least 14 missing.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const bundledPath = join(scriptDir, "entry.png");

// make.fun runs the program with MAKEFUN_OUTPUT_DIR set; default to /output.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.png");

const image = readFileSync(bundledPath);
if (image.length === 0) {
  throw new Error("bundled image is empty");
}

// Guard the size the gate itself enforces. A front page is hundreds of
// kilobytes, so a tiny bundle means a truncated file, and anything over
// 1 MiB is refused by the gate outright. Fail here with a clear message
// instead of shipping a file the gate would reject.
const MIN_IMAGE_BYTES = 10 * 1024;
const MAX_IMAGE_BYTES = 1024 * 1024;
if (image.length < MIN_IMAGE_BYTES) {
  throw new Error(`bundled image too small to be a front page: ${image.length} bytes`);
}
if (image.length > MAX_IMAGE_BYTES) {
  throw new Error(`bundled image larger than the 1 MiB limit: ${image.length} bytes`);
}

// The gate tells PNG from JPEG by the first bytes, so refuse anything else
// here instead of shipping a file the gate would reject.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff]);
const isPng = image.subarray(0, 4).equals(PNG_MAGIC);
const isJpeg = image.subarray(0, 3).equals(JPEG_MAGIC);
if (!isPng && !isJpeg) {
  throw new Error("bundled image is neither PNG nor JPEG");
}

// A JPEG must also end with its end-of-image marker. The byte-equality
// check below would catch a truncation anyway, but failing here names the
// problem instead of blaming the copy.
const JPEG_EOI = Buffer.from([0xff, 0xd9]);
if (isJpeg && !image.subarray(image.length - 2).equals(JPEG_EOI)) {
  throw new Error("bundled JPEG is truncated: missing end-of-image marker");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, image);

// Read the copy back: a truncated or altered write must fail loudly
// instead of silently submitting different bytes.
const written = readFileSync(outputPath);
if (!image.equals(written)) {
  throw new Error("output does not match the bundled image");
}

console.log(`wrote ${outputPath} (${written.length} bytes, verified, evening edition)`);
