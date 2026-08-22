"use client";

import { useMemo, useState } from "react";
import { partyById } from "@/lib/data/parties";
import { PartyId, Proposition } from "@/lib/types";
import {
  OTHER_ASSEMBLY_GROUPS,
  SupportGroupId,
} from "@/lib/data/currentAssembly";
import {
  ELECTORAL_SYSTEMS,
  ElectoralSystemId,
  MAJORITY_THRESHOLD,
  PartyCompatibility,
  SeatsByParty,
  TOTAL_SEATS,
  computeSeats,
  computeUtopianSeats,
  findCoalitions,
  findVirtualMajority,
} from "@/lib/electoralSystems";
import { Hemicycle } from "@/components/Hemicycle";

/**
 * Left-to-right political ordering, matching Hemicycle.tsx, used to
 * display party toggles in a sensible order instead of an arbitrary one.
 */
const POLITICAL_ORDER: PartyId[] = [
  "lfi",
  "pcf",
  "eelv",
  "ps",
  "renaissance",
  "lr",
  "rn",
  "reconquete",
];

function sortByPoliticalOrder(parties: PartyId[]): PartyId[] {
  return [...parties].sort(
    (a, b) => POLITICAL_ORDER.indexOf(a) - POLITICAL_ORDER.indexOf(b)
  );
}

/** All 8 tracked parties, in political order — shown as toggles
 * regardless of whether they support anything in the current basket, so
 * a party can still be added purely for its seats (e.g. to reach a
 * majority) even if it wouldn't help realize the program at all. */
const ALL_TRACKED_PARTIES: PartyId[] = sortByPoliticalOrder(
  Object.keys(partyById) as PartyId[]
);

/** Stable key identifying a set of propositions, used to detect when the
 * basket itself changed (as opposed to just the user toggling parties),
 * so the coalition can be reset to the recommended one in that case. */
function propositionsKey(propositions: Proposition[]): string {
  return propositions
    .map((p) => p.id)
    .sort()
    .join(",");
}

/**
 * Given a set of propositions (a "program" — either a manually built
 * market basket, or every proposition a quiz player answered "pour" to),
 * proposes a single coalition capable of realizing it, then lets the
 * user freely add or remove any party to see how changing partners
 * affects their custom program: which propositions would no longer be
 * covered, and how many seats the resulting coalition would hold under
 * various electoral systems.
 *
 * Shared between the /marche page and the quiz results page so both
 * benefit from the same coalition/seat logic.
 *
 * `partyCompatibility` (optional, only available on the quiz results
 * page where we actually know how much of each party's program you
 * agree with) weights each party's seats by that percentage instead of
 * counting its full delegation: a party you're only 40% compatible with
 * only brings 40% of its real seats to the coalition's total.
 */
