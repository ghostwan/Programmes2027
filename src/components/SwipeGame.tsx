"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimation, type PanInfo } from "framer-motion";
import { propositions } from "@/lib/data/propositions";
import { themeById } from "@/lib/data/themes";
import { Answer, AnswersMap } from "@/lib/types";
import { ANSWERS_STORAGE_KEY } from "@/lib/storage";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function SwipeGame() {
  const router = useRouter();
  const deck = useMemo(() => shuffle(propositions), []);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswersMap>({});
  const controls = useAnimation();

  const current = deck[index];
  const done = index >= deck.length;
  const progress = Math.round((index / deck.length) * 100);

  function finish(finalAnswers: AnswersMap) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        ANSWERS_STORAGE_KEY,
        JSON.stringify(finalAnswers)
      );
    }
    router.push("/resultats");
  }

  function answer(a: Answer) {
    if (!current) return;
    const next = { ...answers, [current.id]: a };
    setAnswers(next);
    if (index + 1 >= deck.length) {
      finish(next);
    } else {
      setIndex(index + 1);
    }
  }

  async function handleDragEnd(_: unknown, info: PanInfo) {
    const threshold = 100;
    if (info.offset.x > threshold) {
      await controls.start({ x: 500, opacity: 0, rotate: 20 });
      answer("pour");
    } else if (info.offset.x < -threshold) {
      await controls.start({ x: -500, opacity: 0, rotate: -20 });
      answer("contre");
    } else {
      controls.start({ x: 0, rotate: 0 });
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
      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500">
          <span>
            {answeredCount + 1} / {deck.length}
          </span>
          <span>{theme.icon} {theme.name}</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-slate-900 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="relative flex flex-1 items-center justify-center py-4">
        <motion.div
          key={current.id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={controls}
          initial={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
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
        résultats.
      </p>
    </div>
  );
}
