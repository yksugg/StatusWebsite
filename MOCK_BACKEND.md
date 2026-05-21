# Mock backend (Status ecommerce prototype)

This project uses a **browser-only mock commerce layer** for B2C guest checkout. It is designed to be swapped for a real API later without rewriting the whole UI.

## Rules enforced

- B2C only  
- UK shipping only (`src/mock-backend/shipping.ts`)  
- Guest checkout only (no auth at checkout)  
- No real payment providers  
- Manual stock levels, persisted in `localStorage`  
- Stock decreases when a mock order is placed  
- Out-of-stock products cannot be added to the cart  

## Folder layout

```
src/mock-backend/
  types.ts          Shared types (products, cart, orders, guest address)
  seed-catalog.ts   Static product seed data (24 demo SKUs)
  storage.ts        localStorage keys and JSON helpers
  shipping.ts       UK flat rate + free shipping threshold
  products.ts       Product service + stock read/write
  cart.ts           Cart add / remove / update with stock caps
  checkout.ts       Guest validation, fake order creation
  orders.ts         Order persistence + status updates
  product-overrides.ts  Admin catalogue edits (localStorage)
  admin-auth.ts     Mock admin session (not production auth)
  figma-adapter.ts  Maps mock rows → figma `Product` UI type
  index.ts          Public exports + dev reset helpers

src/admin/          Mock admin UI at `/admin`

src/hooks/
  useProducts.ts    Live catalogue (refreshes on stock changes)
  useCart.ts        Cart lines, totals, UK shipping
  useCheckout.ts    Guest form state + place order
```

## Mock admin panel

See **[ADMIN.md](./ADMIN.md)** for `/admin` access, login (`admin` / `password1`), product/stock/order management, and dev resets.

## Persistence (localStorage)

| Key | Purpose |
|-----|---------|
| `status_mock_stock_v1` | Per-product stock quantities |
| `status_mock_cart_v1` | Cart line items |
| `status_mock_orders_v1` | Placed mock orders (newest first) |
| `status_mock_product_overrides_v1` | Admin-edited product fields |
| `status_mock_admin_session_v1` | Mock admin login session |

Wishlist, recently viewed, and the legacy “login” UI still use their own keys under `src/figma/utils/storage.ts` and are **not** part of checkout.

## Shipping config

Edit `UK_SHIPPING_CONFIG` in `src/mock-backend/shipping.ts`:

- `standardRate` — default £4.99  
- `freeShippingThreshold` — free UK delivery from £50 subtotal  

## Stock seed

Default stock is set in `SEED_STOCK` inside `src/mock-backend/seed-catalog.ts` (most products: 25, product `5`: 4 low stock, product `20`: 0 out of stock).

## Frontend wiring

- Entry: `src/App.tsx` imports `./mock-backend` (registers dev helpers).  
- Main UI: `src/figma/main.tsx` uses `useProducts`, `useCart`, and `useCheckout`.  
- `src/figma/data/products.ts` re-exports the figma `Product` type and thin helpers over the mock service.  
- Cart count in the header uses the same mock cart via `src/figma/utils/storage.ts` re-exports.

## Reset helpers

In the browser console (dev builds only), or import from `src/mock-backend`:

```ts
import { resetMockBackend, resetStock, clearMockOrders } from './mock-backend';

resetMockBackend();  // cart + orders + stock seed
resetStock();        // stock only
clearMockOrders();   // orders only
```

Dev mode also exposes `window.resetMockBackend()`, `window.resetStock()`, and `window.clearMockOrders()`.

## Replacing with a real backend

1. Implement API clients that return the same shapes as `MockProduct`, `CartLine`, and `MockOrder`.  
2. Replace function bodies in `products.ts`, `cart.ts`, `checkout.ts`, and `orders.ts` with `fetch` calls (or keep filenames and swap implementations).  
3. Keep `useProducts` / `useCart` / `useCheckout` as the UI boundary so `figma/main.tsx` changes stay minimal.  
4. Move seed data out of `seed-catalog.ts` once the API owns the catalogue.

## Build

```bash
npm run build
```
