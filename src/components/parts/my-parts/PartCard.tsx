import React, { useState } from 'react';
import type { Part } from '../../../types/userParts';
import styles from './MyParts.module.css';

interface PartCardProps {
  part: Part;
  userName: string;
  onRemoveClick: (userName: string, partId: string) => void;
  onToggleSale: (userName: string, partId: string, isForSale: boolean) => void;
}

export const PartCard: React.FC<PartCardProps> = ({
  part,
  userName,
  onRemoveClick,
  onToggleSale,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmDelete = () => {
    onRemoveClick(userName, part.partId);
    setShowConfirm(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.partName}>{part.partName}</h3>
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={() => setShowConfirm(true)}
          title="Remove part"
        >
          X
        </button>
      </div>

      {showConfirm && (
        <div className={styles.confirmBanner}>
          <p>Remove this part from inventory?</p>
          <div className={styles.confirmButtons}>
            <button
              type="button"
              className={styles.yesBtn}
              onClick={handleConfirmDelete}
            >
              Yes
            </button>
            <button
              type="button"
              className={styles.noBtn}
              onClick={() => setShowConfirm(false)}
            >
              No
            </button>
          </div>
        </div>
      )}

      <img src={part.partImage} alt={part.partName} className={styles.partImage} />

      <div className={styles.cardDetails}>
        <strong className={styles.partPrice}>${part.partPrice.toFixed(2)}</strong>
        <p className={styles.partDescription}>{part.partDescription}</p>
      </div>

      <div className={styles.cardSellorNot}>
        <button
          type="button"
          className={`${styles.sellBtn} ${part.isForSale ? styles.saleStatusActive : ''}`}
          onClick={() => onToggleSale(userName, part.partId, true)}
        >
          For sell
        </button>
        <button
          type="button"
          className={`${styles.SellBtn} ${part.isForSale === false ? styles.saleStatusActive : ''}`}
          onClick={() => onToggleSale(userName, part.partId, false)}
        >
          Not for sell
        </button>
      </div>
    </div>
  );
};