"use client";

import { useState } from "react";
import Link from "next/link";

type LiveBlocker = {
  token: string;
  title: string;
  whyThisPage: string;
  teaching: string[];
  checkPrompt: string;
  choices: { id: string; label: string; correct: boolean }[];
  marginNote: string;
};

export default function PastePage() {
  const [text, setText] = useState("");
  const [stuck, setStuck] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [blockers, setBlockers] = useState<LiveBlocker[] | null>(null);

  async function diagnose() {
    setLoading(true);
    setError(null);
    setBlockers(null);
    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: text, stuck }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Diagnose failed.");
        return;
      }
      setBlockers(data.blockers);
    } catch {
      setError("Network error. Lena’s worksheet does not need the network.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="desk relative text-cream">
      <header className="flex items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="font-mono text-[12px] uppercase tracking-[0.2em]">
          Relink
        </Link>
        <Link
          href="/lena"
          className="font-mono text-[12px] uppercase tracking-[0.14em] text-cream/60 hover:text-cream"
        >
          Lena’s page
        </Link>
      </header>

      <div className="mx-auto max-w-2xl px-5 pb-20 sm:px-8">
        <h1 className="font-paper text-[36px] leading-tight">
          Paste tonight’s page.
        </h1>
        <p className="mt-3 text-[15px] leading-7 text-cream/75">
          This path asks a model to name only the undefined marks on the text
          you paste. It is optional. The product judges should use is{" "}
          <Link href="/lena" className="underline decoration-pen">
            Lena’s Algebra 2 worksheet
          </Link>
          , which runs with no API.
        </p>

        <label className="mt-8 block font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50">
          The page
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
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

        {error ? (
          <p className="mt-6 text-[14px] leading-6 text-cream/80">{error}</p>
        ) : null}

        {blockers ? (
          <ol className="mt-8 space-y-6">
            {blockers.map((b, i) => (
              <li key={i} className="border border-cream/15 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-undef">
                  {b.token}
                </p>
                <h2 className="font-paper mt-1 text-[22px]">{b.title}</h2>
                <p className="mt-2 text-[14px] leading-6">{b.whyThisPage}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-[14px] leading-6">
                  {b.teaching.map((t, j) => (
                    <li key={j}>{t}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </main>
  );
}
