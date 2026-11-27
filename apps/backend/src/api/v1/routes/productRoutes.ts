import { Router } from "express";

import { productController } from "../controllers/productController";
import { validateRequest } from "../middleware/validate";

import {
    productSearchSchema,
    productIdSchema,
} from "../validations/productValidation";

const router = Router();

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Retrieve and search products available for sale
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           maxLength: 100
 *         description: Search by product name, description, seller, or category ID
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
 *         description: Internal server error
 */
router.get(
    "/",
    validateRequest(productSearchSchema),
    productController.getProducts
);

/**
 * @swagger
 * /api/v1/products/{productId}:
 *   get:
 *     summary: Retrieve a product by its listing ID
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
 *         description: Internal server error
 */
router.get(
    "/:productId",
    validateRequest(productIdSchema),
    productController.getProductById
);

export default router;