
import type { Part } from "../types/UserParts";

// 
export interface ProductSearchFilters {
    search?: string;
    categoryId?: string;
    sellerId?: string;
    minPrice?: number;
    maxPrice?: number;
}

interface ProductResponse {
    id: number;
    partId: number;
    partName: string;
    categoryId: string;
    description: string;
    price: number;
    partImage: string | null;
    userId: string;
    userName: string;
    isForSale: boolean;
}

const apiBaseUrl = (
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export const carPartSearchRepository = {
    async getAllParts(filters: ProductSearchFilters = {}): Promise<Part[]> {
        const params = new URLSearchParams();

        for (const [key, value] of Object.entries(filters)) {
            const text = String(value ?? "").trim();
            if (text !== "") params.set(key, text);
        }

        const query = params.toString();
        const response = await fetch(
            `${apiBaseUrl}/api/v1/products${query ? `?${query}` : ""}`
        );

        if (!response.ok) {
            throw new Error(`Product search failed (HTTP ${response.status}).`);
        }

        const payload = (await response.json()) as {
            data?: ProductResponse[];
        } | null;

        const listings = payload?.data;
        if (!Array.isArray(listings)) {
            throw new Error("Expected a product list from the API.");
        }

        return listings.map((listing): Part => ({
            id: String(listing.id),
            partId: String(listing.partId),
            partName: listing.partName,
            categoryId: listing.categoryId,
            partDescription: listing.description,
            partPrice: listing.price,
            partImage: listing.partImage ?? "",
            userId: listing.userId,
            userName: listing.userName,
            isForSale: listing.isForSale,
        }));
    },
};