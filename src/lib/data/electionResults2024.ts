import { PartyId } from "@/lib/types";

/**
 * Real results of the 2024 French legislative election, used as the
 * historical reference baseline for the coalition/hemicycle simulator.
 *
 * IMPORTANT: this is a REAL, PAST election (June-July 2024), not a
 * prediction for 2027. It is used only as an illustrative starting point
 * to compare how different electoral systems would translate a similar
 * vote pattern into seats — not as a forecast.
 *
 * Sources (Wikipédia, « Élections législatives françaises de 2024 »):
 * - `seats2024`: seats per party-specific nuance (« Résultats par
 *   coalition » table), not the broader parliamentary group figures
 *   (which include unrelated apparentés from other small parties).
 * - `voteShare2024`: first-round national vote share, per party nuance.
 */
export const TOTAL_SEATS = 577;
export const MAJORITY_THRESHOLD = 289;

export interface Party2024Result {
  seats2024: number;
  voteShare2024: number; // percent of first-round expressed votes
}

export const ELECTION_2024_BY_PARTY: Record<PartyId, Party2024Result> = {
  lfi: { seats2024: 64, voteShare2024: 10.49 },
  ps: { seats2024: 63, voteShare2024: 8.58 },
  eelv: { seats2024: 25, voteShare2024: 4.38 },
  pcf: { seats2024: 8, voteShare2024: 2.35 },
  renaissance: { seats2024: 92, voteShare2024: 12.32 },
  lr: { seats2024: 48, voteShare2024: 7.55 },
  rn: { seats2024: 126, voteShare2024: 28.05 },
  reconquete: { seats2024: 0, voteShare2024: 0.74 },
};

const TRACKED_SEATS_2024 = Object.values(ELECTION_2024_BY_PARTY).reduce(
  (sum, p) => sum + p.seats2024,
  0
);
const TRACKED_VOTE_SHARE_2024 = Object.values(ELECTION_2024_BY_PARTY).reduce(
  (sum, p) => sum + p.voteShare2024,
  0
);

/**
 * Everything not attributable to one of our 8 tracked parties: MoDem,
 * Horizons, UDI, Parti radical, Ciotti's "À droite !", regionalists,
 * various left/right/centre, non-inscrits... These deputies/voters exist
 * but we don't track their supported propositions, so they can never be
 * counted as part of a simulated coalition — only tracked parties can.
 */
export const OTHER_SEATS_2024 = TOTAL_SEATS - TRACKED_SEATS_2024;
export const OTHER_VOTE_SHARE_2024 = 100 - TRACKED_VOTE_SHARE_2024;
