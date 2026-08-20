---
name: update-party-programs
description: Use when asked to update, refresh, check for new proposals, or add missing measures to the Programmes2027 comparator dataset (src/lib/data/propositions.ts) by looking for newly published content on French political parties' official program pages/PDFs (LFI, PS, EELV, PCF, Renaissance, LR, RN, Reconquête). Trigger on requests like "mets à jour les programmes", "vérifie si un parti a publié de nouvelles propositions", "check for new party proposals", or when the user provides a new PDF/URL from a party.
---

# Update party programs (Programmes2027)

Repeatable workflow for keeping `src/lib/data/propositions.ts` in sync with
what French parties have actually published, without re-doing the entire
project from scratch each time.

## 0. Orient yourself first

- Read `src/lib/data/propositions.ts` fully is too big — instead, dump a
  compact `id | theme | title | parties` listing per theme (see the Node
  one-liner in "Extraction helpers" below) to see current coverage before
  doing anything else.
- Read `CHANGELOG.md`'s `## [Non publié]` section and recent published
  entries to see what was already covered in previous passes, so you don't
  re-research the same ground.
- Party ids: `lfi, ps, eelv, renaissance, lr, rn, reconquete, pcf`. Theme ids:
  `economie, travail, immigration, securite, education, sante, environnement,
  europe, institutions, logement`.

## 1. Known official sources (verify these still resolve — sites change)

