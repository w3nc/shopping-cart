// One place that decides whether the site animates.
//
// Order of priority:
//   1. A choice the visitor made with the "Reduce motion" switch (saved in localStorage)
//   2. The operating system / browser setting (prefers-reduced-motion)
//
// The result is mirrored onto <html data-motion="full | reduce"> so CSS can react to it,
// and React components can subscribe through the useReducedMotion hook.

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
  publish(systemPrefersReducedMotion() ? "reduce" : "full");
}

export function subscribeMotion(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function initMotion() {
  publish(readStored() ?? (systemPrefersReducedMotion() ? "reduce" : "full"));

  if (typeof window.matchMedia !== "function") return;
  const query = window.matchMedia(QUERY);
  const onChange = () => {
    if (readStored() === null) {
      publish(systemPrefersReducedMotion() ? "reduce" : "full");
    }
  };

  if (query.addEventListener) {
    query.addEventListener("change", onChange);
  } else if (query.addListener) {
    query.addListener(onChange);
  }
}
