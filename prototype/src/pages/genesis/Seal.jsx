import { useEffect, useRef, useState } from 'react';
import { Vault, LockKey } from '@phosphor-icons/react';
import { CheckCircle2 } from 'lucide-react';
import { SEAL_META } from '../../data/mockData';

const pad = (n) => n.toString().padStart(2, '0');

export default function Seal({ onSeal }) {
  const [mint, setMint] = useState('0000');
  const [name, setName] = useState('');
  const [sealing, setSealing] = useState(false);
  const [openedUtc] = useState(() => {
    const d = new Date();
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())} UTC`;
  });
  const inputRef = useRef(null);
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // slot-machine mint settling to 0417
  useEffect(() => {
    if (reduce) {
      setMint('0417');
      return;
    }
    const start = performance.now();
    let raf;
    const spin = (now) => {
      const e = now - start;
      if (e < 1400) {
        setMint(pad(Math.floor(Math.random() * 9999)).slice(-4));
        raf = requestAnimationFrame(spin);
      } else {
        setMint('0417');
      }
    };
    raf = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 500);
    return () => clearTimeout(t);
  }, []);

  const seal = () => {
    if (sealing) return;
    setSealing(true);
    setTimeout(() => onSeal(name), reduce ? 200 : 1400);
  };

  const meta = [...SEAL_META, ['Opened', openedUtc]];

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="card-3 relative w-full max-w-xl overflow-hidden p-7 text-center">
        {/* seal ceremony overlay */}
        {sealing && !reduce && (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <span className="absolute h-24 w-24 rounded-full" style={{ animation: 'sealRing 1.2s var(--ease-out) forwards', border: '2px solid #34d399' }} />
            {Array.from({ length: 10 }).map((_, i) => {
              const a = (i / 10) * Math.PI * 2;
              return (
                <span
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full bg-cyan-accent"
                  style={{ '--bx': `${Math.cos(a) * 90}px`, '--by': `${Math.sin(a) * 90}px`, animation: 'burst 1s var(--ease-out) forwards' }}
                />
              );
            })}
          </div>
        )}

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-accent/20 to-indigo-500/20 ring-1 ring-cyan-accent/30">
          {sealing ? (
            <LockKey size={30} weight="duotone" color="#34d399" />
          ) : (
            <Vault size={30} weight="duotone" color="#22d3ee" />
          )}
        </div>

        <div className="eyebrow">Auto-minted case number</div>
        <div className="mono mt-1 text-3xl font-extrabold tracking-tight text-white">
          KP-2026-<span className="text-cyan-accent">{mint}</span>
        </div>

        {/* metadata grid */}
        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1.5 rounded-lg bg-surface-2/50 p-4 text-left text-xs">
          {meta.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-2">
              <span className="text-ink-low">{k}</span>
              <span className="mono truncate text-ink-hi">{v}</span>
            </div>
          ))}
        </div>

        {/* single case-name input */}
        <div className="mt-5 text-left">
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-label text-ink-low">Case name</label>
          <input
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && name.trim() && seal()}
            placeholder="e.g. Operation Sentinel"
            data-demo="seal-name"
            className="w-full rounded-lg border border-white/10 bg-navy-950/60 px-4 py-3 text-lg text-ink-hi outline-none transition-colors focus:border-cyan-accent/50"
          />
        </div>

        <button
          onClick={seal}
          disabled={sealing || mint !== '0417'}
          data-demo="seal-button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-accent px-4 py-3 text-sm font-bold text-navy-950 transition-all hover:shadow-glow disabled:opacity-50"
        >
          {sealing ? (
            <>
              <CheckCircle2 size={17} /> Sealing…
            </>
          ) : (
            <>
              <LockKey size={17} weight="duotone" /> Seal into Vault
            </>
          )}
        </button>
        {sealing ? (
          <div className="mt-2 flex animate-fade-in items-center justify-center gap-1.5 text-[11px] font-semibold text-emerald-300">
            <CheckCircle2 size={12} /> Case sealed · custody chain anchored
          </div>
        ) : (
          <p className="mt-2 text-[11px] text-ink-low">Custody chain anchored with SHA-256 + post-quantum ML-DSA signature.</p>
        )}
      </div>
    </div>
  );
}
