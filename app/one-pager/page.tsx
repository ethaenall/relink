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
        <p className="mt-3 font-mono text-[11px] leading-5 text-ink-soft">
          built by a student who has sat locked out of a board
        </p>
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
              Twelve minutes. Three marks defined. She writes the first move of
              problem 2. Relink does not.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-undef">
              Before · cannot find in this scope
            </p>
            <div className="mt-3 [&_.paper-sheet]:px-4 [&_.paper-sheet]:py-6">
              <Worksheet seed={lena} resolved={new Set()} />
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-resolved">
              After · same page, she wrote the next line
            </p>
            <div className="mt-3 [&_.paper-sheet]:px-4 [&_.paper-sheet]:py-6">
              <Worksheet
                seed={lena}
                resolved={resolved}
                footer={
                  <div className="relative min-h-[32px] pl-8 pr-2">
                    <p className="lena-hand font-paper text-[19px] sm:text-[22px] italic leading-8">
                      x² + 8x = −20
                    </p>
                  </div>
                }
              />
            </div>
          </div>
        </section>

        <ol className="mt-12 max-w-3xl space-y-3 font-paper text-[18px] leading-7">
          <li>01 — Tap the rust wave.</li>
          <li>02 — Apply the import on problem 2.</li>
          <li>03 — Write the next line. Relink refuses to write it.</li>
        </ol>

        <p className="mt-10 font-mono text-[13px] leading-6">
          Demo{" "}
          <Link href="/" className="underline decoration-pen">
            sit with Lena
          </Link>
          {"  ·  "}
          <Link href="/open" className="underline decoration-pen">
            open your page
          </Link>
          {"  ·  "}
          <Link href="/disclosures" className="underline decoration-pen">
            /disclosures
          </Link>
        </p>
      </div>
    </main>
  );
}
