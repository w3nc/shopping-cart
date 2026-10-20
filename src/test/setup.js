import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

class IntersectionObserverStub {
  constructor(callback) {
    this.callback = callback;
    this.root = null;
    this.rootMargin = "0px";
    this.thresholds = [0];
  }

  observe() {}

  unobserve() {}

  disconnect() {}

  takeRecords() {
    return [];
  }
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);

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

Element.prototype.scrollIntoView = () => {};

window.scrollTo = () => {};

afterEach(() => {
  cleanup();
});
