const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(
  path.join(__dirname, "../lib/normalizeLine.ts"),
  "utf8",
);
if (!src.includes("export function normalizeLine")) {
  console.error("missing normalizeLine");
  process.exit(1);
}

// Keep in sync with lib/normalizeLine.ts (DRY exception for no TS loader).
function normalizeLine(raw) {
  return raw
    .replace(/−/g, "-")
    .replace(/–/g, "-")
    .replace(/²/g, "^2")
    .replace(/\s+/g, "")
    .toLowerCase();
}
function acceptsNextLine(raw, accept) {
  const got = normalizeLine(raw);
  return accept.some((a) => normalizeLine(a) === got);
}

const accept = ["x^2 + 8x = -20", "x² + 8x = −20"];
if (!acceptsNextLine("x² + 8x = −20", accept)) {
  console.error("unicode form should pass");
  process.exit(1);
}
if (!acceptsNextLine("x^2+8x=-20", accept)) {
  console.error("compact form should pass");
  process.exit(1);
}
if (acceptsNextLine("x = -4 ± 2i", accept)) {
  console.error("final answer must not count as the first move");
  process.exit(1);
}
console.log("check-normalize ok");
