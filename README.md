# Relink

Tonight’s page has undefined references.

**Live demo (no login):** https://ethaenall.github.io/relink/  
**Judge path:** https://ethaenall.github.io/relink/lena/  
**One pager:** https://ethaenall.github.io/relink/one-pager/  
**Repo:** https://github.com/ethaenall/relink

**Who:** Lena Park, 16, 11th grade Algebra 2. Nine days of flu. First night back.  
**Barrier:** The worksheet treats three marks taught in her absence — `(b/2)²`, `√(−1)`, `i` — as already in her hands. Existing tools restart the unit or finish the homework. Both leave her locked out of tomorrow’s class.  
**What changed:** Relink names only those marks, teaches them in this page’s notation, makes you use each move on problem 2, then you write the next line. Relink does not write it.

## Demo

1. Open https://ethaenall.github.io/relink/
2. Read the landing (`error[E0425]`, Lena, the lockout).
3. Click **Sit with tonight’s page**.
4. Open each rust mark. Complete the **problem 2** check. Watch the margin define it.
5. Write `x² + 8x = −20` on the paper. Relink does not write it. Problems 2 and 3 stay unsolved.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind
- Newsreader (worksheet) + Geist (chrome)
- Optional: Featherless AI for `/api/diagnose` on a Node host (stripped from GitHub Pages)

## Built vs mocked

| Path | Status |
|------|--------|
| Lena re-entry (`/lena`) | **Fully built.** Local data in `lib/lena.ts`. This is the product. |
| Landing, one-pager, disclosures | **Fully built.** |
| GitHub Pages demo | **Fully built** for every static route. No credentials. |
| `/paste` | **Static token highlighter** on Pages. No model. |
| `/api/diagnose` | **Built in source.** Live on a Node host with `FEATHERLESS_API_KEY`. **Stripped** from GitHub Pages. |
| Chat tutor, gradebook, LMS login | Not in scope. Intentionally absent. |

## Setup

```bash
npm install
npm test
npm run dev
```

Open http://localhost:3000

Optional paste-with-model path (Node only):

```bash
cp .env.example .env.local
# set FEATHERLESS_API_KEY
```

## Tests

```bash
npm test
```

- `check-copy` — re-entry cards cannot use shame phrasing
- `check-seed` — named person, three apply-to-#2 checks, next-line accept
- `check-loop` — ApplyCheck / NextLine types
- `check-normalize` — `x² + 8x = −20` equals `x^2+8x=-20`; final answers rejected

## Disclosures

See `/disclosures`.

**AI tools**

- Hermes Agent (Grok 4.6 via xAI) — coding assistant during the build window
- Featherless AI — optional runtime, not used on the judge path (`meta-llama/Meta-Llama-3.1-8B-Instruct` unless overridden)

**Datasets**

- None. All pedagogical content is original to this repo.

## Why this shape

The prompt asks for one named person and one narrow barrier. Relink is not an AI tutor. It is a linker for a single homework page: undefined references in, the same page out, and she writes the next line.
