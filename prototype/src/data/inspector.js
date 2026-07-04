// Universal Artifact Inspector — item builders (file / batch / entity / event).
// Every artifact carries a "Strata Trail": Lake → Vectorized → Graph-linked → Cited in report.
// All fictional / synthetic; numbers that are case-facts come from canon.js.
import { CANON } from './canon';
import { GRAPH_GROUP_META, DEVICES } from './mockData';

// Standard provenance-spine hops (each clickable → flies camera / navigates).
export function strataTrail({ cited = true } = {}) {
  return [
    { key: 'lake', label: 'Lake', ts: '11:42', done: true },
    { key: 'vectorized', label: 'Vectorized', ts: '12:03', done: true },
    { key: 'graph', label: 'Graph-linked', ts: '12:17', done: true },
    { key: 'report', label: 'Cited in report', ts: cited ? '12:31' : null, done: cited },
  ];
}

export function batchInspector(block) {
  return {
    mode: 'batch',
    id: block.batch || 'batch',
    title: 'Evidence batch',
    sealed: true,
    accent: '#22d3ee',
    meta: [
      ['Objects', (block.objects ?? 0).toLocaleString()],
      ['Sealed at', (block.sealedAt || '').replace('T', ' ').replace('Z', ' UTC')],
      ['SHA-256', '✓ verified'],
      ['ML-DSA (PQC)', '✓ co-signed'],
      ['Storage', 'WORM · 0 mutations'],
    ],
    trail: strataTrail({ cited: true }),
    similar: false,
  };
}

export function entityInspector(node) {
  const g = GRAPH_GROUP_META[node.group] || { label: 'Entity' };
  return {
    mode: 'entity',
    id: node.id,
    title: node.label || node.id,
    typeLabel: g.label,
    sealed: true,
    accent: g.color || '#818cf8',
    detail: node.detail,
    hidden: node.hidden,
    risk: node.risk,
    meta: [
      ['Type', g.label],
      ['Risk', node.risk || '—'],
      ['Case', CANON.caseId],
    ],
    trail: strataTrail({ cited: node.group === 'subject' }),
    similar: false,
  };
}

export function fileInspector(media) {
  const dev = DEVICES.find((x) => x.id === media.device);
  return {
    mode: 'file',
    id: media.id,
    title: 'Media artifact',
    sealed: true,
    accent: media.needsReview ? '#38bdf8' : '#f59e0b',
    confidence: media.confidence,
    meta: [
      ['Cluster', media.cluster],
      ['Device', `${media.device} · ${dev?.label || ''}`],
      ['Type', media.type],
      ['Apparent age', media.apparentAge],
      ['SHA-256', media.hash],
    ],
    trail: strataTrail({ cited: media.cat === 'A' }),
    similar: true,
  };
}

const HUE_LABEL = { img: 'image', txt: 'text', evt: 'event' };

export function pointFileInspector(point, caseId) {
  return {
    mode: 'file',
    id: point.id,
    title: 'Vector-store artifact',
    sealed: true,
    accent: point.m === 'img' ? '#22d3ee' : point.m === 'txt' ? '#818cf8' : '#f59e0b',
    gradient: point.m === 'img' ? 'from-cyan-900 via-teal-800 to-emerald-900' : point.m === 'txt' ? 'from-indigo-900 via-violet-800 to-blue-900' : 'from-amber-900 via-orange-800 to-red-900',
    meta: [
      ['Modality', HUE_LABEL[point.m] || point.m],
      ['Embedding', 'all-MiniLM-L12-v2 · 384-dim'],
      ['Vector store', 'ChromaDB · HNSW'],
      ['Case', caseId || CANON.caseId],
    ],
    trail: strataTrail({ cited: false }),
    similar: true,
    pointIndex: point.index,
  };
}

export function eventInspector(ev, trackLabel) {
  return {
    mode: 'event',
    id: ev.label,
    title: `${trackLabel || 'Event'} · ${ev.phase}`,
    sealed: true,
    accent: '#67e8f9',
    meta: [
      ['When', ev.time],
      ['Phase', ev.phase],
      ['Track', trackLabel || '—'],
      ['Clock-skew', 'corrected +00:03:41'],
    ],
    trail: strataTrail({ cited: ev.phase === 'distribution' || ev.phase === 'financial' }),
    similar: false,
  };
}
