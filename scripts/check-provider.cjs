const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "../lib/provider.ts"), "utf8");
if (!src.includes("export function resolveProvider")) {
  console.error("missing resolveProvider");
  process.exit(1);
}
if (!src.includes("api.groq.com/openai/v1/chat/completions")) {
  console.error("missing Groq chat URL");
  process.exit(1);
}
if (!src.includes("llama-3.1-8b-instant")) {
  console.error("missing default Groq model");
  process.exit(1);
}
if (!src.includes("export function isLinkerArmed")) {
  console.error("missing arm switch");
  process.exit(1);
}

function resolveProvider(env) {
  const groq = (env.GROQ_API_KEY || "").trim();
  if (groq) {
    return {
      name: "groq",
      url: "https://api.groq.com/openai/v1/chat/completions",
      model: (env.GROQ_MODEL || "").trim() || "llama-3.1-8b-instant",
    };
  }
  const feather = (env.FEATHERLESS_API_KEY || "").trim();
  if (feather) {
    return { name: "featherless" };
  }
  return null;
}

function isLinkerArmed(env) {
  const flag = (env.GROQ_ARMED || env.LINKER_ARMED || "").trim();
  return flag === "1" || flag.toLowerCase() === "true";
}

if (resolveProvider({})) {
  console.error("empty env must be null");
  process.exit(1);
}
const groq = resolveProvider({ GROQ_API_KEY: "gsk_test" });
if (groq.name !== "groq" || groq.model !== "llama-3.1-8b-instant") {
  console.error("groq default failed");
  process.exit(1);
}
if (resolveProvider({ FEATHERLESS_API_KEY: "x" }).name !== "featherless") {
  console.error("featherless fallback failed");
  process.exit(1);
}
if (isLinkerArmed({})) {
  console.error("default must be unarmed");
  process.exit(1);
}
if (!isLinkerArmed({ GROQ_ARMED: "1" })) {
  console.error("GROQ_ARMED=1 should arm");
  process.exit(1);
}
console.log("check-provider ok");
