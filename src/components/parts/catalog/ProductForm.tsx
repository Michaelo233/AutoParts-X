import { useState } from "react";
import type { Part } from "../../../types/userParts";

interface ProductFormProps {
  parts: Part[];
  setParts: React.Dispatch<React.SetStateAction<Part[]>>;
}

function ProductForm({ parts, setParts }: ProductFormProps) {
  const [partName, setPartName] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newPart: Part = {
      partId: String(Date.now()),
      partName: partName,
      partPrice: Number(price),
      partDescription: "",
      partImage: "",
      isFavorite: false,
    };

    setParts([...parts, newPart]);
    setPartName("");
    setPrice("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="partName">Part Name</label>
      <select
        id="partName"
        value={partName}
        onChange={(event) => setPartName(event.target.value)}
        required
      >
        <option value="">Select a part</option>

        {parts.map((part) => (
          <option key={part.partId} value={part.partName}>
            {part.partName}
          </option>
        ))}
      </select>

      <label htmlFor="price">Price</label>
      <input
        id="price"
        type="number"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        required
      />

      <button type="submit">Add Part</button>
    </form>
  );
}

export default ProductForm;