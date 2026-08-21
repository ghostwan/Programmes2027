"use client";

import { useSyncExternalStore } from "react";
import {
  getMarketBasketServerSnapshot,
  getMarketBasketSnapshot,
  subscribeMarketBasket,
  toggleMarketBasketItem,
} from "@/lib/storage";

/**
 * Small "add to market basket" toggle, usable inline in the comparison
 * tables and on proposition detail pages. Purely client-side
 * (localStorage), no server round-trip.
 */
export function MarketBasketButton({
  propositionId,
  compact = false,
}: {
  propositionId: string;
  compact?: boolean;
}) {
  const raw = useSyncExternalStore(
    subscribeMarketBasket,
    getMarketBasketSnapshot,
    getMarketBasketServerSnapshot
  );
  const inBasket = (() => {
    try {
      const ids = JSON.parse(raw);
      return Array.isArray(ids) && ids.includes(propositionId);
    } catch {
      return false;
    }
  })();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMarketBasketItem(propositionId);
      }}
      title={
        inBasket
          ? "Retirer du marché des propositions"
          : "Ajouter au marché des propositions"
      }
      aria-pressed={inBasket}
      className={
        compact
          ? `inline-flex h-6 w-6 items-center justify-center rounded-full text-sm transition ${
              inBasket
                ? "bg-slate-900 text-white"
                : "text-slate-300 hover:bg-slate-100 hover:text-slate-600"
            }`
          : `inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
              inBasket
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 text-slate-700 hover:bg-slate-100"
            }`
      }
    >
      {inBasket ? "✓ Au marché" : "🛒 Ajouter"}
    </button>
  );
}
