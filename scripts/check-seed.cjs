const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "../lib/lena.ts"), "utf8");

function count(re) {
  return (src.match(re) || []).length;
}

if (!src.includes('name: "Lena"')) {
  console.error("Seed is missing the named person Lena.");
  process.exit(1);
}
if (count(/teaching: \[/g) !== 3) {
  console.error("Expected 3 teaching blocks");
  process.exit(1);
}
if (count(/apply: \{/g) !== 3) {
  console.error("Expected 3 apply blocks, got", count(/apply: \{/g));
  process.exit(1);
}
if (count(/correct: true/g) !== 3) {
  console.error("Expected exactly 3 correct checks, got", count(/correct: true/g));
  process.exit(1);
}
if (count(/correct: false/g) < 5) {
  console.error("Expected distractors on the checks.");
  process.exit(1);
}
if (!src.includes("nextLine:")) {
  console.error("Seed missing nextLine");
  process.exit(1);
}
if (!src.includes("x^2 + 8x = -20") && !src.includes("x² + 8x = −20")) {
  console.error("nextLine must accept the first move of problem 2");
  process.exit(1);
}
if (src.includes("checkPrompt")) {
  console.error("checkPrompt must be gone; use apply");
  process.exit(1);
}

const priya = fs.readFileSync(path.join(__dirname, "../lib/priya.ts"), "utf8");
if (!priya.includes('name: "Priya"')) {
  console.error("Priya seed missing named person");
  process.exit(1);
}
if ((priya.match(/apply: \{/g) || []).length !== 3) {
  console.error("Priya needs 3 apply blocks");
  process.exit(1);
}
if (!priya.includes("nextLine:")) {
  console.error("Priya missing nextLine");
  process.exit(1);
}
if (!priya.includes("7.84")) {
  console.error("Priya next line / check must use 7.84 N");
  process.exit(1);
}

console.log("check-seed ok");
