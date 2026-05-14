import { categories, priceFilterMax, products } from "../data/catalog";

export type FilterKey =
  | "category"
  | "availability"
  | "packSize"
  | "capType"
  | "colourTemperature"
  | "location"
  | "smart"
  | "brandRange"
  | "offers";

export type FilterState = Record<FilterKey, string[]> & {
  minRating: number;
  maxPrice: number;
};

export const defaultFilters: FilterState = {
  category: [],
  availability: [],
  packSize: [],
  capType: [],
  colourTemperature: [],
  location: [],
  smart: [],
  brandRange: [],
  offers: [],
  minRating: 0,
  maxPrice: priceFilterMax,
};

type FilterSidebarProps = {
  filters: FilterState;
  onToggle: (key: FilterKey, value: string) => void;
  onRatingChange: (value: number) => void;
  onPriceChange: (value: number) => void;
  onClear: () => void;
  isDrawer?: boolean;
};

const uniqueSpecValues = (specificationName: string) =>
  Array.from(
    new Set(
      products
        .map((product) => product.specifications[specificationName])
        .filter((value) => value && value !== "N/A"),
    ),
  ).sort((a, b) => a.localeCompare(b));

const filterGroups: Array<{ key: FilterKey; title: string; values: string[] }> = [
  { key: "category", title: "Category", values: categories },
  { key: "availability", title: "Availability", values: uniqueSpecValues("Availability") },
  { key: "packSize", title: "Pack Size", values: uniqueSpecValues("Pack Size") },
  { key: "capType", title: "Cap Type", values: uniqueSpecValues("Cap Type") },
  { key: "colourTemperature", title: "Colour Temperature", values: uniqueSpecValues("Colour Temperature") },
  { key: "location", title: "Indoor / Outdoor", values: uniqueSpecValues("Location") },
  { key: "smart", title: "Smart / Non-smart", values: uniqueSpecValues("Smart") },
  { key: "brandRange", title: "Brand range", values: uniqueSpecValues("Range") },
  {
    key: "offers",
    title: "Offers",
    values: Array.from(new Set(products.flatMap((product) => product.badges))).sort((a, b) =>
      a.localeCompare(b),
    ),
  },
];

export default function FilterSidebar({
  filters,
  onToggle,
  onRatingChange,
  onPriceChange,
  onClear,
  isDrawer = false,
}: FilterSidebarProps) {
  return (
    <aside className={`filter-sidebar ${isDrawer ? "is-drawer" : ""}`} aria-label="Product filters">
      <div className="filter-heading">
        <div>
          <p className="eyebrow">Refine</p>
          <h2>Filters</h2>
        </div>
        <button type="button" className="text-link" onClick={onClear}>
          Clear all
        </button>
      </div>

      <div className="filter-block">
        <h3>Price</h3>
        <label className="range-control">
          <span>Up to {"\u00a3"}{filters.maxPrice}</span>
          <input
            type="range"
            min="0"
            max={priceFilterMax}
            step="5"
            value={filters.maxPrice}
            onChange={(event) => onPriceChange(Number(event.target.value))}
          />
        </label>
      </div>

      <div className="filter-block">
        <h3>Rating</h3>
        <label className="select-row">
          <span>Minimum rating</span>
          <select
            value={filters.minRating}
            onChange={(event) => onRatingChange(Number(event.target.value))}
          >
            <option value={0}>Any rating</option>
            <option value={4}>4 stars and up</option>
            <option value={4.5}>4.5 stars and up</option>
          </select>
        </label>
      </div>

      {filterGroups.map((group) => (
        <div className="filter-block" key={group.key}>
          <h3>{group.title}</h3>
          <div className="checkbox-list">
            {group.values.map((value) => {
              const id = `${group.key}-${value}`.replace(/\W+/g, "-").toLowerCase();
              return (
                <label key={value} htmlFor={id}>
                  <input
                    id={id}
                    type="checkbox"
                    checked={filters[group.key].includes(value)}
                    onChange={() => onToggle(group.key, value)}
                  />
                  <span>{value}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
}
