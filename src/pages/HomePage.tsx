import { Link } from "react-router-dom";
import CategoryTile from "../components/CategoryTile";
import HeroBanner from "../components/HeroBanner";
import NewsletterSignup from "../components/NewsletterSignup";
import ProductGrid from "../components/ProductGrid";
import TrustBar from "../components/TrustBar";
import { categories, products } from "../data/catalog";

const featuredTiles = [
  {
    title: "Best Sellers",
    copy: "Customer favourites for everyday use",
    image: "/placeholders/product-home-essentials.svg",
    href: "/shop?badge=Best%20Seller",
  },
  {
    title: "Light Bulbs",
    copy: "Bulbs imported from the RRP spreadsheet",
    image: "/placeholders/product-led-bulb.svg",
    href: "/shop?category=Light%20Bulbs",
  },
  {
    title: "Power & Extensions",
    copy: "Power strips, leads, reels, and cords",
    image: "/placeholders/product-electrical-range.svg",
    href: "/shop?category=Power%20Strips",
  },
  {
    title: "Lamps & Fixtures",
    copy: "Lighting fixtures, lamps, and accessories",
    image: "/placeholders/product-home-essentials.svg",
    href: "/shop?category=Light%20Fixtures",
  },
  {
    title: "New Arrivals",
    copy: "Recently added placeholder products",
    image: "/placeholders/product-smart-lighting.svg",
    href: "/shop?badge=New",
  },
  {
    title: "Amazon Favourites",
    copy: "Popular on Amazon, now direct",
    image: "/placeholders/product-packaging.svg",
    href: "/shop?badge=Amazon%20Favourite",
  },
];

export default function HomePage() {
  const recommended = products.filter((product) => product.recommended).slice(0, 8);
  const amazonFavourites = products.filter((product) => product.amazonFavourite).slice(0, 4);

  return (
    <>
      <HeroBanner
        eyebrow="Status International UK"
        title="Everyday lighting and electrical essentials, made simple."
        copy="Shop trusted Status products for the home, workplace, and everyday use."
        primaryLabel="Shop Now"
        primaryHref="/shop"
        secondaryLabel="Explore Categories"
        secondaryHref="/shop#categories"
      />

      <section className="section padded home-start-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Start shopping</p>
            <h2>Popular ways to browse</h2>
          </div>
          <Link className="text-link" to="/shop">
            View all products
          </Link>
        </div>
        <div className="category-grid featured">
          {featuredTiles.map((tile) => (
            <CategoryTile key={tile.title} {...tile} />
          ))}
        </div>
      </section>

      <section className="section soft-band">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recommended for You</p>
            <h2>Ready-to-shop essentials</h2>
          </div>
          <p>Find the right product faster with clear categories, helpful filters, and trusted recommendations.</p>
        </div>
        <ProductGrid products={recommended} />
      </section>

      <section className="brand-story-strip">
        <img src="/placeholders/banner-amazon-direct.svg" alt="" />
        <div>
          <p className="eyebrow">Direct from Status</p>
          <h2>Popular on Amazon, now available direct.</h2>
          <p>
            Build confidence for customers who already recognise Status products, with saved baskets,
            liked items, and clearer product guidance.
          </p>
          <Link className="button primary" to="/shop?badge=Amazon%20Favourite">
            Shop Amazon Favourites
          </Link>
        </div>
      </section>

      <section className="section padded" id="categories">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Shop by Category</p>
            <h2>A scalable category system for {categories.length} departments</h2>
          </div>
        </div>
        <div className="category-pill-grid">
          {categories.map((category) => (
            <Link key={category} to={`/shop?category=${encodeURIComponent(category)}`}>
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="promo-banner">
        <div>
          <p className="eyebrow">Seasonal Campaign Placeholder</p>
          <h2>Refresh the home with lighting, power, and practical essentials.</h2>
        </div>
        <Link className="button secondary" to="/shop">
          Shop the Range
        </Link>
      </section>

      <section className="section padded">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Amazon Favourites</p>
            <h2>Customer-proven products</h2>
          </div>
        </div>
        <ProductGrid products={amazonFavourites} compact />
      </section>

      <TrustBar />
      <NewsletterSignup />
    </>
  );
}
