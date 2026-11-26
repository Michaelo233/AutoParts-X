import Joi from "joi";

export const getProductsSchema = Joi.object({});

export const productIdSchema = Joi.object({
  id: Joi.string().pattern(/^[1-9]\d*$/).required(),
});

export const updateProductPriceSchema = Joi.object({
  id: Joi.string().pattern(/^[1-9]\d*$/).required(),
  price: Joi.number().positive().precision(2).required(),
});