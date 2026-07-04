import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import { ANALYZE_STATS, FILE_TYPE_DONUT, ARCH_LAYERS } from '../../data/mockData';
import { CANON } from '../../data/canon';

function stagger(i) {
  return { animationDelay: `${i * 80}ms`, animationFillMode: 'backwards' };
}

export default function Analyze({ onNext }) {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">Ingestion &amp; Integrity Report</h2>
        <p className="text-sm text-ink-mid">Every artifact sealed and accounted for. Chain of custody verified before a single human review.</p>
      </div>

      {/* integrity banner */}
      <div className="card animate-fade-in mb-4 flex items-center gap-3 border-emerald-500/30 p-4" style={stagger(0)}>
        <ShieldCheck size={22} className="text-emerald-400" />
        <div className="text-sm text-ink-hi">
          <span className="font-semibold text-emerald-300">{CANON.filesTotal.toLocaleString()} / {CANON.filesTotal.toLocaleString()} artifacts sealed</span> · SHA-256 + ML-DSA (PQC) · chain of custody{' '}
          <span className="font-semibold text-emerald-300">UNBROKEN ✓</span>
        </div>
      </div>

      {/* stat cards */}
      <div className="mb-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {ANALYZE_STATS.map((s, i) => (
          <div key={s.k} className="card animate-fade-in p-4" style={stagger(i + 1)}>
            <div className="text-[11px] uppercase tracking-label text-ink-low">{s.k}</div>
            <div className="mono mt-1 text-2xl font-bold" style={{ color: s.c }}>
              {s.v}
            </div>
            <div className="mt-0.5 text-[11px] text-ink-low">{s.note}</div>
          </div>
        ))}
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* file-type donut */}
        <div className="card animate-fade-in p-4" style={stagger(5)}>
          <div className="mb-1 text-[11px] uppercase tracking-label text-ink-low">File-type distribution</div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={FILE_TYPE_DONUT} dataKey="value" nameKey="label" innerRadius={42} outerRadius={62} paddingAngle={2} stroke="none">
                  {FILE_TYPE_DONUT.map((d) => (
                    <Cell key={d.label} fill={d.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {FILE_TYPE_DONUT.map((d) => (
              <span key={d.label} className="flex items-center gap-1.5 text-[11px] text-ink-mid">
                <span className="h-2 w-2 rounded-sm" style={{ background: d.color }} /> {d.label} <span className="mono ml-auto text-ink-low">{d.value}%</span>
              </span>
            ))}
          </div>
        </div>

        {/* hash-match breakdown */}
        <div className="card animate-fade-in p-4" style={stagger(6)}>
          <div className="mb-2 text-[11px] uppercase tracking-label text-ink-low">Hash-match breakdown</div>
          <div className="flex h-4 overflow-hidden rounded-full">
            <div style={{ width: `${CANON.disposedPct}%`, background: '#34d399' }} title="known (auto-disposed)" />
            <div style={{ width: `${CANON.toAiPct}%`, background: '#22d3ee' }} title="unknown → AI" />
            <div style={{ width: '0.7%', background: '#e879f9' }} title="synthetic" />
          </div>
          <div className="mt-3 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between"><span className="flex items-center gap-1.5 text-ink-mid"><span className="h-2 w-2 rounded-sm bg-emerald-400" /> Known · auto-disposed</span><span className="mono text-white">{CANON.disposedPct}%</span></div>
            <div className="flex items-center justify-between"><span className="flex items-center gap-1.5 text-ink-mid"><span className="h-2 w-2 rounded-sm bg-cyan-accent" /> Unknown → AI triage</span><span className="mono text-white">{CANON.toAiPct}%</span></div>
            <div className="flex items-center justify-between"><span className="flex items-center gap-1.5 text-ink-mid"><span className="h-2 w-2 rounded-sm bg-fuchsia-400" /> Synthetic-flagged</span><span className="mono text-white">3 files</span></div>
          </div>
        </div>

        {/* EXIF/GPS density strip */}
        <div className="card animate-fade-in p-4" style={stagger(7)}>
          <div className="mb-2 text-[11px] uppercase tracking-label text-ink-low">EXIF / GPS density (Mar)</div>
          <div className="flex h-24 items-end gap-0.5">
            {Array.from({ length: 24 }).map((_, i) => {
              const h = 20 + ((i * 37) % 80);
              const hot = i > 8 && i < 20;
              return <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: hot ? '#22d3ee' : '#1f3350', opacity: hot ? 0.85 : 0.5 }} />;
            })}
          </div>
          <div className="mono mt-1 flex justify-between text-[9px] text-ink-low"><span>Mar 02</span><span>Mar 24</span></div>
        </div>
      </div>

      {/* living architecture */}
      <div className="card animate-fade-in overflow-hidden p-5" style={stagger(8)}>
        <div className="mb-3 flex items-center gap-2">
          <Activity size={16} className="text-cyan-accent" />
          <span className="text-sm font-semibold text-white">Living architecture</span>
          <span className="text-xs text-ink-low">— your evidence just traversed this</span>
        </div>
        <div className="relative flex items-center justify-between">
          {/* pulse track */}
          <div className="absolute left-[8%] right-[8%] top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-surface-2">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <span
                className="absolute top-1/2 h-2 w-16 -translate-y-1/2 rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)', animation: 'archPulse 3s linear infinite' }}
              />
            </div>
          </div>
          {ARCH_LAYERS.map((l, i) => (
            <div key={l.id} className="relative z-10 flex flex-1 flex-col items-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-3 text-cyan-accent ring-1 ring-cyan-accent/30">
                {i + 1}
              </span>
              <div className="mt-2 text-center text-xs font-semibold text-ink-hi">{l.label}</div>
              <div className="mono text-[10px] text-cyan-accent">{l.metric}</div>
            </div>
          ))}
        </div>
      </div>

      {/* bottom bar */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={onNext}
          data-demo="analyze-continue"
          className="flex items-center gap-2 rounded-lg bg-cyan-accent px-4 py-2.5 text-sm font-bold text-navy-950 transition-all hover:shadow-glow"
        >
          Create Case Vault <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
