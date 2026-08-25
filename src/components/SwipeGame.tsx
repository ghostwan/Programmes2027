"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useAnimation, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { propositions, propositionById } from "@/lib/data/propositions";
import { themeById } from "@/lib/data/themes";
import { partyById } from "@/lib/data/parties";
import { Answer, AnswersMap, GameState, PartyId } from "@/lib/types";
import {
  createBalancedDeckOrder,
  selectEgalitarianPropositions,
} from "@/lib/deckOrdering";
import {
  ANSWERS_STORAGE_KEY,
  GAME_STATE_STORAGE_KEY,
  MIN_ANSWERS_FOR_EARLY_RESULTS,
  QUIZ_WARNING_DISMISSED_KEY,
  clearAnswers,
} from "@/lib/storage";

/**
 * The quiz always uses the "égalitaire" deck: every party ends up
 * backing the exact same number of propositions, using whichever party
 * has the fewest as the shared target (capped at
 * `EGALITAIRE_MAX_PER_PARTY`), picked at random. This is the only mode
 * offered — it guarantees no party dominates the questions asked.
 */
export type DeckMode = "egalitaire";

const EGALITAIRE_MAX_PER_PARTY = 30;

function createNewDeckIds(): string[] {
  const pool = selectEgalitarianPropositions(propositions, EGALITAIRE_MAX_PER_PARTY);
  return createBalancedDeckOrder(pool).map((p) => p.id);
}

function parseSavedGameState(raw: string): GameState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as GameState;
    const allIds = new Set(propositions.map((p) => p.id));
    const isValid =
      Array.isArray(parsed.deckIds) &&
      parsed.deckIds.length > 0 &&
      new Set(parsed.deckIds).size === parsed.deckIds.length &&
      parsed.deckIds.every((id) => allIds.has(id)) &&
      typeof parsed.index === "number" &&
      parsed.index >= 0 &&
      parsed.index < parsed.deckIds.length &&
      typeof parsed.answers === "object" &&
      parsed.answers !== null;
    return isValid ? parsed : null;
  } catch {
    return null;
  }
}

function saveGameState(state: GameState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(state));
}

function clearSavedGameState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(GAME_STATE_STORAGE_KEY);
}

// Sentinel used before we know whether we are running on the client and
// have been able to check localStorage (see useSyncExternalStore below).
const LOADING = Symbol("loading");
type Snapshot = string | typeof LOADING;

function subscribe() {
  // No-op: we only care about the very first client read (see
  // getSnapshot/getServerSnapshot below), not about ongoing changes.
  return () => {};
}

function getSnapshot(): Snapshot {
  return window.localStorage.getItem(GAME_STATE_STORAGE_KEY) ?? "";
}

function getAnswersSnapshot(): Snapshot {
  return window.localStorage.getItem(ANSWERS_STORAGE_KEY) ?? "";
}

function getServerSnapshot(): Snapshot {
  return LOADING;
}

function hasAnswersContent(raw: string): boolean {
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null && Object.keys(parsed).length > 0;
  } catch {
    return false;
  }
}

/**
 * Outer wrapper: figures out, without ever causing a hydration mismatch,
 * whether we're on the client and can read a previously saved game from
 * localStorage. Once that's known, it mounts <GamePlay> exactly once with
 * that initial data — all further game state lives in GamePlay's own
 * component state (no repeated localStorage reads needed).
 *
 * If there's no game to resume, but there ARE saved results from a
 * previous, already-finished game, we show <PreviousResultsGate> first:
 * results must stay available (and never be silently overwritten) until
 * the user explicitly asks to start a new game. Only once that's
 * confirmed (or if there was nothing to preserve) does the player pick a
 * deck mode via `<DeckModeGate>` before `<GamePlay>` is mounted, since
 * the deck is built once at mount time from that choice.
 */
export function SwipeGame() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const answersSnapshot = useSyncExternalStore(
    subscribe,
    getAnswersSnapshot,
    getServerSnapshot
  );
  const [forceNewGame, setForceNewGame] = useState(false);

  if (snapshot === LOADING || answersSnapshot === LOADING) {
    return (
      <div className="flex flex-1 items-center justify-center py-20 text-slate-500">
        Chargement...
      </div>
    );
  }

  const initialSavedState = parseSavedGameState(snapshot);
  if (initialSavedState) {
    return <GamePlay initialSavedState={initialSavedState} />;
  }

  if (!forceNewGame && hasAnswersContent(answersSnapshot)) {
    return (
      <PreviousResultsGate
        onStartNew={() => {
          clearAnswers();
          setForceNewGame(true);
        }}
      />
    );
  }

  return <DeckModeGate />;
}

