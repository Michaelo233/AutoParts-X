
import { prisma } from "../../../lib/prisma";
import { listingToPart } from "./partMapper";
import type { Part } from "../types/UserParts";

export const carPartSearchRepository = {
  async getAllParts(): Promise<Part[]> {
    const listings = await prisma.listing.findMany({
      where: { isForSale: true },
      include: { part: true, user: true, favourites: true },
    });

    return listings.map(listingToPart);
  },
};
