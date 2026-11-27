import {
    productSearchRepository,
    type ProductSearchFilters,
} from "../repositories/productSearchRepository";

import type { Part } from "../types/UserParts";

/**
 * Car Part Search Service
 *
 * Retrieves products from the backend.
 * Supports keyword, category, seller, and price filters.
 */
export const productSearchService = {

    async searchParts(
        query: string | ProductSearchFilters
    ): Promise<Part[]> {

        const filters: ProductSearchFilters =
            typeof query === "string"
                ? { search: query.trim() }
                : query;

        return productSearchRepository.getAllParts(filters);
    },
};