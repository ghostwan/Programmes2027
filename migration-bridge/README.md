# Pont de migration — programmes2027.ghostwan.workers.dev

Ce mini Worker (indépendant de l'app Next.js principale) est déployé sur
l'**ancien** compte Cloudflare, à l'adresse exacte
`https://programmes2027.ghostwan.workers.dev`, uniquement pour permettre
la récupération de la progression (réponses au jeu, marché des
propositions) que les anciens visiteurs avaient sauvegardée en
`localStorage` sur cette adresse, avant la migration vers
`https://2027.politique.workers.dev`.

Son unique route `/migrate` sert une page HTML minimale qui, une fois
chargée dans un `<iframe>` caché par le nouveau site, lit les clés
`localStorage` préfixées `programmes2027:` et les renvoie via
`postMessage` — uniquement vers les origines listées dans
`ALLOWED_ORIGINS` (`worker.js`).

Ne contient aucune donnée personnelle : uniquement des ids de
propositions et des réponses pour/contre/skip.

## Déploiement

```bash
cd migration-bridge
npx wrangler deploy
```

Ce Worker n'a pas vocation à être maintenu longtemps : une fois que la
grande majorité des anciens visiteurs auront eu l'occasion de migrer (ou
si le trafic sur l'ancienne adresse retombe à zéro), il pourra être
supprimé du compte Cloudflare `Ghostwan@gmail.com's Account`.
