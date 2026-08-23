export const ANSWERS_STORAGE_KEY = "programmes2027:answers";

/**
 * Stores the in-progress state of the swipe game (shuffled question order,
 * current position, answers so far) so the user can close the tab and
 * resume later exactly where they left off.
 */
export const GAME_STATE_STORAGE_KEY = "programmes2027:game-state";

/**
 * Minimum number of answered propositions (pour/contre/skip combined)
 * before the user is offered a shortcut to see their results without
 * finishing every single proposition.
 */
export const MIN_ANSWERS_FOR_EARLY_RESULTS = 15;

/**
 * Whether there is a saved, not-yet-finished game in localStorage (i.e. the
 * user has started answering but hasn't reached the end of the deck yet).
 * Used by the results page to offer a "continue the quiz" shortcut instead
 * of only "restart from scratch".
 */
export function hasUnfinishedGame(): boolean {
  if (typeof window === "undefined") return false;
  const raw = window.localStorage.getItem(GAME_STATE_STORAGE_KEY);
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw) as { deckIds?: unknown; index?: unknown };
    return (
      Array.isArray(parsed.deckIds) &&
      typeof parsed.index === "number" &&
      parsed.index < parsed.deckIds.length
    );
  } catch {
    return false;
  }
}

/**
 * Cookie set once a visitor has solved the Cloudflare Turnstile
 * challenge (see /verify and src/middleware.ts). Its value is an opaque
 * random token, not derived from anything guessable.
 */
export const TURNSTILE_GATE_COOKIE_NAME = "cf_turnstile_ok";

/**
 * Whether the user has dismissed the "random order / algorithm still
 * being refined" disclaimer shown in the quiz. Persisted so it stays
 * hidden on future visits once acknowledged.
 */
export const QUIZ_WARNING_DISMISSED_KEY = "programmes2027:quiz-warning-dismissed";

/**
 * "Marché des propositions": a user-curated basket of proposition ids,
 * browsed across themes, used to build a custom governing program and
 * find which party coalitions could realize it (see
 * src/lib/electoralSystems.ts and src/app/marche).
 */
export const MARKET_BASKET_STORAGE_KEY = "programmes2027:market-basket";

const MARKET_BASKET_CHANGE_EVENT = "programmes2027:market-basket-change";

export function getMarketBasketSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(MARKET_BASKET_STORAGE_KEY) ?? "[]";
}

export function getMarketBasketServerSnapshot(): string {
  return "[]";
}

export function subscribeMarketBasket(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(MARKET_BASKET_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(MARKET_BASKET_CHANGE_EVENT, callback);
  };
}

function readBasketIds(): string[] {
  try {
    const parsed = JSON.parse(getMarketBasketSnapshot());
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function writeBasketIds(ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MARKET_BASKET_STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(MARKET_BASKET_CHANGE_EVENT));
}

export function isInMarketBasket(propositionId: string): boolean {
  return readBasketIds().includes(propositionId);
}

export function toggleMarketBasketItem(propositionId: string) {
  const ids = readBasketIds();
  const next = ids.includes(propositionId)
    ? ids.filter((id) => id !== propositionId)
    : [...ids, propositionId];
  writeBasketIds(next);
}

export function removeFromMarketBasket(propositionId: string) {
  writeBasketIds(readBasketIds().filter((id) => id !== propositionId));
}

export function clearMarketBasket() {
  writeBasketIds([]);
}

/**
 * Whether there are saved answers from a completed (or early-viewed)
 * quiz sitting in localStorage. Used to gate starting a brand new game:
 * we never want to silently overwrite previous results just because the
 * user navigated back to /jeu, only when they explicitly confirm they
 * want to start over (see PreviousResultsGate in SwipeGame.tsx).
 */
export function hasFinishedAnswers(): boolean {
  if (typeof window === "undefined") return false;
  const raw = window.localStorage.getItem(ANSWERS_STORAGE_KEY);
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw);
    return (
      typeof parsed === "object" && parsed !== null && Object.keys(parsed).length > 0
    );
  } catch {
    return false;
  }
}

/**
 * Clears previously saved quiz answers. Only ever called when the user
 * explicitly chooses to start a new game (see PreviousResultsGate /
 * restart() in SwipeGame.tsx) — never automatically.
 */
export function clearAnswers() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ANSWERS_STORAGE_KEY);
}
