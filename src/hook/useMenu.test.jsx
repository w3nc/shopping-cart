import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import useMenu from "./useMenu";

describe("useMenu", () => {
  it("starts in a loading state", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => {})),
    );

    const { result } = renderHook(() => useMenu());

    expect(result.current.loading).toBe(true);
    expect(result.current.items).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("returns the menu items when the request succeeds", async () => {
    const items = [
      { id: "classic-bucket", name: "The Classic Bucket", price: 899 },
    ];
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => items,
      }),
    );

    const { result } = renderHook(() => useMenu());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.items).toEqual(items);
    expect(result.current.error).toBeNull();
  });

  it("reports an error when the response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({}),
      }),
    );

    const { result } = renderHook(() => useMenu());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toMatch(/could not load the menu/i);
    expect(result.current.items).toEqual([]);
  });

  it("reports an error when the request fails outright", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network down")),
    );

    const { result } = renderHook(() => useMenu());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error.message).toBe("Network down");
  });
});
