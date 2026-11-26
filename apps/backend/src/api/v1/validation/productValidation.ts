import Joi from "joi";

export const getProductsSchema = Joi.object({});

export const productIdSchema = Joi.object({
  id: Joi.string().pattern(/^[1-9]\d*$/).required(),
});