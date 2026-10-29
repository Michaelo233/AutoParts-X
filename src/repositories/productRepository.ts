
import { carPartList } from "../data/carPartList";
import type { CarPart, CarPartOwner } from "../types/autoParts";

export const productRepository = {
  async getAll(): Promise<CarPart[]> {
    return carPartList.flatMap((user) => user.partsOwned);
  },

  async getById(id: number): Promise<CarPart | undefined> {
    const parts = await this.getAll();
    return parts.find((part) => part.id === id);
  },

  async add(part: CarPart, userName: string): Promise<CarPart> {
    let user = carPartList.find(
      (owner) =>
        owner.userName.toLowerCase() === userName.toLowerCase()
    );

    if (!user) {
      const newUser: CarPartOwner = {
        userId: Math.max(0, ...carPartList.map((owner) => owner.userId)) + 1,
        userName,
        partsOwned: [],
      };

      carPartList.push(newUser);
      user = newUser;
    }

    user.partsOwned.push(part);
    return part;
  },

  async update(part: CarPart): Promise<CarPart | undefined> {
    for (const user of carPartList) {
      const index = user.partsOwned.findIndex(
        (item) => item.id === part.id
      );

      if (index !== -1) {
        user.partsOwned[index] = part;
        return part;
      }
    }

    return undefined;
  },

  async remove(id: number): Promise<void> {
    for (const user of carPartList) {
      const index = user.partsOwned.findIndex(
        (part) => part.id === id
      );

      if (index !== -1) {
        user.partsOwned.splice(index, 1);
        return;
      }
    }
  },
};
