import { carPartList } from '../data/carPartList';
import type { User, Part } from '../types/userParts';

interface RawPart {
  id?: string | number;
  partId: string;
  partName: string;
  categoryId?: string;
  Description?: string;
  Price?: number;
  partDescription?: string;
  partPrice?: number;
  partImage: string;
  isFavorite?: boolean;
  isForSale?: boolean;
  description?: string;
  price?: number;
}

interface RawUser {
  userId: string | number;
  userName: string;
  partsOwned: RawPart[];
}

const users: RawUser[] = carPartList;

const normalizePart = (user: RawUser, part: RawPart, index: number): Part => ({
  id: part.id == null ? `${user.userId}-${part.partId}-${index}` : String(part.id),
  partId: String(part.partId),
  partName: part.partName,
  categoryId: part.categoryId ?? '',
  partDescription: part.partDescription ?? part.description ?? part.Description ?? '',
  partPrice: part.partPrice ?? part.price ?? part.Price ?? 0,
  partImage: part.partImage,
  isFavorite: part.isFavorite ?? false,
  isForSale: part.isForSale ?? true,
  userId: String(user.userId),
  userName: user.userName,
});

const normalizeUser = (user: RawUser): User => ({
  userId: String(user.userId),
  userName: user.userName,
  partsOwned: user.partsOwned.map((part, index) => normalizePart(user, part, index)),
});

export const myPartsRepository = {
  getAllUsers: (): User[] => users.map(normalizeUser),

  getUserById: (userId: string): User | undefined => {
    return myPartsRepository.getAllUsers().find((user) => user.userId === userId);
  },

  getPartsByUserId: (userId: string): Part[] => {
    return myPartsRepository.getUserById(userId)?.partsOwned ?? [];
  },

  getAllParts: (): Part[] => {
    return myPartsRepository.getAllUsers().flatMap((user) => user.partsOwned);
  },
};
