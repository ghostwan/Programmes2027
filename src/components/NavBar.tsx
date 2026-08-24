"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/themes", label: "Thématiques" },
  { href: "/jeu", label: "Le jeu" },
  { href: "/marche", label: "Marché" },
  { href: "/partis", label: "Partis" },
];

const SONDAGES_URL = "https://sondoscope.politique.workers.dev/";

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          prefetch={false}
          className="flex items-center gap-2 font-bold text-slate-900"
        >
          <span className="text-xl">🗳️</span>
          <span>Programmes2027</span>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800">
            Bêta
          </span>
        </Link>

        <nav className="hidden gap-1 sm:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={SONDAGES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            Sondages ↗
          </a>
        </nav>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 sm:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-slate-200 px-4 py-2 sm:hidden">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={SONDAGES_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Sondages ↗
          </a>
        </nav>
      )}
    </header>
  );
}
