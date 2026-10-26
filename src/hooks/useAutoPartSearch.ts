import { useState } from "react";
import { carPartSearchService } from "../services/carPartSearchService";
import type { AutoPart } from "../types/autoParts";


export function useCarPartSearch() {
    const [results, setResults] = useState<AutoPart[]>([]);

    const searchParts = async (query: string) => {
        const matchingParts = await carPartSearchService.searchParts(query);
        setResults(matchingParts);
    };

    return { results, searchParts };
}