"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { propositions } from "@/lib/data/propositions";
import { partyById } from "@/lib/data/parties";
import { themeById } from "@/lib/data/themes";
import { AnswersMap } from "@/lib/types";
import { computePartyScores, computeThemeStats } from "@/lib/matching";
import { CoalitionExplorer } from "@/components/CoalitionExplorer";
import {
  ANSWERS_STORAGE_KEY,
  GAME_STATE_STORAGE_KEY,
  hasUnfinishedGame,
} from "@/lib/storage";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): string | null {
  return window.localStorage.getItem(ANSWERS_STORAGE_KEY);
}

function getServerSnapshot(): string | null {
  return null;
}

function getGameStateSnapshot(): string | null {
  return window.localStorage.getItem(GAME_STATE_STORAGE_KEY);
}

export function ResultsView() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const gameStateRaw = useSyncExternalStore(
    subscribe,
    getGameStateSnapshot,
    getServerSnapshot
  );
  const answers: AnswersMap = raw ? JSON.parse(raw) : {};
  const unfinishedGame = gameStateRaw !== null && hasUnfinishedGame();
  const [expandedTheme, setExpandedTheme] = useState<string | null>(null);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const totalAnswered = Object.values(answers).filter(
    (a) => a === "pour" || a === "contre"
  ).length;

  if (totalAnswered === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
        <div className="text-4xl">🤔</div>
        <h1 className="text-xl font-bold text-slate-900">
          Pas encore de résultats
        </h1>
        <p className="text-slate-600">
          Vous devez d&apos;abord répondre à quelques propositions dans le jeu.
        </p>
        <Link
          href="/jeu"
          prefetch={false}
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Aller au jeu
        </Link>
      </div>
    );
  }

  const partyScores = computePartyScores(answers, propositions).filter(
    (s) => s.answeredRelevant > 0
  );
  const themeStats = computeThemeStats(answers, propositions);
  const pourPropositions = propositions.filter((p) => answers[p.id] === "pour");
  // If the user answered "contre" to everything (no "pour" at all), every
  // party's match percent is trivially 0% — not a meaningful "closest
  // party" tie, so we show nothing instead of an uninformative "8 partis
  // ex æquo (0%)".
  const topPercent =
    pourPropositions.length === 0 ? null : partyScores[0]?.matchPercent ?? null;
  const topParties =
    topPercent === null
      ? []
      : partyScores.filter((s) => s.matchPercent === topPercent);
  const partyCompatibility = Object.fromEntries(
    partyScores.map((s) => [s.partyId, s.matchPercent])
  );

  async function shareResults() {
    const shareText =
      topParties.length === 1
        ? `Je suis ${topPercent}% compatible avec ${
            partyById[topParties[0].partyId].name
          } sur Programmes2027, le comparateur des programmes politiques pour 2027. Fais le test toi aussi :`
        : topParties.length > 1
          ? `Je suis ${topPercent}% compatible avec ${topParties.length} partis ex æquo sur Programmes2027, le comparateur des programmes politiques pour 2027. Fais le test toi aussi :`
          : `J'ai fait le comparateur de programmes politiques Programmes2027 pour 2027. Fais le test toi aussi :`;
    const shareUrl = typeof window !== "undefined" ? window.location.origin : "";
    const nav: Navigator | undefined =
      typeof navigator !== "undefined" ? navigator : undefined;

    if (nav?.share) {
      try {
        await nav.share({
          title: "Programmes2027",
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled the native share sheet or it failed silently — no
        // fallback needed in that case.
      }
      return;
    }

    try {
      await nav?.clipboard.writeText(`${shareText} ${shareUrl}`);
      setShareFeedback("Lien copié dans le presse-papiers !");
    } catch {
      setShareFeedback(null);
    }
    setTimeout(() => setShareFeedback(null), 3000);
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
      {unfinishedGame && (
        <Link
          href="/jeu"
          prefetch={false}
          className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-slate-900 bg-slate-900 px-5 py-4 text-white shadow-sm transition hover:bg-slate-800"
        >
          <span className="text-sm font-semibold">
            Ces résultats sont provisoires : il reste des propositions
            auxquelles vous n&apos;avez pas encore répondu.
          </span>
          <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900">
            ▶️ Continuer le quiz
          </span>
        </Link>
      )}

      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        Vos résultats
      </h1>
      <p className="mt-2 text-slate-600">
        Basé sur {totalAnswered} propositions auxquelles vous avez répondu.
      </p>

      {topParties.length > 0 && (
        <section
          className="mt-6 rounded-2xl border-2 p-6 shadow-sm"
          style={{
            borderColor:
              topParties.length === 1 ? partyById[topParties[0].partyId].color : "#0f172a",
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {topParties.length === 1
              ? "Le parti le plus proche de vos réponses"
              : `${topParties.length} partis ex æquo, les plus proches de vos réponses`}
          </p>
          <p className="mt-1 text-3xl font-black text-slate-900">
            {topPercent}%{" "}
            <span className="text-base font-medium text-slate-500">
              de compatibilité
            </span>
          </p>
          <div className="mt-3 flex flex-col gap-3">
            {topParties.map((s) => (
              <div key={s.partyId} className="flex flex-wrap items-center gap-3">
                <span
                  className="h-5 w-5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: partyById[s.partyId].color }}
                />
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  {partyById[s.partyId].name}
                </h2>
                <span className="text-xs text-slate-500">
                  ({s.answeredRelevant} proposition
                  {s.answeredRelevant > 1 ? "s" : ""} commune
                  {s.answeredRelevant > 1 ? "s" : ""})
                </span>
                <Link
                  href={`/partis/${s.partyId}`}
                  prefetch={false}
                  className="text-sm font-medium text-slate-700 underline underline-offset-2"
                >
                  Voir le programme →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-lg font-bold text-slate-900">Classement complet</h2>
        <div className="mt-3 flex flex-col gap-2">
          {partyScores.map((s) => {
            const party = partyById[s.partyId];
            return (
              <Link
                key={s.partyId}
                href={`/partis/${s.partyId}`}
                prefetch={false}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm hover:shadow-md"
              >
                <span className="w-28 flex-shrink-0 text-sm font-semibold text-slate-700">
                  {party.shortName}
                </span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${s.matchPercent}%`,
                      backgroundColor: party.color,
                    }}
                  />
                </div>
                <div className="flex w-16 flex-shrink-0 flex-col items-end">
                  <span className="text-sm font-bold text-slate-900">
                    {s.matchPercent}%
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {s.rawAgreementPercent}% sur {s.answeredRelevant}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Le score reflète le taux d&apos;accord sur les propositions
          documentées comme soutenues par chaque parti (ou logiquement
          contradictoires avec une proposition qu&apos;il soutient
          explicitement, ex. « relancer le nucléaire » vs « en sortir »)
          et pour lesquelles vous avez répondu, pondéré par le nombre de
          propositions communes : un parti avec beaucoup de propositions partagées et un bon taux
          d&apos;accord passe devant un parti avec un taux d&apos;accord
          élevé mais obtenu sur très peu de propositions. Le petit texte
          gris sous chaque pourcentage indique le taux d&apos;accord brut
          et le nombre de propositions utilisées.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-slate-900">Détail par thématique</h2>
        <p className="mt-1 text-xs text-slate-500">
          Cliquez sur une thématique pour voir le détail des propositions
          pour lesquelles vous avez répondu « pour », et les partis qui les
          soutiennent.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {themeStats
            .filter((s) => s.totalAnswered > 0)
            .map((stat) => {
              const theme = themeById[stat.themeId];
              const isExpanded = expandedTheme === stat.themeId;
              const pourPropsInTheme = propositions.filter(
                (p) => p.themeId === stat.themeId && answers[p.id] === "pour"
              );
              return (
                <div
                  key={stat.themeId}
                  className={`rounded-xl border bg-white p-4 shadow-sm sm:col-span-1 ${
                    isExpanded ? "sm:col-span-2" : ""
                  } ${isExpanded ? "border-slate-300" : "border-slate-200"}`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedTheme(isExpanded ? null : stat.themeId)
                    }
                    className="flex w-full items-center justify-between gap-2 text-left"
                  >
                    <div>
                      <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <span>{theme.icon}</span> {theme.name}
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        {stat.totalAnswered} propositions répondues ·{" "}
                        {stat.pourPercent}% pour
                      </p>
                      {stat.topParties.length > 0 && (
                        <p className="mt-2 text-sm">
                          {stat.topParties.length === 1
                            ? "Le plus proche : "
                            : "Ex æquo : "}
                          {stat.topParties.map((pid, i) => (
                            <span key={pid}>
                              {i > 0 && ", "}
                              <span
                                className="font-semibold"
                                style={{ color: partyById[pid].color }}
                              >
                                {partyById[pid].shortName}
                              </span>
                            </span>
                          ))}{" "}
                          ({stat.topPartyPercent}%)
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 text-slate-400">
                      {isExpanded ? "▲" : "▼"}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
                      {pourPropsInTheme.length === 0 ? (
                        <p className="text-sm text-slate-500">
                          Vous n&apos;avez répondu « pour » à aucune
                          proposition de cette thématique.
                        </p>
                      ) : (
                        pourPropsInTheme.map((prop) => (
                          <Link
                            key={prop.id}
                            href={`/proposition/${prop.id}`}
                            prefetch={false}
                            className="rounded-lg border border-slate-100 bg-slate-50 p-3 hover:bg-slate-100"
                          >
                            <p className="text-sm font-medium text-slate-900">
                              {prop.title}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {prop.supportingParties.length === 0 ? (
                                <span className="text-xs text-slate-400">
                                  Aucun parti identifié comme soutenant cette
                                  proposition
                                </span>
                              ) : (
                                prop.supportingParties.map((pid) => {
                                  const party = partyById[pid];
                                  return (
                                    <span
                                      key={pid}
                                      className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                                      style={{ backgroundColor: party.color }}
                                    >
                                      {party.shortName}
                                    </span>
                                  );
                                })
                              )}
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </section>

      {pourPropositions.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-slate-900">
            🏛️ Quelle coalition pour réaliser votre programme ?
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            En traitant l&apos;ensemble des {pourPropositions.length}{" "}
            propositions auxquelles vous avez répondu « pour » comme votre
            propre programme, voici quelles coalitions de partis pourraient
            le réaliser, et combien de sièges il leur faudrait selon le
            mode de scrutin. Vous pouvez aussi construire ce programme à la
            main dans le{" "}
            <Link href="/marche" prefetch={false} className="underline underline-offset-2">
              marché des propositions
            </Link>
            .
          </p>
          <CoalitionExplorer
            propositions={pourPropositions}
            partyCompatibility={partyCompatibility}
          />
        </section>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        {shareFeedback && (
          <p className="w-full text-sm font-medium text-emerald-600">
            {shareFeedback}
          </p>
        )}
        <button
          onClick={shareResults}
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          📤 Partager mes résultats
        </button>
        {!unfinishedGame && (
          <Link
            href="/jeu"
            prefetch={false}
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            🔄 Rejouer
          </Link>
        )}
        <Link
          href="/themes"
          prefetch={false}
          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          Explorer les thématiques en détail
        </Link>
      </div>
    </main>
  );
}
