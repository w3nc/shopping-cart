// Controls site animation. Defaults to "full"; only the visitor's "Reduce
// motion" switch changes it, not the OS setting. Mirrored on data-motion.

const STORAGE_KEY = "lph-motion";
const QUERY = "(prefers-reduced-motion: reduce)";
const listeners = new Set();
let current = "full";

function readStored() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "full" || value === "reduce" ? value : null;
  } catch {
    return null;
  }
}

export function systemPrefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(QUERY).matches
  );
}

function publish(next) {
  current = next;
  if (typeof document !== "undefined") {
    document.documentElement.dataset.motion = next;
  }
  listeners.forEach((listener) => listener());
}

export function getMotion() {
  return current;
}

export function isReducedMotion() {
  return current === "reduce";
}

export function hasMotionOverride() {
  return readStored() !== null;
}

export function setMotion(mode) {
  if (mode !== "full" && mode !== "reduce") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Storage can be blocked. The choice still applies for this visit.
  }
  publish(mode);
}

export function clearMotionOverride() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  publish("full");
}

export function subscribeMotion(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function initMotion() {
  publish(readStored() ?? "full");
}
