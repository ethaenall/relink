"use client";

import { useEffect, useRef, useState } from "react";
import type { Blocker } from "@/lib/types";

export function ReentryCard({
  blocker,
  onResolved,
  onClose,
}: {
  blocker: Blocker;
  onResolved: () => void;
  onClose: () => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "wrong" | "right">("idle");
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
    setPicked(null);
    setStatus("idle");
  }, [blocker.id]);

  function submit(id: string) {
    const choice = blocker.choices.find((c) => c.id === id);
    if (!choice) return;
    setPicked(id);
    if (choice.correct) {
      setStatus("right");
    } else {
      setStatus("wrong");
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reentry-title"
      className="flex h-full flex-col bg-paper text-ink paper-sheet"
    >
      <div className="flex items-start justify-between gap-4 border-b border-rule px-5 py-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-pen">
            Re-entry · {blocker.minutes} min · {blocker.token}
          </p>
          <h2
            id="reentry-title"
            ref={headingRef}
            tabIndex={-1}
            className="font-paper mt-1 text-[22px] font-medium leading-snug outline-none"
          >
            {blocker.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 min-w-11 text-ink-soft hover:text-ink"
          aria-label="Close re-entry"
        >
          Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        <p className="text-[14px] leading-6 text-ink">{blocker.whyThisPage}</p>
        <ol className="space-y-3">
          {blocker.teaching.map((step, i) => (
            <li key={i} className="flex gap-3 text-[14px] leading-6">
              <span className="font-mono text-[11px] text-pen pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <div className="border-t border-rule pt-4">
          <p className="font-medium text-[14px] leading-6">{blocker.checkPrompt}</p>
          <div className="mt-3 space-y-2">
            {blocker.choices.map((choice) => {
              const selected = picked === choice.id;
              const show = status !== "idle" && selected;
              const ok = show && choice.correct;
              const bad = show && !choice.correct;
              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => submit(choice.id)}
                  disabled={status === "right"}
                  className={`block min-h-11 w-full border px-3 py-2 text-left text-[14px] leading-5 ${
                    ok
                      ? "border-resolved bg-resolved/10"
                      : bad
                        ? "border-undef bg-undef/10"
                        : "border-rule hover:border-ink"
                  }`}
                >
                  {choice.label}
                </button>
              );
            })}
          </div>
          {status === "wrong" ? (
            <p className="mt-3 text-[13px] leading-5 text-pen">{blocker.ifWrong}</p>
          ) : null}
          {status === "right" ? (
            <p className="mt-3 text-[13px] leading-5 text-resolved">
              That mark is defined on this page.
            </p>
          ) : null}
        </div>
      </div>

      <div className="border-t border-rule px-5 py-4">
        <button
          type="button"
          disabled={status !== "right"}
          onClick={onResolved}
          className="min-h-11 w-full bg-ink text-paper text-[14px] disabled:opacity-30"
        >
          Return to the page
        </button>
      </div>
    </div>
  );
}
