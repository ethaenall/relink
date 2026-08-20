import { bannedCardPhrases } from "./lena";

export function findBannedPhrases(text: string): string[] {
  const lower = text.toLowerCase();
  return bannedCardPhrases.filter((phrase) => lower.includes(phrase));
}

export function assertShameFree(text: string, label: string): void {
  const hits = findBannedPhrases(text);
  if (hits.length > 0) {
    throw new Error(`${label} uses banned phrasing: ${hits.join(", ")}`);
  }
}
