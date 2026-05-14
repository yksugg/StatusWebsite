import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductById, products } from "../data/catalog";
import type { CartItem, Product, StoredUser } from "../types";
import { readStorage, storageKeys, writeStorage } from "../utils/storage";

type StoreContextValue = {
  cart: CartItem[];
  cartProducts: Array<{ product: Product; quantity: number }>;
  wishlist: string[];
  wishlistProducts: Product[];
  recent: string[];
  recentProducts: Product[];
  user: StoredUser | null;
  isCartOpen: boolean;
  cartCount: number;
  cartSubtotal: number;
  lastAddedProduct: Product | null;
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  moveWishlistToCart: (productId: string) => void;
  addRecent: (productId: string) => void;
  setCartOpen: (open: boolean) => void;
  login: (user: StoredUser) => void;
  logout: () => void;
};

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => readStorage(storageKeys.cart, []));
  const [wishlist, setWishlist] = useState<string[]>(() => readStorage(storageKeys.wishlist, []));
  const [recent, setRecent] = useState<string[]>(() => readStorage(storageKeys.recent, []));
  const [user, setUser] = useState<StoredUser | null>(() => readStorage(storageKeys.user, null));
  const [isCartOpen, setCartOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);

  useEffect(() => writeStorage(storageKeys.cart, cart), [cart]);
  useEffect(() => writeStorage(storageKeys.wishlist, wishlist), [wishlist]);
  useEffect(() => writeStorage(storageKeys.recent, recent), [recent]);
  useEffect(() => writeStorage(storageKeys.user, user), [user]);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, { productId, quantity }];
    });

    const product = getProductById(productId) ?? null;
    setLastAddedProduct(product);
    setCartOpen(true);
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart((current) =>
      quantity <= 0
        ? current.filter((item) => item.productId !== productId)
        : current.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((item) => item !== productId)
        : [...current, productId],
    );
  }, []);

  const moveWishlistToCart = useCallback(
    (productId: string) => {
      addToCart(productId);
      setWishlist((current) => current.filter((item) => item !== productId));
    },
    [addToCart],
  );

  const addRecent = useCallback((productId: string) => {
    setRecent((current) => [productId, ...current.filter((item) => item !== productId)].slice(0, 12));
  }, []);

  const cartProducts = useMemo(
    () =>
      cart
        .map((item) => {
          const product = getProductById(item.productId);
          return product ? { product, quantity: item.quantity } : null;
        })
        .filter((item): item is { product: Product; quantity: number } => Boolean(item)),
    [cart],
  );

  const wishlistProducts = useMemo(
    () => wishlist.map(getProductById).filter((product): product is Product => Boolean(product)),
    [wishlist],
  );

  const recentProducts = useMemo(
    () => recent.map(getProductById).filter((product): product is Product => Boolean(product)),
    [recent],
  );

  const cartSubtotal = useMemo(
    () => cartProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartProducts],
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      cart,
      cartProducts,
      wishlist,
      wishlistProducts,
      recent,
      recentProducts: recentProducts.length ? recentProducts : products.slice(0, 4),
      user,
      isCartOpen,
      cartCount,
      cartSubtotal,
      lastAddedProduct,
      addToCart,
      updateQuantity,
      removeFromCart,
      toggleWishlist,
      moveWishlistToCart,
      addRecent,
      setCartOpen,
      login: setUser,
      logout: () => setUser(null),
    }),
    [
      addRecent,
      addToCart,
      cart,
      cartCount,
      cartProducts,
      cartSubtotal,
      isCartOpen,
      lastAddedProduct,
      moveWishlistToCart,
      recent,
      recentProducts,
      removeFromCart,
      toggleWishlist,
      updateQuantity,
      user,
      wishlist,
      wishlistProducts,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return context;
}
