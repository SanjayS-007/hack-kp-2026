// AEGIS-X — Demo Mode guided journey waypoints (presenter-driven).
// Each waypoint: selector of the next click-target, a caption, and how it advances.
// Nothing auto-navigates BETWEEN phases — the presenter's real click advances the pointer.
// (Process + AI Core stages auto-run WITHIN Genesis, so no waypoint targets them.)
// The chain is airtight: every target below is reachable purely by clicking the previous
// spotlight, with the demo engine auto-performing any hidden state (proofs panel, etc.).
// Flags: advanceOn:'input' = advance when the field is typed into (not on click);
//        waitEnabled = spotlight waits until the target is enabled before prompting;
//        backSkip = never a valid "previous" target (Genesis wizard stages are
//        destructive/forward-only — stepping back can skip over but never into them).

export const WAYPOINTS = [
  { id: 'new-case', selector: '[data-demo="new-case"]', caption: 'New Case', note: 'Open Genesis intake', backSkip: true },
  { id: 'acquire-bundle', selector: '[data-demo="acquire-bundle"]', caption: 'Drag the seizure bundle', note: 'Seals SHA-256 onto every file', backSkip: true },
  { id: 'acquire-begin', selector: '[data-demo="acquire-begin"]', caption: 'Begin Ingestion', note: 'Process + AI Core run automatically (~15s) — just watch', backSkip: true },
  { id: 'analyze-continue', selector: '[data-demo="analyze-continue"]', caption: 'Create Case Vault', note: 'Integrity verified', backSkip: true },
  { id: 'seal-name', selector: '[data-demo="seal-name"]', caption: 'Name the case', note: 'Type it — the only typing in the demo', advanceOn: 'input', backSkip: true },
  { id: 'seal-button', selector: '[data-demo="seal-button"]', caption: 'Seal into Vault', note: 'Lock-close ceremony', waitEnabled: true, backSkip: true },
  { id: 'open-case', selector: '[data-demo="open-case"]', caption: 'Open the sealed case', note: 'Enter the console', backSkip: true },
  { id: 'nav-ask', selector: '[data-demo="nav-ask"]', caption: 'Ask AEGIS', note: 'RAG agent-trace centerpiece', route: '/dashboard' },
  { id: 'ask-chip', selector: '[data-demo="ask-chip"]', caption: 'Ask about Subject-B', note: 'Watch the agent trace + citations', route: '/ask' },
  { id: 'nav-graph', selector: '[data-demo="nav-graph"]', caption: 'Entity Graph', note: 'Fusion knowledge graph', route: '/ask' },
  { id: 'graph-gnn', selector: '[data-demo="graph-gnn"]', caption: 'Run GNN Link Prediction', note: 'Reveals hidden Subject-C', route: '/graph' },
  { id: 'return-vault', selector: '[data-demo="return-vault"]', caption: 'Back to the Vault', note: 'Click the case chip — the vault opens straight at the Crown', route: '/graph' },
  { id: 'compile-report', selector: '[data-demo="compile-report"]', caption: 'Compile Case Report', note: 'Dive down the strata → citations land in the court document', route: '/' },
  { id: 'report-seal', selector: '[data-demo="report-seal"]', caption: 'Sign & Seal the report', note: 'Signatures fill → watermark dissolves → vault crown flips green', waitEnabled: true, route: '/report' },
];
