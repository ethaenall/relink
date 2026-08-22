export type UploadKind = "text" | "pdf" | "docx" | "image" | "unknown";

export function classifyUpload(name: string, type: string): UploadKind {
  const n = name.toLowerCase();
  const t = (type || "").toLowerCase();
  if (t.startsWith("image/") || /\.(png|jpe?g|gif|webp|heic)$/.test(n)) {
    return "image";
  }
  if (t === "application/pdf" || n.endsWith(".pdf")) return "pdf";
  if (n.endsWith(".docx") || t.includes("wordprocessingml")) return "docx";
  if (t.startsWith("text/") || /\.(txt|md|csv|tex)$/.test(n)) return "text";
  return "unknown";
}

export function matchSamplePage(text: string): "lena-4-3" | "priya-friction" | null {
  const folded = text.toLowerCase();
  if (folded.includes("(b/2)") && folded.includes("completing the square")) {
    return "lena-4-3";
  }
  if (
    folded.includes("μ_s") ||
    folded.includes("mu_s") ||
    folded.includes("on the verge")
  ) {
    if (
      folded.includes("friction") ||
      folded.includes("μ_s") ||
      folded.includes("mu_s")
    ) {
      return "priya-friction";
    }
  }
  return null;
}

async function readPlainText(file: File): Promise<string> {
  return file.text();
}

async function readPdf(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc =
    "https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs";
  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data }).promise;
  const parts: string[] = [];
  const last = Math.min(pdf.numPages, 8);
  for (let i = 1; i <= last; i += 1) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const line = content.items
      .map((item) => {
        const row = item as { str?: string };
        return row.str ?? "";
      })
      .join(" ");
    if (line.trim()) parts.push(line);
  }
  return parts.join("\n");
}

async function readDocx(file: File): Promise<string> {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({
    arrayBuffer: await file.arrayBuffer(),
  });
  return result.value;
}

async function readImage(file: File): Promise<string> {
  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker("eng");
  try {
    const { data } = await worker.recognize(file);
    return data.text;
  } finally {
    await worker.terminate();
  }
}

export async function textFromFile(file: File): Promise<{
  text: string;
  kind: UploadKind;
}> {
  const kind = classifyUpload(file.name, file.type);
  if (kind === "unknown") {
    throw new Error(
      "Use a photo, PDF, Word (.docx), or a text file. Older .doc files are not read here.",
    );
  }
  if (file.size > 12 * 1024 * 1024) {
    throw new Error("That file is larger than 12 MB.");
  }
  let text = "";
  if (kind === "text") text = await readPlainText(file);
  else if (kind === "pdf") text = await readPdf(file);
  else if (kind === "docx") text = await readDocx(file);
  else text = await readImage(file);
  text = text.replace(/\u0000/g, "").trim();
  if (text.length < 12) {
    throw new Error(
      "Could not read enough text from that file. Try a clearer photo or a text/PDF export.",
    );
  }
  return { text, kind };
}
