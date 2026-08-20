const fs = require("fs");
const path = require("path");

const banned = [
  "you should already know",
  "as you remember",
  "as you know",
  "you missed",
  "catch up",
  "behind",
  "basic concept",
  "simply review",
  "go back to chapter",
  "just a simple",
  "obviously",
  "everyone else",
];

const file = fs.readFileSync(path.join(__dirname, "../lib/lena.ts"), "utf8");
const fields = ["whyThisPage", "teaching", "checkPrompt", "ifWrong", "marginNote"];
const hits = [];

for (const phrase of banned) {
  const lower = file.toLowerCase();
  if (!lower.includes(phrase)) continue;
  // Only fail if the phrase sits near pedagogical fields, not in the banned list itself.
  const listIndex = file.indexOf("bannedCardPhrases");
  const pedagogy = file.slice(0, listIndex === -1 ? file.length : listIndex).toLowerCase();
  if (pedagogy.includes(phrase)) hits.push(phrase);
}

if (hits.length) {
  console.error("Shame phrasing in Lena cards:", hits.join(", "));
  process.exit(1);
}

if (!fields.every((f) => file.includes(f))) {
  console.error("Seed is missing expected fields.");
  process.exit(1);
}

console.log("check-copy ok");
