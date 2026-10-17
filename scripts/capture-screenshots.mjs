import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const OUT = path.join(root, "docs/screenshots");
const BASE = process.env.BASE_URL || "http://localhost:3000";
const VIEWPORT = { width: 1576, height: 1054 };

const shots = [
  { file: "users-light.png", path: "/users/u1", theme: "light" },
  { file: "users-dark.png", path: "/users/u1", theme: "dark" },
  { file: "devices-light.png", path: "/devices/d1", theme: "light" },
  { file: "settings-light.png", path: "/settings", theme: "light" },
  { file: "settings-dark.png", path: "/settings", theme: "dark" },
  { file: "apps-light.png", path: "/apps", theme: "light" },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: 1,
});
const page = await context.newPage();

for (const shot of shots) {
  await page.goto("about:blank");
  await page.addInitScript((theme) => {
    localStorage.setItem("abm-theme", theme);
    localStorage.setItem("abm-preset", "normal");
  }, shot.theme);

  await page.goto(BASE + shot.path, { waitUntil: "networkidle" });
  await page.evaluate((theme) => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme === "dark" ? "dark" : "light";
    localStorage.setItem("abm-theme", theme);
  }, shot.theme);

  await page.waitForSelector('nav[aria-label="Primary"]', { timeout: 15000 });
  // SupportFab appearAfterMs (800) + settle
  await page.waitForTimeout(1300);

  const outPath = path.join(OUT, shot.file);
  await page.screenshot({ path: outPath, type: "png" });
  console.log("wrote", shot.file);
}

await browser.close();
console.log("done");
