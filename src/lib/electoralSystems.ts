import { PartyId, Proposition } from "@/lib/types";
import {
  ELECTION_2024_BY_PARTY,
  MAJORITY_THRESHOLD,
  OTHER_VOTE_SHARE_2024,
  TOTAL_SEATS,
} from "@/lib/data/electionResults2024";
import {
  CURRENT_ASSEMBLY_DATE,
  CURRENT_ASSEMBLY_OTHER_SEATS,
  CURRENT_ASSEMBLY_SEATS_BY_PARTY,
} from "@/lib/data/currentAssembly";

export type ElectoralSystemId =
  | "actuelle"
  | "proportionnelle"
  | "mixte"
  | "utopique";

export interface ElectoralSystem {
  id: ElectoralSystemId;
  name: string;
  shortDescription: string;
}

export const ELECTORAL_SYSTEMS: ElectoralSystem[] = [
  {
    id: "actuelle",
    name: "Assemblée actuelle",
    shortDescription: `Composition réelle et actuelle de l'Assemblée nationale (groupes parlementaires au ${CURRENT_ASSEMBLY_DATE}), qui a évolué depuis les élections de 2024 (scissions, nouveaux groupes...).`,
  },
  {
    id: "proportionnelle",
    name: "Si scrutin proportionnel intégral",
    shortDescription:
      "Mêmes résultats électoraux (1er tour des législatives 2024), mais sièges réattribués en proportionnelle intégrale nationale (méthode D'Hondt), seuil de 5% sans exception, au lieu du scrutin uninominal réellement utilisé.",
  },
  {
    id: "mixte",
    name: "Si scrutin mixte à l'allemande",
    shortDescription:
      "Mêmes résultats électoraux (2024), mais moitié des sièges par circonscription et moitié en compensation proportionnelle nationale (méthode D'Hondt), seuil de 5% des voix OU 3 mandats directs (règle réellement utilisée en Allemagne).",
  },
  {
    id: "utopique",
    name: "🌈 Assemblée utopique",
    shortDescription:
      "Feuille blanche : on ignore la réalité électorale et on invente une Assemblée sur mesure, où la coalition sélectionnée ci-dessous obtient tout juste la majorité absolue, chaque parti au prorata de votre compatibilité avec lui (ou de son poids électoral 2024 si cette compatibilité n'est pas disponible) — le reste des sièges est affiché en gris, sans couleur de parti.",
  },
];

export type SeatsByParty = Partial<Record<PartyId, number>>;

export interface SeatSimulationResult {
  seatsByParty: SeatsByParty;
  otherSeats: number;
}

/**
 * D'Hondt highest-averages allocation: standard method used by most
 * European list-PR systems (and the one closest to what's usually
 * proposed for France). Includes an "autres" bloc representing every
 * voter/party we don't track, competing for seats like everyone else —
 * this deliberately reduces how many of the 577 seats are actually up for
 * grabs among our 8 tracked parties, which is realistic.
 */
function allocateDHondt(
  candidates: Array<{ id: PartyId | "autres"; voteShare: number }>,
  totalSeats: number
): Record<string, number> {
  const seats: Record<string, number> = {};
  for (const c of candidates) seats[c.id] = 0;

  for (let round = 0; round < totalSeats; round++) {
    let bestId: string | null = null;
    let bestQuotient = -1;
    for (const c of candidates) {
      const quotient = c.voteShare / (seats[c.id] + 1);
      if (quotient > bestQuotient) {
        bestQuotient = quotient;
        bestId = c.id;
      }
    }
    if (bestId) seats[bestId] += 1;
  }
  return seats;
}

function partyIds(): PartyId[] {
  return Object.keys(ELECTION_2024_BY_PARTY) as PartyId[];
}

