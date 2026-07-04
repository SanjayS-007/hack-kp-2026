// AEGIS — Operation Sentinel (Case KP-2026-0417)
// ALL DATA 100% FICTIONAL / SYNTHETIC. No real names, no real imagery, no explicit content.
// Flagged media are abstract placeholders only.
// Canonical numbers live in canon.js — this module derives from there (zero number drift).

import { CANON } from './canon';

export const CASE = {
  id: CANON.caseId,
  name: CANON.caseName,
  status: 'ACTIVE',
  classification: CANON.classification,
  lead: CANON.lead,
  unit: CANON.unit,
  opened: CANON.opened,
  jurisdiction: CANON.jurisdiction,
  dataVolume: CANON.dataVolume,
};

export const KPIS = {
  filesProcessed: CANON.filesTotal,
  flagged: CANON.flagged,
  highRisk: CANON.highRisk,
  synthetic: CANON.synthetic,
  triageMinutes: CANON.triageMinutes,
  reviewReduction: CANON.reviewReduction,
  entities: CANON.entities,
  subjects: CANON.subjects,
};

// Risk-tier distribution (SAP scale A/B/C + cleared)
export const RISK_TIERS = [
  { tier: 'Category A', label: 'Cat A — Critical', value: CANON.flaggedA, color: '#ef4444' },
  { tier: 'Category B', label: 'Cat B — Serious', value: CANON.flaggedB, color: '#f59e0b' },
  { tier: 'Category C', label: 'Cat C — Indicative', value: CANON.flaggedC, color: '#eab308' },
  { tier: 'Cleared', label: 'Cleared / Benign', value: CANON.filesTotal - CANON.flagged, color: '#334155' },
];

export const RISK_DONUT = RISK_TIERS.filter((t) => t.tier !== 'Cleared');

export const DEVICES = [
  {
    id: 'DEV-01',
    label: 'Seized Phone A',
    model: 'Android 14 · Model X-Pro',
    owner: 'Subject-A',
    files: CANON.filesTotal - 198432 - 66919,
    ingested: 100,
    hash: 'a3f9c2e1',
    color: '#22d3ee',
  },
  {
    id: 'DEV-02',
    label: 'Seized Laptop B',
    model: 'Linux · Encrypted LUKS',
    owner: 'Subject-B',
    files: 198432,
    ingested: 100,
    hash: 'b7d4e0a9',
    color: '#818cf8',
  },
  {
    id: 'DEV-03',
    label: 'External SSD C',
    model: '1TB NVMe · exFAT',
    owner: 'Subject-A',
    files: 66919,
    ingested: 86,
    hash: 'c1e8f5b2',
    color: '#f472b6',
  },
];

// Live AI activity feed — `ago` = seconds before page load (Law 6: relative time).
// An extra pool feeds the ticker so new rows keep arriving during the demo.
export const ACTIVITY_FEED = [
  { ago: 4, msg: 'Grad-CAM overlay generated for cluster CL-118', tag: 'XAI' },
  { ago: 22, msg: 'Peel-chain traced wallet bc1q…7f9 -> hidden Subject-C', tag: 'FUSION' },
  { ago: 51, msg: 'Synthetic verdict: FILE-2291 flagged AI-GENERATED (98.2%)', tag: 'DEEPFAKE' },
  { ago: 84, msg: 'Clock-skew corrected on DEV-02 (+00:03:41 drift)', tag: 'CHRONOS' },
  { ago: 121, msg: 'NER matched coded term "riverside" across 6 chat logs', tag: 'CONTEXT' },
  { ago: 158, msg: 'Composite risk score recomputed for 14 leads', tag: 'RISK' },
  { ago: 203, msg: 'SHA-256 chain-of-custody sealed for evidence batch #7', tag: 'CUSTODY' },
  { ago: 246, msg: 'Apparent-age KDE estimate completed on cluster CL-092', tag: 'PERCEPTION' },
  { ago: 291, msg: 'Entity graph updated: +3 edges (shared-hash correlation)', tag: 'GRAPH' },
  { ago: 332, msg: 'RAG index refreshed — 480,231 artifacts embedded', tag: 'ASK' },
];

// Rotating pool of new events that stream into the ticker every 4-7s.
export const ACTIVITY_POOL = [
  { msg: 'Worker gpu-02: batch 1,204 complete', tag: 'RISK' },
  { msg: 'Graph upsert: 17 edges committed', tag: 'GRAPH' },
  { msg: 'Vector index: 4,096 embeddings flushed', tag: 'ASK' },
  { msg: 'EXIF/C2PA provenance parsed on 812 files', tag: 'PERCEPTION' },
  { msg: 'HERAM re-scored 3 answers (ECS >= 0.85)', tag: 'CUSTODY' },
  { msg: 'YOLO-Pose keypoints extracted · 640 frames', tag: 'PERCEPTION' },
  { msg: 'Defocus-blur optics check queued for FILE-2288', tag: 'DEEPFAKE' },
  { msg: 'Coded-language lexicon hit: 2 new clusters', tag: 'CONTEXT' },
  { msg: 'Ledger scan: mixer de-mix probability 0.71', tag: 'FUSION' },
  { msg: 'Grad-CAM attention map cached · CL-104', tag: 'XAI' },
];

