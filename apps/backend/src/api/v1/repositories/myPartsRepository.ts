import { prisma } from "../../../lib/prisma";
import { listingToPart } from "./partMapper";
import type { User } from "../types/UserParts";

const userToUser = (user: {
  userId: string;
  userName: string;
  listings: Parameters<typeof listingToPart>[0][];
}): User => ({
  userId: user.userId,
  userName: user.userName,
  partsOwned: user.listings.map(listingToPart),
});

export const myPartsRepository = {
  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({
      include: {
        listings: {
          include: { part: true, user: true, favourites: true },
        },
      },
    });

    return users.map(userToUser);
  },

  async getUserById(userId: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: { userId },
      include: {
        listings: {
          include: { part: true, user: true, favourites: true },
        },
      },
    });

    return user ? userToUser(user) : undefined;
  },

  async getPartsByUserId(userId: string): Promise<User["partsOwned"]> {
    const listings = await prisma.listing.findMany({
      where: { userId },
      include: { part: true, user: true, favourites: true },
    });

    return listings.map(listingToPart);
  },

  async getAllParts(): Promise<User["partsOwned"]> {
    const listings = await prisma.listing.findMany({
      include: { part: true, user: true, favourites: true },
    });

    return listings.map(listingToPart);
  },
};
