import type { Part, User } from '../types/userParts';
import { userPartRepository } from '../repositories/userPartRepository';

export const userPartService = {
  async getAllUsers(): Promise<User[]> {
    return userPartRepository.getUsers();
  },

  async getUserByName(userName: string): Promise<User | null> {
    return userPartRepository.getUserByName(userName);
  },

  async addUserIfMissing(userName: string): Promise<User> {
    return userPartRepository.getOrCreateUserByName(userName);
  },

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

  async removePartFromUser(userName: string, partId: string): Promise<User> {
    const updatedUser = userPartRepository.removePartFromUser(userName, partId);
    if (!updatedUser) {
      throw new Error('Could not remove part from user.');
    }
    return updatedUser;
  },

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

  async getVisibleMarketParts(): Promise<Part[]> {
    return userPartRepository
      .getUsers()
      .flatMap((user) => user.partsOwned)
      .filter((part) => part.isForSale === true);
  },
};
