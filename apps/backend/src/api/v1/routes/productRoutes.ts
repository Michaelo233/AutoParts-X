import { Router } from "express";
import { productController } from "../controllers/productController";
import { validateRequest } from "../middleware/validate";
import {
  getProductsSchema,
  productIdSchema,
  updateProductPriceSchema,
} from "../validations/productValidation";

const router = Router();

router.get(
  "/",
  validateRequest(getProductsSchema),
  productController.getProducts
);

router.get(
  "/:id",
  validateRequest(productIdSchema),
  productController.getProductById
);

router.patch(
  "/:id",
  validateRequest(updateProductPriceSchema),
  productController.updateProductPrice
);

export default router;