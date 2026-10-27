import { myPartsRepository } from "../repositories/myPartsRepository";
import type { User, Part, NewPart } from "../types/userParts";
import {
    generatePartId, generateAutoPartId,
} from "../components/common/utils/generateID";


export const MyPartsService = {
    getUser: (userId: string): User | undefined => {
        return myPartsRepository.getUserById(userId);
    },

    getUserParts: (userId: string): Part[] => {
        return myPartsRepository.getPartsByUserId(userId);
    },

    addPart: (
        currentParts: Part[],
        newPart: NewPart
    ): Part[] => {
        const allParts = [
            ...myPartsRepository.getAllParts(),
            ...currentParts,
        ];

        const completedPart: Part = {
            ...newPart,
            id: generatePartId(allParts),
            partId: generateAutoPartId(allParts),
        };

        return [...currentParts, completedPart];
    },


        removePart: (parts: Part[], id: string): Part[] => {
            return parts.filter(part => part.id !== id);
        },
};
