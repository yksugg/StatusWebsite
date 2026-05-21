export * from './types';
export * from './shipping';
export * from './storage';
export * from './products';
export * from './cart';
export * from './orders';
export * from './checkout';
export * from './admin-auth';
export * from './product-overrides';

import { clearCart } from './cart';
import { clearMockOrders } from './orders';
import { clearProductOverrides } from './product-overrides';
import { resetStockToSeed } from './products';
import { MOCK_STORAGE_KEYS } from './storage';

/** Clear cart, orders, stock, and admin product edits (restores seed stock). */
export function resetMockBackend(): void {
  clearCart();
  clearMockOrders();
  resetStockToSeed();
  clearProductOverrides();
}

/** Restore catalogue stock levels from seed data. */
export function resetStock(): void {
  resetStockToSeed();
}

export { clearMockOrders };

/** Expose helpers on window in development for quick resets in the console. */
export function attachDevHelpers(): void {
  if (typeof window === 'undefined' || !import.meta.env.DEV) return;
  (window as Window & {
    resetMockBackend?: () => void;
    resetStock?: () => void;
    clearMockOrders?: () => void;
    statusMockKeys?: typeof MOCK_STORAGE_KEYS;
  }).resetMockBackend = resetMockBackend;
  (window as Window & { resetStock?: () => void }).resetStock = resetStock;
  (window as Window & { clearMockOrders?: () => void }).clearMockOrders = clearMockOrders;
  (window as Window & { statusMockKeys?: typeof MOCK_STORAGE_KEYS }).statusMockKeys =
    MOCK_STORAGE_KEYS;
}

attachDevHelpers();
