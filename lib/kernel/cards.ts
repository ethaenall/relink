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
  "d/dx": {
    token: "d/dx",
    title: "d/dx is the derivative operator on this page",
    whyThisPage:
      "The page writes d/dx as if it is already a verb. Without that verb the next line is a wall.",
    teaching: [
      "d/dx means “take the derivative with respect to x.”",
      "Apply the same operator to the unfinished expression. Relink will not compute it.",
    ],
    apply: {
      problemLabel: "the unfinished derivative",
      prompt: "d/dx tells you to:",
      choices: [
        { id: "a", label: "Divide by x", correct: false },
        { id: "b", label: "Differentiate with respect to x", correct: true },
      ],
      ifWrong: "It is an operator, not a fraction.",
    },
    marginNote: "d/dx = differentiate with respect to x.",
  },
  lim: {
    token: "lim",
    title: "lim is the value the expression approaches",
    whyThisPage:
      "The page treats lim as given. If it is only three letters, the next line cannot start.",
    teaching: [
      "lim asks what y heads toward as x heads toward a number (or infinity).",
      "You do not plug the point in blindly if the expression blows up. Use the page’s algebra.",
    ],
    apply: {
      problemLabel: "the unfinished limit",
      prompt: "lim on this page means:",
      choices: [
        { id: "a", label: "The value at the point, always", correct: false },
        { id: "b", label: "The value the expression approaches", correct: true },
      ],
      ifWrong: "A limit is an approach, not automatically a plug-in.",
    },
    marginNote: "lim = what the expression approaches.",
  },
  "∫": {
    token: "∫",
    title: "∫ is the antiderivative / area mark on this page",
    whyThisPage:
      "The integral sign is treated as already named. The unfinished problem starts there.",
    teaching: [
      "∫ f(x) dx asks for an antiderivative, plus + C if it is indefinite.",
      "Use the page’s functions. Relink will not integrate for you.",
    ],
    apply: {
      problemLabel: "the unfinished integral",
      prompt: "∫ on this page means:",
      choices: [
        { id: "a", label: "Multiply by x", correct: false },
        { id: "b", label: "Find an antiderivative (and + C if indefinite)", correct: true },
      ],
      ifWrong: "It is the inverse of d/dx, not a product.",
    },
    marginNote: "∫ = antiderivative. + C if indefinite.",
  },
  antiderivative: {
    token: "antiderivative",
    title: "An antiderivative undoes a derivative",
    whyThisPage:
      "The page says antiderivative as if that word is already in hand.",
    teaching: [
      "F is an antiderivative of f when F′ = f.",
      "Write one antiderivative for the unfinished f. Relink will not write it.",
    ],
    apply: {
      problemLabel: "the unfinished antiderivative",
      prompt: "F is an antiderivative of f when:",
      choices: [
        { id: "a", label: "F = f + C only", correct: false },
        { id: "b", label: "F′ = f", correct: true },
      ],
      ifWrong: "Differentiate your answer. You should land on f.",
    },
    marginNote: "antiderivative F satisfies F′ = f.",
  },
  σ: {
    token: "σ",
    title: "σ is a spread, not a center",
    whyThisPage:
      "The page writes σ as given. If it is confused with the mean, the next line is wrong.",
    teaching: [
      "σ is the standard deviation — how spread out the values are.",
      "μ (or x̄) is the center. Do not swap them on the unfinished problem.",
    ],
    apply: {
      problemLabel: "the unfinished stats line",
      prompt: "σ on this page is:",
      choices: [
        { id: "a", label: "The mean", correct: false },
        { id: "b", label: "The standard deviation (spread)", correct: true },
      ],
      ifWrong: "Center is μ or x̄. Spread is σ.",
    },
    marginNote: "σ = standard deviation, not the mean.",
  },
  pH: {
    token: "pH",
    title: "pH is −log[H⁺] on this page",
    whyThisPage:
      "The page treats pH as already defined. The unfinished numbers need that definition.",
    teaching: [
      "pH = −log[H⁺]. Lower pH is more acidic.",
      "Use the given [H⁺] or pH on the unfinished line. Relink will not compute it.",
    ],
    apply: {
      problemLabel: "the unfinished acid/base line",
      prompt: "pH on this page is:",
      choices: [
        { id: "a", label: "[H⁺] itself", correct: false },
        { id: "b", label: "−log[H⁺]", correct: true },
      ],
      ifWrong: "The definition is a log, not the concentration raw.",
    },
    marginNote: "pH = −log[H⁺].",
  },
  mol: {
    token: "mol",
    title: "mol counts particles, not grams",
    whyThisPage:
      "The page jumps with mol as if it were already a unit you can convert.",
    teaching: [
      "A mole is 6.022×10²³ particles. Grams need molar mass.",
      "On the unfinished problem, decide whether you have grams or moles before converting.",
    ],
    apply: {
      problemLabel: "the unfinished conversion",
      prompt: "mol on this page measures:",
      choices: [
        { id: "a", label: "Mass in grams", correct: false },
        { id: "b", label: "Amount of substance (particles / NA)", correct: true },
      ],
      ifWrong: "Mass is grams. Amount is moles. Molar mass connects them.",
    },
    marginNote: "mol = amount. Grams need molar mass.",
  },
  "PV = nRT": {
    token: "PV = nRT",
    title: "The ideal-gas law on this page",
    whyThisPage:
      "The page uses PV = nRT as given. One letter will be the unknown on the unfinished line.",
    teaching: [
      "P, V, n, T are linked by R. Match units to the R you were given.",
      "Solve for the missing letter. Relink will not solve it.",
    ],
    apply: {
      problemLabel: "the unfinished gas-law line",
      prompt: "If T is in kelvin, n is:",
      choices: [
        { id: "a", label: "Always 1", correct: false },
        { id: "b", label: "PV / RT", correct: true },
      ],
      ifWrong: "Rearrange: n = PV / RT.",
    },
    marginNote: "n = PV / RT. Watch the units of R.",
  },
  "W = Fd": {
    token: "W = Fd",
    title: "Work on this page is force along a displacement",
    whyThisPage:
      "The page writes W = Fd as given. The unfinished problem needs that product, not a new force.",
    teaching: [
      "W = F d when F is along the motion. Use cos θ if they are not aligned.",
      "Write the product with the unfinished numbers. Relink will not write it.",
    ],
    apply: {
      problemLabel: "the unfinished work problem",
      prompt: "If F is along the motion, W is:",
      choices: [
        { id: "a", label: "F + d", correct: false },
        { id: "b", label: "F × d", correct: true },
      ],
      ifWrong: "Work is a product, not a sum.",
    },
    marginNote: "W = Fd when force is along the motion.",
  },
  "PE = mgh": {
    token: "PE = mgh",
    title: "Gravitational PE on this page is mgh",
    whyThisPage:
      "The page treats mgh as already named. The unfinished height change starts there.",
    teaching: [
      "Near earth, ΔPE = mgΔh. g is 9.8 N/kg unless the page says otherwise.",
      "Use the unfinished m and h. Relink will not multiply them.",
    ],
    apply: {
      problemLabel: "the unfinished PE line",
      prompt: "If h doubles and m stays put, PE:",
      choices: [
        { id: "a", label: "Stays the same", correct: false },
        { id: "b", label: "Doubles", correct: true },
      ],
      ifWrong: "PE is proportional to h.",
    },
    marginNote: "PE = mgh near earth.",
  },
  "a² + b²": {
    token: "a² + b²",
    title: "Pythagoras on this page",
    whyThisPage:
      "The page writes a² + b² = c² as given. The unfinished right triangle starts there.",
    teaching: [
      "Only for a right triangle. c is the hypotenuse.",
      "Square, add, square-root. Relink will not do the arithmetic.",
    ],
    apply: {
      problemLabel: "the unfinished right triangle",
      prompt: "c is:",
      choices: [
        { id: "a", label: "a + b", correct: false },
        { id: "b", label: "√(a² + b²)", correct: true },
      ],
      ifWrong: "Add the squares, then take the square root.",
    },
    marginNote: "c = √(a² + b²) on a right triangle.",
  },
  SOHCAHTOA: {
    token: "SOHCAHTOA",
    title: "Sine opposite, cosine adjacent, tangent opposite/adjacent",
    whyThisPage:
      "The page treats the trig ratios as already named.",
    teaching: [
      "sin = opp/hyp, cos = adj/hyp, tan = opp/adj.",
      "Name the sides on the unfinished triangle first.",
    ],
    apply: {
      problemLabel: "the unfinished right-triangle trig",
      prompt: "sin θ is:",
      choices: [
        { id: "a", label: "adj / hyp", correct: false },
        { id: "b", label: "opp / hyp", correct: true },
      ],
      ifWrong: "SOH: sine is opposite over hypotenuse.",
    },
    marginNote: "sin=opp/hyp  cos=adj/hyp  tan=opp/adj.",
  },
  "quadratic formula": {
    token: "quadratic formula",
    title: "The quadratic formula on this page",
    whyThisPage:
      "The page jumps to x = (−b ± √(b² − 4ac)) / 2a as if that string is already in hand.",
    teaching: [
      "For ax² + bx + c = 0. Discriminant is b² − 4ac.",
      "Plug the unfinished a, b, c. Relink will not plug them.",
    ],
    apply: {
      problemLabel: "the unfinished quadratic",
      prompt: "The formula is used when the equation is:",
      choices: [
        { id: "a", label: "Already factored", correct: false },
        { id: "b", label: "ax² + bx + c = 0", correct: true },
      ],
      ifWrong: "Standard form first, then the formula.",
    },
    marginNote: "x = (−b ± √(b²−4ac)) / 2a.",
  },
  "ln(": {
    token: "ln",
    title: "ln is log base e",
    whyThisPage:
      "The page writes ln as given. The unfinished exponential undoes with e.",
    teaching: [
      "ln is log_e. ln(e^k) = k. e^{ln k} = k (k > 0).",
      "Use that inverse on the unfinished line.",
    ],
    apply: {
      problemLabel: "the unfinished log line",
      prompt: "ln(e^3) is:",
      choices: [
        { id: "a", label: "3e", correct: false },
        { id: "b", label: "3", correct: true },
      ],
      ifWrong: "ln and e undo each other.",
    },
    marginNote: "ln = log base e.",
  },
  "log(": {
    token: "log",
    title: "log is a logarithm, usually base 10 here",
    whyThisPage:
      "The page treats log as already named. Check whether this page means base 10 or base e.",
    teaching: [
      "If the page writes log, it is usually base 10 unless it says ln.",
      "log(10^k) = k. Use the unfinished exponent.",
    ],
    apply: {
      problemLabel: "the unfinished log line",
      prompt: "Unless the page says otherwise, log here is:",
      choices: [
        { id: "a", label: "Base e", correct: false },
        { id: "b", label: "Base 10", correct: true },
      ],
      ifWrong: "ln is base e. log on a high-school page is usually 10.",
    },
    marginNote: "log usually means base 10 on this kind of page.",
  },
  "∑": {
    token: "∑",
    title: "∑ means add the terms in the given range",
    whyThisPage:
      "The sigma is treated as already readable. The unfinished sum starts there.",
    teaching: [
      "∑_{i=1}^{n} a_i means add a_1 through a_n.",
      "Write the first few terms of the unfinished sum. Relink will not add them.",
    ],
    apply: {
      problemLabel: "the unfinished summation",
      prompt: "∑ tells you to:",
      choices: [
        { id: "a", label: "Multiply the terms", correct: false },
        { id: "b", label: "Add the terms in the range", correct: true },
      ],
      ifWrong: "Sigma is a sum.",
    },
    marginNote: "∑ = add the terms in the index range.",
  },
  "Δx": {
    token: "Δx",
    title: "Δx is a change in x",
    whyThisPage:
      "The page writes Δx as given. It is x_final − x_initial, not a new variable.",
    teaching: [
      "Δ means change: final minus initial.",
      "Use the unfinished pair of x values.",
    ],
    apply: {
      problemLabel: "the unfinished Δ line",
      prompt: "Δx is:",
      choices: [
        { id: "a", label: "A brand-new unknown", correct: false },
        { id: "b", label: "x_final − x_initial", correct: true },
      ],
      ifWrong: "Delta is a difference.",
    },
    marginNote: "Δx = x_final − x_initial.",
  },
  λ: {
    token: "λ",
    title: "λ is wavelength on this page",
    whyThisPage:
      "The page treats λ as already named, usually in v = fλ.",
    teaching: [
      "λ is wavelength. v = fλ unless the page defines λ another way.",
      "Use the unfinished v and f. Relink will not divide them.",
    ],
    apply: {
      problemLabel: "the unfinished wave line",
      prompt: "If v = fλ, then λ is:",
      choices: [
        { id: "a", label: "v f", correct: false },
        { id: "b", label: "v / f", correct: true },
      ],
      ifWrong: "Divide speed by frequency.",
    },
    marginNote: "λ = v / f when v = fλ.",
  },
  "half-life": {
    token: "half-life",
    title: "Half-life is the time to half the amount",
    whyThisPage:
      "The page writes half-life as given. The unfinished decay starts there.",
    teaching: [
      "After one half-life, half remains. After n half-lives, (1/2)^n remains.",
      "Count how many half-lives fit in the unfinished time.",
    ],
    apply: {
      problemLabel: "the unfinished decay",
      prompt: "After two half-lives, the remaining fraction is:",
      choices: [
        { id: "a", label: "1/2", correct: false },
        { id: "b", label: "1/4", correct: true },
      ],
      ifWrong: "Half of a half is a quarter.",
    },
    marginNote: "each half-life multiplies the amount by 1/2.",
  },
  valence: {
    token: "valence",
    title: "Valence electrons sit in the outer shell",
    whyThisPage:
      "The page treats valence as given when it draws dots or bonds.",
    teaching: [
      "Valence electrons are the outer-shell electrons that bond.",
      "Use the group number on the unfinished element. Relink will not look it up.",
    ],
    apply: {
      problemLabel: "the unfinished Lewis structure",
      prompt: "Valence electrons are:",
      choices: [
        { id: "a", label: "All electrons in the atom", correct: false },
        { id: "b", label: "The outer-shell electrons", correct: true },
      ],
      ifWrong: "Only the outer shell is valence.",
    },
    marginNote: "valence = outer-shell electrons.",
  },
};
