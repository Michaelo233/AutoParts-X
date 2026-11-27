import { useState } from "react";
import { productSearchService } from "../services/productSearchService";
import type { ProductSearchFilters } from "../repositories/productSearchRepository";
import type { Part } from "../types/UserParts";

/**
 * Custom hook for searching and filtering products.
 * Manages search results, loading state, and errors.
 */
export function useProductSearch() {

    const [results, setResults] = useState<Part[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchParts = async (
        query: string | ProductSearchFilters
    ): Promise<void> => {

        setLoading(true);
        setError(null);

        try {
            const matchingParts =
                await productSearchService.searchParts(query);

            setResults(matchingParts);

        } catch (error: unknown) {

            setResults([]);

            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to retrieve products."
            );

        } finally {
            setLoading(false);
        }
    };

    return {
        results,
        searchParts,
        loading,
        error,
    };
}