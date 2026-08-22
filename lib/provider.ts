export type LinkerProvider = {
  name: "groq" | "featherless";
  url: string;
  key: string;
  model: string;
};

/** Resolve a provider from env. Does not call the network. */
export function resolveProvider(
  env: NodeJS.ProcessEnv = process.env,
): LinkerProvider | null {
  const groq = env.GROQ_API_KEY?.trim();
  if (groq) {
    return {
      name: "groq",
      url: "https://api.groq.com/openai/v1/chat/completions",
      key: groq,
      model: env.GROQ_MODEL?.trim() || "llama-3.1-8b-instant",
    };
  }
  const feather = env.FEATHERLESS_API_KEY?.trim();
  if (feather) {
    return {
      name: "featherless",
      url: "https://api.featherless.ai/v1/chat/completions",
      key: feather,
      model:
        env.FEATHERLESS_MODEL?.trim() ||
        "meta-llama/Meta-Llama-3.1-8B-Instruct",
    };
  }
  return null;
}

/** Hard off until GROQ_ARMED=1 (or LINKER_ARMED=1). Prevents accidental spend. */
export function isLinkerArmed(env: NodeJS.ProcessEnv = process.env): boolean {
  const flag = (env.GROQ_ARMED || env.LINKER_ARMED || "").trim();
  return flag === "1" || flag.toLowerCase() === "true";
}
