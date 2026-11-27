import type { Part } from "../types/UserParts";

// Supported product search filters.
export interface ProductSearchFilters {
    search?: string;
    categoryId?: string;
    sellerId?: string;
    minPrice?: number;
    maxPrice?: number;
}

// Backend API configuration.
const baseURL = import.meta.env.VITE_API_BASE_URL;
const endpoint = `${baseURL}/api/v1/products`;

/**
 * Product Search Repository
 *
 * Retrieves product listings from the backend API.
 * Sends search and filtering parameters to the backend.
 */
export const productSearchRepository = {

    async getAllParts(
        filters: ProductSearchFilters = {}
    ): Promise<Part[]> {

        const params = new URLSearchParams();

        // Convert filters into query parameters.
        for (const [key, value] of Object.entries(filters)) {
            const text = String(value ?? "").trim();

            if (text !== "") {
                params.set(key, text);
            }
        }

        const query = params.toString();

        // Send request to the backend API.
        const response = await fetch(
            `${endpoint}${query ? `?${query}` : ""}`
        );

        // Handle unsuccessful responses.
        if (!response.ok) {
            throw new Error(
                `Product search failed: ${response.status}`
            );
        }

        const payload = await response.json();

        // Verify the response contains a product array.
        if (!Array.isArray(payload.data)) {
            throw new Error(
                "Expected a product list from the API."
            );
        }

        return payload.data as Part[];
    },
};