/**
 * Shown when the player has finished (or early-viewed) a previous game
 * and has no game currently in progress. Never starts a new game (which
 * would eventually overwrite the saved results on finish) without an
 * explicit confirmation click.
 */
function PreviousResultsGate({ onStartNew }: { onStartNew: () => void }) {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-6 px-4 py-20 text-center">
      <div className="text-4xl">📌</div>
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Vous avez déjà des résultats sauvegardés
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Ils restent disponibles tant que vous ne recommencez pas
          explicitement une nouvelle partie.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/resultats"
          className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Voir mes résultats
        </Link>
        <button
          onClick={onStartNew}
          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          🔄 Recommencer une nouvelle partie
        </button>
      </div>
    </div>
  );
}

function DeckModeGate() {
  const [started, setStarted] = useState(false);
  if (started) return <GamePlay initialSavedState={null} />;
  return <GameIntro onStart={() => setStarted(true)} />;
}

/**
 * Pre-game screen explaining the concept of the (single, égalitaire)
 * quiz mode: propositions are shown blind (without the party name), and
 * every party is represented by the exact same number of propositions
 * so that no party dominates the questions asked — niche parties (with
 * fewer documented propositions) simply set the shared target for
 * everyone rather than being "topped up" artificially.
 */
function GameIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-6 px-4 py-10 text-center">
      <div className="text-4xl">🟰</div>
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Le jeu égalitaire
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Vous allez répondre « pour » ou « contre » à des propositions
          politiques présentées à l&apos;aveugle, sans savoir de quel parti
          elles viennent. À la fin, on compare vos réponses aux programmes
          des partis pour voir duquel vous êtes le plus proche.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Pour que le résultat soit juste, chaque parti est représenté par
          exactement le même nombre de propositions, tirées au hasard.
          Les partis avec un programme moins étoffé sur les sujets
          couverts ici (par exemple les partis de niche) fixent ce nombre
          partagé : personne ne domine le jeu de questions.
        </p>
      </div>

      <p className="max-w-xl rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        💡 Pas besoin de tout finir : dès {MIN_ANSWERS_FOR_EARLY_RESULTS}{" "}
        propositions parcourues, vous pourrez avoir un aperçu de votre
        résultat et choisir de continuer pour l&apos;affiner, ou de vous
        arrêter là.
      </p>

      <button
        onClick={onStart}
        className="rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
      >
        🎮 Commencer
      </button>
    </div>
  );
}

