import { useEffect } from 'react';
import { CAT_META } from '../data/mockData';

export function useDocumentTitle(title) {
  useEffect(() => {
    const prev = document.title;
    document.title = `${title} · AEGIS-X`;
    return () => {
      document.title = prev;
    };
  }, [title]);
}

export function CatBadge({ cat, className = '' }) {
  const m = CAT_META[cat];
  if (!m) return null;
  return (
    <span
      className={`badge ${m.bg} ${m.text} ring-1 ${m.ring} ${className}`}
      style={{ boxShadow: `0 0 8px ${m.color}22` }}
    >
      {m.label}
    </span>
  );
}

export function Badge({ children, color = '#22d3ee', className = '' }) {
  return (
    <span
      className={`badge ${className}`}
      style={{ background: `${color}1a`, color, boxShadow: `0 0 8px ${color}22` }}
    >
      {children}
    </span>
  );
}

export function Sparkline({ data, color = '#22d3ee', width = 46, height = 18 }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / span) * (height - 2) - 1;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" opacity="0.85" />
      <circle cx={width} cy={pts[pts.length - 1].split(',')[1]} r="1.6" fill={color} />
    </svg>
  );
}

export function KpiCard({ icon: Icon, label, value, sub, accent = '#22d3ee', pulse, spark }) {
  return (
    <div className="card card-hover group relative overflow-hidden p-4">
      <div
        className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-25"
        style={{ background: accent }}
      />
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-medium uppercase tracking-label text-ink-mid">{label}</span>
        {Icon && <Icon size={18} style={{ color: accent }} className={pulse ? 'animate-pulse-slow' : ''} />}
      </div>
      <div className="kpi-value mt-2" style={{ textShadow: `0 0 18px ${accent}33` }}>
        {value}
      </div>
      <div className="mt-1 flex items-end justify-between">
        {sub && <div className="text-xs text-ink-low">{sub}</div>}
        {spark && (
          <div className="ml-auto opacity-70 transition-opacity group-hover:opacity-100">
            <Sparkline data={spark} color={accent} />
          </div>
        )}
      </div>
    </div>
  );
}

export function SectionTitle({ children, right }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-label text-ink-mid">
        <span className="h-4 w-1 rounded-full bg-cyan-accent shadow-glow-sm" />
        {children}
      </h2>
      {right}
    </div>
  );
}

export function PageHeader({ eyebrow, title, subtitle, actions, accent = '#22d3ee' }) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          {eyebrow && <div className="eyebrow mb-1.5">{eyebrow}</div>}
          <h1 className="text-[28px] font-bold leading-tight tracking-tightest text-white">{title}</h1>
          <div className="mt-2 h-[3px] w-14 rounded-full" style={{ background: accent, boxShadow: `0 0 12px ${accent}66` }} />
          {subtitle && <p className="mt-2.5 text-sm text-ink-mid">{subtitle}</p>}
        </div>
        {actions}
      </div>
    </div>
  );
}

export function Score({ value, size = 44 }) {
  const color = value >= 90 ? '#f43f5e' : value >= 75 ? '#f59e0b' : '#22d3ee';
  const r = size / 2 - 4;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#16233c" strokeWidth="4" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={c}
        strokeDashoffset={c - (c * value) / 100}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
    </svg>
  );
}
