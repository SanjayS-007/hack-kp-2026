import { useEffect, useState, useRef } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from 'recharts';
import {
  FileStack,
  Flag,
  AlertTriangle,
  Bot,
  Timer,
  HardDrive,
  Activity,
  ShieldHalf,
  Network,
  PackageCheck,
} from 'lucide-react';
import {
  CASE,
  KPIS,
  RISK_DONUT,
  DEVICES,
  ACTIVITY_FEED,
  ACTIVITY_POOL,
  INGEST_TREND,
  KPI_SPARKS,
  GUARDIAN,
  EDGE_KIT,
} from '../data/mockData';
import { CANON } from '../data/canon';
import { KpiCard, SectionTitle, Badge, useDocumentTitle } from '../components/ui';

const pad = (n) => n.toString().padStart(2, '0');
function fmtClock(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

const TAG_COLORS = {
  XAI: '#22d3ee',
  FUSION: '#f59e0b',
  DEEPFAKE: '#ef4444',
  CHRONOS: '#10b981',
  CONTEXT: '#818cf8',
  RISK: '#f472b6',
  CUSTODY: '#22d3ee',
  PERCEPTION: '#a78bfa',
  GRAPH: '#34d399',
  ASK: '#38bdf8',
};

function CaseHeader() {
  return (
    <div className="card relative mb-6 overflow-hidden p-5">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-accent/10 via-transparent to-transparent" />
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-accent/20 to-indigo-500/20 ring-1 ring-cyan-accent/30">
            <ShieldHalf className="text-cyan-accent" size={28} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-white">{CASE.name}</h1>
              <Badge color="#10b981">{CASE.status}</Badge>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
              <span className="mono text-cyan-accent">{CASE.id}</span>
              <span>·</span>
              <span>{CASE.unit}</span>
              <span>·</span>
              <span>{CASE.jurisdiction}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-6 text-right">
          <div>
            <div className="text-xs text-slate-500">Data Seized</div>
            <div className="text-lg font-bold text-white">{CASE.dataVolume}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Opened</div>
            <div className="text-lg font-bold text-white">{CASE.opened}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Lead</div>
            <div className="text-lg font-bold text-white">{CASE.lead}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskDonut() {
  const total = RISK_DONUT.reduce((s, r) => s + r.value, 0);
  const [count, setCount] = useState(0);
  const [hover, setHover] = useState(null);
  useEffect(() => {
    const start = performance.now();
    let raf;
    const step = (now) => {
      const p = Math.min(1, (now - start) / 800);
      setCount(Math.round(total * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [total]);
  return (
    <div className="card p-4">
      <SectionTitle>Risk-Tier Distribution</SectionTitle>
      <div className="relative h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={RISK_DONUT}
              dataKey="value"
              nameKey="label"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={3}
              stroke="none"
              isAnimationActive={false}
            >
              {RISK_DONUT.map((r, i) => (
                <Cell key={r.tier} fill={r.color} opacity={hover == null || hover === i ? 1 : 0.3} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ background: '#101b30', border: '1px solid #16233c', borderRadius: 8, fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div className="mono text-2xl font-bold text-white">{count}</div>
          <div className="text-[10px] uppercase tracking-label text-ink-low">Flagged</div>
        </div>
      </div>
      <div className="mt-2 space-y-1.5">
        {RISK_DONUT.map((r, i) => (
          <div
            key={r.tier}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className={`flex cursor-default items-center justify-between rounded-md px-1.5 py-0.5 text-xs transition-colors ${
              hover === i ? 'bg-surface-2' : ''
            }`}
          >
            <span className="flex items-center gap-2 text-ink-mid">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: r.color }} />
              {r.label}
            </span>
            <span className="mono font-semibold text-white">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IngestPanel() {
  // DEV-03 ingest ticks upward slowly (86 -> 100 over ~3 min); throughput fluctuates.
  const [dev03, setDev03] = useState(DEVICES[2].ingested);
  const [tput, setTput] = useState(16800);

  useEffect(() => {
    const id = setInterval(() => {
      setDev03((v) => (v >= 100 ? 100 : Math.min(100, +(v + 0.16).toFixed(2))));
      setTput(() => 9000 + Math.round(Math.random() * 9000));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const liveTrend = [...INGEST_TREND.slice(0, -1), { t: 'now', files: tput }];

  return (
    <div className="card p-4">
      <SectionTitle right={<Badge color="#10b981">{CANON.dataVolume} · {CANON.filesTotal.toLocaleString()} files</Badge>}>
        Ingest Progress — Seized Devices
      </SectionTitle>
      <div className="space-y-4">
        {DEVICES.map((d, i) => {
          const pct = i === 2 ? dev03 : d.ingested;
          return (
            <div key={d.id}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-200">
                  <HardDrive size={14} style={{ color: d.color }} />
                  <span className="font-semibold">{d.label}</span>
                  <span className="text-slate-500">{d.model}</span>
                </span>
                <span className="mono text-slate-400">
                  {d.files.toLocaleString()} files · {pct.toFixed ? pct.toFixed(0) : pct}%
                  {i === 2 && pct < 100 && (
                    <span className="ml-1 text-cyan-accent">▲</span>
                  )}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-navy-800">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${d.color}, ${d.color}aa)`,
                    boxShadow: `0 0 10px ${d.color}77`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5 h-28">
        <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wider text-slate-500">
          <span>Ingest throughput (files/min)</span>
          <span className="mono text-cyan-accent">{tput.toLocaleString()}/min</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={liveTrend} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="ing" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="t" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#0d1a30', border: '1px solid #1a2c4a', borderRadius: 8, fontSize: 12 }}
            />
            <Area type="monotone" dataKey="files" stroke="#22d3ee" strokeWidth={2} fill="url(#ing)" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ActivityFeed() {
  // Timestamps are relative to page load (never stale); new rows arrive every 4-7s.
  const [items, setItems] = useState(() => {
    const now = Date.now();
    return ACTIVITY_FEED.map((it, i) => ({
      ...it,
      key: `seed-${i}`,
      time: fmtClock(new Date(now - it.ago * 1000)),
    }));
  });
  const poolRef = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    let timer;
    const schedule = () => {
      const delay = 4000 + Math.random() * 3000; // 4-7s
      timer = setTimeout(() => {
        const ev = ACTIVITY_POOL[poolRef.current % ACTIVITY_POOL.length];
        poolRef.current += 1;
        idRef.current += 1;
        setItems((prev) => [
          { ...ev, key: `live-${idRef.current}`, time: fmtClock(new Date()) },
          ...prev,
        ].slice(0, 12));
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="card flex h-full flex-col p-4">
      <SectionTitle
        right={
          <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> LIVE
          </span>
        }
      >
        <span className="flex items-center gap-2">
          <Activity size={14} className="text-cyan-accent" /> AI Activity Feed
        </span>
      </SectionTitle>
      <div className="min-h-0 flex-1 space-y-2 overflow-hidden">
        {items.slice(0, 8).map((it, i) => (
          <div
            key={it.key}
            className="flex animate-slide-in-top items-start gap-2 rounded-lg border border-white/5 bg-surface-2/40 px-3 py-2 text-xs transition-all"
            style={{ opacity: 1 - i * 0.07 }}
          >
            <span className="mono shrink-0 text-slate-500">{it.time}</span>
            <span
              className="badge shrink-0"
              style={{ background: `${TAG_COLORS[it.tag]}1a`, color: TAG_COLORS[it.tag] }}
            >
              {it.tag}
            </span>
            <span className="text-slate-300">{it.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SideStack() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="card card-hover p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
            <Network size={16} />
          </span>
          <div className="text-sm font-semibold text-white">Guardian Network</div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="mono text-2xl font-bold text-white">{GUARDIAN.agencies}</span>
          <span className="text-xs text-ink-mid">agencies · model {GUARDIAN.model}</span>
        </div>
        <p className="mt-1.5 text-[11px] leading-snug text-ink-low">{GUARDIAN.note}</p>
        <div className="mt-2 flex gap-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i < 9 ? '#34d399' : '#22304d' }} />
          ))}
        </div>
      </div>

      <div className="card card-hover p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-accent/15 text-cyan-accent">
            <PackageCheck size={16} />
          </span>
          <div className="text-sm font-semibold text-white">Edge Kit {EDGE_KIT.id}</div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="mono text-2xl font-bold text-white">{EDGE_KIT.preTriaged.toLocaleString()}</span>
          <span className="text-xs text-ink-mid">files pre-triaged</span>
        </div>
        <p className="mt-1.5 text-[11px] leading-snug text-ink-low">{EDGE_KIT.note}</p>
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400" /> Scene manifest sealed
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  useDocumentTitle('Dashboard');
  return (
    <>
      <CaseHeader />

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard icon={FileStack} label="Files Processed" value={KPIS.filesProcessed.toLocaleString()} sub="across 3 devices" accent="#22d3ee" spark={KPI_SPARKS.files} pulse />
        <KpiCard icon={Flag} label="Flagged Items" value={KPIS.flagged} sub="auto-triaged" accent="#f59e0b" spark={KPI_SPARKS.flagged} />
        <KpiCard icon={AlertTriangle} label="High-Risk" value={KPIS.highRisk} sub="Category A" accent="#f43f5e" spark={KPI_SPARKS.highRisk} pulse />
        <KpiCard icon={Bot} label="Synthetic Detected" value={KPIS.synthetic} sub="AI-generated" accent="#e879f9" spark={KPI_SPARKS.synthetic} />
        <KpiCard icon={Timer} label="Triage Time" value={`${KPIS.triageMinutes} min`} sub="vs ~9 months manual" accent="#34d399" spark={KPI_SPARKS.triage} />
        <KpiCard icon={ShieldHalf} label="Review Reduction" value={`${KPIS.reviewReduction}%`} sub="investigator wellbeing" accent="#38bdf8" spark={KPI_SPARKS.reduction} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <RiskDonut />
        <IngestPanel />
        <ActivityFeed />
        <SideStack />
      </div>
    </>
  );
}
