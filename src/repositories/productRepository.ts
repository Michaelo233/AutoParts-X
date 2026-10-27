
import { carPartList } from "../data/carPartList";
import type { CarPart } from "../types/autoParts";

let products: CarPart[] = carPartList.flatMap(
  (user) => user.partsOwned
);

export const productRepository = {
  async getAll(): Promise<CarPart[]> {
    return [...products];
  },

  async getById(id: number): Promise<CarPart | undefined> {
    return products.find((part) => part.id === id);
  },

  async add(part: CarPart): Promise<CarPart> {
    products = [...products, part];
    return part;
  },

  async update(part: CarPart): Promise<CarPart | undefined> {
    const existingPart = products.find(
      (item) => item.id === part.id
    );

    if (!existingPart) {
      return undefined;
    }

    products = products.map((item) =>
      item.id === part.id ? part : item
    );

    return part;
  },

  async remove(id: number): Promise<void> {
    products = products.filter((part) => part.id !== id);
  },
};
