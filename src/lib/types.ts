export type PartyId =
  | "lfi"
  | "ps"
  | "eelv"
  | "renaissance"
  | "lr"
  | "rn"
  | "reconquete"
  | "pcf";

export interface PartySource {
  label: string;
  url: string;
}

export interface Party {
  id: PartyId;
  name: string;
  shortName: string;
  family: string;
  color: string; // tailwind-friendly hex
  description: string;
  /**
   * Official program pages/booklets used as sources for this party's
   * propositions in this comparator. Best-effort: official sites change
   * often, and some booklets were only available as manually-downloaded
   * PDFs without a stable public URL — in that case we link to the
   * party's general site or, failing that, a stable reference page.
   */
  sources?: PartySource[];
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
