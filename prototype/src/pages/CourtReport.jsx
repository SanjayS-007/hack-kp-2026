import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FileCheck2,
  Download,
  Sparkles,
  Loader2,
  CheckCircle2,
  ChevronDown,
  ListTree,
  ShieldCheck,
  PenTool,
  Lock,
  QrCode,
  Cpu,
  Share2,
  Clock,
  ShieldAlert,
  Scale,
  Boxes,
  X,
} from 'lucide-react';
import { CASE, KPIS, RISK_QUEUE, RISK_BREAKDOWN, SYNTHETIC_FILES, PROVENANCE, EDGE_KIT } from '../data/mockData';
import { CANON } from '../data/canon';
import {
  REPORT_META,
  SEIZURE,
  CUSTODY_LOG,
  METHODOLOGY,
  MODEL_REGISTRY,
  ENCLAVE,
  EXHIBITS,
  EXHIBIT_DEFAULT_OPEN,
  ENTITY_NARRATIVE,
  WALLETS,
  PIVOTAL_EVENTS,
  CLOCK_DRIFT,
  JOINT_DISCLOSURE,
  CERT_PARTICULARS,
  HASH_MANIFEST,
  ECS_AUDIT,
  ECS_EXCLUDED_REASON,
  GLOSSARY,
  REPORT_SECTIONS,
} from '../data/reportDoc';
import { CITATION_CHIPS, STRATA_META, SECTION_PROVENANCE } from '../data/reportDive';
import { setReportSealed, useReportSealed } from '../store/reportStore';
import { PageHeader, Badge, useDocumentTitle } from '../components/ui';
import { dur } from '../lib/speed';

const TOTAL_SECTIONS = REPORT_SECTIONS.length; // 11
const PAGE_OF = {
  'sec-cover': 1, 'sec-summary': 2, 'sec-custody': 3, 'sec-method': 4, 'sec-content': 5,
  'sec-entity': 7, 'sec-timeline': 8, 'sec-synth': 9, 'sec-risk': 10, 'sec-cert': 11, 'sec-appendix': 12,
};
const PHASE_COLOR = { grooming: '#eab308', production: '#f97316', distribution: '#ef4444', financial: '#22d3ee', network: '#10b981' };

// ── classification strip (top + bottom of every page-like block) ──
function ClassStrip({ pos = 'top' }) {
  return (
    <div
      className={`flex items-center justify-between bg-rose-900/90 px-8 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-rose-50 ${pos === 'top' ? '' : 'mt-0'}`}
    >
      <span>{REPORT_META.classification}</span>
      <span>{CASE.id}</span>
    </div>
  );
}

// ── per-section page furniture (page n of 14 + generated-by line) ──
function PageFurniture({ sectionId }) {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-8 py-1.5 font-mono text-[9px] text-slate-400">
      <span>{REPORT_META.generatedBy}</span>
      <span>Page {PAGE_OF[sectionId] || 1} of {REPORT_META.totalPages}</span>
    </div>
  );
}

// ── strata provenance footer (findings sections) ──
function ProvenanceFooter({ sectionId }) {
  const active = SECTION_PROVENANCE[sectionId];
  if (!active) return null;
  return (
    <div className="no-print mt-3 flex items-center gap-2 border-t border-slate-200 pt-2 text-[10px] text-slate-400">
      <span className="uppercase tracking-wide">Strata provenance</span>
      <span className="flex items-center gap-1.5">
        {['lake', 'vector', 'graph', 'crown'].map((k) => {
          const on = active.includes(k);
          const m = STRATA_META[k];
          return (
            <span key={k} title={`${m.full}${on ? '' : ' · not cited here'}`} className="flex items-center gap-1">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: on ? m.color : 'transparent', border: `1px solid ${on ? m.color : '#cbd5e1'}`, boxShadow: on ? `0 0 5px ${m.color}` : 'none' }}
              />
            </span>
          );
        })}
      </span>
    </div>
  );
}

// ── section wrapper: class strips + chrome + fade-in gating ──
function Section({ id, show, children }) {
  return (
    <section id={id} className={`report-section scroll-mt-4 border-t border-slate-200 ${show ? 'animate-fade-in' : 'invisible'}`}>
      <ClassStrip pos="top" />
      <div className="px-8 py-6">{children}</div>
      <ClassStrip pos="bottom" />
      <PageFurniture sectionId={id} />
    </section>
  );
}

