import type { Part } from "../../../types/userParts";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  part: Part;
  onRemove: (partId: string) => void;
}

function ProductCard({ part, onRemove  }: ProductCardProps) {
  return (
    <div className={styles.productCard}>
      <h2>{part.partName}</h2>
      <button onClick={() => onRemove(part.partId)}>
  Remove
</button>
    </div>
  );
}

export default ProductCard;