import type { Seed } from "./types";

export const lena: Seed = {
  id: "lena-algebra-2",
  person: {
    name: "Lena",
    age: 16,
    grade: "11th grade",
    school: "Westfield High",
  },
  absence: {
    days: 9,
    reason: "flu",
    stillHas: [
      "factoring x² + 6x + 9",
      "FOIL",
      "square roots of positive numbers",
      "moving a term across an equals sign",
    ],
  },
  course: "Algebra 2",
  worksheetTitle: "Worksheet 4.3 — Completing the Square",
  date: "March 12",
  period: "Period 3",
  closing:
    "The page is defined. Write the first move of problem 2. Relink will not write it.",
  nextLine: {
    prompt: "Problem 2 is waiting. Write the first move (get x² + 8x alone).",
    accept: [
      "x^2 + 8x = -20",
      "x² + 8x = −20",
      "x² + 8x = -20",
      "x^2 + 8x = −20",
      "x^2+8x=-20",
      "x²+8x=−20",
    ],
    rejectHint: "That is not the first move. Get x² + 8x alone.",
  },
  lines: [
    {
      id: "hdr",
      kind: "meta",
      parts: [
        {
          text: "Westfield High  ·  Algebra 2 / Period 3  ·  March 12  ·  Name: Lena Park",
        },
      ],
    },
    {
      id: "title",
      kind: "title",
      parts: [{ text: "Worksheet 4.3 — Completing the Square" }],
    },
    {
      id: "instr",
      kind: "body",
      parts: [
        {
          text: "Use the same moves as the example. Show every step. Leave answers in exact form.",
        },
      ],
    },
    {
      id: "ex-h",
      kind: "section",
      parts: [{ text: "Example — already on the board" }],
    },
    {
      id: "ex-q",
      kind: "math",
      parts: [{ text: "Solve  x² + 6x + 10 = 0" }],
    },
    {
      id: "ex-1",
      kind: "math",
      parts: [{ text: "x² + 6x  =  −10" }],
    },
    {
      id: "ex-2",
      kind: "math",
      parts: [
        { text: "x² + 6x " },
        { text: "+ 9", blockerId: "complete-square" },
        { text: "  =  −1" },
      ],
      marginFor: "complete-square",
    },
    {
      id: "ex-2n",
      kind: "body",
      parts: [
        { text: "the packet writes: add " },
        { text: "(b/2)²", blockerId: "complete-square" },
      ],
    },
    {
      id: "ex-3",
      kind: "math",
      parts: [{ text: "(x + 3)²  =  −1" }],
    },
    {
      id: "ex-4",
      kind: "math",
      parts: [
        { text: "x + 3  =  ±" },
        { text: "√(−1)", blockerId: "sqrt-neg" },
      ],
      marginFor: "sqrt-neg",
    },
    {
      id: "ex-5",
      kind: "math",
      parts: [
        { text: "x + 3  =  ±" },
        { text: "i", blockerId: "imaginary-i" },
      ],
      marginFor: "imaginary-i",
    },
    {
      id: "ex-6",
      kind: "math",
      parts: [{ text: "x  =  −3 ± i" }],
    },
    {
      id: "try-h",
      kind: "section",
      parts: [{ text: "Now you try" }],
    },
    {
      id: "p2",
      kind: "task",
      parts: [{ text: "2.   x² + 8x + 20 = 0" }],
    },
    {
      id: "p3",
      kind: "task",
      parts: [{ text: "3.   x² − 4x + 13 = 0" }],
    },
  ],
  blockers: [
    {
      id: "complete-square",
      token: "(b/2)²",
      where: "example, line after the move",
      title: "What “add (b/2)²” is doing on this page",
      minutes: 3,
      whyThisPage:
        "Tonight’s example jumps from x² + 6x = −10 to x² + 6x + 9 = −1. The +9 is not a guess. It is the one number that turns the left side into a square you can already write.",
      teaching: [
        "You can already factor x² + 6x + 9. That is (x + 3)². The 9 is (b/2)²: half of 6 is 3, 3 × 3 is 9.",
        "Adding that square to both sides is the only missing move on this example. Problem 2 is the same move with a different b.",
      ],
      apply: {
        problemLabel: "2.  x² + 8x + 20 = 0",
        prompt: "On problem 2, b is 8. What number gets added to both sides?",
        choices: [
          { id: "a", label: "8", correct: false },
          { id: "b", label: "16", correct: true },
          { id: "c", label: "4", correct: false },
          { id: "d", label: "64", correct: false },
        ],
        ifWrong: "Half of 8 is 4. Square that 4.",
      },
      marginNote: "half of 6, then square → 9. Makes (x + 3)².",
    },
    {
      id: "sqrt-neg",
      token: "√(−1)",
      where: "example, after the square",
      title: "Why the square root doesn’t stop at −1",
      minutes: 3,
      whyThisPage:
        "After the square is built, the packet writes (x + 3)² = −1, then x + 3 = ±√(−1). If square roots only live on the positive number line, this line is a wall. The algebra on this page does not stop.",
      teaching: [
        "Nothing on the number line squares to −1. The equation (x + 3)² = −1 is still well-formed. The packet does not write “no solution.”",
        "±√(−1) is permission to keep writing so the next line can exist. Problem 2 will hit the same wall with −4.",
      ],
      apply: {
        problemLabel: "2.  after (x + 4)² = −4",
        prompt: "After (x + 4)² = −4, does the work stop?",
        choices: [
          { id: "a", label: "Yes. No solution.", correct: false },
          {
            id: "b",
            label: "No. Write ±√(−4) and continue.",
            correct: true,
          },
        ],
        ifWrong:
          "The packet’s next line exists. The algebra continues; only the number-line picture paused.",
      },
      marginNote: "the square may equal a negative; write ±√(−1) and continue.",
    },
    {
      id: "imaginary-i",
      token: "i",
      where: "example, last two lines",
      title: "i is a name so the two answers can be written",
      minutes: 2,
      whyThisPage:
        "The packet replaces √(−1) with i, then writes x = −3 ± i. If i is a mystery letter, the answer line is unreadable. It is only a name for the square root you just wrote.",
      teaching: [
        "i is defined as √(−1). That is the whole definition needed for this worksheet.",
        "x + 3 = ± i means two answers: x = −3 + i and x = −3 − i. Problem 2 will look the same with 4 and 2i.",
      ],
      apply: {
        problemLabel: "2.  x + 4 = ± 2i",
        prompt: "The two answers on problem 2 are:",
        choices: [
          { id: "a", label: "−4 ± i", correct: false },
          { id: "b", label: "−4 ± 2i", correct: true },
          { id: "c", label: "4 ± 2i", correct: false },
        ],
        ifWrong: "From x + 4 = ± 2i, subtract 4. √(−4) = 2i, not i.",
      },
      marginNote: "i names √(−1). Two answers: −3 + i and −3 − i.",
    },
  ],
};

export const bannedCardPhrases = [
  "you should already know",
  "as you remember",
  "as you know",
  "you missed",
  "catch up",
  "behind",
  "basic concept",
  "simply review",
  "go back to chapter",
  "just a simple",
  "obviously",
  "everyone else",
];
