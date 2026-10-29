
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { CarPart } from "../types/autoParts";
import { productRepository } from "../repositories/productRepository";
import { carPartList } from "../data/carPartList";

function ProductDetails() {
  const { id } = useParams();
  const [part, setPart] = useState<CarPart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPart() {
      const selectedPart = await productRepository.getById(Number(id));
      setPart(selectedPart ?? null);
      setLoading(false);
    }

    loadPart();
  }, [id]);

  if (loading) {
    return <p>Loading part details...</p>;
  }

  if (!part) {
    return <p>Part not found.</p>;
  }

  const seller = carPartList.find((user) =>
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

      <p>Price: ${part.price.toFixed(2)}</p>
      <p>Description: {part.description}</p>
      <p>Part ID: {part.partId}</p>
      <p>Seller: {seller?.userName ?? "Unknown"}</p>
    </main>
  );
}

export default ProductDetails;
