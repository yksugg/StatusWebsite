export type StockStatus = "In stock" | "Low stock" | "Pre-order" | "Out of stock";

export type Product = {
  id: string;
  sku: string;
  slug: string;
  title: string;
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
  stockStatus: StockStatus;
  recommended: boolean;
  bestSeller: boolean;
  amazonFavourite: boolean;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type StoredUser = {
  name: string;
  email: string;
};

export type CategoryGroup = {
  title: string;
  items: string[];
};
