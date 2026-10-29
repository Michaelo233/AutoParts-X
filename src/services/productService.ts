
import type { CarPart } from "../types/autoParts";
import { productRepository } from "../repositories/productRepository";

export const productService = {
  async getPartsForSale(): Promise<CarPart[]> {
    const parts = await productRepository.getAll();
    return parts.filter((part) => part.isForSale === true);
  },

  async getPartById(id: number): Promise<CarPart | undefined> {
    return productRepository.getById(id);
  },

  async addPart(part: CarPart, userName: string): Promise<CarPart> {
    return productRepository.add(part, userName);
  },

  async removePart(id: number): Promise<void> {
    await productRepository.remove(id);
  },
};
