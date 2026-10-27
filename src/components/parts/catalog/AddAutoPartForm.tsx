
import { useState } from "react";
import styles from "./AddAutoPartForm.module.css";
import type { NewCatalogPart } from "../../../types/catalog";

interface AddAutoPartsFormProps {
  categories: string[];
  onAddAutoPart: (part: NewCatalogPart, category: string) => void;
}

interface FormValues {
  imageUrl: string;
  partName: string;
  price: string;
  description: string;
}

const emptyForm: FormValues = {
  imageUrl: "",
  partName: "",
  price: "",
  description: "",
};

/**
 * AddAutoPartsForm
 *
 * Collects and validates new auto part information.
 * Calls the parent callback after successful validation.
 *
 * Does not directly modify the catalogue or JSON.
 * Shared catalogue state is managed by the Context.
 */
export default function AddAutoPartsForm({
  categories,
  onAddAutoPart,
}: AddAutoPartsFormProps) {
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));

    setValidationMessage("");
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setValidationMessage("Please select an image.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setForm(prev => ({
      ...prev,
      imageUrl,
    }));

    setValidationMessage("");
  };

  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form.partName.trim()) {
      setValidationMessage("Part name is required.");
      return;
    }

    const price = Number(form.price);

    if (!Number.isFinite(price) || price <= 0) {
      setValidationMessage("Enter a valid price greater than zero.");
      return;
    }

    if (!form.description.trim()) {
      setValidationMessage("Description is required.");
      return;
    }

    if (!selectedCategory || !categories.includes(selectedCategory)) {
      setValidationMessage("Please select a category.");
      return;
    }

    const newPart: NewCatalogPart = {
      partName: form.partName.trim(),
      categoryId: selectedCategory,
      description: form.description.trim(),
      price,
      imageUrl: form.imageUrl,
      isFavourite: false,
    };

    onAddAutoPart(newPart, selectedCategory);

    setForm(emptyForm);
    setSelectedCategory("");
    setValidationMessage("");
  };

  return (
    <section className={styles.formContainer}>
      <header className={styles.headerBox}>
        <p className={styles.eyebrow}>ADD NEW PART</p>

        <h2 className={styles.title}>
          Add a New Auto Part
        </h2>

        <p className={styles.subtitle}>
          Share a part with the AutoParts-X marketplace.
        </p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="imageUrl">
          Upload Image:
        </label>

        <input
          id="imageUrl"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className={styles.input}
        />

        <label className={styles.label} htmlFor="partName">
          Part Name:
        </label>

        <input
          id="partName"
          name="partName"
          type="text"
          placeholder="Part Name"
          value={form.partName}
          onChange={handleInputChange}
          className={styles.input}
        />

        <label className={styles.label} htmlFor="price">
          Price:
        </label>

        <input
          id="price"
          name="price"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="e.g. 500"
          value={form.price}
          onChange={handleInputChange}
          className={styles.input}
        />

        <label className={styles.label} htmlFor="description">
          Description:
        </label>

        <textarea
          id="description"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
          className={styles.textarea}
        />

        <label className={styles.label} htmlFor="category">
          Category:
        </label>

        <select
          id="category"
          value={selectedCategory}
          onChange={event =>
            setSelectedCategory(event.target.value)
          }
          className={styles.input}
        >
          <option value="">Select a category</option>

          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {validationMessage && (
          <p className={styles.errorMessage} role="alert">
            {validationMessage}
          </p>
        )}

        <button className={styles.submitBtn} type="submit">
          Add Auto Part
        </button>
      </form>
    </section>
  );
}
