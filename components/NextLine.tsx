"use client";

import { useState } from "react";
import type { NextLine as NextLineSpec } from "@/lib/types";
import { acceptsNextLine } from "@/lib/normalizeLine";

export function NextLine({
  spec,
  closing,
}: {
  spec: NextLineSpec;
  closing: string;
}) {
  const [raw, setRaw] = useState("");
  const [status, setStatus] = useState<"idle" | "wrong" | "right">("idle");

  function submit() {
    if (acceptsNextLine(raw, spec.accept)) setStatus("right");
    else setStatus("wrong");
  }

  if (status === "right") {
    return (
      <div className="relative min-h-[32px] pl-8 pr-2">
        <p className="lena-hand font-paper text-[19px] sm:text-[22px] italic leading-8">
          {raw.trim()}
        </p>
        <p className="mt-2 text-[13px] leading-5 text-resolved">{closing}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-[32px] pl-8 pr-2">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-pen">
        {spec.prompt}
      </p>
      <form
        className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          value={raw}
          onChange={(e) => {
            setRaw(e.target.value);
            if (status === "wrong") setStatus("idle");
          }}
          aria-label="Write the first move of problem 2"
          className="lena-hand min-h-11 w-full border-0 border-b border-ink/30 bg-transparent px-0 font-paper text-[19px] italic leading-8 text-ink outline-none focus:border-pen sm:text-[22px]"
          placeholder="x² + 8x = …"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className="min-h-11 shrink-0 bg-ink px-4 text-[13px] text-paper"
        >
          Write it
        </button>
      </form>
      {status === "wrong" ? (
        <p className="mt-2 text-[13px] leading-5 text-pen">{spec.rejectHint}</p>
      ) : null}
    </div>
  );
}
