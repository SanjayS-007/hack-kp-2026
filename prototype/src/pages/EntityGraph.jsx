import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import {
  Share2,
  X,
  Crosshair,
  Cpu,
  Sparkles,
  BellRing,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCw,
  User,
  Shield,
  Smartphone,
  Laptop,
  HardDrive,
  Wallet,
  Wifi,
  Hash,
  Target,
} from 'lucide-react';
import { GRAPH, GRAPH_GROUP_META, PEEL_PATH } from '../data/mockData';
import { CANON } from '../data/canon';
import { dur } from '../lib/speed';
import ArtifactInspector, { useInspectorNav } from '../components/inspector/ArtifactInspector';
import { entityInspector } from '../data/inspector';
import { PageHeader, Badge, useDocumentTitle } from '../components/ui';

const W = 900;
const H = 560;

const NODE_ICON = {
  'Subject-A': User,
  'Subject-B': User,
  'Subject-C': User,
  'Minor-V1': Shield,
  'Phone-A': Smartphone,
  'Laptop-B': Laptop,
  'SSD-C': HardDrive,
  Wallet: Wallet,
};
function iconFor(node) {
  if (NODE_ICON[node.id]) return NODE_ICON[node.id];
  if (node.group === 'wallet') return Wallet;
  if (node.group === 'ip') return Wifi;
  if (node.group === 'hash') return Hash;
  if (node.group === 'device') return HardDrive;
  return User;
}

function useForce(nodes, links) {
  const [, force] = useState(0);
  const state = useRef(null);
  const ctrl = useRef({ frame: 0, raf: 0 });

  const layout = useCallback(() => {
    state.current = nodes.map((n, i) => ({
      ...n,
      x: W / 2 + Math.cos((i / nodes.length) * 2 * Math.PI) * 200 + (i % 3) * 10,
      y: H / 2 + Math.sin((i / nodes.length) * 2 * Math.PI) * 160 + (i % 5) * 8,
      vx: 0,
      vy: 0,
    }));
  }, [nodes]);

  if (!state.current) layout();

  const simulate = useCallback(() => {
    cancelAnimationFrame(ctrl.current.raf);
    clearTimeout(ctrl.current.raf);
    ctrl.current.frame = 0;
    const pts = state.current;
    const idx = Object.fromEntries(pts.map((p, i) => [p.id, i]));
    const tick = () => {
      ctrl.current.frame++;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy || 0.01;
          const f = 5200 / d2;
          const d = Math.sqrt(d2);
          a.vx += (dx / d) * f;
          a.vy += (dy / d) * f;
          b.vx -= (dx / d) * f;
          b.vy -= (dy / d) * f;
        }
      }
      links.forEach((l) => {
        const a = pts[idx[l.source]];
        const b = pts[idx[l.target]];
        if (!a || !b) return;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 0.01;
        const f = (d - 120) * 0.02;
        a.vx += (dx / d) * f;
        a.vy += (dy / d) * f;
        b.vx -= (dx / d) * f;
        b.vy -= (dy / d) * f;
      });
      pts.forEach((p) => {
        p.vx += (W / 2 - p.x) * 0.006;
        p.vy += (H / 2 - p.y) * 0.006;
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += Math.max(-8, Math.min(8, p.vx));
        p.y += Math.max(-8, Math.min(8, p.vy));
        p.x = Math.max(40, Math.min(W - 40, p.x));
        p.y = Math.max(40, Math.min(H - 40, p.y));
      });
      force((f2) => f2 + 1);
      if (ctrl.current.frame < 260) ctrl.current.raf = requestAnimationFrame(tick);
      else {
        ctrl.current.raf = setTimeout(() => requestAnimationFrame(tick), 900);
        ctrl.current.frame = 200;
      }
    };
    ctrl.current.raf = requestAnimationFrame(tick);
  }, [links, force]);

  useEffect(() => {
    simulate();
    const c = ctrl.current;
    return () => {
      cancelAnimationFrame(c.raf);
      clearTimeout(c.raf);
    };
  }, [simulate]);

  const restart = useCallback(() => {
    layout();
    simulate();
  }, [layout, simulate]);

  return [state.current, restart];
}

