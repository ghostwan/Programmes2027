import { Answer, AnswersMap, Party, PartyId, Proposition, ThemeId } from "@/lib/types";

export interface PartyScore {
  partyId: PartyId;
  matchPercent: number; // 0-100
  answeredRelevant: number; // number of propositions used to compute the score
}

export interface ThemeStat {
  themeId: ThemeId;
  pourCount: number;
  contreCount: number;
  totalAnswered: number;
  pourPercent: number;
  topParty: PartyId | null;
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
 * answered (pour/contre, skips excluded). The match percent is the share
 * of those the user answered "pour" on. This avoids assuming a party
 * opposes a proposition it simply has no documented position on.
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
        scores.push({ partyId, matchPercent: 0, answeredRelevant: 0 });
        continue;
      }
      const matched = answeredProps.filter((p) => {
        const partySupports = p.supportingParties.includes(partyId);
        const assumedPosition: Answer = partySupports ? "pour" : "contre";
        return answers[p.id] === assumedPosition;
      }).length;
      scores.push({
        partyId,
        matchPercent: Math.round((matched / answeredProps.length) * 1000) / 10,
        answeredRelevant: answeredProps.length,
      });
    }
  } else {
    for (const partyId of partyIds) {
      const relevant = propositions.filter(
        (p) =>
          p.supportingParties.includes(partyId) &&
          (answers[p.id] === "pour" || answers[p.id] === "contre")
      );
      if (relevant.length === 0) {
        scores.push({ partyId, matchPercent: 0, answeredRelevant: 0 });
        continue;
      }
      const matched = relevant.filter((p) => answers[p.id] === "pour").length;
      scores.push({
        partyId,
        matchPercent: Math.round((matched / relevant.length) * 1000) / 10,
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
    const top = partyScores[0];

    return {
      themeId,
      pourCount,
      contreCount,
      totalAnswered: answered.length,
      pourPercent:
        answered.length > 0
          ? Math.round((pourCount / answered.length) * 1000) / 10
          : 0,
      topParty: top ? top.partyId : null,
      topPartyPercent: top ? top.matchPercent : null,
    };
  });
}

export function getPartyById(parties: Party[], id: PartyId) {
  return parties.find((p) => p.id === id);
}
