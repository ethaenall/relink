import type { InlinePart, Seed, WorksheetLine } from "@/lib/types";

function Part({
  part,
  resolved,
  interactive,
  onOpen,
}: {
  part: InlinePart;
  resolved: Set<string>;
  interactive: boolean;
  onOpen?: (id: string) => void;
}) {
  if (!("blockerId" in part) || !part.blockerId) {
    return <span>{part.text}</span>;
  }

  const done = resolved.has(part.blockerId);
  if (!interactive) {
    return (
      <span className={done ? "ok-mark" : "undef-mark"}>{part.text}</span>
    );
  }

  return (
    <button
      type="button"
      className={done ? "ok-mark" : "undef-mark"}
      onClick={() => onOpen?.(part.blockerId)}
      aria-label={
        done
          ? `${part.text}, resolved`
          : `${part.text}, undefined reference. Open re-entry.`
      }
    >
      {part.text}
    </button>
  );
}

function Line({
  line,
  resolved,
  interactive,
  onOpen,
  blockers,
}: {
  line: WorksheetLine;
  resolved: Set<string>;
  interactive: boolean;
  onOpen?: (id: string) => void;
  blockers: Seed["blockers"];
}) {
  const margin =
    line.marginFor && resolved.has(line.marginFor)
      ? blockers.find((b) => b.id === line.marginFor)?.marginNote
      : null;

  const base =
    line.kind === "meta"
      ? "text-[11px] uppercase tracking-[0.14em] text-ink-soft"
      : line.kind === "title"
        ? "font-paper text-[22px] sm:text-[26px] font-medium leading-tight"
        : line.kind === "section"
          ? "mt-4 text-[12px] uppercase tracking-[0.16em] text-pen"
          : line.kind === "math"
            ? "font-paper text-[18px] sm:text-[20px] italic leading-8 pl-4"
            : line.kind === "task"
              ? "font-paper text-[18px] sm:text-[20px] leading-8 pt-2"
              : "text-[14px] leading-6 text-ink-soft";

  return (
    <div className="relative min-h-[32px] pr-2 md:pr-56">
      <p className={base}>
        {line.parts.map((part, i) => (
          <Part
            key={i}
            part={part}
            resolved={resolved}
            interactive={interactive}
            onOpen={onOpen}
          />
        ))}
      </p>
      {margin ? (
        <p className="mt-1 text-[12px] leading-4 text-resolved md:absolute md:right-0 md:top-0 md:mt-0 md:w-52 md:text-right md:leading-snug">
          {margin}
        </p>
      ) : null}
    </div>
  );
}

export function Worksheet({
  seed,
  resolved,
  interactive = false,
  onOpen,
}: {
  seed: Seed;
  resolved: Set<string>;
  interactive?: boolean;
  onOpen?: (id: string) => void;
}) {
  return (
    <article className="paper-sheet px-6 py-8 sm:px-10 sm:py-10 text-ink">
      <div className="space-y-2">
        {seed.lines.map((line) => (
          <Line
            key={line.id}
            line={line}
            resolved={resolved}
            interactive={interactive}
            onOpen={onOpen}
            blockers={seed.blockers}
          />
        ))}
      </div>
    </article>
  );
}
