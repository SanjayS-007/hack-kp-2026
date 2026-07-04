// Shared Ask-AEGIS conversation engine — the SINGLE source of the RAG chat theater.
// Used by the /ask page AND the 3D Vault "Ask-the-Vault" drawer (zero forked logic).
// The constellation retrieval choreography is a wrapper that reacts to onAsk(index).
import { useState, useEffect, useRef } from 'react';
import {
  Send,
  FileText,
  Sparkles,
  User,
  ChevronDown,
  Cpu,
  Database,
  Search,
  Eye,
  Feather,
  BadgeCheck,
  CircleAlert,
  MapPin,
  Share2,
  FileCheck2,
  ArrowRight,
} from 'lucide-react';
import { AEGIS_QA } from '../../data/mockData';
import { dur } from '../../lib/speed';

export const STEP_ICONS = {
  Plan: Cpu,
  'Graph query': Database,
  'Vector search': Search,
  'Vision cross-check': Eye,
  Synthesize: Feather,
  'HERAM validation': BadgeCheck,
};
export const PIPELINE = ['Plan', 'Graph query', 'Vector search', 'Vision cross-check', 'Synthesize', 'HERAM validation'];
export const ARTIFACTS = [
  { label: 'dossier', icon: FileText },
  { label: 'cited answer', icon: MapPin },
  { label: 'graph path', icon: Share2 },
  { label: 'certificate', icon: FileCheck2 },
];

function EcsBadge({ score }) {
  const color = score >= 0.9 ? '#34d399' : score >= 0.85 ? '#22d3ee' : '#f59e0b';
  const c = 2 * Math.PI * 6;
  return (
    <span
      className="badge animate-fade-in"
      style={{ background: `${color}1a`, color, boxShadow: `0 0 8px ${color}33` }}
      title="Evidence Confidence Score (HERAM hallucination-checked)"
    >
      <svg width="14" height="14" className="-rotate-90">
        <circle cx="7" cy="7" r="6" fill="none" stroke={`${color}33`} strokeWidth="1.5" />
        <circle
          cx="7"
          cy="7"
          r="6"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - c * score}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      ECS {score.toFixed(2)} · admissible
    </span>
  );
}

function StructuredAnswer({ text, sources }) {
  const idx = text.indexOf('. ');
  const head = idx > 0 ? text.slice(0, idx + 1) : text;
  const rest = idx > 0 ? text.slice(idx + 1) : '';
  return (
    <p className="whitespace-pre-line text-sm leading-relaxed">
      <span className="font-semibold text-white">{head}</span>
      <span className="text-ink-mid">{rest}</span>
      {sources.map((_, i) => (
        <sup key={i} className="mono ml-0.5 rounded bg-cyan-accent/15 px-1 text-[9px] text-cyan-accent">
          {i + 1}
        </sup>
      ))}
    </p>
  );
}

