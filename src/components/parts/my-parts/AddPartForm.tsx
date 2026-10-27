import React, { useState } from "react";
import type { Part, AddPartFormProps } from "../../../types/userParts";
import { PART_PRESETS } from "../../../data/partPresets";
import "./AddPartForm.css";
import { PartsNav } from "./PartsNav";

interface FormErrors {
  partName?: string;
  partDescription?: string;
  partPrice?: string;
}

export const AddPartForm: React.FC<AddPartFormProps> = ({
  userId,
  userName,
  onAddPart,
}) => {
  const [partName, setPartName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  // Automatically update default price when a part name is selected
  const handlePartNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setPartName(selectedName);

    if (selectedName && PART_PRESETS[selectedName]) {
      setPrice(PART_PRESETS[selectedName].price);
    } else {
      setPrice("");
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!partName) {
      newErrors.partName = "Please select a car part.";
    }

    if (price === "" || Number(price) <= 0) {
      newErrors.partPrice = "Please enter a valid price.";
    }

    if (description.trim().length < 30) {
      newErrors.partDescription = `Description must be at least 30 characters (currently ${description.trim().length}/30).`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Determine part image path based on selected part
    const imagePath = PART_PRESETS[partName]?.image || "/data/images/default.jpg";

    // Generate a unique Part ID prefix
    const generatedPartId = `${partName.substring(0, 2).toUpperCase()}_${Date.now().toString().slice(-3)}`;

    // Construct full Part object with fixed hidden user credentials
    const newPart: Part = {
      partId: generatedPartId,
      partName,
      partDescription: description.trim(),
      partPrice: Number(price),
      partImage: imagePath,
      userId,
      userName,
    };

    onAddPart(newPart);

    // Reset Form
    setPartName("");
    setPrice("");
    setDescription("");
    setErrors({});
  };

  return (

    
    <section className="formSection">
      <PartsNav/>
      <h2>Add New Car Part</h2>
      <form onSubmit={handleSubmit}>
        {/* Part Selection */}
        <div className="fieldGroup">
          <label htmlFor="partName">Part Name:</label>
          <select
            id="partName"
            value={partName}
            onChange={handlePartNameChange}
          >
            <option value="">-- Select a Part --</option>
            {Object.keys(PART_PRESETS).map((partKey) => (
              <option key={partKey} value={partKey}>
                {partKey}
              </option>
            ))}
          </select>
          {errors.partName && (
            <p className="errorText">{errors.partName}</p>
          )}
        </div>

        {/* Price Input (Defaults automatically on part selection)*/}
        <div className="fieldGroup">
          <label htmlFor="partPrice">Price ($):</label>
          <input
            id="partPrice"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="0.00"
          />
          {errors.partPrice && (
            <p className="errorText">{errors.partPrice}</p>
          )}
        </div>

        {/* Description Textarea (Minimum 30 characters)*/}
        <div className="fieldGroup">
          <label htmlFor="partDescription">Description (min. 30 characters):</label>
          <textarea
            id="partDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter detailed description of the part..."
          />
          <span className="charCount">
            {description.trim().length} / 30 characters
          </span>
          {errors.partDescription && (
            <p className="errorText">{errors.partDescription}</p>
          )}
        </div>

        <button type="submit" className="submitBtn">
          Add Part
        </button>
      </form>
    </section>
  );
};