import { Theme } from "@/lib/types";

export const themes: Theme[] = [
  {
    id: "economie",
    name: "Économie et fiscalité",
    icon: "💶",
    description: "Impôts, dépense publique, fiscalité des entreprises et des ménages.",
  },
  {
    id: "travail",
    name: "Travail et emploi",
    icon: "💼",
    description: "Retraites, salaire minimum, droit du travail, temps de travail.",
  },
  {
    id: "immigration",
    name: "Immigration",
    icon: "🛂",
    description: "Politique migratoire, droit d'asile, intégration, droit du sol.",
  },
  {
    id: "securite",
    name: "Sécurité et justice",
    icon: "⚖️",
    description: "Police, justice, prisons, politique pénale.",
  },
  {
    id: "education",
    name: "Éducation",
    icon: "🎓",
    description: "École, enseignants, méthodes pédagogiques, enseignement privé.",
  },
  {
    id: "sante",
    name: "Santé",
    icon: "🏥",
    description: "Hôpital, déserts médicaux, remboursements, personnel soignant.",
  },
  {
    id: "environnement",
    name: "Environnement et énergie",
    icon: "🌱",
    description: "Nucléaire, énergies renouvelables, fiscalité écologique.",
  },
  {
    id: "europe",
    name: "Europe et international",
    icon: "🇪🇺",
    description: "Union européenne, défense, relations internationales.",
  },
  {
    id: "institutions",
    name: "Institutions et démocratie",
    icon: "🏛️",
    description: "Constitution, référendum, mode de scrutin, cumul des mandats.",
  },
  {
    id: "logement",
    name: "Logement",
    icon: "🏠",
    description: "Loyers, logement social, construction, accession à la propriété.",
  },
];

export const themeById = Object.fromEntries(themes.map((t) => [t.id, t]));
