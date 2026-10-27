import userData from "../data/carPartList.json";
import type { User, Part } from "../types/userParts";

interface RawPart {
    id?: string | number;
    partId: string;
    partName: string;
    categoryId: string;
    Description?: string;
    Price?: number;
    partDescription?: string;
    partPrice?: number;
    partImage: string;
    isFavorite?: boolean;
}

interface RawUser {
    userId: string | number;
    userName: string;
    partsOwned: RawPart[];
}

const users: RawUser[] = userData;

/**
 * My Parts Repository
 *
 * Reads data from carPartList.json.
 * Converts JSON fields to the Part and User interfaces.
 * Does not manage React state.
 */
export const myPartsRepository = {
    getAllUsers: (): User[] => {
        return users.map(user => ({
            userId: String(user.userId),
            userName: user.userName,

            partsOwned: user.partsOwned.map((part, index): Part => ({
                id: part.id == null
                    ? `${user.userId}-${part.partId}-${index}`
                    : String(part.id),

                partId: String(part.partId),
                partName: part.partName,
                categoryId: part.categoryId,

                partDescription:
                    part.partDescription ?? part.Description ?? "",

                partPrice:
                    part.partPrice ?? part.Price ?? 0,

                partImage: part.partImage,
                isFavorite: part.isFavorite ?? false,

                userId: String(user.userId),
                userName: user.userName,
            })),
        }));
    },

    getUserById: (userId: string): User | undefined => {
        return myPartsRepository.getAllUsers().find(
            user => user.userId === userId
        );
    },

    getPartsByUserId: (userId: string): Part[] => {
        return myPartsRepository.getUserById(userId)?.partsOwned ?? [];
    },

    getAllParts: (): Part[] => {
        return myPartsRepository.getAllUsers().flatMap(
            user => user.partsOwned
        );
    },
};
