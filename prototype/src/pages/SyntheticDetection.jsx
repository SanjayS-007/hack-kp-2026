import { useState, useEffect, useRef, useCallback } from 'react';
import { ShieldAlert, Layers, ScanFace, Combine, Aperture, AudioLines, CheckCircle2, RefreshCw, Loader2, FileWarning, Fingerprint } from 'lucide-react';
import { SYNTHETIC_FILES, PROVENANCE, MODEL_FINGERPRINT } from '../data/mockData';
import { PageHeader, useDocumentTitle } from '../components/ui';

const STREAM_ICONS = { 'Global Texture': Layers, 'Facial Geometry': ScanFace, 'Semantic Fusion': Combine };
const STAGES = ['Global Texture', 'Facial Geometry', 'Semantic Fusion', 'A/V Sync'];

function StreamCard({ stream, shown, active, done }) {
  const Icon = STREAM_ICONS[stream.name] || Layers;
  const color = stream.score >= 96 ? '#ef4444' : stream.score >= 90 ? '#f59e0b' : '#22d3ee';
  return (
    <div className={`card p-4 transition-all ${active ? 'ring-1 ring-cyan-accent shadow-glow-sm' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${color}22` }}>
            {active ? <Loader2 size={16} className="animate-spin text-cyan-accent" /> : <Icon size={16} style={{ color }} />}
          </span>
          <div>
            <div className="text-sm font-semibold text-white">{stream.name}</div>
            <div className="mono text-[10px] text-slate-500">{stream.model}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold" style={{ color }}>
            {shown.toFixed(1)}%
          </div>
          <div className="text-[10px] uppercase text-slate-500">{active ? 'analyzing…' : 'synthetic'}</div>
        </div>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy-800">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${shown}%`, background: color, boxShadow: `0 0 8px ${color}88` }}
        />
      </div>
      <p className={`mt-2 text-xs transition-opacity ${done ? 'text-slate-400 opacity-100' : 'text-slate-600 opacity-60'}`}>
        {stream.note}
      </p>
    </div>
  );
}

function DefocusMap({ lit }) {
  return (
    <div className={`card p-4 transition-all ${lit ? '' : 'opacity-50'}`}>
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
        <Aperture size={16} className="text-cyan-accent" /> Defocus-Blur Optics Map
      </div>
      <div className="relative h-40 overflow-hidden rounded-lg">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 40% 45%, #22d3ee 0%, #6366f1 30%, #ef4444 55%, #0A1426 85%)',
            filter: 'blur(2px)',
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 flex items-end justify-between p-2">
          <span className="badge bg-navy-950/80 text-red-300">Physically implausible bokeh</span>
          <span className="mono text-[10px] text-slate-300">σ-gradient anomaly: 0.83</span>
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-400">
        Real optics produce a smooth depth-dependent blur gradient. This file's blur field is discontinuous — a
        hallmark of generative synthesis.
      </p>
    </div>
  );
}

