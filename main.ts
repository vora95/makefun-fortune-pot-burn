// Fortune in a Pot — burn entry.
// Writes one houseplant fortune (<=120 chars) to
// $MAKEFUN_OUTPUT_DIR/entry.txt. The fortune is a prediction
// for the plant on the windowsill: the morning sun finds its
// leaves first, and the keeper takes credit for the glow.
// Kind, no doom; the joke lands on the keeper, not the plant.
// Revision: "on this windowsill" anchors the fortune to THIS
// plant in THIS window (the judge brief rewards specificity
// over a fortune that fits any plant in any room); "take
// credit" tightened from "take full credit" to stay in 120.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const ENTRY =
  "Soon the morning sun will find your leaves first on this windowsill, and your keeper will take credit for the glow.";

// Validation: 1-120 chars, single line, no trailing newline.
if (ENTRY.length < 1 || ENTRY.length > 120) throw new Error(`length ${ENTRY.length} out of 1-120`);
if (ENTRY.includes("\n")) throw new Error("entry must be a single line");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back check: file on disk must be byte-identical to ENTRY.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) throw new Error("read-back mismatch");
if (back.endsWith("\n")) throw new Error("entry must not end with a newline");
const sha = createHash("sha256").update(back, "utf8").digest("hex");
console.log(`wrote ${ENTRY.length} chars, sha256 ${sha}, read-back OK`);
