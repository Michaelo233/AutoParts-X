import { Router } from "express";

import { productController } from "../controllers/productController";
import { validateRequest } from "../middleware/validate";

import {
    productIdSchema,
    productSearchSchema,
} from "../validation/productValidation";

const productRoutes = Router();

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Retrieve and search product listings
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by part name, description, seller, or category
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: sellerId
 *         schema:
 *           type: string
 *         description: Filter by seller ID
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: Minimum product price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *           minimum: 0
 *         description: Maximum product price
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *       400:
 *         description: Invalid search parameters
 *       500:
 *         description: Unexpected server error
 */
productRoutes.get(
    "/",
    validateRequest({
        query: productSearchSchema,
    }),
    productController.getProducts
);

/**
 * @swagger
 * /api/v1/products/{productId}:
 *   get:
 *     summary: Retrieve one product listing
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Unique product listing ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       400:
 *         description: Invalid product ID
 *       404:
 *         description: Product not found
 *       500:
 *         description: Unexpected server error
 */
productRoutes.get(
    "/:productId",
    validateRequest({
        params: productIdSchema,
    }),
    productController.getProductById
);

export default productRoutes;