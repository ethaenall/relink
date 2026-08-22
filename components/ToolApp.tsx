"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Seed } from "@/lib/types";
import { samples } from "@/lib/samples";
import { textFromFile } from "@/lib/readUpload";
import { linkPage } from "@/lib/linkPage";
import { RelinkSession } from "@/components/RelinkSession";

export function ToolApp() {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [seed, setSeed] = useState<Seed | null>(null);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function loadSample(id: string) {
    const sample = samples.find((s) => s.id === id);
    if (!sample) return;
    setText(sample.page);
    setError(null);
    setSource("sample");
    setSeed(sample.seed);
  }

  async function runPage(raw = text) {
    setBusy(true);
    setError(null);
    setStatus("Naming marks…");
    try {
      const result = await linkPage(raw);
      setStatus(null);
      if (!result.ok) {
        setSeed(null);
        setError(result.error);
        return;
      }
      setSource(result.source);
      setSeed(result.seed);
    } finally {
      setBusy(false);
    }
  }

  async function onFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setStatus(
      file.type.startsWith("image/")
        ? "Reading the photo (first time may download OCR)…"
        : "Reading the document…",
    );
    try {
      const { text: extracted } = await textFromFile(file);
      setText(extracted);
      await runPage(extracted);
    } catch (err) {
      setStatus(null);
      setError(err instanceof Error ? err.message : "Could not read that file.");
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
            linker · {source ?? "local"}
          </p>
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
          <Link href="/" className="hover:text-cream">
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
          Open tonight’s page.
        </h1>
        <p className="mt-3 text-[15px] leading-7 text-cream/75">
          Relink names only the missing imports. It will not finish the homework.
          Listed pages always run here. Any other page uses a model host if one
          is configured — otherwise the local kernel.
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

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="min-h-11 border border-cream/30 px-5 text-[14px] text-cream hover:border-cream"
          >
            Upload photo or document
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,.pdf,.docx,.txt,.md,.csv,.tex"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              void onFile(file);
            }}
          />
        </div>
        <p className="mt-2 font-mono text-[11px] leading-5 text-cream/40">
          Photo, PDF, Word (.docx), or text. The file stays in this browser.
        </p>

        <label className="mt-8 block font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50">
          Or paste
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError(null);
            }}
            rows={10}
            className="mt-2 w-full border border-cream/15 bg-room-2 p-3 font-paper text-[16px] text-cream outline-none focus:border-cream/40"
            placeholder="Paste the homework, board notes, or textbook excerpt."
          />
        </label>
        <button
          type="button"
          onClick={() => void runPage()}
          disabled={busy || text.trim().length < 20}
          className="mt-5 min-h-11 bg-paper px-5 text-[14px] text-ink disabled:opacity-40"
        >
          {busy ? "Naming marks…" : "Name the undefined marks"}
        </button>
        {status ? (
          <p className="mt-6 text-[14px] leading-6 text-cream/70">{status}</p>
        ) : null}
        {error ? (
          <p className="mt-6 text-[14px] leading-6 text-cream/80">{error}</p>
        ) : null}
      </div>
    </main>
  );
}
