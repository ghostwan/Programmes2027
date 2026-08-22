import { Answer, AnswersMap, Party, PartyId, Proposition, ThemeId } from "@/lib/types";
import { propositionById as allPropositionsById } from "@/lib/data/propositions";

export interface PartyScore {
  partyId: PartyId;
  /**
   * 0-100 confidence-adjusted compatibility score, used for ranking and
   * display. See `wilsonLowerBound` below: this is NOT a plain agreement
   * ratio, it also accounts for how many propositions the score is based
   * on, so a party with a handful of shared propositions doesn't
   * outrank a party you agree with on dozens of them just because its
   * (small-sample) ratio happens to be higher.
   */
  matchPercent: number; // 0-100
  /** Plain agreement ratio (matched / answeredRelevant), 0-100, kept for
   * transparency/debugging but not meant to be used for ranking. */
  rawAgreementPercent: number;
  answeredRelevant: number; // number of propositions used to compute the score
}

/**
 * Lower bound of the Wilson score confidence interval for a binomial
 * proportion, expressed as a percentage. Given `matched` successes out of
 * `n` trials, this returns a conservative estimate of the "true" agreement
 * rate that gets closer to the raw ratio as `n` grows, but stays cautious
 * when `n` is small.
 *
 * This is the standard technique used to rank things by "rating" without
 * letting a handful of 5-star reviews outrank a product with thousands of
 * mostly-positive ones (e.g. Reddit's "best" comment sorting). Here it
 * prevents a party you agree with on only 2-3 propositions from
 * outranking one you agree with on dozens, just because its tiny sample
 * happens to be 100% "pour".
 */
function wilsonLowerBound(matched: number, n: number, z = 1.44): number {
  if (n === 0) return 0;
  const phat = matched / n;
  const z2 = z * z;
  const denominator = 1 + z2 / n;
  const center = phat + z2 / (2 * n);
  const margin = z * Math.sqrt((phat * (1 - phat) + z2 / (4 * n)) / n);
  const lowerBound = (center - margin) / denominator;
  return Math.round(Math.max(0, lowerBound) * 1000) / 10;
}

/**
 * A party's *implied* position on a proposition, combining its documented
 * support with a logical deduction from `Proposition.contradicts`: if a
 * party isn't documented as supporting this proposition but explicitly
 * supports one of its direct logical opposites (e.g. it backs "build new
 * nuclear reactors", which is `contradicts`-linked to "phase out nuclear
 * power"), it is necessarily opposed to this one too — that's not a
 * guess, it's a contradiction a party cannot hold at the same time.
 *
 * This is deliberately much narrower than `assumeOppositionWhenMissing`
 * (which blanket-assumes opposition for every undocumented position):
 * here we only ever infer "contre" when there's an explicit, documented
 * "pour" on a genuinely mutually-exclusive proposition — most
 * propositions have no `contradicts` link at all and fall back to
 * "unknown" (`null`), same as before.
 *
 * Always resolves `contradicts` IDs against the full propositions
 * dataset (not just whatever subset is being scored, e.g. a single
 * theme or a manually built basket), since a contradicting proposition
 * can belong to a different theme (e.g. a fiscal-policy proposition
 * contradicting an institutional one).
 */
function impliedPartyPosition(partyId: PartyId, prop: Proposition): Answer | null {
  if (prop.supportingParties.includes(partyId)) return "pour";
  if (prop.contradicts) {
    for (const oppositeId of prop.contradicts) {
      const opposite = allPropositionsById[oppositeId];
      if (opposite?.supportingParties.includes(partyId)) return "contre";
    }
  }
  return null;
}

export interface ThemeStat {
  themeId: ThemeId;
  pourCount: number;
  contreCount: number;
  totalAnswered: number;
  pourPercent: number;
  /** Every party tied for the best match percent (often just one, but can
   * be several in case of an exact tie — we never arbitrarily pick a
   * single "winner" among equally-matching parties). */
  topParties: PartyId[];
  topPartyPercent: number | null;
}

export interface MatchingOptions {
  /**
   * When false (default), a party's score is computed only from the
   * propositions it is documented as supporting: "pour" counts as a
   * match, "contre" counts against it, and propositions with no
   * documented position for that party are simply ignored (we don't
   * know, so we don't guess).
   *
   * When true, silence is treated as implicit opposition: for every
   * proposition the user answered "pour" or "contre", a party's assumed
   * position is "pour" if it's in `supportingParties`, otherwise
   * "contre". The score becomes the share of ALL answered propositions
   * where the user's answer matches that (explicit or assumed) position,
   * which lets un-listed parties be scored down instead of skipped.
   */
  assumeOppositionWhenMissing?: boolean;
}

