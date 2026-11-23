import { carPartList } from '../data/carPartList';
import type { User, Part } from '../types/UserParts';

// Define the structure of raw part data as it might be received from an external source
interface RawPart {
  id?: string | number;
  partId: string | number;
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

// Define the structure of raw user data as it might be received from an external source
interface RawUser {
  userId: string | number;
  userName: string;
  partsOwned: RawPart[];
}

// Simulated in-memory repository for user parts data
const users: RawUser[] = carPartList;

// Function to normalize raw part data into the Part interface
// This function takes a RawUser and a RawPart, along with an index for generating a unique ID if necessary.
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

// Function to normalize raw user data into the User interface
// This function takes a RawUser and maps its partsOwned array to normalized Part objects.
const normalizeUser = (user: RawUser): User => ({
  userId: String(user.userId),
  userName: user.userName,
  partsOwned: user.partsOwned.map((part, index) => normalizePart(user, part, index)),
});

// Exported repository object that provides methods to access and manipulate user parts data
// The myPartsRepository object provides methods to retrieve all users, get a user by ID,
//  get parts by user ID, and get all parts across all users.
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
