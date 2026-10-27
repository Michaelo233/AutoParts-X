

import userData from "../data/carPartList.json";
import type { Part } from "../types/userParts";

/**
 * Car Part Search Repository
 *
 * Reads JSON data and converts it
 * into the Part interface.
 */
export const carPartSearchRepository = {
    getAllParts: (): Part[] => {
        return userData.flatMap(user =>
            user.partsOwned.map((part): Part => ({
                id: String(part.id ?? `${user.userId}-${part.partId}`),
                partId: part.partId,
                partName: part.partName,
                categoryId: part.categoryId,

                // Convert JSON fields
                partDescription: part.Description,
                partPrice: part.Price,

                partImage: part.partImage,
                userId: String(user.userId),
                userName: user.userName,
                isFavorite: part.isFavorite,
            }))
        );
    },
};
