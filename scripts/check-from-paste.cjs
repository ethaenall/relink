const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(
  path.join(__dirname, "../lib/fromPaste.ts"),
  "utf8",
);
if (!src.includes("export function seedFromPaste")) {
  console.error("missing seedFromPaste");
  process.exit(1);
}
if (!src.includes("export function markParts")) {
  console.error("missing markParts");
  process.exit(1);
}

// Keep in sync with lib/fromPaste.ts (no TS loader).
function markParts(text, blockers) {
  const found = [];
  for (const b of blockers) {
    const idx = text.toLowerCase().indexOf(b.token.toLowerCase());
    if (idx >= 0) found.push({ b, idx, len: b.token.length });
  }
  found.sort((a, c) => a.idx - c.idx || c.len - a.len);
  const parts = [];
  let cursor = 0;
  const used = new Set();
  for (const hit of found) {
    if (hit.idx < cursor) continue;
    if (used.has(hit.b.id)) continue;
    if (hit.idx > cursor) parts.push({ text: text.slice(cursor, hit.idx) });
    parts.push({
      text: text.slice(hit.idx, hit.idx + hit.len),
      blockerId: hit.b.id,
    });
    cursor = hit.idx + hit.len;
    used.add(hit.b.id);
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor) });
  return parts.length ? parts : [{ text }];
}

const parts = markParts("add (b/2)² then continue", [
  { id: "cs", token: "(b/2)²" },
]);
if (parts.length < 2 || parts[1].blockerId !== "cs") {
  console.error("token should be marked", parts);
  process.exit(1);
}
const none = markParts("just factoring", [{ id: "cs", token: "(b/2)²" }]);
if (none.length !== 1 || none[0].blockerId) {
  console.error("unrelated line should stay plain");
  process.exit(1);
}
console.log("check-from-paste ok");
