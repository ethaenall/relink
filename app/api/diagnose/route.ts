import { NextResponse } from "next/server";
import { seedFromPaste } from "@/lib/fromPaste";

export const runtime = "nodejs";

const cors = {
  "Access-Control-Allow-Origin": "https://ethaenall.github.io",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(body: unknown, init?: { status?: number }) {
  return NextResponse.json(body, { status: init?.status ?? 200, headers: cors });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: cors });
}

const SYSTEM = `You are Relink, a linker — not a tutor.
A student missed class and is looking at TONIGHT'S PAGE.
Name only the undefined references: symbols or moves the page treats as already known that would make the next unfinished line unreadable.

Rules:
- Return JSON only.
- At most 3 blockers. Prefer 2 or 3.
- Teach in this page's own notation. Do not restart the unit.
- Never solve remaining homework problems. Never write the student's answers.
- Never say: you should already know, as you remember, you missed, catch up, behind, basic, obviously, go back to chapter.
- apply.choices must include exactly one correct: true, and the check must be about the UNFINISHED problem on the page, not a quiz about the example.
- nextLine.accept is the first move of the unfinished problem (several spellings). Relink will not fill it.
- If the text is not a learning page, return {"blockers":[],"error":"not a learning page"}.`;

export async function POST(req: Request) {
  const key = process.env.FEATHERLESS_API_KEY;
  if (!key) {
    return json(
      {
        error:
          "No model on this host. Load a sample page or sit with the offline Algebra 2 resource.",
      },
      { status: 501 },
    );
  }

  let body: { page?: string; stuck?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON." }, { status: 400 });
  }

  const page = (body.page ?? "").trim();
  if (page.length < 20) {
    return json(
      { error: "Paste a longer excerpt of tonight’s page." },
      { status: 400 },
    );
  }

  const user = `TONIGHT'S PAGE:\n${page.slice(0, 8000)}\n\nLINE THAT IS A WALL:\n${(body.stuck ?? "not specified").slice(0, 500)}\n\nReturn {"blockers":[{"token":"","title":"","whyThisPage":"","teaching":["",""],"apply":{"problemLabel":"","prompt":"","choices":[{"id":"a","label":"","correct":false},{"id":"b","label":"","correct":true}],"ifWrong":""},"marginNote":""}],"nextLine":{"prompt":"","accept":[""],"rejectHint":""},"closing":""}`;

  const model =
    process.env.FEATHERLESS_MODEL ?? "meta-llama/Meta-Llama-3.1-8B-Instruct";

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
    return json(
      { error: "Featherless request failed. Use a sample page.", detail: detail.slice(0, 400) },
      { status: 502 },
    );
  }

  const data = await res.json();
  const content: string = data.choices?.[0]?.message?.content ?? "";
  const start = content.indexOf("{");
  const end = content.lastIndexOf("}");
  if (start < 0 || end < 0) {
    return json(
      { error: "Model did not return JSON. Load a sample page." },
      { status: 502 },
    );
  }

  try {
    const parsed = JSON.parse(content.slice(start, end + 1));
    const seed = seedFromPaste(page, parsed);
    if (seed.blockers.length === 0) {
      return json(
        {
          error:
            parsed.error === "not a learning page"
              ? "That does not look like a learning page."
              : "No undefined imports we can name. Try a sample page.",
          model,
        },
        { status: 422 },
      );
    }
    return json({ seed, model });
  } catch {
    return json(
      { error: "Could not parse model JSON. Load a sample page." },
      { status: 502 },
    );
  }
}
