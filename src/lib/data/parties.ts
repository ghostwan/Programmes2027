import { Party } from "@/lib/types";

export const parties: Party[] = [
  {
    id: "pcf",
    name: "Parti Communiste Français",
    shortName: "PCF",
    family: "Gauche",
    color: "#DA291C",
    description:
      "Parti historique de la gauche, défend un protectionnisme solidaire et une forte intervention de l'État dans l'économie.",
    sources: [
      { label: "Le programme du PCF", url: "https://www.pcf.fr/le_programme" },
    ],
  },
  {
    id: "lfi",
    name: "La France Insoumise",
    shortName: "LFI",
    family: "Gauche radicale",
    color: "#CC2443",
    description:
      "Mouvement porté par Jean-Luc Mélenchon, prônant une VIe République, une rupture avec les traités européens jugés trop libéraux et une politique de partage des richesses.",
    sources: [
      {
        label: "L'Avenir en commun, édition 2025",
        url: "https://melenchon2027.fr/programme2025/livre/",
      },
    ],
  },
  {
    id: "ps",
    name: "Parti Socialiste",
    shortName: "PS",
    family: "Gauche",
    color: "#FF8080",
    description:
      "Parti historique de la gauche de gouvernement, en recomposition depuis la fin de la NUPES, positionné sur une ligne social-démocrate.",
    sources: [
      { label: "Le Projet socialiste", url: "https://projet-socialiste.fr/projet/" },
    ],
  },
  {
    id: "eelv",
    name: "Les Écologistes",
    shortName: "EELV",
    family: "Écologie",
    color: "#2E7D32",
    description:
      "Parti écologiste plaçant la transition environnementale et la justice sociale au cœur de son projet.",
    sources: [
      {
        label: "Le nouveau programme des Écologistes, « Pour une prospérité écologique »",
        url: "https://lesecologistes.fr/share/page/6ImK65GKUnvibm33WGkjkj/projet",
      },
    ],
  },
  {
    id: "renaissance",
    name: "Renaissance",
    shortName: "REN",
    family: "Centre",
    color: "#FFD700",
    description:
      "Parti du camp présidentiel issu de LREM, ligne libérale et pro-européenne, porteur du bilan des deux quinquennats Macron.",
    sources: [
      {
        label: "Conventions thématiques Renaissance",
        url: "https://parti-renaissance.fr",
      },
    ],
  },
  {
    id: "lr",
    name: "Les Républicains",
    shortName: "LR",
    family: "Droite",
    color: "#0066CC",
    description:
      "Parti de la droite classique, en pleine recomposition après le départ d'une partie de ses cadres vers le RN en 2024.",
    sources: [
      { label: "Nos propositions - Les Républicains", url: "https://republicains.fr" },
    ],
  },
  {
    id: "rn",
    name: "Rassemblement National",
    shortName: "RN",
    family: "Droite nationaliste",
    color: "#0D378A",
    description:
      "Parti national-populiste, a abandonné officiellement le Frexit et la sortie de l'euro depuis 2019 au profit d'une ligne europe des nations.",
    sources: [
      {
        label: "Projet de gouvernement - Rassemblement National",
        url: "https://rassemblementnational.fr",
      },
    ],
  },
  {
    id: "reconquete",
    name: "Reconquête",
    shortName: "REC",
    family: "Droite radicale",
    color: "#6A0DAD",
    description:
      "Parti fondé par Éric Zemmour, ligne plus radicale sur l'immigration et l'identité, plus libérale que le RN sur l'économie.",
    sources: [
      {
        label: "Reconquête (fiche Wikipédia)",
        url: "https://fr.wikipedia.org/wiki/Reconqu%C3%AAte_(parti_politique)",
      },
    ],
  },
];

export const partyById = Object.fromEntries(parties.map((p) => [p.id, p]));
