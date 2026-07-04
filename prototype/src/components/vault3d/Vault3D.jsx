import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VaultWorld from './VaultWorld';
import VaultHud from './VaultHud';
import AskVaultDrawer from './AskVaultDrawer';
import InspectorDrawer from './InspectorDrawer';
import EvidencePairPanel from './EvidencePairPanel';
import DiveOverlay from './DiveOverlay';
import { VAULT_CASES, GRAPH } from '../../data/mockData';
import { batchInspector, entityInspector, pointFileInspector } from '../../data/inspector';
import { useCaseStore, setActiveCase } from '../../store/caseStore';
import { useReportSealed } from '../../store/reportStore';
import { startDemo } from '../../store/demoStore';
import { dur } from '../../lib/speed';

const BASE = import.meta.env.BASE_URL || '/';
const STRATUM_BY_POSE = { P2: 'lake', P3: 'constellation', P4: 'graph', P5: 'crown' };
const JOINT_KEY = 'aegisx.joint';

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function readJoint() {
  try {
    const v = sessionStorage.getItem(JOINT_KEY);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}

export default function Vault3D() {
  const navigate = useNavigate();
  const { created } = useCaseStore();
  const reportSealed = useReportSealed();
  const reduced = reduceMotion();

  const [data, setData] = useState(null);
  const [view, setView] = useState({ pose: 'P0', focus: null, expandedGraph: false, askActive: false, askTopk: [] });
  const [askOpen, setAskOpen] = useState(false);
  const [proofsOpen, setProofsOpen] = useState(false);
  const [inspector, setInspector] = useState(null);
  const [fusionToggle, setFusionToggle] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [joint, setJoint] = useState(readJoint);
  const [diving, setDiving] = useState(null); // null | 'climb' | 'dive' | 'stream'
  const askTimer = useRef(0);
  const diveTimers = useRef([]);
  const bootstrapped = useRef(false);

  const cases = useMemo(() => VAULT_CASES.map((c) => ({ id: c.id, name: c.name, status: c.status, tier: c.tier })), []);
  const createdId = created?.id || null;
  const nodeById = useMemo(() => Object.fromEntries(GRAPH.nodes.map((n) => [n.id, n])), []);

  // load precomputed datasets once
  useEffect(() => {
    let alive = true;
    const j = (f) => fetch(`${BASE}vault-data/${f}`).then((r) => r.json());
    Promise.all([
      j('lake-blocks.json'),
      j('constellation-0417.json'),
      j('constellation-0398.json'),
      j('constellation-0311.json'),
      j('graph3d-0417.json'),
      j('fusion-threads.json'),
    ])
      .then(([lake, c0417, c0398, c0311, g0417, threads]) => {
        if (!alive) return;
        setData({
          lake,
          constellation: { 'KP-2026-0417': c0417, 'KP-2026-0398': c0398, 'KP-2026-0311': c0311 },
          graph3d: { 'KP-2026-0417': g0417 },
          threads,
        });
      })
      .catch(() => alive && setData({ error: true }));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (bootstrapped.current || !data) return;
    bootstrapped.current = true;
    if (createdId) setTimeout(() => setView((v) => ({ ...v, pose: 'P1', focus: createdId })), dur(400));
  }, [data, createdId]);

  const datasets = useMemo(() => {
    if (!data || data.error) return {};
    const map = {};
    for (const c of cases) {
      map[c.id] = {
        lake: data.lake[c.id] || [],
        constellation: data.constellation[c.id] || null,
        graph3d: data.graph3d[c.id] || null,
      };
    }
    return map;
  }, [data, cases]);

  const fusionActive = view.pose === 'P0' || fusionToggle;
  const currentStratum = STRATUM_BY_POSE[view.pose] || null;
  const focusName = cases.find((c) => c.id === view.focus)?.name;

  // ── camera ───────────────────────────────────────────────
  const flyTo = (pose, caseId) => {
    setProofsOpen(false);
    setView((v) => ({ ...v, pose, focus: pose === 'P0' ? null : caseId ?? v.focus, expandedGraph: pose === 'P4' ? v.expandedGraph : false }));
  };
  const onOverview = () => {
    setAskOpen(false);
    setProofsOpen(false);
    setInspector(null);
    setView((v) => ({ ...v, pose: 'P0', focus: null, expandedGraph: false, askActive: false }));
  };
  const onSelect = (caseId) => flyTo('P1', caseId);
  const onExpandGraph = (caseId) => setView((v) => ({ ...v, pose: 'P4', focus: caseId, expandedGraph: true }));
  const onOpenExplorer = () => navigate('/graph?from=vault');
  const onOpenProofs = (caseId) => {
    setView((v) => ({ ...v, pose: 'P5', focus: caseId }));
    setProofsOpen(true);
  };
  const enterConsole = () => {
    const c = cases.find((x) => x.id === view.focus) || cases[0];
    setActiveCase({ id: c.id, name: c.name, status: c.status });
    navigate('/dashboard');
  };
  const toggleAsk = () => {
    const focus = view.focus || 'KP-2026-0417';
    if (!askOpen) {
      setInspector(null);
      setView((v) => ({ ...v, pose: 'P3', focus }));
      setAskOpen(true);
    } else setAskOpen(false);
  };

  // ── Ask-the-Vault retrieval choreography ─────────────────
  const runFlare = (focus, topk) => {
    setView((v) => ({ ...v, pose: 'P3', focus, askActive: true, askTopk: topk }));
    clearTimeout(askTimer.current);
    askTimer.current = setTimeout(() => setView((v) => ({ ...v, askActive: false })), dur(3600));
  };
  const onAskQuery = (qaIndex) => {
    const focus = view.focus || 'KP-2026-0417';
    const topk = data?.constellation?.[focus]?.topk?.[`q${qaIndex + 1}`] || [];
    runFlare(focus, topk);
  };

  // nearest-neighbour ids for "Find similar"
  const nearest = (caseId, index, k = 12) => {
    const pts = data?.constellation?.[caseId]?.points;
    if (!pts || pts[index] == null) return [];
    const o = pts[index];
    return pts
      .map((p, i) => ({ id: p.id, d: (p.x - o.x) ** 2 + (p.y - o.y) ** 2 + (p.z - o.z) ** 2, i }))
      .filter((x) => x.i !== index)
      .sort((a, b) => a.d - b.d)
      .slice(0, k)
      .map((x) => x.id);
  };

  // ── Artifact Inspector (3D mounts + handlers) ────────────
  const openInspector = (item) => {
    setAskOpen(false);
    setInspector(item);
  };
  const onPickBatch = (caseId, block) => {
    flyTo('P2', caseId);
    openInspector(batchInspector(block));
  };
  const onPickPoint = (caseId, point) => {
    flyTo('P3', caseId);
    openInspector(pointFileInspector(point, caseId));
  };
  const onPickNode = (caseId, id) => {
    const n = nodeById[id];
    if (n) openInspector(entityInspector(n));
  };
  const inspectorHop = (key) => {
    const focus = view.focus || 'KP-2026-0417';
    if (key === 'lake') flyTo('P2', focus);
    else if (key === 'vectorized') flyTo('P3', focus);
    else if (key === 'graph') setView((v) => ({ ...v, pose: 'P4', focus, expandedGraph: true }));
    else if (key === 'report') navigate('/report');
  };
  const inspectorPivot = (action) => {
    const focus = view.focus || 'KP-2026-0417';
    if (action === 'timeline') navigate('/timeline');
    else if (action === 'graph') setView((v) => ({ ...v, pose: 'P4', focus, expandedGraph: true }));
    else if (action === 'report') navigate('/report');
    else if (action === 'similar') {
      const idx = inspector?.pointIndex;
      if (idx != null) runFlare(focus, nearest(focus, idx));
    }
  };

  // ── Fusion threads + joint investigation ─────────────────
  const onToggleFusion = () => {
    setFusionToggle(true);
    onOverview();
  };
  const onSelectThread = (thread) => {
    setInspector(null);
    setAskOpen(false);
    setSelectedThread(thread);
  };
  const proposeJoint = (thread) => {
    const j = { id: 'JOINT-2026-0091', threadId: thread.id, status: 'proposed' };
    try {
      sessionStorage.setItem(JOINT_KEY, JSON.stringify(j));
    } catch {
      /* ignore */
    }
    setJoint(j);
  };

  // ── Report Compile — strata → report cinematic dive (v6c) ─────
  const compileReport = () => {
    const focus = view.focus || 'KP-2026-0417';
    // reduced-motion: skip dive, simple cut + standard assembly
    if (reduced) {
      navigate('/report', { state: { fromCompile: true, cinematic: false } });
      return;
    }
    setProofsOpen(false);
    setAskOpen(false);
    setInspector(null);
    diveTimers.current.forEach(clearTimeout);
    diveTimers.current = [];
    const push = (fn, ms) => diveTimers.current.push(setTimeout(fn, dur(ms)));
    // 1. climb above crown
    setDiving('climb');
    setView((v) => ({ ...v, pose: 'P6a', focus }));
    // 2. vertical dive down through S4→S3→S2→S1 (~600ms/layer)
    push(() => {
      setDiving('dive');
      setView((v) => ({ ...v, pose: 'P6b', focus }));
    }, 700);
    // 3. citation chips stream toward screen bottom
    push(() => setDiving('stream'), 1050);
    // 4. land in the assembling report
    push(() => {
      setDiving(null);
      navigate('/report', { state: { fromCompile: true, cinematic: true } });
    }, 700 + 2400 + 500);
  };

  useEffect(() => () => diveTimers.current.forEach(clearTimeout), []);

  // proof-chip → open a representative artifact in the Inspector
  const onProofChip = (kind) => {
    if (kind === 'Content severity') {
      onPickPoint('KP-2026-0417', { id: 'p0007', m: 'img', x: 0, y: 0, z: 0, index: 7 });
    } else if (kind === 'Network centrality') {
      onPickNode('KP-2026-0417', 'Subject-C');
    } else {
      const n = nodeById['Subject-A'];
      if (n) openInspector(entityInspector(n));
    }
  };

  if (!data) {
    return (
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-[#04070f]">
        <div className="flex items-center gap-2 text-sm text-ink-mid">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-accent" /> Materializing Fusion Vault…
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 bg-[#04070f]">
      <VaultWorld
        cases={cases}
        datasets={datasets}
        view={view}
        createdId={createdId}
        reduced={reduced}
        reportStatus={reportSealed ? 'sealed' : createdId ? 'draft' : 'none'}
        fusionThreads={data.threads?.threads || []}
        fusionActive={fusionActive}
        joint={joint}
        onSelectThread={onSelectThread}
        onSelect={onSelect}
        onExpandGraph={onExpandGraph}
        onOpenExplorer={onOpenExplorer}
        onOpenProofs={onOpenProofs}
        onPickBatch={onPickBatch}
        onPickPoint={onPickPoint}
        onPickNode={onPickNode}
      />

      <VaultHud
        cases={cases}
        view={view}
        focusName={focusName}
        currentStratum={currentStratum}
        createdId={createdId}
        flyTo={flyTo}
        onOverview={onOverview}
        onNewCase={() => navigate('/genesis')}
        onDemo={() => startDemo()}
        onToggleAsk={toggleAsk}
        askOpen={askOpen}
        onEnterConsole={enterConsole}
        proofsOpen={proofsOpen}
        onOpenProofs={() => setProofsOpen(true)}
        onCloseProofs={() => setProofsOpen(false)}
        onProofChip={onProofChip}
        onCompile={compileReport}
        diving={!!diving}
        fusionActive={fusionActive}
        onToggleFusion={onToggleFusion}
        threads={data.threads?.threads || []}
        onSelectThread={onSelectThread}
        joint={joint}
      />

      <AskVaultDrawer open={askOpen} onClose={() => setAskOpen(false)} onAsk={onAskQuery} />
      <InspectorDrawer item={inspector} onClose={() => setInspector(null)} onHop={inspectorHop} onPivot={inspectorPivot} />
      <EvidencePairPanel thread={selectedThread} joint={joint} onClose={() => setSelectedThread(null)} onPropose={proposeJoint} />
      <DiveOverlay active={!!diving} phase={diving} reduced={reduced} />
    </div>
  );
}
