import { Proposition } from "@/lib/types";

export const propositions: Proposition[] = [
  // ÉCONOMIE ET FISCALITÉ
  {
    id: "eco-isf",
    themeId: "economie",
    title: "Rétablir un impôt sur la fortune (ISF), y compris sa part financière",
    description:
      "Remplacer l'actuel impôt sur la fortune immobilière (IFI) par un impôt plus large incluant les actifs financiers, comme c'était le cas avant 2018.",
    supportingParties: ["lfi", "ps", "eelv", "pcf"],
    internationalExample: {
      country: "France (avant 2018)",
      when: "Existait jusqu'en 2017, remplacé par l'IFI",
      summary:
        "L'ISF a existé en France de 1989 à 2017 avant d'être remplacé par l'IFI, recentré sur le seul patrimoine immobilier.",
      evaluation:
        "France Stratégie (rapport 2023) montre un effet limité et contesté de la suppression sur l'investissement productif : la mesure est associée à une hausse des dividendes versés aux ménages aisés, sans preuve robuste d'un effet sur l'investissement des entreprises. Le débat reste non tranché entre économistes.",
    },
  },
  {
    id: "eco-is-baisse",
    themeId: "economie",
    title: "Baisser l'impôt sur les sociétés et alléger la fiscalité des entreprises",
    description:
      "Poursuivre la baisse du taux d'impôt sur les sociétés et réduire les charges pesant sur les entreprises pour renforcer leur compétitivité.",
    supportingParties: ["renaissance", "lr", "rn", "reconquete"],
    internationalExample: {
      country: "France (2017-2022) et Europe",
      when: "Baisse du taux de 33% à 25% entre 2017 et 2022",
      summary:
        "La France a progressivement abaissé son taux d'IS de 33,3% à 25% entre 2017 et 2022, dans un mouvement européen général de baisse des taux.",
      evaluation:
        "L'OCDE documente une convergence générale à la baisse des taux d'IS en Europe depuis 20 ans (« race to the bottom »). L'effet net sur l'attractivité du site France reste difficile à isoler d'autres facteurs économiques.",
    },
  },
  {
    id: "eco-superprofits",
    themeId: "economie",
    title: "Taxer davantage les superprofits et rentes exceptionnelles",
    description:
      "Instaurer une taxation exceptionnelle sur les profits jugés excessifs des grandes entreprises, notamment dans l'énergie.",
    supportingParties: ["lfi", "ps", "eelv", "pcf"],
    internationalExample: {
      country: "Italie, Espagne, Royaume-Uni",
      when: "2022-2023",
      summary:
        "Plusieurs pays européens ont instauré des taxes temporaires sur les superprofits des énergéticiens suite à la flambée des prix de l'énergie en 2022.",
      evaluation:
        "La Commission européenne (rapport 2023) relève des recettes réelles souvent inférieures aux prévisions et des critiques sur l'effet potentiellement dissuasif de ces taxes sur l'investissement énergétique.",
    },
  },
  {
    id: "eco-austerite",
    themeId: "economie",
    title: "Réduire la dépense publique et le nombre de fonctionnaires",
    description:
      "Diminuer le poids de la dépense publique dans le PIB et réduire les effectifs de la fonction publique pour redresser les comptes publics.",
    supportingParties: ["lr", "rn", "reconquete", "renaissance"],
    internationalExample: {
      country: "Royaume-Uni, Grèce",
      when: "Austérité post-2010 (RU) et plan de la Troïka 2010-2018 (Grèce)",
      summary:
        "Le Royaume-Uni a mené une politique d'austérité budgétaire après 2010, tandis que la Grèce a appliqué un plan d'ajustement structurel imposé par ses créanciers de 2010 à 2018.",
      evaluation:
        "Le FMI a lui-même reconnu en 2013 avoir sous-estimé les multiplicateurs budgétaires : la littérature économique documente un effet récessif à court terme plus marqué que prévu initialement pour les politiques d'austérité brutale.",
    },
  },
  {
    id: "eco-protectionnisme",
    themeId: "economie",
    title: "Instaurer un protectionnisme ciblé et favoriser les achats français/européens",
    description:
      "Mettre en place des droits de douane ciblés ou des politiques de préférence pour les produits français ou européens.",
    supportingParties: ["rn", "reconquete", "lfi", "pcf"],
    internationalExample: {
      country: "États-Unis",
      when: "2018-2019 et 2025",
      summary:
        "Les États-Unis ont instauré des droits de douane ciblés sur de nombreux produits sous les administrations Trump.",
      evaluation:
        "Des études de la Fed et du Peterson Institute montrent une hausse des prix pour les consommateurs américains et des mesures de rétorsion commerciale, avec un effet net sur l'emploi industriel contesté, globalement faible voire négatif selon la majorité des études.",
    },
  },
  {
    id: "eco-taxe-zucman",
    themeId: "economie",
    title: "Créer une taxe plancher de 2% sur les très grands patrimoines (« taxe Zucman »)",
    description:
      "Instaurer un impôt minimal annuel de 2% sur les patrimoines supérieurs à 100 millions d'euros, pour lutter contre l'optimisation fiscale des ultra-riches qui leur permet de payer proportionnellement moins d'impôts que la classe moyenne.",
    supportingParties: ["ps", "lfi", "eelv", "pcf"],
  },
  {
    id: "eco-taxe-succession",
    themeId: "economie",
    title: "Plafonner les très grosses successions reçues dans une vie",
    description:
      "Créer un impôt cumulant toutes les transmissions (héritages, donations) reçues par une même personne au cours de sa vie, avec un plafond au-delà duquel elles sont beaucoup plus taxées.",
    supportingParties: ["ps", "lfi", "eelv", "pcf"],
  },
  {
    id: "eco-bareme-progressif",
    themeId: "economie",
    title: "Rendre l'impôt sur le revenu beaucoup plus progressif",
    description:
      "Créer davantage de tranches d'imposition (jusqu'à 14 selon certains projets) et fusionner IR, CSG et CRDS en un impôt unique et plus progressif.",
    supportingParties: ["ps", "lfi", "eelv", "pcf"],
  },
  {
    id: "eco-seuil-zero-cotisation",
    themeId: "economie",
    title: "Instaurer un seuil « zéro cotisation » pour travailler plus",
    description:
      "Exonérer de cotisations sociales une tranche de revenu supplémentaire pour inciter financièrement à l'augmentation du temps de travail.",
    supportingParties: ["lr"],
  },
  {
    id: "eco-compte-social-unique",
    themeId: "economie",
    title: "Fusionner les aides sociales dans un compte social unique",
    description:
      "Regrouper les différents dispositifs d'aide sociale dans un compte unique par bénéficiaire, avec un revenu d'incitation à l'activité (RIA) pour accélérer le retour à l'emploi.",
    supportingParties: ["lr"],
  },
  {
    id: "eco-fonds-production",
    themeId: "economie",
    title: "Créer un fonds public pour réinvestir dans l'industrie française",
    description:
      "Mobiliser un fonds dédié (« Fonds France Production ») pour restaurer la souveraineté industrielle et agricole par l'investissement dans l'outil de production.",
    supportingParties: ["lr"],
  },
  {
    id: "eco-tva-verte",
    themeId: "economie",
    title: "Instaurer une TVA différenciée selon l'impact environnemental",
    description:
      "Baisser la TVA sur les produits de première nécessité et écologiques (bio, réparation), et l'augmenter sur les produits de luxe ou nocifs pour la santé et l'environnement (ultra-transformés, vols intérieurs, hôtellerie de luxe).",
    supportingParties: ["eelv"],
  },
  {
    id: "eco-exoneration-salaires",
    themeId: "economie",
    title: "Exonérer de cotisations patronales les entreprises qui augmentent les salaires",
    description:
      "Permettre aux entreprises d'augmenter les salaires de 10% (jusqu'à trois fois le SMIC) en les exonérant de la hausse des cotisations patronales pendant trois à cinq ans.",
    supportingParties: ["rn"],
  },
  {
    id: "eco-iff",
    themeId: "economie",
    title: "Remplacer l'IFI par un impôt sur la fortune financière (IFF)",
    description:
      "Supprimer l'impôt sur la fortune immobilière (IFI) et créer à la place un impôt ciblant les fortunes exclusivement financières, épargnant la conservation et la transmission du patrimoine immobilier.",
    supportingParties: ["rn"],
  },
  {
    id: "eco-cotisation-revenus-financiers",
    themeId: "economie",
    title: "Créer une cotisation sur les revenus financiers des entreprises",
    description:
      "Instaurer une cotisation sociale sur les revenus financiers des entreprises pour financer la Sécurité sociale, en complément d'une modulation à la hausse des cotisations pour celles qui suppriment des emplois.",
    supportingParties: ["pcf", "lfi"],
  },
  {
    id: "eco-renationalisation-energie",
    themeId: "economie",
    title: "Renationaliser les grandes entreprises de l'énergie",
    description:
      "Renationaliser EDF, Engie et TotalEnergies pour constituer un grand pôle public de l'énergie à 100% public, et sortir du marché européen de l'électricité.",
    supportingParties: ["pcf", "lfi"],
  },

  // TRAVAIL ET EMPLOI
  {
    id: "travail-retraites-62",
    themeId: "travail",
    title: "Abroger la réforme des retraites de 2023 et revenir à 62 ans",
    description:
      "Annuler le report de l'âge légal de départ à la retraite à 64 ans voté en 2023 et revenir à 62 ans.",
    supportingParties: ["lfi", "ps", "eelv", "pcf", "rn"],
    internationalExample: {
      country: "Allemagne, Italie, Espagne",
      when: "Réformes successives portant l'âge légal à 66-67 ans",
      summary:
        "Plusieurs voisins européens ont relevé leur âge légal de départ à la retraite au-delà de 64 ans (67 ans en Allemagne).",
      evaluation:
        "L'OCDE souligne que la France a un âge de départ effectif parmi les plus bas d'Europe. Le Conseil d'orientation des retraites (COR) publie des projections plus optimistes sur la soutenabilité du système par répartition que celles utilisées par le gouvernement en 2023.",
    },
  },
  {
    id: "travail-4jours",
    themeId: "travail",
    title: "Expérimenter ou généraliser la semaine de 4 jours",
    description:
      "Réduire le temps de travail hebdomadaire à 4 jours à salaire égal, au moins à titre expérimental.",
    supportingParties: ["lfi", "eelv", "ps"],
    internationalExample: {
      country: "Royaume-Uni, Islande, Belgique",
      when: "Islande (2015-2019), Royaume-Uni (2022, 61 entreprises), Belgique (droit à la demande, 2022)",
      summary:
        "Plusieurs pays ont mené des expérimentations pilotes de semaine de 4 jours dans des entreprises volontaires.",
      evaluation:
        "Les expérimentations pilotes (4 Day Week Global) rapportent un maintien voire une hausse de productivité et une baisse du stress. Limites méthodologiques : échantillons auto-sélectionnés, pas de généralisation démontrée à toute l'économie.",
    },
  },
  {
    id: "travail-smic",
    themeId: "travail",
    title: "Augmenter significativement le SMIC (autour de 1600€ net)",
    description:
      "Revaloriser fortement le salaire minimum pour améliorer le pouvoir d'achat des travailleurs les plus modestes.",
    supportingParties: ["lfi", "ps", "eelv", "pcf"],
    internationalExample: {
      country: "Allemagne, Royaume-Uni",
      when: "Instauration du salaire minimum allemand en 2015, hausses régulières du National Living Wage britannique",
      summary:
        "L'Allemagne a instauré un salaire minimum national en 2015, une première dans son histoire récente.",
      evaluation:
        "Les études du IAB et du DIW Berlin montrent un effet limité sur l'emploi global, avec une légère hausse des salaires bas sans destruction d'emploi massive contrairement aux craintes initiales.",
    },
  },
  {
    id: "travail-rsa-conditionnalite",
    themeId: "travail",
    title: "Conditionner le RSA à des heures d'activité ou de formation",
    description:
      "Rendre le versement du RSA conditionnel à la réalisation d'un nombre d'heures d'activité, de formation ou de recherche d'emploi.",
    supportingParties: ["renaissance", "lr"],
    internationalExample: {
      country: "Royaume-Uni, Pays-Bas",
      when: "Universal Credit (RU), conditionnalité renforcée",
      summary:
        "Le Royaume-Uni a renforcé la conditionnalité de ses aides sociales dans le cadre de la réforme du Universal Credit.",
      evaluation:
        "Les études de l'IFS (Institute for Fiscal Studies) sont mitigées : incitation à la reprise d'emploi documentée mais aussi effets de sanction pénalisant les plus vulnérables et non-recours aux droits.",
    },
  },
  {
    id: "travail-code-simplification",
    themeId: "travail",
    title: "Simplifier et assouplir le Code du travail",
    description:
      "Poursuivre la simplification du droit du travail pour donner plus de flexibilité aux entreprises dans la gestion de l'emploi.",
    supportingParties: ["renaissance", "lr", "rn"],
  },
  {
    id: "travail-35h",
    themeId: "travail",
    title: "Revenir aux 35 heures et réduire à 32h pour les métiers pénibles",
    description:
      "Rétablir 35 heures comme durée légale du travail, avec une majoration des heures supplémentaires, et abaisser à 32 heures pour les métiers pénibles ou de nuit.",
    supportingParties: ["lfi", "pcf"],
  },
  {
    id: "travail-retraite-60",
    themeId: "travail",
    title: "Abaisser l'âge de la retraite à 60 ans avec 40 annuités",
    description:
      "Aller au-delà de l'abrogation de la réforme de 2023 en fixant l'âge légal de départ à 60 ans, avec 40 annuités de cotisation pour une retraite à taux plein.",
    supportingParties: ["lfi", "eelv", "pcf"],
  },
  {
    id: "travail-plafond-salaires",
    themeId: "travail",
    title: "Plafonner l'écart des salaires dans l'entreprise (échelle 1 à 20)",
    description:
      "Limiter l'écart entre le salaire le plus bas et le salaire le plus élevé au sein d'un même groupe consolidé à un rapport de 1 à 20.",
    supportingParties: ["ps"],
  },
  {
    id: "travail-cetu",
    themeId: "travail",
    title: "Créer un compte épargne temps universel",
    description:
      "Permettre à chaque salarié de cumuler RTT, heures supplémentaires et jours de repos non pris dans un compte mobilisable librement (formation, enfants, loisirs).",
    supportingParties: ["ps"],
  },
  {
    id: "travail-secu-independants",
    themeId: "travail",
    title: "Créer une caisse de sécurité sociale pour les indépendants précaires",
    description:
      "Mettre en place un cofinancement tripartite (travailleurs, plateformes numériques, État) pour couvrir socialement les travailleurs indépendants précaires, notamment des plateformes.",
    supportingParties: ["ps"],
  },

  // IMMIGRATION
  {
    id: "immi-quotas",
    themeId: "immigration",
    title: "Instaurer des quotas migratoires votés annuellement par le Parlement",
    description:
      "Faire voter chaque année par le Parlement des quotas d'immigration par catégorie (travail, études, regroupement familial).",
    supportingParties: ["lr", "rn", "reconquete", "renaissance"],
    internationalExample: {
      country: "Canada, Australie",
      when: "Systèmes en vigueur depuis plusieurs décennies",
      summary:
        "Le Canada fixe des quotas annuels d'immigration économique ; l'Australie utilise un système à points avec quotas par catégorie.",
      evaluation:
        "L'OCDE note que ces systèmes offrent prévisibilité et pilotage économique de l'immigration, mais nécessitent une administration robuste. Le système canadien reste critiqué pour ses délais de traitement et la pression sur le logement dans les grandes villes.",
    },
  },
  {
    id: "immi-preference-nationale",
    themeId: "immigration",
    title: "Instaurer une priorité nationale pour l'emploi et les prestations sociales",
    description:
      "Réserver en priorité l'accès à certains emplois publics et prestations sociales aux ressortissants français.",
    supportingParties: ["rn", "reconquete"],
    internationalExample: {
      country: "Danemark",
      when: "Règles en vigueur",
      summary:
        "Le Danemark applique des règles restrictives d'accès aux aides sociales pour les non-résidents de longue durée, sans toutefois instaurer de préférence nationale au sens strict.",
      evaluation:
        "Les juristes français (Conseil constitutionnel, Conseil d'État) soulignent des obstacles constitutionnels et conventionnels majeurs à une préférence nationale en l'état du droit français et européen.",
    },
  },
  {
    id: "immi-droit-du-sol",
    themeId: "immigration",
    title: "Restreindre ou supprimer le droit du sol",
    description:
      "Conditionner ou supprimer l'acquisition automatique de la nationalité française par la naissance sur le territoire.",
    supportingParties: ["rn", "reconquete", "lr"],
    internationalExample: {
      country: "Irlande",
      when: "Référendum de 2004",
      summary:
        "L'Irlande a restreint son droit du sol automatique par référendum en 2004, suite à une pression migratoire perçue.",
      evaluation:
        "Le cas irlandais est documenté mais les effets démographiques à long terme sont peu étudiés de façon consensuelle. C'est une mesure rarement appliquée dans les démocraties occidentales comparables.",
    },
  },
  {
    id: "immi-regularisation",
    themeId: "immigration",
    title: "Faciliter la régularisation des travailleurs sans papiers dans les métiers en tension",
    description:
      "Simplifier les procédures de régularisation pour les travailleurs sans papiers occupant des emplois dans des secteurs en pénurie de main-d'œuvre.",
    supportingParties: ["lfi", "ps", "eelv", "renaissance", "pcf"],
    internationalExample: {
      country: "Espagne",
      when: "Régularisations massives de 2005 (« arraigo social »)",
      summary:
        "L'Espagne a mené une vaste régularisation de travailleurs sans papiers en 2005, conditionnée à un emploi et une durée de présence.",
      evaluation:
        "Des études de la Banque d'Espagne et de l'OCDE montrent une hausse des recettes de cotisations sociales et une meilleure intégration économique, sans effet d'appel massif démontré à court terme, mais le débat reste vif sur l'effet incitatif à moyen terme.",
    },
  },
  {
    id: "immi-frontex",
    themeId: "immigration",
    title: "Renforcer Frontex et le contrôle des frontières extérieures de l'UE",
    description:
      "Augmenter les moyens humains et matériels de l'agence européenne de garde-frontières et de garde-côtes.",
    supportingParties: ["renaissance", "lr", "rn", "reconquete"],
    internationalExample: {
      country: "Union européenne",
      when: "Rapport de la Cour des comptes européenne, 2021",
      summary:
        "Frontex a vu ses effectifs et son budget croître fortement depuis 2015 pour renforcer le contrôle des frontières extérieures de l'UE.",
      evaluation:
        "La Cour des comptes européenne (2021) pointe des dysfonctionnements dans le fonctionnement de l'agence et des questions sur le respect des droits fondamentaux aux frontières.",
    },
  },
  {
    id: "immi-frontex-demanteler",
    themeId: "immigration",
    title: "Démanteler Frontex au profit d'une agence de protection des migrants",
    description:
      "Remplacer l'agence européenne de garde-frontières Frontex par une nouvelle agence dédiée à la protection des droits fondamentaux et au sauvetage en mer et sur terre des personnes migrantes.",
    supportingParties: ["eelv"],
  },
  {
    id: "immi-renouvellement-auto-titres",
    themeId: "immigration",
    title: "Instaurer un renouvellement automatique des titres de séjour longue durée",
    description:
      "Simplifier drastiquement le renouvellement des cartes de séjour de longue durée et des titres étudiants, pour désengorger les préfectures et sécuriser le maintien au travail ou aux études.",
    supportingParties: ["ps", "eelv"],
  },
  {
    id: "immi-droit-travail-asile",
    themeId: "immigration",
    title: "Accorder le droit au travail immédiat dès la demande d'asile",
    description:
      "Automatiser le droit au travail dès la délivrance de l'attestation de demande d'asile, sans délai ni autorisation administrative supplémentaire.",
    supportingParties: ["eelv", "ps"],
  },
  {
    id: "immi-titre-sejour-automatique",
    themeId: "immigration",
    title: "Délivrer un titre de séjour automatique après 6 mois de CDI",
    description:
      "Automatiser la régularisation par le travail pour les personnes en CDI depuis six mois, afin de lutter contre l'exploitation des travailleurs sans papiers.",
    supportingParties: ["ps"],
  },
  {
    id: "immi-ofpra-independance",
    themeId: "immigration",
    title: "Rattacher l'OFPRA aux Affaires étrangères plutôt qu'à l'Intérieur",
    description:
      "Changer la tutelle ministérielle de l'Office français de protection des réfugiés et apatrides pour renforcer son indépendance dans l'examen des demandes d'asile.",
    supportingParties: ["ps"],
  },
  {
    id: "immi-asile-genre",
    themeId: "immigration",
    title: "Reconnaître l'orientation sexuelle et l'identité de genre comme motifs d'asile",
    description:
      "Élargir explicitement les critères de protection internationale aux persécutions fondées sur l'orientation sexuelle ou l'identité de genre.",
    supportingParties: ["ps"],
  },
  {
    id: "immi-schengen-europeens",
    themeId: "immigration",
    title: "Réserver la libre circulation Schengen aux ressortissants européens",
    description:
      "Négocier avec les partenaires européens pour restreindre la libre circulation au sein de l'espace Schengen aux seuls citoyens des pays membres de l'Union européenne.",
    supportingParties: ["rn", "reconquete"],
  },
  {
    id: "immi-asile-consulats",
    themeId: "immigration",
    title: "Rendre obligatoire le dépôt des demandes d'asile depuis l'étranger",
    description:
      "Imposer que les demandes d'asile soient déposées dans les ambassades et consulats français à l'étranger plutôt que sur le territoire national.",
    supportingParties: ["rn"],
  },
  {
    id: "immi-ame-remplacement",
    themeId: "immigration",
    title: "Remplacer l'Aide médicale d'État par une Aide d'urgence vitale",
    description:
      "Restreindre l'Aide médicale d'État (AME), qui couvre les soins des personnes en situation irrégulière, à une aide limitée aux seules urgences vitales.",
    supportingParties: ["rn"],
  },

  // SÉCURITÉ ET JUSTICE
  {
    id: "secu-effectifs",
    themeId: "securite",
    title: "Recruter massivement des policiers et gendarmes",
    description:
      "Augmenter significativement les effectifs de police et de gendarmerie sur le territoire.",
    supportingParties: ["renaissance", "lr", "rn", "reconquete", "ps"],
    internationalExample: {
      country: "États-Unis (littérature criminologique)",
      when: "Études comparatives multiples",
      summary:
        "De nombreuses études criminologiques américaines analysent le lien entre présence policière visible et taux de criminalité.",
      evaluation:
        "La littérature montre une corrélation entre présence policière visible et baisse de certains délits, mais l'effet varie fortement selon le type de criminalité concerné.",
    },
  },
  {
    id: "secu-peines-planchers",
    themeId: "securite",
    title: "Instaurer des peines planchers automatiques pour les récidivistes",
    description:
      "Rendre automatique une peine minimale pour les délinquants et criminels en état de récidive.",
    supportingParties: ["lr", "rn", "reconquete"],
    internationalExample: {
      country: "États-Unis (Californie)",
      when: "Lois « three strikes », 1994",
      summary:
        "La Californie a instauré en 1994 des lois « three strikes » imposant des peines très lourdes automatiques dès la 3e infraction.",
      evaluation:
        "Des études du RAND Corporation et du National Institute of Justice montrent un effet incertain sur la récidive, une forte hausse de la population carcérale et des coûts budgétaires importants. Plusieurs États américains ont depuis assoupli ces lois.",
    },
  },
  {
    id: "secu-prisons",
    themeId: "securite",
    title: "Construire massivement de nouvelles places de prison",
    description:
      "Augmenter significativement le nombre de places disponibles dans les établissements pénitentiaires.",
    supportingParties: ["lr", "rn", "reconquete", "renaissance"],
    internationalExample: {
      country: "France (comparaison européenne)",
      when: "Données du Conseil de l'Europe (SPACE)",
      summary:
        "La France affiche un taux de surpopulation carcérale parmi les plus élevés d'Europe selon les données du Conseil de l'Europe.",
      evaluation:
        "Le débat sur l'efficacité de l'incarcération de masse par rapport aux peines alternatives est documenté par les comparaisons avec les pays scandinaves, qui affichent des taux de récidive plus bas.",
    },
  },
  {
    id: "secu-peines-alternatives",
    themeId: "securite",
    title: "Développer les peines alternatives à l'incarcération",
    description:
      "Privilégier le travail d'intérêt général, le bracelet électronique et les mesures de réinsertion plutôt que l'emprisonnement.",
    supportingParties: ["lfi", "ps", "eelv", "pcf"],
    internationalExample: {
      country: "Suède, Norvège",
      when: "Modèle scandinave de réinsertion",
      summary:
        "La Suède et la Norvège privilégient depuis plusieurs décennies des politiques pénales axées sur la réinsertion plutôt que la punition pure.",
      evaluation:
        "Une étude comparative (Université d'Oslo, Kristoffersen 2013) documente un taux de récidive plus bas en Norvège que dans des systèmes plus punitifs, mais les différences socio-économiques et démographiques entre pays limitent la transposabilité directe.",
    },
  },
  {
    id: "secu-justice-mineurs",
    themeId: "securite",
    title: "Durcir la justice des mineurs (atténuer l'excuse de minorité)",
    description:
      "Réduire l'atténuation automatique des peines pour les mineurs délinquants afin de durcir la réponse pénale.",
    supportingParties: ["lr", "rn", "reconquete"],
  },
  {
    id: "secu-legalisation-cannabis",
    themeId: "securite",
    title: "Légaliser et encadrer strictement la production et la vente de cannabis",
    description:
      "Soumettre la légalisation du cannabis à une convention citoyenne, avec un contrôle étatique strict de sa production et de sa commercialisation, pour assécher les circuits du narcotrafic.",
    supportingParties: ["ps"],
  },
  {
    id: "secu-police-proximite",
    themeId: "securite",
    title: "Reconstruire une police de proximité territorialisée",
    description:
      "Redéployer une police de proximité visible et ancrée dans les quartiers, avec une régionalisation des orientations stratégiques du ministère de l'Intérieur.",
    supportingParties: ["ps"],
  },
  {
    id: "secu-recepisse",
    themeId: "securite",
    title: "Instaurer un récépissé lors des contrôles d'identité",
    description:
      "Remettre un document systématique lors de chaque contrôle d'identité pour lutter contre les contrôles discriminatoires (« au faciès »).",
    supportingParties: ["ps", "lfi", "eelv"],
  },
  {
    id: "secu-doctrine-maintien-ordre",
    themeId: "securite",
    title: "Adopter une nouvelle doctrine de maintien de l'ordre fondée sur la désescalade",
    description:
      "Interdire les lanceurs de balles de défense (LBD40), encadrer strictement la vidéosurveillance et fonder l'action des forces de l'ordre sur le dialogue et la désescalade plutôt que la confrontation systématique.",
    supportingParties: ["eelv"],
  },
  {
    id: "secu-legitime-defense",
    themeId: "securite",
    title: "Instaurer une présomption de légitime défense pour les forces de l'ordre",
    description:
      "Créer une présomption légale de légitime défense en faveur des policiers et gendarmes ayant fait usage de leur arme dans l'exercice de leurs fonctions.",
    supportingParties: ["rn"],
  },
  {
    id: "secu-police-municipale-obligatoire",
    themeId: "securite",
    title: "Rendre obligatoire une police municipale dans les communes de plus de 10 000 habitants",
    description:
      "Imposer aux communes de plus de 10 000 habitants la création d'une police municipale, pour renforcer la présence de forces de l'ordre de proximité.",
    supportingParties: ["rn"],
  },

  // ÉDUCATION
  {
    id: "edu-traditionnel",
    themeId: "education",
    title: "Revenir à des méthodes plus traditionnelles (uniforme, notation stricte, autorité)",
    description:
      "Réintroduire l'uniforme scolaire, une notation plus stricte et davantage d'autorité dans les établissements.",
    supportingParties: ["lr", "rn", "reconquete"],
    internationalExample: {
      country: "Royaume-Uni",
      when: "Uniforme généralisé depuis longtemps",
      summary:
        "Le port de l'uniforme est généralisé dans les écoles britanniques depuis de nombreuses décennies.",
      evaluation:
        "Une revue de littérature de l'Institute of Education de Londres montre des résultats peu concluants sur l'effet de l'uniforme sur les résultats scolaires : effet surtout social et disciplinaire rapporté, pas d'effet démontré robuste sur les résultats académiques.",
    },
  },
  {
    id: "edu-salaires-enseignants",
    themeId: "education",
    title: "Revaloriser significativement le salaire des enseignants",
    description:
      "Augmenter fortement la rémunération des enseignants pour rendre le métier plus attractif.",
    supportingParties: ["lfi", "ps", "eelv", "pcf", "renaissance", "rn"],
    internationalExample: {
      country: "Finlande, Corée du Sud",
      when: "Comparaison OCDE",
      summary:
        "Le rapport « Regards sur l'éducation » de l'OCDE montre que la France a un salaire enseignant inférieur à la moyenne OCDE en début de carrière.",
      evaluation:
        "Une corrélation positive entre rémunération et attractivité du métier enseignant est documentée dans plusieurs pays comme la Finlande et la Corée du Sud.",
    },
  },
  {
    id: "edu-effectifs-classe",
    themeId: "education",
    title: "Réduire le nombre d'élèves par classe",
    description:
      "Diminuer les effectifs par classe, en particulier dans les zones prioritaires, pour améliorer les conditions d'apprentissage.",
    supportingParties: ["lfi", "ps", "eelv", "pcf", "rn"],
    internationalExample: {
      country: "France (REP/REP+)",
      when: "Classes dédoublées depuis 2017",
      summary:
        "La France a dédoublé les classes de CP/CE1 en réseau d'éducation prioritaire (REP/REP+) à partir de 2017.",
      evaluation:
        "Les évaluations de la DEPP (ministère de l'Éducation nationale) montrent un effet positif mesurable en CP/CE1 en zones prioritaires, notamment en français et mathématiques, plus marqué pour les élèves les plus fragiles.",
    },
  },
  {
    id: "edu-prive-libre-choix",
    themeId: "education",
    title: "Développer l'enseignement privé sous contrat et le libre choix de l'école",
    description:
      "Faciliter l'accès à l'enseignement privé sous contrat et renforcer la liberté de choix de l'établissement scolaire.",
    supportingParties: ["lr", "renaissance", "rn"],
    internationalExample: {
      country: "Suède",
      when: "Système de chèque éducation depuis 1992",
      summary:
        "La Suède a instauré en 1992 un système de « chèque éducation » (vouchers) permettant de financer librement des écoles privées avec des fonds publics.",
      evaluation:
        "Les études suédoises (Böhlmark & Lindahl) montrent des résultats mitigés : légère amélioration des résultats moyens mais creusement des inégalités entre établissements et ségrégation scolaire accrue.",
    },
  },
  {
    id: "edu-autonomie-etablissements",
    themeId: "education",
    title: "Renforcer l'autonomie des établissements scolaires",
    description:
      "Donner davantage de marge de manœuvre aux chefs d'établissement dans la gestion pédagogique et administrative.",
    supportingParties: ["renaissance", "lr"],
    internationalExample: {
      country: "Comparaisons OCDE (PISA)",
      when: "Enquêtes PISA successives",
      summary:
        "L'OCDE compare régulièrement les degrés d'autonomie des établissements scolaires entre pays via l'enquête PISA.",
      evaluation:
        "Les comparaisons PISA montrent une corrélation complexe : l'autonomie seule n'améliore les résultats que lorsqu'elle est associée à une reddition de comptes (« accountability ») robuste.",
    },
  },
  {
    id: "edu-parcoursup",
    themeId: "education",
    title: "Abroger Parcoursup au profit d'une procédure nationale transparente",
    description:
      "Remplacer la plateforme Parcoursup par un système d'affectation dans l'enseignement supérieur unique, public et dont les critères sont pleinement transparents.",
    supportingParties: ["ps", "lfi", "pcf"],
  },
  {
    id: "edu-choc-savoirs",
    themeId: "education",
    title: "Abroger les groupes de niveau au collège (« choc des savoirs »)",
    description:
      "Revenir sur la réforme instaurant des groupes de niveau en français et mathématiques au collège, pour retrouver des classes hétérogènes.",
    supportingParties: ["lfi", "eelv", "pcf"],
  },
  {
    id: "edu-gratuite-cantines",
    themeId: "education",
    title: "Étendre la gratuité scolaire aux cantines, transports et fournitures",
    description:
      "Élargir la gratuité de l'école au-delà de l'enseignement lui-même : cantines, transports scolaires, manuels et fournitures.",
    supportingParties: ["lfi", "pcf"],
  },
  {
    id: "edu-repas-1e",
    themeId: "education",
    title: "Instaurer un repas à 1€ dans toutes les cantines scolaires",
    description:
      "Plafonner le prix d'un repas à la cantine à 1 euro pour l'ensemble des élèves, quel que soit leur établissement.",
    supportingParties: ["pcf"],
  },
  {
    id: "edu-allocation-autonomie",
    themeId: "education",
    title: "Créer une allocation d'autonomie pour les étudiants",
    description:
      "Verser une allocation mensuelle aux étudiants pour financer leurs études, sous conditions de ressources pour certains partis ou de façon universelle pour d'autres.",
    supportingParties: ["ps", "pcf"],
  },
  {
    id: "edu-brevet-orientation",
    themeId: "education",
    title: "Faire du brevet un examen d'orientation post-3e",
    description:
      "Transformer le diplôme national du brevet en examen d'orientation déterminant, selon les résultats, l'orientation vers l'enseignement général, professionnel ou l'apprentissage, en rupture avec le collège unique.",
    supportingParties: ["rn"],
  },

  // SANTÉ
  {
    id: "sante-recrutement-soignants",
    themeId: "sante",
    title: "Recruter massivement du personnel soignant et revaloriser les salaires infirmiers",
    description:
      "Augmenter les effectifs hospitaliers et revaloriser les rémunérations du personnel soignant.",
    supportingParties: ["lfi", "ps", "eelv", "pcf", "renaissance"],
    internationalExample: {
      country: "Comparaison OCDE",
      when: "Ségur de la santé, 2020",
      summary:
        "La France a engagé une revalorisation via le « Ségur de la santé » en 2020, avec des hausses salariales pour les soignants hospitaliers.",
      evaluation:
        "La France se situe dans la moyenne OCDE pour le nombre de médecins par habitant mais souffre de fortes disparités territoriales (déserts médicaux), documenté par la DREES.",
    },
  },
  {
    id: "sante-deserts-medicaux",
    themeId: "sante",
    title: "Lutter contre les déserts médicaux par la coercition à l'installation",
    description:
      "Imposer des restrictions à l'installation de nouveaux médecins dans les zones déjà bien dotées pour favoriser les zones sous-dotées.",
    supportingParties: ["ps", "eelv", "lfi", "pcf"],
    internationalExample: {
      country: "Allemagne, Québec",
      when: "Limitation d'installation dans certaines zones",
      summary:
        "L'Allemagne et le Québec appliquent des restrictions d'installation des médecins dans les zones jugées suffisamment dotées.",
      evaluation:
        "Les études sont mitigées : l'exemple allemand montre une efficacité limitée de la coercition seule, sans mesures incitatives complémentaires fortes (rémunération, conditions de travail).",
    },
  },
  {
    id: "sante-formation-medecins",
    themeId: "sante",
    title: "Poursuivre l'augmentation des capacités de formation de médecins",
    description:
      "Continuer à augmenter le nombre de places en études de médecine après la suppression du numerus clausus.",
    supportingParties: ["lfi", "ps", "eelv", "renaissance", "rn"],
    internationalExample: {
      country: "France",
      when: "Suppression du numerus clausus votée en 2019",
      summary:
        "La France a supprimé le numerus clausus en 2019 pour augmenter le nombre de médecins formés.",
      evaluation:
        "L'effet à long terme prendra 10 à 15 ans avant d'être pleinement mesurable, compte tenu de la durée des études de médecine ; pas encore d'évaluation d'impact disponible en France.",
    },
  },
  {
    id: "sante-100-sante",
    themeId: "sante",
    title: "Élargir la gratuité des soins dentaires, optiques et auditifs (« 100% santé »)",
    description:
      "Étendre le dispositif de prise en charge intégrale de certains équipements de santé (dentaire, optique, audio).",
    supportingParties: ["lfi", "ps", "eelv", "pcf", "renaissance"],
    internationalExample: {
      country: "France",
      when: "Dispositif « 100% santé » depuis 2021",
      summary:
        "Le dispositif « 100% santé », mis en place sous les gouvernements Macron, permet un reste à charge nul sur certains équipements dentaires, optiques et auditifs.",
      evaluation:
        "Le bilan de la DREES et de l'Assurance Maladie montre une hausse sensible du recours aux soins dentaires et auditifs depuis 2021, avec un coût pour l'Assurance Maladie plus élevé que prévu initialement.",
    },
  },
  {
    id: "sante-t2a",
    themeId: "sante",
    title: "Réduire le poids de la tarification à l'activité (T2A) dans le financement des hôpitaux",
    description:
      "Diminuer la part du financement hospitalier basée sur le volume d'actes réalisés au profit d'un financement plus forfaitaire.",
    supportingParties: ["lfi", "ps", "eelv", "pcf", "rn"],
    internationalExample: {
      country: "Angleterre (NHS)",
      when: "Financement par blocs",
      summary:
        "Le NHS britannique utilise un financement par blocs plus que par activité pure comparé au système français.",
      evaluation:
        "La littérature en économie de la santé de l'OCDE documente que la T2A pure encourage le volume d'actes mais peut négliger la qualité et la prise en charge des pathologies chroniques complexes.",
    },
  },
  {
    id: "sante-grande-secu",
    themeId: "sante",
    title: "Créer une « Grande Sécu » remboursant les soins à 100%",
    description:
      "Fusionner l'Assurance maladie et les complémentaires santé pour un panier de soins essentiels intégralement remboursé, sans reste à charge.",
    supportingParties: ["ps", "lfi", "pcf"],
  },
  {
    id: "sante-prevention",
    themeId: "sante",
    title: "Doubler la part de la prévention dans les dépenses de santé",
    description:
      "Porter la part consacrée à la prévention (cancer, maladies cardiovasculaires, vaccination) de 4% à 8% des dépenses de santé.",
    supportingParties: ["ps"],
  },
  {
    id: "sante-onbam",
    themeId: "sante",
    title: "Remplacer l'ONDAM par un objectif national des besoins (ONBAM)",
    description:
      "Changer la logique de pilotage budgétaire de la santé pour partir des besoins de la population plutôt que d'une enveloppe budgétaire fermée fixée à l'avance.",
    supportingParties: ["lfi"],
  },
  {
    id: "sante-medicament-unite",
    themeId: "sante",
    title: "Vendre les médicaments à l'unité pour lutter contre les pénuries",
    description:
      "Autoriser la vente de médicaments à l'unité en pharmacie afin de réduire le gaspillage et de mieux faire face aux pénuries.",
    supportingParties: ["rn"],
  },
  {
    id: "sante-ars-suppression",
    themeId: "sante",
    title: "Supprimer les Agences régionales de santé (ARS)",
    description:
      "Supprimer les ARS pour réduire le poids administratif pesant sur les hôpitaux et réaffirmer l'autorité directe de l'État dans le pilotage du système de santé.",
    supportingParties: ["rn"],
  },
  {
    id: "sante-moratoire-lits",
    themeId: "sante",
    title: "Instaurer un moratoire sur la suppression de lits à l'hôpital public",
    description:
      "Geler toute nouvelle fermeture de lits dans les hôpitaux publics face à la réduction continue des capacités depuis plusieurs décennies.",
    supportingParties: ["rn"],
  },

  // ENVIRONNEMENT ET ÉNERGIE
  {
    id: "env-nucleaire-relance",
    themeId: "environnement",
    title: "Relancer le nucléaire et construire de nouveaux EPR",
    description:
      "Construire de nouveaux réacteurs nucléaires pour sécuriser l'approvisionnement électrique et décarboner le mix énergétique.",
    supportingParties: ["renaissance", "lr", "rn", "reconquete", "pcf"],
    internationalExample: {
      country: "France",
      when: "Parc nucléaire existant, environ 70% du mix électrique",
      summary:
        "La France dispose du parc nucléaire le plus important d'Europe, représentant environ 70% de son mix électrique.",
      evaluation:
        "La Cour des comptes française pointe des dérives récurrentes de coûts et de délais sur les nouveaux EPR (Flamanville). À l'inverse, l'AIE crédite le nucléaire d'un bilan carbone très favorable comparé aux énergies fossiles.",
    },
  },
  {
    id: "env-nucleaire-sortie",
    themeId: "environnement",
    title: "Réduire la part du nucléaire dans le mix énergétique",
    description:
      "Diminuer progressivement la dépendance au nucléaire au profit des énergies renouvelables.",
    supportingParties: ["eelv"],
    internationalExample: {
      country: "Allemagne",
      when: "Sortie complète du nucléaire en 2023 (Atomausstieg)",
      summary:
        "L'Allemagne a fermé son dernier réacteur nucléaire en 2023, achevant une sortie du nucléaire engagée après Fukushima en 2011.",
      evaluation:
        "L'Agence internationale de l'énergie documente une hausse du recours au charbon dans les années suivant les premières fermetures post-Fukushima et une hausse des émissions de CO2 du secteur électrique allemand, bien que les renouvelables se soient parallèlement fortement développées.",
    },
  },
  {
    id: "env-taxe-carbone",
    themeId: "environnement",
    title: "Renforcer la fiscalité écologique et la taxe carbone",
    description:
      "Augmenter la taxation du carbone pour inciter à la réduction des émissions, avec des compensations sociales pour les ménages modestes.",
    supportingParties: ["eelv", "ps", "lfi"],
    internationalExample: {
      country: "Suède",
      when: "Taxe carbone depuis 1991",
      summary:
        "La Suède applique depuis 1991 une des taxes carbone les plus élevées au monde.",
      evaluation:
        "Le National Institute of Economic Research suédois montre une réduction significative des émissions du secteur transport sans effet récessif majeur documenté sur l'économie globale, contrairement aux craintes initiales.",
    },
  },
  {
    id: "env-renouvelables",
    themeId: "environnement",
    title: "Développer massivement les énergies renouvelables (éolien, solaire)",
    description:
      "Accélérer fortement le déploiement de l'éolien et du solaire dans le mix électrique français.",
    supportingParties: ["eelv", "lfi", "ps", "renaissance"],
    internationalExample: {
      country: "Allemagne, Danemark",
      when: "Energiewende (Allemagne), développement de l'éolien (Danemark)",
      summary:
        "L'Allemagne a mené une transition énergétique ambitieuse (Energiewende) et le Danemark est un leader mondial de l'éolien.",
      evaluation:
        "L'Allemagne a atteint des taux élevés de renouvelables dans l'électricité mais avec des prix de l'électricité parmi les plus élevés d'Europe (Eurostat) et des besoins de flexibilité et de stockage encore non résolus.",
    },
  },
  {
    id: "env-mix-nucleaire-renouvelable-parlement",
    themeId: "environnement",
    title: "Décider du mix énergétique nucléaire-renouvelable par un débat parlementaire",
    description:
      "Faire décider le mix énergétique par le Parlement sur la base d'un débat associant citoyens, associations et collectivités, en s'appuyant sur un parc nucléaire historique partiellement renouvelé et le développement des renouvelables (« le nucléaire autant que nécessaire, les renouvelables autant que possible »), en sécurisant l'approvisionnement en uranium et en finançant la recherche sur la fusion nucléaire.",
    supportingParties: ["ps"],
  },
  {
    id: "env-ecocide",
    themeId: "environnement",
    title: "Reconnaître le crime d'écocide en droit pénal français",
    description:
      "Créer un crime d'écocide sanctionnant les atteintes les plus graves et intentionnelles à l'environnement, avec un parquet environnemental spécialisé.",
    supportingParties: ["ps"],
  },
  {
    id: "env-mercosur",
    themeId: "environnement",
    title: "S'opposer à l'accord de libre-échange Mercosur",
    description:
      "Refuser la ratification de l'accord commercial entre l'Union européenne et les pays du Mercosur, jugé nuisible à l'agriculture et l'environnement.",
    supportingParties: ["lfi", "eelv", "ps", "rn", "reconquete", "lr", "pcf"],
    internationalExample: {
      country: "Union européenne / Mercosur",
      when: "Accord signé fin 2024, ratification incertaine",
      summary:
        "L'accord UE-Mercosur a été signé politiquement fin 2024 mais sa ratification par les parlements nationaux reste incertaine.",
      evaluation:
        "Le débat est toujours en cours ; il n'y a pas encore de recul suffisant pour une évaluation d'impact réel de cet accord.",
    },
  },
  {
    id: "env-pfas",
    themeId: "environnement",
    title: "Interdire tous les PFAS (polluants éternels) d'ici 2030",
    description:
      "Fixer un calendrier précis d'interdiction totale des PFAS, avec dépistage systématique et création d'un fonds public de dépollution.",
    supportingParties: ["ps"],
  },
  {
    id: "env-regle-verte",
    themeId: "environnement",
    title: "Inscrire une « règle verte » dans la Constitution",
    description:
      "Constitutionnaliser le principe de ne pas prélever sur la nature plus que ce qu'elle peut reconstituer, ni y rejeter plus qu'elle ne peut supporter.",
    supportingParties: ["lfi"],
  },
  {
    id: "env-crime-climatique",
    themeId: "environnement",
    title: "Créer un délit de dissimulation d'émissions carbone",
    description:
      "Sanctionner pénalement les entreprises qui trompent sciemment sur leurs émissions de gaz à effet de serre réelles.",
    supportingParties: ["lfi"],
  },
  {
    id: "env-moratoire-eolien",
    themeId: "environnement",
    title: "Décréter un moratoire sur l'éolien et le solaire subventionnés",
    description:
      "Suspendre toutes les subventions à l'éolien et au solaire, et démanteler progressivement les parcs éoliens arrivant en fin de vie.",
    supportingParties: ["rn"],
    internationalExample: {
      country: "Comparaisons internationales sur les moratoires éoliens",
      when: "Débats similaires dans plusieurs régions allemandes et au Royaume-Uni",
      summary:
        "Plusieurs territoires ont ponctuellement instauré des moratoires locaux sur l'implantation de nouvelles éoliennes, sans aller jusqu'au démantèlement de parcs existants.",
      evaluation:
        "Les études sur ces moratoires (Allemagne, Royaume-Uni) documentent un ralentissement des investissements dans les renouvelables et un report de la décarbonation, sans qu'un cas de démantèlement à grande échelle de parcs en fonctionnement n'ait été observé à ce jour dans un grand pays européen.",
    },
  },
  {
    id: "env-dpe-abroger",
    themeId: "environnement",
    title: "Abroger les obligations et interdictions liées au DPE",
    description:
      "Supprimer les interdictions de mise en location liées au Diagnostic de Performance Énergétique (DPE) et les obligations de travaux associées, au profit d'un accompagnement non contraignant.",
    supportingParties: ["rn"],
  },
  {
    id: "env-gratuite-transports",
    themeId: "environnement",
    title: "Rendre les transports en commun gratuits",
    description:
      "Généraliser la gratuité des transports collectifs publics sur l'ensemble du territoire, financée par la dépense publique.",
    supportingParties: ["pcf"],
  },

  // EUROPE ET INTERNATIONAL
  {
    id: "europe-frexit",
    themeId: "europe",
    title: "Sortir de l'Union européenne (« Frexit »)",
    description:
      "Organiser un référendum sur la sortie de la France de l'Union européenne.",
    supportingParties: ["reconquete"],
    internationalExample: {
      country: "Royaume-Uni",
      when: "Brexit effectif en janvier 2020",
      summary:
        "Le Royaume-Uni a quitté l'Union européenne suite au référendum de 2016, avec une sortie effective en janvier 2020.",
      evaluation:
        "Des études convergentes (Office for Budget Responsibility britannique, London School of Economics, Bank of England) montrent un impact négatif net sur le commerce extérieur et le PIB britannique à moyen terme, avec des effets bureaucratiques et des pénuries ponctuelles documentées. Le débat persiste sur l'ampleur exacte de l'effet par rapport à d'autres chocs comme le COVID.",
    },
  },
  {
    id: "europe-desobeissance-budgetaire",
    themeId: "europe",
    title: "Renégocier ou désobéir aux règles budgétaires européennes",
    description:
      "Refuser d'appliquer certaines règles budgétaires européennes jugées trop contraignantes et renégocier les traités.",
    supportingParties: ["lfi", "pcf", "rn"],
    internationalExample: {
      country: "Grèce",
      when: "Référendum « Oxi », 2015",
      summary:
        "La Grèce a testé en 2015 une confrontation avec la troïka de ses créanciers via un référendum rejetant les conditions du plan d'aide, avant d'accepter finalement un nouveau plan sous conditions strictes.",
      evaluation:
        "Il n'existe pas de précédent de « désobéissance » pleinement assumée et durable au sein de l'UE ; l'épisode grec de 2015 s'est soldé par un recul du gouvernement face à la pression des créanciers.",
    },
  },
  {
    id: "europe-federalisme",
    themeId: "europe",
    title: "Faire un saut fédéral européen",
    description:
      "Partager davantage de compétences entre États et Union européenne, en remplaçant les droits de veto nationaux par la majorité qualifiée sur les droits fondamentaux, la protection sociale et la politique étrangère commune.",
    supportingParties: ["eelv"],
  },
  {
    id: "europe-defense-commune",
    themeId: "europe",
    title: "Renforcer la défense européenne commune et l'autonomie stratégique",
    description:
      "Développer des capacités militaires communes au niveau européen pour réduire la dépendance vis-à-vis des États-Unis.",
    supportingParties: ["renaissance", "ps", "eelv", "lr"],
    internationalExample: {
      country: "Union européenne / OTAN",
      when: "Renforcé depuis la guerre en Ukraine (2022)",
      summary:
        "Le sujet de l'autonomie stratégique européenne a été relancé depuis le déclenchement de la guerre en Ukraine en 2022.",
      evaluation:
        "Les rapports de l'IFRI et de la Fondation Robert Schuman montrent que l'OTAN reste le cadre de référence principal pour la majorité des experts en défense, l'autonomie européenne restant largement à construire.",
    },
  },
  {
    id: "europe-sortie-otan",
    themeId: "europe",
    title: "Sortir du commandement militaire intégré de l'OTAN",
    description:
      "Quitter le commandement militaire intégré de l'OTAN pour bâtir un système de sécurité collective proprement européen, tout en maintenant une dissuasion nucléaire française strictement indépendante.",
    supportingParties: ["pcf", "lfi"],
  },
  {
    id: "europe-soutien-ukraine",
    themeId: "europe",
    title: "Maintenir un soutien fort, y compris militaire, à l'Ukraine",
    description:
      "Poursuivre et renforcer l'aide militaire, financière et humanitaire à l'Ukraine face à l'agression russe.",
    supportingParties: ["renaissance", "ps", "eelv", "lr"],
  },
  {
    id: "europe-pac",
    themeId: "europe",
    title: "Réformer la PAC pour mieux protéger les agriculteurs français",
    description:
      "Renégocier la Politique agricole commune pour offrir davantage de protection aux agriculteurs français face à la concurrence internationale.",
    supportingParties: ["lr", "rn", "ps", "lfi", "reconquete"],
    internationalExample: {
      country: "Union européenne",
      when: "Critiques récurrentes de la Cour des comptes européenne",
      summary:
        "La PAC fait l'objet de critiques récurrentes sur son efficacité environnementale et la répartition de ses aides.",
      evaluation:
        "La Cour des comptes européenne relève une répartition inégale des aides entre grandes et petites exploitations et une efficacité environnementale jugée insuffisante.",
    },
  },
  {
    id: "europe-avoirs-russes",
    themeId: "europe",
    title: "Saisir les avoirs russes gelés pour financer l'Ukraine",
    description:
      "Utiliser les avoirs de la Banque centrale russe gelés en Europe pour financer l'aide à la reconstruction et à la défense de l'Ukraine.",
    supportingParties: ["ps"],
  },
  {
    id: "europe-suspension-israel",
    themeId: "europe",
    title: "Suspendre l'accord d'association UE-Israël",
    description:
      "Suspendre l'accord commercial préférentiel entre l'Union européenne et Israël en réponse à la situation dans les territoires palestiniens.",
    supportingParties: ["ps"],
  },

  // INSTITUTIONS ET DÉMOCRATIE
  {
    id: "inst-cour-constitutionnelle",
    themeId: "institutions",
    title: "Transformer le Conseil constitutionnel en véritable Cour constitutionnelle",
    description:
      "Réformer le Conseil constitutionnel pour en faire une Cour constitutionnelle dont les membres seraient approuvés à la majorité qualifiée des commissions parlementaires, en supprimant la présence de droit des anciens présidents de la République.",
    supportingParties: ["eelv"],
  },
  {
    id: "inst-6e-republique",
    themeId: "institutions",
    title: "Passer à une VIe République plus parlementaire",
    description:
      "Rédiger une nouvelle Constitution instaurant un régime plus parlementaire, réduisant les pouvoirs du président de la République.",
    supportingParties: ["lfi", "eelv", "pcf"],
    internationalExample: {
      country: "Allemagne, Espagne (référence théorique)",
      when: "Régimes parlementaires existants",
      summary:
        "Les régimes parlementaires allemand et espagnol sont parfois cités en référence pour un système plus équilibré entre exécutif et Parlement.",
      evaluation:
        "Aucune évaluation empirique directe n'est possible puisque le projet n'a pas été mis en œuvre en France ; le débat reste théorique sur les mérites comparés des régimes parlementaires et semi-présidentiels (littérature de science politique, Linz, « The Perils of Presidentialism »).",
    },
  },
  {
    id: "inst-ric",
    themeId: "institutions",
    title: "Instaurer un référendum d'initiative citoyenne (RIC)",
    description:
      "Permettre aux citoyens de déclencher un référendum national sur toute question, à condition de réunir un certain nombre de signatures.",
    supportingParties: ["lfi", "rn", "reconquete", "pcf", "eelv", "ps"],
    internationalExample: {
      country: "Suisse, États-Unis (Californie)",
      when: "Démocratie directe suisse, référendums d'initiative californiens",
      summary:
        "La Suisse pratique une démocratie directe très développée avec des votations fréquentes ; certains États américains comme la Californie permettent des référendums d'initiative populaire.",
      evaluation:
        "Le cas suisse est documenté comme stable et associé à une forte légitimité perçue des décisions, mais avec un taux de participation aux votations parfois faible. Le cas californien est souvent cité pour ses effets pervers, comme les blocages budgétaires liés à des référendums contradictoires (Proposition 13 sur la fiscalité locale, 1978).",
    },
  },
  {
    id: "inst-cese-citoyens",
    themeId: "institutions",
    title: "Transformer le CESE en Conseil de la société civile avec des citoyens tirés au sort",
    description:
      "Réformer le Conseil économique, social et environnemental pour y intégrer un collège de citoyens tirés au sort, pivot d'un futur droit de référendum d'initiative citoyenne.",
    supportingParties: ["ps"],
  },
  {
    id: "inst-non-cumul",
    themeId: "institutions",
    title: "Renforcer le non-cumul des mandats dans le temps",
    description:
      "Limiter le nombre de mandats successifs qu'un même élu peut exercer.",
    supportingParties: ["lfi", "eelv", "ps", "renaissance"],
  },
  {
    id: "inst-proportionnelle",
    themeId: "institutions",
    title: "Instaurer la proportionnelle aux élections législatives",
    description:
      "Remplacer tout ou partie du scrutin majoritaire actuel par un scrutin proportionnel pour mieux représenter la diversité des opinions politiques.",
    supportingParties: ["rn", "reconquete", "lfi", "eelv", "pcf", "ps"],
    internationalExample: {
      country: "Allemagne, Italie",
      when: "Scrutin proportionnel mixte (Allemagne)",
      summary:
        "L'Allemagne utilise un scrutin proportionnel mixte avec un seuil électoral de 5%, tandis que l'Italie a une longue histoire de scrutin proportionnel.",
      evaluation:
        "La littérature de science politique associe la proportionnelle à une meilleure représentation de la diversité des opinions mais aussi à une plus grande instabilité gouvernementale potentielle (cas italien historique, IIIe/IVe République française). Le cas allemand montre qu'un seuil électoral permet de limiter la fragmentation.",
    },
  },
  {
    id: "inst-reduction-parlementaires",
    themeId: "institutions",
    title: "Réduire le nombre de parlementaires",
    description:
      "Diminuer le nombre de députés et de sénateurs pour réduire le coût et simplifier le fonctionnement des institutions.",
    supportingParties: ["renaissance", "lr", "rn"],
  },
  {
    id: "inst-defenseur-laicite",
    themeId: "institutions",
    title: "Créer un Défenseur de la laïcité",
    description:
      "Instaurer une nouvelle autorité indépendante, rattachée au Défenseur des droits, chargée de veiller au respect du principe de laïcité.",
    supportingParties: ["ps"],
  },
  {
    id: "inst-fonctionnaires-500k",
    themeId: "institutions",
    title: "Recruter 500 000 fonctionnaires supplémentaires",
    description:
      "Renforcer significativement les effectifs des services publics (éducation, santé, justice, administration) par un plan pluriannuel de recrutement.",
    supportingParties: ["pcf"],
  },
  {
    id: "inst-referendum-constitution",
    themeId: "institutions",
    title: "Réserver au peuple seul le pouvoir de modifier la Constitution",
    description:
      "Retirer au Parlement réuni en Congrès la possibilité de réviser la Constitution, pour réserver cette compétence exclusivement au référendum populaire.",
    supportingParties: ["rn"],
  },
  {
    id: "inst-primaute-constitution",
    themeId: "institutions",
    title: "Inscrire la primauté de la Constitution sur le droit international",
    description:
      "Modifier la Constitution pour affirmer qu'aucun engagement international, règle de droit international ou décision d'une juridiction internationale ne peut remettre en cause la Constitution française.",
    supportingParties: ["rn"],
    internationalExample: {
      country: "Pologne",
      when: "Arrêt du Tribunal constitutionnel polonais, octobre 2021",
      summary:
        "Le Tribunal constitutionnel polonais a jugé en 2021 que certaines dispositions des traités européens étaient incompatibles avec la Constitution polonaise, affirmant la primauté du droit national.",
      evaluation:
        "Cette décision a provoqué une crise majeure avec l'Union européenne (gel de fonds européens, procédures d'infraction) et une controverse sur l'indépendance de la justice polonaise ; les juristes européens soulignent le risque d'affaiblissement de la sécurité juridique et des droits garantis par les traités en cas de généralisation de ce type de primauté nationale.",
    },
  },

  // LOGEMENT
  {
    id: "log-encadrement-loyers",
    themeId: "logement",
    title: "Renforcer et généraliser l'encadrement des loyers",
    description:
      "Étendre l'encadrement des loyers à davantage de villes et le rendre plus strict dans les zones tendues.",
    supportingParties: ["lfi", "ps", "eelv", "pcf"],
    internationalExample: {
      country: "Allemagne (Berlin)",
      when: "Mietpreisbremse depuis 2015, Mietendeckel à Berlin 2020 (annulé en 2021)",
      summary:
        "L'Allemagne applique un « frein aux loyers » (Mietpreisbremse) depuis 2015 ; Berlin avait instauré un plafonnement plus strict (Mietendeckel) en 2020, annulé par la Cour constitutionnelle en 2021.",
      evaluation:
        "Les études du DIW Berlin montrent un ralentissement de la hausse des loyers dans les zones encadrées mais aussi une réduction de l'offre locative disponible, les propriétaires se tournant vers la vente ou la location meublée touristique.",
    },
  },
  {
    id: "log-logements-sociaux",
    themeId: "logement",
    title: "Construire massivement des logements sociaux",
    description:
      "Augmenter fortement le rythme de construction de logements sociaux pour répondre à la demande.",
    supportingParties: ["lfi", "ps", "eelv", "pcf"],
    internationalExample: {
      country: "Autriche (Vienne)",
      when: "Modèle de logement social à grande échelle",
      summary:
        "Vienne dispose d'un parc de logements sociaux représentant environ 60% du parc locatif de la ville.",
      evaluation:
        "Le modèle viennois est cité positivement par de nombreux experts internationaux (OCDE, ONU-Habitat) pour sa contribution à la modération des loyers en général, y compris dans le parc privé, du fait de l'effet de régulation par la concurrence.",
    },
  },
  {
    id: "log-normes-construction",
    themeId: "logement",
    title: "Réduire les normes de construction pour relancer l'offre",
    description:
      "Alléger les normes environnementales et techniques pesant sur la construction neuve pour en réduire les coûts.",
    supportingParties: ["renaissance", "lr", "rn"],
  },
  {
    id: "log-taxation-vacance",
    themeId: "logement",
    title: "Renforcer la taxation des logements vacants et des résidences secondaires en zone tendue",
    description:
      "Augmenter la fiscalité sur les logements vacants et les résidences secondaires dans les zones où la demande de logement est forte.",
    supportingParties: ["lfi", "eelv", "ps"],
    internationalExample: {
      country: "Canada (Vancouver)",
      when: "Taxe sur les logements vacants depuis 2017",
      summary:
        "La ville de Vancouver applique depuis 2017 une taxe sur les logements vacants pour lutter contre la spéculation immobilière.",
      evaluation:
        "Une étude de la ville de Vancouver (2019) montre une légère baisse du taux de vacance mais un effet limité sur les prix globaux du marché, la pression immobilière étant multifactorielle.",
    },
  },
  {
    id: "log-accession-propriete",
    themeId: "logement",
    title: "Relancer l'accession à la propriété (prêt à taux zéro élargi)",
    description:
      "Élargir les dispositifs d'aide à l'achat immobilier comme le prêt à taux zéro pour faciliter l'accession à la propriété.",
    supportingParties: ["renaissance", "lr", "rn"],
    internationalExample: {
      country: "Royaume-Uni",
      when: "Help to Buy, 2013-2023",
      summary:
        "Le Royaume-Uni a mis en place le dispositif « Help to Buy » de 2013 à 2023 pour faciliter l'accession à la propriété.",
      evaluation:
        "Le National Audit Office britannique a critiqué ce dispositif pour avoir contribué à une hausse des prix de l'immobilier neuf sans améliorer significativement l'accessibilité globale au logement.",
    },
  },
  {
    id: "log-taxe-multipropriete",
    themeId: "logement",
    title: "Taxer davantage les propriétaires à partir du 4e logement",
    description:
      "Créer une taxation renforcée pour les propriétaires possédant quatre logements ou plus, hors résidence principale et logements en loyers conventionnés.",
    supportingParties: ["ps"],
  },
  {
    id: "log-leasing",
    themeId: "logement",
    title: "Permettre l'accession à la propriété en « leasing »",
    description:
      "Créer un mécanisme où une partie des loyers versés est progressivement déduite du prix d'achat du logement après plusieurs années de location.",
    supportingParties: ["ps"],
  },
  {
    id: "log-prime-climat",
    themeId: "logement",
    title: "Remplacer MaPrimeRénov' par une « Prime pour le climat »",
    description:
      "Transformer l'aide à la rénovation énergétique en une avance remboursable sans intérêt sur 30 ans, pour lever la barrière du reste à charge initial.",
    supportingParties: ["ps"],
  },
  {
    id: "log-recentrage-hlm",
    themeId: "logement",
    title: "Recentrer l'attribution des logements sociaux sur les actifs",
    description:
      "Réformer les critères d'attribution des HLM pour prioriser les personnes qui travaillent et leurs familles.",
    supportingParties: ["lr"],
  },
  {
    id: "log-reguler-meubles-touristiques",
    themeId: "logement",
    title: "Réguler les meublés touristiques type Airbnb",
    description:
      "Aligner fiscalement et réglementairement toute location de courte durée (hors résidence principale) sur les obligations du secteur hôtelier, et limiter le nombre de licences touristiques dans les zones tendues.",
    supportingParties: ["eelv"],
  },
  {
    id: "log-service-public-national",
    themeId: "logement",
    title: "Créer un service public national du logement",
    description:
      "Structurer un service public national et décentralisé du logement, de l'habitat et de la ville autour de trois pôles publics (financier, foncier, construction), avec un statut politique stable pour sortir le logement des priorités changeantes de chaque remaniement ministériel.",
    supportingParties: ["pcf"],
  },
  {
    id: "log-sru-acte2",
    themeId: "logement",
    title: "Créer un acte 2 de la loi SRU avec un seuil à 30%",
    description:
      "Relever de 25% à 30% le seuil obligatoire de logements sociaux dans les communes soumises à la loi SRU et durcir les sanctions contre les maires récalcitrants (jusqu'à l'inéligibilité et la reprise des permis de construire par le préfet), en contrepartie d'une dotation de fonctionnement pour les villes qui en construisent beaucoup.",
    supportingParties: ["pcf"],
  },
  {
    id: "log-aide-pierre",
    themeId: "logement",
    title: "Porter l'aide à la pierre à 15 milliards d'euros par an",
    description:
      "Multiplier par plus de trente le budget de l'aide à la construction et à la rénovation de logements sociaux (l'« aide à la pierre »), en rupture avec la logique de la loi Barre de 1977 qui avait privilégié l'aide à la personne (APL) au détriment du financement direct de la construction.",
    supportingParties: ["pcf"],
  },
  {
    id: "log-pole-financier-public",
    themeId: "logement",
    title: "Créer un grand pôle financier public du logement",
    description:
      "Mobiliser la Caisse des dépôts, la Banque Postale et les banques mutualistes pour distribuer des crédits à taux abaissés dédiés au logement social, avec une sélectivité du crédit selon l'utilité sociale du projet afin de limiter la spéculation immobilière.",
    supportingParties: ["pcf"],
  },
  {
    id: "log-action-logement",
    themeId: "logement",
    title: "Doubler la contribution des entreprises au logement (Action Logement)",
    description:
      "Porter le « 1% logement » (Action Logement), aujourd'hui réduit à 0,45% de la masse salariale, à 2% et sans seuil de salariés, avec une gestion réformée associant davantage les salariés et une sanctuarisation des fonds contre tout détournement.",
    supportingParties: ["pcf"],
  },
  {
    id: "log-foncier-bien-commun",
    themeId: "logement",
    title: "Faire du foncier un bien commun face à la spéculation",
    description:
      "Interdire la vente des terrains publics au plus offrant en donnant la priorité au logement social avec une forte décote, créer une grande foncière publique d'État, et instaurer un droit de réquisition des immeubles vacants par les maires.",
    supportingParties: ["pcf"],
  },
  {
    id: "log-renovation-massive-anah",
    themeId: "logement",
    title: "Multiplier par cinq le budget de rénovation énergétique du logement",
    description:
      "Porter le budget de l'Agence nationale de l'habitat à 20 milliards d'euros par an, en lui donnant compétence sur le parc public et privé, pour réhabiliter massivement les logements sociaux et privés sans hausse de loyer pour les locataires.",
    supportingParties: ["pcf"],
  },
  {
    id: "log-permis-louer-generalise",
    themeId: "logement",
    title: "Généraliser un « permis de louer » avant toute mise en location",
    description:
      "Instaurer un contrôle obligatoire du logement avant sa mise en location dans le parc privé (surface, sécurité, performance énergétique), sur le modèle du contrôle technique automobile.",
    supportingParties: ["pcf"],
  },
  {
    id: "log-garantie-sociale-caution",
    themeId: "logement",
    title: "Remplacer la caution locative par une garantie sociale universelle",
    description:
      "Supprimer l'exigence de caution locative et la remplacer par une garantie universelle d'État en cas d'impayés, financée par une caisse de solidarité associant bailleurs, locataires, État et collectivités.",
    supportingParties: ["pcf"],
  },
  {
    id: "log-moratoire-expulsions",
    themeId: "logement",
    title: "Interdire les expulsions locatives sans solution de relogement",
    description:
      "Instaurer un moratoire national interdisant toute expulsion locative sans solution de relogement préalable, et interdire les coupures d'eau et d'énergie pour impayés.",
    supportingParties: ["pcf"],
  },
];

export const propositionById = Object.fromEntries(
  propositions.map((p) => [p.id, p])
);
