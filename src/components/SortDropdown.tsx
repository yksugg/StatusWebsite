export type SortOption =
  | "recommended"
  | "best-sellers"
  | "newest"
  | "price-low"
  | "price-high"
  | "top-rated";

type SortDropdownProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <label className="sort-dropdown">
      <span>Sort by</span>
      <select value={value} onChange={(event) => onChange(event.target.value as SortOption)}>
        <option value="recommended">Recommended</option>
        <option value="best-sellers">Best Sellers</option>
        <option value="newest">Newest</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="top-rated">Top Rated</option>
      </select>
    </label>
  );
}
