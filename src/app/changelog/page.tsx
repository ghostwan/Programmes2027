import { getChangelogReleases } from "@/lib/changelog";
import packageJson from "../../../package.json";

export const metadata = {
  title: "Journal des nouveautés — Programmes2027",
  description: "Historique des versions et des nouveautés du site Programmes2027.",
};

const CATEGORY_STYLES: Record<string, { icon: string; className: string }> = {
  "Ajouté": { icon: "✨", className: "bg-emerald-100 text-emerald-800" },
  "Modifié": { icon: "🔧", className: "bg-blue-100 text-blue-800" },
  "Corrigé": { icon: "🐛", className: "bg-amber-100 text-amber-800" },
  "Supprimé": { icon: "🗑️", className: "bg-slate-200 text-slate-700" },
  "Déprécié": { icon: "⚠️", className: "bg-orange-100 text-orange-800" },
  "Sécurité": { icon: "🔒", className: "bg-rose-100 text-rose-800" },
  "Cassant": { icon: "💥", className: "bg-red-100 text-red-800" },
};

export default function ChangelogPage() {
  const releases = getChangelogReleases();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Journal des nouveautés</h1>
      <p className="mt-2 text-slate-600">
        Historique des versions du site. Le numéro de version{" "}
        <span className="font-mono font-semibold">v{packageJson.version}</span>{" "}
        suit le{" "}
        <a
          href="https://semver.org/lang/fr/"
          className="underline underline-offset-2 hover:text-slate-900"
        >
          versionnage sémantique
        </a>{" "}
        (majeur.mineur.correctif).
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {releases.map((release) => (
          <section key={release.version} className="relative border-l-2 border-slate-200 pl-6">
            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white bg-slate-900" />
            <div className="flex flex-wrap items-baseline gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                v{release.version}
              </h2>
              {release.date && (
                <span className="text-sm text-slate-400">{formatDate(release.date)}</span>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-4">
              {release.categories.map((category) => {
                const style = CATEGORY_STYLES[category.name] ?? {
                  icon: "•",
                  className: "bg-slate-100 text-slate-700",
                };
                return (
                  <div key={category.name}>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${style.className}`}
                    >
                      {style.icon} {category.name}
                    </span>
                    <ul className="mt-2 space-y-1.5 pl-1">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="text-sm leading-relaxed text-slate-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
