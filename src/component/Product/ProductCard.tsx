import type { AutoPart } from "../KailineComponents/types/AutoParts";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  part: AutoPart;
}

function ProductCard({ part }: ProductCardProps) {
  return (
    <div className={styles.productCard}>
      <img src={part.imageUrl} alt={part.partName} />

      <h2>{part.partName}</h2>
      <p>${part.price}</p>
      <p>{part.description}</p>
    </div>
  );
}

export default ProductCard;