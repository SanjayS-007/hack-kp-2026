// AEGIS-X — AI Core "Engine Room" definitions (v5).
// Lane/engine specs + model registry. Numbers that are case-facts import from canon.
// All fictional / synthetic. Confidences are calibrated-looking (never round).

import { CANON } from './canon';

export const ENCLAVE = {
  mode: 'NVIDIA CC-mode',
  gpus: [
    { id: 'gpu-01', util: 82 },
    { id: 'gpu-02', util: 64 },
  ],
  attestation: '0x7f3a…',
  network: 'air-gapped',
};

// Modality → particle color (Router splits the stream into lanes by modality)
export const MODALITY = {
  image: { color: '#22d3ee', label: 'image' }, // cyan
  text: { color: '#818cf8', label: 'text' }, // indigo
  event: { color: '#f59e0b', label: 'event' }, // amber
};

export const LANES = [
  { id: 'A', title: 'VISUAL', modality: 'image', color: '#22d3ee' },
  { id: 'B', title: 'LANGUAGE', modality: 'text', color: '#818cf8' },
  { id: 'C', title: 'TEMPORAL', modality: 'event', color: '#f59e0b' },
  { id: 'D', title: 'FUSION', modality: 'fusion', color: '#34d399' },
];

// Each engine: id, lane, name, spec chip, icon (lucide), plain-words line,
// spec table rows, sample artifact kind, quality chips (never-round), rate/min base.
export const ENGINES = [
  // ── Lane A · VISUAL ──────────────────────────────────────────
  {
    id: 'A1',
    lane: 'A',
    name: 'Known-Hash Prefilter',
    icon: 'Fingerprint',
    spec: `PhotoDNA + ProjectVIC · ${CANON.disposedPct}% auto-disposed`,
    plain: 'Instantly matches every file against catalogued known-bad hash lists, so previously-seen material is auto-disposed and no human ever has to look at it again.',
    rate: 41200,
    color: '#22d3ee',
    specTable: [
      ['Hash sets', 'PhotoDNA · Project VIC · NCMEC'],
      ['Match', 'perceptual + cryptographic (SHA-256)'],
      ['Auto-disposed', `${CANON.disposedFiles.toLocaleString()} files`],
      ['Latency', '3.1 ms / file'],
    ],
    artifact: 'hashlist',
    chips: [
      { k: 'auto-disposed', v: `${CANON.disposedPct}%` },
      { k: 'false-clear rate', v: '0.004%' },
    ],
  },
  {
    id: 'A2',
    lane: 'A',
    name: 'Hybrid Classifier',
    icon: 'ScanEye',
    spec: 'ConvNeXt-T + Swin-T · 89M params · TensorRT INT8 · v2.4.1',
    plain: 'Two different vision backbones vote on unknown images; Grad-CAM shows exactly where the model looked so the decision is explainable in court.',
    rate: 12480,
    color: '#22d3ee',
    specTable: [
      ['Backbones', 'ConvNeXt-Tiny + Swin-Tiny (ensemble)'],
      ['Params', '89M · TensorRT INT8'],
      ['Version', 'v2.4.1'],
      ['XAI', 'Grad-CAM attention maps'],
    ],
    artifact: 'gradcam',
    chips: [
      { k: 'precision', v: '0.943' },
      { k: 'recall', v: '0.917' },
    ],
  },
  {
    id: 'A3',
    lane: 'A',
    name: 'Human Perception',
    icon: 'PersonStanding',
    spec: 'YOLO-Pose v8.2 + age-KDE · P 0.943 / R 0.917',
    plain: 'Estimates apparent age and body pose with an uncertainty band — never a single hard number, always a calibrated range.',
    rate: 9640,
    color: '#22d3ee',
    specTable: [
      ['Pose', 'YOLO-Pose v8.2 · 17 keypoints'],
      ['Age', 'kernel-density estimate (KDE)'],
      ['Output', 'apparent age 9–12 · p=0.94'],
      ['Precision / Recall', '0.943 / 0.917'],
    ],
    artifact: 'agekde',
    chips: [
      { k: 'apparent age', v: '9–12' },
      { k: 'p', v: '0.94' },
    ],
  },
  {
    id: 'A4',
    lane: 'A',
    name: 'Synthetic Shield',
    icon: 'ShieldAlert',
    spec: 'C2PA → SynthID → DINOv2-G · 3-stream',
    plain: 'Three independent checks — provenance, watermark, and a vision forensics model — decide whether an image was AI-generated.',
    rate: 6120,
    color: '#22d3ee',
    specTable: [
      ['Stream 1', 'C2PA provenance manifest'],
      ['Stream 2', 'SynthID watermark scan'],
      ['Stream 3', 'DINOv2-G defocus-optics forensics'],
      ['Fusion', 'weighted 3-stream verdict'],
    ],
    artifact: 'synth',
    chips: [
      { k: 'verdict', v: 'AI-GEN 98.2%' },
      { k: 'streams agree', v: '3 / 3' },
    ],
  },
  // ── Lane B · LANGUAGE ────────────────────────────────────────
  {
    id: 'B1',
    lane: 'B',
    name: 'OCR + NER / Coded-Lexicon',
    icon: 'ScanText',
    spec: 'PaddleOCR fork + fine-tuned MiniLM · slang-drift',
    plain: 'Reads text out of images and chats, then flags people, places, and coded/slang terms that shift over time.',
    rate: 8320,
    color: '#818cf8',
    specTable: [
      ['OCR', 'PaddleOCR fork'],
      ['NER', 'fine-tuned MiniLM'],
      ['Lexicon', 'coded-language + slang-drift embeddings'],
      ['Hit', '"riverside" × 6 chat logs'],
    ],
    artifact: 'ner',
    chips: [
      { k: 'entities tagged', v: '1,204' },
      { k: 'coded hits', v: '6' },
    ],
  },
  {
    id: 'B2',
    lane: 'B',
    name: 'Chunk → Embed → Index',
    icon: 'Boxes',
    spec: 'all-MiniLM-L12-v2 → ChromaDB · 384-dim',
    plain: 'Splits documents into passages and turns them into searchable vectors so the Ask-AEGIS retrieval can find exactly the right evidence.',
    rate: 15600,
    color: '#818cf8',
    specTable: [
      ['Model', 'all-MiniLM-L12-v2'],
      ['Dimensions', '384-dim'],
      ['Store', 'ChromaDB (on-prem)'],
      ['Indexed', `${CANON.filesTotal.toLocaleString()} artifacts`],
    ],
    artifact: 'embed',
    chips: [
      { k: 'vectors', v: CANON.filesTotal.toLocaleString() },
      { k: 'dim', v: '384' },
    ],
  },
  // ── Lane C · TEMPORAL ────────────────────────────────────────
  {
    id: 'C1',
    lane: 'C',
    name: 'Clock-skew / FSA Stratigraphy',
    icon: 'Clock',
    spec: 'filesystem-stratigraphy · +00:03:41 corrected',
    plain: 'Corrects for wrong device clocks and reconstructs the true order of events from filesystem layers — like reading rock strata.',
    rate: 4180,
    color: '#f59e0b',
    specTable: [
      ['Skew', 'DEV-02 corrected +00:03:41'],
      ['Method', 'FSA inode stratigraphy'],
      ['Recovered', 'wiped inode table (recovered)'],
      ['Output', 'canonical event ordering'],
    ],
    artifact: 'heatline',
    chips: [
      { k: 'drift corrected', v: '+00:03:41' },
      { k: 'events reordered', v: '312' },
    ],
  },
  {
    id: 'C2',
    lane: 'C',
    name: 'TAGNN Behavior Anomaly',
    icon: 'Activity',
    spec: 'temporal attention GNN · anomaly scoring',
    plain: 'Learns each device\u2019s normal rhythm and flags abnormal bursts — like the late-night activity spikes in this case.',
    rate: 3720,
    color: '#f59e0b',
    specTable: [
      ['Model', 'Temporal Attention GNN'],
      ['Signal', 'inter-event timing + volume'],
      ['Anomaly', 'late-night burst (DEV-01)'],
      ['Score', '0.883 AUC'],
    ],
    artifact: 'heatline',
    chips: [
      { k: 'anomalies', v: '9' },
      { k: 'AUC', v: '0.883' },
    ],
  },
  // ── Lane D · FUSION ──────────────────────────────────────────
  {
    id: 'D1',
    lane: 'D',
    name: 'Entity → KG Upsert',
    icon: 'Share2',
    spec: `Neo4j · ${CANON.entities} entities / ${CANON.edges} edges`,
    plain: 'Merges everything the lanes found into one knowledge graph of people, devices, wallets and media.',
    rate: 2280,
    color: '#34d399',
    specTable: [
      ['Store', 'Neo4j (on-prem)'],
      ['Entities', String(CANON.entities)],
      ['Edges', String(CANON.edges)],
      ['Op', 'idempotent MERGE upsert'],
    ],
    artifact: 'cypher',
    chips: [
      { k: 'entities', v: String(CANON.entities) },
      { k: 'edges', v: String(CANON.edges) },
    ],
  },
  {
    id: 'D2',
    lane: 'D',
    name: 'TAGNN Link-Prediction',
    icon: 'Sparkles',
    spec: 'temporal attention GNN · peel-chain heuristic',
    plain: 'Predicts hidden relationships the raw data doesn\u2019t state outright — this is how the concealed financier Subject-C was surfaced.',
    rate: 1960,
    color: '#34d399',
    specTable: [
      ['Model', 'TAGNN link-predictor'],
      ['Candidates', 'scored across ' + CANON.entities + ' entities'],
      ['Reveal', 'Subject-C via de-mix 0.71'],
      ['Top edges', '0.89 · 0.84 · 0.77'],
    ],
    artifact: 'linkpred',
    chips: [
      { k: 'new edges', v: '3' },
      { k: 'top conf', v: '0.89' },
    ],
  },
  {
    id: 'D3',
    lane: 'D',
    name: 'Composite Risk',
    icon: 'Gauge',
    spec: 'SAP A–C · weighted composite scoring',
    plain: 'Combines content severity, behaviour, network centrality and recency into one prioritised risk score per lead.',
    rate: 1740,
    color: '#34d399',
    specTable: [
      ['Scale', 'SAP Category A / B / C'],
      ['Factors', 'severity · anomaly · centrality · recency'],
      ['Leads', String(CANON.leads)],
      ['High-risk', String(CANON.highRisk)],
    ],
    artifact: 'risk',
    chips: [
      { k: 'leads', v: String(CANON.leads) },
      { k: 'high-risk', v: String(CANON.highRisk) },
    ],
  },
  {
    id: 'D4',
    lane: 'D',
    name: 'Verifier Agent',
    icon: 'BadgeCheck',
    spec: 'HERAM grounding · ECS gate ≥ ' + CANON.ecsGate,
    plain: 'Every claim is independently re-derived from primary evidence and cryptographically sealed — nothing reaches the report unless it is grounded.',
    rate: 940,
    color: '#f5c451',
    gold: true,
    specTable: [
      ['Method', 'HERAM re-derivation + grounding'],
      ['Gate', `ECS ≥ ${CANON.ecsGate}`],
      ['Sealed', `${CANON.reportGrounded}/${CANON.reportTotal} statements grounded`],
      ['Excluded', '1 statement below threshold (0.71)'],
    ],
    artifact: 'verify',
    chips: [
      { k: 'claims re-derived', v: '3' },
      { k: 'grounded', v: `${CANON.reportGrounded}/${CANON.reportTotal}` },
    ],
  },
];

