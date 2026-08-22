"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Seed } from "@/lib/types";
import { LampGlow } from "./LampGlow";
import { Worksheet } from "./Worksheet";
import { ReentryCard } from "./ReentryCard";
import { NextLine } from "./NextLine";

function formatElapsed(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

/** Wraps the live count so it re-mounts and ticks in on each change. */
function Tick({ n }: { n: number }) {
  return (
    <span key={n} className="tick">
      {n}
    </span>
  );
}

export function RelinkSession({
  side = "right",
  seed,
  note,
  hero = false,
}: {
  /** Which column the paper sits in on wide screens. */
  side?: "left" | "right";
  seed: Seed;
  note?: string;
  hero?: boolean;
}) {
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
  const paperFirst = side === "left";

  return (
    <div className="desk relative text-cream">
      <LampGlow />
      {complete ? <div className="warmth" aria-hidden="true" /> : null}

      <header className="relative z-10 flex items-center justify-between gap-4 px-4 py-5 sm:px-8">
        <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.28em]">
          Relink
        </Link>
        <p className="hidden font-mono text-[11px] text-cream/45 sm:block">
          Mar 12 · 11:14 PM · first night back
        </p>
        <nav className="flex gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/50">
          <Link href="/one-pager" className="navlink hover:text-cream">
            One pager
          </Link>
          <Link href="/open" className="navlink hover:text-cream">
            Your page
          </Link>
        </nav>
      </header>

      {hero ? (
        <section className="relative z-10 mx-auto max-w-6xl px-4 pb-8 sm:px-8">
          <div className="stagger">
            <p className="diag text-[13px] leading-6 text-[#e8a598] sm:text-[15px]">
              <span className="text-undef">error[E0425]</span>
              {complete
                ? `: all references defined  (${elapsed})`
                : (
                  <>
                    {": "}
                    <Tick n={remaining.length} />
                    {" undefined references  "}
                    {`(${elapsed})`}
                    <span className="cursor-live" aria-hidden="true">
                      {" "}
                    </span>
                  </>
                )}
              {"\n"}
              {"  --> Algebra2/4.3.rs: Lena Park, 16"}
              {"\n"}
              {"   |"}
            </p>
            <h1 className="font-paper mt-4 max-w-3xl text-[36px] leading-[0.98] sm:text-[58px]">
              Tonight’s page has undefined references.
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-cream/80">
              Nine days of flu. She can still factor x² + 6x + 9. This worksheet
              was written for someone who was in the room. Khan restarts the unit.
              A chatbot finishes the homework. Relink names only the missing
              imports.
            </p>
            <p className="mt-3 font-mono text-[11px] leading-5 text-cream/40">
              built by a student who has sat in class unable to parse the board.
              no account. no model on this page.
            </p>
          </div>
        </section>
      ) : (
        <p className="relative z-10 px-4 pb-4 font-mono text-[12px] text-cream/60 sm:px-8">
          {note ? `${note} · ` : ""}
          {complete
            ? `note: all references defined  (${elapsed})`
            : (
              <>
                error[E0425]: <Tick n={remaining.length} /> undefined
                {`  (${elapsed})`}
              </>
            )}
        </p>
      )}

      <div className="relative z-10 mx-auto grid max-w-6xl gap-8 px-4 pb-24 lg:grid-cols-[minmax(0,1fr)_340px] sm:px-8">
        <aside
          className={`order-1 h-fit lg:sticky lg:top-6 ${
            paperFirst ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {open ? (
            <div className="min-h-[520px] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
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
              {complete ? <DefinedStamp /> : null}
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-pen">
                rustc · tonight
              </p>
              <p className="diag mt-3 text-[12px] leading-5 text-pen">
                {complete
                  ? "note: all references defined"
                  : `error[E0425]: ${remaining.length} undefined reference${remaining.length === 1 ? "" : "s"}`}
              </p>
              <ul className="mt-4 space-y-1">
                {seed.blockers.map((b) => {
                  const ok = resolved.has(b.id);
                  return (
                    <li key={b.id}>
                      <button
                        type="button"
                        onClick={() => setOpenId(b.id)}
                        className="err-row flex min-h-11 w-full items-baseline justify-between gap-3 px-1 py-2 text-left hover:bg-black/[0.04]"
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
                  The page is readable. Problem 2 is waiting. Relink will not
                  write it.
                </p>
              ) : (
                <p className="mt-4 font-mono text-[11px] leading-5 text-ink-soft">
                  help: tap a rust wave on the paper, or open an error here.
                  teach only that import.
                </p>
              )}
            </div>
          )}
        </aside>

        <div className={`order-2 ${paperFirst ? "lg:order-2" : "lg:order-1"}`}>
          <Worksheet
            seed={seed}
            resolved={resolvedView}
            interactive
            onOpen={setOpenId}
            highlightId={openId}
            footer={
              complete && seed.nextLine.accept.length > 0 ? (
                <NextLine spec={seed.nextLine} closing={seed.closing} />
              ) : complete ? (
                <p className="pl-8 font-paper text-[15px] italic leading-6 text-resolved">
                  {seed.closing}
                </p>
              ) : null
            }
          />
          {complete ? null : (
            <p className="mt-5 max-w-xl text-[14px] leading-6 text-cream/55">
              The rust waves are the lockout. Open one. Relink will not restart
              the unit or finish the homework.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/** Green "ALL REFERENCES DEFINED" seal, stamped onto the rustc list when done. */
function DefinedStamp() {
  return (
    <div className="stamp stamp-in" aria-hidden="true">
      <span className="stamp-main">all references defined</span>
      <span className="stamp-sub">the page is hers again</span>
    </div>
  );
}
