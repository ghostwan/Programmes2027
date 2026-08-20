import Link from "next/link";
import packageJson from "../../package.json";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Programmes2027 — Projet indépendant à but informatif.</p>
        <Link
          href="/changelog"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1 font-mono text-xs font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          v{packageJson.version} · Nouveautés
        </Link>
      </div>
    </footer>
  );
}
