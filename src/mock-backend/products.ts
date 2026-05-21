import { SEED_STOCK } from './seed-catalog';
import {
  getMergedCatalog,
  getMergedCatalogById,
  isProductActive,
} from './product-overrides';
import {
  dispatchMockEvent,
  MOCK_STORAGE_KEYS,
  readJson,
  writeJson,
} from './storage';
import type { MockCatalogProduct, MockProduct, StockLevel } from './types';

export function stockStatusFromQuantity(stock: number): StockLevel {
  if (stock <= 0) return 'out-of-stock';
  if (stock <= 5) return 'low-stock';
  return 'in-stock';
}

function getStockMap(): Record<string, number> {
  const stored = readJson<Record<string, number> | null>(MOCK_STORAGE_KEYS.stock, null);
  if (stored) return stored;
  writeJson(MOCK_STORAGE_KEYS.stock, SEED_STOCK);
  return { ...SEED_STOCK };
}

function saveStockMap(map: Record<string, number>): void {
  writeJson(MOCK_STORAGE_KEYS.stock, map);
  dispatchMockEvent('stockUpdated');
}

export function resetStockToSeed(): void {
  writeJson(MOCK_STORAGE_KEYS.stock, { ...SEED_STOCK });
  dispatchMockEvent('stockUpdated');
}

export function getProductStock(productId: string): number {
  const map = getStockMap();
  return map[productId] ?? 0;
}

export function setProductStock(productId: string, quantity: number): void {
  const map = getStockMap();
  map[productId] = Math.max(0, Math.floor(quantity));
  saveStockMap(map);
}

type ToProductOptions = { includeInactive?: boolean };

function toMockProduct(
  catalog: MockCatalogProduct,
  options?: ToProductOptions,
): MockProduct | null {
  const active = isProductActive(catalog.id);
  if (!active && !options?.includeInactive) return null;

  const stock = getProductStock(catalog.id);
  return {
    ...catalog,
    stock,
    active,
    stockStatus: stockStatusFromQuantity(stock),
  };
}

export function getAllProducts(): MockProduct[] {
  return getMergedCatalog()
    .map((catalog) => toMockProduct(catalog))
    .filter((p): p is MockProduct => Boolean(p));
}

/** Includes inactive products — for mock admin only. */
export function getAllProductsForAdmin(): MockProduct[] {
  return getMergedCatalog()
    .map((catalog) => toMockProduct(catalog, { includeInactive: true }))
    .filter((p): p is MockProduct => Boolean(p));
}

export function getActiveProducts(): MockProduct[] {
  return getAllProducts().filter((p) => p.active && p.stock > 0);
}

export function getProductById(id: string): MockProduct | undefined {
  const catalog = getMergedCatalogById(id);
  if (!catalog) return undefined;
  return toMockProduct(catalog);
}

export function getProductByIdForAdmin(id: string): MockProduct | undefined {
  const catalog = getMergedCatalogById(id);
  if (!catalog) return undefined;
  return toMockProduct(catalog, { includeInactive: true });
}

export function getProductBySlug(slug: string): MockProduct | undefined {
  const catalog = getMergedCatalog().find((p) => p.slug === slug);
  if (!catalog) return undefined;
  return toMockProduct(catalog);
}

export function getProductsByCategory(category: string): MockProduct[] {
  return getAllProducts().filter((p) => p.category === category);
}

export function getRecommendedProducts(limit = 8): MockProduct[] {
  return getAllProducts()
    .filter((p) => p.recommended)
    .slice(0, limit);
}

export function getBestSellers(limit = 8): MockProduct[] {
  return getAllProducts()
    .filter((p) => p.bestSeller)
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(getMergedCatalog().map((p) => p.category)));
}

export function getAllSubcategories(): string[] {
  return Array.from(new Set(getMergedCatalog().map((p) => p.subcategory)));
}

export function canPurchase(productId: string, quantity = 1): boolean {
  const product = getProductById(productId);
  if (!product || !product.active) return false;
  return product.stock >= quantity;
}

export function reduceStock(productId: string, quantity: number): boolean {
  const map = getStockMap();
  const current = map[productId] ?? 0;
  if (current < quantity) return false;
  map[productId] = current - quantity;
  saveStockMap(map);
  return true;
}

export function getAvailableQuantity(productId: string, requestedInCart = 0): number {
  const product = getProductById(productId);
  if (!product) return 0;
  return Math.max(0, product.stock - requestedInCart);
}
