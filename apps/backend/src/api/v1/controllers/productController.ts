import type {
    Request,
    Response
} from "express";

import { productService } from "../services/productService";

import {
    successResponse,
    errorResponse,
} from "../models/responseModel";

import type {
    ProductSearchQuery,
} from "../validations/productValidation";

export const productController = {

    // Retrieve products with optional search filters.
    async getProducts(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const filters: ProductSearchQuery = {
                search: req.query.search as string | undefined,

                categoryId: req.query.categoryId as string | undefined,

                sellerId: req.query.sellerId as string | undefined,

                minPrice: req.query.minPrice !== undefined
                    ? Number(req.query.minPrice)
                    : undefined,

                maxPrice: req.query.maxPrice !== undefined
                    ? Number(req.query.maxPrice)
                    : undefined,
            };
            // Call the service layer to retrieve products based on filters.
            const products =
                await productService.getProducts(filters);

            res.status(200).json(
                successResponse(
                    products,
                    "Products retrieved successfully."
                )
            );

        } catch (error: unknown) {
            res.status(500).json(
                errorResponse(
                    "An error occurred while retrieving products.",
                    "INTERNAL_SERVER_ERROR"
                )
            );
        }
    },

    // Retrieve a product by its unique listing ID.
    async getProductById(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const productId = Number(req.params.productId);

            const product =
                await productService.getProductById(productId);

            if (!product) {
                res.status(404).json(
                    errorResponse(
                        "Product not found.",
                        "PRODUCT_NOT_FOUND"
                    )
                );

                return;
            }

            res.status(200).json(
                successResponse(
                    product,
                    "Product retrieved successfully."
                )
            );

        } catch (error: unknown) {
            res.status(500).json(
                errorResponse(
                    "An error occurred while retrieving the product.",
                    "INTERNAL_SERVER_ERROR"
                )
            );
        }
    },
};