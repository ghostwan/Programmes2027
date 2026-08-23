import Link from "next/link";
import { notFound } from "next/navigation";
import { parties } from "@/lib/data/parties";
import { propositions } from "@/lib/data/propositions";
import { themeById } from "@/lib/data/themes";

export function generateStaticParams() {
  return parties.map((p) => ({ id: p.id }));
}

export default async function PartyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const party = parties.find((p) => p.id === id);
  if (!party) notFound();

  const supported = propositions.filter((p) =>
    p.supportingParties.includes(party.id)
  );

  const byTheme = supported.reduce<Record<string, typeof supported>>((acc, p) => {
    acc[p.themeId] = acc[p.themeId] ? [...acc[p.themeId], p] : [p];
    return acc;
  }, {});

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
      <Link href="/partis" className="text-sm text-slate-500 hover:text-slate-800">
        ← Tous les partis
      </Link>

      <div className="mt-3 flex items-center gap-3">
        <span
          className="h-6 w-6 flex-shrink-0 rounded-full"
          style={{ backgroundColor: party.color }}
        />
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {party.name}
          </h1>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-400">
            {party.family}
          </p>
        </div>
      </div>

      <p className="mt-4 text-slate-600">{party.description}</p>

      {party.sources && party.sources.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-slate-500">Sources du programme :</span>
          {party.sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            >
              🔗 {source.label}
            </a>
          ))}
        </div>
      )}

      <section className="mt-8 space-y-6">
        {Object.entries(byTheme).map(([themeId, props]) => {
          const theme = themeById[themeId as keyof typeof themeById];
          return (
            <div key={themeId}>
              <h2 className="flex items-center gap-2 font-semibold text-slate-900">
                <span>{theme.icon}</span> {theme.name}
              </h2>
              <ul className="mt-2 space-y-1.5">
                {props.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/proposition/${p.id}`}
                      prefetch={false}
                      className="text-sm text-slate-600 hover:text-slate-900 hover:underline"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>
    </main>
  );
}
