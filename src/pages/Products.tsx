import { useState } from "react";
import AutoPartsData from "../data/autoPartsData";
import type { AutoPart } from "../types/autoParts";
import ProductCard from "../components/parts/catalog/ProductCard";
import ProductForm from "../components/parts/catalog/ProductForm";

function Product() {
  const initialParts: AutoPart[] = AutoPartsData.flatMap(
    (category) => category.AutoPart
  );

  const [parts, setParts] = useState<AutoPart[]>(initialParts);

  function handleRemove(partId: number) {
    setParts(parts.filter((part) => part.partId !== partId));
  }

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