import Link from "next/link";
import { notFound } from "next/navigation";
import { propositions } from "@/lib/data/propositions";
import { themeById } from "@/lib/data/themes";
import { partyById } from "@/lib/data/parties";

export function generateStaticParams() {
  return propositions.map((p) => ({ id: p.id }));
}

export default async function PropositionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const proposition = propositions.find((p) => p.id === id);
  if (!proposition) notFound();

  const theme = themeById[proposition.themeId];

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
      <Link
        href={`/themes/${theme.id}`}
        className="text-sm text-slate-500 hover:text-slate-800"
      >
        ← {theme.icon} {theme.name}
      </Link>

      <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
        {proposition.title}
      </h1>
      <p className="mt-3 text-slate-600">{proposition.description}</p>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Partis qui soutiennent cette proposition
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {proposition.supportingParties.map((pid) => {
            const party = partyById[pid];
            return (
              <Link
                key={pid}
                href={`/partis/${pid}`}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium shadow-sm transition hover:shadow-md"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: party.color }}
                />
                {party.name}
              </Link>
            );
          })}
        </div>
      </section>

      {proposition.internationalExample ? (
        <section className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-800">
            🌍 Ailleurs dans le monde
          </h2>
          <p className="mt-2 font-semibold text-emerald-900">
            {proposition.internationalExample.country} —{" "}
            {proposition.internationalExample.when}
          </p>
          <p className="mt-2 text-sm text-emerald-900">
            {proposition.internationalExample.summary}
          </p>
          <div className="mt-4 rounded-xl bg-white/60 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Évaluation des effets
            </h3>
            <p className="mt-1.5 text-sm text-slate-700">
              {proposition.internationalExample.evaluation}
            </p>
          </div>
        </section>
      ) : (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
          Aucun exemple international directement comparable n&apos;a été
          identifié pour cette proposition, ou elle est trop spécifique au
          contexte français pour une comparaison pertinente.
        </section>
      )}

      <div className="mt-10">
        <Link
          href="/jeu"
          className="inline-block rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          🎮 Tester mes affinités dans le jeu
        </Link>
      </div>
    </main>
  );
}
