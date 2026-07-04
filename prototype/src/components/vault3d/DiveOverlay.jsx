import { FileText, Layers } from 'lucide-react';
import { CITATION_CHIPS, STRATA_META, STRATA_ORDER } from '../../data/reportDive';

// Scatter chips across the upper viewport, grouped left→right by stratum depth.
const CHIP_POS = CITATION_CHIPS.map((c, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  return {
    left: 24 + col * 26 + (row % 2 ? 6 : 0), // vw
    top: 20 + row * 12, // vh
    delay: i * 90, // ms (scaled by CSS speed var on the element)
  };
});

// Full-screen cinematic overlay shown while the vault dives S4→S1 into the report.
// DOM-based (not in-canvas) for deterministic, speed-aware streaming.
export default function DiveOverlay({ active, phase, reduced }) {
  if (!active) return null;

  return (
    <div className="no-print pointer-events-none absolute inset-0 z-50 overflow-hidden">
      {/* darkening dive scrim */}
      <div className={`absolute inset-0 bg-[#04070f] ${reduced ? 'opacity-40' : 'dive-scrim'}`} />

      {/* stratum layer-flash bands (S4→S1) sweeping as the camera passes */}
      {!reduced &&
        STRATA_ORDER.slice().reverse().map((k, i) => (
          <div
            key={k}
            className="dive-flash absolute inset-x-0 h-24"
            style={{
              top: `${12 + i * 22}%`,
              background: `linear-gradient(90deg, transparent, ${STRATA_META[k].color}44, transparent)`,
              animationDelay: `calc(${i * 480}ms / var(--speed-mult))`,
            }}
          />
        ))}

      {/* streaming citation chips */}
      {(reduced ? [] : CITATION_CHIPS).map((c, i) => {
        const p = CHIP_POS[i];
        const meta = STRATA_META[c.stratum];
        return (
          <div
            key={c.id}
            className="dive-chip absolute"
            style={{
              left: `${p.left}vw`,
              top: `${p.top}vh`,
              animationDelay: `calc(${p.delay}ms / var(--speed-mult))`,
            }}
          >
            <div
              className="flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-navy-950/90 px-2.5 py-1 text-[11px] font-semibold shadow-elev-3"
              style={{ borderColor: `${meta.color}66`, color: meta.color }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.color, boxShadow: `0 0 6px ${meta.color}` }} />
              <span className="mono">{c.id}</span>
              <span className="text-ink-mid">· {c.label}</span>
            </div>
          </div>
        );
      })}

      {/* narration caption */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center">
        <div className="flex items-center gap-2 rounded-full border border-cyan-accent/40 bg-navy-950/90 px-4 py-2 shadow-elev-3">
          <Layers size={15} className="text-cyan-accent" />
          <span className="text-sm font-semibold text-white">
            {phase === 'stream' ? 'Distilling the strata into testimony…' : 'Compiling case report'}
          </span>
          <FileText size={15} className="text-emerald-400" />
        </div>
      </div>
    </div>
  );
}
