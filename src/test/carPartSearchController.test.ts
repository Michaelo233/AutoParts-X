import { describe, expect, it } from "vitest";
import { carPartSearchController } from "../controllers/carPartSearchController";

describe("Car Part Search Controller", () => {
  it("returns matching parts for a valid search", async () => {
    const response = await carPartSearchController.search({ query: "Engine" });

    expect(response.status).toBe(200);
    expect(response.body.results.length).toBeGreaterThan(0);
  });

  it("rejects a non-string search query", async () => {
    const response = await carPartSearchController.search({ query: 123 });

    expect(response.status).toBe(400);
    expect(response.body.results).toEqual([]);
  });
});
