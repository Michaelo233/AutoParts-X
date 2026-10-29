import { useState } from "react";
import ProductCard from "../components/parts/catalog/ProductCard";
import ProductForm from "../components/parts/catalog/ProductForm";
import type { NewPart, Part } from "../types/userParts";

const initialParts: Part[] = [
  {
    id: "P001",
    partId: "P001",
    partName: "Engine Block",
    categoryId: "ENG",
    partDescription: "Sample engine part for previewing the catalog page.",
    partPrice: 2500,
    partImage: "",
    isFavorite: false,
    isForSale: true,
  },
  {
    id: "P002",
    partId: "P002",
    partName: "Brake Pads",
    categoryId: "BRK",
    partDescription: "Sample brake part for previewing the catalog page.",
    partPrice: 150,
    partImage: "",
    isFavorite: false,
    isForSale: true,
  },
];

function Product() {
  const [parts, setParts] = useState<Part[]>(initialParts);

  const handleRemove = (partId: Part["partId"]) => {
    setParts((currentParts) =>
      currentParts.filter((part) => part.partId !== partId),
    );
  };

  const handleAddPart = (part: NewPart) => {
    setParts((currentParts) => [
      ...currentParts,
      {
        ...part,
        id: part.partId || crypto.randomUUID(),
        isFavorite: part.isFavorite ?? false,
        isForSale: part.isForSale ?? true,
      },
    ]);
  };

  return (
    <main>
      <h1>Auto Parts</h1>

      <ProductForm onAddPart={handleAddPart} />

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