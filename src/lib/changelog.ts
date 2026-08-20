import releases from "@/lib/generated/changelog-data.json";

export interface ChangelogCategory {
  name: string;
  items: string[];
}

export interface ChangelogRelease {
  version: string;
  date: string | null;
  categories: ChangelogCategory[];
}

/**
 * Structured changelog data, generated at build time from CHANGELOG.md by
 * scripts/generate-changelog-data.mjs (see the "predev"/"prebuild" npm
 * scripts). Do not read CHANGELOG.md from the filesystem here: this module
 * is bundled into the Cloudflare Worker, which has no runtime access to
 * arbitrary repo files.
 */
export function getChangelogReleases(): ChangelogRelease[] {
  return releases as ChangelogRelease[];
}