| Party | Source used previously in this project |
|---|---|
| LFI | `https://melenchon2027.fr/programme2025/livre/` — "L'Avenir en commun" edition 2025, 18 chapters + intro, each at `/programme2025/livre/chapitreN` (fetch each directly, don't rely on search) |
| PS | `https://projet-socialiste.fr/projet/` — 6 sub-pages: `vivre-libres`, `etre-en-securites`, `sepanouir-a-egalite`, `vivre-avec-la-nature`, `refaire-societe`, `pacifier-le-monde`. These pages are LONG (many chapters each) — read them fully, a shallow first pass will miss most content. |
| PCF | `https://www.pcf.fr/le_programme` — links to PDF "cahiers thématiques" (logement, sécurité sociale, mobilité, handicap, ESS, paix...). Check the page for newly added cahiers. |
| EELV | Official party program PDF (`docs-sources/eelv.pdf` was used previously — re-download current version from `lesecologistes.fr` if stale) |
| Renaissance | Convention thématique PDFs published irregularly (past examples: "Nouvelle donne économique et climatique", "Une République ferme, une France apaisée" — check `renaissance` official site / press for newer ones) |
| LR | Thematic PDF booklets, e.g. "NOS PROPOSITIONS POUR LA FRANCE" series (electricité, agriculture, logement, IA, "Produire Plus", famille...) — user has downloaded these manually before into `~/Downloads/Programmes 2027/lr/` |
| RN | PDF booklets under `docs-sources/` (`202406-programme.pdf`, `projet-la-securite.pdf`, `projet-lecologie.pdf`, `projet-l-ecole.pdf`, `projet-la-sante.pdf`, `projet-controle-de-limmigration.pdf`) — check `rassemblementnational.fr` for newer ones; direct URL fetches to this domain have repeatedly failed/404'd in this environment, PDFs downloaded manually by the user are more reliable. |
| Reconquête | Not yet covered as of this skill's writing — no established source. Ask the user for a PDF/URL if needed. |

If the user says "j'ai téléchargé des PDFs dans [folder]", look there first
(commonly `~/Downloads/` or `~/Downloads/Programmes 2027/<party>/`) before
trying to fetch anything from the web.

## 2. Extraction helpers

**PDF → text** (always use `-layout` to preserve columns/tables):

```bash
mkdir -p /tmp/programmes/<party>
pdftotext -layout "source.pdf" /tmp/programmes/<party>/name.txt
```

**Web pages**: use the `webfetch` tool directly on specific chapter/section
URLs. Do NOT rely on generic web search — in this environment, Google/Bing/
DuckDuckGo search results are frequently blocked or unusable; direct URL
fetches to known pages work far better. If a direct fetch to a party's own
domain fails repeatedly (e.g. RN's site has been unreliable), say so
explicitly rather than giving up silently, and ask the user for a manually
downloaded PDF instead.

**Dump current dataset coverage per theme** (run before delegating research,
to hand agents an accurate "already covered" list and avoid duplicates):

```bash
node -e '
const fs = require("fs");
const src = fs.readFileSync("src/lib/data/propositions.ts","utf8");
const re = /id:\s*"([^"]+)",\s*themeId:\s*"([^"]+)",\s*title:\s*"([^"]+)",[\s\S]*?supportingParties:\s*\[([^\]]*)\]/g;
let m; const byTheme = {};
while ((m = re.exec(src))) {
  const [, id, theme, title, parties] = m;
  byTheme[theme] = byTheme[theme] || [];
  byTheme[theme].push(`${id} | ${title} | [${parties.replace(/"/g,"")}]`);
}
for (const t of Object.keys(byTheme)) {
  fs.writeFileSync(`/tmp/theme-${t}.txt`, byTheme[t].join("\n"));
}
'
```

## 3. Delegate extraction to parallel agents

For each source document/party, launch a `general` subagent (in parallel
when covering multiple documents/parties at once — always batch independent
Task calls in a single message) with a prompt that:

1. Points at the specific file(s) in `/tmp/programmes/...` or specific
   chapter URLs to fetch — never "search for X's program", always give exact
   paths/URLs.
2. Pastes in the current "already covered" list for the relevant theme(s)
   from step 2, so the agent doesn't propose duplicates.
3. Asks for **concrete, specific, distinctive** proposals only — not vague
   restatements of party ideology. Ask it to prioritize quality over
   quantity (10-30 well-chosen items per document beats an exhaustive dump).
4. Asks for output format: `title | 1-2 sentence description | theme |
   source section`, grouped by theme.
5. For thin/underrepresented themes for a given party (e.g. a party with
   zero entries in "securite" or "immigration"), explicitly ask the agent to
   be exhaustive on that theme specifically.

## 4. Integrate into propositions.ts

- Prefer a Python/Node script to append a batch of new proposition objects
  (see prior commits for the pattern) over one-by-one manual edits — faster
  and less error-prone for 20+ new entries at once.
- Each proposition object shape:
  ```ts
  {
    id: "theme-slug-here", // kebab-case, prefixed by themeId
    themeId: "economie",
    title: "Short clear title",
    description: "1-2 faithful sentences, no invented numbers.",
    supportingParties: ["lr"],
    // internationalExample is optional — see step 6
  },
  ```
- Before inserting, grep the target theme's dump (step 2) for near-identical
  titles/mechanisms to avoid creating a duplicate under a different id (see
  step 7 for a systematic way to catch these across the whole file, not just
  the current batch).
- If a new source confirms that a party already listed for a proposition is
  correct, or that an *additional* party also supports an *existing*
  proposition, prefer **adding that party to the existing entry** over
  creating a new near-duplicate proposition.

## 5. Cross-party verification pass (don't attribute by omission)

Per the project's standing methodology: never leave a proposition
attributed to only the party whose document you happened to read most
recently if other parties plausibly support it too. After adding a batch:

1. Extract the updated per-theme dumps again (step 2).
2. Launch parallel `general` agents (grouped 2 themes per agent is a good
   balance) to cross-check: for each proposition, is there a solid,
   sourced reason to add another party currently missing from
   `supportingParties`? Instruct agents explicitly to say "aucune
   recommandation" rather than guess, and to prefer direct URL fetches of
   known official sources (see step 1's table) over generic search.
3. Apply only recommendations with a real citation (official program page,
   PDF, or vote record) — never on vibes/ideological assumption.

## 6. International examples (optional but valued)

If time allows, for new propositions without an `internationalExample`,
research whether a genuinely comparable policy has been implemented abroad.
Rules:
- Only add an example when genuinely confident — many proposals (especially
  ideological or France-specific ones) legitimately have none. Say so rather
  than forcing an approximate comparison.
- Shape:
  ```ts
  internationalExample: {
    country: "Country name",
    when: "Period",
    summary: "1-2 factual sentences on what was done.",
    evaluation: "1-2 sourced sentences on the actual outcome/verdict.",
    assessment: "positive" | "negative" | "mixed", // see below
  },
  ```
- `assessment` reflects how the cited institutions/studies judge the
  observed effects overall — not whether the policy matches the French
  party's own framing. Classify strictly from the `evaluation` text: a
  clear net-positive outcome → `"positive"`; documented harms/failures/cost
  overruns dominating → `"negative"`; anything with real trade-offs on both
  sides ("mais...", "cependant...") → `"mixed"`. This field drives the
  color of the "Ailleurs dans le monde" card and the flag pill background
  in the comparison tables (see `src/lib/assessmentStyles.ts` and
  `src/lib/countryFlags.ts` — extend `countryFlags.ts`'s country list if a
  newly cited country isn't mapped to a flag yet; do NOT add a France flag,
  it was deliberately removed since every proposition is already about
  France).

## 7. Near-duplicate sweep

Large batches of additions (especially across multiple parties/sessions)
tend to create near-duplicate propositions phrased differently. Before
finishing, run a similarity scan and manually review the top matches:

```bash
python3 - << 'EOF'
import re, itertools
s = open("src/lib/data/propositions.ts").read()
blocks = re.split(r'\n  \{\n', s)[1:]
props = []
for b in blocks:
    idm = re.search(r'id:\s*"([^"]+)"', b)
    thm = re.search(r'themeId:\s*"([^"]+)"', b)
    tim = re.search(r'title:\s*"([^"]+)"', b)
    dem = re.search(r'description:\s*\n\s*"([^"]+(?:"\s*\+\s*"[^"]*)*)"', b)
    if not idm or not thm: continue
    props.append({"id": idm.group(1), "theme": thm.group(1),
                   "title": tim.group(1) if tim else "",
                   "desc": dem.group(1) if dem else ""})
STOP = set("le la les de des du un une et à au aux pour avec dans sur en par ne pas plus moins ou son sa ses leur leurs qui que est être afin faire création créer instaurer instituer favoriser permettre mettre place national nationale nouvelle nouveau".split())
def tok(t):
    t = re.sub(r"[^a-zà-ÿ0-9\s]", " ", t.lower())
    return set(w for w in t.split() if w not in STOP and len(w) > 2)
for p in props:
    p["tk"] = tok(p["title"] + " " + p["desc"])
    p["tt"] = tok(p["title"])
cands = []
for a, b in itertools.combinations(props, 2):
    if not a["tk"] or not b["tk"]: continue
    j = len(a["tk"] & b["tk"]) / len(a["tk"] | b["tk"])
    tj = len(a["tt"] & b["tt"]) / len(a["tt"] | b["tt"]) if (a["tt"] or b["tt"]) else 0
    score = max(j, tj * 0.8)
    if score >= 0.18 and len(a["tk"] & b["tk"]) >= 3:
        cands.append((score, a["id"], a["title"], b["id"], b["title"]))
cands.sort(reverse=True)
for c in cands[:60]:
    print(f"{c[0]:.2f} | {c[1]:35s} | {c[2]}")
    print(f"     | {c[3]:35s} | {c[4]}")
EOF
```

For each candidate pair, read both full entries and decide:
- **True duplicate** (same measure, different wording/party): merge into
  one entry, union the `supportingParties`, keep the richer description
  and international example, delete the other.
- **Legitimately distinct** (opposing positions on the same topic, or a
  genuinely different mechanism/severity): leave both, note why if unclear.

## 8. Finish the pass

1. `npm run lint` and `npm run build` — must both pass clean.
2. Check for duplicate ids: `grep -o 'id: "[a-z0-9-]*"' src/lib/data/propositions.ts | sort | uniq -d` must be empty.
3. Add an entry to `## [Non publié]` in `CHANGELOG.md` (see `AGENTS.md` for
   category rules: `Ajouté` for new propositions, `Modifié` for
   party-attribution corrections on existing ones).
4. Commit (English message) and push, per `AGENTS.md`'s standing rule to
   commit after each completed unit of work. Do not bump the version number
   yourself — that happens via `npm run deploy` / `scripts/bump-version.mjs`.
5. Only run `npm run deploy` (which builds + deploys to Cloudflare) if the
   user explicitly asked for a deploy in this pass, or if it's already the
   project's convention to deploy after every change — check recent commit
   history for `npm run deploy` usage to infer the expectation, and ask if
   unclear.

## Known pitfalls from past runs

- A first shallow read of long PS pages missed most of their actual content
  (each PS sub-page has multiple full chapters, not just a summary) — always
  read the entire fetched page, don't stop after the first screen.
- RN's own domain has repeatedly failed to resolve via direct `webfetch` in
  this environment (404s, transport errors) — don't burn a whole research
  pass on it; ask the user for PDFs instead.
- Web search engines (not direct URL fetches) are frequently blocked in this
  environment for research agents — always instruct delegated agents to
  prioritize direct fetches of known URLs/local files over generic search.
- Don't forget to also re-check whether a *newly identified* proposition
  might already be covered by an *existing* entry under a different
  wording — the near-duplicate sweep (step 7) is not optional busywork, it
  has caught real duplicates in every large batch so far.