// Ingest throughput sparkline (files/min over time)
export const INGEST_TREND = [
  { t: '13:20', files: 4200 },
  { t: '13:30', files: 8800 },
  { t: '13:40', files: 15200 },
  { t: '13:50', files: 12400 },
  { t: '14:00', files: 16800 },
  { t: '14:10', files: 9600 },
  { t: '14:20', files: 6200 },
];

const catMeta = {
  A: { label: 'Category A', color: '#f43f5e', ring: 'ring-rose-500/50', text: 'text-rose-300', bg: 'bg-rose-500/15' },
  B: { label: 'Category B', color: '#f59e0b', ring: 'ring-amber-500/50', text: 'text-amber-300', bg: 'bg-amber-500/15' },
  C: { label: 'Category C', color: '#eab308', ring: 'ring-yellow-500/50', text: 'text-yellow-300', bg: 'bg-yellow-500/15' },
};
export const CAT_META = catMeta;

// Deterministic gradient placeholders for blurred media tiles
const GRADIENTS = [
  'from-rose-900 via-red-800 to-orange-900',
  'from-indigo-900 via-purple-800 to-fuchsia-900',
  'from-cyan-900 via-teal-800 to-emerald-900',
  'from-amber-900 via-orange-800 to-red-900',
  'from-slate-800 via-slate-700 to-navy-700',
  'from-violet-900 via-indigo-800 to-blue-900',
];

// Non-round, calibrated-looking confidences (Law 2: never 100%, never round)
const CONF_A = [96.4, 94.1, 92.7, 97.3, 91.8, 95.6, 93.2, 98.1];
const CONF_B = [84.6, 79.3, 82.7, 77.1, 86.2, 80.9, 83.4, 78.8];
const CONF_C = [72.4, 69.1, 74.8, 67.3, 71.6, 73.2, 68.7, 70.5];

function makeMedia() {
  const items = [];
  const cats = ['A', 'A', 'B', 'B', 'B', 'C', 'C', 'C', 'C', 'C'];
  const types = ['image', 'image', 'image', 'video', 'image', 'video'];
  let ai = 0;
  let bi = 0;
  let ci = 0;
  for (let i = 0; i < 24; i++) {
    const cat = cats[i % cats.length];
    let conf;
    if (cat === 'A') conf = CONF_A[ai++ % CONF_A.length];
    else if (cat === 'B') conf = CONF_B[bi++ % CONF_B.length];
    else conf = CONF_C[ci++ % CONF_C.length];
    items.push({
      id: `MED-${(2001 + i).toString()}`,
      cat,
      type: types[i % types.length],
      confidence: conf,
      device: DEVICES[i % 3].id,
      hash: `sha256:${(i * 91 + 13).toString(16).padStart(4, '0')}af3c9e21d7b0`,
      cluster: `CL-${100 + (i % 12)}`,
      gradient: GRADIENTS[i % GRADIENTS.length],
      apparentAge: cat === 'A' ? '9-12' : cat === 'B' ? '11-14' : '13-16',
      synthetic: i === 4 || i === 11 || i === 18,
      needsReview: false,
    });
  }
  // Law 5 — deliberate low-confidence items the system flags for a human
  items[9] = { ...items[9], cat: 'C', confidence: 61.7, needsReview: true, synthetic: false, gradient: 'from-slate-700 via-slate-600 to-navy-700' };
  items[16] = { ...items[16], cat: 'C', confidence: 64.3, needsReview: true, synthetic: false, gradient: 'from-slate-700 via-slate-600 to-navy-700' };
  return items;
}
export const MEDIA = makeMedia();

