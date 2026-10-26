
import { useMemo } from "react";
import { useAutoPartCatalog } from "../context/AutoPartCatalogContext";
import styles from "./AutoPartPage.module.css";

/**
 * Props received from Home.tsx.
 *
 * searchTerm is submitted by the Search component
 * inside HeroSection.
 */
interface AutoPartPageProps {
  searchTerm: string;
}

/**
 * AutoPartPage Component
 *
 * Displays automotive parts using shared catalogue state.
 *
 * Responsibilities:
 * - Receive searchTerm from Home.tsx
 * - Display matching auto parts
 * - Remove parts from the catalogue
 * - Add or remove favourites
 *
 * Catalogue state is managed by AutoPartCatalogContext.
 * This prevents components from maintaining separate
 * copies of the product data.
 */
export default function AutoPartPage({
  searchTerm,
}: AutoPartPageProps) {

  // Access shared catalogue state and actions.
  const {
    catalog,
    removePart,
    toggleFavourite,
  } = useAutoPartCatalog();

  console.log("Catalogue:", catalog);
  console.log("Search term:", searchTerm);
  /**
   * Filter parts when the catalogue or search term changes.
   */
  const filteredParts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return catalog.flatMap((group) =>
      group.AutoPart
        .filter((part) => {
          return (
            part.partName.toLowerCase().includes(query) ||
            part.description.toLowerCase().includes(query) ||
            group.Category.toLowerCase().includes(query)
          );
        })
        .map((part) => ({
          ...part,
          categoryName: group.Category,
        }))
    );
  }, [catalog, searchTerm]);

  return (
    <main className={styles.pageContainer}>

      {/* Page heading */}
      <header className={styles.headerSection}>
        <p className={styles.eyebrow}>
          AUTO PARTS
        </p>

        <h1 className={styles.sectionHeading}>
          Find the Right Part for Your Vehicle
        </h1>

        {/* Display the search term and number of results */}
        {searchTerm.trim() && (
          <p>
            Search results for:{" "}
            <strong>{searchTerm}</strong>
            {" — "}
            {filteredParts.length} part(s) found
          </p>
        )}
      </header>

      {/* Auto parts grid */}
      <section className={styles.cardGrid}>

        {filteredParts.length === 0 ? (
          <p>
            {searchTerm.trim()
              ? "No matching auto parts found."
              : "The inventory is empty."}
          </p>
        ) : (

          filteredParts.map((part) => (

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

              {/* Product information */}
              <div className={styles.cardContent}>

                <div className={styles.categoryHeader}>
                  <span className={styles.categoryTag}>
                    {part.categoryName}
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

                {/* Product price and actions */}
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
                      title={
                        part.isFavourite
                          ? "Remove from favourites"
                          : "Add to favourites"
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
                      onClick={() =>
                        removePart(part.partId)
                      }
                      className={styles.deleteBtn}
                      title="Delete Auto Part"
                      aria-label={`Delete ${part.partName}`}
                    >
                      🗑️
                    </button>

                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
