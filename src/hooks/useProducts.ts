
import { useEffect, useState } from "react";
import type { Part } from "../types/userParts";
import { productService } from "../services/productService";

// Manages product listing state for components.
export function useProducts() {
  const [products, setProducts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    const availableParts = await productService.getPartsForSale();
    setProducts(availableParts);
    setLoading(false);
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  async function addProduct(part: Part, userName: string) {
    await productService.addPart(part, userName);
    await loadProducts();
  }

  async function removeProduct(id: string) {
    await productService.removePart(id);
    await loadProducts();
  }

  return {
    products,
    loading,
    addProduct,
    removeProduct,
  };
}
