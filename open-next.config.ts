import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// This site is fully static (no revalidation, no per-request data
// fetching: all propositions/parties/themes are build-time data). Reuse
// the prerendered pages straight from Workers Static Assets as the
// incremental cache, and enable cache interception so cached routes are
// served without invoking the Next.js server function at all. Together
// this keeps most requests from ever reaching the Worker's JS runtime,
// minimizing compute usage and latency.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
