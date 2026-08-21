<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Versionnage du projet (Semantic Versioning)

Ce projet suit le [Semantic Versioning](https://semver.org/lang/fr/)
(`MAJEUR.MINEUR.CORRECTIF`). La version affichée sur le site (footer +
page `/changelog`) provient directement du champ `version` de
`package.json`, et n'est jamais éditée à la main : elle est calculée par
`scripts/bump-version.mjs` à partir de `CHANGELOG.md`.

## Règle à appliquer après CHAQUE fonctionnalité, correction ou changement

À chaque tâche de développement terminée (nouvelle fonctionnalité,
correction de bug, changement de comportement, suppression, changement de
données, etc.), **avant de considérer le travail fini**, tu dois ajouter
une entrée dans la section `## [Non publié]` en tête de `CHANGELOG.md`.

1. Rédige l'entrée **en français**, courte et orientée utilisateur (pas de
   jargon technique interne type nom de fichier ou de commit).
2. Range-la sous le bon titre de catégorie (crée le sous-titre `### Nom`
   s'il n'existe pas encore dans la section `## [Non publié]`) :

   | Catégorie     | Quand l'utiliser                                              | Impact SemVer |
   | ------------- | --------------------------------------------------------------- | -------------- |
   | `Cassant`     | Changement qui casse une URL, une donnée ou un usage existant   | MAJEUR         |
   | `Ajouté`      | Nouvelle fonctionnalité, nouvelle page, nouvelle donnée         | MINEUR         |
   | `Modifié`     | Changement de comportement d'une fonctionnalité existante       | CORRECTIF      |
   | `Corrigé`     | Correction de bug                                                | CORRECTIF      |
   | `Supprimé`    | Retrait d'une fonctionnalité                                     | CORRECTIF*     |
   | `Déprécié`    | Fonctionnalité encore présente mais qui sera retirée plus tard  | CORRECTIF      |
   | `Sécurité`    | Correctif ou renforcement de sécurité                            | CORRECTIF      |

   \* Si une suppression casse la compatibilité (URL publique retirée,
   format de données changé, etc.), utilise `Cassant` à la place.

3. Exemple d'entrée à ajouter :

   ```md
   ## [Non publié]

   ### Ajouté

   - Ajout d'un filtre par thématique dans la page /partis.

   ### Corrigé

   - Le score de correspondance affichait un chiffre décimal mal arrondi.
   ```

4. Ne modifie **jamais** manuellement le numéro de version dans
   `package.json`, ni les entrées déjà publiées (sections `## [x.y.z] -
   date]` existantes) : elles sont figées une fois publiées.

## Comment la version est calculée et appliquée

Le script `node scripts/bump-version.mjs` :

- lit les catégories présentes sous `## [Non publié]` dans `CHANGELOG.md` ;
- en déduit automatiquement le type de bump semver le plus élevé
  nécessaire (`Cassant` → majeur, `Ajouté` → mineur, le reste →
  correctif) ;
- incrémente `package.json`, déplace le contenu de `Non publié` vers une
  nouvelle section datée `## [x.y.z] - AAAA-MM-JJ`, et réinitialise
  `Non publié` à vide ;
- ne fait rien (code de sortie 0) si `Non publié` est vide, pour ne
  jamais bloquer un déploiement sans changement à publier.

Ce script est automatiquement exécuté avant chaque déploiement :

```bash
npm run deploy
# = node scripts/bump-version.mjs && opennextjs-cloudflare build && opennextjs-cloudflare deploy
```

Tu peux aussi le lancer manuellement sans déployer :

```bash
npm run version:bump          # applique le bump
npm run version:bump -- --dry-run   # simule sans rien écrire
npm run version:bump -- --major     # force un bump majeur
```

## Commit et push après CHAQUE fonctionnalité

Une fois une fonctionnalité, un correctif ou un changement terminé (code
vérifié, changelog mis à jour, et si un déploiement a été demandé, le
`npm run deploy` effectué), tu dois **committer puis pousser** ce travail :

```bash
git add -A
git commit -m "<message en anglais>"
git push
```

Règles pour le message de commit :

- Le message de commit doit **toujours être rédigé en anglais**, même si
  le reste du projet (contenu du site, CHANGELOG.md, communication avec
  l'utilisateur) est en français.
- Message court, à l'impératif, orienté sur ce qui a changé (ex. `Add
  "don't know" option to the swipe game`, `Fix changelog page crashing on
  Cloudflare Workers`).
- Un commit par fonctionnalité/changement logique (pas de gros commit
  fourre-tout regroupant plusieurs sujets sans rapport).
- N'ajoute jamais de secrets, mots de passe ou fichiers `.env*` / `.dev.vars`
  au commit (ils sont déjà exclus par `.gitignore`).

## README et captures d'écran

À CHAQUE nouvelle fonctionnalité visible (nouvelle page, nouvelle section,
changement notable de mise en page ou de comportement d'une page déjà
documentée dans le README), tu dois aussi :

1. Mettre à jour `README.md` : ajouter ou adapter le paragraphe qui décrit
   la fonctionnalité, en français, dans le même style que le reste du
   fichier.
2. Régénérer les captures d'écran concernées avec
   `scripts/take-screenshots.mjs` :

   ```bash
   npm run dev &                                   # dans un terminal séparé
   npm install --no-save playwright                # une seule fois
   node scripts/take-screenshots.mjs
   ```

   - Si la fonctionnalité ajoute une nouvelle page/section qui mérite sa
     propre capture, ajoute une entrée correspondante dans le tableau
     `pages` (ou dans la partie dédiée en bas du script si elle nécessite
     une mise en situation, comme `marche-programme.png`) avant de lancer
     le script.
   - Les fichiers générés vont dans `public/screenshots/` et sont
     référencés dans `README.md` via des balises `![...](public/screenshots/...)`.
3. Vérifier que les nouvelles/modifiées captures reflètent bien l'état
   actuel de l'UI avant de committer (elles ne doivent jamais montrer une
   fonctionnalité obsolète ou un état vide non représentatif).

Ne saute cette étape que si le changement est purement interne (pas
d'impact visuel/UX) — dans ce cas, le README n'a pas besoin d'évoluer.

## Résumé pour un agent qui vient de terminer une tâche

1. Termine le code, vérifie `npm run lint` et `npm run build`.
2. Ajoute une entrée dans `## [Non publié]` de `CHANGELOG.md` (catégorie
   adaptée, en français, orientée utilisateur).
3. Si la fonctionnalité a un impact visuel/UX, mets à jour `README.md` et
   régénère les captures d'écran concernées via
   `scripts/take-screenshots.mjs` (voir section dédiée ci-dessus).
4. Ne touche pas au numéro de version toi-même — il sera calculé au
   prochain `npm run deploy`.
5. Committe et pousse le travail (message de commit en anglais, voir
   ci-dessus).
