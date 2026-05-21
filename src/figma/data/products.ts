// Status International UK — product UI model.
// Live catalogue, stock, and pricing come from src/mock-backend (replace with API later).

import { mockProductsToFigma } from '../../mock-backend/figma-adapter';
import {
  getAllProducts,
  getBestSellers as getBestSellersMock,
  getProductBySlug as getProductBySlugMock,
  getProductsByCategory as getProductsByCategoryMock,
  getRecommendedProducts as getRecommendedMock,
  getAllCategories as getAllCategoriesMock,
} from '../../mock-backend/products';
import { SEED_CATALOG } from '../../mock-backend/seed-catalog';

export interface Product {
  id: string;
  sku: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  subcategory: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  badges: string[];
  images: string[];
  specifications: Record<string, string>;
  features: string[];
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  recommended: boolean;
  bestSeller: boolean;
}

/** Prefer useProducts() — this snapshot does not auto-refresh on stock changes. */
export function getCatalogSnapshot(): Product[] {
  return mockProductsToFigma(getAllProducts());
}

export const products: Product[] = getCatalogSnapshot();

export function getProductsByCategory(category: string): Product[] {
  return mockProductsToFigma(getProductsByCategoryMock(category));
}

export function getProductsBySubcategory(subcategory: string): Product[] {
  return getCatalogSnapshot().filter((p) => p.subcategory === subcategory);
}

export function getProductBySlug(slug: string): Product | undefined {
  const product = getProductBySlugMock(slug);
  return product ? mockProductsToFigma([product])[0] : undefined;
}

export function getRecommendedProducts(limit: number = 8): Product[] {
  return mockProductsToFigma(getRecommendedMock(limit));
}

export function getBestSellers(limit: number = 8): Product[] {
  return mockProductsToFigma(getBestSellersMock(limit));
}

export function getAllCategories(): string[] {
  return getAllCategoriesMock();
}

export function getAllSubcategories(): string[] {
  return Array.from(new Set(SEED_CATALOG.map((p) => p.subcategory)));
}
