import { useEffect, useState } from 'react';
import type { Part, User } from '../types/userParts';
import { userPartService } from '../services/userPartService';
import { userPartRepository } from '../repositories/userPartRepository';

const initialUser: User = {
  userId: 1,
  userName: 'Michael',
  partsOwned: [],
};

const getErrorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error ? error.message : fallback;

export function useUserParts() {
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadUsers() {
      try {
        const loadedUsers = await userPartService.getAllUsers();
        if (!ignore) {
          setUsers(loadedUsers);
          setCurrentUser(
            loadedUsers.find((user) => user.userName.toLowerCase() === 'michael') ??
              loadedUsers[0] ??
              initialUser
          );
        }
      } catch (loadError) {
        if (!ignore) {
          setError(getErrorMessage(loadError, 'Unable to load users.'));
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void loadUsers();

    const unsubscribe = userPartRepository.subscribe(() => {
      if (ignore) return;
      const nextUsers = userPartRepository.getUsers();
      setUsers(nextUsers);
      setCurrentUser((prev) =>
        userPartRepository.getUserByName(prev.userName) ??
        nextUsers.find((user: User) => user.userName.toLowerCase() === 'michael') ??
        nextUsers[0] ??
        prev
      );
    });

    return () => {
      ignore = true;
      unsubscribe();
    };
  }, []);

  const refreshUsers = async (
    updatedUser: User,
    selectUpdatedUser = false
  ): Promise<void> => {
    const updatedUsers = await userPartService.getAllUsers();
    setUsers(updatedUsers);
    setCurrentUser((current) =>
      selectUpdatedUser || updatedUser.userId === current.userId
        ? updatedUser
        : current
    );
  };

  const handleAddPart = async (newPart: Part): Promise<boolean> => {
    setError(null);
    try {
      const updatedUser = await userPartService.addPartToUser(
        newPart.userName ?? currentUser.userName,
        newPart
      );
      await refreshUsers(updatedUser, true);
      return true;
    } catch (addError) {
      setError(getErrorMessage(addError, 'Unable to add part.'));
      return false;
    }
  };

  const handleRemovePart = async (
    userName: string,
    partIdToRemove: string
  ): Promise<boolean> => {
    setError(null);
    try {
      const updatedUser = await userPartService.removePartFromUser(
        userName,
        partIdToRemove
      );
      await refreshUsers(updatedUser);
      return true;
    } catch (removeError) {
      setError(getErrorMessage(removeError, 'Unable to remove part.'));
      return false;
    }
  };

  const handleToggleForSale = async (
    userName: string,
    partId: string,
    isForSale: boolean
  ): Promise<boolean> => {
    setError(null);
    try {
      const updatedUser = await userPartService.togglePartSaleStatus(
        userName,
        partId,
        isForSale
      );
      await refreshUsers(updatedUser);
      return true;
    } catch (toggleError) {
      setError(getErrorMessage(toggleError, 'Unable to update sale status.'));
      return false;
    }
  };

  const setCurrentUserByName = async (userName: string): Promise<boolean> => {
    setError(null);
    try {
      const selectedUser = await userPartService.getUserByName(userName);
      if (!selectedUser) {
        setError('User not found.');
        return false;
      }

      setCurrentUser(selectedUser);
      return true;
    } catch (lookupError) {
      setError(getErrorMessage(lookupError, 'Unable to find user.'));
      return false;
    }
  };

  return {
    currentUser,
    users,
    loading,
    error,
    handleAddPart,
    handleRemovePart,
    handleToggleForSale,
    setCurrentUserByName,
  };
}
