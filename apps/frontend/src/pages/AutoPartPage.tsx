import { useEffect } from "react";
import { useProductSearch } from "../hooks/useAutoPartSearch";
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
 * Retrieves and displays available auto parts
 * from the backend API.
 */
export default function AutoPartPage({
  searchTerm,
}: AutoPartPageProps) {

  const {
    results,
    searchParts,
    loading,
    error,
  } = useProductSearch();

  // Retrieve products when the search term changes.
  useEffect(() => {
    void searchParts(searchTerm);
  }, [searchTerm, searchParts]);

  return (
    <main className={styles.pageContainer}>

      <header className={styles.headerSection}>
        <p className={styles.eyebrow}>AUTO PARTS</p>

        <h1 className={styles.sectionHeading}>
          Find the Right Part for Your Vehicle
        </h1>

        {searchTerm.trim() && !loading && !error && (
          <p role="status">
            Search results for: <strong>{searchTerm}</strong>
            {" — "}
            {results.length}{" "}
            {results.length === 1
              ? "part found"
              : "parts found"}
          </p>
        )}
      </header>

      {/* Loading state */}
      {loading && (
        <p role="status">
          Loading auto parts...
        </p>
      )}

      {/* Error state */}
      {!loading && error && (
        <p role="alert">
          {error}
        </p>
      )}

      {/* Empty results */}
      {!loading && !error && results.length === 0 && (
        <p role="status">
          {searchTerm.trim()
            ? `No auto parts found for "${searchTerm}". Try another search.`
            : "No auto parts are currently available."}
        </p>
      )}

      {/* Product cards */}
      {!loading && !error && results.length > 0 && (
        <section className={styles.cardGrid}>

          {results.map((part) => (
            <article
              key={part.id}
              className={styles.productCard}
            >

              <div className={styles.imageWrapper}>
                {part.partImage && (
                  <img
                    src={part.partImage}
                    alt={part.partName}
                    className={styles.cardImage}
                  />
                )}
              </div>

              <div className={styles.cardContent}>

                <div className={styles.categoryHeader}>
                  <span className={styles.categoryTag}>
                    {part.userName ?? "Unknown seller"}
                  </span>

                  <span className={styles.newBadge}>
                    New
                  </span>
                </div>

                <h2 className={styles.cardTitle}>
                  {part.partName}
                </h2>

                <p className={styles.compatibilityText}>
                  {part.partDescription}
                </p>

                <div className={styles.cardFooter}>

                  <span className={styles.price}>
                    ${part.partPrice.toFixed(2)}
                  </span>

                  <div className={styles.buttonGroup}>
                    <button
                      type="button"
                      disabled
                      aria-label={
                        part.isFavorite
                          ? "Favourite"
                          : "Not a favourite"
                      }
                      aria-pressed={part.isFavorite ?? false}
                    >
                      {part.isFavorite ? "★" : "☆"}
                    </button>

                    <button
                      type="button"
                      className={styles.deleteBtn}
                      disabled
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