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
          ? `inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 transition ${
              inBasket
                ? "border-slate-900 bg-slate-900"
                : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50"
            }`
          : `inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
              inBasket
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 text-slate-700 hover:bg-slate-100"
            }`
      }
    >
      {compact ? (
        inBasket && (
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8.5 L6.5 12 L13 4.5" />
          </svg>
        )
      ) : inBasket ? (
        "✓ Au marché"
      ) : (
        "🛒 Ajouter"
      )}
    </button>
  );
}
