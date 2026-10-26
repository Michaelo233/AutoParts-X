import { useNavigate } from "react-router-dom";
import AddAutoPartsForm from "../components/parts/catalog/AddAutoPartForm";
import { useAutoPartCatalog } from "../context/AutoPartCatalogContext";
import type { NewCatalogPart } from "../types/catalog";

/**
 * AddAutoPartPage
 *
 * Displays the form for adding a new auto part.
 * Uses the shared catalogue context to save the new part.
 * Navigates to Home after successful submission.
 */
export default function AddAutoPartPage() {
  const navigate = useNavigate();

  const { categories, addPart } = useAutoPartCatalog();

  const handleAddAutoPart = (
    part: NewCatalogPart,
    category: string
  ) => {
    addPart(part, category);
    navigate("/home");
  };

  return (
    <main>
      <AddAutoPartsForm
        categories={categories}
        onAddAutoPart={handleAddAutoPart}
      />
    </main>
  );
}