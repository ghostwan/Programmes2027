import { Proposition } from "@/lib/types";
import { partyById } from "@/lib/data/parties";

const REPO = "ghostwan/Programmes2027";

/**
 * Builds a prefilled "New issue" GitHub URL so visitors can report that a
 * party actually supports (or no longer supports) a given proposition,
 * along with a source. This is a plain link (no client JS, no server
 * round-trip on our side) — GitHub hosts the form.
 */
export function buildCorrectionIssueUrl(prop: Proposition): string {
  const currentParties = prop.supportingParties
    .map((id) => partyById[id]?.shortName ?? id)
    .join(", ") || "aucun";

  const title = `Correction proposition : ${prop.title}`;
  const body = [
    `Proposition concernée : **${prop.title}** (\`${prop.id}\`)`,
    "",
    `Partis actuellement listés comme la soutenant : ${currentParties}`,
    "",
    "Quel parti faudrait-il ajouter (ou retirer) ?",
    "> ",
    "",
    "Source (programme officiel, déclaration, vote...) :",
    "> ",
  ].join("\n");

  const params = new URLSearchParams({
    title,
    body,
    labels: "correction-donnees",
  });

  return `https://github.com/${REPO}/issues/new?${params.toString()}`;
}
