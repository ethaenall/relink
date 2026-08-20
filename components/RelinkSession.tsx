"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Seed } from "@/lib/types";
import { Worksheet } from "./Worksheet";
import { ReentryCard } from "./ReentryCard";

function formatElapsed(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}

export function RelinkSession({ seed }: { seed: Seed }) {
  const [resolved, setResolved] = useState<Set<string>>(new Set());
  const [openId, setOpenId] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());
  const [doneAt, setDoneAt] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const open = seed.blockers.find((b) => b.id === openId) ?? null;
  const remaining = seed.blockers.filter((b) => !resolved.has(b.id));
  const complete = remaining.length === 0;

  useEffect(() => {
    if (complete && doneAt === null) setDoneAt(Date.now());
  }, [complete, doneAt]);

  const elapsed = formatElapsed((doneAt ?? now) - startedAt);

  const resolvedView = useMemo(() => new Set(resolved), [resolved]);

  return (
    <div className="min-h-screen bg-room text-cream">
      <header className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="font-mono text-[12px] uppercase tracking-[0.2em]">
          Relink
        </Link>
        <p className="font-mono text-[12px] text-cream/70">
          {complete
            ? `defined · ${elapsed}`
            : `${remaining.length} undefined · ${elapsed}`}
        </p>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 lg:grid-cols-[minmax(0,1fr)_320px] sm:px-6">
        <div>
          <Worksheet
            seed={seed}
            resolved={resolvedView}
            interactive
            onOpen={setOpenId}
          />
          {complete ? (
            <p className="mt-4 max-w-prose text-[14px] leading-6 text-cream/80">
              {seed.closing}
            </p>
          ) : (
            <p className="mt-4 max-w-prose text-[13px] leading-6 text-cream/55">
              Rust marks are undefined on this page. Open one. Relink will not
              restart the unit or finish the homework.
            </p>
          )}
        </div>

        <aside className="lg:sticky lg:top-4 h-fit">
          {open ? (
            <div className="min-h-[480px] overflow-hidden border border-cream/10">
              <ReentryCard
                blocker={open}
                onClose={() => setOpenId(null)}
                onResolved={() => {
                  setResolved((prev) => new Set(prev).add(open.id));
                  setOpenId(null);
                }}
              />
            </div>
          ) : (
            <div className="border border-cream/10 bg-room-2 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/50">
                Undefined references
              </p>
              <ul className="mt-4 space-y-2">
                {seed.blockers.map((b) => {
                  const ok = resolved.has(b.id);
                  return (
                    <li key={b.id}>
                      <button
                        type="button"
                        onClick={() => setOpenId(b.id)}
                        className="flex min-h-11 w-full items-baseline justify-between gap-3 border border-cream/10 px-3 py-2 text-left hover:border-cream/30"
                      >
                        <span className="font-mono text-[13px]">
                          <span className={ok ? "text-resolved" : "text-undef"}>
                            {ok ? "✓" : "×"}
                          </span>{" "}
                          {b.token}
                        </span>
                        <span className="text-[12px] text-cream/50">{b.where}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {complete ? (
                <p className="mt-4 text-[13px] leading-5 text-cream/70">
                  All three marks resolve to tonight’s notation. Problem 2 is waiting.
                </p>
              ) : null}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