// Entity graph
export const GRAPH = {
  nodes: [
    { id: 'Subject-A', group: 'subject', label: 'Subject-A', risk: 'high', detail: 'Primary suspect. Owner of DEV-01 & SSD-C. 14 high-risk items attributed.' },
    { id: 'Subject-B', group: 'subject', label: 'Subject-B', risk: 'high', detail: 'Distribution node. Owner of encrypted Laptop B. Operates P2P share.' },
    { id: 'Subject-C', group: 'subject', label: 'Subject-C (HIDDEN)', risk: 'critical', hidden: true, detail: 'Hidden financier discovered via crypto peel-chain. No direct comms — linked only by wallet flow + shared media hash.' },
    { id: 'Minor-V1', group: 'victim', label: 'Minor-V1', risk: 'victim', detail: 'Identified minor victim (never depicted). Safeguarding referral raised.' },
    { id: 'Phone-A', group: 'device', label: 'Phone A', detail: 'DEV-01 — Android 14. 214,880 files.' },
    { id: 'Laptop-B', group: 'device', label: 'Laptop B', detail: 'DEV-02 — LUKS encrypted. 198,432 files.' },
    { id: 'SSD-C', group: 'device', label: 'SSD C', detail: 'DEV-03 — 66,919 files. 86% ingested.' },
    { id: 'Wallet-1', group: 'wallet', label: 'bc1q…7f9', detail: 'BTC wallet. Received 0.42 BTC across 3 hops from Wallet-2.' },
    { id: 'Wallet-2', group: 'wallet', label: 'bc1q…a3d', detail: 'Peel-chain intermediary. Splits payments to obscure origin.' },
    { id: 'Mixer', group: 'wallet', label: 'Mixer Svc', detail: 'CoinJoin mixer. AEGIS de-mixed 71% probability path to Subject-C.' },
    { id: 'IP-1', group: 'ip', label: '10.44.x.x', detail: 'VPN egress shared by Subject-A & Subject-B sessions.' },
    { id: 'IP-2', group: 'ip', label: '10.88.x.x', detail: 'Residential IP geolocated near Riverside Park cell tower.' },
    { id: 'Hash-1', group: 'hash', label: '#a3f9…', detail: 'Shared media hash present on Phone-A and Subject-C cloud backup — the key link.' },
    { id: 'Hash-2', group: 'hash', label: '#b7d4…', detail: 'PhotoDNA-miss hash caught by AEGIS zero-day classifier.' },
  ],
  links: [
    { source: 'Subject-A', target: 'Phone-A', type: 'owns' },
    { source: 'Subject-A', target: 'SSD-C', type: 'owns' },
    { source: 'Subject-B', target: 'Laptop-B', type: 'owns' },
    { source: 'Subject-A', target: 'Subject-B', type: 'comms', label: '412 msgs' },
    { source: 'Subject-A', target: 'Minor-V1', type: 'grooming' },
    { source: 'Phone-A', target: 'Hash-1', type: 'contains' },
    { source: 'Hash-1', target: 'Subject-C', type: 'shared-hash', peel: true, predicted: true, conf: 0.84, label: 'shared hash' },
    { source: 'Subject-B', target: 'Wallet-1', type: 'transaction' },
    { source: 'Wallet-1', target: 'Wallet-2', type: 'transaction', peel: true },
    { source: 'Wallet-2', target: 'Mixer', type: 'transaction', peel: true },
    { source: 'Mixer', target: 'Subject-C', type: 'peel-chain', peel: true, predicted: true, conf: 0.89, label: 'de-mixed 0.71' },
    { source: 'Subject-A', target: 'IP-1', type: 'network' },
    { source: 'Subject-B', target: 'IP-1', type: 'network' },
    { source: 'Subject-A', target: 'IP-2', type: 'network' },
    { source: 'Laptop-B', target: 'Hash-2', type: 'contains' },
    { source: 'Subject-C', target: 'Wallet-1', type: 'funds', predicted: true, conf: 0.77, label: 'funds' },
  ],
};

export const GRAPH_GROUP_META = {
  subject: { color: '#ef4444', label: 'Subject' },
  victim: { color: '#22d3ee', label: 'Victim' },
  device: { color: '#818cf8', label: 'Device' },
  wallet: { color: '#f59e0b', label: 'Wallet' },
  ip: { color: '#10b981', label: 'IP / Network' },
  hash: { color: '#f472b6', label: 'Media Hash' },
};

// The critical "hidden suspect" path to highlight
export const PEEL_PATH = ['Subject-B', 'Wallet-1', 'Wallet-2', 'Mixer', 'Subject-C', 'Hash-1', 'Phone-A'];

// Timeline — multi-track, phase-coded
export const TIMELINE_PHASES = {
  grooming: { label: 'Grooming', color: '#eab308' },
  production: { label: 'Production', color: '#f97316' },
  distribution: { label: 'Distribution', color: '#ef4444' },
  financial: { label: 'Financial', color: '#22d3ee' },
  network: { label: 'Network', color: '#10b981' },
};

export const TIMELINE_TRACKS = [
  {
    id: 'DEV-01',
    label: 'Phone A',
    events: [
      { day: 2, phase: 'grooming', label: 'First contact w/ Minor-V1', time: '2026-03-04 21:12' },
      { day: 6, phase: 'grooming', label: 'Coded msg "riverside" x3', time: '2026-03-08 22:40' },
      { day: 11, phase: 'production', label: 'Camera burst (late-night)', time: '2026-03-13 01:55' },
      { day: 19, phase: 'distribution', label: 'Files copied to SSD-C', time: '2026-03-21 03:10' },
    ],
  },
  {
    id: 'DEV-02',
    label: 'Laptop B',
    events: [
      { day: 12, phase: 'distribution', label: 'P2P client launched', time: '2026-03-14 00:22' },
      { day: 13, phase: 'distribution', label: 'Hash-2 shared to 4 peers', time: '2026-03-15 02:08' },
      { day: 20, phase: 'distribution', label: 'Secure-wipe attempt (recovered)', time: '2026-03-22 04:41' },
    ],
  },
  {
    id: 'DEV-03',
    label: 'SSD C',
    events: [
      { day: 19, phase: 'production', label: 'Archive folder created', time: '2026-03-21 03:12' },
      { day: 21, phase: 'distribution', label: 'Encrypted container mounted', time: '2026-03-23 23:30' },
    ],
  },
  {
    id: 'FIN',
    label: 'Financial',
    events: [
      { day: 14, phase: 'financial', label: '0.42 BTC -> Wallet-1', time: '2026-03-16 12:00' },
      { day: 15, phase: 'financial', label: 'Peel hop -> Wallet-2', time: '2026-03-17 12:30' },
      { day: 16, phase: 'financial', label: 'Mixer deposit', time: '2026-03-18 09:15' },
      { day: 18, phase: 'financial', label: 'De-mixed -> Subject-C', time: '2026-03-20 10:02' },
    ],
  },
  {
    id: 'NET',
    label: 'Network',
    events: [
      { day: 6, phase: 'network', label: 'IP-2 near Riverside Park', time: '2026-03-08 22:35' },
      { day: 12, phase: 'network', label: 'Shared VPN egress IP-1', time: '2026-03-14 00:20' },
    ],
  },
];