/** Strict 5% national threshold, no exceptions. */
export function computeProportionnelleSeats(): SeatSimulationResult {
  const candidates = [
    ...partyIds().map((id) => ({
      id,
      voteShare: ELECTION_2024_BY_PARTY[id].voteShare2024,
    })),
    { id: "autres" as const, voteShare: OTHER_VOTE_SHARE_2024 },
  ].filter((c) => c.id === "autres" || c.voteShare >= 5);

  const allocated = allocateDHondt(candidates, TOTAL_SEATS);

  const seatsByParty: SeatsByParty = {};
  for (const id of partyIds()) {
    if (ELECTION_2024_BY_PARTY[id].voteShare2024 >= 5) {
      seatsByParty[id] = allocated[id] ?? 0;
    } else {
      seatsByParty[id] = 0;
    }
  }
  return { seatsByParty, otherSeats: allocated["autres"] ?? 0 };
}

/**
 * German-style mixed system: a party qualifies for the proportional
 * allocation if it clears 5% nationally OR already won at least 3 direct
 * constituency seats (the actual German "Grundmandatsklausel" rule) — we
 * use the real 2024 majoritarian results as a stand-in for "direct
 * constituency seats" for this threshold check only. This is the
 * mechanism that, in practice, lets smaller regionally-concentrated
 * parties (here: EELV, PCF) into the proportional allocation even below
 * 5%, unlike the strict "proportionnelle intégrale" mode.
 */
export function computeMixteSeats(): SeatSimulationResult {
  const qualifies = (id: PartyId) =>
    ELECTION_2024_BY_PARTY[id].voteShare2024 >= 5 ||
    ELECTION_2024_BY_PARTY[id].seats2024 >= 3;

  const candidates = [
    ...partyIds()
      .filter(qualifies)
      .map((id) => ({ id, voteShare: ELECTION_2024_BY_PARTY[id].voteShare2024 })),
    { id: "autres" as const, voteShare: OTHER_VOTE_SHARE_2024 },
  ];

  const allocated = allocateDHondt(candidates, TOTAL_SEATS);

  const seatsByParty: SeatsByParty = {};
  for (const id of partyIds()) {
    seatsByParty[id] = qualifies(id) ? allocated[id] ?? 0 : 0;
  }
  return { seatsByParty, otherSeats: allocated["autres"] ?? 0 };
}

/**
 * The current, present-day balance of power in the Assemblée nationale.
 * See `src/lib/data/currentAssembly.ts` for sourcing and the snapshot
 * date — this is the "real" baseline for the coalition simulator; the
 * "proportionnelle"/"mixte" systems below simulate what the SAME 2024
 * election result would have produced under a different voting system,
 * not what today's Assembly would look like reallocated (we have no
 * newer national vote-share data to do that with).
 */
export function computeActuelleSeats(): SeatSimulationResult {
  return {
    seatsByParty: { ...CURRENT_ASSEMBLY_SEATS_BY_PARTY },
    otherSeats: CURRENT_ASSEMBLY_OTHER_SEATS,
  };
}

export function computeSeats(system: ElectoralSystemId): SeatSimulationResult {
  switch (system) {
    case "proportionnelle":
      return computeProportionnelleSeats();
    case "mixte":
      return computeMixteSeats();
    case "actuelle":
      return computeActuelleSeats();
    case "utopique":
      // The "utopian" system has no fixed seat map: it's entirely built
      // around whichever coalition is selected. Callers that need a
      // hemicycle for this mode must use `computeUtopianSeats(parties)`
      // directly instead of this generic dispatcher.
      return { seatsByParty: {}, otherSeats: TOTAL_SEATS };
  }
}

export { MAJORITY_THRESHOLD, TOTAL_SEATS };

// ---------------------------------------------------------------------
// Coalition finder: given a "basket" of chosen propositions, find which
// combinations of parties collectively cover the whole basket (union of
// supported propositions), i.e. every proposition has at least one
// supporting party inside the coalition.
// ---------------------------------------------------------------------

