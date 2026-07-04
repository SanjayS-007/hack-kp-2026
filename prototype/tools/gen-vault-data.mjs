// AEGIS-X — Fusion Vault 3D deterministic mock-data generator
// ALL DATA 100% FICTIONAL / SYNTHETIC. Hackathon prototype only.
//
// Emits JSON datasets consumed by the react-three-fiber "Fusion Vault" world
// (see ../../FUSION-VAULT-3D.md). Seeded PRNG (mulberry32) => byte-identical
// output every run. Regenerate: `node tools/gen-vault-data.mjs`
//
// Reads GRAPH from ../src/data/mockData.js (never writes to src/).

import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'public', 'vault-data');
const MOCK_DATA = join(__dirname, '..', 'src', 'data', 'mockData.js');

// mockData.js is a bundler module (extensionless `./canon` import) so it cannot
// be imported directly under Node ESM. GRAPH is a self-contained object literal,
// so we extract it from source via brace-matching and evaluate it in isolation.
function extractGraph() {
  const src = readFileSync(MOCK_DATA, 'utf8');
  const marker = 'export const GRAPH =';
  const at = src.indexOf(marker);
  if (at === -1) throw new Error('GRAPH export not found in mockData.js');
  let i = src.indexOf('{', at);
  const start = i;
  let depth = 0;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) { i++; break; }
    }
  }
  const literal = src.slice(start, i);
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${literal});`)();
}

const GRAPH = extractGraph();

const BASE_SEED = 20260417;

// ---- seeded PRNG -----------------------------------------------------------
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Box-Muller gaussian from a uniform rng.
function gauss(rng, mean = 0, std = 1) {
  let u = 0;
  let v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  const n = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return mean + n * std;
}

const round3 = (n) => Math.round(n * 1000) / 1000;
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

// ---------------------------------------------------------------------------
// 1/2. Vector constellation point clouds
// ---------------------------------------------------------------------------
// Flattened ellipsoid: x,z spread +-14, y spread +-2.5.
// 3 gaussian-mixture modality clusters: img ~61%, txt ~30%, evt ~9%.
const MODALITIES = [
  { m: 'img', frac: 0.61, center: [-7.0, 0.5, 4.5], sig: [3.8, 0.75, 3.8] },
  { m: 'txt', frac: 0.30, center: [6.5, -0.4, -3.5], sig: [3.4, 0.7, 3.4] },
  { m: 'evt', frac: 0.09, center: [1.5, 1.1, 9.0], sig: [2.6, 0.6, 2.6] },
];

// Which modality cluster each canned query (q1..q4) anchors into. These match
// the scripted AEGIS_QA questions in mockData.js (Subject-B summary, Riverside
// comms, financial link, S63 certificate).
const QUERY_ANCHOR_MOD = { q1: 'txt', q2: 'txt', q3: 'img', q4: 'evt' };

function genConstellation(caseId, n, seed) {
  const rng = mulberry32(seed);
  const points = [];

  // deterministic per-modality counts (largest remainder so total === n)
  const raw = MODALITIES.map((mod) => n * mod.frac);
  const counts = raw.map((r) => Math.floor(r));
  let rem = n - counts.reduce((a, b) => a + b, 0);
  const order = raw
    .map((r, i) => ({ i, frac: r - Math.floor(r) }))
    .sort((a, b) => b.frac - a.frac);
  for (let k = 0; rem > 0; k++, rem--) counts[order[k % order.length].i]++;

  let idx = 0;
  MODALITIES.forEach((mod, mi) => {
    for (let c = 0; c < counts[mi]; c++) {
      const x = clamp(gauss(rng, mod.center[0], mod.sig[0]), -14, 14);
      const y = clamp(gauss(rng, mod.center[1], mod.sig[1]), -2.5, 2.5);
      const z = clamp(gauss(rng, mod.center[2], mod.sig[2]), -14, 14);
      points.push({
        id: `p${String(idx).padStart(4, '0')}`,
        x: round3(x),
        y: round3(y),
        z: round3(z),
        m: mod.m,
      });
      idx++;
    }
  });

  // top-k retrieval sets: pick a seeded anchor inside the query's modality,
  // then take the 12 nearest points overall (spatially clustered flare set).
  const topk = {};
  for (const q of ['q1', 'q2', 'q3', 'q4']) {
    const mod = QUERY_ANCHOR_MOD[q];
    const pool = points.filter((p) => p.m === mod);
    const anchor = pool[Math.floor(rng() * pool.length)];
    const near = points
      .map((p) => ({
        id: p.id,
        d: (p.x - anchor.x) ** 2 + (p.y - anchor.y) ** 2 + (p.z - anchor.z) ** 2,
      }))
      .sort((a, b) => a.d - b.d || (a.id < b.id ? -1 : 1))
      .slice(0, 12)
      .map((p) => p.id);
    topk[q] = near;
  }

  return { caseId, count: points.length, points, topk };
}

// ---------------------------------------------------------------------------
// 3. Knowledge-graph 3D layout (seeded spring relaxation)
// ---------------------------------------------------------------------------
function genGraph3D(seed) {
  const rng = mulberry32(seed);
  const nodes = GRAPH.nodes.map((nd) => nd.id);
  const N = nodes.length;
  const index = new Map(nodes.map((id, i) => [id, i]));

  // adjacency from GRAPH.links (undirected for layout purposes)
  const adj = new Set();
  for (const l of GRAPH.links) {
    const a = index.get(l.source);
    const b = index.get(l.target);
    if (a === undefined || b === undefined) continue;
    adj.add(a < b ? `${a}-${b}` : `${b}-${a}`);
  }
  const edgePairs = [...adj].map((k) => k.split('-').map(Number));

  // random init on a small sphere
  const pos = [];
  for (let i = 0; i < N; i++) {
    const u = rng() * 2 - 1;
    const t = rng() * Math.PI * 2;
    const r = 4;
    const s = Math.sqrt(1 - u * u);
    pos.push([r * s * Math.cos(t), r * u, r * s * Math.sin(t)]);
  }

  const K = 6.0; // ideal edge length
  const ITER = 300;
  let temp = 4.0;
  for (let it = 0; it < ITER; it++) {
    const disp = pos.map(() => [0, 0, 0]);
    // repulsion (all pairs)
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        let dx = pos[i][0] - pos[j][0];
        let dy = pos[i][1] - pos[j][1];
        let dz = pos[i][2] - pos[j][2];
        let dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
        const rep = (K * K) / dist;
        dx /= dist; dy /= dist; dz /= dist;
        disp[i][0] += dx * rep; disp[i][1] += dy * rep; disp[i][2] += dz * rep;
        disp[j][0] -= dx * rep; disp[j][1] -= dy * rep; disp[j][2] -= dz * rep;
      }
    }
    // attraction (edges)
    for (const [a, b] of edgePairs) {
      let dx = pos[a][0] - pos[b][0];
      let dy = pos[a][1] - pos[b][1];
      let dz = pos[a][2] - pos[b][2];
      let dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
      const att = (dist * dist) / K;
      dx /= dist; dy /= dist; dz /= dist;
      disp[a][0] -= dx * att; disp[a][1] -= dy * att; disp[a][2] -= dz * att;
      disp[b][0] += dx * att; disp[b][1] += dy * att; disp[b][2] += dz * att;
    }
    // apply, temperature-limited
    for (let i = 0; i < N; i++) {
      const d = disp[i];
      const len = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]) || 0.01;
      const lim = Math.min(len, temp);
      pos[i][0] += (d[0] / len) * lim;
      pos[i][1] += (d[1] / len) * lim;
      pos[i][2] += (d[2] / len) * lim;
    }
    temp *= 0.985; // cool
  }

  // center, then normalise into radius ~8 with y compressed to +-3
  const cen = [0, 0, 0];
  for (const p of pos) { cen[0] += p[0]; cen[1] += p[1]; cen[2] += p[2]; }
  cen[0] /= N; cen[1] /= N; cen[2] /= N;
  let maxR = 0;
  for (const p of pos) {
    p[0] -= cen[0]; p[1] -= cen[1]; p[2] -= cen[2];
    maxR = Math.max(maxR, Math.sqrt(p[0] * p[0] + p[1] * p[1] + p[2] * p[2]));
  }
  const scale = 8 / (maxR || 1);

  const outNodes = pos.map((p, i) => ({
    id: nodes[i],
    x: round3(p[0] * scale),
    y: round3(clamp(p[1] * scale * 0.42, -3, 3)),
    z: round3(p[2] * scale),
  }));

  return { caseId: 'KP-2026-0417', nodes: outNodes, edges: GRAPH.links };
}

// ---------------------------------------------------------------------------
// 4. Evidence-lake blocks (12x12 grid per case)
// ---------------------------------------------------------------------------
const LAKE_CASES = [
  { id: 'KP-2026-0417', batchBase: 100, sealBase: Date.UTC(2026, 5, 28, 8, 2, 0) },
  { id: 'KP-2026-0398', batchBase: 400, sealBase: Date.UTC(2026, 4, 21, 6, 40, 0) },
  { id: 'KP-2026-0311', batchBase: 700, sealBase: Date.UTC(2026, 2, 11, 9, 15, 0) },
];

function genLakeBlocks(seed) {
  const rng = mulberry32(seed);
  const out = {};
  for (const c of LAKE_CASES) {
    const blocks = [];
    let n = 0;
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        const objects = 2800 + Math.floor(rng() * 801); // 2800-3600
        // staggered custody seal times (~7min apart + jitter)
        const ms = c.sealBase + n * 7 * 60 * 1000 + Math.floor(rng() * 90) * 1000;
        blocks.push({
          i,
          j,
          batch: `batch #${String(c.batchBase + n).padStart(3, '0')}`,
          objects,
          sealedAt: new Date(ms).toISOString().replace('.000', ''),
        });
        n++;
      }
    }
    out[c.id] = blocks;
  }
  return out;
}

