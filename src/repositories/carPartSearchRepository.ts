
import carPartList from "../data/carPartList.json";
import type { AutoPart } from "../types/autoParts";
import type { } from "../types/userParts";

export const carPartSearchRepository = {
    getAllParts: async (): Promise<AutoPart[]> => {
        return carPartList.flatMap(user => user.partsOwned).map(({ Description, Price, partImage, partId, ...part }): AutoPart => ({
            ...part,
            partId: Number(partId),
            imageUrl: partImage,
            price: Price,
            description: Description
        }));
    }
};