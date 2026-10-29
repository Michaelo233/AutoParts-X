import React, { useState } from "react";
import type { Part, AddPartForm as AddPartFormProps } from "../../../types/userParts";
import { PART_PRESETS } from "../../../data/partPresets";
import "./AddPartForm.css";
import { PartsNav } from "./PartsNav";

interface FormErrors {
  partName?: string;
  partDescription?: string;
  partPrice?: string;
}

export const AddMyPartForm: React.FC<AddPartFormProps> = ({
  userId,
  userName,
  onAddPart,
  error,
}) => {
  const [targetUserName, setTargetUserName] = useState(userName);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    const imagePath = PART_PRESETS[partName]?.image || "/data/images/default.jpg";
    const generatedPartId = `${partName.substring(0, 2).toUpperCase()}_${Date.now().toString().slice(-3)}`;

    const newPart: Part = {
      id: generatedPartId,
      partId: generatedPartId,
      categoryId: partName,
      partName,
      partDescription: description.trim(),
      partPrice: Number(price),
      partImage: imagePath,
      userId,
      userName: targetUserName.trim() || userName,
      isForSale: false,
      isFavorite: false,
    };

    const added = await onAddPart(newPart);
    if (!added) return;

    setTargetUserName(targetUserName.trim() || userName);
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
        <div className="fieldGroup">
          <label htmlFor="ownerName">Owner Name:</label>
          <input
            id="ownerName"
            type="text"
            value={targetUserName}
            onChange={(e) => setTargetUserName(e.target.value)}
            placeholder="Enter user name"
          />
        </div>

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
        {error && <p className="errorText">{error}</p>}
      </form>
    </section>
  );
};

export const AddPartForm = AddMyPartForm;