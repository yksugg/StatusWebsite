import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Product } from '../figma/data/products';
import { mockProductToFigma } from '../mock-backend/figma-adapter';
import {
  addToCart as addToCartService,
  clearCart as clearCartService,
  getCart,
  getCartCount,
  removeFromCart as removeFromCartService,
  updateCartItemQuantity as updateQtyService,
} from '../mock-backend/cart';
import { getProductById } from '../mock-backend/products';
import { calculateCartSubtotal } from '../mock-backend/checkout';
import { calculateUkShipping, UK_SHIPPING_CONFIG } from '../mock-backend/shipping';

export type CartLineView = {
  productId: string;
  quantity: number;
  product: Product;
};

export function useCart() {
  const [version, setVersion] = useState(0);

  const refresh = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    const onCart = () => refresh();
    const onStock = () => refresh();
    window.addEventListener('cartUpdated', onCart);
    window.addEventListener('stockUpdated', onStock);
    return () => {
      window.removeEventListener('cartUpdated', onCart);
      window.removeEventListener('stockUpdated', onStock);
    };
  }, [refresh]);

  const lines = useMemo((): CartLineView[] => {
    void version;
    return getCart()
      .map((line) => {
        const mock = getProductById(line.productId);
        if (!mock) return null;
        return {
          productId: line.productId,
          quantity: line.quantity,
          product: mockProductToFigma(mock),
        };
      })
      .filter((line): line is CartLineView => Boolean(line));
  }, [version]);

  const subtotal = useMemo(() => {
    void version;
    return calculateCartSubtotal();
  }, [version, lines]);

  const shipping = useMemo(() => calculateUkShipping(subtotal), [subtotal]);
  const total = subtotal + shipping;
  const count = useMemo(() => {
    void version;
    return getCartCount();
  }, [version]);

  const addToCart = useCallback(
    (productId: string, quantity = 1) => {
      const result = addToCartService(productId, quantity);
      if (!result.ok) return result;
      refresh();
      return result;
    },
    [refresh],
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      removeFromCartService(productId);
      refresh();
    },
    [refresh],
  );

  const updateCartItemQuantity = useCallback(
    (productId: string, quantity: number) => {
      const result = updateQtyService(productId, quantity);
      refresh();
      return result;
    },
    [refresh],
  );

  const clearCart = useCallback(() => {
    clearCartService();
    refresh();
  }, [refresh]);

  return {
    lines,
    count,
    subtotal,
    shipping,
    total,
    shippingConfig: UK_SHIPPING_CONFIG,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    refresh,
  };
}
