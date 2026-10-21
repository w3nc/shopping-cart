import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { setMotion } from "../utils/motion";

// --- IntersectionObserver ---
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
Element.prototype.scrollIntoView = vi.fn();
window.scrollTo = vi.fn();

// --- GSAP Mocks ---
// Prevents GSAP from crashing in JSDOM and prevents it from hiding elements
// (opacity: 0) during tests.
vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    fromTo: vi.fn(),
    to: vi.fn(),
    set: vi.fn(),
    quickTo: vi.fn(() => vi.fn()),
    killTweensOf: vi.fn(),
    context: vi.fn(),
    utils: { toArray: vi.fn(() => []) },
  },
  gsap: {
    registerPlugin: vi.fn(),
    fromTo: vi.fn(),
    to: vi.fn(),
    set: vi.fn(),
    quickTo: vi.fn(() => vi.fn()),
    killTweensOf: vi.fn(),
    context: vi.fn(),
    utils: { toArray: vi.fn(() => []) },
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    create: vi.fn(() => ({ kill: vi.fn() })),
    refresh: vi.fn(),
    getAll: vi.fn(() => []),
    registerPlugin: vi.fn(),
  },
}));

vi.mock("@gsap/react", () => ({
  useGSAP: vi.fn((callback) => {
    // Do nothing in tests, let elements render normally at full opacity
  }),
}));

// Every test starts with motion switched off, so nothing animates and
// nothing is hidden waiting for a scroll trigger.
beforeEach(() => {
  setMotion("reduce");
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});
