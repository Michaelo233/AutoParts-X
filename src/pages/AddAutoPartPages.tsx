
import AddAutoPartsForm from "../components/parts/catalog/AddAutoPartForm";
import { useAutoPartCatalog } from "../context/AutoPartCatalogContext";
import categoryData from "../data/autoPartCategories.json";
import type { NewCatalogPart } from "../types/catalog";

interface AddAutoPartPageProps {
  sellerName: string;
}

export default function AddAutoPartPage({
  sellerName,
}: AddAutoPartPageProps) {
  const { addPart } = useAutoPartCatalog();

  const categories = categoryData.map(category => ({
    id: category.CategoryId,
    categoryName: category.categoryName,
  }));

  const handleAddAutoPart = (part: NewCatalogPart): void => {
    addPart(part, sellerName);
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
