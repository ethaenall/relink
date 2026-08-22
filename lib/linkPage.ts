import type { Seed } from "@/lib/types";
import { localDiagnose } from "@/lib/kernel/diagnose";
import { seedFromPaste } from "@/lib/fromPaste";
import { matchSamplePage } from "@/lib/readUpload";
import { samples } from "@/lib/samples";

export type LinkOutcome =
  | { ok: true; seed: Seed; source: "sample" | "local" | "model" }
  | { ok: false; error: string };

function fromLocal(page: string): LinkOutcome {
  const matched = matchSamplePage(page);
  if (matched) {
    const hit = samples.find((s) => s.id === matched);
    if (hit) return { ok: true, seed: hit.seed, source: "sample" };
  }
  const built = seedFromPaste(page, localDiagnose(page));
  if (built.blockers.length === 0) {
    return {
      ok: false,
      error:
        "No imports this copy can name yet. Load a listed page, or add a model host (see HOSTING.md).",
    };
  }
  return { ok: true, seed: built, source: "local" };
}

export async function linkPage(page: string, stuck = ""): Promise<LinkOutcome> {
  const trimmed = page.trim();
  if (trimmed.length < 20) {
    return { ok: false, error: "Need a longer excerpt of tonight’s page." };
  }

  const remote = process.env.NEXT_PUBLIC_LINKER_API;
  const endpoints = [remote, "/api/diagnose"].filter(
    (u): u is string => Boolean(u && u.length > 4),
  );

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: trimmed, stuck }),
      });
      if (res.status === 404 || res.status === 405 || res.status === 501) {
        continue;
      }
      const data = await res.json();
      if (res.ok && data.seed) {
        return { ok: true, seed: data.seed as Seed, source: "model" };
      }
    } catch {
      // try next endpoint, then local
    }
  }

  return fromLocal(trimmed);
}
