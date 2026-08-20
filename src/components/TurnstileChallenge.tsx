"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        }
      ) => string;
    };
  }
}

export function TurnstileChallenge({ siteKey }: { siteKey: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);
  const [status, setStatus] = useState<"idle" | "verifying" | "error">("idle");

  const redirectTo = searchParams.get("redirect") || "/";
  // Only ever redirect to a same-site relative path, never to an
  // attacker-controlled absolute/external URL.
  const safeRedirect = redirectTo.startsWith("/") && !redirectTo.startsWith("//")
    ? redirectTo
    : "/";

  async function handleToken(token: string) {
    setStatus("verifying");
    try {
      const res = await fetch("/api/turnstile-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) throw new Error("verification failed");
      router.replace(safeRedirect);
      router.refresh();
    } catch {
      setStatus("error");
    }
  }

  function renderWidget() {
    if (rendered.current || !containerRef.current || !window.turnstile) return;
    rendered.current = true;
    window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: handleToken,
      "error-callback": () => setStatus("error"),
      "expired-callback": () => setStatus("idle"),
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.turnstile) {
        renderWidget();
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />
      <div ref={containerRef} />
      {status === "verifying" && (
        <p className="text-sm text-slate-500">Vérification en cours...</p>
      )}
      {status === "error" && (
        <p className="text-sm text-rose-600">
          La vérification a échoué. Merci de réessayer.
        </p>
      )}
    </div>
  );
}
