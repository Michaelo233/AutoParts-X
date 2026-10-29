
import { useMemo } from "react";
import { useAutoPartCatalog } from "../context/AutoPartCatalogContext";
import styles from "./AutoPartPage.module.css";

/**
 * AutoPartPage Props
 * Receives the search term from Home.tsx.
 */
interface AutoPartPageProps {
  searchTerm: string;
}

/**
 * AutoPartPage
 *
 * Displays and filters available auto parts.
 */
export default function AutoPartPage({
  searchTerm,
}: AutoPartPageProps) {
  const {
    catalog,
    removePart,
    toggleFavourite,
  } = useAutoPartCatalog();

  // Filter catalogue parts.
  const filteredParts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const sellerExists = catalog.some(
      group =>
        group.Category.trim().toLowerCase() === query
    );

    return catalog.flatMap(group => {
      const sellerName = group.Category.trim();

      return group.AutoPart
        .filter(part => {
          if (!query) return true;

          // Search by exact seller name first.
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
        .map(part => ({
          ...part,
          sellerName,
        }));
    });
  }, [catalog, searchTerm]);

  // IMPORTANT: React component must return JSX.
  return (
    <main className={styles.pageContainer}>
      <header className={styles.headerSection}>
        <p className={styles.eyebrow}>
          AUTO PARTS
        </p>

        <h1 className={styles.sectionHeading}>
          Find the Right Part for Your Vehicle
        </h1>

        {searchTerm.trim() && (
          <p role="status">
            Search results for:{" "}
            <strong>{searchTerm}</strong>
            {" — "}
            {filteredParts.length}{" "}
            {filteredParts.length === 1
              ? "part found"
              : "parts found"}
          </p>
        )}
      </header>

      {filteredParts.length === 0 ? (
        <p role="status">
          {searchTerm.trim()
            ? `No auto parts found for "${searchTerm}". Try another search.`
            : "No auto parts are currently available."}
        </p>
      ) : (
        <section className={styles.cardGrid}>
          {filteredParts.map(part => (
            <article
              key={part.partId}
              className={styles.productCard}
            >
              {/* Product image */}
              <div className={styles.imageWrapper}>
                {part.imageUrl && (
                  <img
                    src={part.imageUrl}
                    alt={part.partName}
                    className={styles.cardImage}
                  />
                )}
              </div>

              {/* Product details */}
              <div className={styles.cardContent}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryTag}>
                    {part.sellerName}
                  </span>

                  <span className={styles.newBadge}>
                    New
                  </span>
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
                    {/* Favourite button */}
                    <button
                      type="button"
                      onClick={() =>
                        toggleFavourite(part.partId)
                      }
                      aria-label={
                        part.isFavourite
                          ? "Remove from favourites"
                          : "Add to favourites"
                      }
                      aria-pressed={part.isFavourite}
                    >
                      {part.isFavourite ? "★" : "☆"}
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() =>
                        removePart(part.partId)
                      }
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
