import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Fingerprint,
  ScanEye,
  PersonStanding,
  ShieldAlert,
  ScanText,
  Boxes,
  Clock,
  Activity,
  Share2,
  Sparkles,
  Gauge,
  BadgeCheck,
  Cpu,
  X,
  Crosshair,
  ArrowRight,
  HeartPulse,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ENCLAVE, MODALITY, LANES, ENGINES, TRACE_STOPS } from '../../data/aicore';
import { CANON } from '../../data/canon';
import { Sparkline } from '../ui';
import SampleArtifact from './SampleArtifact';
import { dur } from '../../lib/speed';

const ICONS = {
  Fingerprint, ScanEye, PersonStanding, ShieldAlert, ScanText, Boxes,
  Clock, Activity, Share2, Sparkles, Gauge, BadgeCheck,
};

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function seedSpark() {
  return Array.from({ length: 14 }, () => 4 + Math.random() * 12);
}

function UtilRing({ pct, color, size = 34 }) {
  const r = size / 2 - 3;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="-rotate-90 shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#16233c" strokeWidth="3" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeDasharray={c}
        strokeDashoffset={c - (c * pct) / 100}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.4s ease' }}
      />
    </svg>
  );
}

function EngineCard({ engine, active, dim, counter, spark, util, stamp, onOpen, compact }) {
  const Icon = ICONS[engine.icon] || Cpu;
  const gold = engine.gold;
  const accent = engine.color;
  return (
    <button
      onClick={onOpen ? () => onOpen(engine) : undefined}
      className={`relative flex ${compact ? 'w-full items-center gap-2.5' : 'w-full flex-col'} rounded-lg border p-2.5 text-left transition-all ${
        active ? 'border-white/12 bg-surface-2/70' : 'border-white/6 bg-surface-1/50'
      } ${dim ? 'opacity-25' : 'opacity-100'} ${
        active && !dim ? (gold ? 'ai-gold-glow' : 'ai-active-glow') : ''
      } ${onOpen ? 'hover:border-cyan-accent/40' : ''}`}
      style={active && gold ? { borderColor: '#f5c45166' } : undefined}
    >
      {/* trace stamp popover */}
      {stamp && (
        <div className="ai-stamp absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-amber-400/50 bg-navy-950 px-2 py-1 text-[10px] font-semibold text-amber-300 shadow-elev-3">
          {stamp}
          <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-amber-400/50 bg-navy-950" />
        </div>
      )}
      <div className={`flex items-center gap-2 ${compact ? '' : 'w-full justify-between'}`}>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
          style={{ background: `${accent}1a`, boxShadow: active && !dim ? `0 0 10px ${accent}44` : 'none' }}
        >
          <Icon size={17} style={{ color: accent }} className={active && !dim ? 'animate-pulse-slow' : ''} />
        </span>
        {!compact && <UtilRing pct={util} color={accent} />}
        {compact && (
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-semibold text-ink-hi">
              <span className="mono mr-1 text-ink-low">{engine.id}</span>
              {engine.name}
            </div>
            <div className="mono truncate text-[10px] text-ink-low">{counter.toLocaleString()} /min</div>
          </div>
        )}
        {compact && active && (
          <span className="mono shrink-0 text-[10px] font-semibold" style={{ color: accent }}>
            ●
          </span>
        )}
      </div>

      {!compact && (
        <>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="mono text-[10px] font-bold" style={{ color: accent }}>{engine.id}</span>
            <span className="truncate text-xs font-semibold text-ink-hi">{engine.name}</span>
          </div>
          <div className="mt-1 truncate rounded bg-navy-950/50 px-1.5 py-0.5 text-[9px] text-ink-low" title={engine.spec}>
            {engine.spec}
          </div>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <div className="mono text-sm font-bold text-white">{counter.toLocaleString()}</div>
              <div className="text-[9px] text-ink-low">files/min</div>
            </div>
            <div className="opacity-70">
              <Sparkline data={spark} color={accent} width={54} height={18} />
            </div>
          </div>
        </>
      )}
    </button>
  );
}

function LaneParticles({ color, count = 4 }) {
  if (reduceMotion()) {
    return (
      <div
        className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: 0.5 }}
      />
    );
  }
  return (
    <>
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/5" />
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="ai-particle"
          style={{ background: color, boxShadow: `0 0 6px ${color}`, animationDelay: `${dur(i * 650)}ms` }}
        />
      ))}
    </>
  );
}

