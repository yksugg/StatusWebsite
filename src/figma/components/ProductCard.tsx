import { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../data/products';
import { addToCart, addToWishlist, removeFromWishlist, isInWishlist } from '../utils/storage';

interface ProductCardProps {
  product: Product;
  onProductClick: (slug: string) => void;
  imageUrl: string;
}

function ImageWithFallback(props: any) {
  const [didError, setDidError] = useState(false)
  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==" alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={() => setDidError(true)} />
  )
}

export default function ProductCard({ product, onProductClick, imageUrl }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    setIsWishlisted(isInWishlist(product.id));
    
    const handleWishlistUpdate = () => {
      setIsWishlisted(isInWishlist(product.id));
    };
    
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
  }, [product.id]);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product.id, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group relative"
      onClick={() => onProductClick(product.slug)}
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.badges.map((badge) => (
            <span
              key={badge}
              className={`px-2 py-1 text-xs rounded ${
                badge === 'Best Seller'
                  ? 'bg-[var(--brand-deep)] text-white'
                  : badge === 'New'
                  ? 'bg-[var(--brand-cyan)] text-white'
                  : badge === 'Amazon Favourite'
                  ? 'bg-orange-500 text-white'
                  : 'bg-[var(--brand-blue)] text-white'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Quick Add Button - appears on hover */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 left-2 right-2 bg-[var(--brand-deep)] text-white py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 hover:bg-[var(--brand-blue)]"
        >
          <ShoppingCart className="w-4 h-4" />
          {addedToCart ? 'Added!' : 'Quick Add'}
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-sm mb-2 line-clamp-2 min-h-[40px]">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          {renderStars(Math.round(product.rating))}
          <span className="text-xs text-gray-500">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg text-[var(--brand-deep)]">
            £{product.price.toFixed(2)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">
              £{product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mt-2">
          {product.stockStatus === 'in-stock' && (
            <span className="text-xs text-green-600 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              In Stock
            </span>
          )}
          {product.stockStatus === 'low-stock' && (
            <span className="text-xs text-orange-600">Low Stock</span>
          )}
          {product.stockStatus === 'out-of-stock' && (
            <span className="text-xs text-red-600">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
}
