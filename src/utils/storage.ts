export const storageKeys = {
  cart: "status_store_cart",
  wishlist: "status_store_wishlist",
  recent: "status_store_recently_viewed",
  user: "status_store_mock_user",
};

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
