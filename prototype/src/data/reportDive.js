// AEGIS-X — Report Compile "strata → report" cinematic dive (v6c).
// Citation chips detach from the strata during the dive and land into the report.
// All IDs/facts are canon-consistent (EVIDENCE_ITEMS / GRAPH / LEAD numbers).

// Four strata of the provenance spine (bottom→top): Lake · Vector · Graph · Crown.
export const STRATA_META = {
  lake: { key: 'lake', label: 'Lake', full: 'Evidence Lake (S1)', color: '#22d3ee' },
  vector: { key: 'vector', label: 'Vector', full: 'Vector Constellation (S2)', color: '#818cf8' },
  graph: { key: 'graph', label: 'Graph', full: 'Knowledge Graph (S3)', color: '#34d399' },
  crown: { key: 'crown', label: 'Crown', full: 'Intelligence Crown (S4)', color: '#f43f5e' },
};

export const STRATA_ORDER = ['lake', 'vector', 'graph', 'crown'];

// 9 citation chips streamed during the dive → land into report sections.
export const CITATION_CHIPS = [
  { id: 'EV-001', label: 'Category-A cluster CL-100', stratum: 'lake' },
  { id: 'EV-002', label: 'Encrypted archive container', stratum: 'lake' },
  { id: 'LEX-31', label: 'Coded-lexicon embedding', stratum: 'vector' },
  { id: 'EV-004', label: 'Riverside grooming chat', stratum: 'vector' },
  { id: 'WAL-77', label: 'BTC peel-chain endpoint', stratum: 'graph' },
  { id: 'Subject-C', label: 'Hidden financier node', stratum: 'graph' },
  { id: 'EV-003', label: 'P2P distribution logs', stratum: 'graph' },
  { id: 'LEAD-0001', label: 'Composite risk 97', stratum: 'crown' },
  { id: 'EV-006', label: 'Synthetic verdict 98.2%', stratum: 'crown' },
];

// Which strata feed each report section (drives the per-section provenance footer).
export const SECTION_PROVENANCE = {
  'sec-summary': ['lake', 'vector', 'graph', 'crown'],
  'sec-content': ['lake', 'vector'],
  'sec-entity': ['graph'],
  'sec-timeline': ['lake', 'graph'],
  'sec-synth': ['vector', 'crown'],
  'sec-risk': ['graph', 'crown'],
};
