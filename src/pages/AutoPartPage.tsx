
import { useMemo } from "react";
import { useAutoPartCatalog } from "../context/AutoPartCatalogContext";
import styles from "./AutoPartPage.module.css";

interface AutoPartPageProps {
  searchTerm: string;
}

/**
 * AutoPartPage
 *
 * Displays automotive parts from the shared catalogue.
 *
 * Responsibilities:
 * - Receive searchTerm from Home.tsx
 * - Filter parts by name, description, or seller
 * - Display search results
 * - Remove parts
 * - Toggle favourites
 */
export default function AutoPartPage({
  searchTerm,
}: AutoPartPageProps) {

  const {
    catalog,
    removePart,
    toggleFavourite,
  } = useAutoPartCatalog();

  // Filter parts when searchTerm or catalogue changes.
  const filteredParts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return catalog.flatMap(group =>
      group.AutoPart
        .filter(part => {
          const partName = part.partName?.toLowerCase() ?? "";
          const description =
            part.description?.toLowerCase() ?? "";
          const sellerName = group.Category.toLowerCase();
          const categoryId =
            part.categoryId?.toLowerCase() ?? "";

          return (
            partName.includes(query) ||
            description.includes(query) ||
            sellerName.includes(query) ||
            categoryId.includes(query)
          );
        })
        .map(part => ({
          ...part,
          sellerName: group.Category,
        }))
    );
  }, [catalog, searchTerm]);

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
          <p>
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
          ))}
        </section>
      )}
    </main>
  );
}
