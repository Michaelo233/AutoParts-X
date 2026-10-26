
import { carPartSearchRepository } from "../repositories/carPartSearchRepository";

export const carPartSearchService = {
    searchParts: async (query: string) => {
        const parts = await carPartSearchRepository.getAllParts();
        const searchTerm = query.trim().toLowerCase();

        return parts.filter(part =>
            part.partName.toLowerCase().includes(searchTerm) ||
            part.description.toLowerCase().includes(searchTerm)
        );
    }
};