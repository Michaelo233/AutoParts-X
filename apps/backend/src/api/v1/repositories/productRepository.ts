
import { userPartRepository } from "./userPartRepository";
import type { Part } from "../types/UserParts";

interface ProductRepository {
  getAll(): Promise<Part[]>;
  getById(id: string): Promise<Part | undefined>;
  add(part: Part, userName: string): Promise<Part>;
  update(part: Part): Promise<Part | undefined>;
  remove(id: string): Promise<void>;
}

export const productRepository: ProductRepository = {
  async getAll(): Promise<Part[]> {
    return userPartRepository
      .getUsers()
      .flatMap((user) => user.partsOwned);
  },

  async getById(id: string): Promise<Part | undefined> {
    const parts = await this.getAll();
    return parts.find((part) => part.id === id);
  },

  async add(part: Part, userName: string): Promise<Part> {
    const updatedUser = userPartRepository.addPartToUser(
      userName,
      part
    );

    const addedPart = updatedUser.partsOwned.find(
      (item: Part) => item.partId === part.partId
    );

    if (!addedPart) {
      throw new Error("Unable to add product.");
    }

    return addedPart;
  },

  
  async update(part: Part): Promise<Part | undefined> {
    const updatedPart = userPartRepository.updatePart(part);
    return updatedPart ?? undefined;
  },


  async remove(id: string): Promise<void> {
    const users = userPartRepository.getUsers();

    for (const user of users) {
      const part = user.partsOwned.find(
        (item: Part) => item.id === id
      );

      if (part) {
        userPartRepository.removePartFromUser(
          user.userName,
          part.partId
        );
        return;
      }
    }
  },
};
