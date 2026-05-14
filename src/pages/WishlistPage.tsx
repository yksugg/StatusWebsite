import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/catalog";
import { useStore } from "../context/StoreContext";

export default function WishlistPage() {
  const { wishlistProducts, moveWishlistToCart } = useStore();
  const fallback = products.filter((product) => product.amazonFavourite).slice(0, 4);

  return (
    <>
      <section className="page-hero compact-hero">
        <div>
          <p className="eyebrow">Wishlist / Liked Items</p>
          <h1>Save products for later and move them into your basket when ready.</h1>
          <p>Liked products persist locally in this prototype and can later connect to customer accounts.</p>
        </div>
      </section>

      <section className="section padded">
        {wishlistProducts.length ? (
          <>
            <div className="wishlist-actions">
              {wishlistProducts.map((product) => (
                <button key={product.id} type="button" onClick={() => moveWishlistToCart(product.id)}>
                  Move {product.title} to cart
                </button>
              ))}
            </div>
            <ProductGrid products={wishlistProducts} />
          </>
        ) : (
          <div className="empty-state">
            <h2>No liked items yet.</h2>
            <p>Use the heart button on product cards to build a saved list.</p>
            <Link className="button primary" to="/shop">
              Browse Products
            </Link>
          </div>
        )}
      </section>

      <section className="section soft-band">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Worth saving</p>
            <h2>Popular Status picks</h2>
          </div>
        </div>
        <ProductGrid products={fallback} compact />
      </section>
    </>
  );
}
