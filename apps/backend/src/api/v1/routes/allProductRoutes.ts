import { Router } from "express";
import { allProductController } from "../controllers/allProductController";
import { validateRequest } from "../middleware/validate";
import {
  getProductsSchema,
  productIdSchema,
  updateProductPriceSchema,
} from "../validations/allProductValidation";

const router = Router();

router.get(
  "/",
  validateRequest(getProductsSchema),
  allProductController.getProducts
);

router.get(
  "/:id",
  validateRequest(productIdSchema),
  allProductController.getProductById
);

router.patch(
  "/:id",
  validateRequest(updateProductPriceSchema),
  allProductController.updateProductPrice
);

export default router;