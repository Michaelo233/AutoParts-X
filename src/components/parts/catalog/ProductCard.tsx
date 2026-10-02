import type { AutoPart } from "../../../types/autoParts";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  part: AutoPart;
   onRemove: (partId: number) => void;
}

function ProductCard({ part, onRemove  }: ProductCardProps) {
  return (
    <div className={styles.productCard}>
      {part.imageUrl.trim() && (
        <img src={part.imageUrl} alt={part.partName} />
      )}

      <h2>{part.partName}</h2>
      <p>${part.price}</p>
      <p>{part.description}</p>
      <button onClick={() => onRemove(part.partId)}>
  Remove
</button>
    </div>
  );
}

export default ProductCard;