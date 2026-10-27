
import { useState } from "react";
import type { ChangeEvent, SyntheticEvent } from "react";
import type { NewCatalogPart } from "../../../types/catalog";
import styles from "./AddAutoPartForm.module.css";

interface CategoryOption {
  id: string;
  categoryName: string;
}

interface AddAutoPartsFormProps {
  categories: CategoryOption[];
  onAddAutoPart: (part: NewCatalogPart) => void;
}

export default function AddAutoPartsForm({
  categories,
  onAddAutoPart,
}: AddAutoPartsFormProps) {
  const [partName, setPartName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");

  const handleImageUpload = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image.");
      return;
    }

    setImageUrl(URL.createObjectURL(file));
    setError("");
  };

  const handleSubmit = (
    event: SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    const numericPrice = Number(price);

    if (!partName.trim()) {
      setError("Part name is required.");
      return;
    }

    if (
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0
    ) {
      setError("Enter a valid price.");
      return;
    }

    if (!description.trim()) {
      setError("Description is required.");
      return;
    }

    if (
      !categories.some(
        category => category.id === selectedCategory
      )
    ) {
      setError("Please select a category.");
      return;
    }

    const newPart: NewCatalogPart = {
      partName: partName.trim(),
      categoryId: selectedCategory,
      description: description.trim(),
      price: numericPrice,
      imageUrl,
      isFavourite: false,
    };

    onAddAutoPart(newPart);

    setPartName("");
    setPrice("");
    setDescription("");
    setImageUrl("");
    setSelectedCategory("");
  };

  return (
    <section className={styles.formContainer}>
      <h2>Add New Auto Part</h2>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="partName"
          className={styles.label}
        >
          Part Name
        </label>

        <input
          id="partName"
          type="text"
          value={partName}
          onChange={event =>
            setPartName(event.target.value)
          }
          className={styles.input}
          required
        />

        <label
          htmlFor="category"
          className={styles.label}
        >
          Category
        </label>

        <select
          id="category"
          value={selectedCategory}
          onChange={event =>
            setSelectedCategory(event.target.value)
          }
          className={styles.input}
          required
        >
          <option value="">Select a category</option>

          {categories.map(category => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.categoryName}
            </option>
          ))}
        </select>

        <label
          htmlFor="price"
          className={styles.label}
        >
          Price
        </label>

        <input
          id="price"
          type="number"
          min="0.01"
          step="0.01"
          value={price}
          onChange={event =>
            setPrice(event.target.value)
          }
          className={styles.input}
          required
        />

        <label
          htmlFor="description"
          className={styles.label}
        >
          Description
        </label>

        <textarea
          id="description"
          value={description}
          onChange={event =>
            setDescription(event.target.value)
          }
          className={styles.input}
          required
        />

        <label
          htmlFor="image"
          className={styles.label}
        >
          Part Image
        </label>

        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className={styles.input}
        />

        {error && (
          <p role="alert">{error}</p>
        )}

        <button type="submit">
          Add Auto Part
        </button>
      </form>
    </section>
  );
}
