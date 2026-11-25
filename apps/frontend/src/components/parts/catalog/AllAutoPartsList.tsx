import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterSearch from "../../common/search/FilterSearch";
import { useCarPartSearch } from "../../../hooks/useAutoPartSearch";
import styles from "./allAutoPartsList.module.css";

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

function AllAutoParts() {
  const { results, searchParts, loading, error } = useCarPartSearch();
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const navigate = useNavigate();

  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.partPrice - b.partPrice;

      case "price-desc":
        return b.partPrice - a.partPrice;

      case "name-asc":
        return a.partName.localeCompare(b.partName);

      default:
        return 0;
    }
  });

  return (
    <main>
      <h2>Search Auto Parts</h2>

      {/* Advanced search filters */}
      <FilterSearch
        onSearch={searchParts}
        loading={loading}
      />
      {loading && <p role="status">Loading products...</p>}
      {error && <p role="alert">{error}</p>}

      {/* Sort by dropdown */}
      <div className={styles.resultsToolbar}>
        <p>{results.length} products found</p>

        <label className={styles.sortControl}>
          Sort by:
          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
          >
            <option value="default">Default order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Part Name: A–Z</option>
          </select>
        </label>
      </div>

      {/* Display sorted product results */}
      <section>
        {sortedResults.map((part) => (
          <article key={part.id}>
            <h3>{part.partName}</h3>
            <p>{part.partDescription}</p>
            <p>${part.partPrice.toFixed(2)}</p>

            <button
              type="button"
              onClick={() => navigate(`/products/${part.id}`)}
            >
              View Details
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default AllAutoParts;