import type { Seed } from "./types";
import { lena } from "./lena";
import { priya } from "./priya";
import { seedFromPaste } from "./fromPaste";
import { localDiagnose } from "./kernel/diagnose";

export type SamplePage = {
  id: string;
  label: string;
  blurb: string;
  stuck: string;
  page: string;
  seed: Seed;
};

export const samples: SamplePage[] = [
  {
    id: "lena-4-3",
    label: "Algebra 2 · completing the square",
    blurb: "Lena Park, first night back. Three marks treated as given.",
    stuck: "add (b/2)²",
    seed: lena,
    page: `Westfield High  ·  Algebra 2 / Period 3  ·  March 12  ·  Name: Lena Park
Worksheet 4.3 — Completing the Square
Use the same moves as the example. Show every step. Leave answers in exact form.

Example — already on the board
Solve  x² + 6x + 10 = 0
x² + 6x  =  −10
x² + 6x + 9  =  −1
the packet writes: add (b/2)²
(x + 3)²  =  −1
x + 3  =  ±√(−1)
x + 3  =  ± i
x  =  −3 ± i

Now you try
2.   x² + 8x + 20 = 0
3.   x² − 4x + 13 = 0`,
  },
  {
    id: "priya-friction",
    label: "Physics 1 · friction lab",
    blurb: "Priya Shah, six days out. The writeup treats μ_s as given.",
    stuck: "on the verge",
    seed: priya,
    page: `Westfield High  ·  Physics 1 / Period 2  ·  Name: Priya Shah
Lab 4 — Static friction
A block sits on a horizontal desk. Draw the forces. Then find the largest push that does not start motion.

The writeup uses these as given:
μ_s is the coefficient of static friction (a number, not a force).
F_s ≤ μ_s N     (inequality — not F = μN always)
“on the verge” means equality holds only at the start of slip.

Example already on the board
m = 1.5 kg,  μ_s = 0.30,  N = mg
On the verge, F_push = μ_s N

Now you try
2.  m = 2.0 kg,  μ_s = 0.40.  Largest push that does not start motion?
3.  Same block, but the desk is wet and μ_s drops to 0.20.`,
  },
];

const calcPage = `Westfield High  ·  Calculus / Period 1  ·  Name: Jordan Hale
Worksheet 2.1 — Limits and a first derivative
The packet treats lim and dy/dx as already named.

Example
lim_{x→2} (x² − 4)/(x − 2) = 4
Then dy/dx of x² at x = 2 is 4.

Now you try
2.  lim_{x→3} (x² − 9)/(x − 3)
3.  dy/dx of x² at x = 3`;

samples.push({
  id: "jordan-limits",
  label: "Calculus · limits",
  blurb: "Jordan Hale. The packet treats lim and dy/dx as given.",
  stuck: "lim",
  seed: seedFromPaste(calcPage, localDiagnose(calcPage)),
  page: calcPage,
});