export default function EntityGraph() {
  useDocumentTitle('Entity Graph');
  const { onHop, onPivot } = useInspectorNav();
  const fromVault = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('from') === 'vault';
  const [selected, setSelected] = useState(null);
  const [running, setRunning] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [toast, setToast] = useState(false);
  const [hoverEdge, setHoverEdge] = useState(null);
  const [legendOpen, setLegendOpen] = useState(true);
  const [focusPath, setFocusPath] = useState(false);
  const [view, setView] = useState({ scale: 1, tx: 0, ty: 0 });
  const [nodes, restart] = useForce(GRAPH.nodes, GRAPH.links);
  const pos = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes]);

  const peelSet = new Set(PEEL_PATH);
  const sel = selected ? GRAPH.nodes.find((n) => n.id === selected) : null;

  const runPrediction = () => {
    if (running || revealed) return;
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setRevealed(true);
      setToast(true);
      setTimeout(() => setToast(false), dur(8000));
    }, dur(1800));
  };

  const reset = () => {
    setRevealed(false);
    setToast(false);
    setSelected(null);
    setFocusPath(false);
  };

  const zoom = (f) =>
    setView((v) => {
      const scale = Math.max(0.5, Math.min(2.4, v.scale * f));
      const cx = W / 2;
      const cy = H / 2;
      return { scale, tx: cx - (cx - v.tx) * (scale / v.scale), ty: cy - (cy - v.ty) * (scale / v.scale) };
    });
  const fit = () => setView({ scale: 1, tx: 0, ty: 0 });

  const nodeHidden = (n) => n.id === 'Subject-C' && !revealed;
  const linkHidden = (l) => l.predicted && !revealed;
  const dim = (id) => focusPath && !peelSet.has(id);
  const edgeDim = (l) => focusPath && !(peelSet.has(l.source) && peelSet.has(l.target));

  return (
    <>
      {fromVault && (
        <a
          href="/"
          className="mb-3 inline-flex items-center gap-1.5 rounded-lg border border-cyan-accent/30 bg-surface-1/60 px-3 py-1.5 text-xs font-semibold text-cyan-accent transition-colors hover:bg-cyan-accent/10"
        >
          ← back to Vault 3D
        </a>
      )}
      <PageHeader
        eyebrow="MODULE 03 · SOURCE CORRELATION"
        title="Entity Graph — Fusion Center"
        subtitle="TAGNN correlation over subjects · devices · wallets · IPs · media hashes"
        accent="#818cf8"
        actions={
          revealed ? (
            <button
              onClick={reset}
              className="flex items-center gap-2 rounded-lg bg-surface-2 px-3 py-2 text-xs font-semibold text-ink-mid hover:text-ink-hi"
            >
              <X size={14} /> Reset prediction
            </button>
          ) : (
            <button
              onClick={runPrediction}
              disabled={running}
              data-demo="graph-gnn"
              className="flex items-center gap-2 rounded-lg bg-cyan-accent px-4 py-2 text-xs font-bold text-navy-950 transition-all hover:shadow-glow disabled:opacity-70"
            >
              {running ? (
                <>
                  <Cpu size={14} className="animate-spin" /> TAGNN inference…
                </>
              ) : (
                <>
                  <Sparkles size={14} /> Run GNN Link Prediction
                </>
              )}
            </button>
          )
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="card relative overflow-hidden lg:col-span-3">
          {/* toast */}
          {toast && (
            <div className="card-3 absolute right-4 top-4 z-30 flex w-64 animate-slide-in-top items-start gap-2.5 border-amber-500/50 p-3.5">
              <BellRing size={18} className="mt-0.5 shrink-0 animate-pulse-slow text-amber-400" />
              <div className="text-xs">
                <div className="font-semibold text-amber-300">1 new entity promoted to suspect</div>
                <div className="text-ink-mid">Subject-C surfaced by link prediction — review required.</div>
                <button
                  onClick={() => {
                    setSelected('Subject-C');
                    setToast(false);
                  }}
                  className="mt-1.5 font-semibold text-cyan-accent hover:underline"
                >
                  Review entity →
                </button>
              </div>
            </div>
          )}

          {/* running overlay */}
          {running && (
            <div className="glass absolute inset-0 z-30 flex flex-col items-center justify-center">
              <Cpu size={34} className="animate-spin text-cyan-accent" />
              <div className="mt-3 text-sm font-semibold text-cyan-accent">TAGNN inference…</div>
              <div className="mt-1 text-xs text-ink-mid">Scoring candidate links across {CANON.entities} entities</div>
            </div>
          )}

          {/* floating legend (collapsible) */}
          <div className="absolute left-3 top-3 z-20">
            <button
              onClick={() => setLegendOpen((v) => !v)}
              className="card-3 flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold text-ink-mid"
            >
              <Share2 size={12} className="text-cyan-accent" /> Legend
            </button>
            {legendOpen && (
              <div className="card-3 mt-1.5 flex flex-wrap gap-2 p-2.5" style={{ maxWidth: 220 }}>
                {Object.entries(GRAPH_GROUP_META).map(([k, m]) => (
                  <span key={k} className="flex items-center gap-1.5 text-[10px] text-ink-mid">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: m.color }} /> {m.label}
                  </span>
                ))}
                {revealed && (
                  <span className="flex items-center gap-1.5 text-[10px] text-amber-300">
                    <span
                      className="h-0.5 w-4 rounded-full"
                      style={{ backgroundImage: 'repeating-linear-gradient(90deg,#f59e0b 0 3px,transparent 3px 6px)' }}
                    />
                    predicted (conf)
                  </span>
                )}
              </div>
            )}
          </div>

          {/* status note */}
          <div className="absolute right-3 top-3 z-10 max-w-[200px]">
            {!revealed && !running && (
              <div className="card-3 animate-fade-in p-2.5 text-[11px]">
                <div className="flex items-center gap-1.5 font-semibold text-cyan-accent">
                  <Sparkles size={12} /> Run link prediction
                </div>
                <p className="mt-1 text-ink-mid">The graph shows confirmed entities. Run the GNN to surface latent links.</p>
              </div>
            )}
            {revealed && (
              <div className="card-3 animate-fade-in border-amber-500/40 p-2.5 text-[11px]">
                <div className="flex items-center gap-1.5 font-semibold text-amber-300">
                  <Crosshair size={12} /> Hidden Suspect
                </div>
                <p className="mt-1 text-ink-mid">Subject-C via peel-chain (0.71) + shared media hash.</p>
              </div>
            )}
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} className="dot-bg h-[560px] w-full">
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#334155" />
              </marker>
              <marker id="arrowPeel" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#f59e0b" />
              </marker>
            </defs>

            <g transform={`translate(${view.tx},${view.ty}) scale(${view.scale})`}>
              {/* edges */}
              {GRAPH.links.map((l, i) => {
                if (linkHidden(l)) return null;
                const a = pos[l.source];
                const b = pos[l.target];
                if (!a || !b) return null;
                const predicted = l.predicted && revealed;
                const peel = revealed && (l.peel || (peelSet.has(l.source) && peelSet.has(l.target)));
                const highlight = predicted || peel;
                const faded = edgeDim(l);
                const mx = (a.x + b.x) / 2;
                const my = (a.y + b.y) / 2;
                const dx = b.x - a.x;
                const dy = b.y - a.y;
                const nx = -dy;
                const ny = dx;
                const len = Math.sqrt(nx * nx + ny * ny) || 1;
                const curve = 18;
                const cx = mx + (nx / len) * curve;
                const cy = my + (ny / len) * curve;
                const key = `${l.source}-${l.target}`;
                return (
                  <g key={i} opacity={faded ? 0.12 : 1} className={predicted ? 'animate-fade-in' : ''}>
                    <path
                      d={`M${a.x},${a.y} Q${cx},${cy} ${b.x},${b.y}`}
                      fill="none"
                      stroke={highlight ? '#f59e0b' : '#22304d'}
                      strokeWidth={highlight ? 2.4 : 1.2}
                      strokeDasharray={l.peel || predicted ? '6 4' : '0'}
                      markerEnd={highlight ? 'url(#arrowPeel)' : 'url(#arrow)'}
                      opacity={highlight ? 0.95 : 0.6}
                      style={highlight ? { filter: 'drop-shadow(0 0 4px #f59e0b88)' } : undefined}
                      onMouseEnter={() => setHoverEdge(key)}
                      onMouseLeave={() => setHoverEdge(null)}
                    >
                      {(l.peel || predicted) && (
                        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
                      )}
                    </path>
                    {predicted && l.conf && (
                      <g className="animate-fade-in">
                        <rect x={cx - 16} y={cy - 8} width="32" height="13" rx="3" fill="#0A1426" stroke="#f59e0b" strokeWidth="0.7" />
                        <text x={cx} y={cy + 1.5} textAnchor="middle" className="fill-amber-300 font-bold" style={{ fontSize: 9 }}>
                          {l.conf.toFixed(2)}
                        </text>
                      </g>
                    )}
                    {hoverEdge === key && !predicted && (
                      <g>
                        <rect x={cx - 30} y={cy - 9} width="60" height="14" rx="3" fill="#16233c" stroke="#243a5e" />
                        <text x={cx} y={cy + 1} textAnchor="middle" className="fill-ink-mid" style={{ fontSize: 9 }}>
                          {l.label || l.type}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* nodes */}
              {nodes.map((n) => {
                if (nodeHidden(n)) return null;
                const meta = GRAPH_GROUP_META[n.group];
                const r = n.group === 'subject' || n.group === 'victim' ? 20 : 14;
                const onPeel = revealed && peelSet.has(n.id);
                const isSel = selected === n.id;
                const isNew = n.id === 'Subject-C' && revealed;
                const faded = dim(n.id);
                const Icon = iconFor(n);
                return (
                  <g
                    key={n.id}
                    transform={`translate(${n.x},${n.y})`}
                    className={`cursor-pointer ${isNew ? 'animate-fade-in' : ''}`}
                    opacity={faded ? 0.18 : 1}
                    onClick={() => setSelected(n.id)}
                  >
                    {(onPeel || isSel || isNew) && (
                      <circle
                        r={r + 6}
                        fill="none"
                        stroke={isNew || onPeel ? '#f59e0b' : '#fff'}
                        strokeWidth={isSel ? 2 : isNew ? 2.5 : 1.5}
                        opacity={isNew ? 0.85 : 0.6}
                        style={isSel ? { filter: 'drop-shadow(0 0 8px #22d3ee88)' } : undefined}
                      >
                        {(isNew || onPeel) && (
                          <animate attributeName="r" values={`${r + 4};${r + 10};${r + 4}`} dur={isNew ? '1.4s' : '2s'} repeatCount="indefinite" />
                        )}
                      </circle>
                    )}
                    <circle
                      r={r}
                      fill={meta.color}
                      fillOpacity={n.hidden ? 0.35 : 0.9}
                      stroke={n.hidden ? '#f59e0b' : isSel ? '#fff' : meta.color}
                      strokeWidth={n.hidden ? 2.5 : isSel ? 2 : 1}
                      strokeDasharray={n.hidden ? '4 3' : '0'}
                      style={{ filter: `drop-shadow(0 0 6px ${meta.color}66)` }}
                    />
                    <foreignObject x={-7} y={-7} width={14} height={14} style={{ pointerEvents: 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={12} color="#fff" strokeWidth={2.2} />
                      </div>
                    </foreignObject>
                    <text textAnchor="middle" dy={r + 12} className="fill-ink-mid font-medium" style={{ fontSize: 10 }}>
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* controls cluster (bottom-right, floating) */}
          <div className="card-3 absolute bottom-4 right-4 z-20 flex items-center gap-1 p-1">
            <button onClick={() => zoom(1.2)} className="rounded-md p-1.5 text-ink-mid hover:bg-surface-2 hover:text-cyan-accent" title="Zoom in">
              <ZoomIn size={15} />
            </button>
            <button onClick={() => zoom(0.83)} className="rounded-md p-1.5 text-ink-mid hover:bg-surface-2 hover:text-cyan-accent" title="Zoom out">
              <ZoomOut size={15} />
            </button>
            <button onClick={fit} className="rounded-md p-1.5 text-ink-mid hover:bg-surface-2 hover:text-cyan-accent" title="Fit">
              <Maximize2 size={15} />
            </button>
            <button onClick={restart} className="rounded-md p-1.5 text-ink-mid hover:bg-surface-2 hover:text-cyan-accent" title="Re-run physics">
              <RotateCw size={15} />
            </button>
          </div>
        </div>

        {/* detail rail — Artifact Inspector (entity mode) */}
        {sel ? (
          <ArtifactInspector
            item={entityInspector(sel)}
            onClose={() => setSelected(null)}
            onHop={onHop}
            onPivot={onPivot}
            extra={
              <div className="space-y-2.5">
                {sel.risk === 'critical' && <Badge color="#f43f5e">Critical</Badge>}
                {peelSet.has(sel.id) && revealed && (
                  <button
                    onClick={() => setFocusPath((v) => !v)}
                    className={`flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                      focusPath ? 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/40' : 'bg-surface-2 text-ink-mid hover:text-ink-hi'
                    }`}
                  >
                    <Target size={13} /> {focusPath ? 'Clear focus' : 'Focus path'}
                  </button>
                )}
                <div className="space-y-1.5">
                  <div className="text-[11px] uppercase tracking-label text-ink-low">Connections</div>
                  {GRAPH.links
                    .filter((l) => l.source === sel.id || l.target === sel.id)
                    .map((l, i) => {
                      const other = l.source === sel.id ? l.target : l.source;
                      const on = GRAPH.nodes.find((x) => x.id === other);
                      const OI = on ? iconFor(on) : Share2;
                      return (
                        <button
                          key={i}
                          onClick={() => setSelected(other)}
                          className="flex w-full items-center justify-between rounded-md bg-surface-2/60 px-2 py-1.5 text-xs transition-colors hover:bg-surface-3"
                        >
                          <span className="flex items-center gap-1.5 text-ink-hi">
                            <OI size={12} className="text-ink-low" /> {other}
                          </span>
                          <span className="mono text-ink-low">
                            {l.type}
                            {l.conf ? ` · ${l.conf.toFixed(2)}` : ''}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </div>
            }
          />
        ) : (
          <div className="card flex flex-col items-center justify-center p-4 text-center text-ink-low">
            <Share2 size={40} className="mb-3 text-navy-600" />
            <p className="text-sm">Click any node to inspect the entity and its correlations.</p>
            <p className="mt-2 text-xs text-cyan-accent">
              {revealed ? 'Open Subject-C, then Focus path.' : 'Run GNN Link Prediction to surface hidden entities.'}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
