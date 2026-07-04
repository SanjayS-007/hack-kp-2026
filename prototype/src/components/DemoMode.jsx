import { useEffect, useRef, useState } from 'react';
import { Play, Pause, X, MousePointer2, Gauge, ChevronRight, ChevronsRight, CheckCircle2 } from 'lucide-react';
import { WAYPOINTS } from '../data/demoWaypoints';
import {
  useDemo,
  advanceWaypoint,
  exitDemo,
  togglePause,
  toggleCursorFx,
  setDemoSpeed,
  startDemo,
} from '../store/demoStore';

const TOTAL = WAYPOINTS.length;
const isTyping = () => {
  const t = document.activeElement?.tagName;
  return t === 'INPUT' || t === 'TEXTAREA';
};

// ── trailing cursor glow + click ripples ─────────────────────────
function CursorFx({ enabled }) {
  const dotRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    if (!enabled) return undefined;
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    const onDown = (e) => {
      const id = Date.now() + Math.random();
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 650);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    let raf;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.16;
      pos.current.y += (target.current.y - pos.current.y) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div className="no-print pointer-events-none fixed inset-0 z-[70]">
      <div
        ref={dotRef}
        className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.55), rgba(34,211,238,0) 70%)',
          boxShadow: '0 0 14px 4px rgba(34,211,238,0.4)',
        }}
      />
      {ripples.map((r) => (
        <span
          key={r.id}
          className="demo-ripple absolute h-8 w-8 rounded-full border-2 border-cyan-accent"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </div>
  );
}

// ── spotlight scrim + halo + caption ─────────────────────────────
function Spotlight({ waypoint }) {
  const wp = WAYPOINTS[waypoint];
  const [rect, setRect] = useState(null);

  useEffect(() => {
    if (!wp) {
      setRect(null);
      return undefined;
    }
    let raf;
    const tick = () => {
      const el = document.querySelector(wp.selector);
      if (el) {
        const r = el.getBoundingClientRect();
        setRect((prev) =>
          !prev || prev.top !== r.top || prev.left !== r.left || prev.width !== r.width || prev.height !== r.height
            ? { top: r.top, left: r.left, width: r.width, height: r.height }
            : prev,
        );
      } else {
        setRect((prev) => (prev ? null : prev));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [wp]);

  if (!wp) return null;

  // target not on screen yet (auto phase / navigation in flight)
  if (!rect) {
    return (
      <div className="no-print pointer-events-none fixed inset-0 z-[60]">
        <div className="absolute inset-0 bg-navy-950/45" />
        <div className="absolute left-1/2 top-6 -translate-x-1/2 max-w-sm rounded-lg border border-cyan-accent/30 bg-navy-950/90 px-3 py-2 text-center shadow-elev-3">
          <div className="flex items-center justify-center gap-1.5 text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-accent" />
            <span className="text-ink-low">Next:</span>
            <span className="font-semibold text-cyan-accent">{wp.caption}</span>
          </div>
          {wp.note && <div className="mt-0.5 text-[10px] text-ink-low">{wp.note}</div>}
        </div>
      </div>
    );
  }

  const pad = 8;
  const boxTop = rect.top - pad;
  const boxLeft = rect.left - pad;
  const boxW = rect.width + pad * 2;
  const boxH = rect.height + pad * 2;
  const below = boxTop + boxH + 70 < window.innerHeight;
  const capTop = below ? boxTop + boxH + 10 : Math.max(8, boxTop - 56);

  return (
    <div className="no-print pointer-events-none fixed inset-0 z-[60]">
      {/* scrim with a bright hole over the target (box-shadow trick) */}
      <div
        className="demo-halo absolute rounded-lg"
        style={{
          top: boxTop,
          left: boxLeft,
          width: boxW,
          height: boxH,
          boxShadow: '0 0 0 9999px rgba(6,11,24,0.72)',
        }}
      />
      {/* caption bubble */}
      <div
        className="absolute max-w-xs rounded-lg border border-cyan-accent/40 bg-navy-950/95 px-3 py-2 shadow-elev-3"
        style={{ top: capTop, left: Math.min(boxLeft, window.innerWidth - 280) }}
      >
        <div className="flex items-center gap-1.5 text-xs">
          <ChevronRight size={13} className="text-cyan-accent" />
          <span className="text-ink-low">Next:</span>
          <span className="font-semibold text-cyan-accent">{wp.caption}</span>
        </div>
        {wp.note && <div className="mt-0.5 pl-5 text-[10px] text-ink-low">{wp.note}</div>}
      </div>
    </div>
  );
}

// ── floating HUD ─────────────────────────────────────────────────
function Hud({ demo }) {
  const done = demo.waypoint >= TOTAL;
  return (
    <div className="no-print pointer-events-auto fixed bottom-4 left-1/2 z-[80] -translate-x-1/2">
      <div className="card-3 flex items-center gap-3 rounded-full px-4 py-2 text-xs">
        <span className="flex items-center gap-1.5 font-semibold text-cyan-accent">
          {done ? <CheckCircle2 size={14} /> : <Play size={13} />}
          {done ? 'Demo complete' : `waypoint ${demo.waypoint + 1}/${TOTAL}`}
        </span>

        {/* force-advance (live-stage insurance if anything ever stalls) */}
        {!done && (
          <button
            onClick={() => advanceWaypoint(TOTAL)}
            title="Skip to next waypoint (►)"
            className="flex items-center gap-1 rounded-full border border-cyan-accent/30 px-1.5 py-0.5 text-cyan-accent hover:bg-cyan-accent/10"
            aria-label="Next waypoint"
          >
            <ChevronsRight size={14} />
          </button>
        )}
        <span className="h-4 w-px bg-white/10" />

        {/* speed */}
        <span className="flex items-center gap-1.5 text-ink-mid" title="Playback speed">
          <Gauge size={13} className="text-ink-low" />
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={demo.speed}
            onChange={(e) => setDemoSpeed(parseFloat(e.target.value))}
            className="h-1 w-24 cursor-pointer accent-cyan-accent"
            aria-label="Playback speed"
          />
          <span className="mono w-9 text-cyan-accent">{demo.speed.toFixed(1)}×</span>
        </span>
        <span className="h-4 w-px bg-white/10" />

        {/* cursor fx toggle */}
        <button
          onClick={toggleCursorFx}
          title="Toggle cursor FX"
          className={`flex items-center gap-1 rounded px-1.5 py-0.5 ${demo.cursorFx ? 'text-cyan-accent' : 'text-ink-low'}`}
        >
          <MousePointer2 size={14} />
        </button>

        {/* pause / resume */}
        <button
          onClick={togglePause}
          title={demo.paused ? 'Resume (Space)' : 'Pause (Space)'}
          className="flex items-center gap-1 rounded px-1.5 py-0.5 text-ink-mid hover:text-ink-hi"
        >
          {demo.paused ? <Play size={14} /> : <Pause size={14} />}
        </button>

        {/* exit */}
        <button
          onClick={exitDemo}
          title="Exit demo (Esc)"
          className="flex items-center gap-1 rounded px-1.5 py-0.5 text-ink-low hover:text-rose-300"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

export default function DemoMode() {
  const demo = useDemo();
  const { on, waypoint, paused, cursorFx } = demo;

  // keyboard: D start/toggle · Space pause · [ / ] speed · Esc exit
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'd' || e.key === 'D') {
        if (isTyping()) return;
        e.preventDefault();
        if (on) exitDemo();
        else startDemo();
        return;
      }
      if (!on) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        exitDemo();
      } else if (e.key === ' ' && !isTyping()) {
        e.preventDefault();
        togglePause();
      } else if (e.key === '[') {
        e.preventDefault();
        setDemoSpeed(Math.max(0.5, +(demo.speed - 0.1).toFixed(1)));
      } else if (e.key === ']') {
        e.preventDefault();
        setDemoSpeed(Math.min(2, +(demo.speed + 0.1).toFixed(1)));
      } else if (e.key === 'ArrowRight' && !isTyping()) {
        e.preventDefault();
        advanceWaypoint(TOTAL);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [on, demo.speed]);

  // presenter's real click on the current target advances the pointer.
  // For inputs (advanceOn:'input') we advance when the field is actually typed into,
  // so the "type the case name" beat isn't skipped by a stray click.
  useEffect(() => {
    if (!on) return undefined;
    const wp = WAYPOINTS[waypoint];
    if (!wp) return undefined;
    const hit = (e) => e.target?.closest && e.target.closest(wp.selector);
    const advance = () => setTimeout(() => advanceWaypoint(TOTAL), 40);

    if (wp.advanceOn === 'input') {
      const onInput = (e) => {
        if (hit(e) && (e.target.value || '').trim().length > 0) advance();
      };
      document.addEventListener('input', onInput, true);
      return () => document.removeEventListener('input', onInput, true);
    }

    const onClick = (e) => {
      if (hit(e)) advance();
    };
    const onDrag = (e) => {
      if (hit(e)) advance();
    };
    document.addEventListener('click', onClick, true);
    document.addEventListener('dragstart', onDrag, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('dragstart', onDrag, true);
    };
  }, [on, waypoint]);

  // pause freezes CSS animations app-wide
  useEffect(() => {
    const root = document.documentElement;
    if (on && paused) root.classList.add('demo-paused');
    else root.classList.remove('demo-paused');
    return () => root.classList.remove('demo-paused');
  }, [on, paused]);

  if (!on) return null;

  return (
    <>
      {!paused && <Spotlight waypoint={waypoint} />}
      <CursorFx enabled={cursorFx && !paused} />
      <Hud demo={demo} />
    </>
  );
}
