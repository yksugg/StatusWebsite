import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/catalog";
import type { Product } from "../types";
import { useStore } from "../context/StoreContext";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const liked = wishlist.includes(product.id);

  return (
    <article className={`product-card ${compact ? "is-compact" : ""}`}>
      <div className="product-media">
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.title}`}>
          <img src={product.images[0]} alt={product.title} loading="lazy" />
        </Link>
        <button
          type="button"
          className={`wishlist-button ${liked ? "is-liked" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={liked ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
        >
          <Heart size={19} fill={liked ? "currentColor" : "none"} />
        </button>
        <div className="badge-row">
          {product.badges.slice(0, 2).map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      </div>

      <div className="product-card-body">
        <p className="product-category">{product.category}</p>
        <h3>
          <Link to={`/product/${product.slug}`}>{product.title}</Link>
        </h3>
        <div className="rating-row" aria-label={`${product.rating} out of 5 stars`}>
          <Star size={15} fill="currentColor" aria-hidden="true" />
          <span>{product.rating.toFixed(1)}</span>
          <small>({product.reviewCount})</small>
        </div>
        {!compact ? <p>{product.shortDescription}</p> : null}
        <div className="price-row">
          <strong>{formatPrice(product.price)}</strong>
          {product.compareAtPrice ? <del>{formatPrice(product.compareAtPrice)}</del> : null}
        </div>
      </div>

      <div className="product-card-actions">
        <button type="button" className="button primary" onClick={() => addToCart(product.id)}>
          <ShoppingBag size={17} aria-hidden="true" />
          Quick Add
        </button>
        <Link className="button text-button" to={`/product/${product.slug}`}>
          <Eye size={17} aria-hidden="true" />
          Quick View
        </Link>
      </div>
    </article>
  );
}
