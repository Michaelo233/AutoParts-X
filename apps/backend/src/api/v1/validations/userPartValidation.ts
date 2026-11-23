import Joi from "joi";
import { validateRequest } from "../middleware/validate";

const userNameSchema = Joi.string().trim().min(1).required();
const partIdSchema = Joi.number().integer().positive().required();

const partSchema = Joi.object({
  id: Joi.alternatives().try(Joi.string(), Joi.number()).optional(),
  partId: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  partName: Joi.string().trim().min(1).required(),
  categoryId: Joi.string().trim().min(1).required(),
  partDescription: Joi.string().allow("").optional(),
  description: Joi.string().allow("").optional(),
  partPrice: Joi.number().min(0).optional(),
  price: Joi.number().min(0).optional(),
  partImage: Joi.string().allow("").required(),
  userId: Joi.alternatives().try(Joi.string(), Joi.number()).optional(),
  userName: Joi.string().optional(),
  isFavorite: Joi.boolean().optional(),
  isForSale: Joi.boolean().optional(),
})
  .or("partDescription", "description")
  .or("partPrice", "price");

export const validateUserName = validateRequest(
  Joi.object({ userName: userNameSchema })
);

export const validateUserNameParam = validateRequest(
  Joi.object({ userName: userNameSchema })
);

export const validateAddPart = validateRequest(
  partSchema.append({ userName: userNameSchema })
);

export const validateRemovePartFromUser = validateRequest(
  Joi.object({
    userName: userNameSchema,
    partId: Joi.string().trim().min(1).required(),
  })
);

export const validatePartId = validateRequest(
  Joi.object({ partId: partIdSchema })
);

export const validateUpdatePart = validateRequest(
  partSchema.append({
    id: Joi.alternatives().try(
      Joi.string().trim().min(1),
      Joi.number().integer().positive()
    ).required(),
  })
);

export const validateTogglePartSaleStatus = validateRequest(
  Joi.object({
    userName: userNameSchema,
    partId: Joi.string().trim().min(1).required(),
    isForSale: Joi.boolean().required(),
  })
);
