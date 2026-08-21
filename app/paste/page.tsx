"use client";

import { useState } from "react";
import Link from "next/link";
import { namedTokens } from "@/lib/kernel/tokens";

export default function PastePage() {
  const [text, setText] = useState("");
  const [named, setNamed] = useState<string[] | null>(null);

  function scan() {
    const hits = namedTokens(text);
    setNamed(hits);
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
          Paste is not the product.
        </h1>
        <p className="mt-3 text-[15px] leading-7 text-cream/75">
          This static demo cannot run a model. It can only name a few tokens it
          already knows. The linker judges should sit with is{" "}
          <Link href="/lena" className="underline decoration-pen">
            Lena’s Algebra 2 worksheet
          </Link>
          , which uses no API.
        </p>

        <label className="mt-8 block font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50">
          The page
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setNamed(null);
            }}
            rows={10}
            className="mt-2 w-full border border-cream/15 bg-room-2 p-3 font-paper text-[16px] text-cream outline-none focus:border-cream/40"
            placeholder="Paste the homework, board notes, or textbook excerpt."
          />
        </label>
        <button
          type="button"
          onClick={scan}
          disabled={text.trim().length < 20}
          className="mt-5 min-h-11 bg-paper px-5 text-[14px] text-ink disabled:opacity-40"
        >
          Name known marks
        </button>

        {named && named.length === 0 ? (
          <p className="mt-6 text-[14px] leading-6 text-cream/80">
            No imports we can name without a model. Sit with Lena’s page.
          </p>
        ) : null}

        {named && named.length > 0 ? (
          <ul className="mt-8 font-mono text-[13px] leading-7 text-cream/80">
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
