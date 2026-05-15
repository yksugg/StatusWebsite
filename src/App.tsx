import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroBanner from './components/HeroBanner';
import CategoryTile from './components/CategoryTile';
import ProductCard from './components/ProductCard';
import { products, getRecommendedProducts, getBestSellers, getAmazonFavourites, getProductBySlug, Product } from './data/products';
import { getCart, removeFromCart, updateCartItemQuantity, addToCart, getWishlist, addToWishlist, removeFromWishlist, getRecentlyViewed, addToRecentlyViewed, login, logout, getCurrentUser, isLoggedIn as checkLoggedIn } from './utils/storage';
import { Star, ShoppingCart, Heart, Trash2, Plus, Minus, Filter, X, ChevronDown, Package, Truck, Shield, Phone, Mail, MapPin, User, Eye } from 'lucide-react';

// CSS Variables for brand colors
const styles = `
  :root {
    --brand-deep: #004B87; /* Deep blue - closest valid hex to "004B6" (which is invalid) */
    --brand-blue: #008BB1;
    --brand-cyan: #00B3E3;
  }
`;

// Product images mapping - using Unsplash placeholders
const productImages: Record<string, string> = {
  '1': 'https://images.unsplash.com/photo-1532007271951-c487760934ae?w=400',
  '2': 'https://images.unsplash.com/photo-1532007271951-c487760934ae?w=400',
  '3': 'https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=400',
  '4': 'https://images.unsplash.com/photo-1619641805634-b867f535071c?w=400',
  '5': 'https://images.unsplash.com/photo-1685342654383-584d56907425?w=400',
  '6': 'https://images.unsplash.com/photo-1608377205619-03a0b4c4e270?w=400',
  '7': 'https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=400',
  '8': 'https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=400',
  '9': 'https://images.unsplash.com/photo-1511461744085-90a4d1c66be3?w=400',
  '10': 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400',
  '11': 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400',
  '12': 'https://images.unsplash.com/photo-1619641805634-b867f535071c?w=400',
  '13': 'https://images.unsplash.com/photo-1658692051708-519fbdac7e8f?w=400',
  '14': 'https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=400',
  '15': 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400',
  '16': 'https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=400',
  '17': 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400',
  '18': 'https://images.unsplash.com/photo-1658692051708-519fbdac7e8f?w=400',
  '19': 'https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=400',
  '20': 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400',
  '21': 'https://images.unsplash.com/photo-1511461744085-90a4d1c66be3?w=400',
  '22': 'https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=400',
  '23': 'https://images.unsplash.com/photo-1685342654383-584d56907425?w=400',
  '24': 'https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=400',
};

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

