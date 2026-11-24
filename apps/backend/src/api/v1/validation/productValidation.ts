import Joi from "joi";

export const productSearchSchema = Joi.object({
    search: Joi.string()
        .trim()
        .max(100)
        .allow("")
        .optional()
        .required()
        .messages({
            "string.empty": "Search term is required",
            "string.pattern.base": "Search term must be a non-empty string"
        })
});