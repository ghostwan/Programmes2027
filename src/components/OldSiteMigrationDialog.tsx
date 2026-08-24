"use client";

import { useEffect, useState } from "react";
import {
  ANSWERS_STORAGE_KEY,
  GAME_STATE_STORAGE_KEY,
  MARKET_BASKET_STORAGE_KEY,
  hasFinishedAnswers,
  hasUnfinishedGame,
} from "@/lib/storage";

/**
 * The old address the site used to live at, before it moved to
 * https://2027.politique.workers.dev (see CHANGELOG.md). localStorage is
 * scoped per-origin, so a visitor's saved quiz answers / market basket
 * from that address are invisible here — the only way to recover them is
 * to load a tiny page actually served from that origin (see
 * ../../migration-bridge) in a hidden iframe and have it hand the data
 * back to us via postMessage.
 */
const BRIDGE_ORIGIN = "https://programmes2027.ghostwan.workers.dev";

/** Set once we've checked (regardless of outcome) so we never re-check
 * on every single page load. */
const MIGRATION_CHECKED_KEY = "programmes2027:old-site-migration-checked";

const MIGRATABLE_KEYS = [
  ANSWERS_STORAGE_KEY,
  GAME_STATE_STORAGE_KEY,
  MARKET_BASKET_STORAGE_KEY,
];

type BridgeMessage = {
  source?: string;
  data?: Record<string, string>;
};

function hasMeaningfulContent(data: Record<string, string>): boolean {
  return MIGRATABLE_KEYS.some((key) => {
    const value = data[key];
    if (!value) return false;
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.length > 0;
      if (parsed && typeof parsed === "object") {
        return Object.keys(parsed).length > 0;
      }
      return Boolean(parsed);
    } catch {
      return value.length > 0;
    }
  });
}

/**
 * On first load, silently checks whether the visitor has leftover
 * progress saved on the old address of the site and, if so, offers to
 * bring it over here (or to just start fresh). Renders nothing until (if
 * ever) that data is found.
 */
export function OldSiteMigrationDialog() {
  const [foundData, setFoundData] = useState<Record<string, string> | null>(
    null
  );

  useEffect(() => {
    if (window.localStorage.getItem(MIGRATION_CHECKED_KEY) === "1") return;

    let settled = false;
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = `${BRIDGE_ORIGIN}/migrate?origin=${encodeURIComponent(
      window.location.origin
    )}`;

    const timeoutId = window.setTimeout(() => finish(null), 4000);

    function finish(data: Record<string, string> | null) {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      window.removeEventListener("message", handleMessage);
      iframe.remove();

      if (data && hasMeaningfulContent(data)) {
        setFoundData(data);
      } else {
        window.localStorage.setItem(MIGRATION_CHECKED_KEY, "1");
      }
    }

    function handleMessage(event: MessageEvent<BridgeMessage>) {
      if (event.origin !== BRIDGE_ORIGIN) return;
      if (event.data?.source !== "programmes2027-migration-bridge") return;
      finish(event.data.data ?? null);
    }

    window.addEventListener("message", handleMessage);
    document.body.appendChild(iframe);

    return () => {
      settled = true;
      window.clearTimeout(timeoutId);
      window.removeEventListener("message", handleMessage);
      iframe.remove();
    };
  }, []);

  if (!foundData) return null;

  const hasLocalProgress = hasFinishedAnswers() || hasUnfinishedGame();

  function handleImport() {
    if (!foundData) return;
    for (const key of MIGRATABLE_KEYS) {
      const value = foundData[key];
      if (value) window.localStorage.setItem(key, value);
    }
    window.localStorage.setItem(MIGRATION_CHECKED_KEY, "1");
    window.location.reload();
  }

  function handleSkip() {
    window.localStorage.setItem(MIGRATION_CHECKED_KEY, "1");
    setFoundData(null);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xl">
        <div className="text-4xl">📦</div>
        <h2 className="mt-3 text-lg font-bold text-slate-900">
          Progression trouvée sur l&apos;ancienne adresse
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Le site a changé d&apos;adresse. Nous avons retrouvé une
          progression (réponses au jeu et/ou marché des propositions)
          enregistrée sur l&apos;ancien site. Voulez-vous la récupérer ?
        </p>
        {hasLocalProgress && (
          <p className="mt-2 rounded-lg bg-amber-50 p-2 text-xs text-amber-800">
            Attention : cela remplacera la progression déjà présente sur
            cet appareil pour cette adresse.
          </p>
        )}
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            onClick={handleImport}
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Récupérer mes données
          </button>
          <button
            onClick={handleSkip}
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Repartir de zéro
          </button>
        </div>
      </div>
    </div>
  );
}
