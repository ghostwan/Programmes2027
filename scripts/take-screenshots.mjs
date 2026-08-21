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
  { url: "http://localhost:3000/marche", file: "marche.png", wait: 500 },
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
  const addButtons = await page.locator('button:has-text("Ajouter")').all();
  for (const btn of addButtons.slice(0, 4)) {
    await btn.click();
  }
  await page.goto("http://localhost:3000/themes/environnement", { waitUntil: "networkidle" });
  const addButtons2 = await page.locator('button:has-text("Ajouter")').all();
  for (const btn of addButtons2.slice(0, 3)) {
    await btn.click();
  }
  await page.goto("http://localhost:3000/marche", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, "marche-programme.png"), fullPage: true });
  console.log("captured marche-programme.png");

  await browser.close();
})();
