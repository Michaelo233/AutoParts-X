
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Part } from "../types/userParts";
import { productRepository } from "../repositories/productRepository";
import { userPartRepository } from "../repositories/userPartRepository";

function ProductDetails() {
  const { id } = useParams();
  const [part, setPart] = useState<Part | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPart() {
      const selectedPart = id
        ? await productRepository.getById(id)
        : undefined;

      setPart(selectedPart ?? null);
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

  const seller = userPartRepository.getUsers().find((user) =>
    user.partsOwned.some((item) => item.id === part.id)
  );

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
      <p>Seller: {seller?.userName ?? part.userName ?? "Unknown"}</p>
    </main>
  );
}

export default ProductDetails;
