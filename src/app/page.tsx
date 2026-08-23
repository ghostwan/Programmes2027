import Link from "next/link";
import { themes } from "@/lib/data/themes";
import { parties } from "@/lib/data/parties";
import { propositions } from "@/lib/data/propositions";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 px-4 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Trouvez le parti qui vous ressemble vraiment
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Comparez les propositions des principaux partis français pour 2027,
            jugez-les à l&apos;aveugle sans savoir qui les porte, et découvrez
            comment des idées similaires ont fonctionné ailleurs dans le monde.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/jeu"
              className="w-full rounded-full bg-white px-8 py-3 text-center font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100 sm:w-auto"
            >
              🎮 Jouer maintenant
            </Link>
            <Link
              href="/themes"
              className="w-full rounded-full border border-white/30 px-8 py-3 text-center font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              📊 Explorer les thématiques
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            {propositions.length} propositions · {themes.length} thématiques ·{" "}
            {parties.length} partis analysés
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900">Comment ça marche</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-3xl">🃏</div>
            <h3 className="mt-3 font-semibold text-slate-900">
              1. Swipez à l&apos;aveugle
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Des propositions mélangées, sans savoir quel parti les porte.
              Pour ou contre : à vous de juger sur le fond.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-3xl">🎯</div>
            <h3 className="mt-3 font-semibold text-slate-900">
              2. Découvrez votre résultat
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Notre algorithme calcule le parti le plus proche de vos réponses
              et vous donne un détail par thématique.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-3xl">🌍</div>
            <h3 className="mt-3 font-semibold text-slate-900">
              3. Prenez du recul
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Pour chaque proposition, voyez si une mesure comparable existe
              déjà ailleurs, et ce que son évaluation en dit.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Les thématiques</h2>
          <Link href="/themes" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Tout voir →
          </Link>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {themes.map((theme) => (
            <Link
              key={theme.id}
              href={`/themes/${theme.id}`}
              prefetch={false}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="text-2xl">{theme.icon}</div>
              <div className="mt-2 font-semibold text-slate-900">{theme.name}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
