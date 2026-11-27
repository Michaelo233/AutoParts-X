import type { Part, User } from '../types/UserParts';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const endpoint = `${baseURL}/api/parts`;

async function readJSON<T>(response: Response): Promise<T> {
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }
    return (await response.json()) as T;
}

export const myPartsRepository = {
    async getAllUsers(): Promise<User[]> {
        const response = await fetch(`${endpoint}/users`);
        return readJSON<User[]>(response);
    },

    async getUserById(userId: string): Promise<User | undefined> {
        const response = await fetch(`${endpoint}/users/${userId}`);
        return readJSON<User | undefined>(response);
    },

    async getPartsByUserId(userId: string): Promise<Part[]> {
        const response = await fetch(`${endpoint}/users/${userId}/parts`);
        return readJSON<Part[]>(response);
    },

    async getAllParts(): Promise<Part[]> {
        const response = await fetch(`${endpoint}`);
        return readJSON<Part[]>(response);
    }
};
