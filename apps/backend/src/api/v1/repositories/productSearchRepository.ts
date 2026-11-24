import type {
    Prisma,
} from "../../../../generated/prisma/client";

import {
    getPrismaClient,
    disconnectPrisma,
} from "../db/prisma";

import type {
    ProductSearchQuery,
} from "../validation/productValidation";

const productInclude = {
    user: {
        select: {
            userId: true,
            userName: true,
        },
    },

    part: {
        include: {
            category: true,
        },
    },
} satisfies Prisma.ListingInclude;

export type ProductListingRecord =
    Prisma.ListingGetPayload<{
        include: typeof productInclude;
    }>;

const createProductWhere = (
    filters: ProductSearchQuery
): Prisma.ListingWhereInput => {
    const where: Prisma.ListingWhereInput = {
        isForSale: true,
    };

    if (filters.sellerId) {
        where.userId = filters.sellerId;
    }

    if (filters.categoryId) {
        where.part = {
            categoryId: filters.categoryId,
        };
    }

    if (
        filters.minPrice !== undefined ||
        filters.maxPrice !== undefined
    ) {
        where.price = {
            ...(filters.minPrice !== undefined && {
                gte: filters.minPrice,
            }),

            ...(filters.maxPrice !== undefined && {
                lte: filters.maxPrice,
            }),
        };
    }

    const search = filters.search?.trim();

    if (search) {
        where.OR = [
            {
                description: {
                    contains: search,
                    mode: "insensitive",
                },
            },

            {
                user: {
                    userName: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            },

            {
                part: {
                    partName: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            },

            {
                part: {
                    category: {
                        categoryName: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
            },
        ];
    }

    return where;
};

export const productRepository = {
    async findMany(
        filters: ProductSearchQuery = {}
    ): Promise<ProductListingRecord[]> {
        const prisma = getPrismaClient();

        return prisma.listing.findMany({
            where: createProductWhere(filters),

            include: productInclude,

            orderBy: {
                id: "asc",
            },
        });
    },

    async findById(
        productId: number
    ): Promise<ProductListingRecord | null> {
        const prisma = getPrismaClient();

        const listing = await prisma.listing.findUnique({
            where: {
                id: productId,
            },

            include: productInclude,
        });

        if (!listing || !listing.isForSale) {
            return null;
        }

        return listing;
    },
};