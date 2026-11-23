
import { useState } from "react";
import type { ChangeEvent, SyntheticEvent } from "react";
import { PART_PRESETS } from "../../../data/partPresets";
import type { NewCatalogPart } from "../../../types/Catalog";
import styles from "./AddAutoPartForm.module.css";

interface CategoryOption {
  id: string;
  categoryName: string;
}

interface AddAutoPartsFormProps {
  categories: CategoryOption[];
  defaultUserName?: string;
  onAddAutoPart: (part: NewCatalogPart, sellerName: string) => void;
}

export default function AddAutoPartsForm({
  categories,
  defaultUserName = "Michael",
  onAddAutoPart,
}: AddAutoPartsFormProps) {
  const [sellerName, setSellerName] = useState(defaultUserName);
  const [partName, setPartName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    setSuccessMessage("");

    const trimmedSeller = sellerName.trim();
    const numericPrice = Number(price);

    if (!trimmedSeller) {
      setError("Seller username is required.");
      return;
    }

    if (!partName.trim()) {
      setError("Please select a part name.");
      return;
    }

    const selectedPreset = PART_PRESETS[partName];

    if (!selectedPreset) {
      setError("Please select a valid part name.");
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

    if (selectedPreset.categoryId !== selectedCategory) {
      setError(
        `The selected part does not match the selected category. Expected category: ${selectedPreset.category}.`
      );
      return;
    }

    const newPart: NewCatalogPart = {
      partName,
      categoryId: selectedCategory,
      description: description.trim(),
      price: numericPrice,
      imageUrl,
      isFavourite: false,
    };

    onAddAutoPart(newPart, trimmedSeller);

    setSuccessMessage("Part added successfully.");
    setPartName("");
    setPrice("");
    setDescription("");
    setImageUrl("");
    setSelectedCategory("");
    setSellerName(trimmedSeller);
  };

  return (
    <main className={styles.pageContainer}>
      <header className={styles.headerSection}>
        <p className={styles.eyebrow}>AUTO PARTS</p>
        <h1 className={styles.sectionHeading}>Add a New Part</h1>
      </header>

      <section className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="sellerName"
            className={styles.label}
          >
            Username
          </label>

          <input
            id="sellerName"
            type="text"
            value={sellerName}
            onChange={event => setSellerName(event.target.value)}
            className={styles.input}
            placeholder="Enter the seller name"
            required
          />

          <label
            htmlFor="partName"
            className={styles.label}
          >
            Part Name
          </label>

          <select
            id="partName"
            value={partName}
            onChange={event => {
              const selectedPartName = event.target.value;
              setPartName(selectedPartName);
              setSelectedCategory(
                PART_PRESETS[selectedPartName]?.categoryId ?? ""
              );
            }}
            className={styles.input}
            required
          >
            <option value="">Select a part</option>

            {Object.keys(PART_PRESETS).map(name => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

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
            <p role="alert" className={styles.errorMessage}>{error}</p>
          )}

          {successMessage && (
            <p role="status" className={styles.successMessage}>
              {successMessage}
            </p>
          )}

          <button type="submit">
            Add Auto Part
          </button>
        </form>
      </section>
    </main>
  );
}
