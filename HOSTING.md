# Hosting the optional model (no keys in this repo)

The demo (`/demo`) and listed sample pages never need a key.

Any other homework page needs a Node host. The browser never sees the key.

## Arming (so you can set up without spending)

`.env.local` can hold `GROQ_API_KEY` with `GROQ_ARMED=0`.
`/api/diagnose` then returns 503 and **does not call Groq**.

Set `GROQ_ARMED=1` only when you are ready to spend credits.

## 1. Local (gitignored)

`relink/.env.local`:

```
GROQ_API_KEY=gsk_…
GROQ_MODEL=llama-3.1-8b-instant
GROQ_ARMED=0
```

`npm run dev`. Samples still run with no model.

## 2. Vercel (key stays private)

1. Import `relink` or `npx vercel`.
2. Env vars (Production + Preview):
   - `GROQ_API_KEY` = the Groq key
   - `GROQ_MODEL` = `llama-3.1-8b-instant`
   - `GROQ_ARMED` = `0` until you want live any-page
3. Deploy. Copy `https://….vercel.app`.
4. GitHub → Settings → Secrets and variables → Actions → Variables:
   - `LINKER_API_URL` = `https://….vercel.app/api/diagnose`
5. Redeploy Pages.

CORS already allows `https://ethaenall.github.io`.

## Do not

- Put the key in `README`, commits, or `NEXT_PUBLIC_*`.
- Commit `.env` or `.env.local`.
- Call `api.groq.com` from the browser.
