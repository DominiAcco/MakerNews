export const CATEGORIES = [
  "tecnologia",
  "negócios",
  "marketing",
  "educação",
  "design",
  "saúde",
  "finanças",
  "esportes",
  "games",
  "entretenimento",
] as const;

export type Category = (typeof CATEGORIES)[number];
