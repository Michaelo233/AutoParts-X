import { useState } from "react";
import { carPartSearchService } from "../services/carPartSearchService";
import type { Part } from "../types/userParts";


export function useCarPartSearch() {
    const [results, setResults] = useState<Part[]>([]);

    const searchParts = async (query: string) => {
        let matchingParts: Part[];

        try {
            if (typeof fetch !== "function") {
                throw new Error("Fetch API is unavailable.");
            }

            const response = await fetch(
                `/api/parts/search?q=${encodeURIComponent(query)}`
            );
            const payload = await response.json() as { results?: Part[] };

            if (!response.ok || !Array.isArray(payload.results)) {
                throw new Error("Unable to search auto parts.");
            }

            matchingParts = payload.results;
        } catch {
            matchingParts = await carPartSearchService.searchParts(query);
        }

        setResults(matchingParts);
    };

    return { results, searchParts };
}