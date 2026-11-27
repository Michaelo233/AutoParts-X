import { prisma } from "../../../lib/prisma";
import { listingToPart } from "./partMapper";
import type { Part, User } from "../types/UserParts";

const listingIncludes = {
  part: true,
  user: true,
  favourites: true,
} as const;

const toUser = (user: {
  userId: string;
  userName: string;
  listings: Parameters<typeof listingToPart>[0][];
}): User => ({
  userId: user.userId,
  userName: user.userName,
  partsOwned: user.listings.map(listingToPart),
});

const toIntegerId = (id: string): number | undefined => {
  const parsed = Number(id);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : undefined;
};

const findUserByName = async (userName: string) => {
  const normalizedName = userName.trim();
  if (!normalizedName) return null;

  return prisma.user.findFirst({
    where: { userName: { equals: normalizedName, mode: "insensitive" } },
    include: { listings: { include: listingIncludes } },
  });
};

const createListingForUser = async (userId: string, part: Part): Promise<Part> => {
  const requestedPartId = toIntegerId(part.partId);

  const listing = await prisma.$transaction(async (transaction) => {
    const catalogPart = requestedPartId
      ? await transaction.part.findUnique({ where: { partId: requestedPartId } })
      : null;
    const savedPart =
      catalogPart ??
      (await transaction.part.create({
        data: {
          partName: part.partName.trim(),
          categoryId: part.categoryId,
        },
      }));

    return transaction.listing.create({
      data: {
        userId,
        partId: savedPart.partId,
        description: part.partDescription ?? part.description ?? "",
        price: part.partPrice ?? part.price ?? 0,
        partImage: part.partImage,
        isForSale: part.isForSale ?? true,
        ...(part.isFavorite
          ? {
              favourites: {
                create: { userId },
              },
            }
          : {}),
      },
      include: { part: true, user: true, favourites: true },
    });
  });

  return listingToPart(listing);
};

export const userPartRepository = {
  async getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({
      include: { listings: { include: listingIncludes } },
    });

    return users.map(toUser);
  },

  async getUserByName(userName: string): Promise<User | null> {
    const user = await findUserByName(userName);
    return user ? toUser(user) : null;
  },

  async getOrCreateUserByName(userName: string): Promise<User> {
    const normalizedName = userName.trim();
    if (!normalizedName) throw new Error("User name is required.");

    const existing = await userPartRepository.getUserByName(normalizedName);
    return existing ?? userPartRepository.createUser(normalizedName);
  },

  async createUser(userName: string): Promise<User> {
    const normalizedName = userName.trim();
    if (!normalizedName) throw new Error("User name is required.");

    const existing = await userPartRepository.getUserByName(normalizedName);
    if (existing) return existing;

    const users = await prisma.user.findMany({ select: { userId: true } });
    const nextUserNumber =
      users.reduce((max, user) => {
        const match = /^U(\d+)$/i.exec(user.userId);
        return match ? Math.max(max, Number(match[1])) : max;
      }, 0) + 1;

    const user = await prisma.user.create({
      data: {
        userId: `U${String(nextUserNumber).padStart(3, "0")}`,
        userName: normalizedName,
      },
      include: { listings: { include: listingIncludes } },
    });

    return toUser(user);
  },

  async addPartToUser(userName: string, part: Part): Promise<User> {
    const normalizedName = userName.trim();
    if (!normalizedName) throw new Error("User name is required.");

    const user = await userPartRepository.getOrCreateUserByName(normalizedName);
    await createListingForUser(String(user.userId), part);

    const savedUser = await userPartRepository.getUserByName(normalizedName);
    if (!savedUser) throw new Error("Unable to load saved user.");
    return savedUser;
  },

  async addListingToUser(userName: string, part: Part): Promise<Part> {
    const user = await userPartRepository.getOrCreateUserByName(userName);
    return createListingForUser(String(user.userId), part);
  },

  async removePartFromUser(
    userName: string,
    partId: string
  ): Promise<User | null> {
    const user = await findUserByName(userName);
    const parsedPartId = toIntegerId(partId);
    if (!user || !parsedPartId) return null;

    const listings = await prisma.listing.findMany({
      where: { userId: user.userId, partId: parsedPartId },
      select: { id: true },
    });
    if (!listings.length) return null;

    const listingIds = listings.map(({ id }) => id);
    await prisma.$transaction([
      prisma.favourite.deleteMany({ where: { listingId: { in: listingIds } } }),
      prisma.listing.deleteMany({ where: { id: { in: listingIds } } }),
    ]);

    const updatedUser = await findUserByName(userName);
    return updatedUser ? toUser(updatedUser) : null;
  },

  async removePartById(partId: string): Promise<boolean> {
    const parsedPartId = toIntegerId(partId);
    if (!parsedPartId) return false;

    const listings = await prisma.listing.findMany({
      where: { partId: parsedPartId },
      select: { id: true },
    });
    if (!listings.length) return false;

    const listingIds = listings.map(({ id }) => id);
    await prisma.$transaction([
      prisma.favourite.deleteMany({ where: { listingId: { in: listingIds } } }),
      prisma.listing.deleteMany({ where: { id: { in: listingIds } } }),
    ]);
    return true;
  },

  async updatePart(updatedPart: Part): Promise<Part | null> {
    const listingId = toIntegerId(updatedPart.id);
    if (!listingId) return null;

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: listingIncludes,
    });
    if (!listing) return null;

    const savedListing = await prisma.$transaction(async (transaction) => {
      await transaction.part.update({
        where: { partId: listing.partId },
        data: {
          partName: updatedPart.partName,
          categoryId: updatedPart.categoryId,
        },
      });

      return transaction.listing.update({
        where: { id: listingId },
        data: {
          description:
            updatedPart.partDescription ?? updatedPart.description ?? listing.description,
          price: updatedPart.partPrice ?? updatedPart.price ?? Number(listing.price),
          partImage: updatedPart.partImage,
          isForSale: updatedPart.isForSale ?? listing.isForSale,
        },
        include: listingIncludes,
      });
    });

    return listingToPart(savedListing);
  },

  async togglePartSaleStatus(
    userName: string,
    partId: string,
    isForSale: boolean
  ): Promise<User | null> {
    const user = await findUserByName(userName);
    const parsedPartId = toIntegerId(partId);
    if (!user || !parsedPartId) return null;

    const result = await prisma.listing.updateMany({
      where: { userId: user.userId, partId: parsedPartId },
      data: { isForSale },
    });
    if (!result.count) return null;

    const updatedUser = await findUserByName(userName);
    return updatedUser ? toUser(updatedUser) : null;
  },
};
