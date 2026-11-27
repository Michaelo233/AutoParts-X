import { Request, Response, NextFunction } from "express";
import { allProductService } from "../services/allProductService";

export const allProductController = {
  async getProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const products = await allProductService.getPartsForSale();
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
      const product = await allProductService.getPartById(
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

  async updateProductPrice(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const product = await allProductService.updateProductPrice(
        String(req.params.id),
        req.body.price
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