
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/parts/catalog/ProductCard";

function Product() {
  const { products, loading, removeProduct } = useProducts();
  const [searchParams] = useSearchParams();

  const searchTerm = (searchParams.get("q") ?? "")
    .trim()
    .toLowerCase();

  const filteredProducts = products.filter((part) =>
    part.partName.toLowerCase().includes(searchTerm)
  );

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <main>
      <h1>Auto Parts</h1>

      {filteredProducts.length === 0 ? (
        <p>No parts available for sale</p>
      ) : (
        filteredProducts.map((part) => (
          <ProductCard
            key={part.id}
            part={part}
            onRemove={(id) => {
              void removeProduct(id);
            }}
          />
        ))
      )}
    </main>
  );
}

export default Product;
