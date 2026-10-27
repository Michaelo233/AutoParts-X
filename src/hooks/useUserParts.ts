import { useState } from 'react';
import type { User, Part } from '../types/userParts';
import userData from '../data/carPartList.json';
import { userPartsRepository } from '../repositories/userPartsRepository';

const initialUserFromJSON: User = userData[0] as User;
const initialUser = userPartsRepository.getUser(initialUserFromJSON.userId) ?? initialUserFromJSON;

export function useUserParts() {
  const [currentUser, setCurrentUser] = useState<User>(initialUser);

  const handleAddPart = (newPart: Part) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      partsOwned:
        userPartsRepository.createPart(prevUser.userId, newPart) !== null
          ? userPartsRepository.listParts(prevUser.userId)
          : prevUser.partsOwned,
    }));
  };

  // Remove any part (JSON or newly added) by ID
  const handleRemovePart = (partIdToRemove: string) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      partsOwned: userPartsRepository.deletePart(prevUser.userId, partIdToRemove)
        ? userPartsRepository.listParts(prevUser.userId)
        : prevUser.partsOwned,
    }));
  };

  return {
    currentUser,
    handleAddPart,
    handleRemovePart,
  };
}