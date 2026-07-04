import { useNavigate } from 'react-router-dom';
import { X, Image, Boxes, Share2, Clock, Check, GanttChartSquare, Sparkles, FileCheck2, ShieldCheck, ArrowRight } from 'lucide-react';

const MODE_ICON = { file: Image, batch: Boxes, entity: Share2, event: Clock };

// Console default hop/pivot handlers (each console page uses these).
export function useInspectorNav() {
  const navigate = useNavigate();
  const onHop = (key) => {
    if (key === 'lake') navigate('/triage');
    else if (key === 'vectorized') navigate('/ask');
    else if (key === 'graph') navigate('/graph');
    else if (key === 'report') navigate('/report');
  };
  const onPivot = (action) => {
    if (action === 'timeline') navigate('/timeline');
    else if (action === 'graph') navigate('/graph');
    else if (action === 'report') navigate('/report');
    else if (action === 'similar') navigate('/triage');
  };
  return { onHop, onPivot };
}

function StrataTrail({ trail, onHop }) {
  return (
    <div className="border-t border-white/5 px-3 py-2.5">
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-label text-ink-low">Strata Trail</div>
      <div className="space-y-0">
        {trail.map((h, i) => (
          <div key={h.key} className="relative flex items-center gap-2">
            {i < trail.length - 1 && (
              <span className={`absolute left-[9px] top-5 h-4 w-px ${h.done ? 'bg-emerald-500/40' : 'bg-white/10'}`} />
            )}
            <button
              onClick={() => onHop && onHop(h.key)}
              className="group flex flex-1 items-center gap-2 rounded-md px-1.5 py-1 text-left transition-colors hover:bg-surface-2/60"
            >
              <span
                className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${
                  h.done ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40' : 'bg-surface-2 text-ink-low ring-1 ring-white/10'
                }`}
              >
                {h.done ? <Check size={11} /> : <span className="h-1 w-1 rounded-full bg-ink-low" />}
              </span>
              <span className={`flex-1 text-xs ${h.done ? 'text-ink-hi' : 'text-ink-low'}`}>{h.label}</span>
              {h.ts && <span className="mono text-[10px] text-emerald-400">✓ {h.ts}</span>}
              <ArrowRight size={11} className="text-ink-low/0 transition-colors group-hover:text-cyan-accent" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// The universal artifact drawer content — 4 modes, same everywhere.
export default function ArtifactInspector({ item, preview, extra, onClose, onHop, onPivot }) {
  if (!item) return null;
  const Icon = MODE_ICON[item.mode] || Image;
  const accent = item.accent || '#22d3ee';
  const showPreview = item.mode === 'file';

  return (
    <div className="card-3 flex max-h-full flex-col overflow-hidden">
      <div className="h-[3px] w-full shrink-0" style={{ background: accent }} />
      <div className="min-h-0 flex-1 overflow-y-auto">
        {/* header */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${accent}22` }}>
              <Icon size={16} style={{ color: accent }} />
            </span>
            <div>
              <div className="mono text-sm font-semibold text-white">{item.id}</div>
              <div className="text-[10px] uppercase tracking-label text-ink-low">
                {item.mode} · {item.typeLabel || item.title}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {item.sealed && (
              <span className="badge bg-emerald-500/15 text-emerald-300">
                <ShieldCheck size={11} /> sealed
              </span>
            )}
            {onClose && (
              <button onClick={onClose} className="text-ink-low hover:text-ink-hi" aria-label="Close">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* preview (file mode) */}
        {showPreview && (
          <div className="relative mx-3 mb-3 aspect-video overflow-hidden rounded-lg ring-1 ring-white/5">
            {preview ? (
              preview
            ) : (
              <div className={`h-full w-full bg-gradient-to-br ${item.gradient || 'from-slate-800 via-slate-700 to-navy-700'} opacity-60 blur-[2px]`} />
            )}
            <span className="badge absolute bottom-2 left-2 bg-navy-950/80 text-ink-mid">blurred evidence — abstract</span>
          </div>
        )}

        {/* confidence (file mode) */}
        {item.confidence != null && (
          <div className="px-3 pb-2">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="text-ink-mid">Model confidence</span>
              <span className="mono font-bold" style={{ color: accent }}>{item.confidence.toFixed(1)}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-navy-700">
              <div className="h-full rounded-full" style={{ width: `${item.confidence}%`, background: accent }} />
            </div>
          </div>
        )}

        {/* entity detail line */}
        {item.detail && <p className="px-3 pb-2 text-sm leading-relaxed text-ink-mid">{item.detail}</p>}

        {/* metadata */}
        {item.meta?.length > 0 && (
          <div className="border-t border-white/5 px-3 py-2">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-label text-ink-low">Metadata</div>
            <table className="w-full text-[11px]">
              <tbody>
                {item.meta.map(([k, v]) => (
                  <tr key={k}>
                    <td className="py-1 pr-2 align-top text-ink-low">{k}</td>
                    <td className="mono py-1 text-right leading-snug text-ink-hi break-all">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* strata trail */}
        {item.trail?.length > 0 && <StrataTrail trail={item.trail} onHop={onHop} />}

        {/* extra (page-specific content, e.g. graph connections) */}
        {extra && <div className="border-t border-white/5 px-3 py-2.5">{extra}</div>}
      </div>

      {/* pivot actions */}
      <div className="grid shrink-0 grid-cols-2 gap-2 border-t border-white/5 p-3">
        <button onClick={() => onPivot && onPivot('timeline')} className="flex items-center justify-center gap-1.5 rounded-lg bg-surface-2 px-2 py-2 text-xs font-semibold text-ink-mid hover:text-ink-hi">
          <GanttChartSquare size={13} /> Timeline
        </button>
        <button onClick={() => onPivot && onPivot('graph')} className="flex items-center justify-center gap-1.5 rounded-lg bg-surface-2 px-2 py-2 text-xs font-semibold text-ink-mid hover:text-ink-hi">
          <Share2 size={13} /> Show in Graph
        </button>
        {item.similar && (
          <button onClick={() => onPivot && onPivot('similar')} className="flex items-center justify-center gap-1.5 rounded-lg bg-surface-2 px-2 py-2 text-xs font-semibold text-ink-mid hover:text-ink-hi">
            <Sparkles size={13} /> Find similar
          </button>
        )}
        <button onClick={() => onPivot && onPivot('report')} className={`flex items-center justify-center gap-1.5 rounded-lg bg-cyan-accent/15 px-2 py-2 text-xs font-semibold text-cyan-accent ring-1 ring-cyan-accent/30 hover:bg-cyan-accent/25 ${item.similar ? '' : 'col-span-1'}`}>
          <FileCheck2 size={13} /> Add to Report
        </button>
      </div>
    </div>
  );
}
