import { PartyId, Proposition } from "@/lib/types";

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Orders the quiz deck so that every party's supported propositions are
 * spread out as evenly as possible across the whole deck, instead of
 * relying purely on a random shuffle.
 *
 * Why this matters: parties don't all have the same number of documented
 * propositions (e.g. Reconquête has ~19, LR has ~101 in the current
 * dataset). A party's match score only ever depends on the propositions
 * *it* supports (see `computePartyScores` in `matching.ts`), so the raw
 * count difference doesn't bias the percentage itself. But a pure random
 * shuffle only guarantees an even spread *on average* — for a party with
 * few propositions, bad luck can easily cluster most of them near the
 * end of the deck. Since the quiz lets users view their results before
 * finishing the whole deck (see `MIN_ANSWERS_FOR_EARLY_RESULTS`), that
 * means a low-count party could end up with 0 or 1 answered propositions
 * at that point, making its score wildly unstable — while a
 * well-documented party already has a much larger, more stable sample.
 *
 * This function fixes that by greedily placing, at each position, the
 * remaining proposition that most reduces the "scheduling deficit" of
 * the parties it supports — the gap between how many of a party's
 * propositions *should* have appeared by now (proportionally to overall
 * progress through the deck) and how many actually have. Propositions
 * supporting several parties at once (the common case in this dataset)
 * naturally get prioritized when they help multiple currently
 * under-represented parties simultaneously. The result: near-even
 * exposure to every party throughout the deck, regardless of shuffle
 * luck, while still showing every proposition exactly once if the user
 * completes the whole quiz.
 */
export function createBalancedDeckOrder(props: Proposition[]): Proposition[] {
  const total = props.length;
  if (total === 0) return [];

  // Randomize the starting pool so propositions with identical scores at
  // any given step are picked in a non-deterministic order.
  const remaining = shuffle(props);

  const totalCountByParty = new Map<PartyId, number>();
  for (const p of props) {
    for (const partyId of p.supportingParties) {
      totalCountByParty.set(partyId, (totalCountByParty.get(partyId) ?? 0) + 1);
    }
  }

  const placedCountByParty = new Map<PartyId, number>();

  const ordered: Proposition[] = [];

  for (let placed = 0; placed < total; placed++) {
    let bestIndex = 0;
    let bestScore = -Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const candidate = remaining[i];
      let score = 0;
      for (const partyId of candidate.supportingParties) {
        const partyTotal = totalCountByParty.get(partyId);
        if (!partyTotal) continue;
        const idealPlacedByNow = (placed / total) * partyTotal;
        const actualPlaced = placedCountByParty.get(partyId) ?? 0;
        score += idealPlacedByNow - actualPlaced; // positive = party is behind schedule
      }
      if (score > bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    }

    const [chosen] = remaining.splice(bestIndex, 1);
    ordered.push(chosen);
    for (const partyId of chosen.supportingParties) {
      placedCountByParty.set(partyId, (placedCountByParty.get(partyId) ?? 0) + 1);
    }
  }

  return ordered;
}
