
import { useState } from "react";
import type { CarPart } from "../../../types/autoParts";

interface ProductFormProps {
  parts: CarPart[];
  onAddProduct: (part: CarPart, userName: string) => Promise<void>;
}

function ProductForm({ parts, onAddProduct }: ProductFormProps) {
  const [userName, setUserName] = useState("");
  const [partName, setPartName] = useState("");
  const [price, setPrice] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredUserName = userName.trim();

    if (!enteredUserName || !partName || Number(price) <= 0) {
      return;
    }

    const selectedPart = parts.find(
      (part) => part.partName === partName
    );

    const newPart: CarPart = {
      id: Math.max(0, ...parts.map((part) => part.id)) + 1,
      partId: `${partName.substring(0, 2).toUpperCase()}_${Date.now()}`,
      partName,
      description: selectedPart?.description ?? "",
      price: Number(price),
      partImage: selectedPart?.partImage ?? "",
      isFavorite: false,
      isForSale: true,
    };

    await onAddProduct(newPart, enteredUserName);

    setUserName("");
    setPartName("");
    setPrice("");
  }

  const uniquePartNames = [...new Set(parts.map((part) => part.partName))];

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="userName">Username</label>
      <input
        id="userName"
        type="text"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
        required
      />

      <label htmlFor="partName">Part Name</label>
      <select
        id="partName"
        value={partName}
        onChange={(event) => setPartName(event.target.value)}
        required
      >
        <option value="">Select a part</option>
        {uniquePartNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <label htmlFor="price">Price</label>
      <input
        id="price"
        type="number"
        min="0.01"
        step="0.01"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        required
      />

      <button type="submit">Add Part</button>
    </form>
  );
}

export default ProductForm;