function GamePlay({
  initialSavedState,
}: {
  initialSavedState: GameState | null;
}) {
  const router = useRouter();
  const controls = useAnimation();
  // Real-time drag position, used both to tilt the card and to drive the
  // red/green edge glows while the user is dragging — not just at release.
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-15, 15]);
  const leftGlowOpacity = useTransform(x, [-160, -20], [0.9, 0]);
  const rightGlowOpacity = useTransform(x, [20, 160], [0, 0.9]);

  const [deckIds] = useState<string[]>(
    () => initialSavedState?.deckIds ?? createNewDeckIds()
  );
  const [index, setIndex] = useState(() => initialSavedState?.index ?? 0);
  const [answers, setAnswers] = useState<AnswersMap>(
    () => initialSavedState?.answers ?? {}
  );
  const [resumed] = useState(() => (initialSavedState?.index ?? 0) > 0);
  const [warningDismissed, setWarningDismissed] = useState(
    () =>
      typeof window !== "undefined" &&
      window.localStorage.getItem(QUIZ_WARNING_DISMISSED_KEY) === "1"
  );

  function dismissWarning() {
    setWarningDismissed(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(QUIZ_WARNING_DISMISSED_KEY, "1");
    }
  }

  const [resultsHintDismissed, setResultsHintDismissed] = useState(false);

  const deck = useMemo(
    () => deckIds.map((id) => propositionById[id]).filter(Boolean),
    [deckIds]
  );

  const current = deck[index];
  const done = index >= deck.length;
  const progress = deck.length > 0 ? Math.round((index / deck.length) * 100) : 0;

  // Last position (0-based) at which each party still has a proposition
  // in the deck. Once `index` moves past it, that party has no more
  // propositions left to show for the rest of the quiz.
  const lastDeckIndexByParty = useMemo(() => {
    const map = new Map<PartyId, number>();
    deck.forEach((p, i) => {
      for (const partyId of p.supportingParties) {
        map.set(partyId, i);
      }
    });
    return map;
  }, [deck]);

  const exhaustedParties = useMemo(
    () =>
      [...lastDeckIndexByParty.entries()]
        .filter(([, lastIndex]) => index > lastIndex)
        .map(([partyId]) => partyById[partyId]?.name ?? partyId),
    [lastDeckIndexByParty, index]
  );

  function persistAnswers(finalAnswers: AnswersMap) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        ANSWERS_STORAGE_KEY,
        JSON.stringify(finalAnswers)
      );
    }
  }

  function finish(finalAnswers: AnswersMap) {
    persistAnswers(finalAnswers);
    clearSavedGameState();
    router.push("/resultats");
  }

  /**
   * Lets the user jump to the results page before finishing the whole
   * deck. Unlike `finish()`, this does NOT clear the saved game state, so
   * the user can come back later (via the "Continuer le quiz" button on
   * the results page) and resume exactly where they left off.
   */
  function viewResultsNow() {
    persistAnswers(answers);
    router.push("/resultats");
  }

  function answer(a: Answer) {
    if (!current) return;
    const next = { ...answers, [current.id]: a };
    const nextIndex = index + 1;
    setAnswers(next);
    if (nextIndex >= deckIds.length) {
      finish(next);
    } else {
      setIndex(nextIndex);
      saveGameState({ deckIds, index: nextIndex, answers: next });
    }
  }

  function restart() {
    clearSavedGameState();
    clearAnswers();
    // Force a full remount with a brand new shuffled deck.
    window.location.reload();
  }

  /**
   * Goes back to the previous proposition so the user can change their
   * answer. The previous answer is kept in `answers` until they pick a
   * new one (answering again simply overwrites the same key), so
   * re-visiting without re-answering doesn't lose anything.
   */
  function goBack() {
    if (index === 0) return;
    const prevIndex = index - 1;
    setIndex(prevIndex);
    saveGameState({ deckIds, index: prevIndex, answers });
  }

  async function handleDragEnd(_: unknown, info: PanInfo) {
    const threshold = 100;
    if (info.offset.x > threshold) {
      await controls.start({ x: 500, opacity: 0 });
      x.set(0);
      answer("pour");
    } else if (info.offset.x < -threshold) {
      await controls.start({ x: -500, opacity: 0 });
      x.set(0);
      answer("contre");
    } else {
      controls.start({ x: 0, opacity: 1 });
    }
  }

  if (done || !current) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
        <div className="text-4xl">🎉</div>
        <p className="text-slate-600">Calcul de vos résultats...</p>
      </div>
    );
  }

  const theme = themeById[current.themeId];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-6">
      {resumed && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-900">
          <span>
            ↩️ Vous reprenez votre partie là où vous l&apos;aviez laissée.
          </span>
          <button
            onClick={restart}
            className="font-semibold underline underline-offset-2 hover:text-amber-950"
          >
            Recommencer à zéro
          </button>
        </div>
      )}

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
          <button
            type="button"
            onClick={goBack}
            disabled={index === 0}
            className="flex items-center gap-1 font-semibold text-slate-500 hover:text-slate-800 disabled:invisible"
          >
            ← Précédent
          </button>
          <span>Proposition n°{index + 1}</span>
          <span>{theme.icon} {theme.name}</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-slate-900 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        {answeredCount >= MIN_ANSWERS_FOR_EARLY_RESULTS && !resultsHintDismissed && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-slate-300 bg-slate-50 p-3">
            <div className="flex-1">
              <p className="text-xs text-slate-600">
                Vous avez déjà répondu à {answeredCount} propositions :
                vous pouvez continuer pour affiner votre résultat, ou le
                découvrir dès maintenant.
              </p>
              <button
                onClick={viewResultsNow}
                className="mt-2 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
              >
                🎉 Voir mes résultats maintenant →
              </button>
            </div>
            <button
              type="button"
              onClick={() => setResultsHintDismissed(true)}
              aria-label="Masquer ce message"
              className="shrink-0 rounded-full px-1.5 py-0.5 font-bold text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {exhaustedParties.length > 0 && (
        <p className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600">
          ℹ️ {exhaustedParties.length === 1 ? "Ce parti n'a" : "Ces partis n'ont"}{" "}
          plus de propositions à venir dans cette partie :{" "}
          <span className="font-semibold">{exhaustedParties.join(", ")}</span>.
        </p>
      )}

      {!warningDismissed && (
        <p className="mb-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
          <span className="flex-1">
            ⚠️ L&apos;ordre des propositions est tiré au hasard à chaque partie,
            ce qui peut influencer votre résultat si vous consultez vos résultats
            avant d&apos;avoir répondu à toutes les propositions. L&apos;algorithme
            de correspondance est encore en cours d&apos;amélioration.
          </span>
          <button
            type="button"
            onClick={dismissWarning}
            aria-label="Masquer cet avertissement"
            className="shrink-0 rounded-full px-1.5 py-0.5 font-bold text-amber-700 hover:bg-amber-100 hover:text-amber-900"
          >
            ✕
          </button>
        </p>
      )}
      {/* Edge glows: real-time feedback on which side the current drag
          would count as, visible along the screen edges regardless of
          where on the card the drag started. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 left-0 z-40 w-4 sm:w-6"
        style={{
          opacity: leftGlowOpacity,
          background: "linear-gradient(to right, rgba(244,63,94,0.9), transparent)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 right-0 z-40 w-4 sm:w-6"
        style={{
          opacity: rightGlowOpacity,
          background: "linear-gradient(to left, rgba(16,185,129,0.9), transparent)",
        }}
      />

      {/* Card */}
      <div className="relative flex flex-1 items-center justify-center py-4">
        <motion.div
          key={current.id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x, rotate }}
          initial={{ opacity: 1, scale: 1 }}
          className="flex h-[440px] w-full cursor-grab flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-xl active:cursor-grabbing"
        >
          <span className="w-fit shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
            Proposition à l&apos;aveugle
          </span>
          <h2 className="mt-4 shrink-0 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
            {current.title}
          </h2>

          <div className="no-scrollbar mt-4 flex-1 overflow-y-auto pr-1">
            <p className="text-sm leading-relaxed text-slate-600">
              {current.description}
            </p>
          </div>

          <div className="mt-4 flex shrink-0 justify-between pt-2 text-xs font-semibold uppercase tracking-wide">
            <span className="text-rose-500">← Contre</span>
            <span className="text-emerald-500">Pour →</span>
          </div>
        </motion.div>
      </div>

      {/* Controls (also work on desktop / no swipe needed) */}
      <div className="mt-4 flex items-center justify-center gap-3 sm:gap-4">
        <button
          onClick={() => answer("contre")}
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-rose-200 bg-white text-2xl text-rose-500 shadow-sm transition hover:bg-rose-50 sm:h-14 sm:w-14"
          aria-label="Contre"
        >
          ✕
        </button>
        <button
          onClick={() => answer("skip")}
          className="flex h-12 flex-col items-center justify-center gap-0.5 rounded-full border-2 border-slate-200 bg-white px-4 text-slate-500 shadow-sm transition hover:bg-slate-50"
          aria-label="Ne sais pas, ignorer cette proposition"
        >
          <span className="text-base leading-none">🤷</span>
          <span className="text-[10px] font-semibold uppercase tracking-wide leading-none">
            Ne sais pas
          </span>
        </button>
        <button
          onClick={() => answer("pour")}
          className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-200 bg-white text-2xl text-emerald-500 shadow-sm transition hover:bg-emerald-50 sm:h-14 sm:w-14"
          aria-label="Pour"
        >
          ✓
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-slate-400">
        Sur mobile : swipez la carte. Sur ordinateur : utilisez les boutons.
        « Ne sais pas » ignore la proposition, elle ne compte pas dans vos
        résultats. Votre progression est sauvegardée automatiquement dans ce
        navigateur.
      </p>
    </div>
  );
}
