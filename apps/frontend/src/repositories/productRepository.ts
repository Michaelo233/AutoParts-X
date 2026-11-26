import { userPartRepository } from "./userPartRepository";
import type { Part } from "../types/UserParts";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const endpoint = `${baseURL}/api/products`;

export const productRepository = {
  async getAll(): Promise<Part[]> {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error("Unable to retrieve products.");
    }

    return response.json();
  },

  async getById(id: string): Promise<Part | undefined> {
    const response = await fetch(
      `${endpoint}/${encodeURIComponent(id)}`
    );

    if (response.status === 404) {
      return undefined;
    }

    if (!response.ok) {
      throw new Error("Unable to retrieve product.");
    }

    return response.json();
  },

  async add(part: Part, userName: string): Promise<Part> {
    const updatedUser = userPartRepository.addPartToUser(
      userName,
      part
    );

    const addedPart = updatedUser.partsOwned.find(
      (item) => item.partId === part.partId
    );

    if (!addedPart) {
      throw new Error("Unable to add product.");
    }

    return addedPart;
  },

  async update(part: Part): Promise<Part | undefined> {
    const response = await fetch(
      `${endpoint}/${encodeURIComponent(part.id)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: part.partPrice,
        }),
      }
    );

    if (response.status === 404) {
      return undefined;
    }

    if (!response.ok) {
      throw new Error("Unable to update product price.");
    }

    return response.json();
  },

  async remove(id: string): Promise<void> {
    const users = userPartRepository.getUsers();

    for (const user of users) {
      const part = user.partsOwned.find(
        (item) => item.id === id
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