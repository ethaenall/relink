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
    "The page is defined. Problems 2 and 3 are yours. Relink does not do them.",
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
        "You can already factor x² + 6x + 9. That trinomial is (x + 3)(x + 3), which is (x + 3)².",
        "Where does 9 come from? In x² + 6x, the 6 is b. Half of 6 is 3. 3 × 3 is 9. That is (b/2)².",
        "Adding 9 to both sides is how the packet forces a perfect square on the left. The right side changes too: −10 + 9 = −1.",
        "The rest of the example is just reading (x + 3)² = −1. The only missing move on this page was this one.",
      ],
      checkPrompt:
        "On tonight’s example, b is 6. What number gets added to both sides?",
      choices: [
        { id: "a", label: "6", correct: false },
        { id: "b", label: "9", correct: true },
        { id: "c", label: "3", correct: false },
        { id: "d", label: "36", correct: false },
      ],
      ifWrong: "Half of 6 is 3. Then square that 3. That product is the addend.",
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
        "You already use √9 = 3 because 3² = 9. That picture is the number line.",
        "Nothing on the number line squares to −1. The equation (x + 3)² = −1 is still well-formed. The left side is a square. The right side is a negative. The page refuses to say “no solution.”",
        "So the square root is allowed to keep going. ±√(−1) is how the packet writes “the two numbers that square to −1,” without drawing them yet.",
        "You do not need a new universe tonight. You need permission to write that line so the next line can exist.",
      ],
      checkPrompt:
        "(x + 3)² = −1. Does the work stop because −1 has no ordinary square root?",
      choices: [
        { id: "a", label: "Yes. No solution.", correct: false },
        {
          id: "b",
          label: "No. Write ±√(−1) and keep going.",
          correct: true,
        },
      ],
      ifWrong:
        "The packet’s next line exists. The algebra continues; only the number-line picture paused.",
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
        "x + 3 = ± i means two statements: x + 3 = i and x + 3 = −i.",
        "Move the 3. The two solutions on the example are x = −3 + i and x = −3 − i.",
        "You do not have to picture those points tonight. You have to be able to write them, because tomorrow the class will start from answers that look like this.",
      ],
      checkPrompt: "x + 3 = ± i means the two solutions are:",
      choices: [
        { id: "a", label: "x = 3 + i  and  x = 3 − i", correct: false },
        { id: "b", label: "x = −3 + i  and  x = −3 − i", correct: true },
        { id: "c", label: "x = i only", correct: false },
      ],
      ifWrong: "Subtract 3 from both sides of x + 3 = i and of x + 3 = −i.",
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
