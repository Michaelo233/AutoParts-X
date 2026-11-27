
import { prisma } from "../../../lib/prisma";
import { listingToPart } from "./partMapper";
import { userPartRepository } from "./userPartRepository";
import type { Part } from "../types/UserParts";

interface ProductRepository {
  getAll(): Promise<Part[]>;
  getById(id: string): Promise<Part | undefined>;
  add(part: Part, userName: string): Promise<Part>;
  update(part: Part): Promise<Part | undefined>;
  remove(id: string): Promise<void>;
}

const toListingId = (id: string): number | undefined => {
  const parsed = Number(id);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : undefined;
};

const listingIncludes = {
  part: true,
  user: true,
  favourites: true,
} as const;

export const productRepository: ProductRepository = {
  async getAll(): Promise<Part[]> {
    const listings = await prisma.listing.findMany({
      include: listingIncludes,
    });
    return listings.map(listingToPart);
  },

  async getById(id: string): Promise<Part | undefined> {
    const listingId = toListingId(id);
    if (!listingId) return undefined;

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: listingIncludes,
    });
    return listing ? listingToPart(listing) : undefined;
  },

  async add(part: Part, userName: string): Promise<Part> {
    return userPartRepository.addListingToUser(userName, part);
  },

  async update(part: Part): Promise<Part | undefined> {
    const updatedPart = await userPartRepository.updatePart(part);
    return updatedPart ?? undefined;
  },

  async remove(id: string): Promise<void> {
    const listingId = toListingId(id);
    if (!listingId) return;

    await prisma.$transaction([
      prisma.favourite.deleteMany({ where: { listingId } }),
      prisma.listing.deleteMany({ where: { id: listingId } }),
    ]);
  },
};
