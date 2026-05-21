import type { Product } from '../figma/data/products';
import type { MockProduct } from './types';

/** Maps mock catalogue rows to the figma UI `Product` shape (title + stockStatus). */
export function mockProductToFigma(product: MockProduct): Product {
  return {
    id: product.id,
    sku: product.sku,
    slug: product.slug,
    title: product.name,
    shortDescription: product.shortDescription,
    longDescription: product.longDescription,
    category: product.category,
    subcategory: product.subcategory,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    rating: product.rating,
    reviewCount: product.reviewCount,
    badges: product.badges,
    images: product.images,
    specifications: product.specifications,
    features: product.features,
    stockStatus: product.stockStatus,
    recommended: product.recommended,
    bestSeller: product.bestSeller,
  };
}

export function mockProductsToFigma(products: MockProduct[]): Product[] {
  return products.map(mockProductToFigma);
}
