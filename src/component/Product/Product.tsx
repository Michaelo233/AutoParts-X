import AutoPartsData from "../KailineComponents/data/AutoPartsData";
import ProductCard from "./ProductCard";

function Product() {
  return (
    <main>
      <h1>Auto Parts</h1>

      {AutoPartsData.map((category) =>
        category.AutoPart.map((part) => (
          <ProductCard key={part.partId} part={part} />
        ))
      )}
    </main>
  );
}

export default Product;