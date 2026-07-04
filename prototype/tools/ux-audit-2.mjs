import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:5173';
const OUT = 'C:\\Users\\2504690\\hack-kp-2026\\audit\\final';
const GL = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'];

const consoleLog = JSON.parse(fs.readFileSync(path.join(OUT, 'console-log.json'), 'utf8'));
let currentRoute = '/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let shotN = 31; // continue after 31
async function shot(page, name) {
  shotN += 1;
  const file = String(shotN).padStart(2, '0') + '-' + name + '.png';
  await page.screenshot({ path: path.join(OUT, file), animations: 'disabled', timeout: 15000 }).catch((e) => console.log('  shot-fail', file, e.message.slice(0, 60)));
  console.log('  shot', file);
}
async function goto(page, route, label) {
  currentRoute = label || route;
  await page.goto(BASE + route, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
}

(async () => {
  const browser = await chromium.launch({ headless: true, args: GL });
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  await page.setViewportSize({ width: 1600, height: 900 });
  page.on('console', (m) => { const t = m.type(); if (t === 'error' || t === 'warning') consoleLog.push({ route: currentRoute, type: t, text: m.text().slice(0, 400) }); });
  page.on('pageerror', (e) => consoleLog.push({ route: currentRoute, type: 'pageerror', text: (e.message || '').slice(0, 400) }));

  try {
    // /ask answered (retry with animations disabled)
    await goto(page, '/ask', '/ask');
    await sleep(2000);
    await page.locator('[data-demo="ask-chip"]').first().click().catch(() => {});
    await sleep(6000);
    await shot(page, 'console-ask-answered');

    // /aicore
    await goto(page, '/aicore', '/aicore');
    await sleep(2500);
    await shot(page, 'console-aicore');
    await page.locator('button:has-text("Trace a Specimen")').first().click().catch(() => {});
    await sleep(2500);
    await shot(page, 'console-aicore-trace-mid');
    await sleep(5000);
    await shot(page, 'console-aicore-trace-end');

    // /synthetic
    await goto(page, '/synthetic', '/synthetic');
    await sleep(2500);
    await shot(page, 'console-synthetic');
    await page.locator('[data-demo="synthetic-reanalyze"]').first().click().catch(() => {});
    await sleep(2200);
    await shot(page, 'console-synthetic-reanalyze-mid');
    await sleep(4500);
    await shot(page, 'console-synthetic-reanalyze-end');

    // /queue
    await goto(page, '/queue', '/queue');
    await sleep(2500);
    await shot(page, 'console-queue');

    // ?flat fallback
    await goto(page, '/?flat', '/?flat');
    await sleep(2500);
    await shot(page, 'vault-flat-fallback');
  } catch (e) {
    console.log('EXCEPTION', e.message);
    consoleLog.push({ route: currentRoute, type: 'script-exception', text: e.message });
  }

  fs.writeFileSync(path.join(OUT, 'console-log.json'), JSON.stringify(consoleLog, null, 2));
  const byRoute = {};
  for (const c of consoleLog) {
    byRoute[c.route] = byRoute[c.route] || { error: 0, warning: 0, pageerror: 0, other: 0 };
    if (byRoute[c.route][c.type] == null) byRoute[c.route].other++; else byRoute[c.route][c.type]++;
  }
  console.log('\n=== CONSOLE SUMMARY (cumulative) ===');
  console.log(JSON.stringify(byRoute, null, 2));
  console.log('TOTAL:', consoleLog.length);
  await browser.close();
  process.exit(0);
})();
