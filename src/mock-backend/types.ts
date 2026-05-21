export type StockLevel = 'in-stock' | 'low-stock' | 'out-of-stock';

/** Catalogue row used by the mock product service (B2C, UK). */
export type MockCatalogProduct = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  subcategory: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  badges: string[];
  images: string[];
  specifications: Record<string, string>;
  features: string[];
  recommended: boolean;
  bestSeller: boolean;
};

export type MockProduct = MockCatalogProduct & {
  stock: number;
  active: boolean;
  stockStatus: StockLevel;
};

export type CartLine = {
  productId: string;
  quantity: number;
};

export type GuestAddress = {
  fullName: string;
  email: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  county?: string;
  postcode: string;
  country: 'United Kingdom';
};

export type GuestCheckoutInput = GuestAddress;

export type OrderLine = {
  productId: string;
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type MockOrderStatus =
  | 'mock_received'
  | 'processing'
  | 'dispatched'
  | 'cancelled';

/** Partial product fields editable in the mock admin panel. */
export type ProductOverride = {
  name?: string;
  sku?: string;
  category?: string;
  subcategory?: string;
  price?: number;
  shortDescription?: string;
  longDescription?: string;
  imageUrl?: string;
  active?: boolean;
};

export type MockOrder = {
  id: string;
  orderNumber: string;
  createdAt: string;
  guest: GuestCheckoutInput;
  items: OrderLine[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingMethod: string;
  status: MockOrderStatus;
};

export type CheckoutResult =
  | { ok: true; order: MockOrder }
  | { ok: false; error: string };
