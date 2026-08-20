import Link from "next/link";
import { themes } from "@/lib/data/themes";
import { propositions } from "@/lib/data/propositions";

export default function ThemesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Les thématiques</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Explorez chaque thématique pour voir, proposition par proposition,
        quels partis soutiennent quoi — et ce qui les rassemble parfois.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {themes.map((theme) => {
          const count = propositions.filter((p) => p.themeId === theme.id).length;
          return (
            <Link
              key={theme.id}
              href={`/themes/${theme.id}`}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="text-3xl">{theme.icon}</div>
              <div>
                <h2 className="font-semibold text-slate-900">{theme.name}</h2>
                <p className="mt-1 text-sm text-slate-600">{theme.description}</p>
                <p className="mt-2 text-xs font-medium text-slate-400">
                  {count} propositions comparées
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
