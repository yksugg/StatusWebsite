import { ChevronRight, Star } from "lucide-react";
import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import BuyBox from "../components/BuyBox";
import ProductGallery from "../components/ProductGallery";
import ProductGrid from "../components/ProductGrid";
import { getProductBySlug, products } from "../data/catalog";
import { useStore } from "../context/StoreContext";

export default function ProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addRecent, recentProducts } = useStore();

  useEffect(() => {
    if (product) addRecent(product.id);
  }, [addRecent, product]);

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);
  const recommended = products.filter((item) => item.recommended && item.id !== product.id).slice(0, 4);

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={15} aria-hidden="true" />
        <Link to="/shop">Shop</Link>
        <ChevronRight size={15} aria-hidden="true" />
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
        <ChevronRight size={15} aria-hidden="true" />
        <span>{product.title}</span>
      </nav>

      <section className="product-detail-layout">
        <ProductGallery images={product.images} title={product.title} />

        <section className="product-info">
          <div className="badge-row static">
            {product.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
          <p className="product-category">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="sku">SKU: {product.sku}</p>
          <div className="rating-row large" aria-label={`${product.rating} out of 5 stars`}>
            <Star size={18} fill="currentColor" aria-hidden="true" />
            <strong>{product.rating.toFixed(1)}</strong>
            <span>{product.reviewCount} reviews placeholder</span>
          </div>
          <p className="product-lede">{product.shortDescription}</p>
          <p>{product.longDescription}</p>
        </section>

        <BuyBox product={product} />
      </section>

      <section className="product-detail-sections">
        <article>
          <h2>Description</h2>
          <p>{product.longDescription}</p>
        </article>
        <article>
          <h2>Key Features</h2>
          <ul className="feature-list">
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </article>
        <article>
          <h2>Specifications</h2>
          <dl className="spec-grid">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </article>
        <article>
          <h2>What's in the box</h2>
          <p>{product.specifications["Pack Size"]} of {product.title}. Final packaging details to be supplied with the real catalogue.</p>
        </article>
        <article>
          <h2>Delivery & Returns</h2>
          <p>
            Delivery thresholds, dispatch timelines, returns windows, and warranty copy are placeholders
            for the fulfilment and customer service phase.
          </p>
        </article>
        <article>
          <h2>Reviews</h2>
          <p>Customer review summaries and verified review feeds can be connected once the store platform is selected.</p>
        </article>
      </section>

      <section className="section soft-band">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Related Products</p>
            <h2>More from {product.category}</h2>
          </div>
        </div>
        <ProductGrid products={related.length ? related : recommended} compact />
      </section>

      <section className="section padded">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recently Viewed</p>
            <h2>Your browsing history</h2>
          </div>
        </div>
        <ProductGrid products={recentProducts.slice(0, 4)} compact />
      </section>
    </>
  );
}
