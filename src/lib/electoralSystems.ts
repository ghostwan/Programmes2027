import { PartyId, Proposition } from "@/lib/types";
import {
  ELECTION_2024_BY_PARTY,
  MAJORITY_THRESHOLD,
  OTHER_SEATS_2024,
  OTHER_VOTE_SHARE_2024,
  TOTAL_SEATS,
} from "@/lib/data/electionResults2024";

export type ElectoralSystemId = "majoritaire" | "proportionnelle" | "mixte";

export interface ElectoralSystem {
  id: ElectoralSystemId;
  name: string;
  shortDescription: string;
}

export const ELECTORAL_SYSTEMS: ElectoralSystem[] = [
  {
    id: "majoritaire",
    name: "Scrutin majoritaire actuel",
    shortDescription:
      "Résultat réel des législatives 2024 : scrutin uninominal à deux tours, par circonscription.",
  },
  {
    id: "proportionnelle",
    name: "Proportionnelle intégrale",
    shortDescription:
      "Répartition nationale stricte des sièges au prorata des voix du 1er tour 2024 (méthode D'Hondt), seuil de 5% sans exception.",
  },
  {
    id: "mixte",
    name: "Mixte à l'allemande",
    shortDescription:
      "Moitié des sièges par circonscription, moitié en compensation proportionnelle nationale (méthode D'Hondt), seuil de 5% des voix OU 3 mandats directs (règle réellement utilisée en Allemagne).",
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

/** The real, historical 2024 seat distribution — used as-is. */
export function computeMajoritaireSeats(): SeatSimulationResult {
  const seatsByParty: SeatsByParty = {};
  for (const id of partyIds()) {
    seatsByParty[id] = ELECTION_2024_BY_PARTY[id].seats2024;
  }
  return { seatsByParty, otherSeats: OTHER_SEATS_2024 };
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

export function computeSeats(system: ElectoralSystemId): SeatSimulationResult {
  switch (system) {
    case "majoritaire":
      return computeMajoritaireSeats();
    case "proportionnelle":
      return computeProportionnelleSeats();
    case "mixte":
      return computeMixteSeats();
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

/** Total seats a coalition would hold under a given electoral system. */
export function coalitionSeats(
  parties: PartyId[],
  system: ElectoralSystemId
): number {
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
  system: ElectoralSystemId
): MajorityCoalitionResult | null {
  if (coalitions.length === 0) return null;

  const withSeats = coalitions.map((c) => ({
    coalition: c,
    seats: coalitionSeats(c.parties, system),
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
