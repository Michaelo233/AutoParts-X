import type {
    NextFunction,
    Request,
    Response,
} from "express";

import {
    errorResponse,
    successResponse,
} from "../models/responseModel";

import { productService } from "../services/productService";

import type {
    ProductIdParams,
    ProductSearchQuery,
} from "../validation/productValidation";

export const productController = {
    async getProducts(
        _req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const filters =
                (res.locals.validatedQuery ?? {}) as ProductSearchQuery;

            const products =
                await productService.getProducts(filters);

            res.status(200).json(
                successResponse(
                    products,
                    "Products retrieved successfully."
                )
            );
        } catch (error: unknown) {
            next(error);
        }
    },

    async getProductById(
        _req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { productId } =
                res.locals.validatedParams as ProductIdParams;

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
            next(error);
        }
    },
};