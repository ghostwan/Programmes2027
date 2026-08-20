#!/usr/bin/env node
/**
 * Bump the project version (semantic versioning) based on the content of
 * the "## [Non publié]" section of CHANGELOG.md, then move that content
 * into a new dated release section.
 *
 * Detection rules (unless overridden with --major / --minor / --patch):
 *   - "### Cassant"                                   -> major
 *   - "### Ajouté"                                    -> minor
 *   - "### Modifié" / "### Corrigé" / "### Supprimé"
 *     "### Déprécié" / "### Sécurité"                 -> patch
 *
 * If the "Non publié" section has no entries at all, the script does
 * nothing (exit code 0) so it can safely be chained before every deploy.
 *
 * Usage:
 *   node scripts/bump-version.mjs                # auto-detect bump type
 *   node scripts/bump-version.mjs --minor         # force a minor bump
 *   node scripts/bump-version.mjs --dry-run       # show what would happen
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const changelogPath = path.join(rootDir, "CHANGELOG.md");
const packageJsonPath = path.join(rootDir, "package.json");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const forcedType = ["major", "minor", "patch"].find((t) => args.includes(`--${t}`));

const CATEGORY_TO_LEVEL = {
  Cassant: "major",
  Ajouté: "minor",
  Modifié: "patch",
  Corrigé: "patch",
  Supprimé: "patch",
  Déprécié: "patch",
  Sécurité: "patch",
};

function parseUnreleasedSection(changelog) {
  const unreleasedHeader = "## [Non publié]";
  const startIndex = changelog.indexOf(unreleasedHeader);
  if (startIndex === -1) {
    throw new Error(
      `Impossible de trouver la section "${unreleasedHeader}" dans CHANGELOG.md.`
    );
  }
  const contentStart = startIndex + unreleasedHeader.length;
  const nextHeaderIndex = changelog.indexOf("\n## [", contentStart);
  const contentEnd = nextHeaderIndex === -1 ? changelog.length : nextHeaderIndex;
  const rawSection = changelog.slice(contentStart, contentEnd);

  const categories = [];
  const categoryRegex = /^### (.+)$/gm;
  const matches = [...rawSection.matchAll(categoryRegex)];

  for (let i = 0; i < matches.length; i++) {
    const name = matches[i][1].trim();
    const blockStart = matches[i].index + matches[i][0].length;
    const blockEnd = i + 1 < matches.length ? matches[i + 1].index : rawSection.length;
    const block = rawSection.slice(blockStart, blockEnd);
    const items = block
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("- "));
    if (items.length > 0) {
      categories.push({ name, items });
    }
  }

  return {
    rawSection: rawSection.trim(),
    categories,
    before: changelog.slice(0, startIndex),
    after: changelog.slice(contentEnd),
  };
}

function detectBumpLevel(categories) {
  const levels = new Set(
    categories.map((c) => CATEGORY_TO_LEVEL[c.name]).filter(Boolean)
  );
  // Unknown/custom category names are treated conservatively as "patch".
  categories.forEach((c) => {
    if (!CATEGORY_TO_LEVEL[c.name]) levels.add("patch");
  });
  if (levels.has("major")) return "major";
  if (levels.has("minor")) return "minor";
  if (levels.has("patch")) return "patch";
  return null;
}

function bumpSemver(version, level) {
  const [major, minor, patch] = version.split(".").map(Number);
  if (level === "major") return `${major + 1}.0.0`;
  if (level === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function main() {
  const changelog = readFileSync(changelogPath, "utf8");
  const pkg = JSON.parse(readFileSync(packageJsonPath, "utf8"));

  const unreleased = parseUnreleasedSection(changelog);

  if (unreleased.categories.length === 0) {
    console.log(
      'ℹ️  Aucune entrée sous "## [Non publié]" dans CHANGELOG.md : version inchangée (' +
        pkg.version +
        ")."
    );
    return;
  }

  const level = forcedType ?? detectBumpLevel(unreleased.categories);
  if (!level) {
    console.log(
      "ℹ️  Impossible de déterminer le type de version à partir des catégories du changelog. Version inchangée."
    );
    return;
  }

  const nextVersion = bumpSemver(pkg.version, level);
  const date = todayISO();

  const newReleaseBlock = `## [${nextVersion}] - ${date}\n\n${unreleased.rawSection}\n\n`;
  const newUnreleasedBlock = `## [Non publié]\n\n`;

  const newChangelog =
    unreleased.before + newUnreleasedBlock + newReleaseBlock + unreleased.after.replace(/^\n+/, "");

  console.log(
    `🔖 Version : ${pkg.version} → ${nextVersion} (${level}) — d'après ${unreleased.categories
      .map((c) => c.name)
      .join(", ")}`
  );

  if (dryRun) {
    console.log("(--dry-run) Aucun fichier modifié.");
    return;
  }

  pkg.version = nextVersion;
  writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + "\n");
  writeFileSync(changelogPath, newChangelog);

  console.log("✅ package.json et CHANGELOG.md mis à jour.");
}

main();