export default function StatusEcommerce() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  
  // Shop page state
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState('recommended');

  useEffect(() => {
    updateCart();
    updateWishlist();
    updateRecentlyViewed();

    window.addEventListener('cartUpdated', updateCart);
    window.addEventListener('wishlistUpdated', updateWishlist);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCart);
      window.removeEventListener('wishlistUpdated', updateWishlist);
    };
  }, []);

  const updateCart = () => {
    const cart = getCart();
    const items = cart.map(item => ({
      ...item,
      product: products.find(p => p.id === item.productId)
    }));
    setCartItems(items);
  };

  const updateWishlist = () => {
    setWishlistItems(getWishlist());
  };

  const updateRecentlyViewed = () => {
    setRecentlyViewedIds(getRecentlyViewed());
  };

  const handleNavigate = (page: string, productSlug?: string) => {
    setCurrentPage(page);
    if (page === 'product' && productSlug) {
      const product = getProductBySlug(productSlug);
      if (product) {
        setSelectedProduct(product);
        addToRecentlyViewed(product.id);
        updateRecentlyViewed();
      }
    }
    window.scrollTo(0, 0);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  // Home Page
  const HomePage = () => (
    <div>
      <HeroBanner
        title="Everyday lighting and electrical essentials, made simple."
        subtitle="Shop trusted Status products for the home, workplace, and everyday use."
        imageUrl="https://images.unsplash.com/photo-1666585607888-3f6fe0b323d8?w=1200"
        primaryButtonText="Shop Now"
        secondaryButtonText="Explore Categories"
        onPrimaryClick={() => handleNavigate('shop')}
        onSecondaryClick={() => handleNavigate('shop')}
      />

      {/* Trust Bar */}
      <div className="bg-gray-50 py-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <Package className="w-12 h-12 mx-auto mb-3 text-[var(--brand-deep)]" />
              <h3 className="font-semibold mb-1">UK-based Supplier</h3>
              <p className="text-sm text-gray-600">Over 30 years trading</p>
            </div>
            <div>
              <Shield className="w-12 h-12 mx-auto mb-3 text-[var(--brand-deep)]" />
              <h3 className="font-semibold mb-1">Quality Tested</h3>
              <p className="text-sm text-gray-600">In-house laboratory</p>
            </div>
            <div>
              <Truck className="w-12 h-12 mx-auto mb-3 text-[var(--brand-deep)]" />
              <h3 className="font-semibold mb-1">Fast Dispatch</h3>
              <p className="text-sm text-gray-600">From our UK warehouse</p>
            </div>
            <div>
              <Phone className="w-12 h-12 mx-auto mb-3 text-[var(--brand-deep)]" />
              <h3 className="font-semibold mb-1">Expert Support</h3>
              <p className="text-sm text-gray-600">Helpful customer service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tiles */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <CategoryTile
            title="Best Sellers"
            imageUrl="https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400"
            onClick={() => handleNavigate('shop')}
          />
          <CategoryTile
            title="Light Bulbs"
            imageUrl="https://images.unsplash.com/photo-1532007271951-c487760934ae?w=400"
            onClick={() => handleNavigate('shop')}
          />
          <CategoryTile
            title="Extension Leads"
            imageUrl="https://images.unsplash.com/photo-1610056494071-9373f12bf769?w=400"
            onClick={() => handleNavigate('shop')}
          />
          <CategoryTile
            title="Batteries"
            imageUrl="https://images.unsplash.com/photo-1619641805634-b867f535071c?w=400"
            onClick={() => handleNavigate('shop')}
          />
          <CategoryTile
            title="Smart Home"
            imageUrl="https://images.unsplash.com/photo-1608377205619-03a0b4c4e270?w=400"
            onClick={() => handleNavigate('shop')}
          />
          <CategoryTile
            title="Outdoor"
            imageUrl="https://images.unsplash.com/photo-1658692051708-519fbdac7e8f?w=400"
            onClick={() => handleNavigate('shop')}
          />
        </div>
      </div>

      {/* Recommended Products */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl mb-8">Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {getRecommendedProducts(4).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              imageUrl={productImages[product.id] || 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400'}
              onProductClick={(slug) => handleNavigate('product', slug)}
            />
          ))}
        </div>
      </div>

      {/* Amazon Favourites Section */}
      <div className="bg-orange-50 py-16 mt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl mb-2">Popular on Amazon, now available direct</h2>
            <p className="text-gray-600">Save more when you buy direct from Status</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getAmazonFavourites(4).map(product => (
              <ProductCard
                key={product.id}
                product={product}
                imageUrl={productImages[product.id] || 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400'}
                onProductClick={(slug) => handleNavigate('product', slug)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Best Sellers */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl mb-8">Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {getBestSellers(4).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              imageUrl={productImages[product.id] || 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400'}
              onProductClick={(slug) => handleNavigate('product', slug)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // Shop Page - The most important page
  const ShopPage = () => {
    const filteredProducts = products.filter(product => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      return true;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'best-sellers':
          return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
        case 'top-rated':
          return b.rating - a.rating;
        case 'newest':
          return parseInt(b.id) - parseInt(a.id);
        default:
          return (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0);
      }
    });

    return (
      <div>
        {/* Shop Hero */}
        <div className="bg-[var(--brand-deep)] text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl mb-2">Shop Status Products</h1>
            <p className="text-xl text-gray-200">Find the right product faster with clear categories, helpful filters, and trusted recommendations</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="font-semibold mb-4 flex items-center justify-between">
                    Filters
                    {(selectedCategories.length > 0) && (
                      <button
                        onClick={() => {
                          setSelectedCategories([]);
                          setPriceRange([0, 100]);
                        }}
                        className="text-sm text-[var(--brand-cyan)] hover:underline"
                      >
                        Clear all
                      </button>
                    )}
                  </h3>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Category</h4>
                    <div className="space-y-2">
                      {['Lighting', 'Electrical Accessories', 'Batteries', 'Torches', 'Work Lights', 'Heating', 'Cooling', 'Outdoor & Garden'].map(category => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories([...selectedCategories, category]);
                              } else {
                                setSelectedCategories(selectedCategories.filter(c => c !== category));
                              }
                            }}
                            className="rounded text-[var(--brand-cyan)]"
                          />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Price Range</h4>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>£{priceRange[0]}</span>
                        <span>£{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stock Status */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Availability</h4>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">In Stock Only</span>
                    </label>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3">Features</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Best Sellers</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Amazon Favourites</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Smart / WiFi</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Rechargeable</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                  <p className="text-gray-600">
                    Showing {sortedProducts.length} of {products.length} products
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--brand-cyan)]"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="best-sellers">Best Sellers</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="top-rated">Top Rated</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    imageUrl={productImages[product.id] || 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400'}
                    onProductClick={(slug) => handleNavigate('product', slug)}
                  />
                ))}
              </div>

              {/* Recently Viewed */}
              {recentlyViewedIds.length > 0 && (
                <div className="mt-16 pt-8 border-t">
                  <h3 className="text-2xl mb-6">Recently Viewed</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {recentlyViewedIds.slice(0, 4).map(id => {
                      const product = products.find(p => p.id === id);
                      if (!product) return null;
                      return (
                        <ProductCard
                          key={product.id}
                          product={product}
                          imageUrl={productImages[product.id] || 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400'}
                          onProductClick={(slug) => handleNavigate('product', slug)}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {filterOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Filters</h3>
                  <button onClick={() => setFilterOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Same filters as sidebar */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Category</h4>
                    <div className="space-y-2">
                      {['Lighting', 'Electrical Accessories', 'Batteries', 'Torches'].map(category => (
                        <label key={category} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories([...selectedCategories, category]);
                              } else {
                                setSelectedCategories(selectedCategories.filter(c => c !== category));
                              }
                            }}
                          />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setFilterOpen(false)}
                  className="w-full mt-6 px-6 py-3 bg-[var(--brand-cyan)] text-white rounded-lg"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Product Detail Page
  const ProductDetailPage = () => {
    if (!selectedProduct) return null;

    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = () => {
      addToCart(selectedProduct.id, quantity);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    };

    const relatedProducts = products.filter(p => 
      p.category === selectedProduct.category && p.id !== selectedProduct.id
    ).slice(0, 4);

    return (
      <div>
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <button onClick={() => handleNavigate('home')} className="hover:text-[var(--brand-deep)]">Home</button>
              <span>/</span>
              <button onClick={() => handleNavigate('shop')} className="hover:text-[var(--brand-deep)]">Shop</button>
              <span>/</span>
              <span>{selectedProduct.category}</span>
              <span>/</span>
              <span className="text-gray-900">{selectedProduct.title}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="mb-4">
                <ImageWithFallback
                  src={productImages[selectedProduct.id] || 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=800'}
                  alt={selectedProduct.title}
                  className="w-full aspect-square object-cover rounded-lg border"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map(idx => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded border-2 overflow-hidden ${
                      selectedImage === idx ? 'border-[var(--brand-cyan)]' : 'border-gray-200'
                    }`}
                  >
                    <ImageWithFallback
                      src={productImages[selectedProduct.id] || 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=200'}
                      alt={`${selectedProduct.title} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedProduct.badges.map(badge => (
                  <span
                    key={badge}
                    className="px-3 py-1 bg-[var(--brand-deep)] text-white text-sm rounded"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl mb-2">{selectedProduct.title}</h1>
              <p className="text-gray-600 mb-4">SKU: {selectedProduct.sku}</p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                {renderStars(Math.round(selectedProduct.rating))}
                <span className="text-gray-600">
                  {selectedProduct.rating} ({selectedProduct.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl text-[var(--brand-deep)]">
                    £{selectedProduct.price.toFixed(2)}
                  </span>
                  {selectedProduct.compareAtPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      £{selectedProduct.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {selectedProduct.compareAtPrice && (
                  <p className="text-green-600 mt-1">
                    Save £{(selectedProduct.compareAtPrice - selectedProduct.price).toFixed(2)}
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6">{selectedProduct.longDescription}</p>

              {/* Stock Status */}
              <div className="mb-6">
                {selectedProduct.stockStatus === 'in-stock' && (
                  <span className="flex items-center gap-2 text-green-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    In Stock - Ready to ship
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border rounded-lg hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border rounded-lg hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Buy Box */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full px-6 py-4 bg-[var(--brand-cyan)] text-white rounded-lg hover:bg-[var(--brand-blue)] transition-colors flex items-center justify-center gap-2 text-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </button>
                <button className="w-full px-6 py-4 bg-[var(--brand-deep)] text-white rounded-lg hover:opacity-90 transition-opacity text-lg">
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    if (wishlistItems.includes(selectedProduct.id)) {
                      removeFromWishlist(selectedProduct.id);
                    } else {
                      addToWishlist(selectedProduct.id);
                    }
                  }}
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-[var(--brand-deep)] transition-colors flex items-center justify-center gap-2"
                >
                  <Heart className={wishlistItems.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : ''} />
                  {wishlistItems.includes(selectedProduct.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="border-t pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-[var(--brand-deep)]" />
                  <span>Free UK delivery on orders over £50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-[var(--brand-deep)]" />
                  <span>Secure checkout with encryption</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Package className="w-5 h-5 text-[var(--brand-deep)]" />
                  <span>30-day returns policy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <div className="border-b">
              <div className="flex gap-8">
                <button className="pb-4 border-b-2 border-[var(--brand-deep)] text-[var(--brand-deep)]">
                  Description
                </button>
                <button className="pb-4 text-gray-600">
                  Specifications
                </button>
                <button className="pb-4 text-gray-600">
                  Reviews
                </button>
              </div>
            </div>

            <div className="py-8">
              <h3 className="text-xl mb-4">Product Description</h3>
              <p className="text-gray-700 mb-6">{selectedProduct.longDescription}</p>

              <h4 className="font-semibold mb-3">Key Features:</h4>
              <ul className="space-y-2 mb-6">
                {selectedProduct.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <h4 className="font-semibold mb-3">Specifications:</h4>
              <div className="bg-gray-50 rounded-lg p-6">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-200 pb-2">
                      <dt className="text-sm text-gray-600">{key}</dt>
                      <dd className="font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl mb-6">Related Products</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    imageUrl={productImages[product.id] || 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400'}
                    onProductClick={(slug) => handleNavigate('product', slug)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // About Page
  const AboutPage = () => (
    <div>
      <div className="bg-[var(--brand-deep)] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl mb-4">About Status International UK</h1>
          <p className="text-xl text-gray-200">Over 30 years of trusted quality lighting and electrical products</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Status International UK has been a trusted supplier of lighting and electrical accessories for over 30 years. Based in West Yorkshire, we combine British quality standards with innovative product design to bring you reliable, affordable products for everyday use.
            </p>
            <p className="text-gray-700 mb-4">
              What started as a small distribution business has grown into a comprehensive range of 700+ SKUs across 44+ categories, all designed to make your life easier and your home brighter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600"
                alt="Warehouse"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl mb-2">UK Distribution</h3>
              <p className="text-gray-600">
                Our modern warehouse facility ensures fast dispatch and reliable stock availability across our entire product range.
              </p>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1602052577122-f73b9710adba?w=600"
                alt="Quality testing"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl mb-2">Quality & Testing</h3>
              <p className="text-gray-600">
                Every product undergoes rigorous testing in our in-house laboratory to ensure it meets UK safety standards and our quality expectations.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl mb-6">Why Buy Direct from Status?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[var(--brand-cyan)] rounded-full flex items-center justify-center text-white">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Better Prices</h3>
                  <p className="text-sm text-gray-600">Save money buying direct without retail markups</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[var(--brand-cyan)] rounded-full flex items-center justify-center text-white">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Full Range</h3>
                  <p className="text-sm text-gray-600">Access our complete 700+ product catalog</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[var(--brand-cyan)] rounded-full flex items-center justify-center text-white">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Expert Support</h3>
                  <p className="text-sm text-gray-600">Direct access to our product specialists</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[var(--brand-cyan)] rounded-full flex items-center justify-center text-white">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Faster Service</h3>
                  <p className="text-sm text-gray-600">Quick dispatch from our UK warehouse</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?w=800"
              alt="Customer service team"
              className="w-full h-80 object-cover rounded-lg mb-6"
            />
            <h2 className="text-2xl mb-3">Dedicated Customer Support</h2>
            <p className="text-gray-700 mb-6">
              Our UK-based customer service team is here to help with product advice, technical support, and any questions you might have.
            </p>
            <button
              onClick={() => handleNavigate('contact')}
              className="px-8 py-3 bg-[var(--brand-cyan)] text-white rounded-lg hover:bg-[var(--brand-blue)] transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Contact Page
  const ContactPage = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      orderNumber: '',
      enquiryType: 'general',
      message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', orderNumber: '', enquiryType: 'general', message: '' });
      }, 3000);
    };

    return (
      <div>
        <div className="bg-[var(--brand-deep)] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl mb-4">Contact Us</h1>
            <p className="text-xl text-gray-200">We're here to help with any questions</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Contact Cards */}
            <div className="bg-white border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <Phone className="w-12 h-12 mx-auto mb-4 text-[var(--brand-deep)]" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-3">Mon-Fri, 9am-5pm</p>
              <p className="text-lg text-[var(--brand-cyan)]">0800 123 4567</p>
            </div>
            <div className="bg-white border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <Mail className="w-12 h-12 mx-auto mb-4 text-[var(--brand-deep)]" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 mb-3">Response within 24 hours</p>
              <p className="text-lg text-[var(--brand-cyan)]">support@status-uk.com</p>
            </div>
            <div className="bg-white border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-[var(--brand-deep)]" />
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-3">West Yorkshire</p>
              <p className="text-lg text-[var(--brand-cyan)]">United Kingdom</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-cyan)]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-cyan)]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Order Number (optional)</label>
                  <input
                    type="text"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-cyan)]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Enquiry Type *</label>
                  <select
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-cyan)]"
                  >
                    <option value="general">General Enquiry</option>
                    <option value="product">Product Question</option>
                    <option value="order">Order Status</option>
                    <option value="returns">Returns & Refunds</option>
                    <option value="technical">Technical Support</option>
                    <option value="trade">Trade/Wholesale</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-cyan)]"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[var(--brand-cyan)] text-white rounded-lg hover:bg-[var(--brand-blue)] transition-colors"
                >
                  {submitted ? 'Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* FAQ Accordion */}
            <div>
              <h2 className="text-2xl mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { q: 'What are your delivery options?', a: 'We offer free UK delivery on orders over £50. Standard delivery takes 3-5 working days. Express delivery is available for £4.99.' },
                  { q: 'What is your returns policy?', a: 'We offer a 30-day money-back guarantee on all products. Items must be unused and in original packaging.' },
                  { q: 'Do you offer warranty on products?', a: 'All products come with a minimum 1-year manufacturer warranty. Extended warranties are available on selected items.' },
                  { q: 'Can I track my order?', a: 'Yes! Once your order ships, you\'ll receive a tracking number via email to monitor your delivery.' },
                  { q: 'Do you offer trade discounts?', a: 'Yes, we offer competitive trade pricing for businesses. Contact us for more information.' }
                ].map((faq, idx) => (
                  <details key={idx} className="border rounded-lg p-4">
                    <summary className="cursor-pointer font-semibold flex justify-between items-center">
                      {faq.q}
                      <ChevronDown className="w-5 h-5" />
                    </summary>
                    <p className="mt-3 text-gray-600">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Login/Signup Page
  const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const isUserLoggedIn = checkLoggedIn();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      login(formData.email, formData.name || formData.email.split('@')[0]);
      handleNavigate('home');
    };

    const handleLogout = () => {
      logout();
      handleNavigate('home');
    };

    if (isUserLoggedIn) {
      const user = getCurrentUser();
      return (
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl mb-8">My Account</h1>
            <div className="bg-white border rounded-lg p-8 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[var(--brand-deep)] text-white rounded-full flex items-center justify-center text-2xl">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl">{user?.name}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Logout
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => handleNavigate('cart')}
                className="bg-white border rounded-lg p-6 text-left hover:shadow-lg transition-shadow"
              >
                <ShoppingCart className="w-8 h-8 mb-3 text-[var(--brand-deep)]" />
                <h3 className="font-semibold mb-1">My Cart</h3>
                <p className="text-sm text-gray-600">{cartItems.length} items</p>
              </button>
              <button
                onClick={() => handleNavigate('wishlist')}
                className="bg-white border rounded-lg p-6 text-left hover:shadow-lg transition-shadow"
              >
                <Heart className="w-8 h-8 mb-3 text-[var(--brand-deep)]" />
                <h3 className="font-semibold mb-1">Wishlist</h3>
                <p className="text-sm text-gray-600">{wishlistItems.length} products</p>
              </button>
              <button
                onClick={() => handleNavigate('shop')}
                className="bg-white border rounded-lg p-6 text-left hover:shadow-lg transition-shadow"
              >
                <Eye className="w-8 h-8 mb-3 text-[var(--brand-deep)]" />
                <h3 className="font-semibold mb-1">Recently Viewed</h3>
                <p className="text-sm text-gray-600">{recentlyViewedIds.length} products</p>
              </button>
              <button
                className="bg-white border rounded-lg p-6 text-left hover:shadow-lg transition-shadow"
              >
                <Package className="w-8 h-8 mb-3 text-[var(--brand-deep)]" />
                <h3 className="font-semibold mb-1">Orders</h3>
                <p className="text-sm text-gray-600">View order history</p>
              </button>
            </div>

            {/* Recently Viewed in Account */}
            {recentlyViewedIds.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl mb-6">Recently Viewed Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {recentlyViewedIds.slice(0, 4).map(id => {
                    const product = products.find(p => p.id === id);
                    if (!product) return null;
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        imageUrl={productImages[product.id] || 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400'}
                        onProductClick={(slug) => handleNavigate('product', slug)}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
              <p className="text-gray-600">
                {isLogin ? 'Login to access your account' : 'Join Status International UK'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-cyan)]"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-cyan)]"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-cyan)]"
                />
              </div>
              {!isLogin && (
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Send me news and offers</span>
                </label>
              )}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[var(--brand-cyan)] text-white rounded-lg hover:bg-[var(--brand-blue)] transition-colors"
              >
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[var(--brand-cyan)] hover:underline"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Cart Page
  const CartPage = () => {
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);
    const delivery = subtotal >= 50 ? 0 : 4.99;
    const total = subtotal + delivery;

    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started</p>
            <button
              onClick={() => handleNavigate('shop')}
              className="px-8 py-3 bg-[var(--brand-cyan)] text-white rounded-lg hover:bg-[var(--brand-blue)]"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => {
                if (!item.product) return null;
                return (
                  <div key={item.productId} className="bg-white border rounded-lg p-4 flex gap-4">
                    <ImageWithFallback
                      src={productImages[item.product.id] || 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=200'}
                      alt={item.product.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.product.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">SKU: {item.product.sku}</p>
                      <p className="text-lg text-[var(--brand-deep)]">£{item.product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartItemQuantity(item.productId, Math.max(1, item.quantity - 1))}
                          className="p-1 border rounded hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartItemQuantity(item.productId, item.quantity + 1)}
                          className="p-1 border rounded hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white border rounded-lg p-6 sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span>{delivery === 0 ? 'FREE' : `£${delivery.toFixed(2)}`}</span>
                  </div>
                  {subtotal < 50 && subtotal > 0 && (
                    <p className="text-sm text-gray-600">
                      Spend £{(50 - subtotal).toFixed(2)} more for free delivery
                    </p>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">£{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full px-6 py-3 bg-[var(--brand-cyan)] text-white rounded-lg hover:bg-[var(--brand-blue)] mb-3">
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => handleNavigate('shop')}
                  className="w-full px-6 py-3 border rounded-lg hover:bg-gray-50"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Wishlist Page
  const WishlistPage = () => {
    const wishlistProducts = wishlistItems.map(id => products.find(p => p.id === id)).filter(Boolean) as Product[];

    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl mb-8">My Wishlist</h1>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-24 h-24 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save your favourite products here</p>
            <button
              onClick={() => handleNavigate('shop')}
              className="px-8 py-3 bg-[var(--brand-cyan)] text-white rounded-lg hover:bg-[var(--brand-blue)]"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                imageUrl={productImages[product.id] || 'https://images.unsplash.com/photo-1606170033648-5d55a3edf314?w=400'}
                onProductClick={(slug) => handleNavigate('product', slug)}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{styles}</style>
      
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product' && <ProductDetailPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'login' && <LoginPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'wishlist' && <WishlistPage />}
      </main>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
