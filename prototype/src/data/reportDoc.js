// AEGIS-X — Court Report document model (Part A / A2). Every number canon-fed.
// 100% fictional. Minor-V1 is only referenced administratively — never depicted or described.
import { CANON } from './canon';

export const REPORT_META = {
  id: 'RPT-0417-001',
  version: 'AEGIS-X v2.4.1',
  totalPages: 14,
  generatedBy: `AEGIS-X ${'v2.4.1'} · models pinned · SHA-256 manifest attached`,
  classification: CANON.classification, // RESTRICTED // CHILD PROTECTION
  requestingOfficer: CANON.lead,
  unit: CANON.unit,
  jurisdiction: CANON.jurisdiction,
  verifyStub: 'aegis://verify/RPT-0417-001',
};

// §3 — Seizure & chain of custody.
export const SEIZURE = [
  { id: 'DEV-01', label: 'Seized Phone A', seized: '2026-06-27 08:14', location: 'Premises 1 · Riverside', officer: 'Insp. R-1180', writeBlocker: 'Cellebrite UFED · WB-verified', seal: '2026-06-27 09:02', mldsa: '✓ ML-DSA' },
  { id: 'DEV-02', label: 'Seized Laptop B', seized: '2026-06-27 08:31', location: 'Premises 2 · Docklands', officer: 'Insp. R-1180', writeBlocker: 'Tableau T356789 · HW blocker', seal: '2026-06-27 10:47', mldsa: '✓ ML-DSA' },
  { id: 'DEV-03', label: 'External SSD C', seized: '2026-06-27 08:52', location: 'Premises 1 · Riverside', officer: 'Sgt. K-2044', writeBlocker: 'Tableau T8u · HW blocker', seal: '2026-06-27 11:20', mldsa: '✓ ML-DSA' },
];

export const CUSTODY_LOG = [
  { t: '2026-06-27 08:14', actor: 'Insp. R-1180', action: 'Physical seizure · DEV-01 bagged & tagged', hash: 'a3f9…c2e1' },
  { t: '2026-06-27 09:02', actor: 'Edge-Kit E-KIT-07', action: 'On-scene seal · SHA-256 + ML-DSA co-sign', hash: 'a3f9…c2e1' },
  { t: '2026-06-27 12:35', actor: 'Evidence Officer', action: 'Transfer to lab · custody baton signed', hash: 'a3f9…c2e1' },
  { t: '2026-06-28 09:10', actor: 'Examiner #A-2291', action: 'Write-blocked forensic image acquired', hash: 'd41d…8e42' },
  { t: '2026-06-28 09:48', actor: 'AEGIS-X ingest', action: 'Image verified · hash matches scene seal', hash: 'a3f9…c2e1' },
  { t: '2026-06-28 10:03', actor: 'AEGIS-X ingest', action: 'WORM commit · 480,231 objects', hash: 'merkle:7f3a…' },
  { t: '2026-06-28 12:41', actor: 'AEGIS-X AI Core', action: 'Analysis pass complete · verdicts sealed', hash: 'merkle:7f3a…' },
  { t: '2026-07-01 14:05', actor: 'Examiner #A-2291', action: 'Report compiled · pending signature', hash: 'sha256:4e07…' },
];

// §4 — Methodology / model registry (reproducible on demand).
export const METHODOLOGY = [
  { engine: 'Known-hash disposition', text: `PhotoDNA + perceptual hashing auto-disposed ${CANON.disposedPct}% of the corpus (${CANON.disposedFiles.toLocaleString()} objects) without human viewing.` },
  { engine: 'Content classifier', text: 'Hybrid CNN + Vision-Transformer graded residual media on the SAP A/B/C scale with Grad-CAM explanations for every flag.' },
  { engine: 'Apparent-age estimation', text: 'YOLO-Pose + KDE ensemble reports age as a probability band, never a point estimate.' },
  { engine: 'Entity fusion (GNN)', text: 'TAGNN link-prediction over the Neo4j knowledge graph surfaced one hidden financier, re-derived independently before inclusion.' },
  { engine: 'Synthetic-media detector', text: '3-stream (texture / geometry / semantic) ensemble with C2PA + SynthID provenance checks.' },
  { engine: 'HERAM verifier', text: `Every generated statement scored for grounding; only ECS ≥ ${CANON.ecsGate} retained (${CANON.reportGrounded}/${CANON.reportTotal} passed).` },
];

