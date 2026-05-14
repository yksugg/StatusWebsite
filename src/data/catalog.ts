import type { CategoryGroup, Product } from "../types";
import productData from "./products.generated.json";

export const products = productData as Product[];

export const categories = Array.from(
  new Set(products.map((product) => product.category).filter(Boolean)),
).sort((a, b) => a.localeCompare(b));

const groupRules: Array<{ title: string; match: RegExp }> = [
  {
    title: "Lighting",
    match: /bulb|lamp|light|fixture|string/i,
  },
  {
    title: "Electrical & Power",
    match: /power|electrical|plug|adapter|adaptor|cable|socket|outlet|timer|switch|fuse|terminal|circuit|charging|battery/i,
  },
  {
    title: "Home & Appliances",
    match: /toaster|microwave|coffee|cooker|heater|fan|cooler|conditioner|blanket|scale|drying|clothes|office|storage|body|speaker/i,
  },
  {
    title: "Tools, Safety & Outdoor",
    match: /tool|torch|flash|alarm|security|lock|strap|garden|repellent|pesticide|spray|tape|wall|nuts|bicycle/i,
  },
];

export const categoryGroups: CategoryGroup[] = groupRules
  .map((group) => ({
    title: group.title,
    items: categories.filter((category) => group.match.test(category)),
  }))
  .filter((group) => group.items.length);

const assignedCategories = new Set(categoryGroups.flatMap((group) => group.items));
const otherCategories = categories.filter((category) => !assignedCategories.has(category));

if (otherCategories.length) {
  categoryGroups.push({ title: "Other Categories", items: otherCategories });
}

export const maxProductPrice = products.reduce(
  (max, product) => Math.max(max, product.price),
  0,
);

export const priceFilterMax = Math.ceil(maxProductPrice / 5) * 5;

export const getProductBySlug = (slug: string | undefined) =>
  products.find((product) => product.slug === slug);

export const getProductById = (id: string) =>
  products.find((product) => product.id === id);

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(price);
