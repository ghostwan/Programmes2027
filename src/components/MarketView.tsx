"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { propositionById } from "@/lib/data/propositions";
import { partyById } from "@/lib/data/parties";
import { themeById } from "@/lib/data/themes";
import { Proposition } from "@/lib/types";
import {
  getMarketBasketServerSnapshot,
  getMarketBasketSnapshot,
  subscribeMarketBasket,
  removeFromMarketBasket,
  clearMarketBasket,
} from "@/lib/storage";
import { CoalitionExplorer } from "@/components/CoalitionExplorer";

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

// Theme groups with more items than this are collapsed by default so a
// large basket (many propositions added across many themes) stays
// readable — the user can still expand any group, or all of them at
// once, with the "Tout déplier" control.
const COLLAPSE_THRESHOLD = 4;

export function MarketView() {
  const basketIds = useBasketIds();
  const basket: Proposition[] = basketIds
    .map((id) => propositionById[id])
    .filter((p): p is Proposition => Boolean(p));

  const byTheme = useMemo(() => {
    const map = new Map<string, Proposition[]>();
    for (const p of basket) {
      const list = map.get(p.themeId) ?? [];
      list.push(p);
      map.set(p.themeId, list);
    }
    return map;
  }, [basket]);

  // Explicit user overrides of a theme group's collapsed/expanded state.
  // When a theme id has no entry here, its openness falls back to the
  // default (open if it has few items, collapsed if it has many).
  const [expandedOverrides, setExpandedOverrides] = useState<
    Record<string, boolean>
  >({});

  function isThemeExpanded(themeId: string, itemCount: number): boolean {
    return expandedOverrides[themeId] ?? itemCount <= COLLAPSE_THRESHOLD;
  }

  function toggleTheme(themeId: string, itemCount: number) {
    setExpandedOverrides((prev) => ({
      ...prev,
      [themeId]: !isThemeExpanded(themeId, itemCount),
    }));
  }

  function expandAll() {
    setExpandedOverrides(
      Object.fromEntries(Array.from(byTheme.keys()).map((id) => [id, true]))
    );
  }

  function collapseAll() {
    setExpandedOverrides(
      Object.fromEntries(Array.from(byTheme.keys()).map((id) => [id, false]))
    );
  }

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

      <CoalitionExplorer propositions={basket} />

      {/* Basket content, grouped by theme, shown at the end of the page so
          the coalition analysis comes first. Groups collapse automatically
          once the basket grows large, to keep the list readable. */}
      <section className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Votre programme ({basket.length})
            </h2>
            <p className="text-xs text-slate-500">
              Regroupé par thématique · cliquez sur une thématique pour la
              déplier ou la replier.
            </p>
          </div>
          <div className="flex shrink-0 gap-3 text-xs font-semibold">
            {byTheme.size > 1 && (
              <>
                <button
                  onClick={expandAll}
                  className="text-slate-500 underline underline-offset-2 hover:text-slate-800"
                >
                  Tout déplier
                </button>
                <button
                  onClick={collapseAll}
                  className="text-slate-500 underline underline-offset-2 hover:text-slate-800"
                >
                  Tout replier
                </button>
              </>
            )}
            <button
              onClick={clearMarketBasket}
              className="text-slate-400 underline underline-offset-2 hover:text-rose-600"
            >
              Vider le marché
            </button>
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-3">
          {Array.from(byTheme.entries()).map(([themeId, props]) => {
            const theme = themeById[themeId as keyof typeof themeById];
            const expanded = isThemeExpanded(themeId, props.length);
            return (
              <div
                key={themeId}
                className="rounded-xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleTheme(themeId, props.length)}
                  className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <span>{theme.icon}</span> {theme.name}
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                      {props.length}
                    </span>
                  </span>
                  <span className="shrink-0 text-slate-400">
                    {expanded ? "▲" : "▼"}
                  </span>
                </button>
                {expanded && (
                  <div className="flex flex-col gap-2 border-t border-slate-100 p-3">
                    {props.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3"
                      >
                        <div>
                          <Link
                            href={`/proposition/${p.id}`}
                            prefetch={false}
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
                )}
              </div>
            );
          })}
        </div>
      </section>

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
