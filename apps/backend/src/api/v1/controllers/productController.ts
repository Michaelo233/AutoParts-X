import { Request, Response, NextFunction } from "express";
import { productService } from "../services/productService";

export const productController = {
  async getProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const products = await productService.getPartsForSale();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },

  async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product = await productService.getPartById(
        String(req.params.id)
      );

      if (!product) {
        res.status(404).json({ error: "Product not found." });
        return;
      }

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
};