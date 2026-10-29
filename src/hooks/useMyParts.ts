import { useState } from 'react';
import type { Part, User } from '../types/userParts';
import { myPartsRepository } from '../repositories/myPartsRepository';
import { generatePartId } from '../components/common/utils/generateID';
import { MyPartsService } from '../services/myPartsService';

export function useMyParts() {
  const [currentUser, setCurrentUser] = useState<User>(() =>
    MyPartsService.getUser('U001') ?? {
      userId: 'U001',
      userName: 'Unknown',
      partsOwned: [],
    }
  );

  const handleAddPart = (newPart: Omit<Part, 'id'>): void => {
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
        partsOwned: [completedPart, ...prevUser.partsOwned],
      };
    });
  };

  const handleRemovePart = (idToRemove: string): void => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      partsOwned: prevUser.partsOwned.filter((part) => part.id !== idToRemove),
    }));
  };

  const handleToggleForSale = (id: string, isForSale: boolean): void => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      partsOwned: prevUser.partsOwned.map((part) =>
        part.id === id ? { ...part, isForSale } : part
      ),
    }));
  };

  return {
    currentUser,
    setCurrentUser,
    handleAddPart,
    handleRemovePart,
    handleToggleForSale,
  };
}
