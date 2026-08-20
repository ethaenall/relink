import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM = `You are Relink. A student missed class and is looking at TONIGHT'S page.
Name the minimum undefined references: symbols or moves the page treats as already known that would make the next line unreadable.

Rules:
- Return JSON only, matching the schema.
- At most 4 blockers. Prefer 2 or 3.
- Teach using the page's own notation. Do not restart the unit.
- Never do the remaining homework problems.
- Never say: you should already know, as you remember, you missed, catch up, behind, basic, obviously, go back to chapter.
- If the page is not instructional text, return {"blockers":[],"error":"not a learning page"}.`;

export async function POST(req: Request) {
  const key = process.env.FEATHERLESS_API_KEY;
  if (!key) {
    return NextResponse.json(
      {
        error:
          "Paste-your-own needs FEATHERLESS_API_KEY on the server. The judge path is /lena — it is fully built and uses no model.",
      },
      { status: 501 },
    );
  }

  let body: { page?: string; stuck?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const page = (body.page ?? "").trim();
  if (page.length < 20) {
    return NextResponse.json(
      { error: "Paste a longer excerpt of tonight’s page." },
      { status: 400 },
    );
  }

  const user = `TONIGHT'S PAGE:\n${page.slice(0, 8000)}\n\nLINE THAT IS A WALL:\n${(body.stuck ?? "not specified").slice(0, 500)}\n\nReturn {"blockers":[{"token":"","title":"","whyThisPage":"","teaching":["",""],"checkPrompt":"","choices":[{"id":"a","label":"","correct":false}],"marginNote":""}]}`;

  const model = process.env.FEATHERLESS_MODEL ?? "meta-llama/Meta-Llama-3.1-8B-Instruct";

  const res = await fetch("https://api.featherless.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: user },
      ],
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    return NextResponse.json(
      { error: "Featherless request failed.", detail: detail.slice(0, 400) },
      { status: 502 },
    );
  }

  const data = await res.json();
  const content: string = data.choices?.[0]?.message?.content ?? "";
  const start = content.indexOf("{");
  const end = content.lastIndexOf("}");
  if (start < 0 || end < 0) {
    return NextResponse.json(
      { error: "Model did not return JSON. Use /lena." },
      { status: 502 },
    );
  }

  try {
    const parsed = JSON.parse(content.slice(start, end + 1));
    const blockers = Array.isArray(parsed.blockers)
      ? parsed.blockers.slice(0, 4)
      : [];
    return NextResponse.json({ blockers, model });
  } catch {
    return NextResponse.json(
      { error: "Could not parse model JSON. Use /lena." },
      { status: 502 },
    );
  }
}