function MiniGraphPath() {
  const nodes = [
    { l: 'Subject-A', c: '#f43f5e' },
    { l: 'Wallet-1', c: '#f59e0b' },
    { l: 'Mixer', c: '#f59e0b' },
    { l: 'Subject-C', c: '#f43f5e', hot: true },
  ];
  return (
    <div className="mt-3 flex flex-wrap items-center gap-1.5 rounded-lg border border-amber-500/25 bg-amber-500/5 p-2.5 animate-fade-in">
      <span className="mr-1 text-[10px] font-semibold uppercase tracking-label text-amber-300">GraphRAG path</span>
      {nodes.map((n, i) => (
        <span key={n.l} className="flex items-center gap-1.5">
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${n.hot ? 'ring-1' : ''}`}
            style={{ background: `${n.c}1f`, color: n.c, boxShadow: n.hot ? `0 0 8px ${n.c}66` : 'none' }}
          >
            {n.l}
          </span>
          {i < nodes.length - 1 && <ArrowRight size={12} className="text-amber-400/70" />}
        </span>
      ))}
      <span className="mono ml-1 text-[10px] text-ink-low">de-mix 0.71</span>
    </div>
  );
}

function AgentTrace({ steps, visible, open, onToggle }) {
  const totalMs = steps.slice(0, visible).reduce((s, x) => s + x.ms, 0);
  return (
    <div className="mb-2 rounded-lg border border-white/5 bg-navy-950/50">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-3 py-2 text-[11px] font-semibold uppercase tracking-label text-ink-mid"
      >
        <span className="flex items-center gap-1.5">
          <Sparkles size={12} className="text-cyan-accent" /> Agent trace
          <span className="mono ml-1 text-ink-low">
            {visible}/{steps.length} · {totalMs} ms
          </span>
        </span>
        <ChevronDown size={14} className={`transition-transform ${open ? '' : '-rotate-90'}`} />
      </button>
      {open && (
        <div className="relative px-3 pb-3">
          <div className="absolute bottom-4 left-[26px] top-1 w-px bg-white/8" />
          <div className="space-y-1.5">
            {steps.slice(0, visible).map((s, i) => {
              const Icon = STEP_ICONS[s.label] || Cpu;
              return (
                <div key={i} className="animate-fade-in">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="relative z-10 flex h-5 w-5 items-center justify-center rounded bg-cyan-accent/10 ring-1 ring-navy-900">
                      <Icon size={12} className="text-cyan-accent" />
                    </span>
                    <span className="font-medium text-ink-hi">{s.label}</span>
                    <span className="flex-1 truncate text-ink-low">{s.detail}</span>
                    <span className="mono shrink-0 text-emerald-400">{s.ms} ms</span>
                  </div>
                  {s.cypher && (
                    <pre className="mono mt-1 ml-7 overflow-x-auto rounded-md border border-navy-700 bg-navy-950 px-2 py-1.5 text-[10px] leading-relaxed text-cyan-300">
                      {s.cypher}
                    </pre>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Typewriter({ text, onDone }) {
  const [shown, setShown] = useState('');
  useEffect(() => {
    setShown('');
    let i = 0;
    const id = setInterval(() => {
      i += 3;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        onDone && onDone();
      }
    }, dur(12));
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  return (
    <span className="whitespace-pre-line">
      {shown}
      {shown.length < text.length && <span className="animate-blink text-cyan-accent">▋</span>}
    </span>
  );
}

export function AnswerBlock({ item, artifactIdx, onComplete, onProgress }) {
  const [phase, setPhase] = useState('planning');
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [traceOpen, setTraceOpen] = useState(true);
  const [answerDone, setAnswerDone] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    const push = (fn, ms) => timers.current.push(setTimeout(fn, dur(ms)));
    push(() => setPhase('tracing'), 700);
    let t = 700;
    item.steps.forEach((s, i) => {
      t += Math.max(300, Math.min(800, s.ms));
      push(() => setVisibleSteps(i + 1), t);
    });
    push(() => setPhase('answering'), t + 350);
    const local = timers.current;
    return () => local.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onProgress && onProgress({ phase, visible: visibleSteps });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, visibleSteps]);

  useEffect(() => {
    if (answerDone) {
      setPhase('done');
      setTraceOpen(false);
      onComplete && onComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerDone]);

  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-accent to-indigo-500">
        <Sparkles size={16} className="text-navy-950" />
      </div>
      <div className="min-w-0 flex-1 border-l-2 border-cyan-accent/40 pl-3">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-cyan-accent">AEGIS-X</span>
          {phase === 'planning' && (
            <span className="flex items-center gap-1.5 text-[11px] text-ink-mid">
              <Cpu size={12} className="animate-spin text-cyan-accent" />
              <span className="animate-pulse-slow">Planning…</span>
            </span>
          )}
          {phase === 'done' && <EcsBadge score={item.ecs} />}
        </div>

        {phase === 'planning' && (
          <div className="card space-y-2 p-3">
            <div className="h-3 w-3/4 animate-pulse-slow rounded bg-navy-700" />
            <div className="h-3 w-full animate-pulse-slow rounded bg-navy-700" />
            <div className="h-3 w-2/3 animate-pulse-slow rounded bg-navy-700" />
          </div>
        )}

        {phase !== 'planning' && (
          <AgentTrace steps={item.steps} visible={visibleSteps} open={traceOpen} onToggle={() => setTraceOpen((v) => !v)} />
        )}

        {phase === 'answering' && (
          <div className="text-sm leading-relaxed text-ink-mid">
            <Typewriter text={item.a} onDone={() => setAnswerDone(true)} />
          </div>
        )}

        {phase === 'done' && (
          <>
            <StructuredAnswer text={item.a} sources={item.sources} />
            {item.reveal === 'graph' && <MiniGraphPath />}
          </>
        )}

        {phase === 'done' && item.ecsNote && (
          <div className="mt-2 flex animate-fade-in items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-xs text-amber-200">
            <CircleAlert size={14} className="mt-0.5 shrink-0 text-amber-400" />
            <span>{item.ecsNote}</span>
          </div>
        )}

        {phase === 'done' && (
          <div className="mt-2 animate-fade-in">
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-label text-ink-low">
              <FileText size={12} /> Sources ({item.sources.length})
              {artifactIdx != null && (
                <span className="mono ml-1 rounded bg-cyan-accent/10 px-1.5 text-cyan-accent">
                  → {ARTIFACTS[artifactIdx].label}
                </span>
              )}
            </div>
            <div className="space-y-1.5">
              {item.sources.map((s, i) => (
                <div
                  key={s.id}
                  data-ask-citation
                  className="flex animate-fade-in items-start gap-2 rounded-lg border border-white/5 bg-surface-2/50 px-3 py-2 text-xs transition-colors hover:border-cyan-accent/40"
                  style={{ animationDelay: `${i * 120}ms`, animationFillMode: 'backwards' }}
                >
                  <span className="mono shrink-0 rounded bg-cyan-accent/10 px-1 text-[9px] text-cyan-accent">{i + 1}</span>
                  <span className="mono shrink-0 rounded bg-navy-800 px-1.5 py-0.5 text-cyan-accent">{s.id}</span>
                  <span className="flex-1 text-ink-mid">{s.excerpt}</span>
                  <span className="mono shrink-0 text-ink-low">{s.ts}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function LiveStepper({ progress }) {
  const activeIdx = progress ? (progress.phase === 'done' ? PIPELINE.length : progress.visible) : -1;
  return (
    <div className="card p-4">
      <div className="text-[11px] font-semibold uppercase tracking-label text-ink-low">Agent pipeline</div>
      <ul className="mt-2 space-y-1.5">
        {PIPELINE.map((label, i) => {
          const Icon = STEP_ICONS[label];
          const state = activeIdx > i ? 'done' : activeIdx === i && progress?.phase !== 'done' ? 'active' : 'idle';
          return (
            <li
              key={label}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-all ${
                state === 'active'
                  ? 'bg-cyan-accent/10 text-cyan-accent'
                  : state === 'done'
                    ? 'text-emerald-300'
                    : 'text-ink-low'
              }`}
            >
              <Icon size={13} className={state === 'active' ? 'animate-pulse-slow' : ''} />
              {label}
              {state === 'done' && <BadgeCheck size={12} className="ml-auto text-emerald-400" />}
              {state === 'active' && <Cpu size={12} className="ml-auto animate-spin" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// The shared conversation column: empty-state chip grid → history → suggested-chip input row.
// variant: 'page' (tall) | 'drawer' (fills its container). onAsk(i) fires when a query starts.
export function AskConversation({ variant = 'page', onAsk, onAnswered, onProgress, emptyHint }) {
  const [history, setHistory] = useState([]);
  const [pending, setPending] = useState(false);
  const [progress, setProgress] = useState(null);
  const scrollRef = useRef(null);
  const asked = history.length;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history, pending]);

  const emitProgress = (p) => {
    setProgress(p);
    onProgress && onProgress(p);
  };

  const ask = (qa, idx) => {
    if (pending) return;
    setPending(true);
    emitProgress({ phase: 'planning', visible: 0 });
    setHistory((h) => [...h, { qa, idx }]);
    onAsk && onAsk(idx, qa);
  };

  const remaining = AEGIS_QA.map((qa, i) => ({ qa, i })).filter(({ i }) => i >= asked);

  return (
    <div className={`flex min-h-0 flex-col ${variant === 'page' ? 'h-[640px]' : 'h-full'}`}>
      <div ref={scrollRef} className="flex-1 space-y-6 overflow-y-auto p-4">
        {history.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center px-4 text-center">
            <div className="relative mb-4 flex h-14 w-14 items-center justify-center">
              <span className="absolute inset-0 animate-pulse-slow rounded-full bg-cyan-accent/20 blur-xl" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-accent/25 to-indigo-500/25 ring-1 ring-cyan-accent/30">
                <Sparkles className="text-cyan-accent" size={26} />
              </div>
            </div>
            <div className="text-sm font-semibold text-white">Ask the vault</div>
            <p className="mt-1 max-w-md text-xs text-ink-mid">
              {emptyHint ||
                'Every answer is planned, graph- and vector-retrieved, vision-checked, and citation-grounded with an ECS score.'}
            </p>
            <div className={`mt-4 grid w-full gap-2 ${variant === 'page' ? 'max-w-2xl grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
              {AEGIS_QA.map((qa, i) => {
                const A = ARTIFACTS[i];
                const Icon = A.icon;
                return (
                  <button
                    key={qa.q}
                    onClick={() => ask(qa, i)}
                    data-demo={i === 0 ? 'ask-chip' : undefined}
                    className="card-hover group flex items-start gap-3 rounded-xl border border-white/5 bg-surface-2/50 p-3 text-left transition-all hover:border-cyan-accent/40"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-accent/10 text-cyan-accent">
                      <Icon size={15} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-ink-hi">{qa.q}</span>
                      <span className="mono mt-1 inline-block rounded bg-navy-800 px-1.5 text-[10px] text-cyan-accent">→ {A.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {history.map(({ qa, idx }, i) => (
          <div key={i} className="space-y-4">
            <div className="flex justify-end gap-3">
              <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-surface-2 px-4 py-2.5 text-sm text-ink-hi ring-1 ring-white/5">{qa.q}</div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-700">
                <User size={16} className="text-ink-mid" />
              </div>
            </div>
            <AnswerBlock
              item={qa}
              artifactIdx={idx}
              onProgress={i === history.length - 1 ? emitProgress : undefined}
              onComplete={
                i === history.length - 1
                  ? () => {
                      setPending(false);
                      onAnswered && onAnswered(idx, qa);
                    }
                  : undefined
              }
            />
          </div>
        ))}
      </div>

      <div className="border-t border-white/5 p-3">
        {remaining.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {remaining.map(({ qa, i }) => (
              <button
                key={qa.q}
                onClick={() => ask(qa, i)}
                disabled={pending}
                className="rounded-full border border-white/8 bg-surface-2/60 px-3 py-1.5 text-xs text-ink-mid transition-all hover:border-cyan-accent/50 hover:text-cyan-accent disabled:opacity-40"
              >
                {qa.q}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-navy-950/60 px-3 py-2">
          <input
            readOnly
            value={pending ? 'AEGIS-X is retrieving evidence…' : 'Select a suggested query above'}
            className="flex-1 bg-transparent text-sm text-ink-low outline-none"
          />
          <button
            onClick={() => remaining[0] && ask(remaining[0].qa, remaining[0].i)}
            disabled={pending || remaining.length === 0}
            className="flex h-8 w-8 items-center justify-center rounded-md bg-cyan-accent text-navy-950 transition-all hover:shadow-glow disabled:opacity-40"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
