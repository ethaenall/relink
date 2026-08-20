export type InlinePart =
  | { text: string }
  | { text: string; blockerId: string };

export type WorksheetLine = {
  id: string;
  kind: "meta" | "title" | "section" | "body" | "math" | "task";
  parts: InlinePart[];
  marginFor?: string;
};

export type Choice = {
  id: string;
  label: string;
  correct: boolean;
};

export type Blocker = {
  id: string;
  token: string;
  where: string;
  title: string;
  minutes: number;
  whyThisPage: string;
  teaching: string[];
  checkPrompt: string;
  choices: Choice[];
  ifWrong: string;
  marginNote: string;
};

export type Seed = {
  id: string;
  person: {
    name: string;
    age: number;
    grade: string;
    school: string;
  };
  absence: {
    days: number;
    reason: string;
    stillHas: string[];
  };
  course: string;
  worksheetTitle: string;
  date: string;
  period: string;
  lines: WorksheetLine[];
  blockers: Blocker[];
  closing: string;
};
