import { carPartList as initialUsers } from "../data/carPartList";
import type { Part, User } from '../types/UserParts';

// Utility function to parse user IDs that may be in the format "U<number>"
// This function extracts the numeric part of the user ID for comparison and sorting purposes.
const parseUserNumber = (value: string | number): number => {
  const match = /^U(\d+)$/i.exec(String(value));
  return match ? Number(match[1]) : 0;
};

// Initialize the users array by normalizing the initial user data
// This ensures that all user and part properties are in the expected format and types.
let users: User[] = initialUsers.map((user) => ({
  ...user,
  userId: String(user.userId),
  partsOwned: user.partsOwned.map((part) => ({
    ...part,
    id: String(part.id),
    partId: String(part.partId),
    categoryId: part.categoryId ?? 'GENERAL',
    partDescription: part.description ?? '',
    partPrice: part.price ?? 0,
    isForSale: part.isForSale ?? false,
    isFavorite: part.isFavorite ?? false,
    userId: String(user.userId),
    userName: user.userName,
  })),
}));

// Utility function to clone a Part object
// This function creates a shallow copy of a Part object to prevent direct mutations.
const clonePart = (part: Part): Part => ({ ...part });

// Utility function to clone a User object
// This function creates a shallow copy of a User object, including cloning its partsOwned array.
const cloneUser = (user: User): User => ({
  ...user,
  partsOwned: user.partsOwned.map(clonePart),
});

// Set of listeners to notify when the users data changes
// This allows components or services to subscribe to changes in the user parts data.
const listeners = new Set<() => void>();

// Function to notify all subscribed listeners of changes to the users data
// This function iterates through the set of listeners and invokes each one, allowing them to react
//  to changes in the data.
const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

// Utility function to normalize user names for consistent comparisons
// This function trims whitespace from the user name to ensure consistent matching and storage.
const normalizeUserName = (userName: string): string => userName.trim();

// Utility function to find the index of a user by their normalized name
// This function searches the users array for a user whose name matches the provided name (case-insensitive)
const findUserIndexByName = (userName: string): number =>
  users.findIndex(
    (user) =>
      user.userName.trim().toLowerCase() === normalizeUserName(userName).toLowerCase()
  );

