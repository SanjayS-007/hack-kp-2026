import { useSyncExternalStore } from 'react';

const CREATED_KEY = 'aegisx.createdCase';
const ACTIVE_KEY = 'aegisx.activeCase';

const listeners = new Set();
function emit() {
  listeners.forEach((l) => l());
}
function subscribe(l) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function write(key, val) {
  try {
    if (val == null) sessionStorage.removeItem(key);
    else sessionStorage.setItem(key, JSON.stringify(val));
  } catch {
    /* storage unavailable */
  }
  emit();
}
function readRaw(key) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function getCreatedCase() {
  const v = readRaw(CREATED_KEY);
  return v ? JSON.parse(v) : null;
}
export function setCreatedCase(c) {
  write(CREATED_KEY, c);
}
export function getActiveCase() {
  const v = readRaw(ACTIVE_KEY);
  return v ? JSON.parse(v) : null;
}
export function setActiveCase(c) {
  write(ACTIVE_KEY, c);
}
export function clearCaseStore() {
  write(CREATED_KEY, null);
  write(ACTIVE_KEY, null);
}

// snapshot cache to keep useSyncExternalStore identity stable
let snapCache = { created: undefined, active: undefined, value: { created: null, active: null } };
function getSnapshot() {
  const created = readRaw(CREATED_KEY);
  const active = readRaw(ACTIVE_KEY);
  if (created !== snapCache.created || active !== snapCache.active) {
    snapCache = {
      created,
      active,
      value: { created: created ? JSON.parse(created) : null, active: active ? JSON.parse(active) : null },
    };
  }
  return snapCache.value;
}
const serverSnap = { created: null, active: null };

export function useCaseStore() {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverSnap);
}
