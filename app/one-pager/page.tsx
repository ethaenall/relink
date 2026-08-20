import Link from "next/link";
import { lena } from "@/lib/lena";
import { Worksheet } from "@/components/Worksheet";

export default function OnePager() {
  const resolved = new Set(lena.blockers.map((b) => b.id));

  return (
    <main className="min-h-screen bg-paper text-ink print:bg-white">
      <div className="mx-auto max-w-5xl px-6 py-10 sm:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-pen">
          Relink · Suvidha AI Virtual Hackathon · one pager
        </p>
        <h1 className="font-paper mt-3 text-[42px] leading-[1.05] sm:text-[56px]">
          Lena is not starting the unit over.
          <span className="block text-pen">
            Tonight’s page has three undefined references.
          </span>
        </h1>

        <section className="mt-8 grid gap-8 border-y border-ink/15 py-8 md:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
              Who
            </p>
            <p className="mt-2 text-[15px] leading-6">
              Lena Park, 16, 11th grade Algebra 2. Nine school days of flu. First
              night back. Westfield High, Period 3, Worksheet 4.3.
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
              The lockout
            </p>
            <p className="mt-2 text-[15px] leading-6">
              The worksheet treats (b/2)², √(−1), and i as already in her hands.
              She still has last month’s algebra. The next line is unreadable.
              Shame and a 40-minute Khan restart both keep her out of tomorrow’s
              class.
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
              What changed
            </p>
            <p className="mt-2 text-[15px] leading-6">
              In about twelve minutes the three marks are defined in this page’s
              own notation. Problems 2 and 3 are still hers. She can sit down
              tomorrow.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-undef">
              Before · 3 undefined
            </p>
            <div className="mt-3 scale-[0.92] origin-top-left">
              <Worksheet seed={lena} resolved={new Set()} />
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-resolved">
              After · same page, marks resolved
            </p>
            <div className="mt-3 scale-[0.92] origin-top-left">
              <Worksheet seed={lena} resolved={resolved} />
            </div>
          </div>
        </section>

        <section className="mt-12 max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
            How it works
          </p>
          <ol className="mt-4 space-y-3 text-[15px] leading-6">
            <li>
              <span className="font-mono text-[11px] text-pen">01</span>{" "}
              Open tonight’s page. Relink lists only the symbols this page uses
              as primitives that Lena cannot yet treat as given.
            </li>
            <li>
              <span className="font-mono text-[11px] text-pen">02</span>{" "}
              Each re-entry is two to three minutes, taught on this example —
              not Chapter 4, not a chatbot, not the solutions to problems 2 and 3.
            </li>
            <li>
              <span className="font-mono text-[11px] text-pen">03</span>{" "}
              A one-line check. Then the mark turns defined in the margin, and
              she is returned to the same worksheet.
            </li>
          </ol>
        </section>

        <p className="mt-12 text-[14px] leading-6">
          Live demo:{" "}
          <Link href="/lena" className="underline decoration-pen">
            /lena
          </Link>
          . Paste-your-own is extra and needs Featherless; Lena’s path is fully
          built with no network. Built during the event window. Disclosures on{" "}
          <Link href="/disclosures" className="underline decoration-pen">
            /disclosures
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
