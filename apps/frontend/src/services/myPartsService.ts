import { myPartsRepository } from "../repositories/myPartsRepository";
import type { User, Part, NewPart } from "../types/UserParts";
import {
    generatePartId, generateAutoPartId,
} from "../components/common/utils/generateID";

// Service layer for managing user parts
// This service provides methods to interact with the myPartsRepository for user and part management.
// It includes methods to get user information, manage parts, and handle part-related actions.
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
