import { carPartList as initialUsers } from '../data/carPartList';
import type { Part, User } from '../types/userParts';

let users: User[] = initialUsers.map((user) => ({
  ...user,
  partsOwned: user.partsOwned.map((part) => ({
    ...part,
    partDescription: part.description,
    partPrice: part.price,
    isForSale: part.isForSale ?? false,
    isFavorite: part.isFavorite ?? false,
    userId: user.userId,
    userName: user.userName,
  })),
}));

const clonePart = (part: Part): Part => ({ ...part });

const cloneUser = (user: User): User => ({
  ...user,
  partsOwned: user.partsOwned.map(clonePart),
});

const findUserIndexByName = (userName: string): number =>
  users.findIndex(
    (user) => user.userName.trim().toLowerCase() === userName.trim().toLowerCase()
  );

export const userPartRepository = {
  getUsers: (): User[] => users.map(cloneUser),

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
      users.reduce((maxId, user) => Math.max(maxId, user.userId), 0) + 1;

    const newUser: User = {
      userId: nextUserId,
      userName: normalizedName,
      partsOwned: [],
    };

    users = [...users, newUser];
    return cloneUser(newUser);
  },

  addPartToUser: (userName: string, part: Part): User => {
    let targetUser = userPartRepository.getUserByName(userName);

    if (!targetUser) {
      targetUser = userPartRepository.createUser(userName);
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
      if (user.userId !== targetUser!.userId) {
        return user;
      }

      return {
        ...user,
        partsOwned: [normalizedPart, ...user.partsOwned],
      };
    });

    return userPartRepository.getUserByName(targetUser.userName)!;
  },

  removePartFromUser: (userName: string, partId: string): User | null => {
    const userIndex = findUserIndexByName(userName);
    if (userIndex === -1) return null;

    const currentUser = users[userIndex];
    if (!currentUser.partsOwned.some((part) => part.partId === partId)) {
      return null;
    }

    const updatedParts = currentUser.partsOwned.filter((part) => part.partId !== partId);

    users = users.map((user, index) =>
      index === userIndex ? { ...user, partsOwned: updatedParts } : user
    );

    return cloneUser(users[userIndex]);
  },

  togglePartSaleStatus: (userName: string, partId: string, isForSale: boolean): User | null => {
    const userIndex = findUserIndexByName(userName);
    if (userIndex === -1) return null;
    if (!users[userIndex].partsOwned.some((part) => part.partId === partId)) {
      return null;
    }

    users = users.map((user, index) => {
      if (index !== userIndex) return user;

      return {
        ...user,
        partsOwned: user.partsOwned.map((part) =>
          part.partId === partId ? { ...part, isForSale } : part
        ),
      };
    });

    return cloneUser(users[userIndex]);
  },
};