export const TIMELINE_DAYS = 24; // March 2026 window
export const TIMELINE_START = '2026-03-02'; // day 1 = Mar 02

// Phase bands — translucent spans across the window (day ranges, inclusive start)
export const TIMELINE_BANDS = [
  { phase: 'grooming', from: 1, to: 11, row: 0 },
  { phase: 'production', from: 11, to: 20, row: 1 },
  { phase: 'distribution', from: 12, to: 24, row: 2 },
];

// Track icon + cross-link hints for the redesigned timeline
export const TRACK_META = {
  'DEV-01': { icon: 'Smartphone', xref: 'triage' },
  'DEV-02': { icon: 'Laptop', xref: 'graph' },
  'DEV-03': { icon: 'HardDrive', xref: 'triage' },
  FIN: { icon: 'Bitcoin', xref: 'graph' },
  NET: { icon: 'Wifi', xref: 'graph' },
};

// Ask AEGIS scripted Q&A — deep-mock playback engine data.
// Each exchange: agent-trace steps (with ms + optional cypher), streamed answer, citations, ECS.
export const AEGIS_QA = [
  {
    q: 'Summarize what we know about Subject-B.',
    steps: [
      { label: 'Plan', detail: 'Decompose → identity · devices · role · links', ms: 168 },
      {
        label: 'Graph query',
        detail: 'TAGNN subgraph · 1-hop neighbourhood',
        ms: 244,
        cypher: "MATCH (s:Subject {id:'Subject-B'})-[r]-(n)\nRETURN s, type(r) AS rel, n\nORDER BY r.weight DESC LIMIT 25",
      },
      { label: 'Vector search', detail: 'ChromaDB · top-k: 12 chunks · sim 0.71-0.93', ms: 356 },
      { label: 'Vision cross-check', detail: 'CLIP verify 3 media refs on Laptop-B', ms: 402 },
      { label: 'Synthesize', detail: 'local Llama-3 · 318 tokens', ms: 610 },
      { label: 'HERAM validation', detail: 'grounding check · ECS 0.94', ms: 143 },
    ],
    a: 'Subject-B is the distribution node in Operation Sentinel and owner of the LUKS-encrypted Laptop B (DEV-02, 198,432 files). Evidence shows 412 messages exchanged with Subject-A, a P2P client launched on 2026-03-14, and media Hash-2 shared to 4 peers. Subject-B also initiated the 0.42 BTC transfer that begins the peel-chain toward the hidden financier. A secure-wipe attempt on 2026-03-22 was recovered via digital stratigraphy.',
    ecs: 0.94,
    sources: [
      { id: 'DEV02-CONTACTS', excerpt: '412 messages with Subject-A (Signal-clone export)', ts: '2026-03-09 → 03-22' },
      { id: 'P2P-LOG-0031', excerpt: 'Client launched · Hash-2 shared to 4 peers', ts: '2026-03-15 02:08' },
      { id: 'FIN-TX-0001', excerpt: 'Outbound 0.42 BTC -> Wallet-1', ts: '2026-03-16 12:00' },
      { id: 'FSA-RECOVER-07', excerpt: 'Recovered wiped inode table (stratigraphy)', ts: '2026-03-22 04:41' },
    ],
  },
  {
    q: 'Show all communications referencing Riverside Park in March.',
    steps: [
      { label: 'Plan', detail: 'Decompose → keyword + coded-variant + geo-corr', ms: 152 },
      {
        label: 'Graph query',
        detail: 'chat nodes linked to place mention',
        ms: 228,
        cypher: "MATCH (m:Message)-[:MENTIONS]->(:Place {name:'Riverside Park'})\nWHERE m.ts >= date('2026-03-01')\nRETURN m ORDER BY m.ts",
      },
      { label: 'Vector search', detail: 'ChromaDB · top-k: 12 · coded-lexicon expansion', ms: 341 },
      { label: 'Vision cross-check', detail: 'skipped (text-only query)', ms: 44 },
      { label: 'Synthesize', detail: 'local Llama-3 · 214 tokens', ms: 470 },
      { label: 'HERAM validation', detail: 'grounding check · ECS 0.96', ms: 138 },
    ],
    a: 'I found 6 communications referencing "Riverside Park" (and the coded variant "riverside") across DEV-01 between 2026-03-04 and 2026-03-13. All originate from Subject-A to Minor-V1. Three cluster around late-night hours and correlate with cell-tower IP-2 geolocated 0.4 km from the park. This aligns with the grooming phase on the Chronos timeline.',
    ecs: 0.96,
    sources: [
      { id: 'CHAT-DEV01-0442', excerpt: '"…meet me by the riverside after school, don\'t tell…"', ts: '2026-03-08 22:40' },
      { id: 'CHAT-DEV01-0455', excerpt: '"riverside again? same spot"', ts: '2026-03-11 21:07' },
      { id: 'GEO-IP2-0031', excerpt: 'Cell tower TWR-118 · 0.4km from Riverside Park', ts: '2026-03-08 22:35' },
    ],
  },
  {
    q: 'Is there any financial link between Subject-A and unknown parties?',
    reveal: 'graph',
    steps: [
      { label: 'Plan', detail: 'Decompose → trace outbound value · de-anonymize', ms: 176 },
      {
        label: 'Graph query',
        detail: 'follow transaction edges + peel heuristic',
        ms: 288,
        cypher: "MATCH p=(:Subject)-[:TRANSACTION*1..4]->(w:Wallet)\nWHERE ALL(r IN relationships(p) WHERE r.peel)\nRETURN p, w.demixProb AS conf",
      },
      { label: 'Vector search', detail: 'ChromaDB · top-k: 12 · ledger + backup manifests', ms: 372 },
      { label: 'Vision cross-check', detail: 'hash match Phone-A ∩ Subject-C backup', ms: 418 },
      { label: 'Synthesize', detail: 'local Llama-3 · 296 tokens', ms: 640 },
      { label: 'HERAM validation', detail: 'grounding check · ECS 0.91', ms: 151 },
    ],
    a: 'Yes — and it exposes a previously unknown party. Subject-B (co-located with Subject-A on shared VPN egress IP-1) moved 0.42 BTC through a peel-chain: Wallet-1 → Wallet-2 → CoinJoin mixer, which AEGIS de-mixed with 0.71 probability to a wallet controlled by Subject-C. Independently, media Hash-1 from Phone-A appears in Subject-C\'s cloud backup. Two independent streams — finance and shared-hash — converge on the same identity. Subject-C has been promoted to suspect and surfaced on the Entity Graph.',
    ecs: 0.91,
    sources: [
      { id: 'FIN-PEEL-0007', excerpt: 'Peel-chain hop map: Wallet-1->Wallet-2->Mixer (de-mix 0.71)', ts: '2026-03-20 10:02' },
      { id: 'HASH-a3f9', excerpt: 'Shared media hash: Phone-A ∩ Subject-C backup', ts: '2026-03-19 18:44' },
      { id: 'NET-IP1-0012', excerpt: 'Shared VPN egress: Subject-A & Subject-B sessions', ts: '2026-03-14 00:20' },
    ],
  },
  {
    q: 'Draft the §63 evidence certificate for exhibit E-114.',
    certificate: true,
    steps: [
      { label: 'Plan', detail: 'Decompose → fetch exhibit · statements · integrity', ms: 190 },
      {
        label: 'Graph query',
        detail: 'resolve exhibit E-114 provenance chain',
        ms: 236,
        cypher: "MATCH (e:Exhibit {id:'E-114'})-[:DERIVED_FROM]->(f:File)\nRETURN e, f.sha256, f.device, e.acquiredAt",
      },
      { label: 'Vector search', detail: 'ChromaDB · top-k: 8 · statute + prior certs', ms: 298 },
      { label: 'Vision cross-check', detail: 'confirm exhibit thumbnail hash match', ms: 359 },
      { label: 'Synthesize', detail: 'local Llama-3 · §63 template · 402 tokens', ms: 705 },
      { label: 'HERAM validation', detail: '1 statement below threshold (0.71) excluded · ECS 0.98', ms: 168 },
    ],
    a: 'CERTIFICATE (BSA 2023, §63) — Exhibit E-114.\nPart A (Statement of Fact): The electronic record E-114 was produced by the AEGIS system operating in an air-gapped, access-controlled environment; the system was operating properly at the material time; and the SHA-256 value of E-114 matches the value sealed at acquisition.\nPart B (Technical Particulars): Acquisition by write-blocked forensic imaging from DEV-01; integrity by SHA-256 (9f86d081…f00a08) under a Merkle-sealed batch manifest; AI findings HERAM-scored, ECS 0.98.\nThis draft is ready for examiner signature in the Court Report module.',
    ecsNote: '1 sentence excluded below ECS threshold (0.71 < 0.85) — flagged for manual review rather than asserted.',
    ecs: 0.98,
    sources: [
      { id: 'E-114', excerpt: 'Exhibit E-114 · Category-A item · DEV-01', ts: '2026-06-29 11:14' },
      { id: 'SHA-9f86d0', excerpt: 'sha256:9f86d081884c7d65…b0f00a08 (sealed at acquisition)', ts: '2026-06-28 08:02' },
      { id: 'BSA-63-TMPL', excerpt: 'Statute template · dual-part certificate', ts: '2023 Act' },
    ],
  },
];

