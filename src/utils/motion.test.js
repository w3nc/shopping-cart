import { describe, expect, it } from "vitest";
import {
  clearMotionOverride,
  getMotion,
  hasMotionOverride,
  initMotion,
  isReducedMotion,
  setMotion,
} from "./motion";

describe("motion preference", () => {
  it("saves the visitor's choice and mirrors it on the html element", () => {
    setMotion("full");

    expect(getMotion()).toBe("full");
    expect(isReducedMotion()).toBe(false);
    expect(document.documentElement.dataset.motion).toBe("full");
    expect(window.localStorage.getItem("lph-motion")).toBe("full");
    expect(hasMotionOverride()).toBe(true);
  });

  it("ignores values that are not full or reduce", () => {
    setMotion("full");
    setMotion("turbo");

    expect(getMotion()).toBe("full");
  });

  it("prefers a saved choice over the system setting when starting up", () => {
    window.localStorage.setItem("lph-motion", "reduce");

    initMotion();

    expect(getMotion()).toBe("reduce");
    expect(document.documentElement.dataset.motion).toBe("reduce");
  });

  it("falls back to the system setting when the choice is cleared", () => {
    setMotion("reduce");

    clearMotionOverride();

    // The test environment reports "no reduced motion" for every media query
    expect(hasMotionOverride()).toBe(false);
    expect(getMotion()).toBe("full");
  });

  it("starts with animations on when the visitor has made no choice", () => {
    window.localStorage.clear();

    initMotion();

    expect(getMotion()).toBe("full");
    expect(document.documentElement.dataset.motion).toBe("full");
  });
});
