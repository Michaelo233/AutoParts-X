import { useState } from 'react';
import type { User, Part } from '../types/carListInterface';
import userData from '../carPartsListData/carPartList.json';

const initialUserFromJSON: User = userData[0] as User;

export function useUserParts() {
  const [currentUser, setCurrentUser] = useState<User>(initialUserFromJSON);

  const handleAddPart = (newPart: Part) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      partsOwned: [newPart, ...prevUser.partsOwned],
    }));
  };

  // Remove any part (JSON or newly added) by ID
  const handleRemovePart = (partIdToRemove: string) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      partsOwned: prevUser.partsOwned.filter(
        (part) => part.partId !== partIdToRemove
      ),
    }));
  };

  return {
    currentUser,
    handleAddPart,
    handleRemovePart,
  };
}