import { useState } from "react";
import type { User, Part } from "../types/userParts";
import { myPartsRepository } from "../repositories/myPartsRepository";
import { generatePartId } from "../components/common/utils/generateID";
import { MyPartsService } from "../services/myPartsService";

/**
 * useUserParts Custom Hook
 *
 * Manages the currently selected user's auto parts.
 *
 * Responsibilities:
 * - Retrieve the user from the Repository
 * - Manage user data in React state
 * - Generate sequential IDs for new parts
 * - Add new parts
 * - Remove parts using their unique listing ID
 *
 * JSON data is accessed through the Repository,
 * not imported directly into this hook.
 */
export function useUserParts() {

  // Load user U001 from the JSON Repository.
  const [currentUser, setCurrentUser] = useState<User>(() =>
    MyPartsService.getUser("U001") ?? {
      userId: "U001",
      userName: "Unknown",
      partsOwned: [],
    }
  );

  // Add a new part with a generated P001-style ID.
  const handleAddPart = (newPart: Omit<Part, "id">) => {
    setCurrentUser((prevUser) => {

      const nextId = generatePartId([
        ...myPartsRepository.getAllParts(),
        ...prevUser.partsOwned,
      ]);

      const completedPart: Part = {
        ...newPart,
        id: nextId,
      };

      return {
        ...prevUser,
        partsOwned: [
          completedPart,
          ...prevUser.partsOwned,
        ],
      };
    });
  };

  // Remove a part using its unique listing ID.
  const handleRemovePart = (idToRemove: string) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      partsOwned: prevUser.partsOwned.filter(
        (part) => part.id !== idToRemove
      ),
    }));
  };

  return {
    currentUser,
    handleAddPart,
    handleRemovePart,
  };
}
