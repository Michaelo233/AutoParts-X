import { Router } from "express";
import { productController } from "../controllers/productController";
import { validateRequest } from "../middleware/validate";
import {
  getProductsSchema,
  productIdSchema,
} from "../validation/productValidation";

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

export default router;