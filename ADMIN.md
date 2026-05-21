# Mock admin panel

Local-only admin UI for testing ecommerce management. **Not production-ready authentication.**

## Access

With the dev server running (`npm run dev`), open:

| Environment | URL |
|-------------|-----|
| Local dev (default base) | `http://127.0.0.1:5173/StatusWebsite/admin` |
| Path only | `/admin` (or any path ending in `/admin`) |

The storefront stays at the Vite base URL (e.g. `/StatusWebsite/`). Routing uses a simple `pathname` check in `src/App.tsx` — no React Router.

## Mock login

| Field | Value |
|-------|--------|
| Username | `admin` |
| Password | `password1` |

Session is stored in **localStorage** under `status_mock_admin_session_v1`. Use **Logout** to clear it.

> Warning: Credentials are hard-coded in `src/mock-backend/admin-auth.ts` for prototyping only. Do not use this pattern in production.

## Admin sections

1. **Products** — Edit name, SKU, category, price, descriptions, image URL/path, active flag. Preview image when URL is valid. Saves to product overrides.
2. **Orders** — View guest checkout orders; change status (`mock_received`, `processing`, `dispatched`, `cancelled`).
3. **Stock** — View/adjust quantities; low/out-of-stock indicators; reset stock to seed.
4. **Settings / Dev tools** — Reset mock backend, stock, orders, cart, or product edits only.

## localStorage keys

| Key | Purpose |
|-----|---------|
| `status_mock_admin_session_v1` | Admin login session |
| `status_mock_product_overrides_v1` | Admin product edits |
| `status_mock_stock_v1` | Stock levels |
| `status_mock_cart_v1` | Storefront cart |
| `status_mock_orders_v1` | Placed orders |

See also [MOCK_BACKEND.md](./MOCK_BACKEND.md) for the storefront mock commerce layer.

## Reset data

From **Settings / Dev tools** in the admin panel, or in the browser console (dev):

```js
resetMockBackend()  // cart + orders + stock seed + product overrides
resetStock()
clearMockOrders()
```

`resetMockBackend()` does **not** log you out of admin.

## Code layout

```
src/admin/
  AdminApp.tsx           Auth gate + dashboard shell
  AdminLogin.tsx         Mock login form
  AdminDashboard.tsx     Tab navigation
  sections/
    ProductsAdmin.tsx
    OrdersAdmin.tsx
    StockAdmin.tsx
    SettingsAdmin.tsx

src/mock-backend/
  admin-auth.ts          Mock session + credentials
  product-overrides.ts   Persisted catalogue edits
```

Replacing with a real backend later: keep these UI sections and swap the mock-backend calls for API clients.