export function CoalitionExplorer({
  propositions,
  partyCompatibility,
}: {
  propositions: Proposition[];
  partyCompatibility?: PartyCompatibility;
}) {
  const [system, setSystem] = useState<ElectoralSystemId>("actuelle");
  const [selectedSupportGroups, setSelectedSupportGroups] = useState<
    SupportGroupId[]
  >([]);

  const coalitions = useMemo(() => findCoalitions(propositions), [propositions]);
  // The single best coalition proposed by default: fewest parties among
  // those reaching full program coverage (falls back to the highest
  // partial coverage if none reaches 100%) — see `findCoalitions`'s
  // sort order.
  const recommendedCoalition = coalitions[0] ?? null;

  const [selectedParties, setSelectedParties] = useState<PartyId[]>(
    () => recommendedCoalition?.parties ?? []
  );

  // Reset the customized coalition to the newly recommended one whenever
  // the underlying basket of propositions changes (not just when the
  // user toggles parties) — adjusts state during rendering rather than
  // in an effect, as recommended for "resetting state when a prop/derived
  // value changes" (see https://react.dev/learn/you-might-not-need-an-effect).
  const [prevKey, setPrevKey] = useState(propositionsKey(propositions));
  const currentKey = propositionsKey(propositions);
  if (currentKey !== prevKey) {
    setPrevKey(currentKey);
    setSelectedParties(recommendedCoalition?.parties ?? []);
    setSelectedSupportGroups([]);
  }

  const virtualMajority = useMemo(
    () => findVirtualMajority(coalitions, system, partyCompatibility),
    [coalitions, system, partyCompatibility]
  );

  if (propositions.length === 0) return null;

  function toggleParty(id: PartyId) {
    setSelectedParties((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  function toggleSupportGroup(id: SupportGroupId) {
    setSelectedSupportGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  }

  const coveredPropositions = propositions.filter((p) =>
    p.supportingParties.some((id) => selectedParties.includes(id))
  );
  const uncoveredPropositions = propositions.filter(
    (p) => !p.supportingParties.some((id) => selectedParties.includes(id))
  );
  const coveragePercent =
    propositions.length > 0
      ? Math.round((coveredPropositions.length / propositions.length) * 1000) / 10
      : 0;
  const isFullCoverage = uncoveredPropositions.length === 0;

  const isCustomized =
    recommendedCoalition !== null &&
    (selectedParties.length !== recommendedCoalition.parties.length ||
      !recommendedCoalition.parties.every((id) => selectedParties.includes(id)));

  return (
    <>
      {/* Coalition picker */}
      <section className="mt-10">
        <h2 className="text-lg font-bold text-slate-900">Votre coalition</h2>
        <p className="mt-1 text-xs text-slate-500">
          Une coalition réalise ce programme si, pour chaque proposition, au
          moins un de ses partis la soutient — chaque parti apportant ses
          propres mesures à l&apos;accord, comme dans un accord de
          coalition réel. Voici une coalition qui le réalise ; cochez ou
          décochez librement des partis pour voir comment changer de
          partenaires affecterait votre programme sur mesure (un parti qui
          ne soutient aucune de vos propositions peut quand même être
          ajouté, par exemple pour ses seuls sièges).
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {ALL_TRACKED_PARTIES.map((pid) => {
            const isIn = selectedParties.includes(pid);
            return (
              <label
                key={pid}
                className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                  isIn
                    ? "border-transparent text-white"
                    : "border-slate-300 bg-white text-slate-500 hover:border-slate-400"
                }`}
                style={isIn ? { backgroundColor: partyById[pid].color } : undefined}
              >
                <input
                  type="checkbox"
                  checked={isIn}
                  onChange={() => toggleParty(pid)}
                  className="h-3.5 w-3.5"
                />
                {partyById[pid].shortName}
              </label>
            );
          })}
          {isCustomized && recommendedCoalition && (
            <button
              onClick={() => {
                setSelectedParties(recommendedCoalition.parties);
                setSelectedSupportGroups([]);
              }}
              className="ml-1 rounded-full border border-slate-900 px-3 py-1.5 text-sm font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
            >
              ↺ Revenir à la coalition proposée
            </button>
          )}
        </div>

        <p className="mt-3 text-sm">
          {selectedParties.length === 0 ? (
            <span className="font-semibold text-rose-600">
              Aucun parti sélectionné : 0% du programme réalisé.
            </span>
          ) : isFullCoverage ? (
            <span className="font-semibold text-emerald-600">
              ✓ Programme complet : ces {selectedParties.length} partis
              réalisent l&apos;intégralité de votre programme.
            </span>
          ) : (
            <span className="font-semibold text-amber-600">
              {coveragePercent}% du programme réalisé ({coveredPropositions.length}/
              {propositions.length})
            </span>
          )}
        </p>

        {uncoveredPropositions.length > 0 && selectedParties.length > 0 && (
          <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3">
            <p className="text-sm font-semibold text-rose-700">
              {uncoveredPropositions.length} proposition
              {uncoveredPropositions.length > 1 ? "s" : ""} ne serai
              {uncoveredPropositions.length > 1 ? "ent" : "t"} pas
              réalisée{uncoveredPropositions.length > 1 ? "s" : ""} par
              cette coalition :
            </p>
            <ul className="mt-2 flex flex-col gap-1">
              {uncoveredPropositions.map((p) => (
                <li key={p.id} className="text-sm text-rose-900">
                  • {p.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Electoral system simulation for the selected coalition */}
      <section className="mt-10">
        <h2 className="text-lg font-bold text-slate-900">
          Sièges nécessaires selon le mode de scrutin
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Quatre façons de traduire cette coalition en sièges à
          l&apos;Assemblée : sa composition réelle et actuelle, la même
          élection de 2024 mais réallouée selon un autre mode de
          scrutin (proportionnelle intégrale ou mixte à l&apos;allemande),
          ou une Assemblée fictive taillée sur mesure. Sous ces trois
          premiers modes, chaque parti compte pour la totalité de ses
          sièges réels, qu&apos;il soutienne ou non votre programme.
          {partyCompatibility &&
            " Seule l'Assemblée utopique tient compte de votre pourcentage de compatibilité avec chaque parti."}{" "}
          La majorité absolue est fixée à {MAJORITY_THRESHOLD} sièges sur{" "}
          {TOTAL_SEATS}.
        </p>
        <p className="mt-2 rounded-lg bg-slate-100 p-3 text-xs text-slate-600">
          💡 Le mode de scrutin reste très pertinent : la répartition des
          sièges par parti change fortement d&apos;un système à
          l&apos;autre (un parti peut être largement sous-représenté par
          le scrutin actuel et bien mieux loti en proportionnelle, ou
          inversement).
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {ELECTORAL_SYSTEMS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSystem(s.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                system === s.id
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {ELECTORAL_SYSTEMS.find((s) => s.id === system)?.shortDescription}
        </p>

        {/* Suggestion reaching a majority under the current system */}
        {system === "utopique" ? (
          <div className="mt-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              🌈 Mode utopique : la majorité est garantie par construction
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Dans ce mode, votre coalition obtient toujours la majorité,
              puisqu&apos;on invente une Assemblée sur mesure rien que
              pour ça — la personnalisez ci-dessus pour voir comment la
              répartition des sièges (et le programme réalisé) changerait.
            </p>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              🏆 Suggestion pour atteindre la majorité sous ce mode de scrutin
            </h3>
            {virtualMajority ? (
              <>
                <p className="mt-1 text-xs text-slate-500">
                  {virtualMajority.coalition.isFullCoverage
                    ? "Réalise l'intégralité du programme"
                    : `Réalise ${virtualMajority.coalition.coveragePercent}% du programme (${virtualMajority.coalition.coveredCount}/${virtualMajority.coalition.totalCount})`}
                  {" "}et obtient {virtualMajority.seats} sièges, la majorité
                  absolue.
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {virtualMajority.coalition.parties.map((pid) => (
                    <span
                      key={pid}
                      className="rounded-full px-2.5 py-1 text-xs font-medium text-white"
                      style={{ backgroundColor: partyById[pid as PartyId].color }}
                    >
                      {partyById[pid as PartyId].shortName}
                    </span>
                  ))}
                  <button
                    onClick={() => setSelectedParties(virtualMajority.coalition.parties)}
                    className="ml-2 rounded-full border border-slate-900 px-3 py-1 text-xs font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
                  >
                    Utiliser cette coalition ↓
                  </button>
                </div>
              </>
            ) : (
              <p className="mt-1 text-xs text-rose-600">
                Aucune coalition des partis soutenant ce programme
                n&apos;atteint la majorité absolue sous ce mode de scrutin,
                même en réunissant tous les partis pertinents.
              </p>
            )}
          </div>
        )}

        {/* Optional extra support from parliamentary groups not
            tracked as one of the 8 parties: seats only, never program
            coverage — useful to build a broader "coalition de
            soutien" than the program itself requires. */}
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900">
            🤝 Renfort parlementaire (hors partis suivis)
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Ces groupes de l&apos;Assemblée ne sont pas suivis par le
            comparateur (on ne connaît pas leur position sur vos
            propositions) : les ajouter n&apos;augmente jamais le
            pourcentage de programme réalisé, seulement le nombre de
            sièges de votre coalition — utile pour viser une majorité
            plus large que votre seul programme.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {OTHER_ASSEMBLY_GROUPS.map((group) => {
              const isIn = selectedSupportGroups.includes(group.id);
              const seatsHere = system === "actuelle" ? group.seats : null;
              return (
                <label
                  key={group.id}
                  title={group.name}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                    isIn
                      ? "border-transparent text-white"
                      : "border-slate-300 bg-white text-slate-500 hover:border-slate-400"
                  }`}
                  style={isIn ? { backgroundColor: group.color } : undefined}
                >
                  <input
                    type="checkbox"
                    checked={isIn}
                    onChange={() => toggleSupportGroup(group.id)}
                    className="h-3.5 w-3.5"
                  />
                  {group.shortName}
                  {seatsHere !== null ? ` (${seatsHere})` : ""}
                </label>
              );
            })}
          </div>
          {selectedSupportGroups.length > 0 && system !== "actuelle" && (
            <p className="mt-2 text-xs text-amber-600">
              On ne connaît pas le poids électoral 2024 de ces groupes
              pris isolément (la plupart n&apos;avaient pas d&apos;étiquette
              propre à l&apos;époque) : ils n&apos;apportent de sièges que
              sous « Assemblée actuelle ».
            </p>
          )}
        </div>

        {(() => {
          const { seatsByParty: rawSeatsByParty, otherSeats: rawOtherSeats } =
            system === "utopique"
              ? computeUtopianSeats(selectedParties, partyCompatibility)
              : computeSeats(system);

          // Compatibility only ever changes anything in "utopique" mode
          // (already applied above, at the source, by
          // `computeUtopianSeats`): under "actuelle"/"proportionnelle"/
          // "mixte" this shows the real, full seat count of each party —
          // your compatibility with a party doesn't change how many real
          // deputies it actually has.
          const seatsByParty: SeatsByParty = rawSeatsByParty;
          const otherSeats = rawOtherSeats;
          const trackedSeats = selectedParties.reduce(
            (sum, id) => sum + (rawSeatsByParty[id] ?? 0),
            0
          );

          const extraGroups = selectedSupportGroups.map((id) => {
            const group = OTHER_ASSEMBLY_GROUPS.find((g) => g.id === id)!;
            const count = system === "actuelle" ? group.seats : 0;
            return { id: group.id, shortName: group.shortName, color: group.color, count };
          });
          const supportSeats = extraGroups.reduce((sum, g) => sum + g.count, 0);

          const seats = trackedSeats + supportSeats;
          const hasMajority = seats >= MAJORITY_THRESHOLD;
          return (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                Votre coalition
              </p>

              <Hemicycle
                seatsByParty={seatsByParty}
                otherSeats={otherSeats}
                totalSeats={TOTAL_SEATS}
                highlightParties={selectedParties}
                extraGroups={extraGroups}
              />
              <p className="mt-2 text-center text-2xl font-black text-slate-900">
                {seats} <span className="text-base font-medium text-slate-500">sièges</span>
              </p>
              {system === "utopique" && (
                <p className="text-center text-xs text-slate-400">
                  Assemblée fictive : les {TOTAL_SEATS - MAJORITY_THRESHOLD}{" "}
                  autres sièges (en gris) ne sont attribués à aucun parti
                  réel.
                </p>
              )}
              <p
                className={`text-center text-sm font-semibold ${
                  hasMajority ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {hasMajority
                  ? `✓ Majorité absolue atteinte (seuil : ${MAJORITY_THRESHOLD})`
                  : `Il manquerait ${MAJORITY_THRESHOLD - seats} sièges pour la majorité absolue`}
              </p>
            </div>
          );
        })()}
      </section>
    </>
  );
}
