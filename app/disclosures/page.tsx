import Link from "next/link";

export default function Disclosures() {
  return (
    <main className="desk relative text-cream">
      <header className="px-5 py-5 sm:px-8">
        <Link href="/" className="font-mono text-[12px] uppercase tracking-[0.2em]">
          Relink
        </Link>
      </header>
      <article className="mx-auto max-w-2xl px-5 pb-20 text-[15px] leading-7 sm:px-8">
        <h1 className="font-paper text-[36px] leading-tight">Disclosures</h1>
        <p className="mt-4 text-cream/70">
          Required by the Suvidha AI Virtual Hackathon. Pass/fail, not scored.
        </p>

        <h2 className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50">
          AI tools
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Hermes Agent (Grok 4.6 via xAI) — coding assistant used to write this
            repository during the build window.
          </li>
          <li>
            Next.js, React, Tailwind CSS — open-source frameworks, not generative
            models.
          </li>
          <li>
            Featherless AI (OpenAI-compatible API) — optional runtime for
            /paste only. Default model:{" "}
            <code className="font-mono text-[13px]">
              meta-llama/Meta-Llama-3.1-8B-Instruct
            </code>
            . The judge path /lena does not call a model.
          </li>
        </ul>

        <h2 className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50">
          Datasets
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            None. Lena’s worksheet, blockers, and checks were written for this
            prototype. No scraped homework banks, no student data, no fine-tunes.
          </li>
        </ul>

        <h2 className="mt-10 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50">
          Built vs mocked
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Fully built: Lena’s named-person re-entry on Worksheet 4.3 — diagnosis,
            three shame-free cards, checks, return-to-page, one-pager.
          </li>
          <li>
            Fully built, network-dependent: /paste via Featherless when
            FEATHERLESS_API_KEY is set.
          </li>
          <li>Not mocked: there is no fake chat, no fake scores, no placeholder pedagogy.</li>
        </ul>
      </article>
    </main>
  );
}
