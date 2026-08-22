# Relink

Tonight’s page has undefined references.

**Live demo (no login):** https://ethaenall.github.io/relink/  
**Open your page:** https://ethaenall.github.io/relink/open/  
**One pager:** https://ethaenall.github.io/relink/one-pager/  
**Repo:** https://github.com/ethaenall/relink

**Who:** Lena Park, 16, 11th grade Algebra 2. Nine days of flu. First night back.  
**Barrier:** The worksheet treats three marks taught in her absence — `(b/2)²`, `√(−1)`, `i` — as already in her hands. Existing tools restart the unit or finish the homework. Both leave her locked out of tomorrow’s class.  
**What changed:** Relink names only those marks, teaches them in this page’s notation, makes you use each move on problem 2, then you write the next line. Relink does not write it.

## Demo

1. Judges: open https://ethaenall.github.io/relink/ — Lena’s page, no login, no model.
2. Tap each rust wave. Apply the move on problem 2. Write `x² + 8x = −20`. Relink does not write it.
3. Optional: https://ethaenall.github.io/relink/open/ — load Physics/Calculus, paste, or upload.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind
- Newsreader (worksheet) + Geist (chrome)
- Local kernel + authored seeds. No API required.
See `HOSTING.md` to attach Featherless later. No keys live in this repo.

## Built vs mocked

| Path | Status |
|------|--------|
| `/` and `/demo` `/lena` | **Fully built.** Offline Lena demo. This is the judge path. |
| `/open` | **Fully built.** Load a page, paste, or upload. Local. |
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
