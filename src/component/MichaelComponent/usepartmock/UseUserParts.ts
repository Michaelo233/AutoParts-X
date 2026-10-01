import { useState } from 'react';
import type { User, Part } from '../types/carListInterface';
import userData from '../carPartsListData/carPartList.json';

const initialUserFromJSON: User = userData[0] as User;

export function useUserParts() {
  const [currentUser, setCurrentUser] = useState<User>(initialUserFromJSON);

  const handleAddPart = (newPart: Part) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      partsOwned: [...prevUser.partsOwned, newPart],
    }));
  };

  return {
    currentUser,
    handleAddPart,
  };
}