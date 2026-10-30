
import type { Part } from "../types/userParts";
import { productRepository } from "../repositories/productRepository";

export const productService = {
  async getPartsForSale(): Promise<Part[]> {
    const parts = await productRepository.getAll();
    return parts.filter((part) => part.isForSale === true);
  },

  async getPartById(id: string): Promise<Part | undefined> {
    return productRepository.getById(id);
  },

  async addPart(part: Part, userName: string): Promise<Part> {
    return productRepository.add(part, userName);
  },

  async removePart(id: string): Promise<void> {
    await productRepository.remove(id);
  },
};
