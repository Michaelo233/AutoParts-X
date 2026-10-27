
import { useState } from "react";
import type { CarPart, CarPartOwner } from "../../../types/autoParts";
import { carPartList } from "../../../data/carPartList";

interface ProductFormProps {
  parts: CarPart[];
  setParts: React.Dispatch<React.SetStateAction<CarPart[]>>;
}

function ProductForm({ parts, setParts }: ProductFormProps) {
  const [userName, setUserName] = useState("");
  const [partName, setPartName] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredUserName = userName.trim();

    if (!enteredUserName || !partName || Number(price) <= 0) {
      return;
    }

    let user = carPartList.find(
      (owner) =>
        owner.userName.toLowerCase() === enteredUserName.toLowerCase()
    );

    if (!user) {
      const newUser: CarPartOwner = {
        userId: Math.max(0, ...carPartList.map((owner) => owner.userId)) + 1,
        userName: enteredUserName,
        partsOwned: [],
      };

      carPartList.push(newUser);
      user = newUser;
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

    user.partsOwned.push(newPart);
    setParts((previousParts) => [...previousParts, newPart]);

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