// Synthetic detection
export const SYNTHETIC_FILES = [
  {
    id: 'FILE-2291',
    verdict: 'AI-GENERATED',
    score: 98.2,
    streams: [
      { name: 'Global Texture', model: 'DINOv2', score: 97.4, note: 'GAN fingerprint in frequency domain' },
      { name: 'Facial Geometry', model: 'Landmark-Net', score: 96.1, note: 'Inter-ocular ratio inconsistency' },
      { name: 'Semantic Fusion', model: 'frozen-CLIP', score: 98.9, note: 'Text-image entanglement anomaly' },
    ],
    defocus: 'implausible',
    avSync: 'desynced',
  },
  {
    id: 'FILE-2288',
    verdict: 'AI-GENERATED',
    score: 95.7,
    streams: [
      { name: 'Global Texture', model: 'DINOv2', score: 94.8, note: 'Diffusion residual noise pattern' },
      { name: 'Facial Geometry', model: 'Landmark-Net', score: 93.2, note: 'Ear-symmetry violation' },
      { name: 'Semantic Fusion', model: 'frozen-CLIP', score: 97.1, note: 'Background semantic drift' },
    ],
    defocus: 'implausible',
    avSync: 'n/a',
  },
  {
    id: 'FILE-2274',
    verdict: 'AI-GENERATED',
    score: 92.4,
    streams: [
      { name: 'Global Texture', model: 'DINOv2', score: 90.6, note: 'Upsampling checkerboard artifact' },
      { name: 'Facial Geometry', model: 'Landmark-Net', score: 89.9, note: 'Teeth-count anomaly' },
      { name: 'Semantic Fusion', model: 'frozen-CLIP', score: 95.3, note: 'Lighting-shadow mismatch' },
    ],
    defocus: 'borderline',
    avSync: 'desynced',
  },
];