/**
 * Compute, for each party, the percentage of alignment between the user's
 * answers and the party's known supported propositions.
 *
 * Methodology (default, `assumeOppositionWhenMissing: false`): we only have
 * positive data (which propositions a party supports). For each party we
 * look only at the propositions it supports AND that the user actually
 * answered (pour/contre, skips excluded), plus any proposition it doesn't
 * support but that directly contradicts one it does (see
 * `impliedPartyPosition`/`Proposition.contradicts`) — a sound logical
 * deduction, not a guess. The match percent is the share of those where
 * the user's answer matches the party's (explicit or deduced) position.
 * This avoids assuming a party opposes a proposition it simply has no
 * documented position on and no logical contradiction with.
 *
 * See `MatchingOptions.assumeOppositionWhenMissing` for the alternative
 * mode, which treats a missing position as implicit opposition instead.
 */
export function computePartyScores(
  answers: AnswersMap,
  propositions: Proposition[],
  options: MatchingOptions = {}
): PartyScore[] {
  const { assumeOppositionWhenMissing = false } = options;
  const partyIds = new Set<PartyId>();
  propositions.forEach((p) => p.supportingParties.forEach((id) => partyIds.add(id)));

  const scores: PartyScore[] = [];

  if (assumeOppositionWhenMissing) {
    // Silence counts as opposition: every answered proposition is
    // "relevant" for every party, with an assumed position of "pour" if
    // the party supports it, "contre" otherwise.
    const answeredProps = propositions.filter(
      (p) => answers[p.id] === "pour" || answers[p.id] === "contre"
    );
    for (const partyId of partyIds) {
      if (answeredProps.length === 0) {
        scores.push({
          partyId,
          matchPercent: 0,
          rawAgreementPercent: 0,
          answeredRelevant: 0,
        });
        continue;
      }
      const matched = answeredProps.filter((p) => {
        const partySupports = p.supportingParties.includes(partyId);
        const assumedPosition: Answer = partySupports ? "pour" : "contre";
        return answers[p.id] === assumedPosition;
      }).length;
      scores.push({
        partyId,
        matchPercent: wilsonLowerBound(matched, answeredProps.length),
        rawAgreementPercent:
          Math.round((matched / answeredProps.length) * 1000) / 10,
        answeredRelevant: answeredProps.length,
      });
    }
  } else {
    for (const partyId of partyIds) {
      const relevant = propositions.filter(
        (p) =>
          impliedPartyPosition(partyId, p) !== null &&
          (answers[p.id] === "pour" || answers[p.id] === "contre")
      );
      if (relevant.length === 0) {
        scores.push({
          partyId,
          matchPercent: 0,
          rawAgreementPercent: 0,
          answeredRelevant: 0,
        });
        continue;
      }
      const matched = relevant.filter(
        (p) => answers[p.id] === impliedPartyPosition(partyId, p)
      ).length;
      scores.push({
        partyId,
        matchPercent: wilsonLowerBound(matched, relevant.length),
        rawAgreementPercent: Math.round((matched / relevant.length) * 1000) / 10,
        answeredRelevant: relevant.length,
      });
    }
  }

  return scores.sort((a, b) => {
    if (b.matchPercent !== a.matchPercent) return b.matchPercent - a.matchPercent;
    return b.answeredRelevant - a.answeredRelevant;
  });
}

export function computeThemeStats(
  answers: AnswersMap,
  propositions: Proposition[],
  options: MatchingOptions = {}
): ThemeStat[] {
  const themeIds = Array.from(new Set(propositions.map((p) => p.themeId)));

  return themeIds.map((themeId) => {
    const themeProps = propositions.filter((p) => p.themeId === themeId);
    const answered = themeProps.filter(
      (p) => answers[p.id] === "pour" || answers[p.id] === "contre"
    );
    const pourCount = answered.filter((p) => answers[p.id] === "pour").length;
    const contreCount = answered.length - pourCount;

    const partyScores = computePartyScores(answers, themeProps, options).filter(
      (s) => s.answeredRelevant > 0
    );
    // If the user answered "contre" to everything in this theme (no
    // "pour" at all), every party's match percent is trivially 0% —
    // that's not a meaningful "closest party" tie, it just means nobody
    // was picked, so we show nothing instead of an uninformative
    // "ex æquo: <all 8 parties> (0%)".
    const topPercent = pourCount === 0 ? null : partyScores[0]?.matchPercent ?? null;
    const topParties =
      topPercent === null
        ? []
        : partyScores.filter((s) => s.matchPercent === topPercent).map((s) => s.partyId);

    return {
      themeId,
      pourCount,
      contreCount,
      totalAnswered: answered.length,
      pourPercent:
        answered.length > 0
          ? Math.round((pourCount / answered.length) * 1000) / 10
          : 0,
      topParties,
      topPartyPercent: topPercent,
    };
  });
}

export function getPartyById(parties: Party[], id: PartyId) {
  return parties.find((p) => p.id === id);
}
