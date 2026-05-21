export const MOCK_STORAGE_KEYS = {
  stock: 'status_mock_stock_v1',
  cart: 'status_mock_cart_v1',
  orders: 'status_mock_orders_v1',
  productOverrides: 'status_mock_product_overrides_v1',
  adminSession: 'status_mock_admin_session_v1',
} as const;

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeKey(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}

export function dispatchMockEvent(
  name: 'cartUpdated' | 'stockUpdated' | 'ordersUpdated' | 'catalogUpdated',
): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(name));
}
