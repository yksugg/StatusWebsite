import type { Product } from "../types";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  compact?: boolean;
};

export default function ProductGrid({ products, compact = false }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="empty-state">
        <h2>No products matched those filters.</h2>
        <p>Try removing a filter or searching for a broader product type.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} compact={compact} />
      ))}
    </div>
  );
}
