import { X, GitMerge, ShieldQuestion } from 'lucide-react';

const CASE_NAME = { 'KP-2026-0417': 'Operation Sentinel', 'KP-2026-0398': 'Night Courier', 'KP-2026-0311': 'Harbor Watch' };

// Cross-case evidence-pair panel — opened by clicking a FusionThread.
export default function EvidencePairPanel({ thread, joint, onClose, onPropose }) {
  if (!thread) return null;
  const proposed = joint?.threadId === thread.id;
  return (
    <div className="no-print pointer-events-auto absolute left-1/2 top-20 z-40 w-[560px] max-w-[94vw] -translate-x-1/2">
      <div className="card-3 p-4">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: thread.color, boxShadow: `0 0 8px ${thread.color}` }} />
            <div>
              <div className="text-sm font-bold text-white">{thread.label}</div>
              <div className="text-[10px] uppercase tracking-label text-ink-low">cross-case correlation</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="mono rounded bg-surface-2 px-1.5 py-0.5 text-[10px] text-cyan-accent">{thread.method}</span>
            <span className="badge" style={{ background: `${thread.color}1a`, color: thread.color }}>conf {thread.confLabel}</span>
            <button onClick={onClose} className="text-ink-low hover:text-ink-hi">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {thread.evidence.map((ev) => (
            <div key={ev.id} className="rounded-lg border border-white/8 bg-surface-1/60 p-3">
              <div className="flex items-center justify-between">
                <span className="mono text-xs font-bold text-cyan-accent">{ev.id}</span>
                <span className="badge bg-surface-2 text-ink-mid">{ev.type}</span>
              </div>
              <div className="mt-1 text-[11px] font-semibold text-ink-hi">{CASE_NAME[ev.case] || ev.case}</div>
              <p className="mt-1 text-[11px] leading-relaxed text-ink-mid">{ev.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-ink-low">
            <ShieldQuestion size={12} className="text-amber-400" />
            Cross-case correlation within this agency's sovereign vault. Inter-agency: model-level federation only — data never moves.
          </div>
          {proposed ? (
            <span className="badge bg-emerald-500/15 text-emerald-300">JOINT-2026-0091 · pending approval</span>
          ) : (
            <button
              onClick={() => onPropose(thread)}
              data-demo="propose-joint"
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-cyan-accent px-3 py-2 text-xs font-bold text-navy-950 transition-all hover:shadow-glow"
            >
              <GitMerge size={13} /> Propose joint investigation
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
