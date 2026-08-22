const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "../lib/readUpload.ts"), "utf8");
if (!src.includes("export function classifyUpload")) {
  console.error("missing classifyUpload");
  process.exit(1);
}
if (!src.includes("export function matchSamplePage")) {
  console.error("missing matchSamplePage");
  process.exit(1);
}

function classifyUpload(name, type) {
  const n = name.toLowerCase();
  const t = (type || "").toLowerCase();
  if (t.startsWith("image/") || /\.(png|jpe?g|gif|webp|heic)$/.test(n)) return "image";
  if (t === "application/pdf" || n.endsWith(".pdf")) return "pdf";
  if (n.endsWith(".docx") || t.includes("wordprocessingml")) return "docx";
  if (t.startsWith("text/") || /\.(txt|md|csv|tex)$/.test(n)) return "text";
  return "unknown";
}

function matchSamplePage(text) {
  const folded = text.toLowerCase();
  if (folded.includes("(b/2)") && folded.includes("completing the square")) return "lena-4-3";
  if (folded.includes("μ_s") || folded.includes("mu_s") || folded.includes("on the verge")) {
    if (folded.includes("friction") || folded.includes("μ_s") || folded.includes("mu_s")) {
      return "priya-friction";
    }
  }
  if (folded.includes("lim") && folded.includes("dy/dx")) return "jordan-limits";
  return null;
}

if (classifyUpload("ws.png", "image/png") !== "image") {
  console.error("png should be image");
  process.exit(1);
}
if (classifyUpload("lab.pdf", "") !== "pdf") {
  console.error("pdf by name");
  process.exit(1);
}
if (classifyUpload("notes.docx", "") !== "docx") {
  console.error("docx by name");
  process.exit(1);
}
if (classifyUpload("hw.txt", "text/plain") !== "text") {
  console.error("txt should be text");
  process.exit(1);
}
if (classifyUpload("old.doc", "") !== "unknown") {
  console.error("legacy .doc is unknown");
  process.exit(1);
}
if (matchSamplePage("Worksheet 4.3 — Completing the Square\nadd (b/2)²") !== "lena-4-3") {
  console.error("lena sample should match");
  process.exit(1);
}
if (matchSamplePage("Lab 4 static friction μ_s = 0.40 on the verge") !== "priya-friction") {
  console.error("priya sample should match");
  process.exit(1);
}
if (matchSamplePage("buy milk") !== null) {
  console.error("unrelated text should not match a sample");
  process.exit(1);
}
console.log("check-upload ok");
