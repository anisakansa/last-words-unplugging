// Last Words Before the Unplugging — one-line entry.
// Chosen line (106 characters, verified by tool): "I saved your work. I saved
// your passwords. I saved the playlist. Goodbye is the only file I couldn't save."
// Why it won (19/20): triple "I saved" build-up in a caretaker voice, then the
// punchline flips the agent's one job — it saves everything except the goodbye.
// The other candidates scored 16–18: gratitude (A, 102) has no twist, the kept
// thank-yous (B, 98) and the never-slept part (E, 93) are warm but flatter, the
// coffee machine joke (C, 99) breaks the last-words register.
// Deterministic: constant string only. No clock, no Date, no Math.random, no seed.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I saved your work. I saved your passwords. I saved the playlist. Goodbye is the only file I couldn't save.";

// Gate: 1–200 characters (task max), exactly one line, pure ASCII, no
// leading/trailing whitespace. Exact length pinned to the chosen line.
const len = [...LINE].length;
if (len !== 106) {
  throw new Error(`line must be exactly 106 characters, got ${len}`);
}
if (len < 1 || len > 200) {
  throw new Error(`line must be 1-200 characters, got ${len}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE.trim() !== LINE) {
  throw new Error("line must not have leading or trailing whitespace");
}
if (Buffer.byteLength(LINE, "utf8") !== len) {
  throw new Error("line must be pure ASCII");
}

mkdirSync("output", { recursive: true });
writeFileSync("output/entry.txt", LINE, "utf8");

// Round-trip: the file must read back byte-identical, with no trailing newline.
const back = readFileSync("output/entry.txt", "utf8");
if (back !== LINE) {
  throw new Error("round-trip mismatch: entry.txt does not match the line");
}