// Risk Queue
export const RISK_QUEUE = [
  { id: 'LEAD-0001', subject: 'Subject-A', cat: 'A', score: 97, type: 'Active abuse indicator', device: 'DEV-01', sla: 42, status: 'Escalated', assignee: 'Inv. A-2291' },
  { id: 'LEAD-0002', subject: 'Subject-C', cat: 'A', score: 94, type: 'Financier — peel chain', device: 'FIN', sla: 96, status: 'In review', assignee: 'Inv. A-2291' },
  { id: 'LEAD-0003', subject: 'Subject-B', cat: 'A', score: 91, type: 'Distribution hub', device: 'DEV-02', sla: 130, status: 'In review', assignee: 'Inv. B-3310' },
  { id: 'LEAD-0004', subject: 'Subject-A', cat: 'B', score: 82, type: 'Grooming pattern', device: 'DEV-01', sla: 220, status: 'Queued', assignee: 'Unassigned' },
  { id: 'LEAD-0005', subject: 'Subject-B', cat: 'B', score: 79, type: 'Synthetic production', device: 'DEV-02', sla: 260, status: 'Queued', assignee: 'Unassigned' },
  { id: 'LEAD-0006', subject: 'Subject-A', cat: 'B', score: 74, type: 'Late-night burst anomaly', device: 'DEV-03', sla: 300, status: 'Queued', assignee: 'Inv. C-1188' },
  { id: 'LEAD-0007', subject: 'Unknown', cat: 'C', score: 63, type: 'Coded-language cluster', device: 'DEV-01', sla: 480, status: 'Monitoring', assignee: 'Unassigned' },
  { id: 'LEAD-0008', subject: 'Unknown', cat: 'C', score: 58, type: 'OSINT correlation', device: 'NET', sla: 540, status: 'Monitoring', assignee: 'Unassigned' },
];

