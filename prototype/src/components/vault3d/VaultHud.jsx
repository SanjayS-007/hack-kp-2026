import { Search, Plus, Play, MessageSquareText, Layers, ShieldCheck, Lock, ArrowRight, X, Gauge, GitMerge, FileCheck2 } from 'lucide-react';
import { STRATA_POSES } from './poses';
import { CANON } from '../../data/canon';
import { VAULT_INTEGRITY, RISK_BREAKDOWN } from '../../data/mockData';
import { useDemo } from '../../store/demoStore';

const STRATUM_CHIP = {
  lake: `${CANON.filesTotal.toLocaleString()} objects · WORM · 0 mutations since seal`,
  constellation: `ChromaDB · ${CANON.filesTotal.toLocaleString()} embeddings · 384-dim · HNSW`,
  graph: `Neo4j · ${CANON.entities} entities · ${CANON.edges} edges · TAGNN pinned`,
  crown: `Composite risk 97 · ${CANON.highRisk} high-risk · ${CANON.leads} leads`,
};

export default function VaultHud({
  cases,
  view,
  focusName,
  currentStratum,
  createdId,
  flyTo,
  onOverview,
  onNewCase,
  onDemo,
  onToggleAsk,
  askOpen,
  onEnterConsole,
  proofsOpen,
  onOpenProofs,
  onCloseProofs,
  onProofChip,
  onCompile,
  diving,
  fusionActive,
  onToggleFusion,
  threads = [],
  onSelectThread,
  joint,
}) {
  const focused = view.focus;
  const breakdown = RISK_BREAKDOWN['LEAD-0001'];
  // The Demo HUD pill also lives at bottom-center; lift the breadcrumbs + stratum chip
  // clear of it while a demo is running so every stratum (incl. the Crown) stays clickable.
  const demoOn = useDemo().on;

  return (
    <div
      className={`no-print pointer-events-none absolute inset-0 z-20 select-none transition-opacity duration-500 ${
        diving ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* top-left: brand + search + integrity */}
      <div className="pointer-events-auto absolute left-4 top-4 flex items-center gap-3">
        <div className="flex items-center gap-2.5 rounded-lg border border-white/8 bg-navy-950/70 px-3 py-2 backdrop-blur">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-accent to-indigo-500 shadow-glow-sm">
            <ShieldCheck size={17} className="text-navy-950" />
          </div>
          <div>
            <div className="text-sm font-extrabold tracking-tight text-white">
              AEGIS<span className="text-cyan-accent">-X</span>
            </div>
            <div className="text-[9px] uppercase tracking-[0.18em] text-ink-low">Fusion Vault</div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-white/8 bg-navy-950/70 px-3 py-2 text-sm text-ink-low backdrop-blur">
          <Search size={15} />
          <input placeholder="Search cases…" className="w-32 bg-transparent text-ink-hi outline-none placeholder:text-ink-low" />
        </div>
      </div>

      {/* top-right: actions */}
      <div className="pointer-events-auto absolute right-4 top-4 flex items-center gap-2">
        <button
          onClick={onToggleFusion}
          data-demo="fusion-view"
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-bold backdrop-blur transition-all ${
            fusionActive ? 'border-amber-400/60 bg-amber-400/15 text-amber-300' : 'border-white/10 bg-navy-950/70 text-ink-hi hover:border-amber-400/40'
          }`}
          title="Cross-case Fusion View"
        >
          <GitMerge size={14} /> Fusion View
        </button>
        <button
          onClick={onDemo}
          data-demo="start-demo"
          className="flex items-center gap-2 rounded-lg border border-cyan-accent/40 bg-navy-950/70 px-3 py-2 text-sm font-bold text-cyan-accent backdrop-blur transition-all hover:bg-cyan-accent/10"
          title="Presenter demo (D)"
        >
          <Play size={14} /> Demo
        </button>
        <button
          onClick={onNewCase}
          data-demo="new-case"
          className="flex items-center gap-2 rounded-lg bg-cyan-accent px-3.5 py-2 text-sm font-bold text-navy-950 shadow-glow-sm transition-all hover:shadow-glow"
        >
          <Plus size={15} /> New Case
        </button>
      </div>

      {/* joint-investigation banner */}
      {joint && (
        <div className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur">
          {joint.id} proposed · pending supervisor approval
        </div>
      )}

      {/* left mini-rail: case list (click = camera flight) */}
      <div className="pointer-events-auto absolute left-4 top-1/2 flex -translate-y-1/2 flex-col gap-2">
        {cases.map((c) => (
          <button
            key={c.id}
            onClick={() => flyTo('P1', c.id)}
            className={`group flex w-52 items-center gap-2 rounded-lg border bg-navy-950/70 px-3 py-2 text-left backdrop-blur transition-all ${
              focused === c.id ? 'border-cyan-accent/60' : 'border-white/8 hover:border-cyan-accent/40'
            }`}
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: c.tier, boxShadow: `0 0 8px ${c.tier}` }} />
            <span className="min-w-0 flex-1">
              <span className="mono block text-[11px] font-bold text-cyan-accent">{c.id}</span>
              <span className="block truncate text-xs font-semibold text-white">{c.name}</span>
            </span>
            {createdId === c.id && <span className="text-[8px] font-bold uppercase text-cyan-accent">new</span>}
          </button>
        ))}
        <div className="mt-1 flex items-center gap-1.5 rounded-lg border border-white/8 bg-navy-950/70 px-3 py-2 text-[10px] text-ink-mid backdrop-blur">
          <Lock size={11} className="text-emerald-400" />
          <span className="mono">{VAULT_INTEGRITY.sealed} · {VAULT_INTEGRITY.pqc}</span>
        </div>
      </div>

      {/* cross-case fusion thread chips + guard-rail (overview / fusion view) */}
      {fusionActive && (
        <div className="pointer-events-auto absolute bottom-16 left-4 w-72">
          <div className="rounded-lg border border-amber-400/25 bg-navy-950/80 p-2.5 backdrop-blur">
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-label text-amber-300">
              <GitMerge size={12} /> Cross-case fusion · TAGNN
            </div>
            <div className="space-y-1.5">
              {threads.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onSelectThread && onSelectThread(t)}
                  data-demo={t.id === 'FT-01' ? 'fusion-thread' : undefined}
                  className="flex w-full items-center gap-2 rounded-md border border-white/8 bg-surface-1/60 px-2 py-1.5 text-left text-[11px] transition-colors hover:border-cyan-accent/40"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: t.color, boxShadow: `0 0 6px ${t.color}` }} />
                  <span className="flex-1 truncate text-ink-hi">{t.label}</span>
                  <span className="mono font-semibold" style={{ color: t.color }}>{t.confLabel}</span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-[9px] leading-snug text-ink-low">
              Cross-case correlation within this agency's sovereign vault. Inter-agency: model-level federation only —
              data never moves.
            </p>
          </div>
        </div>
      )}

      {/* focused-case action cluster (top-center, clear of the right-docked Ask drawer) */}
      {focused && (
        <div className="pointer-events-auto absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-2">
          <button
            onClick={onEnterConsole}
            data-demo={createdId === focused ? 'open-case' : undefined}
            className="flex items-center gap-2 rounded-lg bg-surface-2/90 px-3 py-2 text-sm font-semibold text-ink-hi backdrop-blur transition-all hover:bg-surface-3"
          >
            Enter Console <ArrowRight size={14} />
          </button>
          <button
            onClick={onToggleAsk}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold backdrop-blur transition-all ${
              askOpen ? 'border-cyan-accent/60 bg-cyan-accent/15 text-cyan-accent' : 'border-white/10 bg-navy-950/70 text-ink-hi hover:border-cyan-accent/40'
            }`}
          >
            <MessageSquareText size={14} /> Ask the Vault
          </button>
        </div>
      )}

      {/* bottom-center: stratum breadcrumbs (lifted above the Demo HUD while a demo runs) */}
      <div className={`pointer-events-auto absolute ${demoOn ? 'bottom-20' : 'bottom-4'} left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/8 bg-navy-950/80 px-2 py-1.5 backdrop-blur transition-all`}>
        <button
          onClick={onOverview}
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
            view.pose === 'P0' ? 'bg-cyan-accent/15 text-cyan-accent' : 'text-ink-mid hover:text-ink-hi'
          }`}
        >
          <Layers size={13} /> Vault
        </button>
        {focused &&
          STRATA_POSES.map((s) => (
            <button
              key={s.key}
              onClick={() => flyTo(s.pose, focused)}
              data-demo={s.key === 'crown' ? 'nav-crown' : undefined}
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                currentStratum === s.key ? 'bg-cyan-accent/15 text-cyan-accent' : 'text-ink-mid hover:text-ink-hi'
              }`}
            >
              {s.label}
            </button>
          ))}
      </div>

      {/* contextual stratum HUD chip */}
      {focused && currentStratum && (
        <div className={`pointer-events-none absolute ${demoOn ? 'bottom-36' : 'bottom-16'} left-1/2 -translate-x-1/2 rounded-md border border-white/8 bg-navy-950/80 px-3 py-1 text-[10px] backdrop-blur transition-all`}>
          <span className="mono text-ink-mid">{STRATUM_CHIP[currentStratum]}</span>
        </div>
      )}

      {/* Risk proof panel */}
      {proofsOpen && (
        <div className="pointer-events-auto absolute right-4 top-1/2 w-72 -translate-y-1/2">
          <div className="card-3 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Gauge size={15} className="text-rose-400" /> Risk Proof · LEAD-0001
              </div>
              <button onClick={onCloseProofs} className="text-ink-low hover:text-ink-hi">
                <X size={15} />
              </button>
            </div>
            <div className="mb-2 flex h-3 overflow-hidden rounded-full">
              {breakdown.map((b) => (
                <div key={b.k} style={{ width: `${b.v}%`, background: b.c }} title={`${b.k} ${b.v}`} />
              ))}
            </div>
            <div className="space-y-1.5">
              {breakdown.map((b) => (
                <button
                  key={b.k}
                  onClick={() => onProofChip && onProofChip(b.k)}
                  className="flex w-full items-center justify-between rounded-md border border-white/8 bg-surface-1/60 px-2.5 py-1.5 text-xs transition-colors hover:border-cyan-accent/40"
                >
                  <span className="flex items-center gap-2 text-ink-mid">
                    <span className="h-2 w-2 rounded-sm" style={{ background: b.c }} /> {b.k}
                  </span>
                  <span className="mono font-semibold text-white">{b.v}</span>
                </button>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-white/8 pt-2 text-xs">
              <span className="font-semibold text-ink-hi">Composite</span>
              <span className="mono font-bold text-rose-400">97</span>
            </div>
            <div className="mt-2 text-[10px] text-ink-low">Every factor is traceable to primary evidence — provenance spine on the vault.</div>
            <button
              onClick={onCompile}
              data-demo="compile-report"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-accent px-3 py-2 text-xs font-bold text-navy-950 shadow-glow-sm transition-all hover:shadow-glow"
            >
              <FileCheck2 size={14} /> Compile Case Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
