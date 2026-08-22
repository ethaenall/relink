# Relink

Tonight’s page has undefined references.

**Tool (works offline):** https://ethaenall.github.io/relink/  
**Hackathon demo:** https://ethaenall.github.io/relink/demo/  
**One pager:** https://ethaenall.github.io/relink/one-pager/  
**Repo:** https://github.com/ethaenall/relink

**Who:** Lena Park, 16, 11th grade Algebra 2. Nine days of flu. First night back.  
**Barrier:** The worksheet treats three marks taught in her absence — `(b/2)²`, `√(−1)`, `i` — as already in her hands. Existing tools restart the unit or finish the homework. Both leave her locked out of tomorrow’s class.  
**What changed:** Relink names only those marks, teaches them in this page’s notation, makes you use each move on problem 2, then you write the next line. Relink does not write it.

## Demo

1. Judges: open https://ethaenall.github.io/relink/demo/ — Lena’s page, no login, no model.
2. Tool: open https://ethaenall.github.io/relink/ — tap Algebra 2 or Physics. The session starts immediately.
3. Or paste your own page. Known marks open the same linker locally.
4. Tap rust waves. Apply on the unfinished problem. Write the next line. Relink does not write it.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind
- Newsreader (worksheet) + Geist (chrome)
- Local kernel + authored seeds. No API required.
- Optional: Featherless AI for `/api/diagnose` on a Node host (stripped from GitHub Pages)

## Built vs mocked

| Path | Status |
|------|--------|
| `/` tool | **Fully built.** Load a page or paste. Local. No credentials. |
| `/demo` and `/lena` | **Fully built.** Offline Algebra 2 demo. |
| Physics sample | **Fully built.** Local seed `lib/priya.ts`. |
| One-pager, disclosures | **Fully built.** |
| GitHub Pages | **Fully built** for every static route. |
| `/api/diagnose` | **Built in source.** Optional. Not required. Stripped on Pages. |
| Chat tutor, gradebook, LMS | Not in scope. |

## Setup

```bash
npm install
npm test
npm run dev
```

Open http://localhost:3000

## Tests

```bash
npm test
```

- `check-copy` — cards cannot use shame phrasing
- `check-seed` — Lena and Priya apply-to-#2 + next-line
- `check-loop` — ApplyCheck / NextLine types
- `check-normalize` — unicode next-line accept
- `check-from-paste` / `check-kernel` — samples name marks

## Disclosures

See `/disclosures`.

**AI tools**

- Hermes Agent (Grok 4.6 via xAI) — coding assistant during the build window
- Featherless AI — optional, not used on `/` or `/demo`

**Datasets**

- None. All pedagogical content is original to this repo.

## Why this shape

The prompt asks for one named person and one narrow barrier. The demo is that page. The tool is the same linker on any page Relink can name, including the Physics resource.
