
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Part } from "../types/userParts";
import { productService } from "../services/productService";
import { userPartService } from "../services/userPartService";

/**
 * Sprint 3 Architecture:
 * This component loads product details through productService
 * and seller information through userPartService.
 * Both services use repositories for data access, keeping
 * repository operations separate from the page.
 */
function ProductDetails() {
  const { id } = useParams();
  const [part, setPart] = useState<Part | null>(null);
  const [sellerName, setSellerName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPart() {
      setLoading(true);

      const selectedPart = id
        ? await productService.getPartById(id)
        : undefined;

      setPart(selectedPart ?? null);

      if (selectedPart) {
        const users = await userPartService.getAllUsers();
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
  }, [id]);

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
