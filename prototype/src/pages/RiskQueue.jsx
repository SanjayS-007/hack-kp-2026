import { useState, useEffect } from 'react';
import { AlertTriangle, Timer, X, Gauge, RefreshCw } from 'lucide-react';
import { RISK_QUEUE, RISK_BREAKDOWN, CAT_META } from '../data/mockData';
import { CatBadge, PageHeader, Badge, useDocumentTitle } from '../components/ui';

function fmt(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m.toString().padStart(2, '0')}m`;
}

function StatusPill({ status }) {
  const map = {
    Escalated: { bg: 'bg-risk-a/15', t: 'text-rose-300' },
    'In review': { bg: 'bg-amber-500/15', t: 'text-amber-300' },
    Queued: { bg: 'bg-indigo-500/15', t: 'text-indigo-300' },
    Monitoring: { bg: 'bg-slate-500/15', t: 'text-slate-300' },
  };
  const m = map[status] || map.Monitoring;
  return <span className={`badge ${m.bg} ${m.t}`}>{status}</span>;
}

function DetailDrawer({ lead, onClose }) {
  const m = CAT_META[lead.cat];
  const breakdown = RISK_BREAKDOWN[lead.id] || [
    { k: 'Content severity', v: Math.round(lead.score * 0.4), c: '#f43f5e' },
    { k: 'Behavioral anomaly', v: Math.round(lead.score * 0.25), c: '#f59e0b' },
    { k: 'Network centrality', v: Math.round(lead.score * 0.22), c: '#818cf8' },
    { k: 'Recency', v: lead.score - Math.round(lead.score * 0.87), c: '#22d3ee' },
  ];
  return (
    <div className="card-3 sticky top-2 w-80 shrink-0 animate-fade-in self-start p-4">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="mono text-sm font-bold text-cyan-accent">{lead.id}</div>
          <div className="text-lg font-bold text-white">{lead.subject}</div>
        </div>
        <button onClick={onClose} className="text-ink-low hover:text-ink-hi" aria-label="Close">
          <X size={16} />
        </button>
      </div>
      <div className="mb-3 flex flex-wrap gap-2">
        <CatBadge cat={lead.cat} />
        <StatusPill status={lead.status} />
      </div>
      <p className="text-sm text-ink-mid">{lead.type}</p>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-[11px] uppercase tracking-label text-ink-low">
          <span className="flex items-center gap-1.5">
            <Gauge size={12} /> Composite score
          </span>
          <span className="mono text-lg font-bold" style={{ color: m.color }}>
            {lead.score}
          </span>
        </div>
        {/* stacked composite bar */}
        <div className="flex h-3 overflow-hidden rounded-full bg-navy-800">
          {breakdown.map((b) => (
            <div key={b.k} style={{ width: `${b.v}%`, background: b.c }} title={`${b.k}: ${b.v}`} />
          ))}
        </div>
        <div className="mt-2 space-y-1.5">
          {breakdown.map((b) => (
            <div key={b.k} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-ink-mid">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: b.c }} /> {b.k}
              </span>
              <span className="mono font-semibold text-white">+{b.v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-1.5 border-t border-white/5 pt-3 text-xs">
        <div className="flex justify-between">
          <span className="text-ink-low">Source</span>
          <span className="mono text-ink-hi">{lead.device}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-low">Assignee</span>
          <span className="text-ink-hi">{lead.assignee}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-low">SLA remaining</span>
          <span className="mono text-ink-hi">{fmt(lead.sla)}</span>
        </div>
      </div>

      <button className="mt-4 w-full rounded-lg bg-risk-a/15 px-3 py-2 text-xs font-semibold text-rose-300 ring-1 ring-rose-500/30 hover:bg-risk-a/25">
        Escalate for immediate action
      </button>
    </div>
  );
}

export default function RiskQueue() {
  useDocumentTitle('Risk Queue');
  const [tick, setTick] = useState(0);
  const [openId, setOpenId] = useState(null);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const rows = [...RISK_QUEUE].sort((a, b) => b.score - a.score);
  const escalations = rows.filter((r) => r.status === 'Escalated').length;
  const inReview = rows.filter((r) => r.status === 'In review').length;
  const queued = rows.filter((r) => r.status === 'Queued').length;
  const open = openId ? rows.find((r) => r.id === openId) : null;

  return (
    <>
      <PageHeader
        eyebrow="MODULE 11 · LEAD PRIORITIZER"
        title="Lead Prioritizer — Risk Queue"
        subtitle="Composite severity (SAP A–C) · active-abuse escalation · SLA-tracked"
        accent="#f43f5e"
        actions={
          <Badge color="#f43f5e">
            <AlertTriangle size={12} /> {escalations} active-abuse escalation
          </Badge>
        }
      />

      {/* summary strip */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1.5 rounded-lg bg-risk-a/10 px-3 py-1.5 text-xs font-semibold text-rose-300">
            <span className="mono">{escalations}</span> escalation
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300">
            <span className="mono">{inReview}</span> in review
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300">
            <span className="mono">{queued}</span> queued
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-ink-low">
          <RefreshCw size={12} className="text-cyan-accent" /> Auto-prioritized by AEGIS-X · last recompute{' '}
          <span className="mono text-ink-mid">00:12 ago</span>
        </span>
      </div>

      <div className="flex gap-4">
        <div className="card min-w-0 flex-1 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-navy-950/40 text-left text-[11px] uppercase tracking-label text-ink-low">
                <th className="px-4 py-3 font-semibold">Lead</th>
                <th className="px-4 py-3 font-semibold">Subject</th>
                <th className="px-4 py-3 font-semibold">Cat</th>
                <th className="px-4 py-3 font-semibold">Risk Score</th>
                <th className="px-4 py-3 font-semibold">Indicator</th>
                <th className="px-4 py-3 font-semibold">SLA</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const remaining = Math.max(0, r.sla * 60 - tick);
                const urgent = r.status === 'Escalated';
                const color = r.score >= 90 ? '#f43f5e' : r.score >= 75 ? '#f59e0b' : '#22d3ee';
                return (
                  <tr
                    key={r.id}
                    onClick={() => setOpenId(r.id)}
                    className={`relative cursor-pointer border-b border-white/5 transition-colors hover:bg-surface-2/40 ${
                      openId === r.id ? 'bg-surface-2/60' : ''
                    }`}
                  >
                    <td className="relative px-4 py-3">
                      <span
                        className={`absolute inset-y-0 left-0 w-[3px] ${urgent ? 'animate-pulse-slow' : ''}`}
                        style={{ background: CAT_META[r.cat].color, boxShadow: urgent ? `0 0 8px ${CAT_META[r.cat].color}` : 'none' }}
                      />
                      <span className="mono text-cyan-accent">{r.id}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-ink-hi">{r.subject}</td>
                    <td className="px-4 py-3">
                      <CatBadge cat={r.cat} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-navy-800">
                          <div className="h-full rounded-full" style={{ width: `${r.score}%`, background: color }} />
                        </div>
                        <span className="mono font-bold text-white">{r.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-mid">{r.type}</td>
                    <td className="px-4 py-3">
                      <span className={`mono flex items-center gap-1.5 font-semibold ${urgent ? 'text-rose-400' : 'text-ink-mid'}`}>
                        <Timer size={13} className={urgent ? 'animate-pulse-slow' : ''} />
                        {fmt(Math.floor(remaining / 60))}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={r.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {open && <DetailDrawer lead={open} onClose={() => setOpenId(null)} />}
      </div>

      <p className="mt-3 text-xs text-ink-low">
        Composite score fuses content severity, victim-presence, behavioral anomaly, and network centrality. Click a row
        for the full breakdown. Active-abuse indicators auto-escalate with a hard SLA to safeguard identified minors
        first.
      </p>
    </>
  );
}
