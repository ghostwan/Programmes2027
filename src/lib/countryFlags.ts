/**
 * Maps country/entity names (as they appear in `InternationalExample.country`
 * strings, e.g. "Allemagne, Espagne (référence théorique)") to flag emoji.
 *
 * Matching is done by looking for known country names anywhere in the
 * string (longest names first, to avoid partial overlaps), rather than by
 * splitting on delimiters, since some entries mix separators ("," / "et" /
 * "/") and parenthetical qualifiers ("États-Unis (Californie)").
 */
const COUNTRY_FLAGS: Array<[string, string]> = [
  ["Corée du Sud", "🇰🇷"],
  ["Royaume-Uni", "🇬🇧"],
  ["Pays-Bas", "🇳🇱"],
  ["Union européenne", "🇪🇺"],
  ["Nouvelle-Zélande", "🇳🇿"],
  ["Allemagne", "🇩🇪"],
  ["Danemark", "🇩🇰"],
  ["Espagne", "🇪🇸"],
  ["Italie", "🇮🇹"],
  ["Angleterre", "🇬🇧"],
  ["États-Unis", "🇺🇸"],
  ["Canada", "🇨🇦"],
  ["Autriche", "🇦🇹"],
  ["Suisse", "🇨🇭"],
  ["Suède", "🇸🇪"],
  ["Norvège", "🇳🇴"],
  ["Finlande", "🇫🇮"],
  ["Grèce", "🇬🇷"],
  ["Irlande", "🇮🇪"],
  ["Pologne", "🇵🇱"],
  ["Belgique", "🇧🇪"],
  ["Islande", "🇮🇸"],
  ["Australie", "🇦🇺"],
  ["Québec", "🇨🇦"],
  ["France", "🇫🇷"],
];

export function getCountryFlags(countryLabel: string | undefined): string[] {
  if (!countryLabel) return [];
  const flags: string[] = [];
  for (const [name, flag] of COUNTRY_FLAGS) {
    if (countryLabel.includes(name) && !flags.includes(flag)) {
      flags.push(flag);
    }
  }
  return flags;
}
