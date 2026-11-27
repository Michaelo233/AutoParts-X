import { userPartRepository } from "../repositories/userPartRepository";
import type { Part, User } from "../types/UserParts";

export const userPartService = {
  getAllUsers(): Promise<User[]> {
    return userPartRepository.getUsers();
  },

  getUserByName(userName: string): Promise<User | null> {
    return userPartRepository.getUserByName(userName);
  },

  getOrCreateUserByName(userName: string): Promise<User> {
    return userPartRepository.getOrCreateUserByName(userName);
  },

  createUser(userName: string): Promise<User> {
    return userPartRepository.createUser(userName);
  },

  addPartToUser(userName: string, part: Part): Promise<User> {
    return userPartRepository.addPartToUser(userName, part);
  },

  addListingToUser(userName: string, part: Part): Promise<Part> {
    return userPartRepository.addListingToUser(userName, part);
  },

  removePartFromUser(userName: string, partId: string): Promise<User | null> {
    return userPartRepository.removePartFromUser(userName, partId);
  },

  removePartById(partId: string): Promise<boolean> {
    return userPartRepository.removePartById(partId);
  },

  updatePart(part: Part): Promise<Part | null> {
    return userPartRepository.updatePart(part);
  },

  togglePartSaleStatus(
    userName: string,
    partId: string,
    isForSale: boolean
  ): Promise<User | null> {
    return userPartRepository.togglePartSaleStatus(userName, partId, isForSale);
  },
};
