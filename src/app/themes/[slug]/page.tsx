import Link from "next/link";
import { notFound } from "next/navigation";
import { themes } from "@/lib/data/themes";
import { propositions } from "@/lib/data/propositions";
import { ThemeComparisonTable } from "@/components/ThemeComparisonTable";

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

      <ThemeComparisonTable themeProps={themeProps} />

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
