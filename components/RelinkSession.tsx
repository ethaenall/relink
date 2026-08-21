"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Seed } from "@/lib/types";
import { Worksheet } from "./Worksheet";
import { ReentryCard } from "./ReentryCard";
import { NextLine } from "./NextLine";

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
    <div className="desk relative text-cream">
      <header className="relative z-10 flex items-center justify-between gap-4 px-4 py-5 sm:px-8">
        <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.28em]">
          Relink
        </Link>
        <p className="diag text-[12px] text-cream/70">
          {complete
            ? `note: all references defined  (${elapsed})`
            : `error[E0425]: ${remaining.length} undefined  (${elapsed})`}
        </p>
      </header>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-8 px-4 pb-20 lg:grid-cols-[minmax(0,1fr)_340px] sm:px-8">
        <aside className="order-1 lg:order-2 lg:sticky lg:top-6 h-fit">
          {open ? (
            <div className="min-h-[520px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
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
            <div className="paper-sheet paper-in p-5 text-ink">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-pen">
                rustc · tonight
              </p>
              <ul className="mt-4 space-y-1">
                {seed.blockers.map((b) => {
                  const ok = resolved.has(b.id);
                  return (
                    <li key={b.id}>
                      <button
                        type="button"
                        onClick={() => setOpenId(b.id)}
                        className="flex min-h-11 w-full items-baseline justify-between gap-3 px-1 py-2 text-left hover:bg-black/[0.04]"
                      >
                        <span className="font-mono text-[13px]">
                          <span className={ok ? "text-resolved" : "text-undef"}>
                            {ok ? "ok" : "error"}
                          </span>{" "}
                          {b.token}
                        </span>
                        <span className="text-[11px] text-ink-soft">{b.where}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {complete ? (
                <p className="mt-4 font-paper text-[15px] italic leading-5 text-resolved">
                  All three marks resolve to tonight’s notation. Problem 2 is
                  waiting on the page.
                </p>
              ) : (
                <p className="mt-4 font-mono text-[11px] leading-5 text-ink-soft">
                  help: open an error. teach only that import. return to the page.
                </p>
              )}
            </div>
          )}
        </aside>

        <div className="order-2 lg:order-1">
          <Worksheet
            seed={seed}
            resolved={resolvedView}
            interactive
            onOpen={setOpenId}
            highlightId={openId}
            footer={
              complete ? (
                <NextLine spec={seed.nextLine} closing={seed.closing} />
              ) : null
            }
          />
          {complete ? null : (
            <p className="mt-5 max-w-xl text-[14px] leading-6 text-cream/55">
              Rust waves are undefined on this page. Open one. Relink will not
              restart the unit or finish the homework.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
