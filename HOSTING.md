# Hosting the optional model (no keys in this repo)

The demo (`/demo`) and the listed sample pages never need a key.

Any other homework page needs a linker host. Relink calls Featherless only
from that host. The key never ships in the GitHub Pages bundle.

## 1. Drop the key locally (do not commit)

Create `relink/.env.local` (gitignored):

```
FEATHERLESS_API_KEY=paste-here
FEATHERLESS_MODEL=meta-llama/Meta-Llama-3.1-8B-Instruct
```

Then `npm run dev`. Paste or upload a page that is not a sample. The tool
tries `/api/diagnose` first and falls back to the local kernel if the key
is missing.

## 2. Vercel (so the live site can name any page)

1. `npx vercel` in `relink/` (or Import the GitHub repo in the Vercel UI).
2. Project Settings → Environment Variables:
   - `FEATHERLESS_API_KEY` = the Featherless key
   - `FEATHERLESS_MODEL` = `meta-llama/Meta-Llama-3.1-8B-Instruct` (optional)
3. Deploy. Copy the URL, e.g. `https://relink-xxxx.vercel.app`.
4. GitHub repo → Settings → Secrets and variables → Actions → Variables:
   - `LINKER_API_URL` = `https://relink-xxxx.vercel.app/api/diagnose`
5. Redeploy Pages (push an empty commit or rerun the workflow).

The Pages tool will POST to that URL. The Featherless key stays only on Vercel.

## Do not

- Put the key in `README`, silkscreen, commits, or `NEXT_PUBLIC_*`.
- Commit `.env` or `.env.local`.
