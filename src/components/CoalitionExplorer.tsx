"use client";

import { useMemo, useState } from "react";
import { partyById } from "@/lib/data/parties";
import { PartyId, Proposition } from "@/lib/types";
import {
  ELECTORAL_SYSTEMS,
  ElectoralSystemId,
  MAJORITY_THRESHOLD,
  PartyCompatibility,
  TOTAL_SEATS,
  computeSeats,
  computeUtopianSeats,
  findCoalitions,
  coalitionSeats,
  findVirtualMajority,
} from "@/lib/electoralSystems";
import { Hemicycle } from "@/components/Hemicycle";

/**
 * Given a set of propositions (a "program" — either a manually built
 * market basket, or every proposition a quiz player answered "pour" to),
 * shows which party coalitions could realize it, and how many seats the
 * selected coalition would hold under three electoral systems, including
 * an automatically recomputed "virtual majority" coalition per system.
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
  // `null` means "no manual pick yet" — in that case the hemicycle
  // follows the virtual majority coalition automatically, recomputed for
  // whichever electoral system is selected. Once the user manually
  // clicks a coalition in the list, that choice is kept as-is across
  // electoral system changes (only its seat count is recomputed) —
  // switching modes must never silently discard the coalition the user
  // picked.
  const [manualCoalitionIndex, setManualCoalitionIndex] = useState<number | null>(
    null
  );
  const [system, setSystem] = useState<ElectoralSystemId>("majoritaire");
  // Parties temporarily excluded from the currently selected coalition,
  // to preview which propositions could no longer be realized without
  // them. Reset whenever the selected coalition changes (picking a
  // different coalition, or the virtual majority changing) so exclusions
  // never silently linger on an unrelated coalition.
  const [excludedParties, setExcludedParties] = useState<PartyId[]>([]);

  const coalitions = useMemo(() => findCoalitions(propositions), [propositions]);
  const virtualMajority = useMemo(
    () => findVirtualMajority(coalitions, system, partyCompatibility),
    [coalitions, system, partyCompatibility]
  );
  const virtualMajorityIndex = virtualMajority
    ? coalitions.indexOf(virtualMajority.coalition)
    : -1;
  const selectedCoalitionIndex =
    manualCoalitionIndex ?? (virtualMajorityIndex >= 0 ? virtualMajorityIndex : 0);
  const selectedCoalition = coalitions[selectedCoalitionIndex] ?? coalitions[0];

  // Reset the exclusion preview whenever the selected coalition changes
  // (a different coalition picked, or the virtual majority changing) so
  // exclusions never silently linger on an unrelated coalition. This
  // adjusts state during rendering rather than in an effect, as
  // recommended for "resetting state when a prop/derived value changes"
  // (see https://react.dev/learn/you-might-not-need-an-effect).
  const [prevSelectedCoalitionIndex, setPrevSelectedCoalitionIndex] = useState(
    selectedCoalitionIndex
  );
  if (selectedCoalitionIndex !== prevSelectedCoalitionIndex) {
    setPrevSelectedCoalitionIndex(selectedCoalitionIndex);
    setExcludedParties([]);
  }

  if (propositions.length === 0) return null;

  const remainingParties = selectedCoalition
    ? selectedCoalition.parties.filter((id) => !excludedParties.includes(id))
    : [];
  const uncoveredPropositions = selectedCoalition
    ? propositions.filter(
        (p) => !p.supportingParties.some((id) => remainingParties.includes(id))
      )
    : [];

  return (
    <>
      {/* Coalitions */}
      <section className="mt-10">
        <h2 className="text-lg font-bold text-slate-900">Coalitions possibles</h2>
        <p className="mt-1 text-xs text-slate-500">
          Une coalition est considérée comme réalisant ce programme si, pour
          chaque proposition, au moins un parti de la coalition la soutient —
          chaque parti apportant ses propres mesures à l&apos;accord, comme
          dans un accord de coalition réel. Cliquez sur une coalition
          ci-dessous pour la sélectionner, puis décochez un de ses partis
          plus bas pour simuler son retrait.
        </p>

        {coalitions.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">
            Aucun parti ne soutient l&apos;une de ces propositions.
          </p>
        ) : (
          <div className="mt-3 flex flex-col gap-2">
            {coalitions.slice(0, 8).map((c, i) => (
              <button
                key={c.parties.join(",")}
                onClick={() => setManualCoalitionIndex(i)}
                className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border p-3 text-left shadow-sm transition ${
                  i === selectedCoalitionIndex
                    ? "border-slate-900 bg-slate-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  {c.parties.map((pid) => (
                    <span
                      key={pid}
                      className="rounded-full px-2.5 py-1 text-xs font-medium text-white"
                      style={{ backgroundColor: partyById[pid as PartyId].color }}
                    >
                      {partyById[pid as PartyId].shortName}
                    </span>
                  ))}
                </div>
                <span
                  className={`text-sm font-semibold ${
                    c.isFullCoverage ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {c.isFullCoverage
                    ? "Programme complet"
                    : `${c.coveragePercent}% du programme (${c.coveredCount}/${c.totalCount})`}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Electoral system simulation for the selected coalition */}
      {selectedCoalition && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-slate-900">
            Sièges nécessaires selon le mode de scrutin
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Quatre façons de traduire ce programme en sièges à
            l&apos;Assemblée : les résultats réels des législatives 2024,
            la composition réelle et actuelle de l&apos;Assemblée, ou une
            Assemblée fictive taillée sur mesure pour votre coalition. La
            majorité absolue est fixée à {MAJORITY_THRESHOLD} sièges sur{" "}
            {TOTAL_SEATS}.
            {partyCompatibility &&
              " Les sièges de chaque parti sont pondérés par votre pourcentage de compatibilité avec lui : un parti dont vous ne soutenez qu'une partie du programme ne compte que pour cette part de ses sièges réels."}
          </p>
          <p className="mt-2 rounded-lg bg-slate-100 p-3 text-xs text-slate-600">
            💡 Le mode de scrutin reste très pertinent : la répartition des
            sièges par parti change fortement d&apos;un système à
            l&apos;autre (un parti peut être largement sous-représenté par
            le scrutin majoritaire actuel et bien mieux loti en
            proportionnelle, ou inversement). La coalition minimale capable
            d&apos;obtenir une majorité peut donc différer selon le mode
            choisi — c&apos;est justement ce que la « coalition majoritaire
            virtuelle » ci-dessous recalcule pour vous à chaque changement
            de mode.
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

          {/* Virtual majority coalition for the current system */}
          {system === "utopique" ? (
            <div className="mt-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">
                🌈 Mode utopique : la majorité est garantie par construction
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Dans ce mode, on ne cherche pas la plus petite coalition
                capable d&apos;obtenir la majorité : elle l&apos;obtient
                toujours, puisqu&apos;on invente une Assemblée sur mesure
                rien que pour ça. La coalition affichée ci-dessous est
                celle sélectionnée dans la liste plus haut — décochez un de
                ses partis pour voir ce que ça change.
              </p>
            </div>
          ) : (
            <div className="mt-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">
                🏆 Coalition majoritaire virtuelle pour ce mode de scrutin
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
                    {manualCoalitionIndex !== null && (
                      <button
                        onClick={() => setManualCoalitionIndex(null)}
                        className="ml-2 rounded-full border border-slate-900 px-3 py-1 text-xs font-semibold text-slate-900 hover:bg-slate-900 hover:text-white"
                      >
                        Utiliser cette coalition ↓
                      </button>
                    )}
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

          {(() => {
            const { seatsByParty, otherSeats } =
              system === "utopique"
                ? computeUtopianSeats(remainingParties)
                : computeSeats(system);
            const seats = coalitionSeats(remainingParties, system, partyCompatibility);
            const rawSeats = coalitionSeats(remainingParties, system);
            const hasMajority = seats >= MAJORITY_THRESHOLD;
            return (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {manualCoalitionIndex === null && virtualMajorityIndex >= 0
                    ? "Coalition majoritaire virtuelle"
                    : "Coalition actuellement sélectionnée"}
                </p>

                <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
                  {selectedCoalition.parties.map((pid) => {
                    const isExcluded = excludedParties.includes(pid);
                    return (
                      <label
                        key={pid}
                        className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                          isExcluded
                            ? "border-slate-200 bg-slate-50 text-slate-400 line-through"
                            : "border-transparent text-white"
                        }`}
                        style={isExcluded ? undefined : { backgroundColor: partyById[pid as PartyId].color }}
                      >
                        <input
                          type="checkbox"
                          checked={!isExcluded}
                          onChange={() =>
                            setExcludedParties((prev) =>
                              isExcluded
                                ? prev.filter((id) => id !== pid)
                                : [...prev, pid]
                            )
                          }
                          className="h-3 w-3"
                        />
                        {partyById[pid as PartyId].shortName}
                      </label>
                    );
                  })}
                </div>
                {excludedParties.length > 0 && (
                  <p className="mb-3 text-center text-xs text-slate-500">
                    Décochez un parti pour simuler son retrait de la
                    coalition sélectionnée et voir ce qui ne pourrait plus
                    être réalisé sans lui.
                    {system === "utopique" &&
                      " En mode utopique, le reste des partis obtient de toute façon la majorité (l'Assemblée est reconstruite sur mesure) : c'est la liste des propositions perdues ci-dessous qui montre le vrai impact du retrait."}
                  </p>
                )}

                <Hemicycle
                  seatsByParty={seatsByParty}
                  otherSeats={otherSeats}
                  totalSeats={TOTAL_SEATS}
                  highlightParties={remainingParties}
                />
                <p className="mt-2 text-center text-2xl font-black text-slate-900">
                  {seats} <span className="text-base font-medium text-slate-500">sièges</span>
                </p>
                {partyCompatibility && seats !== rawSeats && (
                  <p className="text-center text-xs text-slate-400">
                    ({rawSeats} sièges réels, pondérés à {seats} selon votre
                    compatibilité avec chaque parti)
                  </p>
                )}
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

                {excludedParties.length > 0 && (
                  <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3">
                    <p className="text-sm font-semibold text-rose-700">
                      {uncoveredPropositions.length === 0
                        ? "Bonne nouvelle : le reste de la coalition suffit à réaliser tout le programme, même sans ce(s) parti(s)."
                        : `Sans ${excludedParties
                            .map((pid) => partyById[pid as PartyId].shortName)
                            .join(", ")}, ${uncoveredPropositions.length} proposition${
                            uncoveredPropositions.length > 1 ? "s" : ""
                          } du programme ne pourrai${
                            uncoveredPropositions.length > 1 ? "ent" : "t"
                          } plus être réalisée${
                            uncoveredPropositions.length > 1 ? "s" : ""
                          } :`}
                    </p>
                    {uncoveredPropositions.length > 0 && (
                      <ul className="mt-2 flex flex-col gap-1">
                        {uncoveredPropositions.map((p) => (
                          <li key={p.id} className="text-sm text-rose-900">
                            • {p.title}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })()}
        </section>
      )}
    </>
  );
}
