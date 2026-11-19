import type { Part, User } from '../types/UserParts';
import { userPartRepository } from '../repositories/userPartRepository';

// Service layer for managing user parts
// This service provides methods to interact with the userPartRepository for user and part management.
// It includes methods to get user information, manage parts, and handle part-related actions.
export const userPartService = {

  // Method to retrieve all users from the repository
  // This method calls the getUsers method of the userPartRepository and returns a promise that resolves
  //  to an array of User objects.
  async getAllUsers(): Promise<User[]> {
    return userPartRepository.getUsers();
  },

  // Method to retrieve a user by their name
  // This method calls the getUserByName method of the userPartRepository and returns a promise that resolves
  //  to a User object if found, or null if not found.
  async getUserByName(userName: string): Promise<User | null> {
    return userPartRepository.getUserByName(userName);
  },

  // Method to add a new user if they do not already exist
  // This method checks if a user with the specified name exists in the repository. If not, it creates a new user.
  // It returns a promise that resolves to the User object representing the existing or newly created user.
  async addUserIfMissing(userName: string): Promise<User> {
    return userPartRepository.getOrCreateUserByName(userName);
  },

  // Method to add a part to a user's partsOwned list
  // This method normalizes the part data, checks if the user exists (creating them if necessary),
  // and adds the part to the user's partsOwned list if it doesn't already exist. It notifies listeners
  // of the change and returns a promise that resolves to a User object representing the updated user.
  async addPartToUser(userName: string, part: Part): Promise<User> {
    const normalizedName = userName.trim();
    if (!normalizedName) {
      throw new Error('User name is required.');
    }
    if (!part.partName.trim()) {
      throw new Error('Part name is required.');
    }
    if (!Number.isFinite(part.partPrice) || part.partPrice <= 0) {
      throw new Error('Part price must be greater than zero.');
    }
    if (!part.partDescription.trim()) {
      throw new Error('Part description is required.');
    }

    return userPartRepository.addPartToUser(normalizedName, part);
  },

  // Method to remove a part from a user's partsOwned list
  // This method finds the user by name and removes the part with the specified ID from their partsOwned list.
  // It notifies listeners of the change and returns a promise that resolves to a User object representing the updated user.
  async removePartFromUser(userName: string, partId: string): Promise<User> {
    const updatedUser = userPartRepository.removePartFromUser(userName, partId);
    if (!updatedUser) {
      throw new Error('Could not remove part from user.');
    }
    return updatedUser;
  },

  // Method to toggle the sale status of a part for a user
  // This method finds the user by name and toggles the isForSale property of the part with the specified ID.
  // It notifies listeners of the change and returns a promise that resolves to a User object representing the updated user.
  async togglePartSaleStatus(
    userName: string,
    partId: string,
    isForSale: boolean
  ): Promise<User> {
    const updatedUser = userPartRepository.togglePartSaleStatus(userName, partId, isForSale);
    if (!updatedUser) {
      throw new Error('Could not update part sale status.');
    }
    return updatedUser;
  },

  // Method to flitter parts for sale
  // it returns an array of filtered parts for sale.
  async getVisibleMarketParts(): Promise<Part[]> {
    return userPartRepository
      .getUsers()
      .flatMap((user) => user.partsOwned)
      .filter((part) => part.isForSale === true);
  },
};
