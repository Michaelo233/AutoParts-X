import Joi from "joi";

export type ProductSortOption =
    | "featured"
    | "price-asc"
    | "price-desc"
    | "name-asc";

export interface ProductSearchQuery {
    search?: string;
    categoryId?: string;
    sellerId?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: ProductSortOption;
}

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

        sortBy: Joi.string()
            .valid(
                "featured",
                "price-asc",
                "price-desc",
                "name-asc"
            )
            .optional(),
    }).unknown(false);