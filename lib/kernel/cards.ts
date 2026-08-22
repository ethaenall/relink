import type { DiagnoseBlocker } from "../fromPaste";

export const KERNEL_CARDS: Record<string, DiagnoseBlocker> = {
  "(b/2)²": {
    token: "(b/2)²",
    title: "What add (b/2)² is doing on this page",
    whyThisPage:
      "The page jumps by adding (b/2)² so the left side becomes a square you can already write.",
    teaching: [
      "b is the coefficient of x. Half of b, then square, is the addend.",
      "Add that same number to both sides. The unfinished problem uses a different b.",
    ],
    apply: {
      problemLabel: "the unfinished completing-the-square problem",
      prompt: "On the unfinished problem, what do you add to both sides?",
      choices: [
        { id: "a", label: "b", correct: false },
        { id: "b", label: "(b/2)²", correct: true },
        { id: "c", label: "b²", correct: false },
      ],
      ifWrong: "Half of b, then square. That product is the addend.",
    },
    marginNote: "half of b, then square. Add to both sides.",
  },
  "√(−1)": {
    token: "√(−1)",
    title: "Why the square root does not stop at a negative",
    whyThisPage:
      "After the square is built, the page writes a square root of a negative. The algebra does not stop.",
    teaching: [
      "Nothing on the number line squares to a negative. The equation is still well-formed.",
      "Write ±√(negative) and continue so the next line can exist.",
    ],
    apply: {
      problemLabel: "the unfinished problem after the square",
      prompt: "Does the work stop because the right side is negative?",
      choices: [
        { id: "a", label: "Yes. No solution.", correct: false },
        { id: "b", label: "No. Write ±√(…) and continue.", correct: true },
      ],
      ifWrong: "The packet’s next line exists. Only the number-line picture paused.",
    },
    marginNote: "the square may equal a negative; write ±√ and continue.",
  },
  i: {
    token: "i",
    title: "i is a name so the two answers can be written",
    whyThisPage:
      "The page replaces √(−1) with i. If i is a mystery letter, the answer line is unreadable.",
    teaching: [
      "i is defined as √(−1). That is the whole definition needed on this page.",
      "± i means two answers. Move the remaining term. Relink will not write them.",
    ],
    apply: {
      problemLabel: "the unfinished answer line",
      prompt: "i on this page is:",
      choices: [
        { id: "a", label: "A variable like x", correct: false },
        { id: "b", label: "A name for √(−1)", correct: true },
      ],
      ifWrong: "The packet set i = √(−1) so the two answers can be written.",
    },
    marginNote: "i names √(−1).",
  },
  "μ_s": {
    token: "μ_s",
    title: "μ_s is a number on this page",
    whyThisPage:
      "The page lists μ_s next to forces. If it is another force, the diagram has an extra arrow.",
    teaching: [
      "μ_s is the coefficient of static friction — a number, not a fourth force.",
      "You multiply it by N. You do not add it to the free-body diagram as an arrow.",
    ],
    apply: {
      problemLabel: "the unfinished friction problem",
      prompt: "μ_s is:",
      choices: [
        { id: "a", label: "A force", correct: false },
        { id: "b", label: "A number (the coefficient). Multiply it by N.", correct: true },
      ],
      ifWrong: "μ_s has no newtons by itself. N does.",
    },
    marginNote: "μ_s is a coefficient, not a force.",
  },
  "F_s": {
    token: "F_s ≤ μ_s N",
    title: "The friction law on this page is an inequality",
    whyThisPage:
      "The page writes F_s ≤ μ_s N. Treating that as always equal makes every sitting block slip.",
    teaching: [
      "Static friction matches the push, up to a ceiling of μ_s N.",
      "The unfinished problem wants that ceiling, not a smaller matching force.",
    ],
    apply: {
      problemLabel: "the unfinished friction problem",
      prompt: "Before the block slips, F_s is:",
      choices: [
        { id: "a", label: "Always equal to μ_s N", correct: false },
        { id: "b", label: "Any value up to μ_s N", correct: true },
      ],
      ifWrong: "The ≤ is the point. Equality is only the ceiling.",
    },
    marginNote: "F_s matches the push, up to μ_s N.",
  },
  "on the verge": {
    token: "on the verge",
    title: "On the verge means the equality holds",
    whyThisPage:
      "On the verge is the last still moment. The inequality becomes an equality for that line.",
    teaching: [
      "At the start of slip, F = μ_s N.",
      "Write that product for the unfinished numbers. Relink will not write it.",
    ],
    apply: {
      problemLabel: "the unfinished “on the verge” problem",
      prompt: "On the verge, the push is:",
      choices: [
        { id: "a", label: "Less than μ_s N", correct: false },
        { id: "b", label: "Equal to μ_s N", correct: true },
      ],
      ifWrong: "On the verge, equality holds.",
    },
    marginNote: "on the verge → F = μ_s N.",
  },
  "dy/dx": {
    token: "dy/dx",
    title: "dy/dx is the slope of this graph at a point",
    whyThisPage:
      "The page treats dy/dx as already named. If it is only letters, the next line is unreadable.",
    teaching: [
      "dy/dx is the derivative: the slope of y with respect to x on this page.",
      "Use the same move on the unfinished problem. Relink will not finish it.",
    ],
    apply: {
      problemLabel: "the unfinished derivative line",
      prompt: "dy/dx on this page means:",
      choices: [
        { id: "a", label: "y divided by x", correct: false },
        { id: "b", label: "The slope of y with respect to x", correct: true },
      ],
      ifWrong: "It is the derivative, not a fraction of the two letters.",
    },
    marginNote: "dy/dx is the slope at that point.",
  },
};