// ── citation chips landing from the dive ──
function CitationLanding({ chips }) {
  if (!chips.length) return null;
  return (
    <div className="no-print pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center">
      <div className="relative mt-2 flex w-full max-w-3xl flex-wrap justify-center gap-1.5 px-4">
        {chips.map((c, i) => {
          const m = STRATA_META[c.stratum];
          return (
            <div key={c.id} className="citation-land" style={{ animationDelay: `calc(${i * 130}ms / var(--speed-mult))` }}>
              <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-navy-950/90 px-2.5 py-1 text-[10px] font-semibold shadow-elev-3" style={{ borderColor: `${m.color}66`, color: m.color }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: m.color }} />
                <span className="mono">{c.id}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── per-exhibit proof-tree accordion ──
function ExhibitRow({ ex, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  useEffect(() => setOpen(defaultOpen), [defaultOpen]);
  const catColor = ex.cat === 'A' ? '#ef4444' : ex.cat === 'B' ? '#f59e0b' : '#eab308';
  return (
    <div className={`rounded-lg border bg-white ${open ? 'border-slate-400' : 'border-slate-200'}`} data-exhibit={ex.id}>
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left">
        <span className="flex min-w-0 items-center gap-2">
          <span className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white" style={{ background: catColor }}>{ex.cat}</span>
          <span className="font-mono text-xs font-bold text-slate-800">{ex.id}</span>
          <span className="truncate text-[12px] text-slate-600">{ex.claim}</span>
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="font-mono text-[11px] font-semibold text-slate-700">{ex.conf.toFixed(1)}%</span>
          <ChevronDown size={15} className={`text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>
      {open && (
        <div className="space-y-1.5 border-t border-slate-200 px-3 py-2 text-[12px]">
          {[
            ['Claim', ex.claim],
            ['Statutory element', ex.element],
            ['Evidence ID', ex.id],
            ['Device origin', ex.device],
            ['SHA-256', ex.hash],
            ['XAI reference', ex.xai],
          ].map(([k, v]) => (
            <div key={k} className="flex items-start justify-between gap-3">
              <span className="text-slate-500">{k}</span>
              <span className={`text-right ${k === 'SHA-256' || k === 'Evidence ID' ? 'font-mono text-[11px]' : 'font-medium'} text-slate-800`}>
                {v} {k === 'SHA-256' && <CheckCircle2 size={11} className="ml-0.5 inline text-emerald-600" />}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 pt-1 text-[11px] font-semibold text-emerald-700">
            <CheckCircle2 size={12} /> Provenance spine verified · Lake → Vector → Graph → Crown
          </div>
        </div>
      )}
    </div>
  );
}

// ── typed-name signature (fills during Sign & Seal) ──
function TypedName({ name, active }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) { setN(0); return undefined; }
    let i = 0;
    const iv = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= name.length) clearInterval(iv);
    }, dur(60));
    return () => clearInterval(iv);
  }, [active, name]);
  return (
    <span className="font-mono text-sm text-slate-900">
      {name.slice(0, n)}
      {active && n < name.length && <span className="animate-pulse">|</span>}
    </span>
  );
}

// ── static entity-network SVG (peel path in gold) ──
const G_NODES = {
  'Subject-B': { x: 40, y: 40, c: '#ef4444', label: 'Subject-B' },
  'Wallet-1': { x: 120, y: 30, c: '#f59e0b', label: 'bc1q…7f9' },
  'Wallet-2': { x: 200, y: 45, c: '#f59e0b', label: 'bc1q…a3d' },
  'Mixer': { x: 275, y: 30, c: '#f59e0b', label: 'Mixer' },
  'Subject-C': { x: 350, y: 55, c: '#dc2626', label: 'Subject-C' },
  'Hash-1': { x: 300, y: 120, c: '#db2777', label: '#a3f9…' },
  'Phone-A': { x: 190, y: 135, c: '#6366f1', label: 'Phone-A' },
  'Subject-A': { x: 70, y: 120, c: '#ef4444', label: 'Subject-A' },
};
const G_GOLD = [['Subject-B', 'Wallet-1'], ['Wallet-1', 'Wallet-2'], ['Wallet-2', 'Mixer'], ['Mixer', 'Subject-C'], ['Subject-C', 'Hash-1'], ['Hash-1', 'Phone-A']];
const G_GREY = [['Subject-A', 'Phone-A'], ['Subject-A', 'Subject-B']];
function StaticGraph() {
  return (
    <svg viewBox="0 0 400 170" className="w-full rounded-lg border border-slate-200 bg-slate-50">
      {G_GREY.map(([a, b], i) => (
        <line key={`g${i}`} x1={G_NODES[a].x} y1={G_NODES[a].y} x2={G_NODES[b].x} y2={G_NODES[b].y} stroke="#cbd5e1" strokeWidth="1.5" />
      ))}
      {G_GOLD.map(([a, b], i) => (
        <line key={`p${i}`} x1={G_NODES[a].x} y1={G_NODES[a].y} x2={G_NODES[b].x} y2={G_NODES[b].y} stroke="#f59e0b" strokeWidth="2.5" />
      ))}
      {Object.entries(G_NODES).map(([id, n]) => (
        <g key={id}>
          <circle cx={n.x} cy={n.y} r={id === 'Subject-C' ? 9 : 7} fill={n.c} stroke={id === 'Subject-C' ? '#f59e0b' : '#fff'} strokeWidth={id === 'Subject-C' ? 2.5 : 1} />
          <text x={n.x} y={n.y - 11} textAnchor="middle" className="fill-slate-600" style={{ fontSize: 8, fontFamily: 'monospace' }}>{n.label}</text>
        </g>
      ))}
      <text x="358" y="52" className="fill-amber-600 font-bold" style={{ fontSize: 8 }}>0.89</text>
    </svg>
  );
}

export default function CourtReport() {
  useDocumentTitle('Court Report');
  const location = useLocation();
  const navigate = useNavigate();
  const compileState = location.state || {};
  const alreadySealed = useReportSealed();
  const [visible, setVisible] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [active, setActive] = useState('sec-cover');
  const [landing, setLanding] = useState(false);
  const [sealing, setSealing] = useState(false);
  const [sealed, setSealed] = useState(alreadySealed);
  const [toast, setToast] = useState(false);
  const [demoExhibit, setDemoExhibit] = useState(false);
  const timers = useRef([]);
  const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const generate = useCallback((openExhibit = false) => {
    clearAll();
    setGenerating(true);
    setVisible(0);
    setDemoExhibit(openExhibit);
    const push = (fn, ms) => timers.current.push(setTimeout(fn, dur(ms)));
    for (let i = 1; i <= TOTAL_SECTIONS; i++) push(() => setVisible(i), i * 350);
    push(() => setGenerating(false), TOTAL_SECTIONS * 350 + 150);
  }, []);

  useEffect(() => clearAll, []);

  // arriving from the vault "Compile Case Report" dive → auto-assemble (open E-114).
  // The intent is also mirrored to sessionStorage by the vault so this survives the
  // WebGL-teardown reload that can drop router state on the 3D→2D handoff.
  // No ref-guard: under StrictMode the mount effect's timers get cleared by the
  // clearAll cleanup, so we must let the re-invoked effect reschedule generation.
  useEffect(() => {
    let arrival = compileState.fromCompile ? { cinematic: compileState.cinematic } : null;
    if (!arrival) {
      try {
        const v = sessionStorage.getItem('aegisx.compileArrival');
        if (v) arrival = JSON.parse(v);
      } catch {
        /* ignore */
      }
    }
    if (!arrival) return undefined;
    generate(true);
    if (arrival.cinematic) {
      setLanding(true);
      const t = setTimeout(() => setLanding(false), dur(2600));
      return () => clearTimeout(t);
    }
    return undefined;
  }, [compileState.fromCompile, compileState.cinematic, generate]);

  // scrollspy across all 11 sections
  useEffect(() => {
    if (visible < TOTAL_SECTIONS) return undefined;
    const els = REPORT_SECTIONS.map((t) => document.getElementById(t.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-15% 0px -75% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [visible]);

  const generated = visible >= TOTAL_SECTIONS && !generating;
  const show = (n) => visible >= n;
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const signSeal = () => {
    if (sealed || sealing) return;
    setSealing(true);
    // Compile intent has served its purpose once we seal — stop auto-regenerating.
    try {
      sessionStorage.removeItem('aegisx.compileArrival');
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => {
      setSealing(false);
      setSealed(true);
      setReportSealed(true); // flips the 3D vault crown gem green (persisted)
      setToast(true);
      timers.current.push(setTimeout(() => setToast(false), dur(4200)));
    }, dur(1600));
    timers.current.push(t);
  };

  const top3 = RISK_QUEUE.slice(0, 3);

  return (
    <>
      {landing && <CitationLanding chips={CITATION_CHIPS} />}

      {/* seal toast */}
      {toast && (
        <div className="no-print fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 animate-fade-in">
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-navy-950/95 px-4 py-2.5 text-sm font-semibold text-emerald-300 shadow-elev-3">
            <Lock size={15} /> Report sealed · hash anchored to custody chain
          </div>
        </div>
      )}

      {/* once sealed, a persistent CTA closes the loop back to the (now green-gem) Vault */}
      {sealed && (
        <div className="no-print fixed bottom-6 right-6 z-[80] animate-fade-in">
          <button
            onClick={() => navigate('/')}
            className="cta-pulse flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-500 px-4 py-2.5 text-sm font-bold text-navy-950 shadow-glow-sm transition-all hover:shadow-glow"
          >
            <ShieldCheck size={16} /> Return to Vault
          </button>
        </div>
      )}

      <div className="no-print">
        <PageHeader
          eyebrow="MODULE 10 · AUTOMATED REPORTING"
          title="Court-Ready Report"
          subtitle={`${REPORT_META.id} · BSA 2023 §63 · SHA-256 chain of custody · HERAM/ECS validated`}
          accent="#34d399"
          actions={
            <div className="flex items-center gap-2">
              <button
                onClick={() => generate(false)}
                disabled={generating}
                data-demo="report-generate"
                className="flex items-center gap-2 rounded-lg bg-surface-2 px-4 py-2 text-sm font-semibold text-ink-hi transition-all hover:bg-surface-3 disabled:opacity-60"
              >
                {generating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} className="text-cyan-accent" />}
                {generating ? 'Assembling…' : visible === 0 ? 'Generate report' : 'Regenerate'}
              </button>
              <button
                onClick={signSeal}
                disabled={!generated || sealed || sealing}
                data-demo="report-seal"
                className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-navy-950 transition-all hover:shadow-glow disabled:opacity-40"
              >
                {sealing ? <Loader2 size={16} className="animate-spin" /> : sealed ? <CheckCircle2 size={16} /> : <PenTool size={16} />}
                {sealed ? 'Sealed' : sealing ? 'Signing…' : 'Sign & Seal'}
              </button>
              <button
                onClick={() => window.print()}
                disabled={!generated}
                className="flex items-center gap-2 rounded-lg bg-cyan-accent px-4 py-2 text-sm font-semibold text-navy-950 transition-all hover:shadow-glow disabled:opacity-40"
              >
                <Download size={16} /> Export PDF
              </button>
            </div>
          }
        />
      </div>

      {/* empty state */}
      {visible === 0 && !generating && (
        <div className="no-print card mx-auto max-w-3xl p-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/20 to-cyan-accent/20 ring-1 ring-emerald-400/30">
            <FileCheck2 className="text-emerald-400" size={30} />
          </div>
          <div className="text-sm text-ink-hi">Auto-generate the {REPORT_META.totalPages}-page court report for {CASE.id} — {REPORT_META.id}.</div>
          <div className="mt-2 text-xs text-ink-low">11 sections · §63 certified · ECS-gated · provenance-spined</div>
          <button onClick={() => generate(false)} className="mx-auto mt-6 flex items-center gap-2 rounded-lg bg-cyan-accent px-4 py-2 text-sm font-semibold text-navy-950 transition-all hover:shadow-glow">
            <Sparkles size={16} /> Generate report
          </button>
        </div>
      )}

      {generating && (
        <div className="no-print mx-auto mb-4 flex max-w-3xl items-center gap-3 rounded-lg border border-cyan-accent/30 bg-cyan-accent/5 px-4 py-2.5 text-xs text-ink-mid">
          <Loader2 size={16} className="animate-spin text-cyan-accent" />
          Assembling section {Math.min(visible + 1, TOTAL_SECTIONS)}/{TOTAL_SECTIONS}…
        </div>
      )}

      {visible > 0 && (
        <div className="flex justify-center gap-5">
          {/* TOC rail */}
          <div className="no-print sticky top-2 hidden w-48 shrink-0 self-start lg:block">
            <div className="card p-3">
              <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-label text-ink-low">
                <ListTree size={12} /> Contents
              </div>
              <div className="space-y-0.5">
                {REPORT_SECTIONS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => scrollTo(t.id)}
                    className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${active === t.id ? 'bg-surface-2 text-cyan-accent' : 'text-ink-mid hover:text-ink-hi'}`}
                  >
                    <span className="mono w-4 text-ink-low">{t.n}</span> {t.label}
                  </button>
                ))}
              </div>
            </div>
            {generated && (
              <div className="card mt-3 p-3 text-[11px]">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-300">
                  <ShieldCheck size={13} /> HERAM {CANON.reportGrounded}/{CANON.reportTotal}
                </div>
                <p className="mt-1 text-ink-mid">1 statement below the ECS gate ({'<'} {CANON.ecsGate}) excluded — see Appendix C.</p>
                {sealed && <div className="mt-2 flex items-center gap-1.5 font-semibold text-emerald-400"><Lock size={12} /> Sealed & anchored</div>}
              </div>
            )}
          </div>

          {/* PAPER ARTIFACT */}
          <div className="paper relative w-full max-w-3xl overflow-hidden rounded-xl bg-[#F6F7FA] font-serif text-slate-800 shadow-elev-3 ring-1 ring-slate-300/40">
            {/* DRAFT watermark (dissolves on seal) */}
            <div className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-1000 ${sealed ? 'opacity-0' : 'opacity-100'}`}>
              <span className="-rotate-[28deg] select-none text-[52px] font-bold uppercase tracking-widest text-slate-900/[0.06]">
                Draft — Pending Signature
              </span>
            </div>
            {sealed && (
              <div className="pointer-events-none absolute right-6 top-24 z-20 -rotate-12 rounded-lg border-2 border-emerald-600/70 px-3 py-1 text-sm font-bold uppercase tracking-widest text-emerald-700/80">
                Sealed
              </div>
            )}

            {/* 1 — COVER */}
            <section id="sec-cover" className={`report-section ${show(1) ? 'animate-fade-in' : 'invisible'}`}>
              <ClassStrip pos="top" />
              <div className="px-8 pb-6 pt-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-800">
                      <ShieldCheck size={26} className="text-slate-800" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-slate-900">Digital Evidence Analysis Report</div>
                      <div className="text-xs text-slate-500">{CASE.unit} · {CASE.jurisdiction}</div>
                    </div>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded border border-slate-300 bg-white">
                    <QrCode size={44} className="text-slate-700" />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-2 text-[13px]">
                  {[
                    ['Case reference', CASE.id],
                    ['Operation', CASE.name],
                    ['Report ID', REPORT_META.id],
                    ['Requesting officer', REPORT_META.requestingOfficer],
                    ['Unit', REPORT_META.unit],
                    ['Date generated', new Date().toISOString().slice(0, 10)],
                    ['Classification', REPORT_META.classification],
                    ['Verification stub', REPORT_META.verifyStub],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 border-b border-slate-200 py-1">
                      <span className="text-slate-500">{k}</span>
                      <span className={`text-right ${k === 'Report ID' || k === 'Case reference' || k === 'Verification stub' ? 'font-mono text-[11px]' : 'font-semibold'} text-slate-800`}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <ClassStrip pos="bottom" />
              <PageFurniture sectionId="sec-cover" />
            </section>

            {/* 2 — EXECUTIVE SUMMARY */}
            <Section id="sec-summary" show={show(2)}>
              <h3 className="mb-2 text-base font-bold text-slate-900"><span className="font-mono text-slate-400">§2</span> Executive Summary</h3>
              <p className="text-[13px] leading-[1.65] text-slate-700">
                Three devices ({CASE.dataVolume}, {KPIS.filesProcessed.toLocaleString()} objects) seized under {CASE.name} were ingested,
                sealed to WORM storage, and auto-triaged by AEGIS-X in {KPIS.triageMinutes} minutes. Known-hash disposition cleared{' '}
                {CANON.disposedPct}% of the corpus without human viewing, leaving <b>{KPIS.flagged} flagged artifacts</b> ({CANON.flaggedA} Category-A).
                Findings are attributed primarily to Subject-A, with distribution via Subject-B and financing traced to a previously unknown
                Subject-C through crypto peel-chain analysis. {KPIS.synthetic} files were assessed AI-generated, and the case links to 2 prior
                cases via cross-case fusion. A grooming → production → distribution sequence was reconstructed; Minor-V1 (a victim reference,
                never depicted) has been referred for safeguarding.
              </p>
              <div className="no-print mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800">
                <ShieldCheck size={12} /> {CANON.reportGrounded}/{CANON.reportTotal} statements grounded · 1 excluded (0.71 {'<'} {CANON.ecsGate})
              </div>
              <ProvenanceFooter sectionId="sec-summary" />
            </Section>

            {/* 3 — SEIZURE & CHAIN OF CUSTODY */}
            <Section id="sec-custody" show={show(3)}>
              <h3 className="mb-3 text-base font-bold text-slate-900"><span className="font-mono text-slate-400">§3</span> Seizure & Chain of Custody</h3>
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-slate-300 text-left text-slate-500">
                    <th className="py-1 pr-2 font-semibold">Device</th><th className="py-1 pr-2 font-semibold">Seized</th>
                    <th className="py-1 pr-2 font-semibold">Location</th><th className="py-1 pr-2 font-semibold">Officer</th>
                    <th className="py-1 pr-2 font-semibold">Write-blocker</th><th className="py-1 pr-2 font-semibold">Sealed</th><th className="py-1 font-semibold">PQC</th>
                  </tr>
                </thead>
                <tbody>
                  {SEIZURE.map((d) => (
                    <tr key={d.id} className="border-b border-slate-100 text-slate-700">
                      <td className="py-1 pr-2 font-mono">{d.id}</td><td className="py-1 pr-2 font-mono text-[10px]">{d.seized}</td>
                      <td className="py-1 pr-2">{d.location}</td><td className="py-1 pr-2">{d.officer}</td>
                      <td className="py-1 pr-2 text-[10px]">{d.writeBlocker}</td><td className="py-1 pr-2 font-mono text-[10px]">{d.seal}</td>
                      <td className="py-1 text-emerald-700">{d.mldsa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Custody event log</div>
              <div className="mt-1 space-y-0.5">
                {CUSTODY_LOG.map((c, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 border-b border-slate-100 py-1 text-[11px]">
                    <span className="font-mono text-[10px] text-slate-500">{c.t}</span>
                    <span className="flex-1 text-slate-700">{c.action}</span>
                    <span className="text-slate-500">{c.actor}</span>
                    <span className="font-mono text-[10px] text-slate-400">{c.hash}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-lg border border-slate-200 bg-white p-2.5 text-[11px] text-slate-600">
                <Boxes size={12} className="mr-1 inline text-slate-500" /> Edge-Kit <b>{EDGE_KIT.id}</b> scene manifest referenced — {EDGE_KIT.preTriaged.toLocaleString()} objects pre-triaged offline at seizure. {EDGE_KIT.note}
              </div>
            </Section>

            {/* 4 — METHODOLOGY */}
            <Section id="sec-method" show={show(4)}>
              <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-slate-900"><span className="font-mono text-slate-400">§4</span> <Cpu size={15} /> Methodology (reproducible on demand)</h3>
              <div className="space-y-1.5">
                {METHODOLOGY.map((m) => (
                  <p key={m.engine} className="text-[12px] leading-[1.6] text-slate-700"><b>{m.engine}.</b> {m.text}</p>
                ))}
              </div>
              <div className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Model Registry — pinned to this case</div>
              <table className="mt-1 w-full text-[11px]">
                <thead>
                  <tr className="border-b border-slate-300 text-left text-slate-500">
                    <th className="py-1 pr-2 font-semibold">Model</th><th className="py-1 pr-2 font-semibold">Version</th>
                    <th className="py-1 pr-2 font-semibold">Weights SHA-256</th><th className="py-1 pr-2 font-semibold">Precision</th><th className="py-1 font-semibold">Recall</th>
                  </tr>
                </thead>
                <tbody>
                  {MODEL_REGISTRY.map((m) => (
                    <tr key={m.model} className="border-b border-slate-100 text-slate-700">
                      <td className="py-1 pr-2 font-semibold">{m.model}</td><td className="py-1 pr-2 font-mono">{m.ver}</td>
                      <td className="py-1 pr-2 font-mono text-[10px]">{m.sha}</td>
                      <td className="py-1 pr-2 font-mono">{m.p.toFixed(3)}</td><td className="py-1 font-mono">{m.r.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 rounded-lg border border-indigo-200 bg-indigo-50 p-2.5 font-mono text-[11px] text-indigo-900">
                <div className="font-sans font-semibold">Enclave attestation</div>
                <div className="mt-0.5">{ENCLAVE.platform}</div>
                <div>measurement {ENCLAVE.measurement}</div>
                <div className="font-sans text-[10px] text-indigo-700">{ENCLAVE.note}</div>
              </div>
            </Section>

            {/* 5 — FINDINGS: CONTENT */}
            <Section id="sec-content" show={show(5)}>
              <h3 className="mb-1 text-base font-bold text-slate-900"><span className="font-mono text-slate-400">§5</span> Findings — Content Analysis</h3>
              <p className="mb-3 text-[11px] text-slate-500">12 key exhibits · each row expands to a provenance proof-tree (Claim → statute → evidence ID → SHA-256 → XAI).</p>
              <div className="space-y-1.5">
                {EXHIBITS.map((ex) => (
                  <ExhibitRow key={ex.id} ex={ex} defaultOpen={demoExhibit && ex.id === EXHIBIT_DEFAULT_OPEN} />
                ))}
              </div>
              <ProvenanceFooter sectionId="sec-content" />
            </Section>

            {/* 6 — FINDINGS: ENTITY NETWORK */}
            <Section id="sec-entity" show={show(6)}>
              <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-slate-900"><span className="font-mono text-slate-400">§6</span> <Share2 size={15} /> Findings — Entity Network</h3>
              <StaticGraph />
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-2.5 py-1 font-mono text-[10px] font-semibold text-amber-300">{ENTITY_NARRATIVE.method}</div>
              <p className="mt-2 text-[12px] leading-[1.6] text-slate-700">{ENTITY_NARRATIVE.text}</p>
              <table className="mt-3 w-full text-[11px]">
                <thead>
                  <tr className="border-b border-slate-300 text-left text-slate-500">
                    <th className="py-1 pr-2 font-semibold">Wallet</th><th className="py-1 pr-2 font-semibold">Role</th>
                    <th className="py-1 pr-2 font-semibold">Flow</th><th className="py-1 pr-2 font-semibold">Hops</th><th className="py-1 font-semibold">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {WALLETS.map((w) => (
                    <tr key={w.id} className="border-b border-slate-100 text-slate-700">
                      <td className="py-1 pr-2 font-mono">{w.id}</td><td className="py-1 pr-2">{w.role}</td>
                      <td className="py-1 pr-2 font-mono">{w.flow}</td><td className="py-1 pr-2 font-mono">{w.hops}</td><td className="py-1 text-[10px]">{w.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ProvenanceFooter sectionId="sec-entity" />
            </Section>

            {/* 7 — FINDINGS: TIMELINE */}
            <Section id="sec-timeline" show={show(7)}>
              <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-slate-900"><span className="font-mono text-slate-400">§7</span> <Clock size={15} /> Findings — Timeline</h3>
              <div className="mb-3 flex h-6 overflow-hidden rounded">
                {[['grooming', 3], ['production', 2], ['distribution', 4]].map(([ph, f]) => (
                  <div key={ph} className="flex items-center justify-center text-[9px] font-bold uppercase tracking-wide text-white" style={{ flex: f, background: PHASE_COLOR[ph] }}>{ph}</div>
                ))}
              </div>
              <div className="space-y-0.5">
                {PIVOTAL_EVENTS.map((e, i) => (
                  <div key={i} className="flex items-center gap-3 border-b border-slate-100 py-1 text-[11px]">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: PHASE_COLOR[e.phase] }} />
                    <span className="font-mono text-[10px] text-slate-500">{e.t}</span>
                    <span className="flex-1 text-slate-700">{e.label}</span>
                    <span className="font-mono text-[10px] text-slate-400">{e.dev}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-[11px] text-amber-900">
                <b>Clock-drift disclosure.</b> {CLOCK_DRIFT}
              </div>
              <ProvenanceFooter sectionId="sec-timeline" />
            </Section>

            {/* 8 — FINDINGS: SYNTHETIC */}
            <Section id="sec-synth" show={show(8)}>
              <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-slate-900"><span className="font-mono text-slate-400">§8</span> <ShieldAlert size={15} /> Findings — Synthetic Media</h3>
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-slate-300 text-left text-slate-500">
                    <th className="py-1 pr-2 font-semibold">File</th><th className="py-1 pr-2 font-semibold">Texture</th>
                    <th className="py-1 pr-2 font-semibold">Geometry</th><th className="py-1 pr-2 font-semibold">Semantic</th><th className="py-1 font-semibold">Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {SYNTHETIC_FILES.map((f) => (
                    <tr key={f.id} className="border-b border-slate-100 text-slate-700">
                      <td className="py-1 pr-2 font-mono">{f.id}</td>
                      <td className="py-1 pr-2 font-mono">{f.streams[0].score.toFixed(1)}%</td>
                      <td className="py-1 pr-2 font-mono">{f.streams[1].score.toFixed(1)}%</td>
                      <td className="py-1 pr-2 font-mono">{f.streams[2].score.toFixed(1)}%</td>
                      <td className="py-1 font-semibold text-rose-600">{f.verdict} {f.score.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 rounded-lg border border-slate-200 bg-white p-2.5 text-[11px] text-slate-600">
                <b>C2PA:</b> {PROVENANCE.c2pa} — {PROVENANCE.c2paNote} <b className="ml-1">SynthID:</b> {PROVENANCE.synthid}.
              </div>
              <p className="mt-2 text-[11px] italic leading-[1.6] text-slate-600">
                Legal note: synthetic Category-A media remains actionable (POCSO §14 + IT Act §67B). A synthetic verdict changes the victim-identification
                workflow but not the offence.
              </p>
              <ProvenanceFooter sectionId="sec-synth" />
            </Section>

            {/* 9 — RISK & LEADS */}
            <Section id="sec-risk" show={show(9)}>
              <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-slate-900"><span className="font-mono text-slate-400">§9</span> <Scale size={15} /> Risk Assessment & Leads</h3>
              <div className="space-y-2">
                {top3.map((lead) => {
                  const bd = RISK_BREAKDOWN[lead.id] || [];
                  return (
                    <div key={lead.id} className="rounded-lg border border-slate-200 bg-white p-2.5">
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="font-semibold text-slate-800"><span className="font-mono">{lead.id}</span> · {lead.type}</span>
                        <span className="font-mono font-bold text-rose-600">{lead.score}</span>
                      </div>
                      <div className="mt-1.5 flex h-2.5 overflow-hidden rounded-full">
                        {bd.map((b) => (<div key={b.k} style={{ width: `${b.v}%`, background: b.c }} title={`${b.k} ${b.v}`} />))}
                      </div>
                      <div className="mt-1 flex justify-between text-[10px] text-slate-500">
                        <span>SLA {lead.sla}h · {lead.status}</span><span>{lead.assignee}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 rounded-lg border border-cyan-300 bg-cyan-50 p-2.5 text-[11px] text-cyan-900">
                <b>Cross-case fusion disclosure.</b> {JOINT_DISCLOSURE}
              </div>
              <ProvenanceFooter sectionId="sec-risk" />
            </Section>

            {/* 10 — §63 CERTIFICATE */}
            <Section id="sec-cert" show={show(10)}>
              <h3 className="mb-3 text-base font-bold text-slate-900"><span className="font-mono text-slate-400">§10</span> BSA 2023 §63 Certificate (Dual-Part)</h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-slate-300 bg-white p-4">
                  <div className="mb-1 text-xs font-bold text-slate-800">Part A — Source device identification</div>
                  <table className="w-full text-[11px]">
                    <tbody>
                      {CERT_PARTICULARS.map(([k, v]) => (
                        <tr key={k}><td className="py-0.5 pr-2 align-top text-slate-500">{k}</td><td className="py-0.5 text-right font-mono text-[10px] text-slate-700">{v}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="rounded-lg border border-slate-300 bg-white p-4">
                  <div className="mb-1 text-xs font-bold text-slate-800">Part B — Hash attestation</div>
                  <p className="text-[11px] leading-[1.6] text-slate-600">
                    I certify that each electronic record in the manifest was produced by AEGIS-X operating properly in an air-gapped,
                    access-controlled environment; that each artifact's SHA-256 hash matches the value sealed at acquisition; and that all
                    AI-derived statements were HERAM-scored with only ECS ≥ {CANON.ecsGate} retained.
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-emerald-300 bg-emerald-50 p-3">
                <span className="text-xs font-semibold text-emerald-800">HERAM / ECS Validation Stamp — findings above threshold</span>
                <span className="flex gap-2">
                  <span className="rounded bg-emerald-600 px-2 py-0.5 text-[11px] font-semibold text-white">ECS ≥ {CANON.ecsGate} · PASS</span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-white">§63 READY</span>
                </span>
              </div>
              {/* signature blocks */}
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  ['Inv. #A-2291', 'Investigating Officer'],
                  ['SHO · R-1180', 'Station House Officer'],
                  ['Examiner #A-2291', 'Certifying Examiner'],
                ].map(([name, role]) => (
                  <div key={role}>
                    <div className="mb-6 text-[10px] text-slate-500">Digitally signed &amp; sealed</div>
                    <div className="border-t border-slate-400 pt-1">
                      {sealed || sealing ? <TypedName name={name} active={sealing || sealed} /> : <span className="text-slate-300">—</span>}
                    </div>
                    <div className="text-[10px] text-slate-500">{role}</div>
                    <div className="font-mono text-[9px] text-slate-400">Date: {new Date().toISOString().slice(0, 10)}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-end font-mono text-[10px] text-emerald-700">Report hash: sha256:4e07…b49fce {sealed && <Lock size={11} className="ml-1 inline" />}</div>
            </Section>

            {/* 11 — APPENDICES */}
            <Section id="sec-appendix" show={show(11)}>
              <h3 className="mb-3 text-base font-bold text-slate-900"><span className="font-mono text-slate-400">§11</span> Appendices</h3>

              {/* A — hash manifest */}
              <div className="mb-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[12px] font-bold text-slate-800">A · Hash Manifest <span className="font-normal text-slate-500">(24 of {CANON.flagged} shown)</span></span>
                  <button title="Mock — manifest export stub" className="no-print flex items-center gap-1 rounded bg-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-700 hover:bg-slate-300"><Download size={11} /> Download manifest</button>
                </div>
                <div className="max-h-44 overflow-y-auto rounded border border-slate-200">
                  <table className="w-full text-[10px]">
                    <tbody>
                      {HASH_MANIFEST.map((h) => (
                        <tr key={h.id} className="border-b border-slate-100 text-slate-600">
                          <td className="py-0.5 px-2 font-mono">{h.id}</td><td className="py-0.5 px-2 font-mono">{h.dev}</td>
                          <td className="py-0.5 px-2 font-semibold">{h.cat}</td><td className="py-0.5 px-2 font-mono">{h.sha}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* B — model registry (full ref) */}
              <div className="mb-4">
                <div className="mb-1 text-[12px] font-bold text-slate-800">B · Model Registry (full)</div>
                <table className="w-full text-[10px]">
                  <tbody>
                    {MODEL_REGISTRY.map((m) => (
                      <tr key={m.model} className="border-b border-slate-100 text-slate-600">
                        <td className="py-0.5 px-2 font-semibold">{m.model}</td><td className="py-0.5 px-2 font-mono">{m.ver}</td>
                        <td className="py-0.5 px-2 font-mono">{m.sha}</td><td className="py-0.5 px-2 font-mono">P {m.p.toFixed(3)} · R {m.r.toFixed(3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* C — ECS audit log (all 42, 1 struck) */}
              <div className="mb-4">
                <div className="mb-1 text-[12px] font-bold text-slate-800">C · ECS Audit Log <span className="font-normal text-slate-500">— all {CANON.reportTotal} statements · gate ≥ {CANON.ecsGate}</span></div>
                <div className="max-h-52 overflow-y-auto rounded border border-slate-200">
                  {ECS_AUDIT.map((s) => (
                    <div key={s.n} className={`flex items-start justify-between gap-2 border-b border-slate-100 px-2 py-0.5 text-[10px] ${s.excluded ? 'bg-rose-50' : ''}`}>
                      <span className={`flex-1 ${s.excluded ? 'text-rose-600 line-through' : 'text-slate-600'}`}>
                        <span className="mr-1 font-mono text-slate-400">{s.n}.</span>{s.text}
                      </span>
                      <span className={`font-mono font-semibold ${s.excluded ? 'text-rose-600' : s.score >= CANON.ecsGate ? 'text-emerald-600' : 'text-rose-600'}`}>{s.score.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-1 flex items-start gap-1.5 rounded border border-rose-200 bg-rose-50 px-2 py-1 text-[10px] text-rose-700">
                  <X size={11} className="mt-0.5 shrink-0" /> <span><b>Statement 41 excluded (0.71 {'<'} {CANON.ecsGate}).</b> {ECS_EXCLUDED_REASON}</span>
                </div>
              </div>

              {/* D — glossary */}
              <div>
                <div className="mb-1 text-[12px] font-bold text-slate-800">D · Glossary</div>
                <dl className="space-y-1 text-[10px]">
                  {GLOSSARY.map(([term, def]) => (
                    <div key={term} className="flex gap-2">
                      <dt className="w-32 shrink-0 font-semibold text-slate-700">{term}</dt>
                      <dd className="text-slate-600">{def}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Section>
          </div>
        </div>
      )}

      {generated && (
        <div className="no-print mx-auto mt-3 flex max-w-3xl animate-fade-in items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-sm">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <div className="flex-1">
            <span className="font-semibold text-emerald-300">HERAM validation: {CANON.reportGrounded}/{CANON.reportTotal} statements grounded.</span>
            <span className="ml-1 text-ink-mid">1 statement fell below the ECS threshold and was excluded (Appendix C).</span>
          </div>
          <Badge color="#34d399">{((CANON.reportGrounded / CANON.reportTotal) * 100).toFixed(1)}% grounded</Badge>
        </div>
      )}
    </>
  );
}
