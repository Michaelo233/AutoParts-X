
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/parts/catalog/ProductCard";
import ProductForm from "../components/parts/catalog/ProductForm";

function Product() {
  const { products, loading, addProduct, removeProduct } = useProducts();

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

      {products.length === 0 ? (
        <p>No parts available for sale</p>
      ) : (
        products.map((part) => (
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
