import { useState } from "react";
import type { Part } from "../types/userParts";
import ProductCard from "../components/parts/catalog/ProductCard";
import ProductForm from "../components/parts/catalog/ProductForm";

/**
 * Product Component
 *
 * Displays a form to add new auto parts and a list of existing auto parts.
 */
function Product() {
  const initialParts: Part[] = [];
  const [parts, setParts] = useState<Part[]>(initialParts);

  const handleRemove = (partId: Part["partId"]) => {
    setParts((currentParts) =>
      currentParts.filter((part) => part.partId !== partId),
    );
  };

  return (
    <main>
      <h1>Auto Parts</h1>

      <ProductForm parts={parts} setParts={setParts} />

      {parts.map((part) => (
        <ProductCard
          key={part.partId}
          part={part}
          onRemove={handleRemove}
        />
      ))}
    </main>
  );
}

export default Product;