export type PartyId =
  | "lfi"
  | "ps"
  | "eelv"
  | "renaissance"
  | "lr"
  | "rn"
  | "reconquete"
  | "pcf";

export interface Party {
  id: PartyId;
  name: string;
  shortName: string;
  family: string;
  color: string; // tailwind-friendly hex
  description: string;
}

export type ThemeId =
  | "economie"
  | "travail"
  | "immigration"
  | "securite"
  | "education"
  | "sante"
  | "environnement"
  | "europe"
  | "institutions"
  | "logement";

export interface Theme {
  id: ThemeId;
  name: string;
  icon: string;
  description: string;
}

export interface InternationalExample {
  country: string;
  when: string;
  summary: string;
  evaluation: string;
  /**
   * Overall assessment of how observers/institutions judge the effects
   * described in `evaluation`. Optional because some examples are too
   * recent or too disputed to summarize as one of these three buckets.
   */
  assessment?: "positive" | "negative" | "mixed";
}

export interface Proposition {
  id: string;
  themeId: ThemeId;
  title: string;
  description: string;
  supportingParties: PartyId[];
  internationalExample?: InternationalExample;
}

export type Answer = "pour" | "contre" | "skip";

export type AnswersMap = Record<string, Answer>;

/**
 * Persisted state of an in-progress game, so a user can leave and resume
 * later on the same device/browser.
 */
export interface GameState {
  /** Shuffled proposition ids, in the order they are/were presented. */
  deckIds: string[];
  /** Index of the next proposition to show. */
  index: number;
  answers: AnswersMap;
}
