import { getAvailableQuantity, getProductById } from './products';
import { dispatchMockEvent, MOCK_STORAGE_KEYS, readJson, writeJson } from './storage';
import type { CartLine } from './types';

const MAX_LINE_QTY = 999;

function readCart(): CartLine[] {
  return readJson<CartLine[]>(MOCK_STORAGE_KEYS.cart, []);
}

function writeCart(cart: CartLine[]): void {
  writeJson(MOCK_STORAGE_KEYS.cart, cart);
  dispatchMockEvent('cartUpdated');
}

export function getCart(): CartLine[] {
  return readCart();
}

export function getCartCount(): number {
  return readCart().reduce((sum, line) => sum + line.quantity, 0);
}

export type CartAddResult = { ok: true } | { ok: false; error: string };

export function addToCart(productId: string, quantity = 1): CartAddResult {
  const product = getProductById(productId);
  if (!product) return { ok: false, error: 'Product not found' };
  if (!product.active || product.stock <= 0) {
    return { ok: false, error: 'This product is out of stock' };
  }

  const cart = readCart();
  const existing = cart.find((line) => line.productId === productId);
  const currentQty = existing?.quantity ?? 0;
  const nextQty = Math.min(MAX_LINE_QTY, currentQty + Math.max(1, quantity));
  const available = getAvailableQuantity(productId, currentQty);

  if (available <= 0) {
    return { ok: false, error: 'Not enough stock available' };
  }

  const clampedQty = Math.min(nextQty, currentQty + available);

  if (existing) {
    existing.quantity = clampedQty;
  } else {
    cart.push({ productId, quantity: Math.min(Math.max(1, quantity), product.stock) });
  }

  writeCart(cart);
  return { ok: true };
}

export function removeFromCart(productId: string): void {
  writeCart(readCart().filter((line) => line.productId !== productId));
}

export type CartUpdateResult = { ok: true } | { ok: false; error: string };

export function updateCartItemQuantity(productId: string, quantity: number): CartUpdateResult {
  if (quantity <= 0) {
    removeFromCart(productId);
    return { ok: true };
  }

  const product = getProductById(productId);
  if (!product) return { ok: false, error: 'Product not found' };
  if (product.stock <= 0) {
    removeFromCart(productId);
    return { ok: false, error: 'This product is out of stock' };
  }

  const clamped = Math.min(MAX_LINE_QTY, Math.min(quantity, product.stock));
  const cart = readCart();
  const line = cart.find((item) => item.productId === productId);
  if (!line) return { ok: false, error: 'Item not in cart' };

  line.quantity = clamped;
  writeCart(cart);
  return { ok: true };
}

export function clearCart(): void {
  writeCart([]);
}

export function validateCartStock(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  for (const line of readCart()) {
    const product = getProductById(line.productId);
    if (!product) {
      errors.push('A product in your cart is no longer available');
      continue;
    }
    if (product.stock < line.quantity) {
      errors.push(`${product.name}: only ${product.stock} left in stock`);
    }
  }
  return { valid: errors.length === 0, errors };
}
