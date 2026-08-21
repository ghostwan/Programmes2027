"use client";

import { useMemo, useState } from "react";
import { partyById } from "@/lib/data/parties";
import { PartyId, Proposition } from "@/lib/types";
import {
  ELECTORAL_SYSTEMS,
  ElectoralSystemId,
  MAJORITY_THRESHOLD,
  TOTAL_SEATS,
  computeSeats,
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
 */
export function CoalitionExplorer({ propositions }: { propositions: Proposition[] }) {
  const [selectedCoalitionIndex, setSelectedCoalitionIndex] = useState(0);
  const [system, setSystem] = useState<ElectoralSystemId>("majoritaire");

  const coalitions = useMemo(() => findCoalitions(propositions), [propositions]);
  const selectedCoalition = coalitions[selectedCoalitionIndex] ?? coalitions[0];
  const virtualMajority = useMemo(
    () => findVirtualMajority(coalitions, system),
    [coalitions, system]
  );

  if (propositions.length === 0) return null;

  return (
    <>
      {/* Coalitions */}
      <section className="mt-10">
        <h2 className="text-lg font-bold text-slate-900">Coalitions possibles</h2>
        <p className="mt-1 text-xs text-slate-500">
          Une coalition est considérée comme réalisant ce programme si, pour
          chaque proposition, au moins un parti de la coalition la soutient —
          chaque parti apportant ses propres mesures à l&apos;accord, comme
          dans un accord de coalition réel.
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
                onClick={() => setSelectedCoalitionIndex(i)}
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
            Simulation basée sur les résultats réels des législatives 2024
            (référence historique, pas une prédiction pour 2027). La
            majorité absolue est fixée à {MAJORITY_THRESHOLD} sièges sur{" "}
            {TOTAL_SEATS}.
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
                  <button
                    onClick={() => {
                      const idx = coalitions.indexOf(virtualMajority.coalition);
                      if (idx >= 0) setSelectedCoalitionIndex(idx);
                    }}
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

          {(() => {
            const { seatsByParty, otherSeats } = computeSeats(system);
            const seats = coalitionSeats(selectedCoalition.parties, system);
            const hasMajority = seats >= MAJORITY_THRESHOLD;
            return (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Coalition actuellement sélectionnée
                </p>
                <Hemicycle
                  seatsByParty={seatsByParty}
                  otherSeats={otherSeats}
                  totalSeats={TOTAL_SEATS}
                  highlightParties={selectedCoalition.parties}
                />
                <p className="mt-2 text-center text-2xl font-black text-slate-900">
                  {seats} <span className="text-base font-medium text-slate-500">sièges</span>
                </p>
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
      )}
    </>
  );
}
