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

/** Number of propositions each tracked party currently supports. */
export function countPropositionsByParty(props: Proposition[]): Map<PartyId, number> {
  const counts = new Map<PartyId, number>();
  for (const p of props) {
    for (const partyId of p.supportingParties) {
      counts.set(partyId, (counts.get(partyId) ?? 0) + 1);
    }
  }
  return counts;
}

/** Median across parties of their supported-proposition count (rounded to
 * the nearest integer). Used as the default cap for the "balanced" quiz
 * mode below. */
export function medianPropositionsPerParty(props: Proposition[]): number {
  const counts = [...countPropositionsByParty(props).values()].sort((a, b) => a - b);
  if (counts.length === 0) return 0;
  const mid = Math.floor(counts.length / 2);
  const median =
    counts.length % 2 === 0 ? (counts[mid - 1] + counts[mid]) / 2 : counts[mid];
  return Math.round(median);
}

/**
 * Selects a subset of propositions so that no party contributes more
 * than `capPerParty` propositions to the quiz — small/niche parties
 * (e.g. Reconquête, with far fewer documented propositions than others)
 * simply keep all of theirs (since they never reach the cap), while
 * well-documented parties (e.g. LR, LFI) get trimmed down to the cap.
 *
 * Unlike `createBalancedDeckOrder` (which keeps every proposition and
 * only changes their *order* to spread exposure evenly), this actually
 * shortens the quiz: it deliberately gives up some of the extra
 * granularity available for well-documented parties in exchange for a
 * shorter, more evenly-weighted-by-party quiz — a reasonable tradeoff
 * when a party's small footprint (like a niche party such as
 * Reconquête) is expected and not something to compensate for.
 *
 * Greedy selection: repeatedly pick, among the not-yet-selected
 * propositions, the one that helps the most parties still under their
 * cap (weighted by how much headroom each still has) — a proposition
 * supporting several currently under-cap parties at once is prioritized,
 * since picking it "spends" only one quiz question to make progress on
 * multiple parties' quotas. Stops once no remaining proposition can help
 * any party that hasn't already reached its cap.
 */
/**
 * Selects a pool where every party ends up backing the exact same
 * number of propositions in the quiz — the "égalitaire" mode. The
 * target count is the smallest number of propositions any tracked party
 * supports (a niche party can't be given more than it actually has),
 * capped at `maxPerParty` so the quiz never gets unreasonably long even
 * if every party happened to have a huge, similar footprint.
 *
 * For each party, `target` of its supporting propositions are picked at
 * random (without replacement within that party's own list). A
 * proposition supported by several parties at once can satisfy more
 * than one party's quota simultaneously — it's only added to the
 * returned pool once, but still counts towards the quota of every party
 * it supports, exactly like it would if shown in the finished quiz.
 */
export function selectEgalitarianPropositions(
  props: Proposition[],
  maxPerParty = 30
): Proposition[] {
  const counts = countPropositionsByParty(props);
  if (counts.size === 0) return [];
  const minCount = Math.min(...counts.values());
  const target = Math.min(minCount, maxPerParty);

  const byParty = new Map<PartyId, Proposition[]>();
  for (const p of props) {
    for (const partyId of p.supportingParties) {
      if (!byParty.has(partyId)) byParty.set(partyId, []);
      byParty.get(partyId)!.push(p);
    }
  }

  const selectedIds = new Set<string>();
  const selected: Proposition[] = [];

  for (const list of byParty.values()) {
    const shuffled = shuffle(list);
    let taken = 0;
    for (const p of shuffled) {
      if (taken >= target) break;
      if (!selectedIds.has(p.id)) {
        selectedIds.add(p.id);
        selected.push(p);
      }
      taken++;
    }
  }

  return selected;
}

export function selectCappedPropositions(
  props: Proposition[],
  capPerParty: number
): Proposition[] {
  const target = new Map<PartyId, number>();
  for (const [partyId, total] of countPropositionsByParty(props)) {
    target.set(partyId, Math.min(total, capPerParty));
  }

  const placed = new Map<PartyId, number>();
  const remaining = shuffle(props);
  const selected: Proposition[] = [];

  while (true) {
    let bestIndex = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const candidate = remaining[i];
      let score = 0;
      let helpsAny = false;
      for (const partyId of candidate.supportingParties) {
        const t = target.get(partyId) ?? 0;
        const p = placed.get(partyId) ?? 0;
        if (p < t) {
          helpsAny = true;
          score += t - p;
        }
      }
      if (helpsAny && score > bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    }

    if (bestIndex === -1) break; // nothing left can help an under-cap party

    const [chosen] = remaining.splice(bestIndex, 1);
    selected.push(chosen);
    for (const partyId of chosen.supportingParties) {
      const t = target.get(partyId) ?? 0;
      const p = placed.get(partyId) ?? 0;
      if (p < t) placed.set(partyId, p + 1);
    }
  }

  return selected;
}
