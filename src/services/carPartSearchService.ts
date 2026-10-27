import { carPartSearchRepository } from "../repositories/carPartSearchRepository";
import type { Part } from "../types/userParts";

/**
 * Car Part Search Service
 *
 * Retrieves parts through the Repository.
 * Searches by part name or description.
 * Search is case-insensitive.
 */
export const carPartSearchService = {
    searchParts: (query: string) => {
        const searchTerm = query.trim().toLowerCase();

        const parts = carPartSearchRepository.getAllParts();

        if (!searchTerm) {
            return parts;
        }

        return parts.filter(part =>
            part.partName.toLowerCase().includes(searchTerm) ||
            part.partDescription.toLowerCase().includes(searchTerm) ||
            (part.userName ?? "").toLowerCase().includes(searchTerm) ||
            part.categoryId.toLowerCase().includes(searchTerm)
        );
    },
};
