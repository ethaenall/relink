import { lena } from "@/lib/lena";
import { Worksheet } from "@/components/Worksheet";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-room text-cream">
      <header className="flex items-center justify-between px-5 py-5 sm:px-8">
        <p className="font-mono text-[12px] uppercase tracking-[0.22em]">Relink</p>
        <nav className="flex gap-5 font-mono text-[12px] uppercase tracking-[0.14em] text-cream/60">
          <Link href="/one-pager" className="hover:text-cream">
            One pager
          </Link>
          <Link href="/disclosures" className="hover:text-cream">
            Disclosures
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-start gap-10 px-5 pb-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)] sm:px-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-undef">
            3 undefined references
          </p>
          <div className="mt-4 origin-top scale-[0.98]">
            <Worksheet seed={lena} resolved={new Set()} />
          </div>
        </div>

        <div className="lg:pt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/50">
            The person
          </p>
          <h1 className="font-paper mt-3 text-[40px] leading-[1.05] sm:text-[52px]">
            Tonight’s page has undefined references.
          </h1>
          <div className="mt-6 space-y-4 text-[15px] leading-7 text-cream/80">
            <p>
              Lena is 16. She missed nine instructional days of Algebra 2 with
              the flu. This is the first night back. The worksheet in front of
              her was written for someone who was in the room.
            </p>
            <p>
              She can still factor x² + 6x + 9. She can still move a term. She
              cannot treat <span className="text-cream">(b/2)²</span>,{" "}
              <span className="text-cream">√(−1)</span>, or{" "}
              <span className="text-cream">i</span> as given. Every resource she
              tried either restarts the unit or finishes the homework for her.
              Both leave her locked out of class tomorrow.
            </p>
            <p>
              Relink treats the page the way a compiler treats a missing import:
              name the undefined marks, resolve only those, return her to the
              same page. It never says she should already know this.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/lena"
              className="inline-flex min-h-11 items-center justify-center bg-paper px-5 text-[14px] text-ink"
            >
              Sit with Lena’s worksheet
            </Link>
            <Link
              href="/paste"
              className="inline-flex min-h-11 items-center justify-center border border-cream/20 px-5 text-[14px] text-cream/80 hover:border-cream/50"
            >
              Paste another page
            </Link>
          </div>
          <p className="mt-4 font-mono text-[11px] leading-5 text-cream/45">
            No account. No chat. The judge path is fully local — the three
            blockers are real pedagogy, not a prompt wrapper.
          </p>
        </div>
      </section>
    </main>
  );
}
