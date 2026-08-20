"use client";

import { useState } from "react";
import Link from "next/link";
import { Proposition } from "@/lib/types";
import { parties, partyById } from "@/lib/data/parties";
import { getCountryFlags } from "@/lib/countryFlags";
import { buildCorrectionIssueUrl } from "@/lib/github";

export function ThemeComparisonTable({
  themeProps,
}: {
  themeProps: Proposition[];
}) {
  const [hideSingleParty, setHideSingleParty] = useState(false);

  const visibleProps = hideSingleParty
    ? themeProps.filter((p) => p.supportingParties.length >= 2)
    : themeProps;
  const hiddenCount = themeProps.length - visibleProps.length;

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {parties.map((p) => (
            <span
              key={p.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              {p.shortName}
            </span>
          ))}
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

      {/* Desktop comparator table */}
      <div className="mt-4 hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm lg:block">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left">
              <th className="p-3 font-semibold text-slate-700">Proposition</th>
              {parties.map((p) => (
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
            </tr>
          </thead>
          <tbody>
            {visibleProps.map((prop) => {
              const flags = getCountryFlags(prop.internationalExample?.country);
              return (
                <tr key={prop.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="p-3">
                    <Link href={`/proposition/${prop.id}`} className="font-medium text-slate-900 hover:underline">
                      {prop.title}
                    </Link>
                  </td>
                  {parties.map((p) => (
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
                  <td className="p-3 text-center text-base" title={prop.internationalExample?.country}>
                    {flags.length > 0 ? flags.join(" ") : <span className="text-slate-300">—</span>}
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
          return (
            <Link
              key={prop.id}
              href={`/proposition/${prop.id}`}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <h3 className="font-semibold text-slate-900">{prop.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{prop.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {prop.supportingParties.map((id) => {
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
                    className="ml-1 text-sm"
                    title={`Déjà mis en œuvre : ${prop.internationalExample?.country}`}
                  >
                    {flags.join(" ")}
                  </span>
                )}
              </div>
            </Link>
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
