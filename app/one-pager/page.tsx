import Link from "next/link";
import { lena } from "@/lib/lena";
import { Worksheet } from "@/components/Worksheet";

export default function OnePager() {
  const resolved = new Set(lena.blockers.map((b) => b.id));

  return (
    <main className="min-h-screen bg-[#ece4d4] text-ink">
      <div className="mx-auto max-w-5xl px-6 py-10 sm:px-10">
        <div className="flex items-start justify-between gap-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-pen">
            Relink · one pager · Suvidha 2026
          </p>
          <p className="font-mono text-[11px] tracking-[0.14em] text-undef">
            STAMPED · NIGHT 1 BACK
          </p>
        </div>
        <h1 className="font-paper mt-4 text-[44px] leading-[0.98] sm:text-[64px]">
          Lena is not starting over.
          <span className="mt-2 block text-pen">
            error[E0425]: 3 undefined references
          </span>
        </h1>

        <section className="mt-8 grid gap-8 border-y border-ink/20 py-8 md:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
              Who
            </p>
            <p className="mt-2 text-[15px] leading-6">
              Lena Park, 16, 11th grade Algebra 2. Nine school days of flu.
              First night back. Westfield High, Period 3, Worksheet 4.3, 11:14
              PM.
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
              The lockout
            </p>
            <p className="mt-2 text-[15px] leading-6">
              The page treats (b/2)², √(−1), and i as already in her hands. She
              still has last month’s algebra. The next line is unreadable.
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
              What changed
            </p>
            <p className="mt-2 text-[15px] leading-6">
              Twelve minutes. Three marks defined in this page’s notation.
              Problems 2 and 3 still hers. She can sit down tomorrow.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-undef">
              Before · cannot find in this scope
            </p>
            <div className="mt-3">
              <Worksheet seed={lena} resolved={new Set()} />
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-resolved">
              After · same page, imports resolved
            </p>
            <div className="mt-3">
              <Worksheet seed={lena} resolved={resolved} />
            </div>
          </div>
        </section>

        <ol className="mt-12 max-w-3xl space-y-3 font-paper text-[18px] leading-7">
          <li>01 — Name only the primitives this page uses that she cannot treat as given.</li>
          <li>02 — Two to three minutes, on this example. Not Chapter 4. Not the answers to 2 and 3.</li>
          <li>03 — One check. Margin ink. Return to the same worksheet.</li>
        </ol>

        <p className="mt-10 font-mono text-[13px] leading-6">
          Demo{" "}
          <Link href="/lena" className="underline decoration-pen">
            /lena
          </Link>
          {"  ·  "}
          <Link href="/disclosures" className="underline decoration-pen">
            /disclosures
          </Link>
          {"  ·  no model on the judge path"}
        </p>
      </div>
    </main>
  );
}
