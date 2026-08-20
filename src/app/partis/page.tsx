import Link from "next/link";
import { parties } from "@/lib/data/parties";
import { propositions } from "@/lib/data/propositions";

export default function PartiesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Les partis</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Le site met volontairement l&apos;accent sur les propositions plutôt
        que sur les candidats. Voici toutefois les formations dont les
        programmes sont comparés.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {parties.map((party) => {
          const count = propositions.filter((p) =>
            p.supportingParties.includes(party.id)
          ).length;
          return (
            <Link
              key={party.id}
              href={`/partis/${party.id}`}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span
                className="mt-1 h-4 w-4 flex-shrink-0 rounded-full"
                style={{ backgroundColor: party.color }}
              />
              <div>
                <h2 className="font-semibold text-slate-900">{party.name}</h2>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {party.family}
                </p>
                <p className="mt-2 text-sm text-slate-600">{party.description}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {count} propositions recensées dans le comparateur
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
