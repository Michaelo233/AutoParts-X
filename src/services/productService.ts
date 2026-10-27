
import { productRepository } from "../repositories/productRepository";

export const productService = {
  async getPartsForSale() {
    const parts = await productRepository.getAll();

    return parts.filter((part) => part.isForSale === true);
  },
};
