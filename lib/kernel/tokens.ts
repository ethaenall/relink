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
];

function fold(s: string): string {
  return s.replace(/−/g, "-").replace(/–/g, "-").replace(/²/g, "^2").toLowerCase();
}

function isMathIToken(token: string): boolean {
  const t = token.trim();
  return t === "i" || t === "± i";
}

/** Isolated math i — not the letter inside is / in / coefficient. */
function hasMathI(page: string): boolean {
  return /(?:^|[^A-Za-z])i(?:[^A-Za-z]|$)/.test(page);
}

function displayName(token: string): string {
  const t = token.trim();
  if (t === "(b/2)^2") return "(b/2)²";
  if (t === "sqrt(-1)") return "√(−1)";
  if (isMathIToken(t)) return "i";
  if (t === "mu_s") return "μ_s";
  return t;
}

export function namedTokens(page: string): string[] {
  const folded = fold(page);
  const hits: string[] = [];
  for (const token of KNOWN_TOKENS) {
    const ok = isMathIToken(token)
      ? hasMathI(page)
      : folded.includes(fold(token));
    if (!ok) continue;
    const name = displayName(token);
    if (!hits.includes(name)) hits.push(name);
  }
  return hits;
}
