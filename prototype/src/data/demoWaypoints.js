// AEGIS-X — Demo Mode guided journey waypoints (presenter-driven).
// Each waypoint: selector of the next click-target, a caption, and how it advances.
// Nothing auto-navigates BETWEEN phases — the presenter's real click advances the pointer.
// (Process + AI Core stages auto-run WITHIN Genesis, so no waypoint targets them.)
// The chain is airtight: every target below is reachable purely by clicking the previous
// spotlight, with the demo engine auto-performing any hidden state (proofs panel, etc.).
// Flags: advanceOn:'input' = advance when the field is typed into (not on click);
//        waitEnabled = spotlight waits until the target is enabled before prompting.

export const WAYPOINTS = [
  { id: 'new-case', selector: '[data-demo="new-case"]', caption: 'New Case', note: 'Open Genesis intake' },
  { id: 'acquire-bundle', selector: '[data-demo="acquire-bundle"]', caption: 'Drag the seizure bundle', note: 'Seals SHA-256 onto every file' },
  { id: 'acquire-begin', selector: '[data-demo="acquire-begin"]', caption: 'Begin Ingestion', note: 'Process + AI Core run automatically (~15s) — just watch' },
  { id: 'analyze-continue', selector: '[data-demo="analyze-continue"]', caption: 'Create Case Vault', note: 'Integrity verified' },
  { id: 'seal-name', selector: '[data-demo="seal-name"]', caption: 'Name the case', note: 'Type it — the only typing in the demo', advanceOn: 'input' },
  { id: 'seal-button', selector: '[data-demo="seal-button"]', caption: 'Seal into Vault', note: 'Lock-close ceremony', waitEnabled: true },
  { id: 'open-case', selector: '[data-demo="open-case"]', caption: 'Open the sealed case', note: 'Enter the console' },
  { id: 'nav-ask', selector: '[data-demo="nav-ask"]', caption: 'Ask AEGIS', note: 'RAG agent-trace centerpiece' },
  { id: 'ask-chip', selector: '[data-demo="ask-chip"]', caption: 'Ask about Subject-B', note: 'Watch the agent trace + citations' },
  { id: 'nav-graph', selector: '[data-demo="nav-graph"]', caption: 'Entity Graph', note: 'Fusion knowledge graph' },
  { id: 'graph-gnn', selector: '[data-demo="graph-gnn"]', caption: 'Run GNN Link Prediction', note: 'Reveals hidden Subject-C' },
  { id: 'nav-synthetic', selector: '[data-demo="nav-synthetic"]', caption: 'Synthetic Detection', note: 'DeepFake Shield' },
  { id: 'synthetic-reanalyze', selector: '[data-demo="synthetic-reanalyze"]', caption: 'Re-analyze', note: '3-stream verdict 98.2%' },
  { id: 'nav-report', selector: '[data-demo="nav-report"]', caption: 'Court Report', note: 'Automated §63 reporting' },
  { id: 'report-generate', selector: '[data-demo="report-generate"]', caption: 'Generate report', note: 'HERAM 41/42 grounded' },
  { id: 'return-vault', selector: '[data-demo="return-vault"]', caption: 'Back to the Vault', note: 'Click the case chip — pull back to the Fusion Vault' },
  { id: 'fusion-view', selector: '[data-demo="fusion-view"]', caption: 'Fusion View', note: 'Cross-case threads arc between islands (3D)' },
  { id: 'fusion-thread', selector: '[data-demo="fusion-thread"]', caption: 'Open the gold thread', note: 'Shared wallet cluster · 0.91' },
  { id: 'propose-joint', selector: '[data-demo="propose-joint"]', caption: 'Propose joint investigation', note: 'JOINT-2026-0091 — pending supervisor approval' },
  { id: 'nav-crown', selector: '[data-demo="nav-crown"]', caption: 'Rise to the Intelligence Crown', note: 'Risk proof opens automatically' },
  { id: 'compile-report', selector: '[data-demo="compile-report"]', caption: 'Compile Case Report', note: 'Dive down the strata → citations land in the court document' },
  { id: 'report-seal', selector: '[data-demo="report-seal"]', caption: 'Sign & Seal the report', note: 'Signatures fill → watermark dissolves → vault crown flips green', waitEnabled: true },
];
