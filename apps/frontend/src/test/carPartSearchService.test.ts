import { describe, it, expect } from "vitest";
import { productSearchService } from "../services/productSearchService";

describe("Product Search Service", () => {

    it("should find auto parts by name", async () => {
        const results = await productSearchService.searchParts("Engine");

        expect(results.length).toBeGreaterThan(0);
    });

    it("should search without case sensitivity", async () => {
        const results = await productSearchService.searchParts("engine");
        const upperResults = await productSearchService.searchParts("ENGINE");

        expect(results).toEqual(upperResults);
    });

    it("should return an empty array when no parts match", async () => {
        const results = await productSearchService.searchParts(
            "nonexistentpart123"
        );

        expect(results).toEqual([]);
    });

});