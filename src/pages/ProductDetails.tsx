
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Part } from "../types/userParts";
import { useProducts } from "../hooks/useProducts";
import { productService } from "../services/productService";
import { userPartService } from "../services/userPartService";

/**
 * Sprint 3 Architecture:
 * This component uses useProducts for shared product-listing logic.
 * It also retrieves individual product details through productService
 * and seller information through userPartService.
 * Services use repositories for data access, keeping presentation,
 * business logic, and data access separate.
 */
function ProductDetails() {
  const { id } = useParams();
  const { products } = useProducts();

  const [part, setPart] = useState<Part | null>(null);
  const [sellerName, setSellerName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadPart() {
      setLoading(true);

      const selectedPart =
        products.find((product) => product.id === id) ??
        (id ? await productService.getPartById(id) : undefined);

      if (ignore) return;

      setPart(selectedPart ?? null);

      if (selectedPart) {
        const users = await userPartService.getAllUsers();

        if (ignore) return;

        const seller = users.find((user) =>
          user.partsOwned.some((item) => item.id === selectedPart.id)
        );

        setSellerName(
          seller?.userName ?? selectedPart.userName ?? null
        );
      } else {
        setSellerName(null);
      }

      setLoading(false);
    }

    void loadPart();

    return () => {
      ignore = true;
    };
  }, [id, products]);

  if (loading) {
    return <p>Loading part details...</p>;
  }

  if (!part) {
    return <p>Part not found.</p>;
  }

  return (
    <main>
      <Link to="/products">Back to Products</Link>

      <h1>{part.partName}</h1>

      {part.partImage.trim() && (
        <img
          src={part.partImage}
          alt={part.partName}
          width="300"
        />
      )}

      <p>Price: ${part.partPrice.toFixed(2)}</p>
      <p>Description: {part.partDescription}</p>
      <p>Part ID: {part.partId}</p>
      <p>Seller: {sellerName ?? "Unknown"}</p>
    </main>
  );
}

export default ProductDetails;
