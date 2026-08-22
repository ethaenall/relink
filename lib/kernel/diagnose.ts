import { namedTokens } from "./tokens";
import { KERNEL_CARDS } from "./cards";
import type { DiagnoseResult } from "../fromPaste";

export function localDiagnose(page: string): DiagnoseResult {
  const names = namedTokens(page);
  const blockers = names
    .map((name) => KERNEL_CARDS[name])
    .filter((card): card is NonNullable<typeof card> => Boolean(card));
  return {
    blockers,
    nextLine: {
      prompt: "Write the first move of the unfinished problem.",
      accept: [],
      rejectHint: "That is not the first move of the unfinished problem.",
    },
    closing:
      "The named imports are defined. Write the next line. Relink will not write it.",
  };
}
