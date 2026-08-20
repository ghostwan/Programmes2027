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
      assessment: "mixed",
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
      assessment: "mixed",
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
      assessment: "negative",
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
      assessment: "negative",
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
      assessment: "negative",
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
    internationalExample: {
      country: "Royaume-Uni",
      when: "Universal Credit, depuis 2013",
      summary:
        "Le Royaume-Uni a fusionné six prestations sociales (dont l'aide au logement et l'allocation chômage) en un versement unique appelé Universal Credit.",
      evaluation:
        "Le National Audit Office et l'Institute for Fiscal Studies documentent des gains d'efficacité administrative, mais aussi des ruptures de paiement et une hausse du recours aux banques alimentaires liées aux délais de versement initiaux.",
      assessment: "mixed",
    },
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
      assessment: "mixed",
    },
  },
  {
    id: "travail-4jours",
    themeId: "travail",
    title: "Expérimenter ou généraliser la semaine de 4 jours",
    description:
      "Réduire le temps de travail hebdomadaire à 4 jours à salaire égal, au moins à titre expérimental.",
    supportingParties: ["lfi", "eelv", "ps", "renaissance"],
    internationalExample: {
      country: "Royaume-Uni, Islande, Belgique",
      when: "Islande (2015-2019), Royaume-Uni (2022, 61 entreprises), Belgique (droit à la demande, 2022)",
      summary:
        "Plusieurs pays ont mené des expérimentations pilotes de semaine de 4 jours dans des entreprises volontaires.",
      evaluation:
        "Les expérimentations pilotes (4 Day Week Global) rapportent un maintien voire une hausse de productivité et une baisse du stress. Limites méthodologiques : échantillons auto-sélectionnés, pas de généralisation démontrée à toute l'économie.",
      assessment: "positive",
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
      assessment: "positive",
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
      assessment: "mixed",
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
    supportingParties: ["ps", "lfi"],
  },
  {
    id: "travail-cetu",
    themeId: "travail",
    title: "Créer un compte épargne temps universel",
    description:
      "Permettre à chaque salarié de cumuler RTT, heures supplémentaires et jours de repos non pris dans un compte mobilisable librement (formation, enfants, loisirs).",
    supportingParties: ["ps", "renaissance"],
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
      assessment: "mixed",
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
      assessment: "negative",
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
      assessment: "mixed",
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
      assessment: "positive",
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
      assessment: "negative",
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
      assessment: "mixed",
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
      assessment: "negative",
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
      assessment: "mixed",
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
      assessment: "positive",
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
    supportingParties: ["ps", "lfi"],
    internationalExample: {
      country: "Uruguay",
      when: "Depuis 2013",
      summary:
        "L'Uruguay a été le premier pays à légaliser intégralement la production, la vente et la consommation de cannabis, via un monopole d'État sur la distribution.",
      evaluation:
        "L'organisme régulateur IRCCA et des chercheurs indépendants indiquent une réduction du marché noir pour les usagers enregistrés, mais une adoption plus lente que prévu du circuit légal par les consommateurs.",
      assessment: "mixed",
    },
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
    internationalExample: {
      country: "Royaume-Uni",
      when: "Depuis le PACE Act de 1984",
      summary:
        "La loi britannique impose aux policiers de remettre un formulaire écrit lors de tout contrôle « stop and search », précisant le motif et l'identité de l'agent.",
      evaluation:
        "Des données du Home Office montrent une traçabilité améliorée des contrôles, mais des études (StopWatch UK) documentent une persistance des disparités ethniques dans les taux de contrôle malgré ce dispositif.",
      assessment: "mixed",
    },
  },
  {
    id: "secu-doctrine-maintien-ordre",
    themeId: "securite",
    title: "Adopter une nouvelle doctrine de maintien de l'ordre fondée sur la désescalade",
    description:
      "Interdire les lanceurs de balles de défense (LBD40), encadrer strictement la vidéosurveillance et fonder l'action des forces de l'ordre sur le dialogue et la désescalade plutôt que la confrontation systématique.",
    supportingParties: ["eelv", "lfi", "ps"],
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
    supportingParties: ["rn", "renaissance"],
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
      assessment: "mixed",
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
      assessment: "positive",
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
      assessment: "positive",
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
      assessment: "mixed",
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
      assessment: "mixed",
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
    internationalExample: {
      country: "Suède",
      when: "Depuis 1997",
      summary:
        "La Suède rend les repas scolaires gratuits et universels obligatoires dans toutes les écoles publiques, de la maternelle au lycée.",
      evaluation:
        "Une étude suédoise (Lundborg, Rooth & Alex-Petersen, Review of Economic Studies, 2022) montre un effet positif mesurable sur les revenus futurs des élèves issus de familles modestes ayant bénéficié du programme durant toute leur scolarité.",
      assessment: "positive",
    },
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
    internationalExample: {
      country: "Danemark",
      when: "Système SU, réformé plusieurs fois depuis les années 1970",
      summary:
        "Le Danemark verse à tout étudiant du supérieur une allocation mensuelle (le « SU ») indépendante des revenus des parents.",
      evaluation:
        "L'OCDE crédite ce dispositif d'un taux élevé d'indépendance résidentielle et de poursuite d'études chez les jeunes de milieux modestes, mais son coût budgétaire élevé fait l'objet de débats récurrents et de coupes partielles depuis les années 2010.",
      assessment: "mixed",
    },
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
      assessment: "mixed",
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
      assessment: "negative",
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
      assessment: "mixed",
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
      assessment: "mixed",
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
      assessment: "mixed",
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
    supportingParties: ["lfi", "pcf"],
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
      "Construire de nouveaux réacteurs nucléaires pour sécuriser l'approvisionnement électrique et décarboner le mix énergétique, avec pour certains partis un objectif chiffré allant jusqu'à 14 nouveaux réacteurs et le lancement d'un plan de petits réacteurs modulaires (SMR).",
    supportingParties: ["renaissance", "lr", "rn", "reconquete", "pcf"],
    internationalExample: {
      country: "France, Royaume-Uni",
      when: "Parc français existant (≈70% du mix électrique) ; relance britannique depuis 2016",
      summary:
        "La France dispose du parc nucléaire le plus important d'Europe ; le Royaume-Uni a de son côté relancé un programme de nouveaux réacteurs (Hinkley Point C, Sizewell C) et finance des petits réacteurs modulaires avec Rolls-Royce SMR.",
      evaluation:
        "La Cour des comptes française pointe des dérives récurrentes de coûts et de délais sur les nouveaux EPR (Flamanville) ; au Royaume-Uni, le chantier de Hinkley Point C a vu son coût passer de 18 à plus de 40 milliards de livres selon le National Audit Office (2023), illustrant les risques de ce type de programme.",
      assessment: "negative",
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
      assessment: "negative",
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
      assessment: "positive",
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
      assessment: "mixed",
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
    supportingParties: ["ps", "lfi"],
    internationalExample: {
      country: "Belgique",
      when: "2024",
      summary:
        "La Belgique a inscrit l'écocide comme crime dans son code pénal fédéral, punissable jusqu'à 20 ans de prison pour les cas les plus graves.",
      evaluation:
        "Trop récent pour un bilan d'application avec peu de poursuites à ce jour, mais salué par les ONG comme une première mondiale à l'échelle d'un État européen.",
      assessment: "positive",
    },
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
      assessment: "mixed",
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
      assessment: "negative",
    },
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
      assessment: "negative",
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
      assessment: "negative",
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
      assessment: "mixed",
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
      assessment: "negative",
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
      assessment: "mixed",
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
      assessment: "mixed",
    },
  },
  {
    id: "inst-cese-citoyens",
    themeId: "institutions",
    title: "Transformer le CESE en Conseil de la société civile avec des citoyens tirés au sort",
    description:
      "Réformer le Conseil économique, social et environnemental pour y intégrer un collège de citoyens tirés au sort, pivot d'un futur droit de référendum d'initiative citoyenne.",
    supportingParties: ["ps"],
    internationalExample: {
      country: "Irlande",
      when: "2016-2018",
      summary:
        "L'Assemblée citoyenne irlandaise, composée de 99 citoyens tirés au sort, a formulé des recommandations sur l'avortement et d'autres sujets constitutionnels soumises ensuite au Parlement et au peuple.",
      evaluation:
        "Le dispositif est largement cité comme une référence internationale de démocratie délibérative ; ses recommandations sur l'IVG ont directement mené au référendum de 2018.",
      assessment: "positive",
    },
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
      assessment: "mixed",
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
    internationalExample: {
      country: "Irlande",
      when: "Depuis 1937",
      summary:
        "Toute modification de la Constitution irlandaise doit être approuvée par référendum populaire obligatoire, le Parlement seul ne pouvant pas la modifier.",
      evaluation:
        "Le mécanisme a été utilisé plus de 30 fois depuis 1937 (mariage homosexuel en 2015, IVG en 2018) ; il est salué pour sa légitimité démocratique mais critiqué pour la lenteur et le coût des scrutins répétés.",
      assessment: "mixed",
    },
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
      assessment: "negative",
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
      assessment: "mixed",
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
      assessment: "positive",
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
      assessment: "mixed",
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
      assessment: "negative",
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
      "Réformer les critères d'attribution des HLM pour prioriser les personnes qui travaillent et leurs familles, en abaissant le plafond de ressources d'accès au 5e décile de revenus et en réexaminant la situation des locataires tous les cinq ans.",
    supportingParties: ["lr"],
  },
  {
    id: "log-reguler-meubles-touristiques",
    themeId: "logement",
    title: "Réguler les meublés touristiques type Airbnb",
    description:
      "Aligner fiscalement et réglementairement toute location de courte durée (hors résidence principale) sur les obligations du secteur hôtelier, et limiter le nombre de licences touristiques dans les zones tendues.",
    supportingParties: ["eelv"],
    internationalExample: {
      country: "États-Unis",
      when: "New York, Local Law 18, 2023",
      summary:
        "New York impose l'enregistrement obligatoire des locations de courte durée et interdit les locations de logements entiers de moins de 30 jours sans présence de l'hôte.",
      evaluation:
        "Selon les données de la ville, l'offre de type Airbnb s'est effondrée de plus de 80% après l'entrée en vigueur, avec un effet limité mais réel sur les prix locatifs selon plusieurs études.",
      assessment: "positive",
    },
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
    supportingParties: ["pcf", "lfi"],
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
      "Instaurer un moratoire national interdisant toute expulsion locative sans solution de relogement préalable, interdire les coupures d'eau et d'énergie pour impayés, et abroger la loi Kasbarian de criminalisation des locataires en difficulté.",
    supportingParties: ["pcf", "lfi"],
    internationalExample: {
      country: "États-Unis",
      when: "Moratoire du CDC, 2020-2021",
      summary:
        "Les autorités sanitaires américaines ont imposé un moratoire fédéral sur les expulsions locatives pendant la pandémie de Covid-19.",
      evaluation:
        "La Cour suprême a invalidé ce moratoire en août 2021, jugeant que l'agence avait outrepassé ses pouvoirs ; des études du Eviction Lab de Princeton montrent qu'il avait évité plusieurs centaines de milliers d'expulsions pendant sa durée d'application.",
      assessment: "mixed",
    },
  },
  {
    id: "inst-assemblee-constituante",
    themeId: "institutions",
    title: "Élire une Assemblée constituante pour rédiger une nouvelle Constitution",
    description:
      "Convoquer un référendum pour lancer un processus constituant : une Assemblée constituante élue rédigerait une nouvelle Constitution, elle-même soumise à référendum populaire.",
    supportingParties: ["lfi"],
    internationalExample: {
      country: "Chili",
      when: "2021-2022",
      summary:
        "Une Convention constitutionnelle élue a rédigé un nouveau projet de Constitution pour remplacer celle héritée de la dictature de Pinochet.",
      evaluation:
        "Le texte proposé a été rejeté à 62% lors du référendum de septembre 2022, illustrant le risque de décalage entre une assemblée constituante et l'opinion publique.",
      assessment: "negative",
    },
  },
  {
    id: "inst-fin-49-3",
    themeId: "institutions",
    title: "Abolir le recours au 49.3 hors vote du budget",
    description:
      "Passer à un régime parlementaire où le gouvernement doit réellement obtenir l'accord du Parlement sur ses textes, en abolissant les procédures de vote forcé comme l'article 49.3.",
    supportingParties: ["lfi"],
  },
  {
    id: "inst-pantouflage",
    themeId: "institutions",
    title: "Encadrer strictement le « pantouflage » des hauts fonctionnaires",
    description:
      "Imposer la démission et le remboursement des frais de formation aux hauts fonctionnaires rejoignant le secteur privé, et allonger à dix ans les délais d'interdiction en cas de conflit d'intérêts.",
    supportingParties: ["lfi"],
  },
  {
    id: "inst-plafond-dons-partis",
    themeId: "institutions",
    title: "Plafonner à 200€ les dons individuels aux partis politiques",
    description:
      "Abaisser fortement le plafond légal des dons qu'un particulier peut verser à un parti politique, pour limiter l'influence de l'argent privé sur la vie démocratique.",
    supportingParties: ["lfi"],
  },
  {
    id: "inst-audiovisuel-public-election",
    themeId: "institutions",
    title: "Faire élire les présidents de l'audiovisuel public par le Parlement",
    description:
      "Retirer à l'Arcom la nomination des présidents de France Télévisions et de Radio France pour la confier au Parlement, et créer une loi anti-concentration des médias plus stricte.",
    supportingParties: ["lfi"],
  },
  {
    id: "inst-suppression-metropoles",
    themeId: "institutions",
    title: "Supprimer les métropoles et redonner aux communes leur libre coopération",
    description:
      "Abroger la loi NOTRe et l'obligation d'appartenance à une intercommunalité, supprimer les métropoles jugées technocratiques et redonner aux communes la liberté de s'associer.",
    supportingParties: ["lfi"],
  },
  {
    id: "inst-conscription-citoyenne",
    themeId: "institutions",
    title: "Créer un service citoyen obligatoire de 9 mois",
    description:
      "Instaurer une conscription citoyenne obligatoire de neuf mois pour les moins de 25 ans, rémunérée au SMIC, combinant formation civique, bilan de santé et permis de conduire gratuit, en remplacement du SNU.",
    supportingParties: ["lfi"],
  },
  {
    id: "eco-separation-bancaire",
    themeId: "economie",
    title: "Séparer les banques d'affaires des banques de détail",
    description:
      "Imposer une séparation stricte entre activités spéculatives de banque d'affaires et activités de banque de détail, et encadrer plus fortement les produits financiers les plus risqués.",
    supportingParties: ["lfi"],
    internationalExample: {
      country: "Royaume-Uni, États-Unis",
      when: "Ring-fencing britannique (2013-2019), Glass-Steagall Act américain (1933-1999)",
      summary:
        "Le Royaume-Uni a instauré un « ring-fencing » isolant juridiquement les activités de banque de détail des activités de marché ; les États-Unis avaient imposé une séparation stricte similaire avec le Glass-Steagall Act.",
      evaluation:
        "La Prudential Regulation Authority britannique estime que le ring-fencing a renforcé la résilience des dépôts de détail, mais le Trésor britannique relève des coûts de mise en œuvre élevés pour les banques.",
      assessment: "mixed",
    },
  },
  {
    id: "eco-pole-public-bancaire",
    themeId: "economie",
    title: "Créer un pôle public bancaire",
    description:
      "Socialiser une partie du secteur bancaire de détail pour orienter le crédit aux TPE et PME selon des critères sociaux et écologiques plutôt que la seule rentabilité financière.",
    supportingParties: ["lfi"],
    internationalExample: {
      country: "Allemagne",
      when: "Système historique des Sparkassen, toujours en vigueur",
      summary:
        "L'Allemagne dispose d'un réseau de caisses d'épargne publiques locales (Sparkassen) et de banques régionales publiques (Landesbanken), représentant environ 40% du marché bancaire allemand.",
      evaluation:
        "La Bundesbank souligne que les Sparkassen ont mieux soutenu le financement des PME pendant la crise de 2008 que les banques privées, mais les Landesbanken ont nécessité d'importants renflouements publics lors de cette même crise.",
      assessment: "mixed",
    },
  },
  {
    id: "eco-audit-dette",
    themeId: "economie",
    title: "Réaliser un audit citoyen de la dette publique",
    description:
      "Faire racheter une partie de la dette publique par la Banque centrale européenne et mener un audit citoyen pour identifier la part jugée illégitime de la dette.",
    supportingParties: ["lfi"],
    internationalExample: {
      country: "Équateur",
      when: "2007-2008",
      summary:
        "Le gouvernement équatorien a créé une commission d'audit citoyen de la dette publique, qui a conclu qu'une partie de la dette était illégitime, menant à un défaut partiel assumé sur ces titres.",
      evaluation:
        "Le FMI et des économistes indépendants notent que l'Équateur a pu racheter cette dette décotée d'environ 65% sur les marchés secondaires, mais l'opération a durablement dégradé l'accès du pays aux marchés financiers internationaux.",
      assessment: "mixed",
    },
  },
  {
    id: "eco-encadrement-dividendes",
    themeId: "economie",
    title: "Encadrer strictement les dividendes versés aux actionnaires",
    description:
      "Interdire aux entreprises de verser plus de dividendes que de bénéfices réalisés et interdire les licenciements économiques dans les entreprises qui versent des dividendes.",
    supportingParties: ["lfi"],
  },
  {
    id: "eco-plafond-heritage",
    themeId: "economie",
    title: "Instaurer un plafond maximal sur les héritages perçus",
    description:
      "Créer un héritage maximal transmissible (de l'ordre de 12 millions d'euros) au-delà duquel les successions sont intégralement reversées à la collectivité.",
    supportingParties: ["lfi"],
  },
  {
    id: "eco-tva-luxe",
    themeId: "economie",
    title: "Créer une TVA « grand luxe » en baissant celle sur les produits essentiels",
    description:
      "Réduire la TVA sur les produits de première nécessité et créer en contrepartie un taux de TVA très élevé sur les produits de grand luxe.",
    supportingParties: ["lfi"],
  },
  {
    id: "eco-annulation-privatisations",
    themeId: "economie",
    title: "Annuler les grandes privatisations passées",
    description:
      "Revenir sur les privatisations des aéroports, autoroutes et de la Française des Jeux, et créer des pôles publics dans les secteurs jugés stratégiques (médicaments, transports, banque, armement).",
    supportingParties: ["lfi"],
  },
  {
    id: "travail-garantie-emploi",
    themeId: "travail",
    title: "Créer une garantie d'emploi pour les chômeurs de longue durée",
    description:
      "Proposer à tout chômeur de longue durée un emploi rémunéré au SMIC revalorisé dans un secteur d'utilité écologique ou sociale, sur le modèle des Territoires zéro chômeur de longue durée.",
    supportingParties: ["lfi"],
  },
  {
    id: "travail-6e-semaine-conges",
    themeId: "travail",
    title: "Généraliser une sixième semaine de congés payés",
    description:
      "Ajouter une semaine de congés payés supplémentaire pour l'ensemble des salariés du secteur privé et public.",
    supportingParties: ["lfi"],
  },
  {
    id: "travail-quota-precarite",
    themeId: "travail",
    title: "Instaurer un quota maximal de contrats précaires par entreprise",
    description:
      "Limiter la part de CDD et de contrats précaires à 10% des effectifs en PME et 5% dans les grandes entreprises, et abroger les ordonnances travail de 2017.",
    supportingParties: ["lfi"],
    internationalExample: {
      country: "Espagne",
      when: "Réforme du marché du travail, 2021-2022",
      summary:
        "L'Espagne a restreint fortement les motifs de recours aux contrats temporaires et renforcé les sanctions pour les entreprises en abusant.",
      evaluation:
        "Le ministère espagnol du Travail et l'OCDE constatent une chute marquée de la part des CDD dans les nouvelles embauches, avec un débat sur la part liée à un effet de requalification statistique plutôt qu'à une hausse réelle de la stabilité de l'emploi.",
      assessment: "mixed",
    },
  },
  {
    id: "travail-assurance-chomage-retablir",
    themeId: "travail",
    title: "Rétablir une assurance-chômage plus protectrice",
    description:
      "Abroger les réformes de l'assurance-chômage depuis 2017, indemniser les chômeurs dès le premier jour et supprimer les 15 heures d'activité hebdomadaire obligatoires du dispositif France Travail.",
    supportingParties: ["lfi"],
  },
  {
    id: "travail-zero-mort-travail",
    themeId: "travail",
    title: "Viser zéro mort au travail et doubler l'inspection du travail",
    description:
      "Fixer un objectif national de zéro accident mortel au travail, reconnaître le burn-out comme maladie professionnelle et doubler les effectifs de l'inspection du travail.",
    supportingParties: ["lfi"],
  },
  {
    id: "travail-veto-licenciements-ce",
    themeId: "travail",
    title: "Donner un droit de veto suspensif aux salariés sur les plans de licenciement",
    description:
      "Permettre aux comités d'entreprise de bloquer temporairement un plan de licenciement collectif et de voter la défiance envers la direction, en portant la représentation salariale à un tiers des sièges des conseils d'administration.",
    supportingParties: ["lfi"],
  },
  {
    id: "edu-petite-enfance",
    themeId: "education",
    title: "Créer un service public de la petite enfance",
    description:
      "Créer 500 000 places de crèche publiques supplémentaires en cinq ans, geler l'ouverture de nouvelles crèches privées lucratives et garantir la gratuité des crèches publiques.",
    supportingParties: ["lfi", "ps", "pcf"],
    internationalExample: {
      country: "Suède",
      when: "Généralisé en 1995 (droit opposable)",
      summary:
        "La Suède garantit un droit universel à une place en crèche ou pré-école publique à tarif plafonné et proportionnel au revenu (« maxtaxa » depuis 2002).",
      evaluation:
        "L'OCDE cite le modèle suédois comme référence pour son fort taux de couverture et son effet positif documenté sur l'emploi des mères et le développement des enfants.",
      assessment: "positive",
    },
  },
  {
    id: "edu-scolarite-18-ans",
    themeId: "education",
    title: "Étendre la scolarité obligatoire jusqu'à 18 ans",
    description:
      "Repousser l'âge de fin de scolarité obligatoire de 16 à 18 ans, en garantissant une allocation d'autonomie pour les jeunes qui le souhaitent dès 16 ans.",
    supportingParties: ["lfi"],
    internationalExample: {
      country: "Angleterre",
      when: "Education and Skills Act 2008, effectif 2013-2015",
      summary:
        "L'Angleterre a élevé l'âge de fin de scolarité ou formation obligatoire à 18 ans, sous forme scolaire, d'apprentissage ou de formation.",
      evaluation:
        "Le ministère britannique de l'Éducation rapporte une hausse du taux de rétention dans l'éducation/formation post-16, mais l'Institute for Fiscal Studies note des résultats en emploi mitigés pour les jeunes les moins qualifiés.",
      assessment: "mixed",
    },
  },
  {
    id: "edu-fin-enseignement-prive",
    themeId: "education",
    title: "Mettre fin aux privilèges de l'enseignement privé sous contrat",
    description:
      "Abroger la loi Carle et appliquer un malus financier aux établissements privés sous contrat qui pratiquent une ségrégation sociale ou scolaire dans leur recrutement d'élèves.",
    supportingParties: ["lfi"],
  },
  {
    id: "edu-lycee-pro-public",
    themeId: "education",
    title: "Reconstruire un enseignement professionnel public de qualité",
    description:
      "Développer les lycées professionnels et agricoles publics, créer des centres polytechniques professionnels et rétablir le bac professionnel en quatre ans.",
    supportingParties: ["lfi"],
  },
  {
    id: "edu-gratuite-superieur",
    themeId: "education",
    title: "Rendre gratuit l'enseignement supérieur public jusqu'au doctorat",
    description:
      "Supprimer les frais d'inscription dans l'enseignement supérieur public, de la licence au doctorat.",
    supportingParties: ["lfi"],
    internationalExample: {
      country: "Allemagne",
      when: "2014 (suppression des frais dans le dernier Land)",
      summary:
        "L'Allemagne a aboli les frais de scolarité dans l'enseignement supérieur public dans l'ensemble de ses Länder.",
      evaluation:
        "Des études du DIW Berlin montrent une légère hausse des inscriptions d'étudiants issus de milieux modestes après la suppression des frais, sans dégradation mesurable de la qualité de l'enseignement.",
      assessment: "positive",
    },
  },
  {
    id: "sante-pole-public-medicament",
    themeId: "sante",
    title: "Créer un pôle public du médicament",
    description:
      "Relocaliser la production de médicaments jugés stratégiques, constituer une réserve publique et nationaliser certaines filiales critiques en cas de rupture d'approvisionnement.",
    supportingParties: ["lfi", "pcf"],
  },
  {
    id: "sante-mentale-plan",
    themeId: "sante",
    title: "Lancer un plan national pour la santé mentale",
    description:
      "Rouvrir des lits de psychiatrie publique, renforcer les centres médico-psychologiques et permettre le remboursement d'un suivi psychologique ambulatoire régulier.",
    supportingParties: ["lfi", "ps"],
    internationalExample: {
      country: "Angleterre",
      when: "Programme IAPT, depuis 2008",
      summary:
        "Le NHS a mis en place un programme national d'accès élargi aux thérapies psychologiques (notamment les TCC), avec objectifs de délai et suivi statistique national.",
      evaluation:
        "Les évaluations officielles NHS Digital montrent une amélioration mesurée chez environ 50% des patients traités, mais des files d'attente persistantes et des disparités territoriales sont régulièrement pointées par le National Audit Office.",
      assessment: "mixed",
    },
  },
  {
    id: "sante-malbouffe",
    themeId: "sante",
    title: "Lutter contre la malbouffe et la publicité alimentaire ciblant les enfants",
    description:
      "Interdire les additifs alimentaires controversés, rendre le Nutri-score obligatoire, interdire la publicité pour la malbouffe destinée aux enfants et viser 100% de bio et local en restauration collective.",
    supportingParties: ["lfi", "ps"],
    internationalExample: {
      country: "Royaume-Uni",
      when: "2022, étendu en 2025",
      summary:
        "Le Royaume-Uni interdit la publicité pour les aliments gras, sucrés ou salés à la télévision avant 21h et en ligne à tout moment, pour limiter l'exposition des enfants.",
      evaluation:
        "Les études d'impact du gouvernement britannique anticipent une réduction de l'exposition des enfants à ces publicités de plus de 90%, mais les effets réels sur la consommation et l'obésité infantile restent encore peu mesurés à ce stade.",
      assessment: "mixed",
    },
  },
  {
    id: "env-sortie-nucleaire",
    themeId: "environnement",
    title: "Sortir progressivement du nucléaire",
    description:
      "Abandonner les nouveaux projets d'EPR et planifier le démantèlement progressif des centrales nucléaires existantes, avec un accompagnement à la reconversion des salariés et bassins d'emploi concernés.",
    supportingParties: ["lfi"],
    internationalExample: {
      country: "Allemagne",
      when: "2011-2023",
      summary:
        "Après l'accident de Fukushima, l'Allemagne a décidé l'arrêt total de ses centrales nucléaires, achevé en avril 2023.",
      evaluation:
        "Le bilan est contrasté : recours accru au charbon et au gaz dans les années suivantes, hausse des émissions de CO2 du secteur électrique et prix de l'électricité parmi les plus élevés d'Europe (Agence internationale de l'énergie, Fraunhofer ISE).",
      assessment: "negative",
    },
  },
  {
    id: "env-renationalisation-transports",
    themeId: "environnement",
    title: "Renationaliser la SNCF et les autoroutes",
    description:
      "Renationaliser intégralement la SNCF, Fret SNCF et les sociétés d'autoroutes concédées, et refuser toute nouvelle mise en concurrence du transport ferroviaire.",
    supportingParties: ["lfi"],
    internationalExample: {
      country: "Royaume-Uni",
      when: "2024-2025",
      summary:
        "Le gouvernement britannique a engagé la renationalisation progressive des opérateurs ferroviaires régionaux privés sous l'entité publique Great British Railways.",
      evaluation:
        "Trop récent pour un bilan complet ; les partisans citent la fin des dividendes privés, tandis que le National Audit Office pointe le coût de reprise des contrats existants.",
      assessment: "mixed",
    },
  },
  {
    id: "env-eau-bien-commun",
    themeId: "environnement",
    title: "Inscrire l'eau comme bien commun et gérer sa distribution publiquement",
    description:
      "Inscrire l'eau comme bien commun dans la Constitution, instaurer la gratuité des premiers mètres cubes vitaux, confier sa gestion à un service public et décréter un moratoire sur les méga-bassines.",
    supportingParties: ["lfi", "ps"],
    internationalExample: {
      country: "Uruguay",
      when: "2004",
      summary:
        "Un référendum a inscrit dans la Constitution uruguayenne le droit à l'eau comme droit humain et interdit sa privatisation.",
      evaluation:
        "Le dispositif est considéré comme un succès en matière d'accès universel par ONU-Eau, mais des tensions persistent sur le financement des infrastructures.",
      assessment: "mixed",
    },
  },
  {
    id: "env-fermes-usines",
    themeId: "environnement",
    title: "Interdire les fermes-usines et les pratiques d'élevage les plus cruelles",
    description:
      "Interdire l'élevage industriel en cage ou en bâtiment fermé de type ferme-usine, ainsi que le broyage des poussins et d'autres pratiques d'élevage jugées les plus cruelles.",
    supportingParties: ["lfi"],
  },
  {
    id: "env-zero-dechet",
    themeId: "environnement",
    title: "Viser le zéro déchet et interdire l'obsolescence programmée",
    description:
      "Interdire les plastiques à usage unique, créer un indice de durabilité obligatoire sur les produits et développer un service public de la réparation pour lutter contre l'obsolescence programmée.",
    supportingParties: ["lfi"],
  },
  {
    id: "secu-remplacement-igpn",
    themeId: "securite",
    title: "Remplacer l'IGPN et l'IGGN par une autorité de contrôle indépendante",
    description:
      "Supprimer les inspections internes de la police et de la gendarmerie pour les remplacer par une autorité indépendante (magistrats, universitaires, citoyens) dotée d'un pouvoir de sanction disciplinaire propre.",
    supportingParties: ["lfi"],
    internationalExample: {
      country: "Royaume-Uni",
      when: "Depuis 2018",
      summary:
        "L'Independent Office for Police Conduct (IOPC) a remplacé l'ancienne autorité de plaintes pour enquêter sur les affaires graves impliquant la police, avec des enquêteurs non issus de la police.",
      evaluation:
        "Un rapport du Home Affairs Committee (2021) salue une meilleure indépendance mais relève des délais d'instruction toujours longs et un manque de confiance persistant du public.",
      assessment: "mixed",
    },
  },
  {
    id: "secu-sortie-etat-urgence-permanent",
    themeId: "securite",
    title: "Sortir de la logique d'état d'urgence permanent",
    description:
      "Abroger les lois antiterroristes jugées liberticides accumulées depuis 2015, privilégier le renseignement humain au tout-technologique et garantir le contrôle du juge judiciaire sur les mesures de sécurité.",
    supportingParties: ["lfi"],
  },
  {
    id: "log-requisition-logements-vides",
    themeId: "logement",
    title: "Réquisitionner les logements vides et plafonner la multipropriété",
    description:
      "Réquisitionner les logements vacants de longue durée pour l'hébergement d'urgence et plafonner le nombre de logements transmissibles par héritage.",
    supportingParties: ["lfi"],
  },
  {
    id: "log-airbnb-60-jours",
    themeId: "logement",
    title: "Limiter les locations type Airbnb à 60 jours par an",
    description:
      "Plafonner la location de courte durée d'une résidence principale à 60 jours par an et supprimer l'avantage fiscal spécifique aux meublés de tourisme.",
    supportingParties: ["lfi"],
    internationalExample: {
      country: "Royaume-Uni",
      when: "Londres, depuis 2015",
      summary:
        "Le Deregulation Act 2015 plafonne à 90 nuitées par an la location de résidences entières via des plateformes comme Airbnb sans autorisation d'urbanisme.",
      evaluation:
        "Ce seuil est largement contourné en pratique faute de mécanisme de contrôle efficace, ce qui a conduit la mairie de Londres à réclamer un régime d'enregistrement obligatoire plus strict.",
      assessment: "negative",
    },
  },
  {
    id: "immi-droit-sol-integral",
    themeId: "immigration",
    title: "Garantir un droit du sol intégral, y compris à Mayotte",
    description:
      "Garantir à tout enfant né en France l'accès à la nationalité française par le droit du sol, y compris à Mayotte où ce droit a été restreint, et faciliter les démarches de naturalisation.",
    supportingParties: ["lfi"],
  },
  {
    id: "immi-vote-etrangers-locales",
    themeId: "immigration",
    title: "Accorder le droit de vote aux étrangers non-européens aux élections locales",
    description:
      "Instituer le droit de vote et d'éligibilité des résidents étrangers non-communautaires aux élections municipales et locales, comme c'est déjà le cas pour les citoyens européens.",
    supportingParties: ["lfi"],
    internationalExample: {
      country: "Belgique",
      when: "Depuis 2004",
      summary:
        "La Belgique autorise les ressortissants non-UE résidant légalement depuis au moins cinq ans à voter aux élections communales.",
      evaluation:
        "Le taux d'inscription reste faible (environ 15-20% des éligibles), mais la mesure n'a pas suscité de contentieux majeur ni d'effet de fraude signalé par les autorités électorales belges.",
      assessment: "mixed",
    },
  },
  {
    id: "immi-commissariat-egalite",
    themeId: "immigration",
    title: "Créer un Commissariat à l'égalité contre les discriminations",
    description:
      "Créer une autorité indépendante dotée d'un observatoire des discriminations et de pôles spécialisés dans les services publics et les cours d'appel, pour lutter contre les discriminations à l'emploi, au logement et à l'éducation.",
    supportingParties: ["lfi"],
    internationalExample: {
      country: "Royaume-Uni",
      when: "Depuis 2007",
      summary:
        "L'Equality and Human Rights Commission (EHRC) est une autorité publique indépendante chargée de faire respecter la législation anti-discrimination et de mener des enquêtes.",
      evaluation:
        "Des rapports parlementaires (2020-2022) pointent un manque de moyens et de pouvoirs coercitifs réels, limitant son impact sur les discriminations structurelles.",
      assessment: "negative",
    },
  },
  {
    id: "immi-schengen-refonte",
    themeId: "immigration",
    title: "Sortir de l'impasse Dublin/Frontex et créer un statut de réfugié climatique",
    description:
      "Suspendre le règlement de Dublin sur la répartition des demandeurs d'asile, renégocier les accords bilatéraux de contrôle migratoire et créer un statut de protection pour les personnes déplacées par des catastrophes environnementales.",
    supportingParties: ["lfi", "ps"],
  },
  {
    id: "europe-veto-libre-echange",
    themeId: "europe",
    title: "Utiliser le droit de veto français contre les nouveaux accords de libre-échange",
    description:
      "S'opposer par un droit de veto à tout nouvel accord de libre-échange (Mercosur, Chili, Inde, Australie...) et à tout élargissement de l'Union européenne sans harmonisation sociale, fiscale et environnementale préalable.",
    supportingParties: ["lfi"],
    internationalExample: {
      country: "Belgique",
      when: "Wallonie, 2016",
      summary:
        "La région wallonne a utilisé son droit de veto régional pour bloquer temporairement la signature de l'accord de libre-échange UE-Canada (CETA).",
      evaluation:
        "L'accord a finalement été signé après renégociation de certaines clauses, montrant qu'un veto régional peut peser sur les négociations européennes mais rarement les arrêter durablement.",
      assessment: "mixed",
    },
  },
  {
    id: "europe-primaute-droit-national-social",
    themeId: "europe",
    title: "Faire primer les normes sociales et écologiques nationales sur le droit européen",
    description:
      "Inscrire dans la Constitution la primauté des normes nationales sur le droit européen lorsqu'elles sont plus ambitieuses socialement ou écologiquement.",
    supportingParties: ["lfi"],
    internationalExample: {
      country: "Pologne",
      when: "2021",
      summary:
        "Le Tribunal constitutionnel polonais a jugé certaines dispositions des traités européens incompatibles avec la Constitution polonaise, affirmant la primauté du droit national.",
      evaluation:
        "Ce conflit a conduit la Commission européenne à geler des milliards d'euros de fonds européens destinés à la Pologne jusqu'à une réforme judiciaire en 2023-2024.",
      assessment: "negative",
    },
  },
  {
    id: "europe-onu-reforme-conseil-securite",
    themeId: "europe",
    title: "Réformer le Conseil de sécurité de l'ONU pour le rendre plus représentatif",
    description:
      "Agir pour une réforme du Conseil de sécurité et de l'Assemblée générale des Nations unies afin qu'ils reflètent mieux les équilibres du monde actuel, et réaffirmer l'ONU comme seule instance légitime de sécurité collective.",
    supportingParties: ["lfi", "ps"],
  },
  {
    id: "europe-reconnaissance-palestine",
    themeId: "europe",
    title: "Reconnaître l'État de Palestine et sanctionner le gouvernement israélien",
    description:
      "Reconnaître formellement l'État de Palestine, exiger un cessez-le-feu durable et mettre en place des sanctions ciblées, dont un embargo sur les armes, contre le gouvernement israélien.",
    supportingParties: ["lfi"],
    internationalExample: {
      country: "Espagne, Irlande",
      when: "Mai 2024",
      summary:
        "Ces pays, avec la Norvège, ont officiellement reconnu l'État de Palestine de façon coordonnée en mai 2024.",
      evaluation:
        "La mesure a provoqué le rappel des ambassadeurs israéliens et des tensions diplomatiques, sans effet immédiat mesurable sur le cours du conflit.",
      assessment: "mixed",
    },
  },
  {
    id: "europe-souverainete-numerique",
    themeId: "europe",
    title: "Renforcer la souveraineté numérique face aux GAFAM",
    description:
      "Créer un cloud public souverain, garantir la neutralité du Net, héberger les données publiques sur des serveurs français et encadrer strictement l'intelligence artificielle (interdiction de la notation sociale et de la surveillance biométrique généralisée).",
    supportingParties: ["lfi"],
  },
  {
    id: "eco-bouclier-fiscal-productif",
    themeId: "economie",
    title: "Plafonner les impôts de production à 3% de la valeur ajoutée",
    description:
      "Voter une loi de programmation économique donnant dix ans de visibilité fiscale aux entreprises, avec un « bouclier fiscal productif » ramenant les impôts de production sous 3% de la valeur ajoutée.",
    supportingParties: ["renaissance"],
  },
  {
    id: "eco-plan-france-2050",
    themeId: "economie",
    title: "Investir 100 milliards d'euros dans les technologies d'avenir (plan France 2050)",
    description:
      "Faire de l'État un investisseur, plutôt qu'un simple subventionneur, dans dix priorités technologiques de rupture comme l'intelligence artificielle, le quantique, le nucléaire et l'avion bas carbone.",
    supportingParties: ["renaissance"],
    internationalExample: {
      country: "États-Unis",
      when: "Inflation Reduction Act et CHIPS Act, 2022",
      summary:
        "Les États-Unis ont engagé plusieurs centaines de milliards de dollars de subventions et crédits d'impôt pour les semi-conducteurs, l'énergie propre et les technologies d'avenir.",
      evaluation:
        "Le Congressional Budget Office a revu significativement à la hausse le coût budgétaire réel du dispositif par rapport aux estimations initiales, tout en constatant un afflux important d'investissements privés dans les secteurs ciblés.",
      assessment: "mixed",
    },
  },
  {
    id: "eco-retraite-capitalisation",
    themeId: "economie",
    title: "Créer une couche de retraite par capitalisation en complément de la répartition",
    description:
      "Réorienter une partie de l'épargne des Français (assurance-vie, épargne salariale) vers le financement des entreprises françaises et européennes, avec une couche de retraite par capitalisation individuelle en complément du système par répartition.",
    supportingParties: ["renaissance"],
    internationalExample: {
      country: "Suède",
      when: "Réforme de 1998, effective depuis 2001",
      summary:
        "La Suède a introduit un système à trois piliers incluant une part obligatoire de capitalisation individuelle (« premiepension ») en complément de la répartition.",
      evaluation:
        "L'OCDE relève que ce pilier reste minoritaire dans le revenu de retraite total mais expose les assurés à la volatilité des marchés financiers, avec des rendements très variables selon les cohortes.",
      assessment: "mixed",
    },
  },
  {
    id: "eco-simplification-normes",
    themeId: "economie",
    title: "Supprimer une norme pour chaque nouvelle norme créée",
    description:
      "Nommer un ministre de la simplification, créer un guichet administratif unique pour les entreprises et appliquer la règle « une norme créée, une norme supprimée » pour réduire la charge administrative.",
    supportingParties: ["renaissance"],
    internationalExample: {
      country: "Royaume-Uni, États-Unis",
      when: "Royaume-Uni dès 2011, États-Unis en 2017",
      summary:
        "Ces pays ont imposé une règle de compensation obligeant à supprimer une ou plusieurs normes existantes pour chaque nouvelle norme créée (« one-in, one-out » puis « two-for-one »).",
      evaluation:
        "Le National Audit Office britannique et le Government Accountability Office américain constatent des économies réelles mais aussi un ralentissement de l'adoption de nouvelles réglementations jugées nécessaires (sécurité, environnement).",
      assessment: "mixed",
    },
  },
  {
    id: "eco-zones-franches-industrielles",
    themeId: "economie",
    title: "Créer 100 zones franches industrielles à procédures accélérées",
    description:
      "Créer une centaine de « territoires d'innovation » bénéficiant de procédures administratives et d'urbanisme accélérées pour favoriser l'implantation de nouvelles usines.",
    supportingParties: ["renaissance"],
    internationalExample: {
      country: "Chine",
      when: "À partir de 1980 (Shenzhen et autres zones économiques spéciales)",
      summary:
        "La Chine a créé des zones économiques spéciales offrant fiscalité allégée, procédures administratives accélérées et infrastructures dédiées pour attirer l'industrie et les investissements étrangers.",
      evaluation:
        "La Banque mondiale considère ces zones comme un facteur majeur de la croissance industrielle chinoise, tout en soulignant des effets très inégaux selon les zones et des risques de concurrence fiscale interne au pays.",
      assessment: "mixed",
    },
  },
  {
    id: "travail-conge-naissance",
    themeId: "travail",
    title: "Remplacer le congé parental par un congé de naissance de 6 mois mieux rémunéré",
    description:
      "Créer un congé de naissance de six mois rémunéré à 70% du plafond de la Sécurité sociale, en remplacement du congé parental actuel, pour favoriser le partage entre parents et le maintien en emploi des femmes.",
    supportingParties: ["renaissance", "lr"],
  },
  {
    id: "travail-transparence-salaires",
    themeId: "travail",
    title: "Rendre obligatoire l'affichage des salaires dans les offres d'emploi",
    description:
      "Imposer aux entreprises d'indiquer la rémunération proposée dans chaque offre d'emploi, pour lutter contre les inégalités salariales et améliorer la transparence du marché du travail.",
    supportingParties: ["renaissance"],
    internationalExample: {
      country: "Union européenne",
      when: "Directive adoptée en 2023, transposition prévue pour 2026",
      summary:
        "La directive européenne sur la transparence salariale impose aux employeurs d'indiquer une fourchette de salaire dans les offres d'emploi et interdit de demander l'historique de rémunération aux candidats.",
      evaluation:
        "La Commission européenne motive la directive par l'écart salarial persistant entre femmes et hommes (environ 12,7% dans l'UE selon Eurostat), mais la mesure n'étant pas encore pleinement transposée, son effet réel n'est pas encore mesurable.",
      assessment: "mixed",
    },
  },
  {
    id: "travail-droit-reconversion",
    themeId: "travail",
    title: "Créer un droit à la reconversion pour les métiers pénibles",
    description:
      "Limiter à 10-15 ans l'exercice de certains métiers pénibles avant une reconversion accompagnée, et créer un capital de reprise d'études mobilisable via le compte personnel de formation.",
    supportingParties: ["renaissance"],
  },
  {
    id: "edu-reforme-bourses-etudiantes",
    themeId: "education",
    title: "Refondre le calcul des bourses étudiantes sur critères sociaux",
    description:
      "Recalculer les bourses étudiantes selon un quotient familial type CAF, verser une aide unique intégrant le logement, en contrepartie de la suppression de la réduction d'impôt pour frais de scolarité.",
    supportingParties: ["renaissance"],
  },
  {
    id: "edu-regulation-prive-lucratif-sup",
    themeId: "education",
    title: "Encadrer strictement l'enseignement supérieur privé lucratif",
    description:
      "Imposer une accréditation stricte, une transparence financière obligatoire et un encadrement des pratiques commerciales (publicité, promesses d'insertion) aux écoles privées de l'enseignement supérieur.",
    supportingParties: ["renaissance"],
  },
  {
    id: "env-loi-programmation-energie-climat",
    themeId: "environnement",
    title: "Créer une loi de programmation pluriannuelle énergie-climat contraignante",
    description:
      "Planifier les financements climat et énergie sur plusieurs années avec une clause de révision automatique en cas de dépassement de la trajectoire carbone, et publier chaque année une « dette carbone » nationale.",
    supportingParties: ["renaissance"],
    internationalExample: {
      country: "Allemagne",
      when: "Depuis 2019",
      summary:
        "La loi fédérale allemande sur la protection du climat (Klimaschutzgesetz) fixe des budgets carbone sectoriels contraignants avec sanctions en cas de dépassement.",
      evaluation:
        "La Cour constitutionnelle allemande a jugé la loi initiale insuffisante en 2021, forçant un renforcement des objectifs ; le mécanisme est jugé efficace pour la transparence mais certains secteurs comme les transports dépassent régulièrement leurs budgets.",
      assessment: "mixed",
    },
  },
  {
    id: "env-tva-vehicules-electriques",
    themeId: "environnement",
    title: "Baisser temporairement la TVA sur les véhicules électriques à 5,5%",
    description:
      "Substituer partiellement le bonus écologique par une baisse temporaire de la TVA sur les véhicules électriques neufs et d'occasion, pour accélérer leur adoption.",
    supportingParties: ["renaissance"],
    internationalExample: {
      country: "Norvège",
      when: "Depuis 2001",
      summary:
        "La Norvège exonère les véhicules électriques de TVA et de taxes d'immatriculation.",
      evaluation:
        "Plus de 90% des ventes de voitures neuves étaient électriques en 2023 selon les statistiques norvégiennes (OFV), mais le coût budgétaire pour l'État est élevé et le dispositif est progressivement réduit.",
      assessment: "positive",
    },
  },
  {
    id: "env-zfe-volontaires",
    themeId: "environnement",
    title: "Rétablir les zones à faibles émissions pour les collectivités volontaires",
    description:
      "Redonner aux villes qui le souhaitent la possibilité d'instaurer des zones à faibles émissions, couplée à l'extension du dispositif de leasing social de véhicules propres.",
    supportingParties: ["renaissance"],
    internationalExample: {
      country: "Royaume-Uni",
      when: "Londres, depuis 2019",
      summary:
        "Londres a instauré une zone à ultra-faibles émissions (ULEZ), étendue progressivement à toute l'agglomération en 2023.",
      evaluation:
        "Une évaluation de la mairie de Londres (2023) montre une baisse mesurable de la pollution de l'air, mais la mesure a suscité une forte contestation politique et des recours judiciaires.",
      assessment: "mixed",
    },
  },
  {
    id: "env-contrats-transition-agricole",
    themeId: "environnement",
    title: "Créer des contrats de transition agricole entre agriculteurs, industriels et distributeurs",
    description:
      "Instaurer des contrats tripartites pour mieux partager la valeur entre agriculteurs, industriels et distributeurs, avec un objectif de réduction de 50% des pesticides d'ici 2030 et un marché du carbone agricole.",
    supportingParties: ["renaissance"],
  },
  {
    id: "secu-videoprotection-algorithmique",
    themeId: "securite",
    title: "Étendre la vidéoprotection algorithmique au-delà des Jeux olympiques",
    description:
      "Pérenniser et étendre l'expérimentation de vidéosurveillance augmentée par intelligence artificielle testée pendant les Jeux olympiques de Paris 2024, via un cadre légal dédié.",
    supportingParties: ["renaissance"],
  },
  {
    id: "secu-unite-anti-drone",
    themeId: "securite",
    title: "Créer une unité conjointe police-gendarmerie de lutte anti-drone",
    description:
      "Libéraliser l'usage des drones par les forces de l'ordre et créer une unité spécialisée conjointe police-gendarmerie-préfecture pour lutter contre les usages malveillants de drones.",
    supportingParties: ["renaissance"],
  },
  {
    id: "secu-renforcement-police-municipale",
    themeId: "securite",
    title: "Renforcer les pouvoirs et l'armement des polices municipales",
    description:
      "Donner aux directeurs de police municipale un statut d'officier de police judiciaire, rendre la police municipale obligatoire au-delà de 10 000 habitants avec un armement minimal financé par l'État, et créer une école nationale des policiers municipaux.",
    supportingParties: ["renaissance"],
  },
  {
    id: "secu-narcotrafic-mesures-urgence",
    themeId: "securite",
    title: "Expulser plus vite des logements sociaux les personnes condamnées pour trafic de drogue",
    description:
      "Accélérer la procédure d'expulsion des logements sociaux en cas de trafic de drogue avéré, multiplier les opérations de contrôle renforcé aux frontières et sanctionner les plateformes non coopérantes contre le narcotrafic.",
    supportingParties: ["renaissance"],
  },
  {
    id: "secu-plateforme-unique-cyber",
    themeId: "securite",
    title: "Créer une plateforme unique de signalement des cybercrimes",
    description:
      "Fusionner les différents dispositifs de signalement (Perceval, 17Cyber, Pharos) en une plateforme unique, et former massivement les forces de l'ordre à la lutte contre la cybercriminalité.",
    supportingParties: ["renaissance"],
    internationalExample: {
      country: "Royaume-Uni",
      when: "Depuis 2009",
      summary:
        "Action Fraud est la plateforme nationale unique de signalement des fraudes et cybercrimes au Royaume-Uni, gérée avec la City of London Police.",
      evaluation:
        "Un rapport du National Audit Office (2017) critique un faible taux de poursuites effectives malgré le volume élevé de signalements centralisés.",
      assessment: "negative",
    },
  },
  {
    id: "secu-centres-violences-sexuelles",
    themeId: "securite",
    title: "Créer des centres de prise en charge des violences sexuelles ouverts 24h/24",
    description:
      "Créer, sur le modèle belge, des centres rattachés aux hôpitaux ouverts en continu pour une prise en charge médicale et un dépôt de plainte sécurisé des victimes de violences sexuelles et sexistes.",
    supportingParties: ["renaissance"],
    internationalExample: {
      country: "Royaume-Uni",
      when: "Généralisés après 2010",
      summary:
        "Les Sexual Assault Referral Centres (SARC) offrent une prise en charge médicale, psychologique et médico-légale des victimes de violences sexuelles, en accès direct ou via la police.",
      evaluation:
        "Une évaluation du NHS England (2020) souligne une meilleure coordination des soins, mais des disparités régionales importantes dans les délais d'accès et les moyens alloués.",
      assessment: "mixed",
    },
  },
  {
    id: "secu-brigades-mobiles-gendarmerie",
    themeId: "securite",
    title: "Créer des brigades mobiles de gendarmerie pour les zones rurales",
    description:
      "Créer des brigades itinérantes allant de village en village pour renforcer la présence des forces de l'ordre dans les territoires ruraux les moins bien couverts.",
    supportingParties: ["renaissance"],
  },
  {
    id: "secu-controle-ecrans-mineurs",
    themeId: "securite",
    title: "Instaurer un couvre-feu numérique pour les mineurs",
    description:
      "Interdire effectivement les écrans aux moins de 15 ans, instaurer un couvre-feu numérique de 22h à 8h pour les 15-18 ans et créer un « addict-score » public des plateformes.",
    supportingParties: ["renaissance"],
  },
  {
    id: "immi-systeme-points-canada",
    themeId: "immigration",
    title: "Piloter l'immigration de travail par un système à points inspiré du Canada",
    description:
      "Créer un système d'admission par points fondé sur des critères objectifs (qualification, âge, maîtrise du français, offre d'emploi), avec des quotas votés chaque année par le Parlement.",
    supportingParties: ["renaissance"],
    internationalExample: {
      country: "Canada",
      when: "Depuis 1967, réformé en 2015",
      summary:
        "Le Canada attribue les visas de travail permanents via un système à points fondé sur l'âge, les diplômes, la langue et l'expérience professionnelle.",
      evaluation:
        "Le système a permis une immigration économique bien intégrée au marché du travail, mais Statistique Canada note aussi un phénomène de déclassement professionnel chez une partie des immigrants qualifiés (diplômes étrangers non reconnus).",
      assessment: "mixed",
    },
  },
  {
    id: "immi-durcissement-regroupement-familial",
    themeId: "immigration",
    title: "Durcir les conditions du regroupement familial",
    description:
      "Allonger de 18 à 24 mois le délai de présence exigé du conjoint et renforcer les exigences de maîtrise du français, de logement et de ressources pour le regroupement familial.",
    supportingParties: ["renaissance"],
    internationalExample: {
      country: "Danemark",
      when: "Depuis 2002, durci en 2018",
      summary:
        "Le Danemark impose des critères stricts (âge minimum de 24 ans pour les deux conjoints, exigence de rattachement au pays, garanties financières) pour le regroupement familial.",
      evaluation:
        "Une étude de l'université d'Aarhus montre une baisse significative des demandes, mais des ONG (Amnesty International) et la Cour européenne des droits de l'homme critiquent des atteintes disproportionnées au droit à la vie familiale.",
      assessment: "mixed",
    },
  },
  {
    id: "immi-fin-prestations-fin-titre-sejour",
    themeId: "immigration",
    title: "Mettre fin automatiquement aux prestations sociales à l'expiration du titre de séjour",
    description:
      "Cesser automatiquement le versement de toute prestation sociale dès l'expiration du titre de séjour d'une personne étrangère.",
    supportingParties: ["renaissance"],
  },
  {
    id: "immi-allongement-retention-cra",
    themeId: "immigration",
    title: "Allonger la durée de rétention administrative et créer 3000 places de CRA",
    description:
      "Augmenter le délai maximal de rétention administrative pour accélérer les expulsions des personnes étrangères condamnées pour des faits graves, et créer 3000 places supplémentaires en centre de rétention d'ici 2030.",
    supportingParties: ["renaissance"],
  },
  {
    id: "immi-border-force",
    themeId: "immigration",
    title: "Créer une « Border Force » pour piloter le contrôle des frontières",
    description:
      "Créer un état-major national et des états-majors régionaux réunissant police aux frontières, douanes et renseignement pour mieux coordonner le contrôle des frontières.",
    supportingParties: ["renaissance"],
    internationalExample: {
      country: "Royaume-Uni",
      when: "Depuis 2012",
      summary:
        "Le Border Force est une agence unique du ministère de l'Intérieur britannique responsable du contrôle des frontières (ports, aéroports).",
      evaluation:
        "Des rapports de l'inspection indépendante des frontières (ICIBI) pointent régulièrement des sous-effectifs et des temps d'attente élevés aux points de contrôle, malgré la centralisation.",
      assessment: "negative",
    },
  },
  {
    id: "immi-sanctions-employeurs-irreguliers",
    themeId: "immigration",
    title: "Renforcer les sanctions contre les employeurs de travailleurs sans papiers",
    description:
      "Durcir les sanctions, y compris l'interdiction de gérance, contre les employeurs recourant sciemment au travail irrégulier de personnes étrangères sans titre de séjour.",
    supportingParties: ["renaissance"],
    internationalExample: {
      country: "États-Unis",
      when: "Depuis 1986 (Immigration Reform and Control Act)",
      summary:
        "La loi IRCA a instauré des sanctions financières et pénales pour les employeurs recrutant sciemment des travailleurs sans papiers, complétée par le système de vérification E-Verify.",
      evaluation:
        "Des études du Migration Policy Institute montrent une application inégale selon les États et une efficacité limitée en l'absence de contrôles systématiques sur le terrain.",
      assessment: "negative",
    },
  },
  {
    id: "inst-delit-entrisme",
    themeId: "institutions",
    title: "Créer un délit d'entrisme communautariste",
    description:
      "Sanctionner pénalement le fait d'appeler à refuser les lois de la République ou d'imposer des règles contraires aux lois françaises dans un territoire ou une association, en complément du délit de séparatisme existant.",
    supportingParties: ["renaissance"],
  },
  {
    id: "inst-interdiction-voile-enfants",
    themeId: "institutions",
    title: "Interdire le voilement des enfants dans l'espace public",
    description:
      "Interdire le port du voile aux enfants dans l'espace public, avec sanction des parents plutôt que des enfants, et créer un délit spécifique pour toute personne qui contraindrait une femme à se voiler.",
    supportingParties: ["renaissance"],
  },
  {
    id: "inst-financement-etranger-lieux-culte",
    themeId: "institutions",
    title: "Abaisser fortement le seuil de déclaration des financements étrangers des cultes",
    description:
      "Abaisser de 10 000€ à 1 000€ le seuil à partir duquel les dons et financements étrangers des lieux de culte doivent être déclarés, pour mieux contrôler les financements de l'étranger.",
    supportingParties: ["renaissance"],
    internationalExample: {
      country: "Autriche",
      when: "2015",
      summary:
        "La loi autrichienne sur l'Islam a interdit le financement étranger des mosquées et la rémunération des imams par des organisations étrangères.",
      evaluation:
        "La mesure a résisté à des recours juridiques mais a été critiquée par des organisations musulmanes et certains juristes pour son caractère discriminatoire envers un seul culte.",
      assessment: "mixed",
    },
  },
  {
    id: "inst-testing-discriminations-embauche",
    themeId: "institutions",
    title: "Généraliser le testing contre les discriminations à l'embauche",
    description:
      "Doter l'organisme public de lutte contre les discriminations d'un service de testing systématique en entreprise, publier les résultats et exiger des plans d'action des entreprises identifiées comme discriminantes.",
    supportingParties: ["renaissance"],
  },
  {
    id: "eco-revenu-familial-unique",
    themeId: "economie",
    title: "Fusionner les aides familiales en un « Revenu familial » unique",
    description:
      "Fusionner une douzaine de dispositifs d'aide aux familles (allocations familiales, quotient familial, complément familial...) en une allocation unique de 240€ par mois et par enfant mineur dès le premier enfant, doublée pour le troisième enfant.",
    supportingParties: ["lr"],
  },
  {
    id: "eco-choc-transmission-jeunes",
    themeId: "economie",
    title: "Relever temporairement le plafond des dons familiaux exonérés pour les jeunes",
    description:
      "Porter pendant trois ans le plafond des dons familiaux exonérés de droits à 150 000€ pour les moins de 30 ans et 100 000€ pour les moins de 40 ans, contre environ 32 000€ actuellement.",
    supportingParties: ["lr"],
  },
  {
    id: "eco-fonds-pension-productif",
    themeId: "economie",
    title: "Créer un fonds de pension productif de retraite par capitalisation",
    description:
      "Créer un étage de retraite par capitalisation individuelle pour chaque actif, alimenté par l'intéressement et la participation, avec un objectif de 1 000 milliards d'euros de capital investi dans les PME et l'industrie françaises.",
    supportingParties: ["lr"],
  },
  {
    id: "eco-transmission-entreprise-report-droits",
    themeId: "economie",
    title: "Reporter les droits de succession sur la transmission d'entreprises familiales",
    description:
      "Reporter automatiquement l'exigibilité des droits de mutation à titre gratuit sur la transmission d'entreprises familiales (TPE, PME, exploitations agricoles) tant que l'outil de production reste détenu et exploité.",
    supportingParties: ["lr"],
  },
  {
    id: "eco-suppression-c3s-cvae",
    themeId: "economie",
    title: "Supprimer la C3S et la CVAE pour l'industrie",
    description:
      "Supprimer la contribution sociale de solidarité des sociétés (C3S) et la cotisation sur la valeur ajoutée des entreprises (CVAE), et exonérer la part industrielle de la cotisation foncière des entreprises, pour environ 15 milliards d'euros d'allègement ciblé sur l'industrie.",
    supportingParties: ["lr"],
  },
  {
    id: "eco-reciprocite-controles-douaniers",
    themeId: "economie",
    title: "Réorienter la moitié des contrôles douaniers vers les produits importés",
    description:
      "Réorienter au moins la moitié des contrôles douaniers et sanitaires vers les produits importés, étendre le mécanisme d'ajustement carbone aux produits transformés et imposer des clauses de réciprocité dans les accords commerciaux.",
    supportingParties: ["lr"],
  },
  {
    id: "eco-foncier-friches-industrielles",
    themeId: "economie",
    title: "Recenser et mobiliser les friches industrielles pour la réindustrialisation",
    description:
      "Créer un recensement national des friches industrielles sous autorité préfectorale, avec des procédures accélérées, pour libérer environ 25 000 hectares de foncier industriel en dix ans.",
    supportingParties: ["lr"],
  },
  {
    id: "eco-sept-secteurs-strategiques",
    themeId: "economie",
    title: "Concentrer la recherche publique sur sept secteurs technologiques stratégiques",
    description:
      "Piloter par le Commissariat au Plan la concentration des financements publics de recherche sur sept secteurs jugés stratégiques (énergie, intelligence artificielle, biotechnologies, matériaux, microélectronique, cybersécurité, informatique quantique), pour mettre fin au saupoudrage des aides.",
    supportingParties: ["lr"],
  },
  {
    id: "eco-compartiment-ia-bpi",
    themeId: "economie",
    title: "Créer un compartiment IA à la BPI et des data centers souverains",
    description:
      "Créer un fonds dédié à la BPI pour financer les scale-up technologiques françaises en intelligence artificielle et déployer des data centers souverains, avec un objectif de plusieurs gigawatts de capacité d'ici 2035.",
    supportingParties: ["lr"],
  },
  {
    id: "eco-suppression-contribution-actionnariat-salarie",
    themeId: "economie",
    title: "Supprimer la contribution patronale sur l'actionnariat salarié",
    description:
      "Supprimer la contribution patronale sur les actions gratuites, BSPCE et stock-options pour faciliter le partage de la valeur et la rétention des talents, notamment dans la tech.",
    supportingParties: ["lr"],
  },
  {
    id: "eco-buy-european-first-numerique",
    themeId: "economie",
    title: "Instaurer un critère de souveraineté dans la commande publique numérique",
    description:
      "Créer un « pourcentage de souveraineté » noté pour tout logiciel ou équipement acheté par l'État, prenant en compte l'exposition aux lois extraterritoriales et la chaîne d'approvisionnement, devenant un critère d'attribution des marchés publics.",
    supportingParties: ["lr"],
  },
  {
    id: "travail-code-50-principes",
    themeId: "travail",
    title: "Refonder le Code du travail autour de 50 principes intangibles",
    description:
      "Réduire le Code du travail à un socle de cinquante principes indépassables, en donnant la primauté à l'accord collectif d'entreprise (ou de branche à défaut) sur la loi supplétive pour le reste.",
    supportingParties: ["lr"],
  },
  {
    id: "travail-veto-normes-entreprises",
    themeId: "travail",
    title: "Créer une autorité de contrôle des normes avec droit de veto",
    description:
      "Imposer qu'à toute nouvelle règle générant un coût pour les entreprises corresponde la suppression d'un coût équivalent, et créer une autorité indépendante dotée d'un pouvoir de veto sur les nouvelles normes, inspirée du modèle néerlandais.",
    supportingParties: ["lr"],
  },
  {
    id: "travail-fin-droit-erreur-discretionnaire",
    themeId: "travail",
    title: "Réserver les sanctions administratives aux seules fraudes intentionnelles",
    description:
      "Ne plus sanctionner l'erreur non intentionnelle des entreprises dans leurs démarches administratives, en réservant la sanction à la fraude caractérisée et en faisant reposer la charge de la preuve sur l'administration.",
    supportingParties: ["lr"],
  },
  {
    id: "travail-apprentissage-cap-bac2",
    themeId: "travail",
    title: "Réorienter les aides à l'apprentissage vers les niveaux CAP et Bac+2",
    description:
      "Réorienter progressivement les aides à l'apprentissage des filières du supérieur vers les niveaux CAP et Bac+2, où l'effet sur l'insertion dans l'emploi est le plus fort, et renforcer le pré-apprentissage pour les jeunes sans emploi ni formation.",
    supportingParties: ["lr"],
  },
  {
    id: "travail-lycees-pro-regions",
    themeId: "travail",
    title: "Transférer les lycées professionnels aux régions et aux entreprises",
    description:
      "Sortir les lycées professionnels et l'orientation professionnelle du giron de l'Éducation nationale pour les transférer aux régions et aux entreprises, en convergeant progressivement vers le modèle des centres de formation d'apprentis.",
    supportingParties: ["lr"],
  },
  {
    id: "travail-statut-co-entrepreneur-cadres",
    themeId: "travail",
    title: "Créer un statut de « co-entrepreneur » pour les cadres dirigeants",
    description:
      "Créer un statut d'indépendant pour les cadres dirigeants et experts rares les mieux rémunérés, avec une liberté d'organisation du travail et un accès facilité aux stock-options, en échange d'une sortie du droit du travail classique.",
    supportingParties: ["lr"],
  },
  {
    id: "travail-formation-reconversion-ia",
    themeId: "travail",
    title: "Tripler l'effort de formation des actifs menacés par l'intelligence artificielle",
    description:
      "Tripler progressivement l'effort national de formation professionnelle pour anticiper les métiers menacés par l'IA, en engageant la formation avant le licenciement et en créant un observatoire dédié.",
    supportingParties: ["lr"],
  },
  {
    id: "travail-cif-sans-plafond",
    themeId: "travail",
    title: "Supprimer le plafond du crédit d'impôt famille pour les crèches d'entreprise",
    description:
      "Supprimer le plafond de 500 000€ du crédit d'impôt famille dont bénéficient les entreprises finançant des places de crèche pour leurs salariés, et relever fortement le plafond d'exonération de l'aide employeur à la garde d'enfant.",
    supportingParties: ["lr"],
  },
  {
    id: "edu-simplification-creches",
    themeId: "education",
    title: "Simplifier les normes d'ouverture des crèches et micro-crèches",
    description:
      "Aligner le régime des micro-crèches sur celui, plus souple, des maisons d'assistantes maternelles, et permettre l'ouverture d'une micro-crèche en entreprise en moins de six mois.",
    supportingParties: ["lr"],
  },
  {
    id: "edu-doublement-ingenieurs-ia",
    themeId: "education",
    title: "Doubler le nombre d'ingénieurs formés à l'intelligence artificielle",
    description:
      "Doubler le nombre d'ingénieurs spécialisés en IA et robotique via des bourses d'excellence, et créer un visa « Talents Tech » pour attirer et rapatrier les talents technologiques français expatriés.",
    supportingParties: ["lr"],
  },
  {
    id: "edu-ia-reservee-lycee",
    themeId: "education",
    title: "Réserver l'usage pédagogique de l'IA au lycée",
    description:
      "Former les élèves de collège aux savoirs fondamentaux (lire, écrire, compter, raisonner) par des méthodes classiques sans intelligence artificielle, celle-ci n'étant introduite comme outil pédagogique qu'à partir du lycée.",
    supportingParties: ["lr"],
  },
  {
    id: "inst-ministere-ia-cto-etat",
    themeId: "institutions",
    title: "Créer un ministère de l'IA et un directeur technologique de l'État",
    description:
      "Créer un ministère de plein exercice chargé de l'intelligence artificielle, appuyé par un directeur technologique de l'État ayant autorité sur l'architecture des systèmes d'information publics et la doctrine de souveraineté numérique.",
    supportingParties: ["lr"],
  },
  {
    id: "inst-recentrage-cnil",
    themeId: "institutions",
    title: "Recentrer la CNIL sur la protection des mineurs",
    description:
      "Auditer la CNIL et redéfinir ses priorités pour la recentrer sur la protection des mineurs et des publics vulnérables plutôt que sur le freinage de l'innovation en intelligence artificielle.",
    supportingParties: ["lr"],
  },
  {
    id: "inst-derogation-rgpd-ai-act",
    themeId: "institutions",
    title: "Créer une dérogation expérimentale au RGPD et à l'AI Act",
    description:
      "Permettre, pour une durée de trois ans et sur déclaration préalable, de déroger au RGPD et à l'AI Act européen pour les projets de recherche et d'innovation jugés stratégiques.",
    supportingParties: ["lr"],
  },
  {
    id: "inst-automatisation-postes-publics",
    themeId: "institutions",
    title: "Réduire de 250 000 postes la fonction publique grâce à l'automatisation",
    description:
      "Automatiser les tâches administratives répétitives par l'intelligence artificielle pour redéployer une partie des agents vers le terrain et ne pas remplacer 125 000 départs à la retraite, pour environ 15 milliards d'euros d'économies annuelles.",
    supportingParties: ["lr"],
  },
  {
    id: "inst-agriculture-interet-fondamental",
    themeId: "institutions",
    title: "Inscrire l'agriculture comme intérêt fondamental de la Nation dans la Constitution",
    description:
      "Réviser la Constitution pour reconnaître l'agriculture comme intérêt fondamental de la Nation, afin d'éviter que des lois agricoles soient censurées au nom d'une lecture jugée déséquilibrée des principes environnementaux.",
    supportingParties: ["lr"],
  },
  {
    id: "inst-suppression-principe-precaution",
    themeId: "institutions",
    title: "Retirer le principe de précaution de la Charte de l'environnement",
    description:
      "Réviser par référendum la Charte de l'environnement pour remplacer le principe de précaution par un principe d'évaluation scientifique dans la décision publique.",
    supportingParties: ["lr"],
  },
  {
    id: "inst-interdiction-surtransposition",
    themeId: "institutions",
    title: "Interdire la sur-transposition des normes européennes en droit français",
    description:
      "Adopter une loi organique interdisant d'ajouter des contraintes nationales supplémentaires lors de la transposition des règles européennes en droit français, sur le modèle italien.",
    supportingParties: ["lr"],
  },
  {
    id: "secu-plan-vauban-numerique",
    themeId: "securite",
    title: "Lancer un plan de cybersécurité national piloté par l'ANSSI",
    description:
      "Renforcer l'ANSSI pour basculer les données sensibles vers un cloud souverain, cartographier les dépendances critiques et tester régulièrement la résistance des hôpitaux, mairies et réseaux vitaux aux cyberattaques.",
    supportingParties: ["lr"],
  },
  {
    id: "secu-video-intelligente-encadree",
    themeId: "securite",
    title: "Autoriser la vidéosurveillance algorithmique dans un cadre légal strict",
    description:
      "Autoriser l'usage de la vision par ordinateur pour la lutte contre le terrorisme et la protection des sites critiques, sous contrôle parlementaire strict et interdiction de la reconnaissance faciale de masse en temps réel.",
    supportingParties: ["lr"],
  },
  {
    id: "secu-renforcement-viginum",
    themeId: "securite",
    title: "Renforcer VIGINUM contre les campagnes de désinformation étrangères",
    description:
      "Doter le service de vigilance face aux ingérences numériques étrangères (VIGINUM) d'équipes de réaction rapide et d'un mandat de riposte, en s'appuyant exclusivement sur la vérification factuelle.",
    supportingParties: ["lr"],
  },
  {
    id: "env-nucleaire-80-ans",
    themeId: "environnement",
    title: "Fixer un horizon d'exploitation de 80 ans pour les réacteurs nucléaires",
    description:
      "Fixer d'emblée un horizon d'exploitation de 80 ans pour les réacteurs nucléaires existants, plutôt qu'un renouvellement par tranches de dix ans, pour sécuriser les investissements de long terme et viser une production annuelle proche de 400 TWh.",
    supportingParties: ["lr"],
  },
  {
    id: "env-epr2-securiser-8-supplementaires",
    themeId: "environnement",
    title: "Sécuriser les 6 EPR2 en construction et en commander 8 de plus",
    description:
      "Garantir les coûts et délais des six réacteurs EPR2 déjà lancés, et commander huit réacteurs supplémentaires si ce programme tient ses engagements.",
    supportingParties: ["lr"],
  },
  {
    id: "env-relance-hydroelectricite",
    themeId: "environnement",
    title: "Relancer l'hydroélectricité et les stations de transfert d'énergie",
    description:
      "Moderniser le parc hydroélectrique existant, ajouter plusieurs gigawatts de capacité et relancer des projets de stations de transfert d'énergie par pompage (STEP), notamment en outre-mer.",
    supportingParties: ["lr"],
  },
  {
    id: "env-stop-subventions-eolien-solaire",
    themeId: "environnement",
    title: "Arrêter les subventions publiques à l'éolien et au photovoltaïque",
    description:
      "Ne plus lancer de nouveaux appels d'offres subventionnés pour l'éolien terrestre et offshore et le solaire, et supprimer les avantages fiscaux et tarifaires associés aux nouvelles installations.",
    supportingParties: ["lr"],
  },
  {
    id: "env-priorite-dispatch-nucleaire",
    themeId: "environnement",
    title: "Garantir par la loi la priorité de fonctionnement du nucléaire",
    description:
      "Inscrire dans la loi qu'aucun réacteur nucléaire ne peut être mis à l'arrêt faute de demande, en donnant la priorité au nucléaire sur le réseau électrique et en pouvant restreindre les importations d'électricité.",
    supportingParties: ["lr"],
  },
  {
    id: "env-suppression-cee-electricite",
    themeId: "environnement",
    title: "Sortir l'électricité du dispositif des certificats d'économie d'énergie",
    description:
      "Retirer l'électricité du périmètre des certificats d'économies d'énergie (CEE), ce qui ferait immédiatement baisser la facture des consommateurs d'environ 5%.",
    supportingParties: ["lr"],
  },
  {
    id: "env-dpe-chauffage-electrique",
    themeId: "environnement",
    title: "Réviser le coefficient du chauffage électrique dans le diagnostic de performance énergétique",
    description:
      "Abaisser le coefficient d'énergie primaire du chauffage électrique utilisé dans le DPE, pour ne plus pénaliser artificiellement ce mode de chauffage et débloquer plusieurs centaines de milliers de logements classés à tort comme passoires thermiques.",
    supportingParties: ["lr"],
  },
  {
    id: "env-relance-reacteurs-4e-generation",
    themeId: "environnement",
    title: "Relancer la recherche sur les réacteurs nucléaires de 4e génération",
    description:
      "Accélérer la recherche sur un démonstrateur de réacteur à neutrons rapides pour viser un premier réacteur de puissance en 2045, afin de démultiplier le potentiel énergétique de l'uranium déjà disponible.",
    supportingParties: ["lr"],
  },
  {
    id: "env-opposition-grid-package-europeen",
    themeId: "environnement",
    title: "S'opposer au plan européen d'interconnexions électriques",
    description:
      "Refuser le programme européen d'interconnexions électriques jugé coûteux pour la France, en invoquant si nécessaire le traité Euratom pour protéger la souveraineté du mix énergétique français.",
    supportingParties: ["lr"],
  },
  {
    id: "env-securiser-chaines-valeur-energie",
    themeId: "environnement",
    title: "Sécuriser les stocks stratégiques d'uranium et la filière batteries",
    description:
      "Porter les stocks stratégiques d'uranium à cinq ans de consommation, développer une filière européenne de batteries et auditer les équipements solaires étrangers pilotables à distance pour prévenir les risques de cybersécurité.",
    supportingParties: ["lr"],
  },
  {
    id: "env-suppression-ofb",
    themeId: "environnement",
    title: "Supprimer l'Office français de la biodiversité",
    description:
      "Supprimer l'Office français de la biodiversité pour distinguer à nouveau une entité dédiée à la biodiversité et une entité dédiée à la chasse et à la faune sauvage, en transférant la police de l'environnement à la gendarmerie.",
    supportingParties: ["lr"],
  },
  {
    id: "env-reconnaissance-mutuelle-anses",
    themeId: "environnement",
    title: "Autoriser automatiquement les produits phytosanitaires déjà validés dans l'UE",
    description:
      "Autoriser automatiquement en France tout produit phytosanitaire déjà homologué dans un autre pays de l'Union européenne, sans nouvelle évaluation complète par l'ANSES, comme l'acétamipride pour les néonicotinoïdes.",
    supportingParties: ["lr"],
  },
  {
    id: "env-zan-suppression",
    themeId: "environnement",
    title: "Supprimer l'objectif de zéro artificialisation nette (ZAN)",
    description:
      "Abroger l'objectif de zéro artificialisation nette, jugé pénalisant pour les communes rurales et l'agriculture, au profit d'objectifs de sobriété foncière négociés localement.",
    supportingParties: ["lr"],
  },
  {
    id: "env-revision-seuils-icpe-elevage",
    themeId: "environnement",
    title: "Assouplir les seuils des installations classées pour l'élevage",
    description:
      "Aligner par ordonnance les seuils des installations classées pour la protection de l'environnement (ICPE) applicables à l'élevage sur le socle réglementaire européen, moins contraignant qu'aujourd'hui.",
    supportingParties: ["lr"],
  },
  {
    id: "env-stockage-eau-agricole",
    themeId: "environnement",
    title: "Sécuriser juridiquement les retenues d'eau agricoles",
    description:
      "Reconnaître le stockage d'eau agricole comme un projet d'intérêt général majeur pour sécuriser juridiquement les retenues d'eau et bassines, avec des délais d'instruction opposables.",
    supportingParties: ["lr"],
  },
  {
    id: "env-interdiction-subventions-agribashing",
    themeId: "environnement",
    title: "Retirer l'agrément des associations pratiquant des actions jugées abusives contre l'agriculture",
    description:
      "Rendre réversible l'agrément des associations environnementales en cas de recours abusifs ou d'entraves aux exploitations agricoles, et raccourcir les délais de recours contre les projets agricoles.",
    supportingParties: ["lr"],
  },
  {
    id: "env-etiquetage-origine-alimentaire",
    themeId: "environnement",
    title: "Renforcer l'étiquetage de l'origine des produits alimentaires",
    description:
      "Rendre obligatoire l'indication de l'origine de tout ingrédient représentant 10% ou plus d'un produit alimentaire, et réserver les termes « viande » ou « steak » aux produits d'origine animale.",
    supportingParties: ["lr"],
  },
  {
    id: "europe-opposition-integration-agricole-ukraine",
    themeId: "europe",
    title: "S'opposer à l'intégration agricole de l'Ukraine dans le marché européen",
    description:
      "Refuser toute évolution du marché agricole européen qui intégrerait pleinement l'Ukraine, jugée risquée pour la Politique agricole commune et les filières agricoles françaises.",
    supportingParties: ["lr"],
  },
  {
    id: "europe-reforme-centrales-achat",
    themeId: "europe",
    title: "Responsabiliser les centrales d'achat européennes envers les producteurs français",
    description:
      "Faire évoluer le droit européen de la concurrence pour responsabiliser les centrales d'achat internationales des distributeurs vis-à-vis des producteurs agricoles français.",
    supportingParties: ["lr"],
  },
  {
    id: "log-simplification-plu",
    themeId: "logement",
    title: "Simplifier radicalement les plans locaux d'urbanisme",
    description:
      "Remplacer les plans locaux d'urbanisme actuels, souvent longs de centaines de pages, par un document allégé limité à l'essentiel (hauteur, implantation, rapport à la rue).",
    supportingParties: ["lr"],
  },
  {
    id: "log-controle-a-posteriori-permis",
    themeId: "logement",
    title: "Passer à un contrôle a posteriori des permis de construire",
    description:
      "Faire reposer la conformité aux normes de construction sur une attestation du maître d'ouvrage contrôlée en cours de chantier, plutôt que sur une vérification a priori avant délivrance du permis.",
    supportingParties: ["lr"],
  },
  {
    id: "log-loi-urgence-diviser-delais",
    themeId: "logement",
    title: "Diviser par deux les délais de construction avec une loi d'urgence",
    description:
      "Créer un guichet unique d'instruction avec un calendrier fixé dès le dépôt du dossier, une règle de silence valant accord et une enquête publique unique, pour réduire les délais de construction de 7 à 3 ans en moyenne.",
    supportingParties: ["lr"],
  },
  {
    id: "log-lutte-recours-abusifs-urbanisme",
    themeId: "logement",
    title: "Lutter contre les recours abusifs contre les permis de construire",
    description:
      "Restreindre l'intérêt à agir contre les permis de construire, exiger une consignation financière à l'introduction d'un recours et instaurer une procédure prioritaire à délais contraints.",
    supportingParties: ["lr"],
  },
  {
    id: "log-tva-maires-batisseurs",
    themeId: "logement",
    title: "Reverser une part de la TVA aux maires qui construisent des logements",
    description:
      "Reverser plusieurs milliers d'euros de TVA à la commune pour chaque logement neuf construit, afin de financer les équipements publics et créer un intérêt financier à la construction.",
    supportingParties: ["lr"],
  },
  {
    id: "log-moratoire-normatif-construction",
    themeId: "logement",
    title: "Instaurer un moratoire de 10 ans sur les nouvelles normes de construction",
    description:
      "Stabiliser la réglementation environnementale de la construction neuve (RE2020) en annulant ses prochains paliers de durcissement, pour donner de la visibilité aux professionnels du bâtiment.",
    supportingParties: ["lr"],
  },
  {
    id: "log-construction-hors-site",
    themeId: "logement",
    title: "Développer la construction préfabriquée en usine",
    description:
      "Lever les freins réglementaires à la construction modulaire et préfabriquée en usine, pour réduire les délais de construction de 30 à 50% et les coûts de 10 à 20%.",
    supportingParties: ["lr"],
  },
  {
    id: "log-transformation-bureaux-logements",
    themeId: "logement",
    title: "Faciliter la transformation de bureaux et commerces vacants en logements",
    description:
      "Suspendre l'autorisation préalable de changement de destination pour les bâtiments existants, avec un objectif de 150 000 logements créés en cinq ans par la transformation de bureaux et commerces vacants.",
    supportingParties: ["lr"],
  },
  {
    id: "log-mobilisation-friches-diverses",
    themeId: "logement",
    title: "Mobiliser les friches industrielles et ferroviaires pour le logement",
    description:
      "Reconnaître la reconversion des friches industrielles, commerciales et ferroviaires comme projet d'intérêt public majeur, avec un registre national dédié et des normes environnementales simplifiées.",
    supportingParties: ["lr"],
  },
  {
    id: "log-densification-douce-pavillonnaire",
    themeId: "logement",
    title: "Faciliter la densification douce des zones pavillonnaires",
    description:
      "Faciliter la division parcellaire et supprimer les surfaces minimales de terrain constructible dans les zones résidentielles peu denses, sous le contrôle du maire.",
    supportingParties: ["lr"],
  },
  {
    id: "log-ptz-reforme-primo-accedants",
    themeId: "logement",
    title: "Réserver le prêt à taux zéro aux primo-accédants sans zonage",
    description:
      "Réformer le prêt à taux zéro pour le réserver aux primo-accédants, l'ouvrir au neuf comme à l'ancien sans distinction de zone géographique, avec un financement pris en charge par la Caisse des dépôts.",
    supportingParties: ["lr"],
  },
  {
    id: "log-bail-reel-solidaire",
    themeId: "logement",
    title: "Développer le bail réel solidaire pour dissocier foncier et bâti",
    description:
      "Développer le bail réel solidaire, qui dissocie la propriété du foncier de celle du bâti pour permettre une décote d'environ 30% à l'achat, en mobilisant davantage le foncier public.",
    supportingParties: ["lr"],
  },
  {
    id: "log-vente-pavillons-hlm-locataires",
    themeId: "logement",
    title: "Faciliter la vente de pavillons HLM à leurs locataires",
    description:
      "Ouvrir, après dix ans d'occupation, un droit d'achat avec décote de 20% pour les locataires de pavillons HLM, financé par un fonds de mutualisation, avec remplacement du parc vendu un pour un.",
    supportingParties: ["lr"],
  },
  {
    id: "log-pacte-famille-logement",
    themeId: "logement",
    title: "Déduire une part des intérêts d'emprunt immobilier selon le nombre d'enfants",
    description:
      "Permettre aux familles avec enfants mineurs de déduire de leur impôt sur le revenu une part de leurs intérêts d'emprunt immobilier pour leur résidence principale, croissante selon le nombre d'enfants, avec transfert possible du prêt en cas de déménagement.",
    supportingParties: ["lr"],
  },
  {
    id: "log-fin-interdiction-location-dpe",
    themeId: "logement",
    title: "Mettre fin à l'interdiction de louer les logements mal classés au DPE",
    description:
      "Rendre le diagnostic de performance énergétique purement informatif plutôt qu'excluant, en annulant les interdictions de mise en location des logements classés F et G et les obligations de travaux associées, au profit d'un accompagnement non contraignant.",
    supportingParties: ["lr", "rn"],
  },
  {
    id: "log-suppression-encadrement-loyers",
    themeId: "logement",
    title: "Supprimer l'encadrement des loyers",
    description:
      "Abroger les dispositifs d'encadrement des loyers (loi ELAN et plafonnements de la loi de 1989), pour laisser le loyer être librement fixé entre bailleur et locataire.",
    supportingParties: ["lr"],
  },
  {
    id: "log-statut-bailleur-prive",
    themeId: "logement",
    title: "Créer un statut fiscal incitatif pour les bailleurs privés",
    description:
      "Créer un statut du bailleur privé avec un amortissement fiscal annuel du bien, bonifié pour les loyers modérés, dans un cadre fiscal garanti sur dix ans.",
    supportingParties: ["lr"],
  },
  {
    id: "log-lutte-divisions-abusives",
    themeId: "logement",
    title: "Lutter contre les divisions abusives de logements",
    description:
      "Rendre obligatoire le permis de diviser en zones tendues et quartiers prioritaires, avec un pouvoir de substitution du préfet, pour lutter contre les marchands de sommeil et les colocations indignes.",
    supportingParties: ["lr"],
  },
  {
    id: "log-tolerance-zero-squat-impayes",
    themeId: "logement",
    title: "Accélérer les procédures d'expulsion en cas de squat ou d'impayés",
    description:
      "Permettre une expulsion administrative sous dix jours en cas de squat avéré, accélérer les procédures pour impayés de loyer, et indemniser automatiquement le propriétaire si l'État n'exécute pas une décision d'expulsion dans les délais.",
    supportingParties: ["lr"],
  },
  {
    id: "log-reforme-sru-objectifs-negocies",
    themeId: "logement",
    title: "Remplacer les quotas SRU uniformes par des objectifs négociés localement",
    description:
      "Remplacer les quotas uniformes de logements sociaux de la loi SRU par des objectifs de production négociés par contrats territoriaux, avec un plafonnement à 30% de logements sociaux par territoire.",
    supportingParties: ["lr"],
  },
  {
    id: "log-extinction-dalo",
    themeId: "logement",
    title: "Transformer le droit au logement opposable en simple droit à une solution",
    description:
      "Transformer le droit au logement opposable (DALO) en un droit à une solution de logement plutôt qu'un accès automatique et prioritaire au parc social des métropoles.",
    supportingParties: ["lr"],
  },
  {
    id: "log-conditionnement-hebergement-urgence-regularite",
    themeId: "logement",
    title: "Conditionner l'hébergement d'urgence à la régularité du séjour",
    description:
      "Mettre fin à l'inconditionnalité de l'hébergement d'urgence pour les personnes en situation irrégulière ou sous obligation de quitter le territoire, et plafonner sa durée à dix-huit mois.",
    supportingParties: ["lr"],
  },
  {
    id: "log-suppression-exoneration-is-bailleurs-hlm",
    themeId: "logement",
    title: "Supprimer progressivement l'exonération d'impôt sur les sociétés des bailleurs HLM",
    description:
      "Supprimer sur cinq ans l'exonération d'impôt sur les sociétés dont bénéficient les bailleurs sociaux, en redistribuant les recettes vers les organismes qui construisent le plus.",
    supportingParties: ["lr"],
  },
];

export const propositionById = Object.fromEntries(
  propositions.map((p) => [p.id, p])
);
