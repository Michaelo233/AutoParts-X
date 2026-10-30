import { carPartList as initialUsers } from '../data/carPartList';
import type { Part, User } from '../types/userParts';

const parseUserNumber = (value: string | number): number => {
  const match = /^U(\d+)$/i.exec(String(value));
  return match ? Number(match[1]) : 0;
};

let users: User[] = initialUsers.map((user) => ({
  ...user,
  userId: String(user.userId),
  partsOwned: user.partsOwned.map((part) => ({
    ...part,
    id: String(part.id),
    partId: String(part.partId),
    categoryId: part.categoryId ?? 'GENERAL',
    partDescription: part.Description ?? '',
    partPrice: part.Price ?? 0,
    isForSale: part.isForSale ?? false,
    isFavorite: part.isFavorite ?? false,
    userId: String(user.userId),
    userName: user.userName,
  })),
}));

const clonePart = (part: Part): Part => ({ ...part });

const cloneUser = (user: User): User => ({
  ...user,
  partsOwned: user.partsOwned.map(clonePart),
});

const listeners = new Set<() => void>();

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

const normalizeUserName = (userName: string): string => userName.trim();

const findUserIndexByName = (userName: string): number =>
  users.findIndex(
    (user) =>
      user.userName.trim().toLowerCase() === normalizeUserName(userName).toLowerCase()
  );

export const userPartRepository = {
  getUsers: (): User[] => users.map(cloneUser),

  subscribe: (listener: () => void): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  getUserByName: (userName: string): User | null => {
    const normalizedName = userName.trim();
    if (!normalizedName) return null;

    const user = users.find(
      (item) => item.userName.trim().toLowerCase() === normalizedName.toLowerCase()
    );

    return user ? cloneUser(user) : null;
  },

  getOrCreateUserByName: (userName: string): User => {
    const normalizedName = userName.trim();
    if (!normalizedName) {
      throw new Error('User name is required.');
    }

    return userPartRepository.getUserByName(normalizedName) ?? userPartRepository.createUser(normalizedName);
  },

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