// ---------------------------------------------------------------------------
// 5. Cross-case fusion threads (spec S3)
// ---------------------------------------------------------------------------
function genFusionThreads() {
  const SENTINEL = 'KP-2026-0417';
  const COURIER = 'KP-2026-0398';
  const HARBOR = 'KP-2026-0311';
  const METHOD = 'TAGNN cross-case inference';
  return {
    method: METHOD,
    threads: [
      {
        id: 'FT-01',
        label: 'shared wallet cluster',
        from: { case: SENTINEL, stratum: 'S3' },
        to: { case: HARBOR, stratum: 'S3' },
        anchor: 'S3',
        conf: 0.91,
        confLabel: '0.91',
        color: '#f59e0b',
        colorName: 'gold',
        method: METHOD,
        evidence: [
          { id: 'WAL-0417-77', type: 'wallet', case: SENTINEL, desc: 'BTC cluster bc1q…7f9 peel-chain endpoint tied to Subject-C.' },
          { id: 'WAL-0311-12', type: 'wallet', case: HARBOR, desc: 'Harbor Watch ledger reuses the same bc1q…7f9 receiving cluster.' },
        ],
      },
      {
        id: 'FT-02',
        label: 'coded-lexicon fingerprint',
        from: { case: SENTINEL, stratum: 'S2' },
        to: { case: COURIER, stratum: 'S2' },
        anchor: 'S2',
        conf: 0.84,
        confLabel: '0.84',
        color: '#6366f1',
        colorName: 'indigo',
        method: METHOD,
        evidence: [
          { id: 'LEX-0417-31', type: 'chat', case: SENTINEL, desc: 'Coded grooming lexicon ("riverside" substitution) embedding signature.' },
          { id: 'LEX-0398-08', type: 'chat', case: COURIER, desc: 'Night Courier chats share the same coded-lexicon embedding fingerprint.' },
        ],
      },
      {
        id: 'FT-03',
        label: 'identical media hash x3',
        from: { case: SENTINEL, stratum: 'S1' },
        to: { case: HARBOR, stratum: 'S1' },
        anchor: 'S1',
        conf: 0.999,
        confLabel: '1.00',
        color: '#f43f5e',
        colorName: 'red',
        method: METHOD,
        evidence: [
          { id: 'HSH-0417-a3f9', type: 'hash', case: SENTINEL, desc: 'Media hash #a3f9… sealed on Phone-A batch manifest (3 exhibits).' },
          { id: 'HSH-0311-a3f9', type: 'hash', case: HARBOR, desc: 'Byte-identical hash #a3f9… present in Harbor Watch WORM lake (x3).' },
        ],
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// write everything
// ---------------------------------------------------------------------------
function writeJson(name, obj) {
  const p = join(OUT_DIR, name);
  writeFileSync(p, JSON.stringify(obj), 'utf8');
  return p;
}

mkdirSync(OUT_DIR, { recursive: true });

const artifacts = [
  ['constellation-0417.json', genConstellation('KP-2026-0417', 2000, BASE_SEED + 1)],
  ['constellation-0398.json', genConstellation('KP-2026-0398', 900, BASE_SEED + 2)],
  ['constellation-0311.json', genConstellation('KP-2026-0311', 450, BASE_SEED + 3)],
  ['graph3d-0417.json', genGraph3D(BASE_SEED + 4)],
  ['lake-blocks.json', genLakeBlocks(BASE_SEED + 5)],
  ['fusion-threads.json', genFusionThreads()],
];

let total = 0;
for (const [name, obj] of artifacts) {
  const p = writeJson(name, obj);
  const bytes = Buffer.byteLength(JSON.stringify(obj));
  total += bytes;
  console.log(`  ${name.padEnd(26)} ${(bytes / 1024).toFixed(1).padStart(7)} KB`);
}
console.log(`  ${'TOTAL'.padEnd(26)} ${(total / 1024).toFixed(1).padStart(7)} KB`);
if (total > 600 * 1024) {
  console.error('WARNING: combined size exceeds 600 KB budget.');
  process.exit(1);
}
console.log('Vault data generated ->', OUT_DIR);
