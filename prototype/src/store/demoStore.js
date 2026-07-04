import { useSyncExternalStore } from 'react';
import { setSpeedMult } from '../lib/speed';

const KEY = 'aegisx.demo';

const DEFAULT = { on: false, waypoint: 0, speed: 1, cursorFx: true, paused: false };

const listeners = new Set();
function emit() {
  listeners.forEach((l) => l());
}
function subscribe(l) {
  listeners.add(l);
  return () => listeners.delete(l);
}

let raw = null;
function read() {
  try {
    const v = sessionStorage.getItem(KEY);
    if (v !== raw) raw = v;
    return v ? { ...DEFAULT, ...JSON.parse(v) } : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

let cache = { raw: undefined, value: DEFAULT };
function getSnapshot() {
  let cur = null;
  try {
    cur = sessionStorage.getItem(KEY);
  } catch {
    /* ignore */
  }
  if (cur !== cache.raw) {
    cache = { raw: cur, value: cur ? { ...DEFAULT, ...JSON.parse(cur) } : DEFAULT };
  }
  return cache.value;
}
const serverSnap = DEFAULT;

function write(next) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  emit();
}

export function getDemo() {
  return read();
}

export function setDemo(patch) {
  const next = { ...read(), ...patch };
  write(next);
  return next;
}

export function startDemo() {
  setSpeedMult(1);
  return setDemo({ on: true, waypoint: 0, paused: false, speed: 1 });
}

export function exitDemo() {
  const cur = read();
  write({ ...cur, on: false, paused: false });
}

export function advanceWaypoint(total) {
  const cur = read();
  if (!cur.on) return cur;
  const wp = Math.min((cur.waypoint || 0) + 1, total);
  const next = { ...cur, waypoint: wp };
  write(next);
  return next;
}

export function setWaypoint(i) {
  return setDemo({ waypoint: i });
}

export function setDemoSpeed(speed) {
  const clamped = setSpeedMult(speed);
  return setDemo({ speed: clamped });
}

export function togglePause() {
  const cur = read();
  return setDemo({ paused: !cur.paused });
}

export function toggleCursorFx() {
  const cur = read();
  return setDemo({ cursorFx: !cur.cursorFx });
}

export function clearDemo() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  setSpeedMult(1);
  emit();
}

export function useDemo() {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverSnap);
}
