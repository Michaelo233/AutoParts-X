

import { carPartList as userData } from "../data/carPartList";
import type { Part } from "../types/UserParts";

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
                partId: String(part.partId),
                partName: part.partName,
                categoryId: part.categoryId,

                // Convert JSON fields
                partDescription:
                    part.description ?? "",
                partPrice: part.price ?? 0,

                partImage: part.partImage,
                userId: String(user.userId),
                userName: user.userName,
                isFavorite: part.isFavorite,
            }))
        );
    },
};
