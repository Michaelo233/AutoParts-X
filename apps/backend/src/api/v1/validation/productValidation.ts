import Joi from "joi";

export interface ProductSearchQuery {
    search?: string;
    categoryId?: string;
    sellerId?: string;
    minPrice?: number;
    maxPrice?: number;
}

export interface ProductIdParams {
    productId: number;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     ProductSearchQuery:
 *       type: object
 *       properties:
 *         search:
 *           type: string
 *           maxLength: 100
 *           description: Search by product name, description, seller, or category
 *           example: brake pads
 *         categoryId:
 *           type: string
 *           maxLength: 50
 *           description: Filter products by category ID
 *           example: CT003
 *         sellerId:
 *           type: string
 *           maxLength: 50
 *           description: Filter products by seller ID
 *           example: U001
 *         minPrice:
 *           type: number
 *           minimum: 0
 *           description: Minimum product price
 *           example: 20
 *         maxPrice:
 *           type: number
 *           minimum: 0
 *           description: Maximum product price
 *           example: 500
 *
 *     ProductIdParams:
 *       type: object
 *       required:
 *         - productId
 *       properties:
 *         productId:
 *           type: integer
 *           minimum: 1
 *           description: Unique product listing ID
 *           example: 1
 */
export const productSearchSchema: Joi.ObjectSchema<ProductSearchQuery> =
    Joi.object<ProductSearchQuery>({
        search: Joi.string()
            .trim()
            .max(100)
            .empty("")
            .optional(),

        categoryId: Joi.string()
            .trim()
            .min(1)
            .max(50)
            .optional(),

        sellerId: Joi.string()
            .trim()
            .min(1)
            .max(50)
            .optional(),

        minPrice: Joi.number()
            .min(0)
            .optional(),

        maxPrice: Joi.number()
            .min(0)
            .when("minPrice", {
                is: Joi.exist(),
                then: Joi.number().min(Joi.ref("minPrice")),
            })
            .optional(),
    }).unknown(false);

export const productIdSchema: Joi.ObjectSchema<ProductIdParams> =
    Joi.object<ProductIdParams>({
        productId: Joi.number()
            .integer()
            .min(1)
            .required(),
    }).unknown(false);