export interface CoalitionOption {
  parties: PartyId[];
  /** Number of basket propositions covered by at least one member. */
  coveredCount: number;
  totalCount: number;
  coveragePercent: number;
  isFullCoverage: boolean;
}

/**
 * Enumerates coalitions (subsets of the parties that support at least one
 * basket proposition) up to a reasonable size, sorted by fewest parties
 * first, then highest coverage. Only parties supporting at least one
 * basket proposition are considered — no point adding a party that
 * contributes nothing.
 */
export function findCoalitions(
  basket: Proposition[],
  maxPartiesInCoalition = 8
): CoalitionOption[] {
  if (basket.length === 0) return [];

  const relevantParties = Array.from(
    new Set(basket.flatMap((p) => p.supportingParties))
  );

  const results: CoalitionOption[] = [];
  const n = relevantParties.length;

  // Enumerate all non-empty subsets (n is small: at most 8 parties, so at
  // most 2^8 = 256 subsets — trivial).
  for (let mask = 1; mask < 1 << n; mask++) {
    const parties: PartyId[] = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) parties.push(relevantParties[i]);
    }
    if (parties.length > maxPartiesInCoalition) continue;

    const coveredCount = basket.filter((p) =>
      p.supportingParties.some((id) => parties.includes(id))
    ).length;

    results.push({
      parties,
      coveredCount,
      totalCount: basket.length,
      coveragePercent: Math.round((coveredCount / basket.length) * 1000) / 10,
      isFullCoverage: coveredCount === basket.length,
    });
  }

  results.sort((a, b) => {
    // Full coverage first, then fewer parties, then higher coverage.
    if (a.isFullCoverage !== b.isFullCoverage) return a.isFullCoverage ? -1 : 1;
    if (a.parties.length !== b.parties.length)
      return a.parties.length - b.parties.length;
    return b.coveragePercent - a.coveragePercent;
  });

  return results;
}

/**
 * Per-party compatibility percentages (0-100), typically the quiz results'
 * matching score. When passed to `coalitionSeats`/`findVirtualMajority`,
 * each party's seats are weighted by how much of its program you actually
 * agree with, instead of counting its full delegation as if it fully
 * backed your program: a party you're only 40% compatible with
 * contributes only 40% of its real seats to the coalition's total.
 */
export type PartyCompatibility = Partial<Record<PartyId, number>>;

/**
 * "Utopian / blank slate" mode: instead of reflecting any real election
 * or the current Assembly, this builds a fictional 577-seat Assembly
 * from scratch where the given coalition holds exactly enough seats to
 * reach the absolute majority (`MAJORITY_THRESHOLD`) — no more, no less
 * — and every other seat is left as an unattributed grey "reste" bloc
 * (deliberately not tied to any real party, per the "blank slate" idea).
 *
 * Seats within the coalition are split proportionally to `compatibility`
 * (your quiz compatibility percentage with each party) when available —
 * this is the whole point of the "utopian" mode: a party you agree with
 * on 90% of its program should dominate the fictional Assembly, not one
 * you merely happen to share a few propositions with. Without a
 * compatibility map (e.g. on the /marche page, built without a quiz),
 * falls back to each party's real 2024 national vote share instead, so a
 * party with a small but real electorate (e.g. Reconquête) still gets a
 * small, non-zero share instead of being wiped out the way it was by the
 * real 2024 result. Uses the largest-remainder method so the total
 * always lands exactly on `MAJORITY_THRESHOLD`.
 */
