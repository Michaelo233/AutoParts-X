
import { useState } from "react";
import { carPartList } from "../data/carPartList";
import type { CarPart } from "../types/autoParts";
import ProductCard from "../components/parts/catalog/ProductCard";
import ProductForm from "../components/parts/catalog/ProductForm";

function Product() {
  const [parts, setParts] = useState<CarPart[]>(() =>
    carPartList.flatMap((user) => user.partsOwned)
  );

  function handleRemove(partId: number) {
    setParts((previousParts) =>
      previousParts.filter((part) => part.id !== partId)
    );
  }

  const partsForSale = parts.filter(
    (part) => part.isForSale === true
  );

  return (
    <main>
      <h1>Auto Parts</h1>

      <ProductForm parts={parts} setParts={setParts} />

      {partsForSale.length === 0 ? (
        <p>No parts available for sale</p>
      ) : (
        partsForSale.map((part) => (
          <ProductCard
            key={part.id}
            part={part}
            onRemove={handleRemove}
          />
        ))
      )}
    </main>
  );
}

export default Product;
