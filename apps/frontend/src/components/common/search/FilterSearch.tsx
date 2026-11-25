import { useState } from "react";
import categories from "../../../data/autoPartCategories.json";
import type { ProductSearchFilters } from "../../../repositories/productSearchRepository";
import styles from "./filterSearch.module.css";

interface FilterSearchProps {
  onSearch: (filters: ProductSearchFilters) => void | Promise<void>;
  loading?: boolean;
}

export default function FilterSearch({
  onSearch,
  loading = false,
}: FilterSearchProps) {
  const [filterPrice, setFilterPrice] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const applyFilters = async (filters: ProductSearchFilters) => {
    setFormError(null);

    if (
      filters.minPrice !== undefined &&
      filters.maxPrice !== undefined &&
      filters.minPrice > filters.maxPrice
    ) {
      setFormError("Minimum price cannot exceed maximum price.");
      return;
    }

    try {
      await onSearch(filters);
    } catch (error: unknown) {
      setFormError(
        error instanceof Error ? error.message : "Search failed."
      );
    }
  };

  return (
    <form
      className={styles.filterSearch}
      onSubmit={(event) => {
        event.preventDefault();

        const fields = new FormData(event.currentTarget);
        const filters: ProductSearchFilters = {};

        const search = String(fields.get("search") ?? "").trim();
        const categoryId = String(fields.get("categoryId") ?? "");
        const min = String(fields.get("minPrice") ?? "");
        const max = String(fields.get("maxPrice") ?? "");

        if (search !== "") filters.search = search;
        if (categoryId !== "") filters.categoryId = categoryId;

        if (filterPrice) {
          if (min !== "") filters.minPrice = Number(min);
          if (max !== "") filters.maxPrice = Number(max);
        }

        void applyFilters(filters);
      }}
      onReset={() => {
        setFilterPrice(false);
        void applyFilters({});
      }}
    >
      <h2>Advanced Search</h2>

      {/* Keyword and category */}
      <fieldset>
        <legend>Find Auto Parts</legend>

        <label>
          Enter keywords
          <input
            name="search"
            type="text"
            maxLength={100}
            placeholder="Part name, description or seller..."
          />
        </label>

        <label>
          In this category
          <select name="categoryId" defaultValue="">
            <option value="">All Categories</option>

            {categories.map((category) => (
              <option
                key={category.CategoryId}
                value={category.CategoryId}
              >
                {category.categoryName}
              </option>
            ))}
          </select>
        </label>
      </fieldset>

      {/* Price range */}
      <fieldset>
        <legend>Price</legend>

        <label className={styles.priceToggle}>
          <input
            type="checkbox"
            checked={filterPrice}
            onChange={(event) =>
              setFilterPrice(event.target.checked)
            }
          />
          Show items within a price range
        </label>

        <div className={styles.priceRange}>
          <label>
            From C$
            <input
              name="minPrice"
              type="number"
              min="0"
              step="0.01"
              placeholder="Min price"
              disabled={!filterPrice}
            />
          </label>

          <label>
            To C$
            <input
              name="maxPrice"
              type="number"
              min="0"
              step="0.01"
              placeholder="Max price"
              disabled={!filterPrice}
            />
          </label>
        </div>
      </fieldset>

      {formError && <p role="alert">{formError}</p>}

      {/* Action buttons */}
      <div className={styles.actions}>
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>

        <button type="reset" disabled={loading}>
          Clear Filters
        </button>
      </div>
    </form>
  );
}