import { Router } from "express";
import { allProductController } from "../controllers/allProductController";
import { validateRequest } from "../middleware/validate";
import {
  getProductsSchema,
  productIdSchema,
  updateProductPriceSchema,
} from "../validations/allProductValidation";

const router = Router();

/**
 * @swagger
 * /api/allProducts:
 *   get:
 *     summary: Retrieve all products available for sale
 *     tags: [All Products]
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.get(
  "/",
  validateRequest(getProductsSchema),
  allProductController.getProducts
);

/**
 * @swagger
 * /api/allProducts/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [All Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product listing ID
 *         example: "1"
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
  "/:id",
  validateRequest(productIdSchema),
  allProductController.getProductById
);

/**
 * @swagger
 * /api/allProducts/{id}:
 *   patch:
 *     summary: Update a product price
 *     tags: [All Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product listing ID
 *         example: "1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - price
 *             properties:
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 exclusiveMinimum: true
 *                 example: 1400
 *     responses:
 *       200:
 *         description: Product price updated successfully
 *       400:
 *         description: Invalid product ID or price
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/:id",
  validateRequest(updateProductPriceSchema),
  allProductController.updateProductPrice
);

export default router;