
import { carPartSearchRepository } from "../repositories/carPartSearchRepository";

export const carPartSearchService = {
    searchParts: async (query: string) => {
        const parts = await carPartSearchRepository.getAllParts();
        // Normalize the search term to lower case and trim whitespace for case-insensitive search
        const searchTerm = query.trim().toLowerCase();

        return parts.filter(part =>
            part.partName.toLowerCase().includes(searchTerm) ||
            part.partDescription.toLowerCase().includes(searchTerm)
        );
    }
};