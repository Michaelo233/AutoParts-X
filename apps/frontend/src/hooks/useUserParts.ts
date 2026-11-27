import { useEffect, useState } from 'react';
import type { Part, User } from '../types/UserParts';
import { userPartService } from '../services/userPartService';
import { userPartRepository } from '../repositories/userPartRepository';
import { productService } from '../services/productService';

// Initial user state for demonstration purposes
// This is to set a default user in case the API call fails or returns no users.
const initialUser: User = {
  userId: 1,
  userName: 'Michael',
  partsOwned: [],
};

// Utility function to extract error messages from unknown error types
/* This function checks if the error is an instance of the Error class
 and returns its message. If not, it returns a fallback message provided 
 as an argument.*/
const getErrorMessage = (error: unknown, fallback: string): string =>
  error instanceof Error ? error.message : fallback;

// Custom React hook to manage user parts state and actions
/* This hook encapsulates the logic for fetching users, managing the current
 user, and handling part-related actions such as adding, removing, and toggling
 sale status. It also manages loading and error states. */
export function useUserParts() {
  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    // Function to load users from the service and set the state accordingly
    // This function fetches all users from the userPartService and updates the state.
    // It also handles errors and sets the loading state.
    async function loadUsers() {
      try {
        // Fetch all users from the service
        const loadedUsers = await userPartService.getAllUsers();

        // If the component is still mounted, update the users and current user state
        if (!ignore) {
          setUsers(loadedUsers);
          setCurrentUser(
            loadedUsers.find(
              (user) => user.userName.toLowerCase() === 'michael'
            ) ??
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

    // Subscribe to changes in the userPartRepository to keep the state in sync
    // This subscription listens for changes in the userPartRepository and updates
    // the users and current user state accordingly. It ensures that the component
    // reflects the latest data from the repository.
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

    // it returns a cleanup function that sets the ignore flag to true and unsubscribes
    // from the repository when the component unmounts or the effect is re-run.
    // This prevents state updates on an unmounted component, avoiding potential memory leaks or errors.
    return () => {
      ignore = true;
      unsubscribe();
    };
  }, []);

  // Function to refresh the list of users and update the current user state
  /* This function fetches the latest list of users from the userPartService
  and updates the state accordingly. It also allows for selecting a specific
  updated user as the current user if needed. */
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

  // Function to handle adding a new part to the current user
  /* This function attempts to add a new part to the current user's partsOwned list.
  It calls the userPartService to perform the addition and refreshes the users state
  upon success. It also handles errors and updates the error state accordingly. */
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

  // Function to handle removing a part from the current user
  /* This function attempts to remove a part from the current user's partsOwned list.
  It calls the userPartService to perform the removal and refreshes the users state
  upon success. It also handles errors and updates the error state accordingly. */
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

  // Function to handle toggling the sale status of a part for the current user
  /* This function attempts to toggle the sale status of a part for the current user.
  It calls the userPartService to perform the toggle and refreshes the users state
  upon success. It also handles errors and updates the error state accordingly. */
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
      setError(
        getErrorMessage(toggleError, 'Unable to update sale status.')
      );
      return false;
    }
  };

  // Sprint 4: Update product price through the backend API
  const handleUpdatePrice = async (
    part: Part,
    price: number
  ): Promise<boolean> => {
    setError(null);

    try {
      const updatedPart = await productService.updateProductPrice(
        part,
        price
      );

      if (!updatedPart) {
        setError('Product not found.');
        return false;
      }

      const updatedUsers = await userPartService.getAllUsers();

      setUsers(updatedUsers);

      setCurrentUser((current) =>
        updatedUsers.find(
          (user) => user.userId === current.userId
        ) ?? current
      );

      return true;
    } catch (updateError) {
      setError(
        getErrorMessage(updateError, 'Unable to update price.')
      );
      return false;
    }
  };

  // Function to set the current user by their username
  /* This function attempts to find a user by their username and set them as the current user.
  It calls the userPartService to perform the lookup and updates the currentUser state upon success.
  It also handles errors and updates the error state accordingly. */
  const setCurrentUserByName = async (
    userName: string
  ): Promise<boolean> => {
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

  // Return the state and action handlers from the hook
  return {
    currentUser,
    users,
    loading,
    error,
    handleAddPart,
    handleRemovePart,
    handleToggleForSale,
    handleUpdatePrice,
    setCurrentUserByName,
  };
}