export const MODEL_REGISTRY = [
  { model: 'HybridVision-CSAM', ver: 'v3.2.1', sha: '7f3a9c…e214', p: 0.982, r: 0.971 },
  { model: 'AgeKDE-Ensemble', ver: 'v1.8.0', sha: 'b2d47e…09aa', p: 0.944, r: 0.918 },
  { model: 'TAGNN-LinkPred', ver: 'v2.1.4', sha: '4e0740…9fce', p: 0.911, r: 0.887 },
  { model: 'SynthDetect-3S', ver: 'v4.0.2', sha: '9f86d0…0a08', p: 0.973, r: 0.964 },
  { model: 'HERAM-Verifier', ver: 'v2.0.0', sha: '2c26b4…e7ae', p: 0.968, r: 0.949 },
];

export const ENCLAVE = {
  platform: 'NVIDIA Confidential Computing (H100 CC)',
  measurement: '0x7f3a1c9e4b20d8f6a15e',
  note: 'Enclave attestation binds these exact model weights to this analysis run.',
};

// §5 — Content findings: 12 key exhibits + per-exhibit proof tree.
// Confidences are never rounded. E-114 is the canonical Trace-a-Specimen exhibit.
export const EXHIBITS = [
  { id: 'E-103', type: 'Image', cat: 'A', conf: 96.4, device: 'DEV-01', hash: '9f86d081…0a08', claim: 'Depicts a minor in abusive context', element: 'POCSO §14 — use of child for pornographic purposes', xai: 'Grad-CAM CL-100' },
  { id: 'E-104', type: 'Image', cat: 'A', conf: 95.1, device: 'DEV-01', hash: '2c26b46b…e7ae', claim: 'Category-A cluster member CL-100', element: 'POCSO §14', xai: 'Grad-CAM CL-100' },
  { id: 'E-105', type: 'Image', cat: 'A', conf: 94.7, device: 'DEV-03', hash: '486ea462…b8a7', claim: 'Archived duplicate, byte-identical hash', element: 'POCSO §15 — storage of such material', xai: 'hash-match' },
  { id: 'E-106', type: 'Video', cat: 'A', conf: 93.9, device: 'DEV-03', hash: '6b86b273…b4b', claim: 'Production-phase capture (late-night burst)', element: 'POCSO §13', xai: 'Grad-CAM frame-14' },
  { id: 'E-107', type: 'Chat', cat: 'B', conf: 91.2, device: 'DEV-01', hash: 'd4735e3a…ab35', claim: 'Coded grooming lexicon ("riverside" ×3)', element: 'POCSO §11 — sexual harassment', xai: 'NER + lexicon' },
  { id: 'E-108', type: 'Log', cat: 'A', conf: 92.8, device: 'DEV-02', hash: '4e074085…9fce', claim: 'P2P distribution to 4 peers', element: 'POCSO §15', xai: 'log parse' },
  { id: 'E-109', type: 'Archive', cat: 'A', conf: 90.3, device: 'DEV-03', hash: '1a2b3c4d…9f0e', claim: 'Encrypted container of Cat-A media', element: 'POCSO §15', xai: 'container index' },
  { id: 'E-110', type: 'Ledger', cat: 'B', conf: 88.6, device: 'FIN', hash: 'c1e8f5b2…77aa', claim: 'BTC peel-chain financing endpoint', element: 'BNS §111 — organised crime (proceeds)', xai: 'chain trace' },
  { id: 'E-111', type: 'Chat', cat: 'B', conf: 87.4, device: 'DEV-01', hash: 'e5f6a7b8…3c2d', claim: 'Arrangement of meeting near Riverside Park', element: 'POCSO §11', xai: 'NER geo' },
  { id: 'E-112', type: 'Image', cat: 'C', conf: 84.9, device: 'DEV-02', hash: 'a1b2c3d4…8e9f', claim: 'Indicative material — contextual only', element: 'Corroborative', xai: 'Grad-CAM low' },
  { id: 'E-113', type: 'Image', cat: 'A', conf: 95.8, device: 'DEV-02', hash: 'b7d4e0a9…5512', claim: 'PhotoDNA-miss caught by zero-day classifier', element: 'POCSO §14', xai: 'Grad-CAM zero-day' },
  { id: 'E-114', type: 'Image', cat: 'A', conf: 96.4, device: 'DEV-02', hash: '4e074085…9fce', claim: 'Synthetic Cat-A media (AI-generated 98.2%)', element: 'POCSO §14 + IT Act §67B', xai: 'Grad-CAM + 3-stream' },
];

export const EXHIBIT_DEFAULT_OPEN = 'E-114';

// §6 — Entity network.
export const ENTITY_NARRATIVE = {
  method: 'TAGNN link-prediction 0.89 — verified by re-derivation',
  text: 'Subject-C had no direct communications with any known party. The link was surfaced purely from a shared media hash (#a3f9…) present on Phone-A and a de-mixed BTC flow, then independently re-derived before inclusion. Absent AEGIS-X, this financier would not appear in the case.',
};

