import { useSyncExternalStore } from 'react';

// Persists the "report sealed" state so the 3D vault crown gem flips green
// after Sign & Seal, and survives navigation. `?reset` clears it (App.jsx
// calls sessionStorage.clear()).
const KEY = 'aegisx.reportSealed';

const listeners = new Set();
function emit() {
  listeners.forEach((l) => l());
}
function subscribe(l) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function getReportSealed() {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

export function setReportSealed(v) {
  try {
    if (v) sessionStorage.setItem(KEY, '1');
    else sessionStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
  emit();
}

export function clearReportSealed() {
  setReportSealed(false);
}

let snapCache = { raw: undefined, value: false };
function getSnapshot() {
  let raw = null;
  try {
    raw = sessionStorage.getItem(KEY);
  } catch {
    /* ignore */
  }
  if (raw !== snapCache.raw) snapCache = { raw, value: raw === '1' };
  return snapCache.value;
}

export function useReportSealed() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
