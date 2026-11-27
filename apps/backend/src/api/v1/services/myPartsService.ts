import { myPartsRepository } from "../repositories/myPartsRepository";
import type { Part, User } from "../types/UserParts";

export const myPartsService = {
  getAllUsers(): Promise<User[]> {
    return myPartsRepository.getAllUsers();
  },

  getUserById(userId: string): Promise<User | undefined> {
    return myPartsRepository.getUserById(userId);
  },

  getPartsByUserId(userId: string): Promise<Part[]> {
    return myPartsRepository.getPartsByUserId(userId);
  },

  getAllParts(): Promise<Part[]> {
    return myPartsRepository.getAllParts();
  },
};
