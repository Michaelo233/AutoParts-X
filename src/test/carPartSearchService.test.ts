import { describe, it, expect } from "vitest";
import { carPartSearchService } from "../services/carPartSearchService";

describe("Car Part Search Service", () => {

    it("should find auto parts by name", async () => {
        const results = await carPartSearchService.searchParts("Engine");

        expect(results.length).toBeGreaterThan(0);
    });

    it("should search without case sensitivity", async () => {
        const results = await carPartSearchService.searchParts("engine");
        const upperResults = await carPartSearchService.searchParts("ENGINE");

        expect(results).toEqual(upperResults);
    });

    it("should return an empty array when no parts match", async () => {
        const results = await carPartSearchService.searchParts(
            "nonexistentpart123"
        );

        expect(results).toEqual([]);
    });

});