import "dotenv/config";

import {
    PrismaPg,
} from "@prisma/adapter-pg";

import {
    PrismaClient,
} from "../../../../generated/prisma/client";

let prismaClient: PrismaClient | undefined;

export const getPrismaClient = (): PrismaClient => {
    if (prismaClient) {
        return prismaClient;
    }

    const connectionString =
        process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error(
            "DATABASE_URL is required to connect to PostgreSQL."
        );
    }

    const adapter = new PrismaPg({
        connectionString,
    });

    prismaClient = new PrismaClient({
        adapter,
    });

    return prismaClient;
};

export const disconnectPrisma =
    async (): Promise<void> => {
        if (!prismaClient) {
            return;
        }

        await prismaClient.$disconnect();

        prismaClient = undefined;
    };