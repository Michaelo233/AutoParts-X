import React, { useState } from 'react';
import type { Auto, AutoPart } from '../types/AutoParts';
import AutoPartsData from '../data/AutoPartsData';
import AddAutoPartsForm from '../form/AddAutoPartForm';
import styles from './AutoPartPage.module.css';

export default function AutoPartPage() {
  const [catalog, setCatalog] = useState<Auto[]>(AutoPartsData);

  const categoryList = catalog.map((group) => group.Category);

  const handleAddAutoPart = (newPart: AutoPart, targetCategory?: string) => {
    const completedPart: AutoPart = {
      partId: newPart.partId || Date.now(),
      imageUrl: newPart.imageUrl || './images/placeholder.jpg',
      partName: newPart.partName,
      price: Number(newPart.price) || 0,
      description: newPart.description || '',
      isFavourite: newPart.isFavourite || false,
    };

    setCatalog((prevCatalog) => {
      const resolvedCategory = targetCategory || prevCatalog[0]?.Category;
      const exists = prevCatalog.some(
        (group) => group.Category.toLowerCase() === resolvedCategory.toLowerCase()
      );

      if (exists) {
        return prevCatalog.map((group) =>
          group.Category.toLowerCase() === resolvedCategory.toLowerCase()
            ? { ...group, AutoPart: [completedPart, ...group.AutoPart] }
            : group
        );
      }

      return [...prevCatalog, { Category: resolvedCategory, AutoPart: [completedPart] }];
    });
  };

  const handleRemoveAutoPart = (partId: number) => {
    setCatalog((prevCatalog) =>
      prevCatalog
        .map((group) => ({
          ...group,
          AutoPart: group.AutoPart.filter((part) => part.partId !== partId),
        }))
        .filter((group) => group.AutoPart.length > 0)
    );
  };

  const handleToggleFavourite = (partId: number) => {
    setCatalog((prevCatalog) =>
      prevCatalog.map((group) => ({
        ...group,
        AutoPart: group.AutoPart.map((part) =>
          part.partId === partId ? { ...part, isFavourite: !part.isFavourite } : part
        ),
      }))
    );
  };

  return (
    <main className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Auto Parts Inventory</h1>
        <p className={styles.subtitle}>
          Manage catalog parts, categories, and inventory items in real-time.
        </p>
      </header>

      <AddAutoPartsForm
        category={categoryList}
        onAddAutoPart={(part) => handleAddAutoPart(part)}
      />

      <section className={styles.inventorySection}>
        <h2 className={styles.sectionTitle}>Available Inventory</h2>

        {catalog.length === 0 ? (
          <p className={styles.emptyState}>The inventory is empty. Add a new part above.</p>
        ) : (
          catalog.map((group) => (
            <article key={group.Category} className={styles.categoryCard}>
              <div className={styles.categoryHeader}>
                <h3 className={styles.categoryTitle}>{group.Category}</h3>
                <span className={styles.categoryBadge}>
                  {group.AutoPart.length} {group.AutoPart.length === 1 ? 'part' : 'parts'}
                </span>
              </div>

              <section className={styles.partsGrid}>
                {group.AutoPart.map((part) => (
                  <div key={part.partId} className={styles.partCard}>
                    <img
                      src={part.imageUrl}
                      alt={part.partName}
                      className={styles.partThumbnail}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://via.placeholder.com/90?text=Auto+Part';
                      }}
                    />

                    <section className={styles.partDetails}>
                      <h4 className={styles.partName}>
                        {part.partName}{' '}
                      </h4>
                      <p className={styles.partPrice}>${Number(part.price).toFixed(2)}</p>
                      <p className={styles.partDescription}>{part.description}</p>
                    </section>

                    <section className={styles.actions}>
                      <button
                        type="button"
                        onClick={() => handleToggleFavourite(part.partId)}
                        className={`${styles.favoriteButton} ${
                          part.isFavourite ? styles.favorited : ''
                        }`}
                        aria-label={`Toggle favorite for ${part.partName}`}
                      >
                        {part.isFavourite ? '★ Favorited' : '☆ Favorite'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveAutoPart(part.partId)}
                        className={styles.deleteButton}
                        aria-label={`Delete ${part.partName}`}
                      >
                        Delete
                      </button>
                    </section>
                  </div>
                ))}
              </section>
            </article>
          ))
        )}
      </section>
    </main>
  );
}