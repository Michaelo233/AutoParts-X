/**
 * Sprint 3 Architecture:
 * This component displays product information received through props.
 * Products.tsx uses the useProducts hook to retrieve product data
 * through productService and productRepository.
 * The Remove button calls the callback provided by Products.tsx,
 * keeping business logic and data access outside this component.
 */
import { useNavigate } from "react-router-dom";
import type { Part } from "../../../types/UserParts";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  part: Part;
  onRemove: (partId: string) => void;
}

function ProductCard({ part, onRemove }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.productCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.partName}>{part.partName}</h3>
      </div>

      {part.partImage?.trim() && (
        <img
          src={part.partImage}
          alt={part.partName}
          className={styles.partImage}
        />
      )}

      <strong className={styles.partPrice}>
        ${part.partPrice.toFixed(2)}
      </strong>

      <p className={styles.partDescription}>
        {part.partDescription}
      </p>

      <div className={styles.cardActions}>
        <button
          type="button"
          className={styles.detailsBtn}
          onClick={() => navigate(`/products/${part.id}`)}
        >
          View Details
        </button>

        <button
          type="button"
          className={styles.removeBtn}
          onClick={() => onRemove(part.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default ProductCard;