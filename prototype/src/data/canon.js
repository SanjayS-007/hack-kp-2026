// AEGIS-X — CANONICAL DATA CONTRACT (v5)
// The single source of truth for EVERY case number quoted anywhere in the app.
// RULE: no page, phase, or dataset may hardcode these values — import from here.
// A judge cross-checking any number across Genesis → Engine Room → Console → Report
// must find it identical. All values 100% fictional / synthetic.

// ── Case identity ────────────────────────────────────────────────
export const CASE_ID = 'KP-2026-0417';
export const CASE_NAME = 'Operation Sentinel';
export const CASE_LEAD = 'Investigator #A-2291';
export const CASE_UNIT = 'Cyber Crimes — Child Protection Cell';
export const CASE_JURISDICTION = 'Regional Cyber Division';
export const CASE_OPENED = '2026-06-28';
export const CASE_CLASSIFICATION = 'RESTRICTED // CHILD PROTECTION';

// ── Volume + corpus ──────────────────────────────────────────────
export const DATA_VOLUME = '2.4 TB';
export const FILES_TOTAL = 480231; // = sum of device file counts below

// ── Disposition split ────────────────────────────────────────────
export const DISPOSED_PCT = 78.2; // known-hash auto-disposed, never seen by a human
export const DISPOSED_FILES = 375541; // 78.2% of the corpus, never seen by a human eye
export const TO_AI_PCT = 21.1; // routed to the AI classifier

// ── Findings ─────────────────────────────────────────────────────
export const FLAGGED = 312; // = A41 + B88 + C183
export const FLAGGED_A = 41;
export const FLAGGED_B = 88;
export const FLAGGED_C = 183;
export const HIGH_RISK = 14;
export const SYNTHETIC = 3;
export const LEADS = 8;

// ── Fusion graph ─────────────────────────────────────────────────
export const ENTITIES = 38;
export const EDGES = 91;
export const SUBJECTS = 3;

// ── Efficiency + integrity ───────────────────────────────────────
export const TRIAGE_MINUTES = 47;
export const REVIEW_REDUCTION = 91; // percent
export const REPORT_GROUNDED = 41; // statements grounded
export const REPORT_TOTAL = 42; // total statements (41/42 grounded)
export const ECS_GATE = 0.85; // HERAM grounding gate ≥ 0.85

// ── Devices (file counts sum to FILES_TOTAL) ─────────────────────
export const DEVICES_CANON = [
  { id: 'DEV-01', files: 214880 },
  { id: 'DEV-02', files: 198432 },
  { id: 'DEV-03', files: 66919 },
];

// ── Trace-a-Specimen canonical exhibit ───────────────────────────
export const SPECIMEN = {
  id: 'FILE-2291',
  a1: 'no-match',
  a2: 'Cat-A 96.4%',
  a3: 'age 9–12 p=0.94',
  a4: 'AI-GENERATED 98.2%',
  d1: 'linked Subject-B',
  d4: 'sealed ✓',
  exhibit: 'E-114',
};

// ── Aggregate object (convenience) ───────────────────────────────
export const CANON = {
  caseId: CASE_ID,
  caseName: CASE_NAME,
  lead: CASE_LEAD,
  unit: CASE_UNIT,
  jurisdiction: CASE_JURISDICTION,
  opened: CASE_OPENED,
  classification: CASE_CLASSIFICATION,
  dataVolume: DATA_VOLUME,
  filesTotal: FILES_TOTAL,
  disposedPct: DISPOSED_PCT,
  disposedFiles: DISPOSED_FILES,
  toAiPct: TO_AI_PCT,
  flagged: FLAGGED,
  flaggedA: FLAGGED_A,
  flaggedB: FLAGGED_B,
  flaggedC: FLAGGED_C,
  highRisk: HIGH_RISK,
  synthetic: SYNTHETIC,
  leads: LEADS,
  entities: ENTITIES,
  edges: EDGES,
  subjects: SUBJECTS,
  triageMinutes: TRIAGE_MINUTES,
  reviewReduction: REVIEW_REDUCTION,
  reportGrounded: REPORT_GROUNDED,
  reportTotal: REPORT_TOTAL,
  ecsGate: ECS_GATE,
};

export default CANON;
