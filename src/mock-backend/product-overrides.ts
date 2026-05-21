import {
  dispatchMockEvent,
  MOCK_STORAGE_KEYS,
  readJson,
  writeJson,
} from './storage';
import type { MockCatalogProduct, ProductOverride } from './types';
import { SEED_CATALOG } from './seed-catalog';

export type ProductOverridesMap = Record<string, ProductOverride>;

export function getProductOverrides(): ProductOverridesMap {
  return readJson<ProductOverridesMap>(MOCK_STORAGE_KEYS.productOverrides, {});
}

export function getProductOverride(productId: string): ProductOverride | undefined {
  return getProductOverrides()[productId];
}

export function saveProductOverride(
  productId: string,
  patch: ProductOverride,
): void {
  const all = getProductOverrides();
  all[productId] = { ...all[productId], ...patch };
  writeJson(MOCK_STORAGE_KEYS.productOverrides, all);
  dispatchMockEvent('catalogUpdated');
}

export function clearProductOverrides(): void {
  writeJson(MOCK_STORAGE_KEYS.productOverrides, {});
  dispatchMockEvent('catalogUpdated');
}

export function isProductActive(productId: string): boolean {
  const override = getProductOverride(productId);
  return override?.active !== false;
}

export function mergeCatalogProduct(seed: MockCatalogProduct): MockCatalogProduct {
  const override = getProductOverride(seed.id);
  if (!override) return seed;

  const images =
    override.imageUrl !== undefined && override.imageUrl !== ''
      ? [override.imageUrl, ...seed.images.filter((_, i) => i > 0)]
      : seed.images;

  return {
    ...seed,
    name: override.name ?? seed.name,
    sku: override.sku ?? seed.sku,
    category: override.category ?? seed.category,
    subcategory: override.subcategory ?? seed.subcategory,
    price: override.price ?? seed.price,
    shortDescription: override.shortDescription ?? seed.shortDescription,
    longDescription: override.longDescription ?? seed.longDescription,
    images,
  };
}

export function getMergedCatalog(): MockCatalogProduct[] {
  return SEED_CATALOG.map(mergeCatalogProduct);
}

export function getMergedCatalogById(id: string): MockCatalogProduct | undefined {
  const seed = SEED_CATALOG.find((p) => p.id === id);
  return seed ? mergeCatalogProduct(seed) : undefined;
}
