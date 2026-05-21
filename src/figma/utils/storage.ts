// Local storage for wishlist, recently viewed, and legacy user UI.
// Cart persistence is handled by src/mock-backend/cart.ts (B2C guest checkout).

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface User {
  email: string;
  name: string;
}

export {
  addToCart,
  clearCart,
  getCart,
  getCartCount,
  removeFromCart,
  updateCartItemQuantity,
} from '../../mock-backend/cart';

// Wishlist functions
export function getWishlist(): string[] {
  try {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  } catch {
    return [];
  }
}

export function addToWishlist(productId: string): void {
  const wishlist = getWishlist();
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
  }
}

export function removeFromWishlist(productId: string): void {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter(id => id !== productId);
  localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  window.dispatchEvent(new Event('wishlistUpdated'));
}

export function isInWishlist(productId: string): boolean {
  const wishlist = getWishlist();
  return wishlist.includes(productId);
}

// Recently viewed functions
export function getRecentlyViewed(): string[] {
  try {
    const recentlyViewed = localStorage.getItem('recentlyViewed');
    return recentlyViewed ? JSON.parse(recentlyViewed) : [];
  } catch {
    return [];
  }
}

export function addToRecentlyViewed(productId: string): void {
  let recentlyViewed = getRecentlyViewed();
  
  recentlyViewed = recentlyViewed.filter(id => id !== productId);
  recentlyViewed.unshift(productId);
  recentlyViewed = recentlyViewed.slice(0, 10);
  
  localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
}

// Legacy mock login UI (not used for checkout — guest only)
export function getCurrentUser(): User | null {
  try {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}

export function login(email: string, name: string): void {
  const user: User = { email, name };
  localStorage.setItem('currentUser', JSON.stringify(user));
  window.dispatchEvent(new Event('userUpdated'));
}

export function logout(): void {
  localStorage.removeItem('currentUser');
  window.dispatchEvent(new Event('userUpdated'));
}
