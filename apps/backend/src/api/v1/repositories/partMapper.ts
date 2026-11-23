import type { Part } from "../types/UserParts";

type ListingRecord = {
  id: number;
  userId: string;
  partId: number;
  description: string;
  price: unknown;
  partImage: string;
  isForSale: boolean;
  user: {
    userId: string;
    userName: string;
  };
  part: {
    partName: string;
    categoryId: string;
  };
  favourites: unknown[];
};

export const listingToPart = (listing: ListingRecord): Part => {
  const price = Number(listing.price);

  return {
    id: String(listing.id),
    partId: String(listing.partId),
    partName: listing.part.partName,
    categoryId: listing.part.categoryId,
    partDescription: listing.description,
    partPrice: price,
    partImage: listing.partImage,
    userId: listing.userId,
    userName: listing.user.userName,
    description: listing.description,
    price,
    isFavorite: listing.favourites.length > 0,
    isForSale: listing.isForSale,
  };
};
