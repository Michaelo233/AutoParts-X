
import { useEffect, useState } from "react";
import type { CarPart } from "../types/autoParts";
import { productService } from "../services/productService";

// Provides available product listings and loading state to components.
export function useProducts() {
  const [products, setProducts] = useState<CarPart[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const availableParts = await productService.getPartsForSale();
      setProducts(availableParts);
      setLoading(false);
    }

    loadProducts();
  }, []);

  return {
    products,
    loading,
  };
}
