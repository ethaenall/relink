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

function scan(rel, cutAtList) {
  const file = fs.readFileSync(path.join(__dirname, rel), "utf8");
  const listIndex = cutAtList ? file.indexOf("bannedCardPhrases") : -1;
  const pedagogy = file.slice(0, listIndex === -1 ? file.length : listIndex).toLowerCase();
  const hits = banned.filter((phrase) => pedagogy.includes(phrase));
  if (hits.length) {
    console.error("Shame phrasing in", rel, hits.join(", "));
    process.exit(1);
  }
}

scan("../lib/lena.ts", true);
scan("../lib/priya.ts", false);
scan("../lib/kernel/cards.ts", false);

const lena = fs.readFileSync(path.join(__dirname, "../lib/lena.ts"), "utf8");
const fields = ["whyThisPage", "teaching", "apply", "ifWrong", "marginNote"];
if (!fields.every((f) => lena.includes(f))) {
  console.error("Lena seed is missing expected fields.");
  process.exit(1);
}

console.log("check-copy ok");
