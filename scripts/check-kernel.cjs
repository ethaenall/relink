const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const tokenSrc = fs.readFileSync(path.join(root, "lib/kernel/tokens.ts"), "utf8");
const sampleSrc = fs.readFileSync(path.join(root, "lib/samples.ts"), "utf8");

if (!tokenSrc.includes("export function namedTokens")) {
  console.error("missing namedTokens");
  process.exit(1);
}
if (!tokenSrc.includes("export const KNOWN_TOKENS")) {
  console.error("missing KNOWN_TOKENS");
  process.exit(1);
}

const runnable = tokenSrc
  .replace(/export /g, "")
  .replace(/: string\[\]/g, "")
  .replace(/: boolean/g, "")
  .replace(/: string/g, "");
const sandbox = {};
vm.runInNewContext(
  `${runnable}\nthis.namedTokens = namedTokens;\nthis.KNOWN_TOKENS = KNOWN_TOKENS;`,
  sandbox,
);

const samples = [];
const re =
  /id:\s*"([^"]+)"[\s\S]*?label:\s*"([^"]+)"[\s\S]*?page:\s*`([^`]*)`/g;
let m;
while ((m = re.exec(sampleSrc))) {
  samples.push({ id: m[1], label: m[2], page: m[3] });
}

if (samples.length < 2) {
  console.error("expected both sample pages, got", samples.length);
  process.exit(1);
}

let failed = false;
for (const sample of samples) {
  const hits = sandbox.namedTokens(sample.page);
  console.log(`${sample.id}: ${hits.length ? hits.join(", ") : "(none)"}`);
  if (hits.length === 0) {
    console.error(`named tokens empty for ${sample.id}`);
    failed = true;
  }
}

const algebra = samples.find((s) => /algebra/i.test(s.label) || s.id.includes("lena"));
const physics = samples.find((s) => /physics/i.test(s.label) || s.id.includes("priya"));
if (algebra) {
  const hits = sandbox.namedTokens(algebra.page);
  if (!hits.includes("(b/2)²") && !hits.includes("(b/2)^2")) {
    console.error("algebra sample missed (b/2)²");
    failed = true;
  }
  if (!hits.includes("√(−1)") && !hits.includes("i")) {
    console.error("algebra sample missed √(−1) / i");
    failed = true;
  }
}
if (physics) {
  const hits = sandbox.namedTokens(physics.page);
  if (!hits.includes("μ_s")) {
    console.error("physics sample missed μ_s");
    failed = true;
  }
  if (!hits.includes("F_s") && !hits.includes("on the verge")) {
    console.error("physics sample missed F_s / on the verge");
    failed = true;
  }
  if (hits.includes("i")) {
    console.error("physics sample should not treat English i as a math token");
    failed = true;
  }
}

if (failed) process.exit(1);
console.log("check-kernel ok");
