import { useEffect, useRef, useState } from 'react';
import { Scan, Fingerprint, Cube, FileMagnifyingGlass, Cpu } from '@phosphor-icons/react';
import { Check } from 'lucide-react';
import { PIPELINE_NODES, PROCESS_LOG } from '../../data/mockData';
import { CANON } from '../../data/canon';
import { dur } from '../../lib/speed';
import { Sparkline } from '../../components/ui';

const PH_ICONS = { Scan, Fingerprint, Cube, FileMagnifyingGlass, Cpu };
const TOTAL_BASE = 8000;
const TARGET = CANON.filesTotal;

export default function Process({ onNext, exiting = false }) {
  const initialTotal = dur(TOTAL_BASE);
  const [elapsed, setElapsed] = useState(exiting ? initialTotal : 0);
  const [total, setTotal] = useState(initialTotal);
  const [logIdx, setLogIdx] = useState(0);
  const [spark, setSpark] = useState([4, 6, 5, 8]);
  const [flash, setFlash] = useState(false);
  const advanced = useRef(false);
  const nextTimer = useRef(0);
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (exiting) return undefined; // frozen exit snapshot — don't restart choreography
    const T = dur(TOTAL_BASE); // speed-aware run length
    setTotal(T);
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const e = Math.min(T, now - start);
      setElapsed(e);
      if (e < T) raf = requestAnimationFrame(tick);
      else if (!advanced.current) {
        advanced.current = true;
        setFlash(true);
        nextTimer.current = setTimeout(onNext, dur(600));
      }
    };
    raf = requestAnimationFrame(tick);
    const logT = setInterval(() => setLogIdx((i) => i + 1), dur(700));
    const sparkT = setInterval(() => setSpark((s) => [...s.slice(-11), 4 + Math.random() * 12]), dur(500));
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(logT);
      clearInterval(sparkT);
      clearTimeout(nextTimer.current);
    };
  }, [onNext, exiting]);

  const progress = elapsed / total;
  const eased = 1 - Math.pow(1 - progress, 2);
  const counter = Math.round(TARGET * eased);
  const etaSec = Math.max(0, Math.ceil((total - elapsed) / 1000));

  const nodeState = (i) => {
    const start = i * total * 0.175;
    const done = start + total * 0.206;
    if (elapsed >= done) return 'done';
    if (elapsed >= start) return 'active';
    return 'idle';
  };

  const gpu = (base) => Math.round(base + Math.sin(elapsed / 200 + base) * 8);

  return (
    <div className={`transition-colors duration-500 ${flash ? 'rounded-xl bg-emerald-500/5' : ''}`}>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">Processing evidence</h2>
        <p className="text-sm text-ink-mid">Carving, hashing, VICS normalization, metadata extraction, and AI queueing — running on the local enclave.</p>
      </div>

      {/* pipeline */}
      <div className="card p-5">
        <div className="relative flex items-center justify-between">
          {/* conduit */}
          <div className="absolute left-[7%] right-[7%] top-7 h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-accent to-indigo-400 transition-all duration-200"
              style={{ width: `${eased * 100}%` }}
            />
            {!reduce &&
              elapsed < total &&
              Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-cyan-accent"
                  style={{ left: `${((elapsed / 60 + i * 60) % 360) / 3.6}%`, opacity: 0.8 }}
                />
              ))}
          </div>

          {PIPELINE_NODES.map((n, i) => {
            const Icon = PH_ICONS[n.icon];
            const st = nodeState(i);
            const rate = st === 'active' ? (58000 + Math.round(Math.sin(elapsed / 120 + i) * 12000)).toLocaleString() : st === 'done' ? '—' : '0';
            return (
              <div key={n.id} className="relative z-10 flex flex-1 flex-col items-center">
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full transition-all ${
                    st === 'done'
                      ? 'bg-emerald-500/15 ring-2 ring-emerald-500/50'
                      : st === 'active'
                        ? 'bg-cyan-accent/15 ring-2 ring-cyan-accent'
                        : 'bg-surface-2 ring-1 ring-white/8'
                  }`}
                  style={st === 'active' ? { boxShadow: '0 0 18px #22d3ee66' } : undefined}
                >
                  {st === 'done' ? (
                    <Check size={22} className="text-emerald-400" />
                  ) : (
                    <Icon size={24} weight="duotone" color={st === 'active' ? '#22d3ee' : '#64748b'} className={st === 'active' ? 'animate-pulse-slow' : ''} />
                  )}
                </span>
                <div className="mt-2 text-center text-xs font-semibold text-ink-hi">{n.name}</div>
                <div className="mono text-[10px] text-ink-low">
                  {st === 'active' ? `${rate} ${n.unit}` : st === 'done' ? 'complete' : 'queued'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* progress + telemetry */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card p-4 lg:col-span-2">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-label text-ink-low">Artifacts processed</div>
              <div className="mono text-3xl font-bold text-white">{counter.toLocaleString()}</div>
            </div>
            <div className="text-right text-xs text-ink-mid">
              <div className="mono">ETA {etaSec}s</div>
              <div className="mono text-cyan-accent">{Math.round(eased * 100)}%</div>
            </div>
          </div>
          <div className="relative mt-3 h-2.5 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-accent transition-all duration-200" style={{ width: `${eased * 100}%` }} />
            <div className="absolute top-0 h-full w-8 bg-white/40 blur-md" style={{ left: `calc(${eased * 100}% - 32px)`, opacity: elapsed < total ? 1 : 0 }} />
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div className="opacity-80">
              <Sparkline data={spark} color="#22d3ee" width={160} height={28} />
            </div>
            <div className="flex gap-2">
              {['gpu-01', 'gpu-02'].map((g, i) => {
                const pct = gpu(i === 0 ? 82 : 64);
                return (
                  <span key={g} className="flex items-center gap-1.5 rounded-md bg-surface-2/70 px-2 py-1 text-[10px] text-ink-mid">
                    <Cpu size={12} weight="duotone" color="#22d3ee" /> {g} <span className="mono text-cyan-accent">{pct}%</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* micro-log */}
        <div className="card overflow-hidden p-4">
          <div className="mb-2 text-[11px] uppercase tracking-label text-ink-low">Ingest log</div>
          <div className="space-y-1.5">
            {[0, 1, 2].map((r) => {
              const line = PROCESS_LOG[(logIdx + r) % PROCESS_LOG.length];
              return (
                <div key={r} className="mono flex items-center gap-2 text-[11px] text-ink-mid" style={{ opacity: 1 - r * 0.28 }}>
                  <span className="text-emerald-400">›</span> {line}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
