import { useState } from "react";
import type { AutoPart } from "../../../types/autoParts";

interface ProductFormProps {
  parts: AutoPart[];
  setParts: React.Dispatch<React.SetStateAction<AutoPart[]>>;
}

function ProductForm({ parts, setParts }: ProductFormProps) {
  const [partName, setPartName] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newPart: AutoPart = {
      partId: Date.now(),
      imageUrl: "",
      partName: partName,
      price: Number(price),
      description: "",
      location: "",
      contactNumber: "",
      condition: "",
      year: new Date().getFullYear(),
      isActive: true,
    };

    setParts([...parts, newPart]);
    setPartName("");
    setPrice("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="partName">Part Name</label>
      <input
        id="partName"
        value={partName}
        onChange={(event) => setPartName(event.target.value)}
        required
      />

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