export default function Observatory({ compact = false, exiting = false, onComplete }) {
  const engById = useMemo(() => Object.fromEntries(ENGINES.map((e) => [e.id, e])), []);
  const byLane = useMemo(
    () => Object.fromEntries(LANES.map((l) => [l.id, ENGINES.filter((e) => e.lane === l.id)])),
    [],
  );

  const [frame, setFrame] = useState(0);
  const [sparks, setSparks] = useState(() => Object.fromEntries(ENGINES.map((e) => [e.id, seedSpark()])));
  const [drawer, setDrawer] = useState(null);

  // Compact (genesis pass): lanes light A→B→C→D, then verifier flash → onComplete.
  // When `exiting`, this instance is a frozen slide-out snapshot — start fully lit.
  const [laneProgress, setLaneProgress] = useState(compact ? (exiting ? 3 : -1) : 3);
  const [verifierFlash, setVerifierFlash] = useState(Boolean(exiting));

  // Trace-a-Specimen
  const [traceIdx, setTraceIdx] = useState(-1); // -1 idle, 0..n current, n = exhibit
  const traceEngineId = traceIdx >= 0 && traceIdx < TRACE_STOPS.length ? TRACE_STOPS[traceIdx].engine : null;
  const tracing = traceIdx >= 0;
  const traceDone = traceIdx >= TRACE_STOPS.length;
  const timers = useRef([]);

  // ambient tick — counters, sparklines, utilization
  useEffect(() => {
    const id = setInterval(() => {
      setFrame((f) => f + 1);
      setSparks((prev) => {
        const next = { ...prev };
        for (const e of ENGINES) next[e.id] = [...prev[e.id].slice(-13), 4 + Math.random() * 12];
        return next;
      });
    }, dur(760));
    return () => clearInterval(id);
  }, []);

  // compact sequence
  useEffect(() => {
    if (!compact || exiting) return; // frozen exit snapshot — don't restart choreography
    const push = (fn, ms) => timers.current.push(setTimeout(fn, dur(ms)));
    push(() => setLaneProgress(0), 300);
    push(() => setLaneProgress(1), 1900);
    push(() => setLaneProgress(2), 3500);
    push(() => setLaneProgress(3), 5100);
    push(() => setVerifierFlash(true), 6300);
    push(() => onComplete && onComplete(), 7000);
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compact, exiting]);

  // Clear any trace / choreography timers on unmount (covers full mode too).
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    },
    [],
  );

  const startTrace = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTraceIdx(0);
    for (let i = 1; i <= TRACE_STOPS.length; i++) {
      timers.current.push(setTimeout(() => setTraceIdx(i), dur(1500 * i)));
    }
  };
  const stopTrace = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTraceIdx(-1);
  };

  const counterFor = (e) => {
    const jitter = Math.round(Math.sin(frame / 3 + e.rate) * (e.rate * 0.06));
    return Math.max(0, Math.round(e.rate / 60) * 1 + Math.round(e.rate / 60) + jitter + (e.rate % 97));
  };
  const utilFor = (e, i) => Math.round(58 + Math.sin(frame / 2 + i) * 18 + (e.gold ? -8 : 0));

  const laneActive = (laneId) => {
    if (!compact) return true;
    const idx = LANES.findIndex((l) => l.id === laneId);
    return idx <= laneProgress;
  };
  const engineActive = (e, i) => {
    if (tracing) return false; // trace controls glow
    return laneActive(e.lane);
  };

  // ── COMPACT (genesis pass) ─────────────────────────────────────
  if (compact) {
    return (
      <div className={`transition-colors duration-500 ${verifierFlash ? 'rounded-xl bg-amber-400/5' : ''}`}>
        {/* enclave strip */}
        <EnclaveStrip />
        <div className="mt-3 grid grid-cols-1 gap-2.5 lg:grid-cols-4">
          {LANES.map((lane) => (
            <div
              key={lane.id}
              className={`rounded-xl border p-2.5 transition-all ${
                laneActive(lane.id) ? 'border-white/10 bg-surface-1/60' : 'border-white/5 bg-surface-1/30 opacity-50'
              }`}
            >
              <div className="mb-2 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: lane.color, boxShadow: `0 0 6px ${lane.color}` }} />
                <span className="text-[10px] font-bold uppercase tracking-label text-ink-mid">
                  {lane.id} · {lane.title}
                </span>
              </div>
              <div className="space-y-1.5">
                {byLane[lane.id].map((e, i) => (
                  <EngineCard
                    key={e.id}
                    engine={e}
                    compact
                    active={laneActive(lane.id)}
                    dim={false}
                    counter={laneActive(lane.id) ? counterFor(e) : 0}
                    spark={sparks[e.id]}
                    util={utilFor(e, i)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-ink-mid">
          {verifierFlash ? (
            <span className="ai-stamp flex items-center gap-1.5 font-semibold text-amber-300">
              <BadgeCheck size={15} /> Verifier sealed · {CANON.reportGrounded}/{CANON.reportTotal} grounded — advancing…
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Cpu size={13} className="animate-pulse-slow text-cyan-accent" /> Engine room pass — lanes A → B → C → D
            </span>
          )}
        </div>
      </div>
    );
  }

  // ── FULL (console page) ────────────────────────────────────────
  return (
    <div className="relative">
      <EnclaveStrip />

      {/* trace banner */}
      {tracing && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-amber-400/40 bg-amber-400/5 px-3 py-2">
          <div className="flex items-center gap-2 text-xs">
            <Crosshair size={14} className="text-amber-300" />
            <span className="font-semibold text-amber-300">Tracing specimen FILE-2291</span>
            {!traceDone && traceEngineId && (
              <span className="text-ink-mid">
                → <span className="mono text-ink-hi">{traceEngineId}</span> {TRACE_STOPS[traceIdx].detail}
              </span>
            )}
          </div>
          <button onClick={stopTrace} className="flex items-center gap-1 rounded px-2 py-0.5 text-[11px] text-ink-low hover:text-ink-hi">
            <X size={12} /> exit
          </button>
        </div>
      )}

      {/* observatory canvas */}
      <div className={`relative mt-3 transition-all ${tracing ? '' : ''}`}>
        {tracing && <div className="pointer-events-none absolute inset-0 z-0 rounded-xl bg-navy-950/60" />}
        <div className="relative z-10 flex gap-3">
          {/* Router node */}
          <div className="flex w-28 shrink-0 flex-col items-center justify-center rounded-xl border border-white/8 bg-surface-1/60 p-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-accent/25 to-indigo-500/25 ring-1 ring-cyan-accent/30">
              <Crosshair size={22} className="text-cyan-accent" />
            </span>
            <div className="mt-2 text-center text-[10px] font-bold uppercase tracking-label text-ink-mid">Router</div>
            <div className="mt-2 space-y-1">
              {Object.values(MODALITY).map((m) => (
                <div key={m.label} className="flex items-center gap-1.5 text-[9px] text-ink-low">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: m.color }} /> {m.label}
                </div>
              ))}
            </div>
          </div>

          {/* Lanes A/B/C */}
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {LANES.filter((l) => l.id !== 'D').map((lane) => (
              <div key={lane.id} className="rounded-xl border border-white/8 bg-surface-1/40 p-2.5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: lane.color, boxShadow: `0 0 6px ${lane.color}` }} />
                  <span className="text-[11px] font-bold uppercase tracking-label text-ink-mid">
                    Lane {lane.id} · {lane.title}
                  </span>
                </div>
                <div className="relative flex items-stretch gap-2">
                  <div className="pointer-events-none absolute inset-0">
                    <LaneParticles color={lane.color} />
                  </div>
                  {byLane[lane.id].map((e, i) => (
                    <div key={e.id} className="relative z-10 min-w-0 flex-1">
                      <EngineCard
                        engine={e}
                        active={engineActive(e, i)}
                        dim={tracing && traceEngineId !== e.id}
                        counter={counterFor(e)}
                        spark={sparks[e.id]}
                        util={utilFor(e, i)}
                        stamp={traceEngineId === e.id ? TRACE_STOPS[traceIdx].stamp : null}
                        onOpen={setDrawer}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lane D — FUSION converge */}
        <div className="relative z-10 mt-3 rounded-xl border border-emerald-500/20 bg-surface-1/40 p-2.5">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px #34d399' }} />
            <span className="text-[11px] font-bold uppercase tracking-label text-emerald-300">Lane D · FUSION — lanes converge</span>
          </div>
          <div className="relative flex items-stretch gap-2">
            <div className="pointer-events-none absolute inset-0">
              <LaneParticles color="#34d399" count={5} />
            </div>
            {byLane.D.map((e, i) => (
              <div key={e.id} className="relative z-10 min-w-0 flex-1">
                <EngineCard
                  engine={e}
                  active={engineActive(e, i)}
                  dim={tracing && traceEngineId !== e.id}
                  counter={counterFor(e)}
                  spark={sparks[e.id]}
                  util={utilFor(e, i)}
                  stamp={traceEngineId === e.id ? TRACE_STOPS[traceIdx].stamp : null}
                  onOpen={setDrawer}
                />
              </div>
            ))}
          </div>
        </div>

        {/* exhibit chip (trace end) */}
        {traceDone && (
          <div className="ai-stamp relative z-10 mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/5 px-3 py-2.5">
            <div className="flex items-center gap-2 text-sm">
              <BadgeCheck size={18} className="text-emerald-400" />
              <span className="font-semibold text-emerald-300">FILE-2291 sealed as court exhibit E-114</span>
              <span className="mono text-[11px] text-ink-mid">no-match → Cat-A 96.4% → age 9–12 p=0.94 → AI-GEN 98.2% → Subject-B → sealed ✓</span>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/report" className="flex items-center gap-1 rounded-md bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-500/25">
                view in report <ArrowRight size={12} />
              </Link>
              <button onClick={startTrace} className="rounded-md px-2 py-1 text-[11px] text-ink-low hover:text-ink-hi">
                replay
              </button>
              <button onClick={stopTrace} className="rounded-md px-2 py-1 text-[11px] text-ink-low hover:text-ink-hi">
                done
              </button>
            </div>
          </div>
        )}
      </div>

      {/* wellbeing meter + trace button */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/8 bg-surface-1/40 p-3">
        <div className="flex items-center gap-2.5">
          <HeartPulse size={20} className="ai-heart text-rose-400" />
          <div>
            <div className="text-sm font-semibold text-ink-hi">
              {CANON.disposedFiles.toLocaleString()} files auto-disposed
            </div>
            <div className="text-[11px] text-ink-low">never seen by a human eye · {CANON.disposedPct}% of the corpus</div>
          </div>
        </div>
        {!tracing && (
          <button
            onClick={startTrace}
            className="flex items-center gap-2 rounded-lg bg-amber-400/90 px-4 py-2 text-sm font-bold text-navy-950 shadow-glow-sm transition-all hover:bg-amber-300"
          >
            <Crosshair size={15} /> Trace a Specimen — Follow FILE-2291
          </button>
        )}
      </div>

      {/* engine drawer */}
      {drawer && <EngineDrawer engine={drawer} onClose={() => setDrawer(null)} />}
    </div>
  );
}

function EnclaveStrip() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-cyan-accent/15 bg-navy-950/60 px-3 py-1.5 text-[11px]">
      <span className="flex items-center gap-1.5 font-semibold text-cyan-accent">
        <ShieldCheck size={13} /> {ENCLAVE.mode}
      </span>
      <span className="text-navy-600">·</span>
      {ENCLAVE.gpus.map((g) => (
        <span key={g.id} className="flex items-center gap-1 text-ink-mid">
          <Cpu size={12} className="text-cyan-accent" /> {g.id} <span className="mono text-cyan-accent">{g.util}%</span>
        </span>
      ))}
      <span className="text-navy-600">·</span>
      <span className="flex items-center gap-1 text-ink-mid">
        Attestation <span className="text-emerald-400">✓</span> <span className="mono text-ink-low">{ENCLAVE.attestation}</span>
      </span>
      <span className="text-navy-600">·</span>
      <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
        <Radio /> {ENCLAVE.network}
      </span>
    </div>
  );
}

function Radio() {
  return <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />;
}

function EngineDrawer({ engine, onClose }) {
  const Icon = ICONS[engine.icon] || Cpu;
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm" />
      <div
        className="card-3 anim-in-right relative z-10 flex h-full w-full max-w-md flex-col overflow-y-auto p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `${engine.color}1a` }}>
              <Icon size={20} style={{ color: engine.color }} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="mono text-xs font-bold" style={{ color: engine.color }}>{engine.id}</span>
                <span className="text-base font-bold text-white">{engine.name}</span>
              </div>
              <div className="text-[11px] text-ink-low">{engine.spec}</div>
            </div>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-low hover:bg-surface-2 hover:text-ink-hi">
            <X size={16} />
          </button>
        </div>

        {/* plain words */}
        <p className="mt-4 rounded-lg border border-white/8 bg-surface-2/50 p-3 text-sm leading-relaxed text-ink-mid">
          {engine.plain}
        </p>

        {/* spec table */}
        <div className="mt-4">
          <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-label text-ink-low">Specification</div>
          <div className="overflow-hidden rounded-lg border border-white/8">
            {engine.specTable.map(([k, v], i) => (
              <div key={k} className={`flex items-center justify-between px-3 py-1.5 text-xs ${i % 2 ? 'bg-navy-950/30' : ''}`}>
                <span className="text-ink-low">{k}</span>
                <span className="mono text-right text-ink-hi">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* sample artifact */}
        <div className="mt-4">
          <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-label text-ink-low">Sample artifact</div>
          <SampleArtifact kind={engine.artifact} />
        </div>

        {/* quality chips */}
        <div className="mt-4">
          <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-label text-ink-low">Quality</div>
          <div className="flex flex-wrap gap-2">
            {engine.chips.map((c) => (
              <span key={c.k} className="rounded-md border border-white/8 bg-surface-2/60 px-2.5 py-1 text-[11px]">
                <span className="text-ink-low">{c.k} </span>
                <span className="mono font-semibold" style={{ color: engine.color }}>{c.v}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
