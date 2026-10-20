// src/test/setup.js
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// --- IntersectionObserver ---
// jsdom does not implement this. The stub below is "triggerable",
// which means you can manually fire the callback in Phase 5 tests.
class IntersectionObserverStub {
  static instances = [];

  constructor(callback, options = {}) {
    this.callback = callback;
    this.root = options.root ?? null;
    this.rootMargin = options.rootMargin ?? "0px";
    this.thresholds = options.threshold ? [].concat(options.threshold) : [0];
    this.elements = new Set();
    IntersectionObserverStub.instances.push(this);
  }

  observe(element) {
    this.elements.add(element);
  }

  unobserve(element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  takeRecords() {
    return [];
  }

  // Test helper, not part of the real API
  trigger(isIntersecting = true) {
    this.callback(
      [...this.elements].map((target) => ({
        target,
        isIntersecting,
        intersectionRatio: isIntersecting ? 1 : 0,
        boundingClientRect: target.getBoundingClientRect(),
        intersectionRect: target.getBoundingClientRect(),
        rootBounds: null,
        time: Date.now(),
      })),
      this,
    );
  }
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);

// --- matchMedia ---
// jsdom does not implement this. Returning a consistent shape
// prevents "matchMedia is not a function" errors in components.
vi.stubGlobal("matchMedia", (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// --- Scroll methods ---
// jsdom does not implement these. Using vi.fn() lets you assert
// calls in tests that care about scrolling behavior.
Element.prototype.scrollIntoView = vi.fn();
window.scrollTo = vi.fn();

// --- Cleanup ---
// Explicit cleanup is safer than relying on RTL auto-cleanup,
// especially when tests opt out of globals.
afterEach(() => {
  cleanup();
});
