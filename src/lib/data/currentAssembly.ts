import { PartyId } from "@/lib/types";
import { TOTAL_SEATS } from "@/lib/data/electionResults2024";

/**
 * Current composition of the XVIIe législature of the Assemblée
 * nationale, i.e. the actual, present-day balance of power — NOT the raw
 * 2024 election results, which have shifted since then (party splits,
 * new parliamentary groups, defections, by-elections...).
 *
 * Source (Wikipédia, « Assemblée nationale (France) », composition
 * infobox, as of 14 October 2025 — the most recent group breakdown
 * available; kept as a static snapshot rather than fetched live):
 * - EPR (Ensemble pour la République, ex-Renaissance): 90
 * - DR (Droite républicaine, ex-LR): 48
 * - RN (Rassemblement national): 122
 * - LFI-NFP (La France insoumise): 71
 * - SOC (Socialiste): 68
 * - EcoS (Écologiste, ex-EELV): 38
 * - GDR (Gauche démocrate et républicaine, ex-PCF): 17
 * - DEM (Les Démocrates, MoDem), HOR (Horizons), LIOT, UDR (Union des
 *   droites pour la République, Éric Ciotti's group) and non-inscrits:
 *   not one of our 8 tracked parties, counted as "autres".
 *
 * Mapping to our tracked party IDs is direct for the 7 groups that are
 * a continuation of a tracked party (Reconquête currently holds no
 * seat, same as after the 2024 election).
 */
export const CURRENT_ASSEMBLY_DATE = "14 octobre 2025";

export const CURRENT_ASSEMBLY_SEATS_BY_PARTY: Record<PartyId, number> = {
  lfi: 71,
  ps: 68,
  eelv: 38,
  pcf: 17,
  renaissance: 90,
  lr: 48,
  rn: 122,
  reconquete: 0,
};

const TRACKED_CURRENT_SEATS = Object.values(
  CURRENT_ASSEMBLY_SEATS_BY_PARTY
).reduce((sum, s) => sum + s, 0);

/** DEM (37) + HOR (36) + LIOT (23) + UDR (17) + non-inscrits (10) = 123. */
export const CURRENT_ASSEMBLY_OTHER_SEATS = TOTAL_SEATS - TRACKED_CURRENT_SEATS;

export type SupportGroupId = "dem" | "hor" | "liot" | "udr" | "ni";

export interface SupportGroup {
  id: SupportGroupId;
  shortName: string;
  name: string;
  /** Real seats in the current Assembly (see module doc for date/source). */
  seats: number;
  /** Neutral, distinguishable colors — deliberately NOT one of the 8
   * tracked parties' colors, since these groups aren't tracked for
   * proposition support: adding them to a coalition only ever contributes
   * seats, never program coverage. */
  color: string;
}

/**
 * The 5 real parliamentary groups making up "autres"/`CURRENT_ASSEMBLY_OTHER_SEATS`
 * above, exposed individually so users can add them to a coalition as
 * potential extra seats of support (e.g. a centrist or regionalist group
 * that might vote for a bill without being one of the 8 parties whose
 * proposition-level positions this site tracks). Seats sum to 123,
 * matching `CURRENT_ASSEMBLY_OTHER_SEATS`.
 *
 * Only meaningful under the "actuelle" electoral system: we have no
 * equivalent 2024 national vote-share breakdown for these groups (most
 * ran under joint labels like "Ensemble" with Renaissance, or didn't
 * exist as distinct groups until after the election), so they can't be
 * re-simulated under "proportionnelle"/"mixte"/"utopique".
 */
export const OTHER_ASSEMBLY_GROUPS: SupportGroup[] = [
  { id: "dem", shortName: "DEM", name: "Les Démocrates (MoDem)", seats: 37, color: "#94a3b8" },
  { id: "hor", shortName: "HOR", name: "Horizons et indépendants", seats: 36, color: "#78716c" },
  { id: "liot", shortName: "LIOT", name: "Libertés, indépendants, outre-mer et territoires", seats: 23, color: "#a8a29e" },
  { id: "udr", shortName: "UDR", name: "Union des droites pour la République", seats: 17, color: "#57534e" },
  { id: "ni", shortName: "NI", name: "Non-inscrits", seats: 10, color: "#d6d3d1" },
];
