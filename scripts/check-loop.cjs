const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "../lib/types.ts"), "utf8");
if (!src.includes("export type ApplyCheck")) {
  console.error("missing ApplyCheck");
  process.exit(1);
}
if (!src.includes("export type NextLine")) {
  console.error("missing NextLine");
  process.exit(1);
}
if (!src.includes("apply: ApplyCheck")) {
  console.error("Blocker missing apply: ApplyCheck");
  process.exit(1);
}
if (!src.includes("nextLine: NextLine")) {
  console.error("Seed missing nextLine: NextLine");
  process.exit(1);
}
console.log("check-loop types ok");
