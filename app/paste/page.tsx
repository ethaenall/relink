"use client";

import { useState } from "react";
import Link from "next/link";
import type { Seed } from "@/lib/types";
import { namedTokens } from "@/lib/kernel/tokens";
import { samples } from "@/lib/samples";
import { RelinkSession } from "@/components/RelinkSession";

export default function PastePage() {
  const [text, setText] = useState("");
  const [stuck, setStuck] = useState("");
  const [sampleId, setSampleId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [seed, setSeed] = useState<Seed | null>(null);
  const [named, setNamed] = useState<string[] | null>(null);

  function loadSample(id: string) {
    const sample = samples.find((s) => s.id === id);
    if (!sample) return;
    setSampleId(id);
    setText(sample.page);
    setStuck(sample.stuck);
    setSeed(null);
    setNamed(null);
    setError(null);
  }

  async function diagnose() {
    setLoading(true);
    setError(null);
    setSeed(null);
    setNamed(null);
    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: text, stuck }),
      });
      if (res.status === 404 || res.status === 405) {
        setNamed(namedTokens(text));
        setError(
          "No model on this static host. Load a sample and open its offline resource, or run Relink on a Node host.",
        );
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setNamed(namedTokens(text));
        setError(data.error ?? "Diagnose failed.");
        return;
      }
      setSeed(data.seed);
    } catch {
      setNamed(namedTokens(text));
      setError("Network error. Samples still open offline.");
    } finally {
      setLoading(false);
    }
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
          <p className="font-mono text-[11px] text-cream/40">
            linker · pasted page
          </p>
        </div>
        <RelinkSession seed={seed} />
      </div>
    );
  }

  return (
    <main className="desk relative text-cream">
      <header className="flex items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="font-mono text-[12px] uppercase tracking-[0.2em]">
          Relink
        </Link>
        <Link
          href="/one-pager"
          className="font-mono text-[12px] uppercase tracking-[0.14em] text-cream/60 hover:text-cream"
        >
          One pager
        </Link>
      </header>

      <div className="mx-auto max-w-2xl px-5 pb-20 sm:px-8">
        <h1 className="font-paper text-[36px] leading-tight">
          Paste tonight’s page.
        </h1>
        <p className="mt-3 text-[15px] leading-7 text-cream/75">
          Relink names only the undefined imports. It will not restart the unit
          or finish the homework. Samples below are pages to try — not a
          scripted demo.
        </p>

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50">
          Sample pages
        </p>
        <ul className="mt-3 space-y-2">
          {samples.map((sample) => (
            <li key={sample.id}>
              <button
                type="button"
                onClick={() => loadSample(sample.id)}
                className={`block w-full border px-4 py-3 text-left ${
                  sampleId === sample.id
                    ? "border-cream/50 bg-cream/5"
                    : "border-cream/15 hover:border-cream/35"
                }`}
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
          The page
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setSampleId(null);
              setNamed(null);
              setError(null);
            }}
            rows={12}
            className="mt-2 w-full border border-cream/15 bg-room-2 p-3 font-paper text-[16px] text-cream outline-none focus:border-cream/40"
            placeholder="Paste the homework, board notes, or textbook excerpt."
          />
        </label>
        <label className="mt-4 block font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50">
          The line that is a wall (optional)
          <input
            value={stuck}
            onChange={(e) => setStuck(e.target.value)}
            className="mt-2 min-h-11 w-full border border-cream/15 bg-room-2 px-3 text-[14px] text-cream outline-none focus:border-cream/40"
            placeholder="e.g. add (b/2)²"
          />
        </label>
        <button
          type="button"
          onClick={diagnose}
          disabled={loading || text.trim().length < 20}
          className="mt-5 min-h-11 bg-paper px-5 text-[14px] text-ink disabled:opacity-40"
        >
          {loading ? "Naming marks…" : "Name the undefined marks"}
        </button>

        {sampleId === "lena-4-3" ? (
          <p className="mt-4 font-mono text-[12px] leading-5 text-cream/50">
            This sample also runs offline:{" "}
            <Link href="/lena" className="underline decoration-pen">
              open Algebra 2 resource
            </Link>
          </p>
        ) : null}

        {error ? (
          <p className="mt-6 text-[14px] leading-6 text-cream/80">{error}</p>
        ) : null}

        {named && named.length === 0 ? (
          <p className="mt-4 text-[14px] leading-6 text-cream/80">
            No imports this host can name without a model. Try the Algebra 2
            sample offline.
          </p>
        ) : null}

        {named && named.length > 0 ? (
          <ul className="mt-6 font-mono text-[13px] leading-7 text-cream/80">
            {named.map((token) => (
              <li key={token}>
                <span className="text-undef">error[E0425]</span>
                {": cannot find "}
                {token}
                {" in this scope"}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </main>
  );
}