// Model Registry rail — pinned versions with weight SHA-256 (short) + P/R.
export const MODEL_REGISTRY = [
  { name: 'Hybrid Classifier', version: 'v2.4.1', sha: '4f9ac21e…8b70', metric: 'P 0.943 / R 0.917' },
  { name: 'YOLO-Pose', version: 'v8.2', sha: '7b3de08a…1c94', metric: 'P 0.951 / R 0.902' },
  { name: 'age-KDE estimator', version: 'v1.6', sha: 'c0847ae3…d221', metric: 'p 0.94 band' },
  { name: 'DINOv2-G synthetic', version: 'v1.3', sha: 'a19cf4d0…5e6f', metric: 'P 0.972 / R 0.941' },
  { name: 'all-MiniLM-L12-v2', version: 'v2', sha: 'd4735e3a…ab35', metric: '384-dim · ChromaDB' },
  { name: 'TAGNN link-predict', version: 'v0.9', sha: '2c26b46b…e7ae', metric: 'AUC 0.883' },
  { name: 'Llama-3 verifier', version: '8B-local', sha: '9f86d081…0a08', metric: `ECS ≥ ${CANON.ecsGate}` },
];

// ★ Trace-a-Specimen — the FILE-2291 journey. Each stop = one engine + stamp.
export const TRACE_STOPS = [
  { engine: 'A1', stamp: 'no-match', detail: 'not in known-hash sets — routed to classifier' },
  { engine: 'A2', stamp: 'Cat-A 96.4%', detail: 'hybrid classifier · Grad-CAM localized' },
  { engine: 'A3', stamp: 'age 9–12 · p=0.94', detail: 'age-KDE band + pose keypoints' },
  { engine: 'A4', stamp: 'AI-GENERATED 98.2%', detail: '3-stream synthetic verdict' },
  { engine: 'D1', stamp: 'linked Subject-B', detail: 'entity upserted to knowledge graph' },
  { engine: 'D4', stamp: 'sealed ✓', detail: 'claim re-derived + ECS-sealed → exhibit E-114' },
];