function AvSyncMatrix({ lit }) {
  const grid = Array.from({ length: 6 }).map((_, r) =>
    Array.from({ length: 12 }).map((_, c) => (r + c) % 4 === 0 || (c > 7 && r % 2 === 0)),
  );
  return (
    <div className={`card p-4 transition-all ${lit ? '' : 'opacity-50'}`}>
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
        <AudioLines size={16} className="text-cyan-accent" /> A/V Sync Matrix
      </div>
      <div className="flex flex-col gap-1">
        {grid.map((row, r) => (
          <div key={r} className="flex gap-1">
            {row.map((desync, c) => (
              <div
                key={c}
                className="h-4 flex-1 rounded-sm transition-all duration-500"
                style={{
                  background: desync ? '#ef4444' : '#10b981',
                  opacity: lit ? (desync ? 0.85 : 0.35) : 0.12,
                  boxShadow: desync && lit ? '0 0 6px #ef444488' : 'none',
                  transitionDelay: `${(r * 12 + c) * 8}ms`,
                }}
                title={desync ? 'lip-audio desync' : 'in sync'}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-slate-400">
          <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500/60" /> in sync
          <span className="ml-2 h-2.5 w-2.5 rounded-sm bg-red-500" /> desync
        </span>
        <span className="mono text-red-300">28% frames desynced</span>
      </div>
    </div>
  );
}

export default function SyntheticDetection() {
  useDocumentTitle('Synthetic Detection');
  const [activeId, setActiveId] = useState(SYNTHETIC_FILES[0].id);
  const file = SYNTHETIC_FILES.find((f) => f.id === activeId);

  const [stage, setStage] = useState(0); // 0 idle, 1-4 pipeline, 5 done
  const [scores, setScores] = useState([0, 0, 0]);
  const [verdict, setVerdict] = useState(0);
  const timers = useRef([]);
  const raf = useRef(0);

  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    cancelAnimationFrame(raf.current);
  };

  const countUp = useCallback((target) => {
    const start = performance.now();
    const dur = 800;
    const step = (now) => {
      const p = Math.min(1, (now - start) / dur);
      setVerdict(+(target * (1 - Math.pow(1 - p, 3))).toFixed(1));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  const run = useCallback(() => {
    clearAll();
    setScores([0, 0, 0]);
    setVerdict(0);
    const push = (fn, ms) => timers.current.push(setTimeout(fn, ms));
    push(() => setStage(1), 250);
    push(() => setScores((s) => [file.streams[0].score, s[1], s[2]]), 350);
    push(() => setStage(2), 950);
    push(() => setScores((s) => [s[0], file.streams[1].score, s[2]]), 1050);
    push(() => setStage(3), 1650);
    push(() => setScores((s) => [s[0], s[1], file.streams[2].score]), 1750);
    push(() => setStage(4), 2350);
    push(() => {
      setStage(5);
      countUp(file.score);
    }, 3050);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, countUp]);

  useEffect(() => {
    run();
    return clearAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  const analyzing = stage >= 1 && stage < 5;
  const avLit = stage >= 4;
  const ringPct = stage >= 5 ? file.score : verdict;

  return (
    <>
      <PageHeader
        eyebrow="MODULE 07 · DEEPFAKE SHIELD"
        title="DeepFake Shield — Synthetic Detection"
        subtitle="3-stream ensemble · DINOv2 + facial geometry + frozen-CLIP · defocus optics · A/V sync"
        accent="#e879f9"
        actions={
          <button
            onClick={run}
            disabled={analyzing}
            data-demo="synthetic-reanalyze"
            className="flex items-center gap-2 rounded-lg bg-cyan-accent px-4 py-2 text-sm font-semibold text-navy-950 transition-all hover:shadow-glow disabled:opacity-60"
          >
            <RefreshCw size={15} className={analyzing ? 'animate-spin' : ''} /> {analyzing ? 'Analyzing…' : 'Re-analyze'}
          </button>
        }
      />

      {/* pipeline stepper */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {STAGES.map((s, i) => {
          const idx = i + 1;
          const state = stage > idx || stage === 5 ? 'done' : stage === idx ? 'active' : 'pending';
          return (
            <div key={s} className="flex items-center gap-2">
              <span
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  state === 'done'
                    ? 'bg-emerald-500/15 text-emerald-300'
                    : state === 'active'
                      ? 'bg-cyan-accent/15 text-cyan-accent ring-1 ring-cyan-accent/40'
                      : 'bg-surface-2 text-ink-low'
                }`}
              >
                {state === 'active' && <Loader2 size={12} className="animate-spin" />}
                {state === 'done' && <CheckCircle2 size={12} />}
                {s}
              </span>
              {i < STAGES.length - 1 && <span className="text-navy-600">→</span>}
            </div>
          );
        })}
      </div>

      {/* file selector — segmented control with per-file verdict chip */}
      <div className="mb-4 inline-flex rounded-lg bg-surface-2 p-1">
        {SYNTHETIC_FILES.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveId(f.id)}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition-all ${
              activeId === f.id ? 'bg-surface-3 text-fuchsia-200 shadow-elev-2' : 'text-ink-mid hover:text-ink-hi'
            }`}
          >
            <span className="mono">{f.id}</span>
            <span className="rounded bg-fuchsia-500/15 px-1.5 py-0.5 text-[10px] text-fuchsia-300">{f.score}%</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* verdict hero */}
        <div className="card relative overflow-hidden p-5 lg:col-span-1">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-red-500/10" />
          <div className="relative">
            <div className="text-[11px] uppercase tracking-wider text-slate-500">Final Verdict</div>
            <div className="mt-1 flex items-center gap-2">
              <ShieldAlert className="text-fuchsia-400" size={22} />
              <span className="text-2xl font-extrabold text-fuchsia-300">
                {stage >= 5 ? file.verdict : 'ANALYZING…'}
              </span>
            </div>
            <div className="mono mt-1 text-sm text-slate-400">{file.id}</div>

            <div className="my-5 flex justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center">
                {analyzing && (
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 0deg, rgba(232,121,249,0.5) 40deg, transparent 80deg)',
                      animation: 'marquee-spin 1.1s linear infinite',
                      WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 12px), #000 calc(100% - 11px))',
                      mask: 'radial-gradient(farthest-side, transparent calc(100% - 12px), #000 calc(100% - 11px))',
                    }}
                  />
                )}
                <svg className="absolute -rotate-90" width="160" height="160">
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#1a2c4a" strokeWidth="10" />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#e879f9"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 70}
                    strokeDashoffset={2 * Math.PI * 70 * (1 - ringPct / 100)}
                    style={{ transition: 'stroke-dashoffset 0.3s linear', filter: 'drop-shadow(0 0 8px #e879f988)' }}
                  />
                </svg>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-white">{ringPct.toFixed(1)}%</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-500">confidence</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 rounded-lg bg-navy-800/60 py-2 text-xs text-slate-300">
              {stage >= 5 ? (
                <>
                  <CheckCircle2 size={14} className="text-emerald-400" /> Ensemble agreement across all 3 streams
                </>
              ) : (
                <>
                  <Loader2 size={14} className="animate-spin text-cyan-accent" /> Fusing stream verdicts…
                </>
              )}
            </div>
          </div>
        </div>

        {/* streams */}
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {file.streams.map((s, i) => (
              <StreamCard
                key={s.name}
                stream={s}
                shown={scores[i]}
                active={stage === i + 1}
                done={stage > i + 1 || stage === 5}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DefocusMap lit={avLit} />
            <AvSyncMatrix lit={avLit} />
          </div>
        </div>
      </div>

      {/* Provenance + Model Fingerprint row (Synthetic Shield v2 beats) */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="card p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <FileWarning size={16} className="text-fuchsia-400" /> Provenance Verdict
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between rounded-lg bg-surface-2/60 px-3 py-2">
              <div>
                <div className="text-xs font-semibold text-ink-hi">C2PA Manifest</div>
                <div className="text-[11px] text-ink-low">{PROVENANCE.c2paNote}</div>
              </div>
              <span className="badge bg-risk-a/15 text-rose-300 ring-1 ring-rose-500/30">{PROVENANCE.c2pa}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface-2/60 px-3 py-2">
              <div>
                <div className="text-xs font-semibold text-ink-hi">SynthID Watermark</div>
                <div className="text-[11px] text-ink-low">{PROVENANCE.synthidNote}</div>
              </div>
              <span className="badge bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30">{PROVENANCE.synthid}</span>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <Fingerprint size={16} className="text-fuchsia-400" /> Model Fingerprint
          </div>
          <div className="rounded-lg bg-surface-2/60 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-ink-mid">Nearest generator family</span>
              <span className="mono text-sm font-bold text-fuchsia-200">{MODEL_FINGERPRINT.family}</span>
            </div>
            <div className="mt-3 mb-1 flex items-center justify-between text-[11px]">
              <span className="text-ink-low">latent fingerprint cosine similarity</span>
              <span className="mono font-bold text-fuchsia-300">{MODEL_FINGERPRINT.cosine.toFixed(2)}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-navy-700">
              <div
                className="h-full rounded-full"
                style={{ width: `${MODEL_FINGERPRINT.cosine * 100}%`, background: '#e879f9', boxShadow: '0 0 8px #e879f988' }}
              />
            </div>
            <p className="mt-2 text-[11px] text-ink-low">{MODEL_FINGERPRINT.note}</p>
          </div>
        </div>
      </div>
    </>
  );
}
