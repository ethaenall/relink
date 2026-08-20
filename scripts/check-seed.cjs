const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "../lib/lena.ts"), "utf8");

function count(re) {
  return (src.match(re) || []).length;
}

const blockers = count(/id: "[a-z-]+"/g);
const correct = count(/correct: true/g);
const wrong = count(/correct: false/g);
const teaching = count(/teaching: \[/g);

if (!src.includes('name: "Lena"')) {
  console.error("Seed is missing the named person Lena.");
  process.exit(1);
}
if (teaching !== 3) {
  console.error("Expected 3 teaching blocks, got", teaching);
  process.exit(1);
}
if (correct !== 3) {
  console.error("Expected exactly 3 correct checks, got", correct);
  process.exit(1);
}
if (wrong < 5) {
  console.error("Expected distractors on the checks.");
  process.exit(1);
}

console.log("check-seed ok", { blockers, correct, wrong });
