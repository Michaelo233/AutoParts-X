import { useState } from "react";
import { carPartSearchService } from "../services/carPartSearchService";
import type { Part } from "../types/userParts";


export function useCarPartSearch() {
    const [results, setResults] = useState<Part[]>([]);

    const searchParts = async (query: string) => {
        const matchingParts = await carPartSearchService.searchParts(query);
        setResults(matchingParts);
    };

    return { results, searchParts };
}