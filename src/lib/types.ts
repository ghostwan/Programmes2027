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
  /**
   * IDs of other propositions that are direct logical opposites of this
   * one (mutually exclusive, not just "a different approach to the same
   * problem"): e.g. "build new nuclear reactors" contradicts "phase out
   * nuclear power". Used to *deduce* that a party explicitly supporting
   * one of these is necessarily opposed to this one, even without a
   * documented "contre" position — a much stronger inference than the
   * "assume opposition when missing" setting, which blanket-assumes
   * opposition for ALL undocumented positions regardless of any actual
   * contradiction. Only set for pairs a human has manually verified are
   * truly mutually exclusive (see `scripts/` or PR history for the
   * reasoning) — most propositions have none.
   */
  contradicts?: string[];
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
  /**
   * Number of leading `deckIds` that make up the "égalitaire" phase
   * (every party backing the same number of propositions). Once the
   * user goes past this index, the deck continues with the remaining
   * propositions from parties that still have some left, balanced
   * among themselves — see `createNewDeck` in SwipeGame.tsx.
   */
  egalitarianCount: number;
  /** Index of the next proposition to show. */
  index: number;
  answers: AnswersMap;
}
