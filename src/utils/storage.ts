// Local storage utility functions for cart, wishlist, and user management

export interface CartItem {
    productId: string;
    quantity: number;
  }
  
  export interface User {
    email: string;
    name: string;
  }
  
  // Cart functions
  export function getCart(): CartItem[] {
    try {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    } catch {
      return [];
    }
  }
  
  export function getCartCount(): number {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  }
  
  export function addToCart(productId: string, quantity: number = 1): void {
    const cart = getCart();
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  }
  
  export function removeFromCart(productId: string): void {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  }
  
  export function updateCartItemQuantity(productId: string, quantity: number): void {
    const cart = getCart();
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));
      }
    }
  }
  
  export function clearCart(): void {
    localStorage.setItem('cart', JSON.stringify([]));
    window.dispatchEvent(new Event('cartUpdated'));
  }
  
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
    
    // Remove if already exists
    recentlyViewed = recentlyViewed.filter(id => id !== productId);
    
    // Add to beginning
    recentlyViewed.unshift(productId);
    
    // Keep only last 10
    recentlyViewed = recentlyViewed.slice(0, 10);
    
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }
  
  // User authentication functions
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
  