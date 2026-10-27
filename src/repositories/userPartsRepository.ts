import userData from '../data/carPartList.json';
import type { Part, User } from '../types/userParts';

const STORAGE_KEY = 'autoparts-x-user-parts';
const seedUsers: User[] = userData as User[];

const cloneUsers = (users: User[]): User[] =>
  typeof structuredClone === 'function'
    ? structuredClone(users)
    : (JSON.parse(JSON.stringify(users)) as User[]);

class UserPartsRepository {
  private loadUsers(): User[] {
    const storedUsers = localStorage.getItem(STORAGE_KEY);

    if (!storedUsers) {
      const initialUsers = cloneUsers(seedUsers);
      this.saveUsers(initialUsers);
      return initialUsers;
    }

    try {
      return JSON.parse(storedUsers) as User[];
    } catch {
      const initialUsers = cloneUsers(seedUsers);
      this.saveUsers(initialUsers);
      return initialUsers;
    }
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  getUser(userId: number): User | undefined {
    return this.loadUsers().find((user) => user.userId === userId);
  }

  listParts(userId: number): Part[] {
    return this.getUser(userId)?.partsOwned ?? [];
  }

  createPart(userId: number, part: Part): Part | null {
    const users = this.loadUsers();
    const userIndex = users.findIndex((user) => user.userId === userId);

    if (userIndex === -1) return null;

    const createdPart: Part = { ...part };
    users[userIndex] = {
      ...users[userIndex],
      partsOwned: [createdPart, ...users[userIndex].partsOwned],
    };
    this.saveUsers(users);

    return createdPart;
  }

  updatePart(userId: number, partId: string, updates: Partial<Part>): Part | null {
    const users = this.loadUsers();
    const userIndex = users.findIndex((user) => user.userId === userId);

    if (userIndex === -1) return null;

    const partIndex = users[userIndex].partsOwned.findIndex(
      (part) => part.partId === partId
    );

    if (partIndex === -1) return null;

    const updatedPart = {
      ...users[userIndex].partsOwned[partIndex],
      ...updates,
    };

    users[userIndex].partsOwned[partIndex] = updatedPart;
    this.saveUsers(users);

    return updatedPart;
  }

  deletePart(userId: number, partId: string): boolean {
    const users = this.loadUsers();
    const userIndex = users.findIndex((user) => user.userId === userId);

    if (userIndex === -1) return false;

    const nextParts = users[userIndex].partsOwned.filter(
      (part) => part.partId !== partId
    );

    if (nextParts.length === users[userIndex].partsOwned.length) return false;

    users[userIndex] = { ...users[userIndex], partsOwned: nextParts };
    this.saveUsers(users);

    return true;
  }
}

export const userPartsRepository = new UserPartsRepository();
