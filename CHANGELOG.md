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

### Cassant

- Suppression de la protection par mot de passe (Basic Auth) du site,
  remplacée par une vérification anti-robot Cloudflare Turnstile,
  demandée une seule fois par navigateur (valable 30 jours), pour
  ouvrir le site au public tout en limitant le pillage automatisé de
  contenu par des robots.

### Ajouté

- Une case à cocher « Masquer les mesures soutenues par un seul parti »
  sur les pages thématiques, pour se concentrer sur les propositions
  qui font débat entre plusieurs partis.

### Corrigé

- Fusion de 5 propositions quasi-identiques qui avaient été créées
  séparément sous des libellés différents (parfois par des partis
  différents) : les expulsions locatives sans relogement (PCF/LFI),
  la réautorisation des produits phytosanitaires validés dans l'UE, la
  fin des interdictions de location liées au DPE (RN/LR), la relance
  du nucléaire avec de nouveaux EPR (fusionnée avec la version
  chiffrée à 14 réacteurs), et l'obligation de police municipale dans
  les villes de plus de 10 000 habitants (RN/Renaissance).

## [1.8.0] - 2026-08-20

### Ajouté

- 75 nouvelles propositions des Républicains issues d'une lecture
  complète de 7 documents officiels du parti (nucléaire et électricité,
  agriculture, logement, intelligence artificielle, réindustrialisation
  et politique familiale), comblant un manque important sur le
  logement, l'environnement/énergie et les institutions, avec
  notamment la suppression de l'encadrement des loyers, la relance du
  nucléaire (EPR2, réacteurs 80 ans), un ministère de l'IA, ou la
  suppression de l'Office français de la biodiversité.
- 47 nouveaux exemples internationaux documentés (pays, période, bilan
  sourcé), portant leur nombre total à 93 propositions sur 206, pour
  enrichir la colonne « Déjà mis en œuvre » sur de nombreuses mesures
  qui n'en avaient pas encore.

### Corrigé

- Retiré le drapeau français de la colonne « Déjà mis en œuvre », qui
  n'apportait aucune information puisque toutes les propositions
  comparées concernent déjà la France.

## [1.7.0] - 2026-08-20

### Ajouté

- Une colonne « Déjà mis en œuvre » dans les tableaux de comparaison,
  affichant les drapeaux des pays où une mesure comparable existe déjà,
  à partir des exemples internationaux déjà documentés.
- Un lien discret ✏️ sur chaque proposition permettant de signaler
  qu'un parti la soutient (ou ne la soutient plus), via une issue
  GitHub pré-remplie avec le contexte et un espace pour indiquer la
  source — sans ajouter de sollicitation de notre serveur.
- Un avertissement en bas de chaque page thématique précisant que tous
  les programmes ne sont pas encore disponibles ou finalisés, que les
  données reflètent les sources actuellement publiées, et qu'elles
  seront mises à jour progressivement au fil de la campagne.
- 33 nouvelles propositions de Renaissance issues de deux documents
  officiels du parti (conventions thématiques « Nouvelle donne
  économique et climatique » et « Une République ferme, une France
  apaisée »), comblant un manque important sur la sécurité et
  l'immigration (système d'immigration à points inspiré du Canada,
  renforcement des polices municipales, durcissement du regroupement
  familial, etc.), ainsi que sur l'économie, l'environnement
  (relance du nucléaire EPR/SMR) et les institutions.

### Modifié

- Nouvelle vérification croisée entre partis sur l'ensemble des
  propositions existantes : ajout du PS et/ou du PCF sur plusieurs
  mesures qu'ils partagent (service public de la petite enfance, plan
  santé mentale, lutte contre la malbouffe, désescalade policière,
  réforme du Conseil de sécurité de l'ONU, pôle public du médicament,
  acte 2 de la loi SRU, objectif national des besoins de santé).
- Réduction significative des sollicitations du serveur : le site étant
  entièrement statique, les pages déjà générées sont désormais servies
  directement depuis le cache d'assets de Cloudflare plutôt que
  recalculées à chaque visite, et les fichiers immuables du site sont
  mis en cache par le navigateur sur le long terme.

## [1.6.0] - 2026-08-20

### Modifié

- Réordonné les colonnes des tableaux de comparaison des partis pour
  suivre le spectre politique de gauche à droite, avec le PCF désormais
  positionné tout à gauche.

### Ajouté

- 47 nouvelles propositions de La France Insoumise, issues d'une
  lecture intégrale des 18 chapitres du programme officiel « L'Avenir en
  commun » édition 2025 (institutions comme l'Assemblée constituante ou
  la fin du 49.3, économie avec la séparation bancaire ou le
  plafonnement des héritages, un important volet immigration
  jusqu'ici quasiment absent — droit du sol, vote des étrangers,
  Commissariat à l'égalité —, ainsi que santé, éducation, environnement,
  Europe et sécurité).
- 13 nouvelles propositions du PCF issues de ses cahiers thématiques
  officiels « Les Jours heureux », en particulier sur le logement
  (service public national du logement, acte 2 de la loi SRU, pôle
  financier public, permis de louer généralisé, garantie sociale contre
  la caution locative, etc.) et une proposition sur la sortie du
  commandement militaire intégré de l'OTAN (partagée avec LFI).

### Modifié

- Ajout de La France Insoumise sur plusieurs propositions déjà
  existantes qu'elle partage avec d'autres partis (légalisation du
  cannabis, désescalade policière et interdiction du LBD40, plafond des
  salaires en entreprise, écocide, gestion publique de l'eau, statut de
  réfugié climatique).

## [1.5.0] - 2026-08-20

### Ajouté

- Possibilité de voir ses résultats en cours de partie, sans attendre
  d'avoir répondu à toutes les propositions (bouton disponible après 15
  réponses), avec un bouton « Continuer le quiz » depuis la page de
  résultats pour reprendre et affiner son score là où on s'était arrêté.
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
