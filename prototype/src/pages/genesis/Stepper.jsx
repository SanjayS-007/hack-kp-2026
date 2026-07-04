import { Check } from 'lucide-react';

const STEPS = ['Acquire', 'Process', 'AI Core', 'Analyze', 'Seal'];

export default function Stepper({ current }) {
  return (
    <div className="flex items-center justify-center gap-1 px-6 py-4">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex items-center gap-2.5">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold transition-all ${
                  done
                    ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40'
                    : active
                      ? 'bg-cyan-accent text-navy-950 shadow-glow-sm'
                      : 'bg-surface-2 text-ink-low'
                }`}
              >
                {done ? <Check size={14} /> : `0${i + 1}`}
              </span>
              <span
                className={`text-sm font-semibold transition-colors ${
                  active ? 'text-white' : done ? 'text-emerald-300' : 'text-ink-low'
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="mx-3 h-px w-14 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-accent transition-all duration-500"
                  style={{ width: done ? '100%' : '0%' }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
