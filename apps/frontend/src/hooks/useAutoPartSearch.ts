import { useState, useCallback, useRef } from "react";
import { productSearchService } from "../services/productSearchService";
import type { ProductSearchFilters } from "../repositories/productSearchRepository";
import type { Part } from "../types/UserParts";

export function useProductSearch() {

    const [results, setResults] = useState<Part[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const requestId = useRef(0);

    const searchParts = useCallback(async (
        query: string | ProductSearchFilters
    ): Promise<void> => {

        const currentRequest = ++requestId.current;

        setLoading(true);
        setError(null);

        try {
            const matchingParts =
                await productSearchService.searchParts(query);

            if (currentRequest === requestId.current) {
                setResults(matchingParts);
            }

        } catch (error: unknown) {

            if (currentRequest === requestId.current) {
                setResults([]);

                setError(
                    error instanceof Error
                        ? error.message
                        : "Unable to retrieve products."
                );
            }

        } finally {

            if (currentRequest === requestId.current) {
                setLoading(false);
            }
        }

    }, []);

    return {
        results,
        searchParts,
        loading,
        error,
    };
}