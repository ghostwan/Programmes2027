// Wraps the OpenNext-generated Next.js Worker with a lightweight bot/scraper
// gate, implemented at the raw Cloudflare Workers level rather than as
// Next.js Proxy/Middleware.
//
// Why here and not in src/proxy.ts: this version of Next.js compiles Proxy
// (formerly "middleware") to the Node.js runtime by default, and no longer
// allows opting back into the Edge runtime from within a proxy.ts file
// ("Proxy does not support Edge runtime" — see
// node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md).
// @opennextjs/cloudflare (as of 1.20.2) does not yet support Node.js
// middleware, only Edge middleware. Wrapping the generated fetch handler in
// a custom worker (documented at https://opennext.js.org/cloudflare/howtos/custom-worker)
// sidesteps this incompatibility entirely by running before Next.js is even
// invoked.
//
// `.open-next/worker.js` is generated at build time and may or may not
// already exist/type-check depending on which build step just ran, so we
// use @ts-ignore (not @ts-expect-error) here deliberately.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { default as handler } from "./.open-next/worker.js";

const TURNSTILE_GATE_COOKIE_NAME = "cf_turnstile_ok";
const PUBLIC_PATH_PREFIXES = ["/verify", "/api/turnstile-verify", "/_next/"];
// Static files served straight out of public/ (or app/ conventions like
// favicon.ico) are identified by extension rather than by an exhaustive
// path list, so that adding a new file to public/ never accidentally
// re-triggers the bot gate for it.
const PUBLIC_FILE_EXTENSIONS = [
  ".ico",
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".txt",
  ".xml",
  ".json",
  ".webmanifest",
  ".css",
  ".js",
];

function isPublicPath(pathname: string): boolean {
  if (
    PUBLIC_PATH_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(prefix)
    )
  ) {
    return true;
  }
  return PUBLIC_FILE_EXTENSIONS.some((ext) => pathname.endsWith(ext));
}

function hasGateCookie(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie") ?? "";
  return cookieHeader
    .split(";")
    .some((part) => part.trim().startsWith(`${TURNSTILE_GATE_COOKIE_NAME}=`));
}

/**
 * Cloudflare identifies well-known, legitimate bots (search engine
 * crawlers, chat-app link-preview fetchers, uptime monitors, etc.) via
 * `request.cf.verifiedBot`. These bots can never solve a Turnstile
 * challenge and would otherwise retry the same gated URL indefinitely,
 * which is exactly what drove the account over its daily request quota.
 * Since Cloudflare has already vetted them, let them through untouched
 * instead of bouncing them into an unsolvable redirect loop.
 */
function isVerifiedBot(request: Request): boolean {
  const cf = (request as Request & { cf?: { verifiedBot?: boolean } }).cf;
  return cf?.verifiedBot === true;
}

export default {
  async fetch(request: Request, env: CloudflareEnv, ctx: ExecutionContext) {
    const url = new URL(request.url);
    const ip = request.headers.get("cf-connecting-ip") ?? "unknown";

    // The Turnstile verification endpoint is deliberately public (see
    // PUBLIC_PATH_PREFIXES below) so legitimate visitors can complete the
    // challenge before getting a gate cookie — but that also means it's
    // reachable with zero prior authentication. Each call makes an
    // outbound request to Cloudflare's siteverify API, so a client
    // hammering this endpoint in a loop could burn through both that
    // quota and the Workers request quota. Rate-limit it per IP before
    // even reaching Next.js.
    if (url.pathname === "/api/turnstile-verify" && request.method === "POST") {
      const { success } = await env.TURNSTILE_VERIFY_LIMITER.limit({ key: ip });
      if (!success) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Trop de tentatives, réessayez dans une minute.",
          }),
          { status: 429, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    if (
      !isPublicPath(url.pathname) &&
      !hasGateCookie(request) &&
      !isVerifiedBot(request)
    ) {
      const verifyUrl = new URL("/verify", url.origin);
      verifyUrl.searchParams.set("redirect", url.pathname + url.search);
      return Response.redirect(verifyUrl.toString(), 307);
    }

    // Global per-IP ceiling applied to actual app content (never to public
    // paths like /verify, /api/turnstile-verify or static assets, which
    // must always stay reachable so a real visitor can never get locked
    // out of completing the anti-bot check itself). On 2026-08-23 a single
    // client sustained ~130 requests/second for over an hour without ever
    // erroring out, which alone exceeded the account's daily Workers
    // request quota. 600 req/min (10/s) is far above any plausible human
    // browsing rate but stops that pattern.
    if (!isPublicPath(url.pathname)) {
      const { success } = await env.GLOBAL_RATE_LIMITER.limit({ key: ip });
      if (!success) {
        return new Response("Trop de requêtes, réessayez plus tard.", {
          status: 429,
          headers: { "Retry-After": "60" },
        });
      }
    }

    return handler.fetch(request, env, ctx);
  },
} satisfies ExportedHandler<CloudflareEnv>;
