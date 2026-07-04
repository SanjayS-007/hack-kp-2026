import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Lock,
  ShieldCheck,
  FileStack,
  Flag,
  Smartphone,
  Vault as VaultIcon,
  ArrowRight,
  Sparkles,
  Play,
  FileCheck2,
} from 'lucide-react';
import { VAULT_CASES, VAULT_INTEGRITY } from '../data/mockData';
import { useDocumentTitle } from '../components/ui';
import { useCaseStore, setActiveCase } from '../store/caseStore';
import { startDemo } from '../store/demoStore';

const STATUS_STYLE = {
  ACTIVE: { bg: 'bg-cyan-accent/15', t: 'text-cyan-accent', dot: '#22d3ee' },
  'COURT-READY': { bg: 'bg-emerald-500/15', t: 'text-emerald-300', dot: '#34d399' },
  CLOSED: { bg: 'bg-slate-500/15', t: 'text-slate-300', dot: '#64748b' },
};

function ago(min) {
  if (min < 60) return `${min}m ago`;
  if (min < 1440) return `${Math.round(min / 60)}h ago`;
  return `${Math.round(min / 1440)}d ago`;
}

function CaseCard({ c, fresh, onOpen }) {
  const s = STATUS_STYLE[c.status] || STATUS_STYLE.CLOSED;
  return (
    <button
      onClick={() => onOpen(c)}
      data-demo={fresh ? 'open-case' : undefined}
      className={`card card-hover group relative overflow-hidden p-4 text-left ${fresh ? 'anim-in-right ring-1 ring-cyan-accent/50' : ''}`}
    >
      <Lock size={64} className="pointer-events-none absolute -right-3 -bottom-3 text-white/[0.03]" />
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.tier, boxShadow: `0 0 8px ${c.tier}` }} />
          <span className="mono text-sm font-bold text-cyan-accent">{c.id}</span>
        </div>
        <span className={`badge ${s.bg} ${s.t}`}>{c.status}</span>
      </div>
      <div className="mt-1.5 text-lg font-bold text-white">{c.name}</div>
      {fresh && (
        <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-label text-cyan-accent">
          <Sparkles size={11} /> Sealed just now
        </span>
      )}

      <div className="mt-3 flex items-center gap-4 text-xs text-ink-mid">
        <span className="flex items-center gap-1.5">
          <FileStack size={13} className="text-ink-low" /> <span className="mono">{c.files.toLocaleString()}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Flag size={13} className="text-ink-low" /> <span className="mono">{c.flagged}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Smartphone size={13} className="text-ink-low" /> <span className="mono">{c.devices}</span>
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2.5 text-[11px]">
        <span className="text-ink-low">{c.volume} · updated {ago(c.agoMin)}</span>
        <span className="flex items-center gap-1 font-semibold text-ink-mid transition-colors group-hover:text-cyan-accent">
          Open <ArrowRight size={12} />
        </span>
      </div>
    </button>
  );
}

// 2D card-grid vault — the no-WebGL / ?flat fallback for the 3D Fusion Vault.
export default function VaultFlat() {
  useDocumentTitle('Case Vault');
  const navigate = useNavigate();
  const { created } = useCaseStore();

  const open = (c) => {
    setActiveCase({ id: c.id, name: c.name, status: c.status });
    navigate('/dashboard');
  };

  const cases = [...VAULT_CASES].sort((a, b) => {
    if (created && a.id === created.id) return -1;
    if (created && b.id === created.id) return 1;
    return 0;
  });

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="eyebrow mb-1.5">VAULT · CASE LIFECYCLE</div>
          <h1 className="flex items-center gap-3 text-[28px] font-bold leading-tight tracking-tightest text-white">
            <VaultIcon size={26} className="text-cyan-accent" /> Case Vault
          </h1>
          <div className="mt-2 h-[3px] w-14 rounded-full bg-cyan-accent" style={{ boxShadow: '0 0 12px #22d3ee66' }} />
        </div>
        <div className="flex items-center gap-3">
          <span
            className="hidden items-center gap-1.5 rounded-lg border border-amber-400/25 bg-amber-400/5 px-3 py-2 text-xs font-semibold text-amber-300/80 sm:flex"
            title="Fusion View (cross-case threads) requires the 3D vault"
          >
            Fusion View · 3D feature
          </span>
          <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-surface-1/60 px-3 py-2 text-sm text-ink-low">
            <Search size={15} />
            <input
              placeholder="Search cases…"
              className="w-40 bg-transparent text-ink-hi outline-none placeholder:text-ink-low"
            />
          </div>
          <button
            onClick={() => startDemo()}
            data-demo="start-demo"
            className="flex items-center gap-2 rounded-lg border border-cyan-accent/40 bg-transparent px-4 py-2.5 text-sm font-bold text-cyan-accent transition-all hover:bg-cyan-accent/10"
            title="Presenter-driven guided journey (D)"
          >
            <Play size={15} /> Demo
          </button>
          <button
            onClick={() => navigate('/report', { state: { fromCompile: true, cinematic: false } })}
            data-demo="compile-report"
            className="flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-transparent px-4 py-2.5 text-sm font-bold text-emerald-300 transition-all hover:bg-emerald-400/10"
            title="Compile the case report (standard assembly)"
          >
            <FileCheck2 size={15} /> Compile Report
          </button>
          <button
            onClick={() => navigate('/genesis')}
            data-demo="new-case"
            className="flex items-center gap-2 rounded-lg bg-cyan-accent px-4 py-2.5 text-sm font-bold text-navy-950 shadow-glow-sm transition-all hover:shadow-glow"
          >
            <Plus size={16} /> New Case
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3">
          {cases.map((c) => (
            <CaseCard key={c.id} c={c} fresh={created && c.id === created.id} onOpen={open} />
          ))}
        </div>

        <div className="card-3 h-fit p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <ShieldCheck size={16} className="text-emerald-400" /> Vault Integrity
          </div>
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-ink-low">Total cases</span>
              <span className="mono font-bold text-white">{VAULT_INTEGRITY.totalCases}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-low">Storage sealed</span>
              <span className="mono text-ink-hi">{VAULT_INTEGRITY.sealed}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-low">Last audit</span>
              <span className="mono text-ink-hi">{VAULT_INTEGRITY.lastAudit}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-low">PQC signature</span>
              <span className="flex items-center gap-1 font-semibold text-emerald-400">{VAULT_INTEGRITY.pqc}</span>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-surface-2/60 p-3 text-[11px] text-ink-mid">
            <div className="flex items-center gap-1.5 font-semibold text-cyan-accent">
              <Lock size={12} /> WORM · Write-Once-Read-Many
            </div>
            <p className="mt-1 text-ink-low">Every case is content-addressed and anchored with a post-quantum ML-DSA signature. Tamper-evident by design.</p>
          </div>
        </div>
      </div>
    </>
  );
}
