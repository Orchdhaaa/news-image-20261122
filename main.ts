// main.ts - news-image-20261122 entrypoint.
//
// The entry is one pre-built front-page image (entry.png). This program
// writes it byte for byte into the output directory, then reads the copy
// back and compares it with the bundled original, so every run produces
// exactly the same bytes.
//
// The image is the Sunday 22 November 2026 front page of "THE WORLD": a
// newspaper page typeset from verified news of Saturday 21 November, with
// editorial illustrations made for the three photo stories. All page text
// is set in real fonts, so no headline or caption can come out garbled.
// No network is used at run time; everything the program needs ships in
// this repo.
//
// MORNING EDITION: the five stories are the big events of Saturday
// 21 November, the stories the world wakes up to on Sunday 22 November:
// COP31 close to a final deal after all-night talks in Antalya; Mexico
// capturing "El Chapo Isidro" in a Sinaloa raid; two more tankers hit off
// Oman on Saturday; the US and Israel weighing a new assault on Iran;
// France protests ebbing as turnout falls.

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
// A front page at this size is hundreds of kilobytes; anything far smaller
// means the bundle was truncated, so fail here rather than shipping it.
if (image.length < 10 * 1024) {
  throw new Error(`bundled image suspiciously small: ${image.length} bytes`);
}
// The gate refuses images over 1 MiB, so refuse one here too instead of
// shipping a file the gate would reject.
if (image.length > 1024 * 1024) {
  throw new Error(`bundled image over the 1 MiB gate cap: ${image.length} bytes`);
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

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, image);

// Read the copy back: a truncated or altered write must fail loudly
// instead of silently submitting different bytes.
const written = readFileSync(outputPath);
if (!image.equals(written)) {
  throw new Error("output does not match the bundled image");
}

console.log(`wrote ${outputPath} (${written.length} bytes, verified)`);
