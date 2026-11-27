import { Router } from "express";

import { productController } from "../controllers/productController";
import { validateRequest } from "../middleware/validate";

import {
    productSearchSchema,
    productIdSchema,
} from "../validations/productValidation";

const router = Router();

router.get(
    "/",
    validateRequest(productSearchSchema),
    productController.getProducts
);


router.get(
    "/:productId",
    validateRequest(productIdSchema),
    productController.getProductById
);

export default router;