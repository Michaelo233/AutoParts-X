import { useMemo, useState } from "react";
import { useAutoPartCatalog } from "../context/AutoPartCatalogContext";
import styles from "./AutoPartPage.module.css";

interface AutoPartPageProps {
  searchTerm: string;
}

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc";

export default function AutoPartPage({
  searchTerm,
}: AutoPartPageProps) {
  const { catalog, removePart, toggleFavourite } = useAutoPartCatalog();

  const [sortBy, setSortBy] = useState<SortOption>("featured");

  // Filter products
  const filteredParts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const sellerExists = catalog.some(
      (group) => group.Category.trim().toLowerCase() === query
    );

    return catalog.flatMap((group) => {
      const sellerName = group.Category.trim();

      return group.AutoPart
        .filter((part) => {
          if (!query) return true;

          if (sellerExists) {
            return sellerName.toLowerCase() === query;
          }

          return (
            part.partName.toLowerCase().includes(query) ||
            part.description.toLowerCase().includes(query) ||
            part.categoryId.toLowerCase().includes(query) ||
            sellerName.toLowerCase().includes(query)
          );
        })
        .map((part) => ({
          ...part,
          sellerName,
        }));
    });
  }, [catalog, searchTerm]);

  // Sort filtered products without modifying the original array
  const sortedParts = useMemo(() => {
    const parts = [...filteredParts];

    switch (sortBy) {
      case "price-asc":
        return parts.sort((a, b) => a.price - b.price);

      case "price-desc":
        return parts.sort((a, b) => b.price - a.price);

      case "name-asc":
        return parts.sort((a, b) =>
          a.partName.localeCompare(b.partName)
        );

      default:
        return parts;
    }
  }, [filteredParts, sortBy]);

  return (
    <main className={styles.pageContainer}>
      <header className={styles.headerSection}>
        <p className={styles.eyebrow}>AUTO PARTS</p>

        <h1 className={styles.sectionHeading}>
          Find the Right Part for Your Vehicle
        </h1>
      </header>

      {/* Results count and Sort by dropdown */}
      <div className={styles.resultsToolbar}>
        <p role="status">
          {searchTerm.trim() && (
            <>
              Search results for: <strong>{searchTerm}</strong>
              {" — "}
            </>
          )}

          {filteredParts.length}{" "}
          {filteredParts.length === 1 ? "part found" : "parts found"}
        </p>

        <label className={styles.sortControl}>
          Sort by:
          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Part Name: A–Z</option>
          </select>
        </label>
      </div>

      {/* Display sorted products */}
      {sortedParts.length === 0 ? (
        <p role="status">
          {searchTerm.trim()
            ? `No auto parts found for "${searchTerm}". Try another search.`
            : "No auto parts are currently available."}
        </p>
      ) : (
        <section className={styles.cardGrid}>
          {sortedParts.map((part) => (
            <article
              key={part.partId}
              className={styles.productCard}
            >
              <div className={styles.imageWrapper}>
                {part.imageUrl && (
                  <img
                    src={part.imageUrl}
                    alt={part.partName}
                    className={styles.cardImage}
                  />
                )}
              </div>

              <div className={styles.cardContent}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryTag}>
                    {part.sellerName}
                  </span>

                  <span className={styles.newBadge}>New</span>
                </div>

                <h2 className={styles.cardTitle}>
                  {part.partName}
                </h2>

                <p className={styles.compatibilityText}>
                  {part.description}
                </p>

                <div className={styles.cardFooter}>
                  <span className={styles.price}>
                    ${part.price.toFixed(2)}
                  </span>

                  <div className={styles.buttonGroup}>
                    <button
                      type="button"
                      onClick={() => toggleFavourite(part.partId)}
                      aria-label={
                        part.isFavourite
                          ? "Remove from favourites"
                          : "Add to favourites"
                      }
                      aria-pressed={part.isFavourite}
                    >
                      {part.isFavourite ? "★" : "☆"}
                    </button>

                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => removePart(part.partId)}
                      aria-label={`Delete ${part.partName}`}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
