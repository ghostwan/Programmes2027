# Journal des modifications (Changelog)

Toutes les modifications notables de ce projet sont documentées dans ce fichier.

Le format est inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
et ce projet respecte le [Semantic Versioning](https://semver.org/lang/fr/)
(`MAJEUR.MINEUR.CORRECTIF`).

Catégories utilisées : `Ajouté`, `Modifié`, `Corrigé`, `Supprimé`, `Déprécié`,
`Sécurité`, `Cassant` (changement non rétrocompatible).

> Ce fichier est la source de vérité utilisée pour générer automatiquement le
> numéro de version et la page **/changelog** du site. Voir `AGENTS.md` pour
> les règles de mise à jour.

## [Non publié]

### Ajouté

- 9 nouvelles propositions issues d'une relecture complète du programme du
  Parti socialiste (mix énergétique nucléaire-renouvelable décidé par le
  Parlement, taxe Zucman, écocide, légalisation encadrée du cannabis,
  réforme du CESE en Conseil de la société civile, etc.).

### Modifié

- Ajout de partis manquants sur une vingtaine de propositions déjà
  existantes après vérification de leurs positions officielles
  (par exemple EELV et PCF sur la taxe Zucman et le barème progressif de
  l'impôt, Reconquête sur la restriction de Schengen aux Européens, le
  PCF sur l'opposition à l'accord Mercosur), afin de ne pas laisser penser
  qu'un parti s'oppose à une mesure alors que sa position n'avait
  simplement pas encore été recherchée.

## [1.4.0] - 2026-08-20

### Ajouté

- Près de 40 nouvelles propositions politiques réelles et récentes
  (2025-2026), tirées directement des sites officiels des partis (Parti
  Socialiste, La France Insoumise, Les Républicains, PCF), portant le
  total à 84 propositions comparées. Parmi les nouveautés : la taxe
  Zucman, la « Grande Sécu », le compte social unique, l'abrogation de
  Parcoursup, la règle verte constitutionnelle, et plusieurs mesures sur
  le logement, l'Europe et les institutions.

## [1.3.0] - 2026-08-20

### Ajouté

- La progression dans le jeu (ordre des propositions et réponses déjà
  données) est désormais sauvegardée automatiquement dans le navigateur :
  vous pouvez fermer l'onglet et reprendre votre partie plus tard
  exactement là où vous l'aviez laissée, avec la possibilité de
  recommencer à zéro si vous le préférez.

## [1.2.0] - 2026-08-20

### Ajouté

- Bouton « Ne sais pas » clairement identifié dans le jeu, pour ignorer une
  proposition sans qu'elle compte dans le calcul des résultats.

## [1.1.1] - 2026-08-20

### Modifié

- Dans le jeu, le détail de chaque proposition est désormais affiché
  directement dans la carte (au lieu d'un bouton « voir le détail »), avec
  un défilement interne si le texte est trop long pour l'écran.

## [1.1.0] - 2026-08-20

### Ajouté

- Mise en place d'un système de versionnage sémantique du site : numéro de
  version affiché dans le pied de page et page `/changelog` listant les
  nouveautés de chaque version.
- Le numéro de version est désormais incrémenté automatiquement avant
  chaque déploiement, en fonction des changements documentés dans ce
  fichier.

## [1.0.0] - 2026-08-20

### Ajouté

- Comparateur des propositions politiques par thématique (10 thématiques,
  45 propositions), avec vue tableau croisé sur desktop et cartes sur mobile.
- Fiches détaillées par proposition : partis soutenants, exemple
  d'application à l'étranger et évaluation factuelle des effets observés.
- Fiches partis (8 formations) avec la liste de leurs propositions
  recensées par thématique.
- Jeu à l'aveugle façon Tinder : propositions mélangées sans indiquer le
  parti, swipe tactile sur mobile (via `framer-motion`), boutons dédiés sur
  desktop, et bouton « voir le détail » avant de répondre.
- Algorithme de correspondance calculant le taux d'accord avec chaque parti
  à partir des réponses données, et un classement complet.
- Statistiques de résultats par grande thématique avec le parti le plus
  proche sur chacune.
- Protection du site par mot de passe (Basic Auth) le temps de la phase de
  développement, avec identifiants stockés en tant que secrets Cloudflare
  chiffrés.
- Déploiement du site sur Cloudflare Workers via l'adaptateur OpenNext.
