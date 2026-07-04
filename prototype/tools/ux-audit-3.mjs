import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:5173';
const OUT = 'C:\\Users\\2504690\\hack-kp-2026\\audit\\final';
const GL = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ headless: true, args: GL });
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  await page.setViewportSize({ width: 1600, height: 900 });
  const client = await page.context().newCDPSession(page);

  async function cdpShot(name) {
    const { data } = await client.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    fs.writeFileSync(path.join(OUT, name), Buffer.from(data, 'base64'));
    console.log('  cdp-shot', name);
  }
  async function goto(route) {
    await page.goto(BASE + route, { waitUntil: 'domcontentloaded' }).catch(() => {});
    await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
  }

  // 32 - /ask answered
  await goto('/ask');
  await sleep(2000);
  await page.locator('[data-demo="ask-chip"]').first().click().catch(() => {});
  await sleep(7000);
  await cdpShot('32-console-ask-answered.png');

  // 33 - /aicore idle
  await goto('/aicore');
  await sleep(3000);
  await cdpShot('33-console-aicore.png');

  // 36 - /synthetic idle
  await goto('/synthetic');
  await sleep(3000);
  await cdpShot('36-console-synthetic.png');

  // 37 - /synthetic reanalyze mid
  await page.locator('[data-demo="synthetic-reanalyze"]').first().click().catch(() => {});
  await sleep(2200);
  await cdpShot('37-console-synthetic-reanalyze-mid.png');

  await browser.close();
  process.exit(0);
})();
