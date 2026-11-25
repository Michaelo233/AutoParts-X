import {
    carPartSearchRepository,
    type ProductSearchFilters,
} from "../repositories/productSearchRepository";

export const carPartSearchService = {
    searchParts(query: string | ProductSearchFilters) {
        const filters: ProductSearchFilters =
            typeof query === "string"
                ? { search: query }
                : query;

        return carPartSearchRepository.getAllParts(filters);
    },
};
