import { Link } from "react-router-dom";
import AccountForms from "../components/AccountForms";
import ProductGrid from "../components/ProductGrid";
import { formatPrice, products } from "../data/catalog";
import { useStore } from "../context/StoreContext";

export default function AccountPage() {
  const { user, logout, recentProducts, wishlistProducts, cartProducts, cartSubtotal } = useStore();
  const recommendations = products.filter((product) => product.recommended).slice(0, 4);

  if (!user) {
    return (
      <>
        <section className="page-hero compact-hero">
          <div>
            <p className="eyebrow">Sign up / Login</p>
            <h1>Create an account for saved baskets, liked products, and recommendations.</h1>
            <p>
              Prototype account state is stored in localStorage only. Real authentication, account
              management, and customer APIs can be connected later.
            </p>
          </div>
        </section>
        <section className="section padded">
          <AccountForms />
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-hero compact-hero account-hero">
        <div>
          <p className="eyebrow">Account Dashboard</p>
          <h1>Welcome back, {user.name}.</h1>
          <p>{user.email}</p>
        </div>
        <button type="button" className="button secondary" onClick={logout}>
          Log Out
        </button>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <p className="eyebrow">Saved Basket</p>
          <h2>{cartProducts.length} items</h2>
          <p>Total placeholder: {formatPrice(cartSubtotal)}</p>
          <Link className="button secondary" to="/cart">
            View Basket
          </Link>
        </article>
        <article className="dashboard-card">
          <p className="eyebrow">Wishlist</p>
          <h2>{wishlistProducts.length} liked items</h2>
          <p>Keep track of restock products and future purchases.</p>
          <Link className="button secondary" to="/wishlist">
            View Wishlist
          </Link>
        </article>
        <article className="dashboard-card">
          <p className="eyebrow">Account Details</p>
          <h2>Prototype profile</h2>
          <p>Address book, preferences, and order history will connect to customer APIs later.</p>
        </article>
      </section>

      <section className="section padded">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recently Viewed</p>
            <h2>Continue browsing</h2>
          </div>
        </div>
        <ProductGrid products={recentProducts.slice(0, 4)} compact />
      </section>

      <section className="section soft-band">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Personal recommendations</p>
            <h2>Suggested essentials</h2>
          </div>
        </div>
        <ProductGrid products={recommendations} compact />
      </section>
    </>
  );
}
