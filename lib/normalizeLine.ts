export function normalizeLine(raw: string): string {
  return raw
    .replace(/−/g, "-")
    .replace(/–/g, "-")
    .replace(/²/g, "^2")
    .replace(/\s+/g, "")
    .toLowerCase();
}

export function acceptsNextLine(raw: string, accept: string[]): boolean {
  const got = normalizeLine(raw);
  return accept.some((a) => normalizeLine(a) === got);
}
