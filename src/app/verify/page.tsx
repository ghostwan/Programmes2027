import { Suspense } from "react";
import { TurnstileChallenge } from "@/components/TurnstileChallenge";

export const metadata = {
  title: "Vérification anti-robot — Programmes2027",
  robots: { index: false, follow: false },
};

export default function VerifyPage() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6 px-4 py-20 text-center">
      <div className="text-4xl">🛡️</div>
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Vérification rapide avant d&apos;accéder au site
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Cette étape unique permet de protéger Programmes2027 contre les
          robots et le pillage automatisé de contenu. Elle ne s&apos;affichera
          plus ensuite sur cet appareil.
        </p>
      </div>
      {siteKey ? (
        <Suspense fallback={null}>
          <TurnstileChallenge siteKey={siteKey} />
        </Suspense>
      ) : (
        <p className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          La protection anti-robot n&apos;est pas configurée
          (NEXT_PUBLIC_TURNSTILE_SITE_KEY manquant).
        </p>
      )}
    </main>
  );
}