export const WALLETS = [
  { id: 'bc1q…7f9', role: 'Receiving cluster (Subject-C)', flow: '0.42 BTC', hops: 3, note: 'Endpoint of peel chain' },
  { id: 'bc1q…a3d', role: 'Peel-chain intermediary', flow: '0.42 BTC', hops: 2, note: 'Splits to obscure origin' },
  { id: 'mix…c0j', role: 'CoinJoin mixer', flow: 'pooled', hops: 1, note: 'De-mixed 0.71 probability path' },
];

// §7 — Timeline: 10 pivotal events + clock-drift disclosure.
export const PIVOTAL_EVENTS = [
  { t: '2026-03-04 21:12', dev: 'DEV-01', phase: 'grooming', label: 'First contact with Minor-V1 (reference)' },
  { t: '2026-03-08 22:40', dev: 'DEV-01', phase: 'grooming', label: 'Coded message "riverside" ×3' },
  { t: '2026-03-13 01:55', dev: 'DEV-01', phase: 'production', label: 'Camera burst (late-night)' },
  { t: '2026-03-14 00:22', dev: 'DEV-02', phase: 'distribution', label: 'P2P client launched' },
  { t: '2026-03-15 02:08', dev: 'DEV-02', phase: 'distribution', label: 'Hash-2 shared to 4 peers' },
  { t: '2026-03-16 12:00', dev: 'FIN', phase: 'financial', label: '0.42 BTC → Wallet-1' },
  { t: '2026-03-18 09:15', dev: 'FIN', phase: 'financial', label: 'Mixer deposit' },
  { t: '2026-03-20 10:02', dev: 'FIN', phase: 'financial', label: 'De-mixed → Subject-C' },
  { t: '2026-03-21 03:10', dev: 'DEV-01', phase: 'distribution', label: 'Files copied to SSD-C' },
  { t: '2026-03-22 04:41', dev: 'DEV-02', phase: 'distribution', label: 'Secure-wipe attempt (recovered)' },
];

export const CLOCK_DRIFT = 'DEV-02 clock ran +00:03:41 fast; all timestamps normalised to UTC via NTP-anchored skew correction. Raw device offsets retained in the appendix for defence reproduction.';

// §9 — Risk & leads (top 3 pulled from RISK_QUEUE in the page).
export const JOINT_DISCLOSURE = 'JOINT-2026-0091 proposed (shared wallet cluster 0.91 — Harbor Watch KP-2026-0311). Pending supervisor approval. Cross-case correlation within this agency\'s sovereign vault; inter-agency federation is model-level only — data never moves.';

// §10 — §63 particulars.
export const CERT_PARTICULARS = [
  ['Source devices', 'DEV-01 (IMEI 3548…9921) · DEV-02 (S/N LNX-7741) · DEV-03 (S/N NVME-8823)'],
  ['Extraction environment', 'Air-gapped, access-controlled forensic lab · sovereign deployment'],
  ['Acquisition method', 'Write-blocked forensic imaging (HW blockers)'],
  ['Integrity', 'SHA-256 per artifact + Merkle-sealed batch manifest'],
  ['AI attestation', `HERAM-scored; only ECS ≥ ${CANON.ecsGate} included`],
];

// §11 Appendix A — hash manifest (24 of 312 shown).
export const HASH_MANIFEST = Array.from({ length: 24 }, (_, i) => {
  const n = 100 + i;
  const cats = ['A', 'A', 'B', 'C'];
  return {
    id: `EX-${n}`,
    dev: ['DEV-01', 'DEV-02', 'DEV-03'][i % 3],
    cat: cats[i % 4],
    sha: `${(0x9f86d0 + i * 7).toString(16)}${(0x88 + i).toString(16)}…${(0xa08 + i).toString(16)}`,
  };
});

