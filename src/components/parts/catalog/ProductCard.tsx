
import type { CarPart } from "../../../types/autoParts";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  part: CarPart;
  onRemove: (partId: number) => void;
}

function ProductCard({ part, onRemove }: ProductCardProps) {
  return (
    <div className={styles.productCard}>
      {part.partImage.trim() && (
        <img src={part.partImage} alt={part.partName} />
      )}

      <h2>{part.partName}</h2>
      <p>${part.price}</p>
      <p>{part.description}</p>

      <button onClick={() => onRemove(part.id)}>
        Remove
      </button>
    </div>
  );
}

export default ProductCard;
