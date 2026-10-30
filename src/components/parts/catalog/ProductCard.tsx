/**
 * Sprint 3 Architecture:
 * This component displays product information received through props.
 * Products.tsx uses the useProducts hook to retrieve product data
 * through productService and productRepository.
 * The Remove button calls the callback provided by Products.tsx,
 * keeping business logic and data access outside this component.
 */
import { useNavigate } from "react-router-dom";
import type { Part } from "../../../types/userParts";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  part: Part;
  onRemove: (partId: string) => void;
}

function ProductCard({ part, onRemove }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.productCard}>
      {part.partImage?.trim() && (
        <img src={part.partImage} alt={part.partName} />
      )}

      <h2>{part.partName}</h2>
      <p>${part.partPrice}</p>
      <p>{part.partDescription}</p>

      <button
        type="button"
        onClick={() => navigate(`/products/${part.id}`)}
      >
        View Details
      </button>

      <button
  type="button"
  onClick={() => onRemove(part.id)}
>
  Remove
</button>
    </div>
  );
}

export default ProductCard;
