import { ArrowRight, ShoppingBag, X } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/catalog";
import { useStore } from "../context/StoreContext";

export default function CartDrawer() {
  const {
    isCartOpen,
    setCartOpen,
    cartProducts,
    cartSubtotal,
    lastAddedProduct,
    updateQuantity,
    removeFromCart,
  } = useStore();

  return (
    <div className={`cart-drawer-shell ${isCartOpen ? "is-open" : ""}`} aria-hidden={!isCartOpen}>
      <button className="cart-drawer-backdrop" type="button" onClick={() => setCartOpen(false)} aria-label="Close cart" />
      <aside className="cart-drawer" aria-label="Cart drawer">
        <div className="drawer-header">
          <div>
            <p className="eyebrow">{lastAddedProduct ? "Added to basket" : "Your basket"}</p>
            <h2>Saved Basket</h2>
          </div>
          <button type="button" aria-label="Close cart drawer" onClick={() => setCartOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {lastAddedProduct ? (
          <div className="added-confirmation">
            <img src={lastAddedProduct.images[0]} alt="" />
            <p>
              <strong>{lastAddedProduct.title}</strong>
              <span>Ready in your basket.</span>
            </p>
          </div>
        ) : null}

        {cartProducts.length ? (
          <div className="drawer-items">
            {cartProducts.map(({ product, quantity }) => (
              <div className="drawer-item" key={product.id}>
                <img src={product.images[0]} alt="" />
                <div>
                  <strong>{product.title}</strong>
                  <small>{product.sku}</small>
                  <div className="mini-quantity">
                    <button type="button" onClick={() => updateQuantity(product.id, quantity - 1)} aria-label={`Reduce ${product.title}`}>
                      -
                    </button>
                    <span>{quantity}</span>
                    <button type="button" onClick={() => updateQuantity(product.id, quantity + 1)} aria-label={`Increase ${product.title}`}>
                      +
                    </button>
                  </div>
                </div>
                <div className="drawer-price">
                  <span>{formatPrice(product.price * quantity)}</span>
                  <button type="button" onClick={() => removeFromCart(product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-drawer">
            <ShoppingBag size={36} aria-hidden="true" />
            <h3>Your basket is empty</h3>
            <p>Add products from the shop to keep a saved basket in this prototype.</p>
          </div>
        )}

        <div className="drawer-summary">
          <div>
            <span>Subtotal</span>
            <strong>{formatPrice(cartSubtotal)}</strong>
          </div>
          <small>Delivery, discounts, and checkout rules are placeholders for later integration.</small>
          <Link className="button primary wide" to="/cart" onClick={() => setCartOpen(false)}>
            View Basket <ArrowRight size={17} />
          </Link>
          <Link className="button secondary wide" to="/shop" onClick={() => setCartOpen(false)}>
            Continue Shopping
          </Link>
        </div>
      </aside>
    </div>
  );
}
