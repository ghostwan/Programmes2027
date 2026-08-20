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
const PUBLIC_PATH_PREFIXES = ["/verify", "/api/turnstile-verify", "/_next/", "/favicon.ico"];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix)
  );
}

function hasGateCookie(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie") ?? "";
  return cookieHeader
    .split(";")
    .some((part) => part.trim().startsWith(`${TURNSTILE_GATE_COOKIE_NAME}=`));
}

export default {
  async fetch(request: Request, env: unknown, ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (!isPublicPath(url.pathname) && !hasGateCookie(request)) {
      const verifyUrl = new URL("/verify", url.origin);
      verifyUrl.searchParams.set("redirect", url.pathname + url.search);
      return Response.redirect(verifyUrl.toString(), 307);
    }

    return handler.fetch(request, env, ctx);
  },
} satisfies ExportedHandler<CloudflareEnv>;
