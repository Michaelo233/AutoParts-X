import Joi from "joi";

// Supported product search filters.
export interface ProductSearchQuery {
    search?: string;
    categoryId?: string;
    sellerId?: string;
    minPrice?: number;
    maxPrice?: number;
}

// Parameters for retrieving a specific product listing.
export interface ProductIdParams {
    productId: number;
}

// Validate product search and filtering parameters.
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

// Validate a product listing ID.
export const productIdSchema: Joi.ObjectSchema<ProductIdParams> =
    Joi.object<ProductIdParams>({

        productId: Joi.number()
            .integer()
            .positive()
            .max(Number.MAX_SAFE_INTEGER)
            .required(),

    }).unknown(false);