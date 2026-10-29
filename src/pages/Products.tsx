
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/parts/catalog/ProductCard";
import ProductForm from "../components/parts/catalog/ProductForm";

function Product() {
  const { products, loading, addProduct, removeProduct } = useProducts();
  const [searchParams] = useSearchParams();

  // Filter available products using the search term.
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

      <ProductForm
        parts={products}
        onAddProduct={addProduct}
      />

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
