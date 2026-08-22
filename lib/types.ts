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

export type ApplyCheck = {
  problemLabel: string;
  prompt: string;
  choices: Choice[];
  ifWrong: string;
};

export type NextLine = {
  prompt: string;
  accept: string[];
  rejectHint: string;
  afterLineId?: string;
};

export type Blocker = {
  id: string;
  token: string;
  where: string;
  title: string;
  minutes: number;
  whyThisPage: string;
  teaching: string[];
  apply: ApplyCheck;
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
  nextLine: NextLine;
};
