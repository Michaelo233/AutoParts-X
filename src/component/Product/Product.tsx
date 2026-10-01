import { useState } from "react";
import AutoPartsData from "../KailineComponents/data/AutoPartsData";
import type { AutoPart } from "../KailineComponents/types/AutoParts";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";

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