// Court report evidence table
export const EVIDENCE_ITEMS = [
  { id: 'EV-001', desc: 'Category-A cluster CL-100 (14 items)', device: 'DEV-01', sha: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', cat: 'A' },
  { id: 'EV-002', desc: 'Encrypted archive container', device: 'DEV-03', sha: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae', cat: 'A' },
  { id: 'EV-003', desc: 'P2P distribution logs (Hash-2)', device: 'DEV-02', sha: '486ea46224d1bb4fb680f34f7c9ad96a8f24ec88be73ea8e5a6c65260e9cb8a7', cat: 'A' },
  { id: 'EV-004', desc: 'Chat logs referencing Riverside Park', device: 'DEV-01', sha: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', cat: 'B' },
  { id: 'EV-005', desc: 'Financial peel-chain trace map', device: 'FIN', sha: 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35', cat: 'B' },
  { id: 'EV-006', desc: 'Synthetic verdict FILE-2291 (98.2%)', device: 'DEV-02', sha: '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce', cat: 'A' },
];

export const NAV = [
  { path: '/', key: 'vault', label: 'Case Vault', icon: 'Vault', group: 'OVERVIEW', code: 'VAULT · CASE LIFECYCLE', accent: '#22d3ee', k: 0 },
  { path: '/dashboard', key: 'dashboard', label: 'Case Dashboard', icon: 'LayoutDashboard', group: 'OVERVIEW', code: 'MODULE 00 · CASE OVERVIEW', accent: '#22d3ee', k: 1 },
  { path: '/triage', key: 'triage', label: 'Visual Triage', icon: 'ScanEye', group: 'INVESTIGATE', code: 'MODULE 01 · CONTENT ANALYSIS', accent: '#f59e0b', k: 2 },
  { path: '/graph', key: 'graph', label: 'Entity Graph', icon: 'Share2', group: 'INVESTIGATE', code: 'MODULE 03 · SOURCE CORRELATION', accent: '#818cf8', k: 3 },
  { path: '/timeline', key: 'timeline', label: 'Timeline (Chronos)', icon: 'GanttChartSquare', group: 'INVESTIGATE', code: 'MODULE 08 · TIMELINE RECONSTRUCTION', accent: '#67e8f9', k: 4 },
  { path: '/ask', key: 'ask', label: 'Ask AEGIS', icon: 'MessageSquareText', group: 'INTELLIGENCE', code: 'MODULE 09 · INTELLIGENT RETRIEVAL', accent: '#22d3ee', k: 5 },
  { path: '/aicore', key: 'aicore', label: 'AI Core', icon: 'Cpu', group: 'INTELLIGENCE', code: 'MODULE 05 · AI CORE ENGINE ROOM', accent: '#22d3ee', k: 6 },
  { path: '/synthetic', key: 'synthetic', label: 'Synthetic Detection', icon: 'ShieldAlert', group: 'INTELLIGENCE', code: 'MODULE 07 · DEEPFAKE SHIELD', accent: '#e879f9', k: 7 },
  { path: '/queue', key: 'queue', label: 'Risk Queue', icon: 'ListOrdered', group: 'ACTION', code: 'MODULE 11 · LEAD PRIORITIZER', accent: '#f43f5e', k: 8 },
  { path: '/report', key: 'report', label: 'Court Report', icon: 'FileCheck2', group: 'ACTION', code: 'MODULE 10 · AUTOMATED REPORTING', accent: '#34d399', k: 9 },
];

export const NAV_GROUPS = ['OVERVIEW', 'INVESTIGATE', 'INTELLIGENCE', 'ACTION'];

// Dashboard extras — Guardian Network + Edge Kit story beats
export const GUARDIAN = {
  agencies: 23,
  model: 'v14',
  note: 'Federated — gradients only, no data leaves premises.',
};
export const EDGE_KIT = {
  id: 'E-KIT-07',
  preTriaged: 4112,
  note: 'Scene manifest sealed at seizure · offline pre-triage.',
};

// 7-day sparkline series for KPI cards
export const KPI_SPARKS = {
  files: [120, 180, 160, 240, 300, 420, 480],
  flagged: [140, 190, 210, 250, 270, 300, 312],
  highRisk: [4, 6, 7, 9, 11, 13, 14],
  synthetic: [0, 1, 1, 2, 2, 3, 3],
  triage: [190, 150, 120, 95, 70, 55, 47],
  reduction: [72, 78, 82, 85, 88, 90, 91],
};

// Synthetic Detection — provenance + model fingerprint beats
export const PROVENANCE = {
  c2pa: 'MISSING',
  c2paNote: 'No C2PA manifest — absence of provenance is itself a signal.',
  synthid: 'NOT FOUND',
  synthidNote: 'SynthID watermark scan negative across all frames.',
};
export const MODEL_FINGERPRINT = {
  family: 'latent-diffusion v2 class',
  cosine: 0.87,
  note: 'Nearest generator family by latent fingerprint cosine similarity.',
};

// Risk Queue — composite score breakdown (sums to composite score)
export const RISK_BREAKDOWN = {
  'LEAD-0001': [
    { k: 'Content severity', v: 38, c: '#f43f5e' },
    { k: 'Behavioral anomaly', v: 24, c: '#f59e0b' },
    { k: 'Network centrality', v: 21, c: '#818cf8' },
    { k: 'Recency', v: 14, c: '#22d3ee' },
  ],
  'LEAD-0002': [
    { k: 'Content severity', v: 30, c: '#f43f5e' },
    { k: 'Behavioral anomaly', v: 22, c: '#f59e0b' },
    { k: 'Network centrality', v: 30, c: '#818cf8' },
    { k: 'Recency', v: 12, c: '#22d3ee' },
  ],
  'LEAD-0003': [
    { k: 'Content severity', v: 28, c: '#f43f5e' },
    { k: 'Behavioral anomaly', v: 20, c: '#f59e0b' },
    { k: 'Network centrality', v: 28, c: '#818cf8' },
    { k: 'Recency', v: 15, c: '#22d3ee' },
  ],
};

// Court Report — proof-tree (provenance spine) per finding
export const PROOF_TREE = [
  {
    claim: '14 Category-A items depict a minor',
    element: 'POCSO §13 — use of child for pornographic purposes',
    evidence: 'EV-001',
    sha: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
  },
  {
    claim: 'Distribution to 4 peers via P2P',
    element: 'POCSO §15 — storage/transmission of such material',
    evidence: 'EV-003',
    sha: '486ea46224d1bb4fb680f34f7c9ad96a8f24ec88be73ea8e5a6c65260e9cb8a7',
  },
  {
    claim: 'Financing traced to Subject-C',
    element: 'BNS §111 — organised crime (proceeds)',
    evidence: 'EV-005',
    sha: 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35',
  },
];

// ============================================================
// CASE VAULT + GENESIS FLOW (v4)
// ============================================================

export const VAULT_CASES = [
  { id: CANON.caseId, name: CANON.caseName, status: 'ACTIVE', tier: '#f43f5e', files: CANON.filesTotal, flagged: CANON.flagged, devices: 3, volume: CANON.dataVolume, agoMin: CANON.triageMinutes, seeded: true, open: true },
  { id: 'KP-2026-0398', name: 'Night Courier', status: 'COURT-READY', tier: '#f59e0b', files: 212904, flagged: 141, devices: 2, volume: '1.1 TB', agoMin: 1880, seeded: true, open: false },
  { id: 'KP-2026-0311', name: 'Harbor Watch', status: 'CLOSED', tier: '#64748b', files: 96771, flagged: 58, devices: 1, volume: '512 GB', agoMin: 7420, seeded: true, open: false },
];

export const VAULT_INTEGRITY = {
  totalCases: 3,
  sealed: 'WORM - 4.0 TB',
  lastAudit: '2026-07-03 22:10 UTC',
  pqc: 'ML-DSA (Dilithium)',
};

export const LOCAL_FILES = [
  { id: 'f1', name: 'PhoneA_fullfs.ufdr', size: '812 GB', type: 'ufdr' },
  { id: 'f2', name: 'LaptopB_disk.E01', size: '1.2 TB', type: 'e01' },
  { id: 'f3', name: 'SSD_C_image.dd', size: '410 GB', type: 'dd' },
];
export const NET_PRESETS = ['CyberTipline #7714821', 'Warrant return (S3 presigned)', 'Crawl job CR-2216'];
export const CLOUD_PROVIDERS = [
  { id: 'minio', name: 'Agency MinIO', note: 'on-prem object store' },
  { id: 'cellebrite', name: 'Cellebrite Cloud', note: 'warrant-scoped' },
  { id: 'magnet', name: 'Magnet Locker', note: 'evidence vault' },
];
export const CLOUD_BUCKET = [
  { name: 'seizure-2026-06-28/phoneA.tar', size: '812 GB' },
  { name: 'seizure-2026-06-28/laptopB.img', size: '1.2 TB' },
  { name: 'seizure-2026-06-28/ssdC.dd', size: '410 GB' },
];

export const PIPELINE_NODES = [
  { id: 'carve', name: 'Carving', icon: 'Scan', unit: 'files/s' },
  { id: 'hash', name: 'Hashing', icon: 'Fingerprint', unit: 'sha256/s' },
  { id: 'vics', name: 'VICS Normalize', icon: 'Cube', unit: 'rec/s' },
  { id: 'meta', name: 'Metadata Extract', icon: 'FileMagnifyingGlass', unit: 'exif/s' },
  { id: 'queue', name: 'AI Triage Queue', icon: 'Cpu', unit: 'q/s' },
];
export const PROCESS_LOG = [
  'sha256 sealed batch #212',
  'EXIF extracted: 4,112',
  'known-hash match: dedupe 78%',
  'VICS record normalized: 18,004',
  'carved fragments recovered: 2,231',
  'ML-DSA co-signature appended',
  'AI triage enqueued: 101,204',
  'C2PA manifest parsed: 812',
];

export const ANALYZE_STATS = [
  { k: 'Known-hash matched', v: '78.2%', note: 'auto-disposed - no human view', c: '#34d399' },
  { k: 'Unknown to AI triage', v: '21.1%', note: 'routed to classifier', c: '#22d3ee' },
  { k: 'Synthetic-flagged', v: '3 files', note: 'DeepFake Shield', c: '#e879f9' },
  { k: 'Metadata completeness', v: '94.6%', note: 'EXIF / C2PA / VICS', c: '#818cf8' },
];
export const FILE_TYPE_DONUT = [
  { label: 'Images', value: 61, color: '#22d3ee' },
  { label: 'Videos', value: 18, color: '#818cf8' },
  { label: 'Chat DBs', value: 9, color: '#34d399' },
  { label: 'Documents', value: 8, color: '#f59e0b' },
  { label: 'System', value: 4, color: '#64748b' },
];
export const ARCH_LAYERS = [
  { id: 'src', label: 'Sources', metric: '2.4 TB in' },
  { id: 'ingest', label: 'Ingest / VICS', metric: '480k normalized' },
  { id: 'ai', label: 'AI Core', metric: '312 flagged' },
  { id: 'fusion', label: 'Fusion Graph', metric: '38 entities' },
  { id: 'console', label: 'Console', metric: 'court-ready' },
];

export const SEAL_META = [
  ['Devices', '3'],
  ['Volume', '2.4 TB'],
  ['Files', '480,231'],
  ['Flagged', '312'],
  ['Jurisdiction', 'Regional Cyber Division'],
  ['Investigator', '#A-2291'],
  ['Seal', 'SHA-256 + ML-DSA'],
];