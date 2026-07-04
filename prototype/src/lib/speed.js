// AEGIS-X — global demo speed engine.
// `--speed-mult` CSS var (default 1) scales every animation/transition that opts in
// via calc(<base> / var(--speed-mult)). `dur(ms)` scales JS timers to match so the
// Demo HUD speed slider (0.5×–2×) slows/accelerates the whole app live.
// Higher multiplier = faster playback = shorter durations.

const DEFAULT = 1;
let cached = DEFAULT;

export function getSpeedMult() {
  if (typeof document === 'undefined') return DEFAULT;
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--speed-mult');
  const v = parseFloat(raw);
  return v && v > 0 ? v : cached;
}

export function setSpeedMult(m) {
  const clamped = Math.min(2, Math.max(0.5, m || DEFAULT));
  cached = clamped;
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--speed-mult', String(clamped));
  }
  return clamped;
}

// Scale a base duration (ms) by the current speed multiplier.
export function dur(ms) {
  const m = getSpeedMult();
  return Math.max(1, Math.round(ms / m));
}
