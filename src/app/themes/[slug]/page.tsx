import Link from "next/link";
import { notFound } from "next/navigation";
import { themes } from "@/lib/data/themes";
import { propositions } from "@/lib/data/propositions";
import { parties, partyById } from "@/lib/data/parties";
import { PartyBadge } from "@/components/PartyBadge";
import { getCountryFlags } from "@/lib/countryFlags";
import { buildCorrectionIssueUrl } from "@/lib/github";

export function generateStaticParams() {
  return themes.map((t) => ({ slug: t.id }));
}

export default async function ThemeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const theme = themes.find((t) => t.id === slug);
  if (!theme) notFound();

  const themeProps = propositions.filter((p) => p.themeId === theme.id);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <Link href="/themes" className="text-sm text-slate-500 hover:text-slate-800">
        ← Toutes les thématiques
      </Link>
      <div className="mt-3 flex items-center gap-3">
        <span className="text-4xl">{theme.icon}</span>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{theme.name}</h1>
          <p className="text-slate-600">{theme.description}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-2">
        {parties.map((p) => (
          <PartyBadge key={p.id} party={p} />
        ))}
      </div>

      {/* Desktop comparator table */}
      <div className="mt-8 hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm lg:block">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left">
              <th className="p-3 font-semibold text-slate-700">Proposition</th>
              {parties.map((p) => (
                <th key={p.id} className="p-3 text-center font-semibold text-slate-700">
                  {p.shortName}
                </th>
              ))}
              <th className="p-3 text-center font-semibold text-slate-700" title="Pays où une mesure comparable a déjà été mise en œuvre">
                Déjà mis en œuvre
              </th>
              <th className="p-3 text-center font-semibold text-slate-700">
                <span className="sr-only">Signaler une correction</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {themeProps.map((prop) => {
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
      </div>

      {/* Mobile card list */}
      <div className="mt-8 flex flex-col gap-4 lg:hidden">
        {themeProps.map((prop) => {
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
      </div>

      <p className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-900">
        ⚠️ Les programmes des partis pour 2027 ne sont pas tous disponibles
        ou finalisés à ce stade de la campagne. Les propositions affichées
        ici reflètent l&apos;état des sources officielles actuellement
        publiées et accessibles, pas l&apos;intégralité de chaque programme.
        Cette base de données sera mise à jour progressivement au fil de la
        campagne, à mesure que de nouveaux documents seront publiés par les
        partis.
      </p>
    </main>
  );
}
