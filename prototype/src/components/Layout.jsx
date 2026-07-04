import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanEye,
  Share2,
  GanttChartSquare,
  MessageSquareText,
  ShieldAlert,
  ListOrdered,
  FileCheck2,
  ShieldCheck,
  Lock,
  Radio,
  Fingerprint,
  Vault,
  FolderInput,
  Cpu,
} from 'lucide-react';
import { NAV, NAV_GROUPS, CASE } from '../data/mockData';
import { useCaseStore } from '../store/caseStore';

const ICONS = {
  Vault,
  LayoutDashboard,
  ScanEye,
  Share2,
  GanttChartSquare,
  MessageSquareText,
  ShieldAlert,
  ListOrdered,
  FileCheck2,
  Cpu,
};

function ConsoleTopbar() {
  const navigate = useNavigate();
  const { active, created } = useCaseStore();
  const c = active || created || CASE;
  return (
    <button
      onClick={() => navigate('/')}
      className="group mb-4 flex items-center gap-2.5 rounded-lg border border-white/5 bg-surface-1/60 px-3 py-1.5 text-xs transition-colors hover:border-cyan-accent/40"
      title="Back to Case Vault"
    >
      <Vault size={14} className="text-cyan-accent" />
      <span className="text-ink-low">Active case</span>
      <span className="mono font-semibold text-cyan-accent">{c.id}</span>
      <span className="text-ink-hi">{c.name}</span>
      <span className="badge bg-emerald-500/15 text-emerald-400">{c.status || 'ACTIVE'}</span>
      <FolderInput size={12} className="text-ink-low transition-colors group-hover:text-cyan-accent" />
    </button>
  );
}

function useUtcClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const pad = (n) => n.toString().padStart(2, '0');

function StatusBar() {
  const now = useUtcClock();
  const [start] = useState(Date.now());
  const utc = `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
  const elapsed = Math.floor((Date.now() - start) / 1000);
  const session = `${pad(Math.floor(elapsed / 3600))}:${pad(Math.floor((elapsed % 3600) / 60))}:${pad(elapsed % 60)}`;

  return (
    <div className="glass relative z-30 flex h-9 items-center justify-between border-b border-white/5 px-4 text-[11px] font-medium tracking-wide">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <Radio size={13} className="animate-pulse-slow" /> AIR-GAPPED
        </span>
        <span className="text-navy-600">·</span>
        <span className="flex items-center gap-1.5 text-cyan-accent">
          <ShieldCheck size={13} /> SOVEREIGN
        </span>
        <span className="text-navy-600">·</span>
        <span className="flex items-center gap-1.5 text-ink-mid">
          <Lock size={13} /> Chain-of-Custody:<span className="font-semibold text-emerald-400">VERIFIED</span>
        </span>
        <span className="text-navy-600">·</span>
        <span className="flex items-center gap-1.5 text-ink-mid">
          <Fingerprint size={13} className="text-accent2" /> Enclave Attestation
          <span className="text-emerald-400">✓</span>
          <span className="mono text-ink-low">0x7f3a…</span>
        </span>
      </div>
      <div className="flex items-center gap-3 text-ink-mid">
        <span className="mono text-ink-low">UTC</span>
        <span className="mono text-white">{utc}</span>
        <span className="text-navy-600">·</span>
        <span className="mono text-ink-low">SESSION</span>
        <span className="mono text-white">{session}</span>
        <span className="text-navy-600">·</span>
        <span className="hidden lg:inline text-ink-low">{CASE.classification}</span>
      </div>
    </div>
  );
}

function Sidebar() {
  const navigate = useNavigate();

  // Keyboard shortcuts 1-8 → navigate (ignore when typing)
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return;
      const item = NAV.find((n) => String(n.k) === e.key);
      if (item) {
        e.preventDefault();
        navigate(item.path);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-white/5 bg-navy-950/60">
      <div className="flex h-16 items-center gap-3 border-b border-white/5 px-5">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-accent to-indigo-500 shadow-glow">
          <ShieldCheck size={20} className="text-navy-950" />
        </div>
        <div>
          <div className="text-base font-extrabold tracking-tight text-white">
            AEGIS<span className="text-cyan-accent">-X</span>
          </div>
          <div className="text-[9px] uppercase tracking-[0.18em] text-ink-low">Evidence Intelligence</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {NAV_GROUPS.map((group) => (
          <div key={group} className="mb-4">
            <div className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-label text-ink-low/80">{group}</div>
            <div className="space-y-0.5">
              {NAV.filter((n) => n.group === group).map((item) => {
                const Icon = ICONS[item.icon];
                return (
                  <NavLink
                    key={item.key}
                    to={item.path}
                    end={item.path === '/'}
                    data-demo={`nav-${item.key}`}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 rounded-lg py-2 pl-3 pr-2 text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-surface-2 text-white'
                          : 'text-ink-mid hover:bg-surface-2/50 hover:text-ink-hi'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-cyan-accent shadow-glow-sm" />
                        )}
                        <Icon size={17} className={isActive ? 'text-cyan-accent' : 'text-ink-low group-hover:text-ink-mid'} />
                        <span className="flex-1">{item.label}</span>
                        <span
                          className={`mono rounded px-1 text-[10px] ${
                            isActive ? 'bg-cyan-accent/10 text-cyan-accent' : 'text-ink-low/60'
                          }`}
                        >
                          {item.k}
                        </span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="space-y-2 border-t border-white/5 p-3">
        <div className="flex items-center gap-2.5 rounded-lg bg-surface-2/60 p-2.5">
          <div className="relative">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-accent/30 to-indigo-500/30 text-[11px] font-bold text-cyan-accent ring-1 ring-cyan-accent/30">
              AI
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-navy-950" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-xs font-semibold text-white">{CASE.lead}</div>
            <div className="text-[10px] text-ink-low">Lead Investigator</div>
          </div>
        </div>
        <div className="rounded-lg bg-surface-2/60 p-2.5 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-ink-low">Active Case</span>
            <span className="badge bg-emerald-500/15 text-emerald-400">LIVE</span>
          </div>
          <div className="mono mt-1 font-semibold text-cyan-accent">{CASE.id}</div>
          <div className="text-ink-mid">{CASE.name}</div>
        </div>
      </div>
    </aside>
  );
}

export default function Layout({ children }) {
  const location = useLocation();
  const showChip = location.pathname !== '/';
  return (
    <div className="flex h-full flex-col">
      <div className="no-print">
        <StatusBar />
      </div>
      <div className="flex min-h-0 flex-1">
        <div className="no-print contents">
          <Sidebar />
        </div>
        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1560px] p-6">
            {showChip && (
              <div className="no-print">
                <ConsoleTopbar />
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
