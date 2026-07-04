import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:5173';
const OUT = 'C:\\Users\\2504690\\hack-kp-2026\\audit\\final';
const GL = [
  '--use-gl=angle',
  '--use-angle=swiftshader',
  '--enable-unsafe-swiftshader',
  '--ignore-gpu-blocklist',
  '--enable-webgl',
];

fs.mkdirSync(OUT, { recursive: true });

const consoleLog = []; // { route, type, text }
let currentRoute = '/';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let shotN = 0;
async function shot(page, name) {
  shotN += 1;
  const file = String(shotN).padStart(2, '0') + '-' + name + '.png';
  await page.screenshot({ path: path.join(OUT, file), fullPage: false });
  console.log('  shot', file);
  return file;
}
async function shotFull(page, name) {
  shotN += 1;
  const file = String(shotN).padStart(2, '0') + '-' + name + '.png';
  await page.screenshot({ path: path.join(OUT, file), fullPage: true });
  console.log('  shotFull', file);
  return file;
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

  page.on('console', (m) => {
    const t = m.type();
    if (t === 'error' || t === 'warning') consoleLog.push({ route: currentRoute, type: t, text: m.text().slice(0, 400) });
  });
  page.on('pageerror', (e) => consoleLog.push({ route: currentRoute, type: 'pageerror', text: (e.message || '').slice(0, 400) }));

  try {
    // ============================================================
    // 0. RESET
    // ============================================================
    await goto(page, '/?reset', 'reset');
    await sleep(1200);

    // ============================================================
    // 1. "/" 3D VAULT overview
    // ============================================================
    await goto(page, '/', 'vault-overview');
    await sleep(8000);
    await shot(page, 'vault-overview');

    // ============================================================
    // 2. CASE FOCUS + STRATA BREADCRUMBS
    // ============================================================
    // click primary case in left mini-rail
    await page.locator('button:has-text("KP-2026-0417")').first().click().catch(() => {});
    await sleep(2500);
    await shot(page, 'case-focus');

    const strata = [
      ['Evidence Lake', 'stratum-lake'],
      ['Vector Constellation', 'stratum-constellation'],
      ['Knowledge Graph', 'stratum-graph'],
      ['Intelligence Crown', 'stratum-crown'],
    ];
    for (const [label, file] of strata) {
      await page.locator(`button:has-text("${label}")`).first().click().catch(() => {});
      await sleep(2600);
      await shot(page, file);
    }

    // ============================================================
    // 3. ASK-THE-VAULT drawer
    // ============================================================
    // back to a focused case first (crown may have proofs open) — ensure Ask button present
    await page.locator('button:has-text("Ask the Vault")').first().click().catch(() => {});
    await sleep(1500);
    await shot(page, 'ask-open');
    // fire q1
    await page.locator('[data-demo="ask-chip"]').first().click().catch(async () => {
      await page.locator('button:has-text("→")').first().click().catch(() => {});
    });
    await sleep(2600);
    await shot(page, 'ask-mid');
    // wait for citations to finish
    await page.waitForSelector('[data-ask-citation]', { timeout: 12000 }).catch(() => {});
    await sleep(3500);
    await shot(page, 'ask-end');
    // close ask
    await page.locator('button:has-text("Ask the Vault")').first().click().catch(() => {});
    await sleep(800);

    // ============================================================
    // 4. FUSION VIEW → threads → gold thread → evidence → propose
    // ============================================================
    await page.locator('[data-demo="fusion-view"]').first().click().catch(() => {});
    await sleep(2500);
    await shot(page, 'fusion-view');
    // click gold thread
    await page.locator('[data-demo="fusion-thread"]').first().click().catch(() => {});
    await sleep(1800);
    await shot(page, 'fusion-evidence-panel');
    // propose joint
    await page.locator('[data-demo="propose-joint"]').first().click().catch(() => {});
    await sleep(1500);
    await shot(page, 'fusion-joint-proposed');
    // close evidence panel
    await page.keyboard.press('Escape').catch(() => {});
    await sleep(600);

    // ============================================================
    // 5. CROWN → risk proof → Compile Report → dive → landing
    // ============================================================
    await goto(page, '/', 'vault-overview');
    await sleep(3500);
    await page.locator('button:has-text("KP-2026-0417")').first().click().catch(() => {});
    await sleep(2000);
    await page.locator('button:has-text("Intelligence Crown")').first().click().catch(() => {});
    await sleep(2800);
    await shot(page, 'crown-risk-proof');
    // compile report (dive)
    currentRoute = 'compile-dive';
    await page.locator('[data-demo="compile-report"]').first().click().catch(() => {});
    await sleep(1600);
    await shot(page, 'compile-dive');
    // wait for landing on /report
    await page.waitForURL('**/report', { timeout: 12000 }).catch(() => {});
    currentRoute = '/report';
    await sleep(4000);
    await shot(page, 'report-landing');

    // ============================================================
    // 6. FULL REPORT SCROLL
    // ============================================================
    await sleep(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(800);
    await shot(page, 'report-top');
    // full-page capture
    await shotFull(page, 'report-fullpage');
    const H = await page.evaluate(() => document.body.scrollHeight);
    // middle (proof tree area) - scroll ~40%
    await page.evaluate((h) => window.scrollTo(0, h * 0.4), H);
    await sleep(1000);
    await shot(page, 'report-middle-prooftree');
    // §63 certificate ~ near 0.72
    const sec63 = await page.locator('text=/BSA 2023 §63 Certificate/i').first();
    await sec63.scrollIntoViewIfNeeded().catch(() => {});
    await sleep(900);
    await shot(page, 'report-sec63');
    // ECS appendix
    const ecsApp = await page.locator('text=/ECS Audit Log/i').first();
    await ecsApp.scrollIntoViewIfNeeded().catch(() => {});
    await sleep(900);
    await shot(page, 'report-ecs-appendix');

    // ============================================================
    // 7. GENESIS full walk (?reset first) — 5 stages
    // ============================================================
    await goto(page, '/genesis?reset', 'genesis');
    await sleep(1500);
    // reset may strip query & re-render; ensure on /genesis
    await goto(page, '/genesis', 'genesis');
    await sleep(1800);
    const genStages = ['genesis-1-acquire', 'genesis-2-process', 'genesis-3-aicore', 'genesis-4-analyze', 'genesis-5-seal'];
    for (let i = 0; i < genStages.length; i++) {
      currentRoute = '/genesis#' + genStages[i];
      await sleep(1800);
      await shot(page, genStages[i]);
      if (i < genStages.length - 1) {
        await page.locator('button:has-text("Skip")').first().click().catch(() => {});
        await sleep(1200);
      }
    }

    // ============================================================
    // 8. CONSOLE ROUTES
    // ============================================================
    const routes = [
      ['/dashboard', 'console-dashboard'],
      ['/triage', 'console-triage'],
      ['/graph', 'console-graph'],
      ['/timeline', 'console-timeline'],
      ['/ask', 'console-ask'],
      ['/aicore', 'console-aicore'],
      ['/synthetic', 'console-synthetic'],
      ['/queue', 'console-queue'],
    ];
    for (const [r, name] of routes) {
      await goto(page, r, r);
      await sleep(2200);
      await shot(page, name);

      if (r === '/aicore') {
        // Trace-a-Specimen
        await page.locator('button:has-text("Trace a Specimen")').first().click().catch(() => {});
        await sleep(2500);
        await shot(page, 'console-aicore-trace-mid');
        await sleep(4000);
        await shot(page, 'console-aicore-trace-end');
      }
      if (r === '/graph') {
        await page.locator('[data-demo="graph-gnn"]').first().click().catch(() => {});
        await sleep(3200);
        await shot(page, 'console-graph-gnn');
      }
      if (r === '/synthetic') {
        await page.locator('[data-demo="synthetic-reanalyze"]').first().click().catch(() => {});
        await sleep(2000);
        await shot(page, 'console-synthetic-reanalyze-mid');
        await sleep(4000);
        await shot(page, 'console-synthetic-reanalyze-end');
      }
      if (r === '/ask') {
        // fire a query on the page too
        await page.locator('[data-demo="ask-chip"]').first().click().catch(() => {});
        await sleep(4500);
        await shot(page, 'console-ask-answered');
      }
    }

    // ============================================================
    // 9. ?flat vault fallback
    // ============================================================
    await goto(page, '/?flat', '/?flat');
    await sleep(2500);
    await shot(page, 'vault-flat-fallback');
  } catch (e) {
    console.log('EXCEPTION', e.message);
    consoleLog.push({ route: currentRoute, type: 'script-exception', text: e.message });
  }

  // write console log
  fs.writeFileSync(path.join(OUT, 'console-log.json'), JSON.stringify(consoleLog, null, 2));

  // summary
  const byRoute = {};
  for (const c of consoleLog) {
    byRoute[c.route] = byRoute[c.route] || { error: 0, warning: 0, pageerror: 0, other: 0 };
    if (byRoute[c.route][c.type] == null) byRoute[c.route].other++;
    else byRoute[c.route][c.type]++;
  }
  console.log('\n=== CONSOLE SUMMARY ===');
  console.log(JSON.stringify(byRoute, null, 2));
  console.log('TOTAL messages:', consoleLog.length);
  console.log('SHOTS:', shotN);

  await browser.close();
  process.exit(0);
})();
