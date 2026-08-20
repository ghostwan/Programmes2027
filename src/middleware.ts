import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Basic Auth protection for the development/preview phase of the site.
 * Credentials are read from environment variables (set as a Cloudflare
 * Worker secret in production, or via .dev.vars / .env.local locally).
 *
 * This is intentionally a *simple* gate (not a full auth system) suited
 * for keeping a pre-launch site private while it is being built and
 * reviewed. Remove this file (or the matcher) once the site goes public.
 */

const REALM = "Programmes2027 (accès restreint - phase de développement)";

function unauthorized() {
  return new Response("Authentification requise.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
    },
  });
}

function timingSafeEqual(a: string, b: string): boolean {
  // Manual constant-time-ish comparison (no Node crypto dependency,
  // works in the Workers/Edge runtime).
  const aLen = a.length;
  const bLen = b.length;
  const maxLen = Math.max(aLen, bLen);
  let mismatch = aLen === bLen ? 0 : 1;
  for (let i = 0; i < maxLen; i++) {
    const ca = i < aLen ? a.charCodeAt(i) : 0;
    const cb = i < bLen ? b.charCodeAt(i) : 0;
    mismatch |= ca ^ cb;
  }
  return mismatch === 0;
}

export function middleware(request: NextRequest) {
  const expectedUser = process.env.SITE_AUTH_USER;
  const expectedPassword = process.env.SITE_AUTH_PASSWORD;

  // If no credentials are configured, fail closed with a clear error
  // rather than silently leaving the site open.
  if (!expectedUser || !expectedPassword) {
    return new Response(
      "Protection par mot de passe non configurée (SITE_AUTH_USER / SITE_AUTH_PASSWORD manquants).",
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return unauthorized();
  }

  let decoded: string;
  try {
    decoded = atob(authHeader.slice("Basic ".length));
  } catch {
    return unauthorized();
  }

  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex === -1) return unauthorized();

  const user = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  const validUser = timingSafeEqual(user, expectedUser);
  const validPassword = timingSafeEqual(password, expectedPassword);

  if (!validUser || !validPassword) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  runtime: "experimental-edge",
  matcher: [
    // Protect everything except static assets, so CSS/JS/images always load
    // once the browser has already authenticated.
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
