import { useState } from 'react';
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
      imageUrl: newPart.imageUrl || 'jpg',
      partName: newPart.partName,
      price: Number(newPart.price) || 0,
      description: newPart.description || '',
      isFavourite: newPart.isFavourite || false,
    };

    setCatalog((prevCatalog) => {
      const resolvedCategory = targetCategory || prevCatalog[0]?.Category || 'General';
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

  // Flatten the catalog to get all parts with their category names
  const allParts = catalog.flatMap((group) =>
    group.AutoPart.map((part) => ({
      ...part,
      categoryName: group.Category,
    }))
  );

  return (
    <main className={styles.pageContainer}>
      <AddAutoPartsForm
        category={categoryList}
        onAddAutoPart={(part) => handleAddAutoPart(part)}
      />

      <header className={styles.headerSection}>
        <p className={styles.eyebrow}>AUTO PARTS</p>
        <h1 className={styles.sectionHeading}>Find the Right Part for Your Vehicle</h1>
      </header>

      {/* A single grid for ALL parts */}
      <section className={styles.cardGrid}>
        {allParts.length === 0 ? (
          <p>The inventory is empty. Add a new part above.</p>
        ) : (
          allParts.map((part) => (
            <article key={part.partId} className={styles.productCard}>
              
              {/* Constrained Image Wrapper */}
              <div className={styles.imageWrapper}>
                <img
                  src={part.imageUrl}
                  alt={part.partName}
                  className={styles.cardImage}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>

              <div className={styles.cardContent}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryTag}>{part.categoryName}</span>
                  <span className={styles.newBadge}>New</span>
                </div>

                <h2 className={styles.cardTitle}>{part.partName}</h2>
                <p className={styles.compatibilityText}>{part.description}</p>
                
                <div className={styles.ratingLine}>
                  ★ 4.8 &bull; Verified seller
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.price}>${Number(part.price).toFixed(2)}</span>
                  
                  <div className={styles.buttonGroup}>
                    <button
                      type="button"
                      onClick={() => handleToggleFavourite(part.partId)}
                      title={part.isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                      aria-label={part.isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                    >
                      {part.isFavourite ? '★' : '☆'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemoveAutoPart(part.partId)}
                      className={styles.deleteBtn}
                      title="Delete"
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