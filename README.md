# Relink

Tonight’s page has undefined references.

**Who:** Lena Park, 16, 11th grade Algebra 2. Nine days of flu. First night back.  
**Barrier:** The worksheet treats three marks taught in her absence — `(b/2)²`, `√(−1)`, `i` — as already in her hands. Existing tools restart the unit or finish the homework. Both leave her locked out of tomorrow’s class.  
**What changed:** Relink names only those marks, teaches them in this page’s notation, and returns her to the same worksheet. Problems 2 and 3 stay hers.

Live path for judges: **`/lena`** — no login, no API, no chat.

## Demo

1. Open the deployed site.
2. Read the landing (Lena, the lockout).
3. Click **Sit with Lena’s worksheet**.
4. Open each rust mark. Complete the one-line check. Watch the margin define it.
5. When all three resolve, the page is readable. Relink does not do problems 2 and 3.

One pager: `/one-pager`  
Disclosures: `/disclosures`  
Optional paste-your-own: `/paste` (needs Featherless; not the judge path)

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind
- Newsreader (worksheet) + Geist (chrome)
- Optional: Featherless AI for `/api/diagnose`

## Built vs mocked

| Path | Status |
|------|--------|
| Lena re-entry (`/lena`) | Fully built. Local data in `lib/lena.ts`. |
| Landing, one-pager, disclosures | Fully built. |
| `/paste` + `/api/diagnose` | Built. Returns 501 without `FEATHERLESS_API_KEY`. |
| Chat tutor, gradebook, LMS login | Not in scope. Intentionally absent. |

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

Optional paste path:

```bash
cp .env.example .env.local
# set FEATHERLESS_API_KEY
```

## Copy check

```bash
npm run check-copy
```

Fails if re-entry cards use shame phrasing (`you should already know`, `as you remember`, …).

## Disclosures

See `/disclosures` or the list below.

**AI tools**

- Hermes Agent (Grok 4.6 via xAI) — coding assistant during the build window
- Featherless AI — optional runtime for `/paste` only (`meta-llama/Meta-Llama-3.1-8B-Instruct` unless overridden)

**Datasets**

- None. All pedagogical content is original to this repo.

## Why this shape

The prompt asks for one named person and one narrow barrier. Relink is not an AI tutor. It is a linker for a single homework page: undefined references in, the same page out.
