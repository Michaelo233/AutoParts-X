import type { Part } from "../types/UserParts";
import { productRepository } from "../repositories/productRepository";
import type { ProductSearchQuery } from "../validations/productValidation";

export const productService = {

    // Retrieve and filter products available for sale.
    async getProducts(
        filters: ProductSearchQuery = {}
    ): Promise<Part[]> {

        const products = await productRepository.getAll();

        const search = filters.search?.trim().toLowerCase();

        return products.filter((product) => {

            const price = product.partPrice ?? product.price ?? 0;

            const matchesSearch =
                !search ||
                [
                    product.partName,
                    product.partDescription,
                    product.description,
                    product.userName,
                    product.categoryId,
                ].some((value) =>
                    String(value ?? "")
                        .toLowerCase()
                        .includes(search)
                );

            const matchesCategory =
                !filters.categoryId ||
                product.categoryId === filters.categoryId;

            const matchesSeller =
                !filters.sellerId ||
                product.userId === filters.sellerId;

            const matchesMinPrice =
                filters.minPrice === undefined ||
                price >= filters.minPrice;

            const matchesMaxPrice =
                filters.maxPrice === undefined ||
                price <= filters.maxPrice;

            return (
                product.isForSale === true &&
                matchesSearch &&
                matchesCategory &&
                matchesSeller &&
                matchesMinPrice &&
                matchesMaxPrice
            );
        });
    },

    // Retrieve a product by its listing ID.
    async getProductById(
        productId: number
    ): Promise<Part | undefined> {

        return productRepository.getById(String(productId));
    },
};