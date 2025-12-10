import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useCustomers } from "../hooks/useCustomers";

 
vi.mock("../api/graphqlClient", () => ({
  runQuery: vi.fn(() =>
    Promise.resolve({
      listZellerCustomers: {
        items: [
          { id: "1", name: "David", email: "david@test.com", role: "ADMIN" },
          { id: "2", name: "Lynn", email: "lynn@test.com", role: "MANAGER" },
        ],
      },
    })
  ),
}));

describe("useCustomers Hook", () => {
  it("loads and normalizes customer data", async () => {
    const { result } = renderHook(() => useCustomers());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

 
    expect(result.current.customers).toEqual([
      { id: "1", name: "David", email: "david@test.com", role: "admin" },
      { id: "2", name: "Lynn", email: "lynn@test.com", role: "manager" },
    ]);
  });
});
