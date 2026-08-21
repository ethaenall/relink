export const KNOWN_TOKENS = [
  "(b/2)²",
  "(b/2)^2",
  "√(−1)",
  "sqrt(-1)",
  " i",
  "μ_s",
  "mu_s",
  "dy/dx",
];

export function namedTokens(page: string): string[] {
  const lower = page.toLowerCase();
  const hits: string[] = [];
  for (const token of KNOWN_TOKENS) {
    if (lower.includes(token.toLowerCase()) && !hits.includes(token.trim())) {
      hits.push(token.trim());
    }
  }
  return hits;
}
