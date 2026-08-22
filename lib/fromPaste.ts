import type {
  ApplyCheck,
  Blocker,
  InlinePart,
  NextLine,
  Seed,
  WorksheetLine,
} from "./types";
import { findBannedPhrases } from "./tone";

export type DiagnoseBlocker = {
  token: string;
  title?: string;
  minutes?: number;
  whyThisPage?: string;
  teaching?: string[];
  apply?: Partial<ApplyCheck> & {
    choices?: { id?: string; label?: string; correct?: boolean }[];
  };
  marginNote?: string;
  where?: string;
};

export type DiagnoseResult = {
  blockers?: DiagnoseBlocker[];
  nextLine?: Partial<NextLine>;
  closing?: string;
  error?: string;
};

export function markParts(
  text: string,
  blockers: { id: string; token: string }[],
): InlinePart[] {
  const found: { b: { id: string; token: string }; idx: number; len: number }[] =
    [];
  const lower = text.toLowerCase();
  for (const b of blockers) {
    const idx = lower.indexOf(b.token.toLowerCase());
    if (idx >= 0) found.push({ b, idx, len: b.token.length });
  }
  found.sort((a, c) => a.idx - c.idx || c.len - a.len);
  const parts: InlinePart[] = [];
  let cursor = 0;
  const used = new Set<string>();
  for (const hit of found) {
    if (hit.idx < cursor) continue;
    if (used.has(hit.b.id)) continue;
    if (hit.idx > cursor) parts.push({ text: text.slice(cursor, hit.idx) });
    parts.push({
      text: text.slice(hit.idx, hit.idx + hit.len),
      blockerId: hit.b.id,
    });
    cursor = hit.idx + hit.len;
    used.add(hit.b.id);
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor) });
  return parts.length ? parts : [{ text }];
}

function slugToken(token: string, index: number): string {
  const slug = token
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 24);
  return slug || `mark-${index}`;
}

function cleanText(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  if (findBannedPhrases(trimmed).length) return fallback;
  return trimmed;
}

function cleanTeaching(raw: unknown): string[] {
  const list = Array.isArray(raw) ? raw : [];
  const out: string[] = [];
  for (const item of list) {
    if (typeof item !== "string") continue;
    const t = item.trim();
    if (!t) continue;
    if (findBannedPhrases(t).length) continue;
    out.push(t);
    if (out.length === 2) break;
  }
  if (out.length === 0) {
    out.push("This mark is treated as given on tonight’s page.");
    out.push("Use it on the unfinished problem. Relink will not finish it.");
  }
  return out;
}

function cleanApply(token: string, raw: DiagnoseBlocker["apply"]): ApplyCheck {
  const choicesIn = Array.isArray(raw?.choices) ? raw.choices : [];
  const choices = choicesIn
    .map((c, i) => ({
      id: typeof c?.id === "string" && c.id ? c.id : String.fromCharCode(97 + i),
      label: typeof c?.label === "string" ? c.label.trim() : "",
      correct: Boolean(c?.correct),
    }))
    .filter((c) => c.label);
  const correctCount = choices.filter((c) => c.correct).length;
  if (choices.length < 2 || correctCount !== 1) {
    return {
      problemLabel: "the unfinished problem on this page",
      prompt: `Which statement is true of ${token} on this page?`,
      choices: [
        {
          id: "a",
          label: `${token} is defined here; use it on the next unfinished line.`,
          correct: true,
        },
        {
          id: "b",
          label: "Stop. The rest of the page has no solution.",
          correct: false,
        },
      ],
      ifWrong: "The page continues. The import is a name, not a stop sign.",
    };
  }
  return {
    problemLabel: cleanText(raw?.problemLabel, "the unfinished problem"),
    prompt: cleanText(raw?.prompt, `Use ${token} on the unfinished problem.`),
    choices,
    ifWrong: cleanText(raw?.ifWrong, "Look at the unfinished problem, not the example."),
  };
}

export function sanitizeBlockers(raw: DiagnoseBlocker[]): Blocker[] {
  const out: Blocker[] = [];
  const seen = new Set<string>();
  for (const item of raw.slice(0, 4)) {
    const token = typeof item.token === "string" ? item.token.trim() : "";
    if (!token || seen.has(token.toLowerCase())) continue;
    seen.add(token.toLowerCase());
    const id = slugToken(token, out.length);
    out.push({
      id,
      token,
      where: cleanText(item.where, "on tonight’s page"),
      title: cleanText(item.title, `What ${token} is doing on this page`),
      minutes: typeof item.minutes === "number" && item.minutes > 0 ? item.minutes : 3,
      whyThisPage: cleanText(
        item.whyThisPage,
        `The page treats ${token} as already in hand.`,
      ),
      teaching: cleanTeaching(item.teaching),
      apply: cleanApply(token, item.apply),
      marginNote: cleanText(item.marginNote, `${token} is now defined on this page.`),
    });
    if (out.length === 3) break;
  }
  return out;
}

export function seedFromPaste(page: string, result: DiagnoseResult): Seed {
  const blockers = sanitizeBlockers(result.blockers ?? []);
  const marks = blockers.map((b) => ({ id: b.id, token: b.token }));
  const rawLines = page.replace(/\r\n/g, "\n").split("\n");
  const lines: WorksheetLine[] = [
    {
      id: "hdr",
      kind: "meta",
      parts: [{ text: "pasted page  ·  tonight  ·  undefined references only" }],
    },
  ];
  rawLines.forEach((line, i) => {
    const text = line.trimEnd();
    if (!text.trim()) return;
    const kind: WorksheetLine["kind"] =
      i === 0 ? "title" : /^(\d+\.|problem\s+\d+)/i.test(text.trim()) ? "task" : "math";
    const marked = markParts(text, marks);
    const marginFor = marked.find((p) => "blockerId" in p && p.blockerId)?.blockerId;
    lines.push({
      id: `ln-${i}`,
      kind,
      parts: marked,
      marginFor,
    });
  });

  const nextLine: NextLine = {
    prompt: cleanText(
      result.nextLine?.prompt,
      "Write the first move of the unfinished problem.",
    ),
    accept: Array.isArray(result.nextLine?.accept)
      ? result.nextLine.accept.filter((s): s is string => typeof s === "string" && s.trim().length > 0)
      : [],
    rejectHint: cleanText(
      result.nextLine?.rejectHint,
      "That is not the first move of the unfinished problem.",
    ),
  };

  return {
    id: "pasted-page",
    person: { name: "You", age: 0, grade: "", school: "" },
    absence: { days: 0, reason: "tonight", stillHas: [] },
    course: "tonight’s page",
    worksheetTitle: "pasted page",
    date: "tonight",
    period: "",
    lines,
    blockers,
    closing: cleanText(
      result.closing,
      "The page is defined. Write the next line. Relink will not write it.",
    ),
    nextLine,
  };
}
