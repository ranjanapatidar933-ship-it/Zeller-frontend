import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../aws-exports.js", () => ({
  default: {
    API: {
      GraphQL: {
        endpoint: "https://test.endpoint",
        region: "us-east-1",
      },
    },
  },
}));

vi.mock("aws-amplify", () => {
  const configureMock = vi.fn();
  (globalThis as any).__mockConfigure = configureMock;
  return {
    Amplify: {
      configure: configureMock,
    },
  };
});

vi.mock("aws-amplify/api", () => {
  const graphqlFn = vi.fn();
  (globalThis as any).__mockGraphql = graphqlFn;
  
  return {
    generateClient: vi.fn(() => ({
      graphql: graphqlFn,
    })),
  };
});

vi.mock("../constants/error.js", () => ({
  ERRORS: { GRAPHQL_ERROR: "GRAPHQL_ERROR" },
}));

 
import { runQuery } from "../api/graphqlClient";

describe("graphqlClient Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return data when query succeeds", async () => {
    (globalThis as any).__mockGraphql.mockResolvedValue({ data: { ok: true } });

    const result = await runQuery("TEST");

    expect(result).toEqual({ ok: true });
  });

  it("should call graphql with correct params", async () => {
    (globalThis as any).__mockGraphql.mockResolvedValue({ data: {} });

    const variables = { id: 1 };

    await runQuery("TEST", variables);

    expect((globalThis as any).__mockGraphql).toHaveBeenCalledWith({
      query: "TEST",
      variables,
    });
  });

  it("should log error when GraphQL fails", async () => {
    const err = new Error("fail");
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    (globalThis as any).__mockGraphql.mockRejectedValue(err);

    await runQuery("TEST");

    expect(consoleSpy).toHaveBeenCalledWith("GRAPHQL_ERROR", err);
  });
});


