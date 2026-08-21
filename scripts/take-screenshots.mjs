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
  const pourIds = [
    "eco-isf",
    "eco-is-baisse",
    "eco-superprofits",
    "eco-taxe-zucman",
    "eco-bareme-progressif",
    "eco-fonds-production",
    "eco-renationalisation-energie",
    "eco-separation-bancaire",
    "eco-pole-public-bancaire",
    "eco-audit-dette",
    "eco-encadrement-dividendes",
    "eco-austerite",
    "eco-protectionnisme",
    "eco-taxe-succession",
    "eco-seuil-zero-cotisation",
    "eco-compte-social-unique",
    "eco-tva-verte",
    "eco-exoneration-salaires",
    "eco-iff",
    "eco-cotisation-revenus-financiers",
  ];
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.evaluate((ids) => {
    const answers = Object.fromEntries(ids.map((id) => [id, "pour"]));
    window.localStorage.setItem("programmes2027:answers", JSON.stringify(answers));
    window.localStorage.setItem(
      "programmes2027:game-state",
      JSON.stringify({ deckIds: ids, index: ids.length })
    );
  }, pourIds);
  await page.goto("http://localhost:3000/resultats", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, "resultats.png"), fullPage: true });
  console.log("captured resultats.png");

  await browser.close();
})();
