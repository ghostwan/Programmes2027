#!/usr/bin/env node
/**
 * Parses CHANGELOG.md at build time and writes the structured result to
 * src/lib/generated/changelog-data.json, which is then imported as a
 * regular JS/JSON module by the app (bundled at build time).
 *
 * This avoids reading CHANGELOG.md from the filesystem at *runtime*,
 * which is not reliable once the app is deployed to Cloudflare Workers
 * (no persistent filesystem access to arbitrary repo files there).
 *
 * Runs automatically before `dev` and `build` (see package.json).
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const changelogPath = path.join(rootDir, "CHANGELOG.md");
const outDir = path.join(rootDir, "src", "lib", "generated");
const outPath = path.join(outDir, "changelog-data.json");

function parseChangelog(content) {
  const headerRegex = /^## \[([^\]]+)\](?: - (\d{4}-\d{2}-\d{2}))?$/gm;
  const headers = [...content.matchAll(headerRegex)];

  const releases = [];

  for (let i = 0; i < headers.length; i++) {
    const version = headers[i][1];
    const date = headers[i][2] ?? null;

    if (version.toLowerCase() === "non publié") continue;

    const blockStart = headers[i].index + headers[i][0].length;
    const blockEnd = i + 1 < headers.length ? headers[i + 1].index : content.length;
    const block = content.slice(blockStart, blockEnd);

    const categoryRegex = /^### (.+)$/gm;
    const catMatches = [...block.matchAll(categoryRegex)];
    const categories = [];

    for (let j = 0; j < catMatches.length; j++) {
      const name = catMatches[j][1].trim();
      const catStart = catMatches[j].index + catMatches[j][0].length;
      const catEnd = j + 1 < catMatches.length ? catMatches[j + 1].index : block.length;
      const catBlock = block.slice(catStart, catEnd);
      const items = [];
      for (const rawLine of catBlock.split("\n")) {
        const line = rawLine.trim();
        if (line.startsWith("- ")) {
          items.push(line.slice(2));
        } else if (line.length > 0 && items.length > 0) {
          // Continuation of a wrapped list item.
          items[items.length - 1] += " " + line;
        }
      }
      if (items.length > 0) categories.push({ name, items });
    }

    releases.push({ version, date, categories });
  }

  return releases;
}

const content = readFileSync(changelogPath, "utf8");
const releases = parseChangelog(content);

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, JSON.stringify(releases, null, 2) + "\n");

console.log(`✅ ${releases.length} version(s) écrite(s) dans ${path.relative(rootDir, outPath)}`);
