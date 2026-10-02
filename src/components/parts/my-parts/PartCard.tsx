import React, { useState } from 'react';
import type { Part } from '../../../types/userParts';
import styles from './MyParts.module.css';

interface PartCardProps {
  part: Part;
  onRemoveClick: (partId: string) => void;
}

export const PartCard: React.FC<PartCardProps> = ({ part, onRemoveClick }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmDelete = () => {
    onRemoveClick(part.partId);
    setShowConfirm(false);
  };

  return (
    <div className={styles.card}>
      {/* Top bar with removal action */}
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

      {/* Confirmation dialog overlay */}
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

      <img
        src={part.partImage}
        alt={part.partName}
        className={styles.partImage}
      />

      <div className={styles.cardDetails}>
        <strong className={styles.partPrice}>
          ${part.partPrice.toFixed(2)}
        </strong>
        <p className={styles.partDescription}>{part.partDescription}</p>
        <span className={styles.partId}>Part ID: {part.partId}</span>
      </div>
    </div>
  );
};