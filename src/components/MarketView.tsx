"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { propositionById } from "@/lib/data/propositions";
import { partyById } from "@/lib/data/parties";
import { themeById } from "@/lib/data/themes";
import { PartyId, Proposition } from "@/lib/types";
import {
  getMarketBasketServerSnapshot,
  getMarketBasketSnapshot,
  subscribeMarketBasket,
  removeFromMarketBasket,
  clearMarketBasket,
} from "@/lib/storage";
import {
  ELECTORAL_SYSTEMS,
  ElectoralSystemId,
  MAJORITY_THRESHOLD,
  TOTAL_SEATS,
  computeSeats,
  findCoalitions,
  coalitionSeats,
} from "@/lib/electoralSystems";
import { Hemicycle } from "@/components/Hemicycle";

function useBasketIds(): string[] {
  const raw = useSyncExternalStore(
    subscribeMarketBasket,
    getMarketBasketSnapshot,
    getMarketBasketServerSnapshot
  );
  return useMemo(() => {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
    } catch {
      return [];
    }
  }, [raw]);
}

export function MarketView() {
  const basketIds = useBasketIds();
  const basket: Proposition[] = basketIds
    .map((id) => propositionById[id])
    .filter((p): p is Proposition => Boolean(p));

  const [selectedCoalitionIndex, setSelectedCoalitionIndex] = useState(0);
  const [system, setSystem] = useState<ElectoralSystemId>("majoritaire");

  const coalitions = useMemo(() => findCoalitions(basket), [basket]);
  const selectedCoalition = coalitions[selectedCoalitionIndex] ?? coalitions[0];

  const byTheme = useMemo(() => {
    const map = new Map<string, Proposition[]>();
    for (const p of basket) {
      const list = map.get(p.themeId) ?? [];
      list.push(p);
      map.set(p.themeId, list);
    }
    return map;
  }, [basket]);

  if (basket.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
        <div className="text-4xl">🛒</div>
        <h1 className="text-xl font-bold text-slate-900">
          Votre marché des propositions est vide
        </h1>
        <p className="text-slate-600">
          Parcourez les thématiques et ajoutez les propositions qui vous
          intéressent à votre marché avec le bouton « 🛒 Ajouter ». Une fois
          votre programme constitué, revenez ici pour découvrir quelles
          coalitions de partis pourraient le mettre en œuvre, et combien de
          sièges il leur faudrait selon le mode de scrutin.
        </p>
        <Link
          href="/themes"
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Parcourir les thématiques
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        Mon marché des propositions
      </h1>
      <p className="mt-2 text-slate-600">
        {basket.length} proposition{basket.length > 1 ? "s" : ""} sélectionnée
        {basket.length > 1 ? "s" : ""}. Voici quelles coalitions de partis
        pourraient réaliser ce programme, et combien de sièges il leur
        faudrait selon le mode de scrutin.
      </p>

      {/* Basket content, grouped by theme */}
      <section className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Votre programme</h2>
          <button
            onClick={clearMarketBasket}
            className="text-xs font-semibold text-slate-400 underline underline-offset-2 hover:text-slate-700"
          >
            Vider le marché
          </button>
        </div>
        <div className="mt-3 flex flex-col gap-4">
          {Array.from(byTheme.entries()).map(([themeId, props]) => {
            const theme = themeById[themeId as keyof typeof themeById];
            return (
              <div key={themeId}>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <span>{theme.icon}</span> {theme.name}
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  {props.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3"
                    >
                      <div>
                        <Link
                          href={`/proposition/${p.id}`}
                          className="text-sm font-medium text-slate-900 hover:underline"
                        >
                          {p.title}
                        </Link>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {p.supportingParties.length === 0 ? (
                            <span className="text-xs text-slate-400">Aucun parti identifié</span>
                          ) : (
                            p.supportingParties.map((pid) => (
                              <span
                                key={pid}
                                className="rounded-full px-2 py-0.5 text-[11px] font-medium text-white"
                                style={{ backgroundColor: partyById[pid].color }}
                              >
                                {partyById[pid].shortName}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromMarketBasket(p.id)}
                        aria-label="Retirer du marché"
                        className="shrink-0 rounded-full px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-rose-600"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Coalitions */}
      <section className="mt-10">
        <h2 className="text-lg font-bold text-slate-900">Coalitions possibles</h2>
        <p className="mt-1 text-xs text-slate-500">
          Une coalition est considérée comme réalisant votre programme si,
          pour chaque proposition sélectionnée, au moins un parti de la
          coalition la soutient — chaque parti apportant ses propres mesures
          à l&apos;accord, comme dans un accord de coalition réel.
        </p>

        {coalitions.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">
            Aucun parti ne soutient l&apos;une des propositions sélectionnées.
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

          {(() => {
            const { seatsByParty, otherSeats } = computeSeats(system);
            const seats = coalitionSeats(selectedCoalition.parties, system);
            const hasMajority = seats >= MAJORITY_THRESHOLD;
            return (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
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

      <div className="mt-10">
        <Link
          href="/themes"
          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          ← Continuer à parcourir les thématiques
        </Link>
      </div>
    </main>
  );
}
