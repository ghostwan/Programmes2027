"use client";

import { useState } from "react";
import Link from "next/link";
import { Proposition, PartyId } from "@/lib/types";
import { parties, partyById } from "@/lib/data/parties";
import { getCountryFlags } from "@/lib/countryFlags";
import { buildCorrectionIssueUrl } from "@/lib/github";
import { getAssessmentStyle } from "@/lib/assessmentStyles";
import { MarketBasketButton } from "@/components/MarketBasketButton";

export function ThemeComparisonTable({
  themeProps,
}: {
  themeProps: Proposition[];
}) {
  const [hideSingleParty, setHideSingleParty] = useState(false);
  const [hiddenParties, setHiddenParties] = useState<Set<PartyId>>(new Set());

  function toggleParty(id: PartyId) {
    setHiddenParties((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const visibleParties = parties.filter((p) => !hiddenParties.has(p.id));

  const visibleProps = hideSingleParty
    ? themeProps.filter((p) => p.supportingParties.length >= 2)
    : themeProps;
  const hiddenCount = themeProps.length - visibleProps.length;

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {parties.map((p) => {
            const isHidden = hiddenParties.has(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => toggleParty(p.id)}
                title={
                  isHidden
                    ? `Afficher la colonne ${p.shortName}`
                    : `Masquer la colonne ${p.shortName}`
                }
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
                  isHidden
                    ? "border-slate-100 bg-slate-50 text-slate-300"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: isHidden ? "#CBD5E1" : p.color }}
                />
                <span className={isHidden ? "line-through" : ""}>{p.shortName}</span>
              </button>
            );
          })}
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 select-none">
          <input
            type="checkbox"
            checked={hideSingleParty}
            onChange={(e) => setHideSingleParty(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
          />
          Masquer les mesures soutenues par un seul parti
          {hideSingleParty && hiddenCount > 0 && (
            <span className="text-xs text-slate-400">
              ({hiddenCount} masquée{hiddenCount > 1 ? "s" : ""})
            </span>
          )}
        </label>
      </div>
      {hiddenParties.size > 0 && (
        <p className="mt-2 text-xs text-slate-400">
          Cliquez à nouveau sur un parti pour réafficher sa colonne.
        </p>
      )}


      {/* Desktop comparator table */}
      <div className="mt-4 hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm lg:block">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left">
              <th className="p-3 font-semibold text-slate-700">Proposition</th>
              {visibleParties.map((p) => (
                <th key={p.id} className="p-3 text-center font-semibold text-slate-700">
                  {p.shortName}
                </th>
              ))}
              <th
                className="p-3 text-center font-semibold text-slate-700"
                title="Pays où une mesure comparable a déjà été mise en œuvre"
              >
                Déjà mis en œuvre
              </th>
              <th className="p-3 text-center font-semibold text-slate-700">
                <span className="sr-only">Signaler une correction</span>
              </th>
              <th className="p-3 text-center font-semibold text-slate-700">
                <span className="sr-only">Ajouter au marché</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleProps.map((prop) => {
              const flags = getCountryFlags(prop.internationalExample?.country);
              const style = getAssessmentStyle(prop.internationalExample);
              return (
                <tr key={prop.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="p-3">
                    <Link href={`/proposition/${prop.id}`} className="font-medium text-slate-900 hover:underline">
                      {prop.title}
                    </Link>
                  </td>
                  {visibleParties.map((p) => (
                    <td key={p.id} className="p-3 text-center">
                      {prop.supportingParties.includes(p.id) ? (
                        <span
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: p.color }}
                          title={p.name}
                        >
                          ✓
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  ))}
                  <td className="p-3 text-center text-base">
                    {flags.length > 0 ? (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full ${style.pillBg} px-2 py-0.5`}
                        title={`${prop.internationalExample?.country} — ${style.label}`}
                      >
                        {flags.join(" ")}
                      </span>
                    ) : (
                      <span className="text-slate-300">—</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <a
                      href={buildCorrectionIssueUrl(prop)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Signaler qu'un parti soutient (ou ne soutient plus) cette proposition"
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-300 hover:bg-slate-100 hover:text-slate-600"
                    >
                      ✏️
                    </a>
                  </td>
                  <td className="p-3 text-center">
                    <MarketBasketButton propositionId={prop.id} compact />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {visibleProps.length === 0 && (
          <p className="p-6 text-center text-sm text-slate-500">
            Aucune proposition à afficher avec ce filtre.
          </p>
        )}
      </div>

      {/* Mobile card list */}
      <div className="mt-4 flex flex-col gap-4 lg:hidden">
        {visibleProps.map((prop) => {
          const flags = getCountryFlags(prop.internationalExample?.country);
          const style = getAssessmentStyle(prop.internationalExample);
          return (
            <div
              key={prop.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <Link
                  href={`/proposition/${prop.id}`}
                  className="font-semibold text-slate-900 hover:underline"
                >
                  {prop.title}
                </Link>
                <MarketBasketButton propositionId={prop.id} compact />
              </div>
              <Link href={`/proposition/${prop.id}`}>
                <p className="mt-1 text-sm text-slate-600">{prop.description}</p>
              </Link>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {prop.supportingParties
                  .filter((id) => !hiddenParties.has(id))
                  .map((id) => {
                  const party = partyById[id];
                  return (
                    <span
                      key={id}
                      className="rounded-full px-2.5 py-1 text-xs font-medium text-white"
                      style={{ backgroundColor: party.color }}
                    >
                      {party.shortName}
                    </span>
                  );
                })}
                {flags.length > 0 && (
                  <span
                    className={`ml-1 inline-flex items-center gap-1 rounded-full ${style.pillBg} px-2 py-0.5 text-sm`}
                    title={`Déjà mis en œuvre : ${prop.internationalExample?.country} — ${style.label}`}
                  >
                    {flags.join(" ")}
                  </span>
                )}
              </div>
            </div>
          );
        })}
        {visibleProps.length === 0 && (
          <p className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
            Aucune proposition à afficher avec ce filtre.
          </p>
        )}
      </div>
    </>
  );
}
