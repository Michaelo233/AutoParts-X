
import { useState } from "react";
import type { NewPart } from "../../../types/userParts";

interface ProductFormProps {
  onAddPart: (part: NewPart) => void;
}

/**
 * ProductForm Component
 *
 * Collects information from the user.
 * Passes the new part to the parent callback.
 * Does not generate IDs or access JSON.
 */
export default function ProductForm({ onAddPart }: ProductFormProps) {
  const [partName, setPartName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const numericPrice = Number(price);

    if (
      !partName.trim() ||
      !selectedCategoryId.trim() ||
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0
    ) {
      return;
    }

    const newPart: NewPart = {
      partId: "",
      partName: partName.trim(),
      categoryId: selectedCategoryId.trim().toUpperCase(),
      partPrice: numericPrice,
      partDescription: description.trim(),
      partImage: "",
      isFavorite: false,
    };

    onAddPart(newPart);

    setPartName("");
    setSelectedCategoryId("");
    setPrice("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="partName">Part Name</label>
      <input
        id="partName"
        type="text"
        value={partName}
        onChange={(event) => setPartName(event.target.value)}
        required
      />

      <label htmlFor="categoryId">Category ID</label>
      <input
        id="categoryId"
        type="text"
        placeholder="CT001"
        value={selectedCategoryId}
        onChange={(event) => setSelectedCategoryId(event.target.value)}
        required
      />

      <label htmlFor="partPrice">Price</label>
      <input
        id="partPrice"
        type="number"
        min="0.01"
        step="0.01"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <button type="submit">Add Part</button>
    </form>
  );
}
