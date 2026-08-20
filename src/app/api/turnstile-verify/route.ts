import { NextRequest, NextResponse } from "next/server";
import { TURNSTILE_GATE_COOKIE_NAME } from "@/lib/storage";

/**
 * Name of the cookie set once a visitor has successfully solved the
 * Cloudflare Turnstile challenge. Its value is an opaque random token
 * (not a JWT, not derived from anything guessable) — a scraping bot
 * can't fabricate a valid one without going through the widget first.
 */
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function randomToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

interface TurnstileVerifyResponse {
  success: boolean;
  ["error-codes"]?: string[];
}

export async function POST(request: NextRequest) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { success: false, error: "Turnstile non configuré côté serveur." },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => null)) as { token?: unknown } | null;
  const token = body?.token;
  if (typeof token !== "string" || token.length === 0) {
    return NextResponse.json(
      { success: false, error: "Jeton manquant." },
      { status: 400 }
    );
  }

  const ip = request.headers.get("cf-connecting-ip") ?? undefined;

  const verifyRes = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: secretKey, response: token, remoteip: ip }),
    }
  );

  const verifyData = (await verifyRes.json()) as TurnstileVerifyResponse;

  if (!verifyData.success) {
    return NextResponse.json(
      { success: false, error: "Vérification échouée.", details: verifyData["error-codes"] },
      { status: 403 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(TURNSTILE_GATE_COOKIE_NAME, randomToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });
  return response;
}
