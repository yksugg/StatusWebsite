import { useCallback, useEffect, useState } from 'react';
import type { Product } from '../figma/data/products';
import { mockProductToFigma, mockProductsToFigma } from '../mock-backend/figma-adapter';
import {
  getAllProducts,
  getBestSellers as getBestSellersMock,
  getProductBySlug as getProductBySlugMock,
  getRecommendedProducts as getRecommendedMock,
} from '../mock-backend/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(() =>
    mockProductsToFigma(getAllProducts()),
  );

  const refresh = useCallback(() => {
    setProducts(mockProductsToFigma(getAllProducts()));
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener('stockUpdated', refresh);
    window.addEventListener('catalogUpdated', refresh);
    return () => {
      window.removeEventListener('stockUpdated', refresh);
      window.removeEventListener('catalogUpdated', refresh);
    };
  }, [refresh]);

  const getProductBySlug = useCallback(
    (slug: string) => {
      const product = getProductBySlugMock(slug);
      return product ? mockProductToFigma(product) : undefined;
    },
    [products],
  );

  const getRecommendedProducts = useCallback(
    (limit = 8) => mockProductsToFigma(getRecommendedMock(limit)),
    [products],
  );

  const getBestSellers = useCallback(
    (limit = 8) => mockProductsToFigma(getBestSellersMock(limit)),
    [products],
  );

  const getProductById = useCallback(
    (id: string) => {
      const match = getAllProducts().find((p) => p.id === id);
      return match ? mockProductToFigma(match) : undefined;
    },
    [products],
  );

  return {
    products,
    refresh,
    getProductBySlug,
    getProductById,
    getRecommendedProducts,
    getBestSellers,
  };
}
