import type { Seed } from "./types";

export const priya: Seed = {
  id: "priya-physics-1",
  person: {
    name: "Priya",
    age: 16,
    grade: "11th grade",
    school: "Westfield High",
  },
  absence: {
    days: 6,
    reason: "migraine",
    stillHas: ["F = ma", "drawing force arrows", "N = mg on a horizontal desk"],
  },
  course: "Physics 1",
  worksheetTitle: "Lab 4 — Static friction",
  date: "March 12",
  period: "Period 2",
  closing:
    "The page is defined. Write the first move of problem 2. Relink will not write it.",
  nextLine: {
    prompt: "Problem 2 is waiting. Write the largest push that does not start motion.",
    accept: [
      "F = 7.84 N",
      "F_s = 7.84 N",
      "Fs = 7.84 N",
      "7.84 N",
      "F = 0.40 * 19.6",
      "F = 0.4 * 19.6",
      "F_s = μ_s N",
      "F = μ_s N",
      "Fs = mu_s N",
    ],
    rejectHint: "On the verge, equality holds: F_s = μ_s N. N = 2.0 × 9.8.",
  },
  lines: [
    {
      id: "hdr",
      kind: "meta",
      parts: [
        {
          text: "Westfield High  ·  Physics 1 / Period 2  ·  March 12  ·  Name: Priya Shah",
        },
      ],
    },
    {
      id: "title",
      kind: "title",
      parts: [{ text: "Lab 4 — Static friction" }],
    },
    {
      id: "instr",
      kind: "body",
      parts: [
        {
          text: "A block sits on a horizontal desk. Draw the forces. Then find the largest push that does not start motion.",
        },
      ],
    },
    {
      id: "given-h",
      kind: "section",
      parts: [{ text: "The writeup uses these as given" }],
    },
    {
      id: "mu",
      kind: "math",
      parts: [
        { text: "μ_s", blockerId: "mu-s" },
        { text: " is the coefficient of static friction (a number, not a force)." },
      ],
      marginFor: "mu-s",
    },
    {
      id: "ineq",
      kind: "math",
      parts: [
        { text: "F_s ≤ μ_s N", blockerId: "fs-ineq" },
        { text: "     (inequality — not F = μN always)" },
      ],
      marginFor: "fs-ineq",
    },
    {
      id: "verge",
      kind: "math",
      parts: [
        { text: "“" },
        { text: "on the verge", blockerId: "on-verge" },
        { text: "” means equality holds only at the start of slip." },
      ],
      marginFor: "on-verge",
    },
    {
      id: "ex-h",
      kind: "section",
      parts: [{ text: "Example already on the board" }],
    },
    {
      id: "ex-1",
      kind: "math",
      parts: [{ text: "m = 1.5 kg,  μ_s = 0.30,  N = mg" }],
    },
    {
      id: "ex-2",
      kind: "math",
      parts: [{ text: "On the verge, F_push = μ_s N" }],
    },
    {
      id: "try-h",
      kind: "section",
      parts: [{ text: "Now you try" }],
    },
    {
      id: "p2",
      kind: "task",
      parts: [{ text: "2.  m = 2.0 kg,  μ_s = 0.40.  Largest push that does not start motion?" }],
    },
    {
      id: "p3",
      kind: "task",
      parts: [{ text: "3.  Same block, but the desk is wet and μ_s drops to 0.20." }],
    },
  ],
  blockers: [
    {
      id: "mu-s",
      token: "μ_s",
      where: "given list",
      title: "μ_s is a number on this page",
      minutes: 2,
      whyThisPage:
        "The writeup lists μ_s next to the forces. If it is another force, the free-body diagram has an extra arrow and problem 2 cannot start.",
      teaching: [
        "You already draw N, weight, and the push. μ_s is not a fourth arrow. It is the coefficient — a number with no unit of force.",
        "On this page it is given as 0.30 in the example and 0.40 on problem 2. You multiply with N. You do not add it to the force list.",
      ],
      apply: {
        problemLabel: "2.  m = 2.0 kg,  μ_s = 0.40",
        prompt: "On problem 2, μ_s is:",
        choices: [
          { id: "a", label: "A force of 0.40 N", correct: false },
          { id: "b", label: "A number (the coefficient). Multiply it by N.", correct: true },
          { id: "c", label: "The same as the normal force", correct: false },
        ],
        ifWrong: "μ_s has no newtons by itself. N does. The product is the force.",
      },
      marginNote: "μ_s is a coefficient, not a force. Here it is 0.40.",
    },
    {
      id: "fs-ineq",
      token: "F_s ≤ μ_s N",
      where: "given list",
      title: "The friction law on this page is an inequality",
      minutes: 3,
      whyThisPage:
        "The packet writes F_s ≤ μ_s N. If you treat that as F = μN always, every sitting block is already slipping.",
      teaching: [
        "Static friction matches the push, up to a ceiling. The ceiling is μ_s N. Below the ceiling the block stays put.",
        "Problem 2 asks for the largest push that does not start motion. That is the ceiling, not a smaller matching force.",
      ],
      apply: {
        problemLabel: "2.  m = 2.0 kg,  μ_s = 0.40",
        prompt: "Before the block slips, F_s is:",
        choices: [
          { id: "a", label: "Always equal to μ_s N", correct: false },
          { id: "b", label: "Any value up to μ_s N", correct: true },
          { id: "c", label: "Zero, because the desk is horizontal", correct: false },
        ],
        ifWrong: "The packet’s ≤ is the point. Equality is only the ceiling.",
      },
      marginNote: "F_s matches the push, up to μ_s N. Not always equal.",
    },
    {
      id: "on-verge",
      token: "on the verge",
      where: "given list + example",
      title: "On the verge means the equality holds",
      minutes: 2,
      whyThisPage:
        "The example writes F_push = μ_s N at the start of slip. That sentence is the definition of “on the verge” on this lab.",
      teaching: [
        "On the verge is the last still moment. The inequality becomes an equality for that one line.",
        "Problem 2 is that moment with new numbers: N = 2.0 × 9.8 = 19.6 N. Then multiply by 0.40.",
      ],
      apply: {
        problemLabel: "2.  m = 2.0 kg,  μ_s = 0.40,  g = 9.8",
        prompt: "The largest push that does not start motion is:",
        choices: [
          { id: "a", label: "0.40 N", correct: false },
          { id: "b", label: "19.6 N", correct: false },
          { id: "c", label: "7.84 N", correct: true },
          { id: "d", label: "8.00 N", correct: false },
        ],
        ifWrong: "N = 2.0 × 9.8 = 19.6. Then 0.40 × 19.6 = 7.84.",
      },
      marginNote: "on the verge → F = μ_s N. For #2 that is 7.84 N.",
    },
  ],
};
