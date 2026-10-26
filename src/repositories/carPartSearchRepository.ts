
import carPartList from "../data/carPartList.json";
import type { Part } from "../types/userParts";

export const carPartSearchRepository = {
    getAllParts: async (): Promise<Part[]> => {
        return carPartList.flatMap(user =>
            user.partsOwned.map(part => ({
                ...part,
                partId: String(part.partId),
                userId: user.userId,
                userName: user.userName
            }))
        );
    }
};