import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterSidebar, {
  defaultFilters,
  type FilterKey,
  type FilterState,
} from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";
import SortDropdown, { type SortOption } from "../components/SortDropdown";
import { categories, products } from "../data/catalog";
import { useStore } from "../context/StoreContext";
import type { Product } from "../types";

function productMatches(product: Product, key: FilterKey, values: string[]) {
  if (!values.length) return true;
  if (key === "category") return values.includes(product.category);
  if (key === "availability") {
    return values.includes(product.specifications.Availability) || values.includes(product.stockStatus);
  }
  if (key === "offers") return values.some((value) => product.badges.includes(value));
  if (key === "brandRange") return values.includes(product.specifications.Range);

  const specKey: Record<FilterKey, string> = {
    category: "Category",
    availability: "Availability",
    packSize: "Pack Size",
    capType: "Cap Type",
    colourTemperature: "Colour Temperature",
    location: "Location",
    smart: "Smart",
    brandRange: "Range",
    offers: "Offers",
  };

  const value = product.specifications[specKey[key]];
  return values.includes(value);
}

function sortProducts(items: Product[], sort: SortOption) {
  const sorted = [...items];
  if (sort === "best-sellers") return sorted.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller));
  if (sort === "newest") return sorted.sort((a, b) => Number(b.badges.includes("New")) - Number(a.badges.includes("New")));
  if (sort === "price-low") return sorted.sort((a, b) => a.price - b.price);
  if (sort === "price-high") return sorted.sort((a, b) => b.price - a.price);
  if (sort === "top-rated") return sorted.sort((a, b) => b.rating - a.rating);
  return sorted.sort((a, b) => Number(b.recommended) - Number(a.recommended));
}

export default function ShopPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialCategory = params.get("category");
  const initialBadge = params.get("badge");
  const initialSearch = params.get("q") ?? "";
  const { recentProducts } = useStore();

  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState<SortOption>("recommended");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...defaultFilters,
    category: initialCategory ? [initialCategory] : [],
    offers: initialBadge ? [initialBadge] : [],
  }));

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        [product.title, product.category, product.subcategory, product.shortDescription, product.sku]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return (
        matchesSearch &&
        product.price <= filters.maxPrice &&
        product.rating >= filters.minRating &&
        (Object.keys(defaultFilters) as Array<keyof FilterState>).every((key) => {
          if (key === "minRating" || key === "maxPrice") return true;
          return productMatches(product, key, filters[key]);
        })
      );
    });
    return sortProducts(filtered, sort);
  }, [filters, search, sort]);

  const recommended = products.filter((product) => product.recommended).slice(0, 4);
  const bestSellers = products.filter((product) => product.bestSeller).slice(0, 4);
  const alsoBought = products.filter((product) => product.amazonFavourite || product.category === "Batteries").slice(0, 4);
  const visibleProducts = filteredProducts.slice(0, 48);
  const quickCategories = [
    "Light Bulbs",
    "Power Strips",
    "Light Fixtures",
    "Electrical Outlets",
    "Lamp",
    "Power Converters",
    "Cable Reels",
    "Security Electronics",
    "Batteries",
    "Timer",
  ].filter((category) => categories.includes(category));

  const toggleFilter = (key: FilterKey, value: string) => {
    setFilters((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((item) => item !== value)
        : [...current[key], value],
    }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setSearch("");
  };

  return (
    <>
      <section className="shop-hero">
        <div>
          <p className="eyebrow">{products.length} customer-priced products from RRP spreadsheet</p>
          <h1>Shop Status Products</h1>
          <p>
            Lighting, electrical accessories, batteries, torches, seasonal ranges, and home
            essentials with customer prices imported from the List Price with Tax field.
          </p>
        </div>
        <img src="/placeholders/banner-shop-category.svg" alt="" />
      </section>

      <section className="shop-shell">
        <div className="shop-topbar">
          <div>
            <p className="eyebrow">Search within shop</p>
            <label className="shop-search">
              <span className="sr-only">Search Status products</span>
              <input
                type="search"
                value={search}
                placeholder="Search bulbs, batteries, extension leads..."
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </div>
          <div className="shop-controls">
            <button type="button" className="button secondary mobile-filter-trigger" onClick={() => setDrawerOpen(true)}>
              <SlidersHorizontal size={18} aria-hidden="true" />
              Filters
            </button>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>

        <div className="quick-category-row" id="categories">
          {quickCategories.map((category) => (
            <button
              type="button"
              key={category}
              className={filters.category.includes(category) ? "is-active" : ""}
              onClick={() => toggleFilter("category", category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="shop-layout">
          <FilterSidebar
            filters={filters}
            onToggle={toggleFilter}
            onRatingChange={(value) => setFilters((current) => ({ ...current, minRating: value }))}
            onPriceChange={(value) => setFilters((current) => ({ ...current, maxPrice: value }))}
            onClear={clearFilters}
          />

          <div className="shop-results">
            <div className="results-heading">
              <div>
                <p className="eyebrow">Product grid</p>
                <h2>{filteredProducts.length} products matched</h2>
              </div>
              <p>Showing {visibleProducts.length} of {filteredProducts.length} matched products.</p>
            </div>
            <ProductGrid products={visibleProducts} />

            <div className="pagination-mock" aria-label="Pagination">
              <button type="button" className="is-active">1</button>
              <button type="button">2</button>
              <button type="button">3</button>
              <span>...</span>
              <button type="button">Next</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section soft-band">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recommended</p>
            <h2>Helpful starting points</h2>
          </div>
        </div>
        <ProductGrid products={recommended} compact />
      </section>

      <section className="section padded">
        <div className="multi-row-sections">
          <div>
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">Recently Viewed</p>
                <h2>Pick up where you left off</h2>
              </div>
            </div>
            <ProductGrid products={recentProducts.slice(0, 4)} compact />
          </div>
          <div>
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">Customers Also Bought</p>
                <h2>Common basket additions</h2>
              </div>
            </div>
            <ProductGrid products={alsoBought} compact />
          </div>
          <div>
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">Best Sellers</p>
                <h2>Popular essentials</h2>
              </div>
            </div>
            <ProductGrid products={bestSellers} compact />
          </div>
        </div>
      </section>

      <div className={`filter-drawer-shell ${drawerOpen ? "is-open" : ""}`}>
        <button className="filter-drawer-backdrop" type="button" aria-label="Close filters" onClick={() => setDrawerOpen(false)} />
        <div className="mobile-filter-drawer">
          <div className="drawer-header">
            <h2>Filters</h2>
            <button type="button" aria-label="Close filters" onClick={() => setDrawerOpen(false)}>
              <X size={22} />
            </button>
          </div>
          <FilterSidebar
            isDrawer
            filters={filters}
            onToggle={toggleFilter}
            onRatingChange={(value) => setFilters((current) => ({ ...current, minRating: value }))}
            onPriceChange={(value) => setFilters((current) => ({ ...current, maxPrice: value }))}
            onClear={clearFilters}
          />
        </div>
      </div>
    </>
  );
}