export function computeUtopianSeats(
  parties: PartyId[],
  compatibility?: PartyCompatibility
): SeatSimulationResult {
  if (parties.length === 0) {
    return { seatsByParty: {}, otherSeats: TOTAL_SEATS };
  }

  const weights = parties.map((id) =>
    Math.max(compatibility?.[id] ?? ELECTION_2024_BY_PARTY[id].voteShare2024, 0.1)
  );
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  const rawShares = weights.map((w) => (w / totalWeight) * MAJORITY_THRESHOLD);
  const floors = rawShares.map(Math.floor);
  let assigned = floors.reduce((sum, f) => sum + f, 0);

  const remainders = rawShares
    .map((r, i) => ({ i, frac: r - floors[i] }))
    .sort((a, b) => b.frac - a.frac);

  let cursor = 0;
  while (assigned < MAJORITY_THRESHOLD) {
    floors[remainders[cursor % remainders.length].i] += 1;
    assigned += 1;
    cursor += 1;
  }

  const seatsByParty: SeatsByParty = {};
  parties.forEach((id, i) => {
    seatsByParty[id] = floors[i];
  });

  return { seatsByParty, otherSeats: TOTAL_SEATS - MAJORITY_THRESHOLD };
}

/**
 * Total seats a coalition would hold under a given electoral system.
 * Compatibility weighting (`compatibility`) only ever applies under the
 * "utopian" system (handled entirely by `computeUtopianSeats`, which
 * `coalitionSeats` just totals up below): under every other system, a
 * party's seats are counted in full regardless of your compatibility
 * with it — your compatibility with a party doesn't change how many
 * real deputies it actually has.
 */
export function coalitionSeats(
  parties: PartyId[],
  system: ElectoralSystemId,
  compatibility?: PartyCompatibility
): number {
  if (system === "utopique") {
    return parties.length === 0
      ? 0
      : Object.values(computeUtopianSeats(parties, compatibility).seatsByParty).reduce(
          (sum, s) => sum + (s ?? 0),
          0
        );
  }
  const { seatsByParty } = computeSeats(system);
  return parties.reduce((sum, id) => sum + (seatsByParty[id] ?? 0), 0);
}

export interface MajorityCoalitionResult {
  coalition: CoalitionOption;
  seats: number;
  hasMajority: boolean;
}

/**
 * Finds the best "virtual majority" for a given electoral system: among
 * all enumerated coalitions capable of realizing the program (fully, or
 * as closely as possible), picks the one that reaches the 289-seat
 * threshold under THIS specific system, preferring — in order — full
 * program coverage, then fewer parties, then more seats.
 *
 * This is deliberately computed per electoral system rather than once:
 * since a given party's seat count varies a lot between systems (e.g. a
 * party under-represented by the current majoritarian system can gain
 * many more seats under full proportional representation), the smallest
 * coalition that reaches a majority can genuinely differ from one system
 * to another. Returns null if no enumerated coalition reaches a majority
 * under this system at all (not even the full union of every relevant
 * party) — in that case, the program simply cannot get a majority with
 * the tracked parties alone under this system.
 */
export function findVirtualMajority(
  coalitions: CoalitionOption[],
  system: ElectoralSystemId,
  compatibility?: PartyCompatibility
): MajorityCoalitionResult | null {
  if (coalitions.length === 0) return null;

  const withSeats = coalitions.map((c) => ({
    coalition: c,
    seats: coalitionSeats(c.parties, system, compatibility),
  }));

  const majorityOnes = withSeats.filter((c) => c.seats >= MAJORITY_THRESHOLD);
  if (majorityOnes.length === 0) return null;

  majorityOnes.sort((a, b) => {
    if (a.coalition.isFullCoverage !== b.coalition.isFullCoverage) {
      return a.coalition.isFullCoverage ? -1 : 1;
    }
    if (a.coalition.coveragePercent !== b.coalition.coveragePercent) {
      return b.coalition.coveragePercent - a.coalition.coveragePercent;
    }
    if (a.coalition.parties.length !== b.coalition.parties.length) {
      return a.coalition.parties.length - b.coalition.parties.length;
    }
    return b.seats - a.seats;
  });

  const best = majorityOnes[0];
  return { coalition: best.coalition, seats: best.seats, hasMajority: true };
}
