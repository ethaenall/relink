"use client";

import { useState } from "react";
import Link from "next/link";
import type { Seed } from "@/lib/types";
import { samples } from "@/lib/samples";
import { localDiagnose } from "@/lib/kernel/diagnose";
import { seedFromPaste } from "@/lib/fromPaste";
import { RelinkSession } from "@/components/RelinkSession";

export function ToolApp() {
  const [text, setText] = useState("");
  const [sampleId, setSampleId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [seed, setSeed] = useState<Seed | null>(null);

  function loadSample(id: string) {
    const sample = samples.find((s) => s.id === id);
    if (!sample) return;
    setSampleId(id);
    setText(sample.page);
    setError(null);
    setSeed(sample.seed);
  }

  function runPage() {
    setError(null);
    const sample = samples.find((s) => s.id === sampleId);
    if (sample && text.trim() === sample.page.trim()) {
      setSeed(sample.seed);
      return;
    }
    const built = seedFromPaste(text, localDiagnose(text));
    if (built.blockers.length === 0) {
      setSeed(null);
      setError(
        "No imports this copy of Relink can name yet. Load a listed page — those run offline.",
      );
      return;
    }
    setSampleId(null);
    setSeed(built);
  }

  if (seed) {
    return (
      <div>
        <div className="desk relative z-20 flex items-center justify-between px-4 py-3 sm:px-8">
          <button
            type="button"
            onClick={() => setSeed(null)}
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream/60 hover:text-cream"
          >
            ← another page
          </button>
          <p className="font-mono text-[11px] text-cream/40">linker · local</p>
        </div>
        <RelinkSession key={seed.id} seed={seed} />
      </div>
    );
  }

  return (
    <main className="desk relative text-cream">
      <header className="flex items-center justify-between px-5 py-5 sm:px-8">
        <p className="font-mono text-[12px] uppercase tracking-[0.2em]">Relink</p>
        <nav className="flex gap-5 font-mono text-[12px] uppercase tracking-[0.14em] text-cream/60">
          <Link href="/demo" className="hover:text-cream">
            Demo
          </Link>
          <Link href="/one-pager" className="hover:text-cream">
            One pager
          </Link>
        </nav>
      </header>

      <div className="mx-auto max-w-2xl px-5 pb-20 sm:px-8">
        <p className="diag text-[13px] text-[#e8a598]">
          <span className="text-undef">error[E0425]</span>
          {": undefined references on tonight’s page"}
        </p>
        <h1 className="font-paper mt-4 text-[36px] leading-tight sm:text-[48px]">
          Paste tonight’s page.
        </h1>
        <p className="mt-3 text-[15px] leading-7 text-cream/75">
          Relink names only the missing imports. It will not finish the homework.
          Listed pages open immediately — no account, no model.
        </p>

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50">
          Load a page
        </p>
        <ul className="mt-3 space-y-2">
          {samples.map((sample) => (
            <li key={sample.id}>
              <button
                type="button"
                onClick={() => loadSample(sample.id)}
                className="block min-h-11 w-full border border-cream/15 px-4 py-3 text-left hover:border-cream/35"
              >
                <span className="font-mono text-[12px] text-cream">
                  {sample.label}
                </span>
                <span className="mt-1 block text-[13px] leading-5 text-cream/60">
                  {sample.blurb}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <label className="mt-8 block font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50">
          Or paste your own
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setSampleId(null);
              setError(null);
            }}
            rows={10}
            className="mt-2 w-full border border-cream/15 bg-room-2 p-3 font-paper text-[16px] text-cream outline-none focus:border-cream/40"
            placeholder="Paste the homework, board notes, or textbook excerpt."
          />
        </label>
        <button
          type="button"
          onClick={runPage}
          disabled={text.trim().length < 20}
          className="mt-5 min-h-11 bg-paper px-5 text-[14px] text-ink disabled:opacity-40"
        >
          Name the undefined marks
        </button>
        {error ? (
          <p className="mt-6 text-[14px] leading-6 text-cream/80">{error}</p>
        ) : null}
      </div>
    </main>
  );
}
