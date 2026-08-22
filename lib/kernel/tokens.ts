export const KNOWN_TOKENS = [
  "(b/2)²",
  "(b/2)^2",
  "√(−1)",
  "sqrt(-1)",
  "± i",
  "i",
  "μ_s",
  "mu_s",
  "F_s",
  "on the verge",
  "dy/dx",
  "d/dx",
  "lim",
  "∫",
  "antiderivative",
  "σ",
  "pH",
  "mol",
  "PV = nRT",
  "PV=nRT",
  "W = Fd",
  "PE = mgh",
  "a² + b²",
  "SOHCAHTOA",
  "quadratic formula",
  "ln(",
  "log(",
  "∑",
  "Δx",
  "λ",
  "half-life",
  "valence",
];

function fold(s: string): string {
  return s
    .replace(/−/g, "-")
    .replace(/–/g, "-")
    .replace(/²/g, "^2")
    .toLowerCase();
}

function isMathIToken(token: string): boolean {
  const t = token.trim();
  return t === "i" || t === "± i";
}

function hasMathI(page: string): boolean {
  return /(?:^|[^A-Za-z])i(?:[^A-Za-z]|$)/.test(page);
}

function displayName(token: string): string {
  const t = token.trim();
  if (t === "(b/2)^2") return "(b/2)²";
  if (t === "sqrt(-1)") return "√(−1)";
  if (isMathIToken(t)) return "i";
  if (t === "mu_s") return "μ_s";
  if (t === "PV=nRT") return "PV = nRT";
  return t;
}

const BOUNDED = new Set(["lim", "mol", "pH", "σ", "λ", "∑", "∫", "Δx", "ln(", "log("]);

function hasFoldedToken(page: string, token: string): boolean {
  const hay = fold(page);
  const needle = fold(token);
  if (BOUNDED.has(token) || needle.length <= 3) {
    const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(?:^|[^a-z0-9])${escaped}(?:[^a-z0-9]|$)`).test(hay);
  }
  return hay.includes(needle);
}

export function namedTokens(page: string): string[] {
  const hits: string[] = [];
  for (const token of KNOWN_TOKENS) {
    const ok = isMathIToken(token)
      ? hasMathI(page)
      : hasFoldedToken(page, token);
    if (!ok) continue;
    const name = displayName(token);
    if (!hits.includes(name)) hits.push(name);
  }
  return hits;
}