// Exported repository object that provides methods to access and manipulate user parts data
// The userPartRepository object provides methods to retrieve users, subscribe to changes,
//  get a user by name, create a new user, add or remove parts from a user, and update part details.
export const userPartRepository = {
  getUsers: (): User[] => users.map(cloneUser),

  // Method to subscribe to changes in the users data
  // This allows external components or services to be notified when the users data changes.
  subscribe: (listener: () => void): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // Method to get a user by their name
  // This method searches for a user whose name matches the provided name (case-insensitive)
  // and returns a cloned User object if found, or null if not found.
  getUserByName: (userName: string): User | null => {
    const normalizedName = userName.trim();
    if (!normalizedName) return null;

    const user = users.find(
      (item) => item.userName.trim().toLowerCase() === normalizedName.toLowerCase()
    );

    return user ? cloneUser(user) : null;
  },

  // Method to get or create a user by their name
  // This method attempts to find a user by name, and if not found, creates a new user with that name.
  // It returns a cloned User object representing the found or newly created user.
  getOrCreateUserByName: (userName: string): User => {
    const normalizedName = userName.trim();
    if (!normalizedName) {
      throw new Error('User name is required.');
    }

    return userPartRepository.getUserByName(normalizedName) ?? userPartRepository.createUser(normalizedName);
  },

  // Method to create a new user with the specified name
  // This method generates a new user ID, creates a new User object, adds it to the users array,
  // and notifies listeners of the change. It returns a cloned User object representing the new user.
  createUser: (userName: string): User => {
    const normalizedName = userName.trim();
    if (!normalizedName) {
      throw new Error('User name is required.');
    }

    if (userPartRepository.getUserByName(normalizedName)) {
      return userPartRepository.getUserByName(normalizedName)!;
    }

    const nextUserId =
      users.reduce((maxId, user) => Math.max(maxId, parseUserNumber(user.userId)), 0) + 1;

    const newUser: User = {
      userId: `U${String(nextUserId).padStart(3, '0')}`,
      userName: normalizedName,
      partsOwned: [],
    };

    users = [...users, newUser];
    notifyListeners();
    return cloneUser(newUser);
  },

  // Method to add a part to a user's partsOwned list
  // This method normalizes the part data, checks if the user exists (creating them if necessary),
  // and adds the part to the user's partsOwned list if it doesn't already exist. It notifies listeners
  // of the change and returns a cloned User object representing the updated user.
  addPartToUser: (userName: string, part: Part): User => {
    const normalizedUserName = normalizeUserName(userName);
    let targetUser = userPartRepository.getUserByName(normalizedUserName);

    if (!targetUser) {
      targetUser = userPartRepository.createUser(normalizedUserName);
    }

    const normalizedPart: Part = {
      ...part,
      partId: part.partId || `PART_${Date.now()}`,
      userId: targetUser.userId,
      userName: targetUser.userName,
      partDescription: part.partDescription || part.description || '',
      partPrice: part.partPrice ?? part.price ?? 0,
      isForSale: Boolean(part.isForSale),
      isFavorite: Boolean(part.isFavorite),
    };

    users = users.map((user) => {
      if (String(user.userId) !== String(targetUser!.userId)) {
        return user;
      }

      const alreadyExists = user.partsOwned.some(
        (existingPart) => String(existingPart.partId) === String(normalizedPart.partId)
      );

      if (alreadyExists) {
        return user;
      }

      return {
        ...user,
        partsOwned: [normalizedPart, ...user.partsOwned],
      };
    });

    notifyListeners();
    return userPartRepository.getUserByName(targetUser.userName)!;
  },

  // Method to remove a part from a user's partsOwned list
  // This method finds the user by name and removes the part with the specified ID from their partsOwned list.
  // It notifies listeners of the change and returns a cloned User object representing the updated user.
  removePartFromUser: (userName: string, partId: string): User | null => {
    const userIndex = findUserIndexByName(userName);
    if (userIndex === -1) return null;

    const currentUser = users[userIndex];
    if (!currentUser.partsOwned.some((part) => String(part.partId) === String(partId))) {
      return null;
    }

    const updatedParts = currentUser.partsOwned.filter(
      (part) => String(part.partId) !== String(partId)
    );

    users = users.map((user, index) =>
      index === userIndex ? { ...user, partsOwned: updatedParts } : user
    );

    notifyListeners();
    return cloneUser(users[userIndex]);
  },

  // Method to remove a part by its ID for a user
  // This method iterates through all users and removes any part that matches the specified part ID.
  // It notifies listeners of the change if any parts were removed and returns a boolean indicating
  // whether any parts were removed.
  removePartById: (partId: string): boolean => {
    let removed = false;

    users = users.map((user) => {
      const nextParts = user.partsOwned.filter((part) => {
        const matches = String(part.partId) === String(partId);
        if (matches) removed = true;
        return !matches;
      });

      return { ...user, partsOwned: nextParts };
    });

    if (removed) {
      notifyListeners();
    }

    return removed;
  },

  // Method to update a part's details for a user
  // This method finds the user by name and updates the part with the specified ID in their partsOwned list.
  // It notifies listeners of the change and returns a cloned User object representing the updated user.
  updatePart: (updatedPart: Part): Part | null => {
    let savedPart: Part | null = null;

    users = users.map((user) => ({
      ...user,
      partsOwned: user.partsOwned.map((part) => {
        if (part.id !== updatedPart.id) {
          return part;
        }

        savedPart = {
          ...part,
          ...updatedPart,
          id: part.id,
          partId: part.partId,
          userId: part.userId,
          userName: part.userName,
        };

        return savedPart;
      }),
    }));

    return savedPart ? clonePart(savedPart as Part) : null;
  },

  // Method to toggle the sale status of a part for a user
  // This method finds the user by name and toggles the isForSale property of the part with the specified ID.
  // It notifies listeners of the change and returns a cloned User object representing the updated user.
  togglePartSaleStatus: (userName: string, partId: string, isForSale: boolean): User | null => {
    const userIndex = findUserIndexByName(userName);
    if (userIndex === -1) return null;
    if (!users[userIndex].partsOwned.some((part) => String(part.partId) === String(partId))) {
      return null;
    }

    users = users.map((user, index) => {
      if (index !== userIndex) return user;

      return {
        ...user,
        partsOwned: user.partsOwned.map((part) =>
          String(part.partId) === String(partId) ? { ...part, isForSale } : part
        ),
      };
    });

    notifyListeners();
    return cloneUser(users[userIndex]);
  },
};
