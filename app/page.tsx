import { lena } from "@/lib/lena";
import { Worksheet } from "@/components/Worksheet";
import Link from "next/link";

export default function Home() {
  return (
    <main className="desk relative text-cream">
      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em]">Relink</p>
        <p className="hidden font-mono text-[11px] text-cream/45 sm:block">
          Mar 12 · 11:14 PM · first night back
        </p>
        <nav className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.14em] text-cream/50">
          <Link href="/one-pager" className="hover:text-cream">
            One pager
          </Link>
          <Link href="/disclosures" className="hover:text-cream">
            Disclosures
          </Link>
        </nav>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-24 sm:px-10">
        <p className="diag text-[13px] leading-6 text-[#e8a598] sm:text-[15px]">
          <span className="text-undef">error[E0425]</span>
          {": 3 undefined references"}
          {"\n"}
          {"  --> Algebra2/4.3.rs: Lena Park, 16"}
          {"\n"}
          {"   |"}
        </p>
        <h1 className="font-paper mt-5 max-w-3xl text-[42px] leading-[0.98] sm:text-[68px]">
          Tonight’s page has undefined references.
        </h1>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.75fr)]">
          <Worksheet seed={lena} resolved={new Set()} />

          <aside className="lg:sticky lg:top-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/40">
              cannot find in this scope
            </p>
            <ul className="mt-4 font-mono text-[13px] leading-7 text-cream/80">
              <li>
                <span className="text-undef">×</span> (b/2)²
                <span className="text-cream/35"> — line after the move</span>
              </li>
              <li>
                <span className="text-undef">×</span> √(−1)
                <span className="text-cream/35"> — after the square</span>
              </li>
              <li>
                <span className="text-undef">×</span> i
                <span className="text-cream/35"> — last two lines</span>
              </li>
            </ul>
            <p className="mt-8 text-[15px] leading-7 text-cream/80">
              Nine days of flu. She can still factor x² + 6x + 9. This worksheet
              was written for someone who was in the room. Khan restarts the
              unit. A chatbot finishes the homework. Both leave her locked out
              of class tomorrow.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-cream/80">
              Relink is a linker. Name the missing imports. Resolve only those.
              Return her to the same page.
            </p>
            <Link
              href="/paste"
              className="mt-8 inline-flex min-h-12 items-center bg-paper px-6 font-paper text-[18px] italic text-ink"
            >
              Paste tonight’s page →
            </Link>
            <p className="mt-3 font-mono text-[11px] text-cream/40">
              Your page. Relink will not do the homework.
            </p>
            <p className="mt-6 font-mono text-[11px] leading-5 text-cream/45">
              built by a student who has sat in class unable to parse the board.
            </p>
            <p className="mt-6">
              <Link
                href="/lena"
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-cream/35 hover:text-cream/70"
              >
                Algebra 2 resource, offline
              </Link>
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
