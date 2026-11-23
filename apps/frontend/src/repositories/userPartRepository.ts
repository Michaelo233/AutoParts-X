import type { Part, User } from "../types/UserParts";

// API endpoint used to persist user and part data through the backend.
const baseURL = import.meta.env.VITE_API_BASE_URL;
const endpoint = `${baseURL}/api/addPart`;

// Cached users let synchronous subscribers read the latest loaded server data.
let users: User[] = [];
const listeners = new Set<() => void>();

// Clone parts so callers cannot mutate the repository cache directly.
const clonePart = (part: Part): Part => ({ ...part });

// Clone a user and all owned parts before returning cached data.
const cloneUser = (user: User): User => ({
  ...user,
  partsOwned: user.partsOwned.map(clonePart),
});

// Notify subscribers after the cached server data changes.
const notifyListeners = (): void => {
  listeners.forEach((listener) => listener());
};

// Add or replace one user in the cache using the server response.
const cacheUser = (user: User): User => {
  const index = users.findIndex(
    (item) => String(item.userId) === String(user.userId)
  );
  users =
    index < 0
      ? [...users, cloneUser(user)]
      : users.map((item, itemIndex) =>
          itemIndex === index ? cloneUser(user) : item
        );
  notifyListeners();
  return cloneUser(user);
};

// Replace the cache with the latest user list from the backend.
const cacheUsers = (nextUsers: User[]): User[] => {
  users = nextUsers.map(cloneUser);
  notifyListeners();
  return userPartRepository.getUsers();
};

// Parse successful JSON responses and surface HTTP errors to callers.
async function readJSON<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `API error: ${response.status}`);
  }

  return (await response.json()) as T;
}

export const userPartRepository = {
  // Return a cloned snapshot of users currently held in the local cache.
  getUsers: (): User[] => users.map(cloneUser),

  // Fetch all users from the backend and refresh the local cache.
  refreshUsers: async (): Promise<User[]> => {
    const response = await fetch(`${endpoint}/users`);
    return cacheUsers(await readJSON<User[]>(response));
  },

  // Subscribe to local cache changes, such as completed API mutations.
  subscribe: (listener: () => void): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // Find a user by name in the currently cached server data.
  getUserByName: (userName: string): User | null => {
    const normalizedName = userName.trim().toLowerCase();
    if (!normalizedName) return null;

    const user = users.find(
      (item) => item.userName.trim().toLowerCase() === normalizedName
    );
    return user ? cloneUser(user) : null;
  },

  // Fetch one user by name and add the returned record to the cache.
  fetchUserByName: async (userName: string): Promise<User | null> => {
    const response = await fetch(
      `${endpoint}/users/by-name/${encodeURIComponent(userName.trim())}`
    );
    const user = await readJSON<User | null>(response);
    return user ? cacheUser(user) : null;
  },

  // Ask the backend to find or create a user with the supplied name.
  getOrCreateUserByName: async (userName: string): Promise<User> => {
    const normalizedName = userName.trim();
    if (!normalizedName) throw new Error("User name is required.");

    const response = await fetch(`${endpoint}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: normalizedName }),
    });
    return cacheUser(await readJSON<User>(response));
  },

  // Create a user using the backend's find-or-create operation.
  createUser: async (userName: string): Promise<User> =>
    userPartRepository.getOrCreateUserByName(userName),

  // Add a part for a user and cache the updated user returned by the backend.
  addPartToUser: async (userName: string, part: Part): Promise<User> => {
    const response = await fetch(
      `${endpoint}/users/${encodeURIComponent(userName.trim())}/parts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(part),
      }
    );
    return cacheUser(await readJSON<User>(response));
  },

  // Remove a part from one user and cache the updated user record.
  removePartFromUser: async (
    userName: string,
    partId: string
  ): Promise<User | null> => {
    const response = await fetch(
      `${endpoint}/users/${encodeURIComponent(userName.trim())}/parts/${encodeURIComponent(partId)}`,
      { method: "DELETE" }
    );
    return cacheUser(await readJSON<User>(response));
  },

  // Remove a part by ID and remove it from every cached user's part list.
  removePartById: async (partId: string): Promise<boolean> => {
    const response = await fetch(
      `${endpoint}/${encodeURIComponent(partId)}`,
      { method: "DELETE" }
    );
    const result = await readJSON<{ removed: boolean }>(response);
    if (!result.removed) return false;

    users = users.map((user) => ({
      ...user,
      partsOwned: user.partsOwned.filter(
        (part) => String(part.partId) !== String(partId)
      ),
    }));
    notifyListeners();
    return true;
  },

  // Update a part and replace the cached record with the backend response.
  updatePart: async (updatedPart: Part): Promise<Part | null> => {
    const response = await fetch(
      `${endpoint}/${encodeURIComponent(updatedPart.id)}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPart),
      }
    );
    const savedPart = await readJSON<Part>(response);

    users = users.map((user) => ({
      ...user,
      partsOwned: user.partsOwned.map((part) =>
        part.id === savedPart.id ? clonePart(savedPart) : part
      ),
    }));
    notifyListeners();
    return clonePart(savedPart);
  },

  // Update a user's part sale status and cache the updated user.
  togglePartSaleStatus: async (
    userName: string,
    partId: string,
    isForSale: boolean
  ): Promise<User | null> => {
    const response = await fetch(
      `${endpoint}/users/${encodeURIComponent(userName.trim())}/parts/${encodeURIComponent(partId)}/sale`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isForSale }),
      }
    );
    return cacheUser(await readJSON<User>(response));
  },
};
