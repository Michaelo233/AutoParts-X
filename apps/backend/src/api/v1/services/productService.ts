import {
    productRepository,
    type ProductListingRecord,
} from "../repositories/productSearchRepository";

import type {
    ProductSearchQuery,
} from "../validation/productValidation";

export interface ProductResponse {
    id: number;
    userId: string;
    userName: string;
    partId: number;
    partName: string;
    categoryId: string;
    categoryName: string;
    description: string;
    price: number;
    partImage: string | null;
    isForSale: boolean;
}

const toProductResponse = (
    listing: ProductListingRecord
): ProductResponse => ({
    id: listing.id,

    userId: listing.userId,
    userName: listing.user.userName,

    partId: listing.partId,
    partName: listing.part.partName,

    categoryId: listing.part.categoryId,
    categoryName:
        listing.part.category.categoryName,

    description: listing.description,
    price: Number(listing.price),
    partImage: listing.partImage,
    isForSale: listing.isForSale,
});

export const productService = {
    async getProducts(
        filters: ProductSearchQuery = {}
    ): Promise<ProductResponse[]> {
        const listings =
            await productRepository.findMany(filters);

        return listings.map(toProductResponse);
    },

    async getProductById(
        productId: number
    ): Promise<ProductResponse | undefined> {
        const listing =
            await productRepository.findById(productId);

        if (!listing) {
            return undefined;
        }

        return toProductResponse(listing);
    },
};