// §11 Appendix C — ECS audit log: all 42 statements, 1 excluded (0.71 < gate).
const ECS_TEXTS = [
  'Three devices were seized and imaged under warrant.',
  '480,231 objects were ingested and sealed to WORM storage.',
  '78.2% of the corpus was auto-disposed by known-hash matching.',
  '312 artifacts were flagged across SAP categories A/B/C.',
  '41 artifacts were graded Category-A.',
  '14 items were assessed high-risk.',
  'Subject-A is the primary owner of DEV-01 and DEV-03.',
  'Subject-B operates the P2P distribution node on DEV-02.',
  'A hidden financier (Subject-C) was surfaced via TAGNN link-prediction.',
  'Subject-C was linked by a shared media hash and a de-mixed BTC flow.',
  'The link to Subject-C was independently re-derived before inclusion.',
  'A grooming → production → distribution sequence was reconstructed.',
  'Minor-V1 was referred for safeguarding.',
  '3 files were assessed AI-generated.',
  'FILE-2291 scored 98.2% synthetic across three streams.',
  'No C2PA provenance manifest was present on the synthetic files.',
  'SynthID watermark scans were negative across all frames.',
  'A coded grooming lexicon ("riverside") appears three times.',
  'A meeting was arranged near Riverside Park.',
  'Hash-2 was shared to four P2P peers.',
  '0.42 BTC moved through a three-hop peel chain.',
  'The peel chain terminated at Subject-C\'s receiving cluster.',
  'A CoinJoin mixer deposit preceded the de-mixed transfer.',
  'DEV-02 attempted a secure-wipe which was recovered.',
  'DEV-02 clock ran 3 minutes 41 seconds fast.',
  'All timestamps were normalised to UTC via skew correction.',
  'Composite risk for LEAD-0001 is 97.',
  'Content severity contributes 38 points to the composite.',
  'Behavioural anomaly contributes 24 points.',
  'Network centrality contributes 21 points.',
  'Recency contributes 14 points.',
  'JOINT-2026-0091 was proposed against Harbor Watch.',
  'The cross-case wallet cluster correlation is 0.91.',
  'A byte-identical media hash appears in both cases.',
  'The encrypted container held Category-A media.',
  'The zero-day classifier caught a PhotoDNA miss.',
  'Model weights were pinned and attested in a CC enclave.',
  'The analysis is reproducible from the model registry.',
  'Every flag carries a Grad-CAM explanation.',
  'The evidence manifest is SHA-256 and Merkle-sealed.',
  // the excluded statement (below gate):
  'Subject-C is physically located within the Riverside district.',
  'The §63 dual-part certificate is complete and court-ready.',
];

export const ECS_AUDIT = ECS_TEXTS.map((text, i) => {
  const excluded = i === 40; // "physically located" — speculative, below gate
  const score = excluded ? 0.71 : Number((0.86 + ((i * 37) % 13) / 100).toFixed(2));
  return { n: i + 1, text, score, excluded };
});

export const ECS_EXCLUDED_REASON = 'Location inference unsupported by primary evidence — no geolocation artifact meets the grounding gate.';

// §11 Appendix D — glossary (10 terms, from LAYMAN-GUIDE).
export const GLOSSARY = [
  ['SHA-256', 'A file "fingerprint" — change one byte and it changes completely. The tamper-evident wax seal on evidence.'],
  ['Chain of custody', 'An unbroken, logged record of who handled evidence, when, and what was done. One gap can void admissibility.'],
  ['BSA 2023 §63', 'India\'s Evidence Act certificate required for electronic evidence to be accepted in court — auto-filled here.'],
  ['Grad-CAM / XAI', 'Explainable-AI heat map showing which part of an image drove the model\'s decision.'],
  ['TAGNN / link prediction', 'A graph neural network that infers hidden connections that should exist from the network pattern.'],
  ['HERAM / ECS', 'The system\'s self lie-detector: each generated sentence gets an Evidence Confidence Score; ungrounded ones are cut.'],
  ['Peel chain', 'A laundering trick moving cryptocurrency through many wallets, peeling small amounts at each hop.'],
  ['C2PA', 'A standard where cameras cryptographically sign photos at capture — its absence is itself a signal.'],
  ['WORM storage', 'Write-Once-Read-Many: files can be saved and read but never edited or deleted.'],
  ['Enclave attestation', 'The chip signs a certificate proving exactly which program (model weights) ran inside a sealed compartment.'],
];

// 11-section table of contents (drives TOC rail + scrollspy + assembly cascade).
export const REPORT_SECTIONS = [
  { id: 'sec-cover', n: '1', label: 'Cover' },
  { id: 'sec-summary', n: '2', label: 'Executive Summary' },
  { id: 'sec-custody', n: '3', label: 'Seizure & Custody' },
  { id: 'sec-method', n: '4', label: 'Methodology' },
  { id: 'sec-content', n: '5', label: 'Findings — Content' },
  { id: 'sec-entity', n: '6', label: 'Findings — Entity Network' },
  { id: 'sec-timeline', n: '7', label: 'Findings — Timeline' },
  { id: 'sec-synth', n: '8', label: 'Findings — Synthetic' },
  { id: 'sec-risk', n: '9', label: 'Risk & Leads' },
  { id: 'sec-cert', n: '10', label: '§63 Certificate' },
  { id: 'sec-appendix', n: '11', label: 'Appendices' },
];
