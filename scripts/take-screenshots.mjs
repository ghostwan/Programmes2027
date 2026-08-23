// One-off dev tool used to (re)generate the screenshots embedded in the
// README. Requires a local dev server running on :3000 and Playwright
// available (run `npm install --no-save playwright` first, it's not a
// project dependency to keep production installs lean).
//
// Usage: npm run dev (in one terminal), then in another:
//   npm install --no-save playwright && node scripts/take-screenshots.mjs
import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "screenshots");
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  { url: "http://localhost:3000/", file: "accueil.png", wait: 500 },
  { url: "http://localhost:3000/themes/economie", file: "theme-economie.png", wait: 500 },
  { url: "http://localhost:3000/jeu", file: "jeu.png", wait: 800 },
  { url: "http://localhost:3000/partis", file: "partis.png", wait: 500 },
];

(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  for (const p of pages) {
    await page.goto(p.url, { waitUntil: "networkidle" });
    await page.waitForTimeout(p.wait);
    await page.screenshot({ path: path.join(outDir, p.file) });
    console.log("captured", p.file);
  }

  // Build a small basket then capture the market/coalition view with content.
  await page.goto("http://localhost:3000/themes/economie", { waitUntil: "networkidle" });
  const addButtons = await page.locator('[title="Ajouter au marché des propositions"]').all();
  for (const btn of addButtons.slice(0, 4)) {
    await btn.click();
  }
  await page.goto("http://localhost:3000/themes/environnement", { waitUntil: "networkidle" });
  const addButtons2 = await page.locator('[title="Ajouter au marché des propositions"]').all();
  for (const btn of addButtons2.slice(0, 3)) {
    await btn.click();
  }
  await page.goto("http://localhost:3000/marche", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, "marche.png"), fullPage: true });
  console.log("captured marche.png (with basket content)");

  // Simulate a finished quiz (answers stored in localStorage) to capture
  // the results page with its coalition/hemicycle section populated.
  // Answers are chosen so the PS ends up as the top match (highest
  // compatibility percentage) in the screenshot: "pour" to every
  // proposition the PS supports (across many themes, for a good spread
  // in the "Classement complet" list), plus "contre" to a handful of
  // propositions supported by LFI but not PS, which otherwise would be
  // the PS's closest rival.
  const psSupportedIds = [
    "eco-isf", "eco-superprofits", "eco-taxe-zucman", "eco-taxe-succession",
    "eco-bareme-progressif", "travail-retraites-62", "travail-4jours",
    "travail-smic", "travail-plafond-salaires", "travail-cetu",
    "travail-secu-independants", "immi-regularisation",
    "immi-renouvellement-auto-titres", "immi-droit-travail-asile",
    "immi-titre-sejour-automatique", "immi-ofpra-independance",
    "immi-asile-genre", "secu-effectifs", "secu-peines-alternatives",
    "secu-legalisation-cannabis", "secu-police-proximite", "secu-recepisse",
    "secu-doctrine-maintien-ordre", "edu-salaires-enseignants",
    "edu-effectifs-classe", "edu-parcoursup", "edu-allocation-autonomie",
    "sante-recrutement-soignants", "sante-deserts-medicaux",
    "sante-formation-medecins", "sante-100-sante", "sante-t2a",
    "sante-grande-secu", "sante-prevention", "env-taxe-carbone",
    "env-renouvelables", "env-mix-nucleaire-renouvelable-parlement",
    "env-ecocide", "env-mercosur", "env-pfas", "europe-defense-commune",
    "europe-soutien-ukraine", "europe-pac", "europe-avoirs-russes",
    "europe-suspension-israel", "inst-ric", "inst-cese-citoyens",
    "inst-non-cumul", "inst-proportionnelle", "inst-defenseur-laicite",
    "log-encadrement-loyers", "log-logements-sociaux", "log-taxation-vacance",
    "log-taxe-multipropriete", "log-leasing", "log-prime-climat",
    "edu-petite-enfance", "sante-mentale-plan", "sante-malbouffe",
    "env-eau-bien-commun", "immi-schengen-refonte",
    "europe-onu-reforme-conseil-securite",
  ];
  const lfiNotPsIds = [
    "eco-protectionnisme", "eco-cotisation-revenus-financiers",
    "eco-renationalisation-energie", "travail-35h", "travail-retraite-60",
    "edu-choc-savoirs", "edu-gratuite-cantines", "sante-onbam",
    "env-regle-verte", "env-crime-climatique", "europe-desobeissance-budgetaire",
    "europe-sortie-otan", "inst-6e-republique", "log-sru-acte2",
    "log-moratoire-expulsions",
  ];
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.evaluate(
    ({ pourIds, contreIds }) => {
      const answers = {
        ...Object.fromEntries(pourIds.map((id) => [id, "pour"])),
        ...Object.fromEntries(contreIds.map((id) => [id, "contre"])),
      };
      window.localStorage.setItem("programmes2027:answers", JSON.stringify(answers));
      window.localStorage.removeItem("programmes2027:game-state");
    },
    { pourIds: psSupportedIds, contreIds: lfiNotPsIds }
  );
  await page.goto("http://localhost:3000/resultats", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, "resultats.png"), fullPage: true });
  console.log("captured resultats.png");

  await browser.close();
})();
