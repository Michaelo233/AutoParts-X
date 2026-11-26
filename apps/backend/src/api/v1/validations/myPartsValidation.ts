import Joi from "joi";
import { validateRequest } from "../middleware/validate";

export const validateUserId = validateRequest(
  Joi.object({ userId: Joi.string().trim().min(1).required() })
);
