import { InternationalExample } from "@/lib/types";

/**
 * Tailwind class bundles keyed by how an international example's effects
 * are globally assessed by observers, used both for the "international
 * example" card on proposition pages and for the flag pills in the
 * comparison tables.
 */
export const ASSESSMENT_STYLES = {
  positive: {
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    heading: "text-emerald-800",
    text: "text-emerald-900",
    innerBg: "bg-white/60",
    pillBg: "bg-emerald-100",
    pillText: "text-emerald-900",
    label: "Bilan plutôt positif",
  },
  negative: {
    border: "border-rose-200",
    bg: "bg-rose-50",
    heading: "text-rose-800",
    text: "text-rose-900",
    innerBg: "bg-white/60",
    pillBg: "bg-rose-100",
    pillText: "text-rose-900",
    label: "Bilan plutôt négatif",
  },
  mixed: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    heading: "text-amber-800",
    text: "text-amber-900",
    innerBg: "bg-white/60",
    pillBg: "bg-amber-100",
    pillText: "text-amber-900",
    label: "Bilan mitigé",
  },
  // Used when no assessment has been recorded (too recent, too disputed).
  neutral: {
    border: "border-slate-200",
    bg: "bg-slate-50",
    heading: "text-slate-700",
    text: "text-slate-700",
    innerBg: "bg-white/60",
    pillBg: "bg-slate-100",
    pillText: "text-slate-600",
    label: "Bilan non tranché",
  },
} as const;

export type AssessmentStyleKey = keyof typeof ASSESSMENT_STYLES;

export function getAssessmentStyle(
  example: InternationalExample | undefined
): (typeof ASSESSMENT_STYLES)[AssessmentStyleKey] {
  const key: AssessmentStyleKey = example?.assessment ?? "neutral";
  return ASSESSMENT_STYLES[key];
}
