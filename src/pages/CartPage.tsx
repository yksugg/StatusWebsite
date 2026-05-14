import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../data/catalog";
import { useStore } from "../context/StoreContext";

export default function CartPage() {
  const { cartProducts, cartSubtotal, updateQuantity, removeFromCart } = useStore();
  const delivery = cartSubtotal > 0 ? 0 : 0;
  const total = cartSubtotal + delivery;

  return (
    <>
      <section className="page-hero compact-hero">
        <div>
          <p className="eyebrow">Cart / Saved Basket</p>
          <h1>Your saved Status basket.</h1>
          <p>Basket state persists in localStorage for the prototype. Checkout and payment are placeholders.</p>
        </div>
      </section>

      <section className="cart-page-layout">
        <div className="cart-list">
          {cartProducts.length ? (
            cartProducts.map(({ product, quantity }) => (
              <article className="cart-line" key={product.id}>
                <img src={product.images[0]} alt="" />
                <div className="cart-line-info">
                  <p className="product-category">{product.category}</p>
                  <h2>{product.title}</h2>
                  <span>SKU: {product.sku}</span>
                </div>
                <label className="cart-qty">
                  <span>Quantity</span>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) => updateQuantity(product.id, Number(event.target.value))}
                  />
                </label>
                <strong>{formatPrice(product.price * quantity)}</strong>
                <button type="button" className="remove-button" onClick={() => removeFromCart(product.id)}>
                  <Trash2 size={18} aria-hidden="true" />
                  Remove
                </button>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h2>Your basket is empty.</h2>
              <p>Browse the shop and add everyday lighting or electrical essentials.</p>
              <Link className="button primary" to="/shop">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        <aside className="order-summary">
          <h2>Order summary</h2>
          <div>
            <span>Subtotal</span>
            <strong>{formatPrice(cartSubtotal)}</strong>
          </div>
          <div>
            <span>Delivery</span>
            <strong>{cartSubtotal ? "Placeholder" : formatPrice(0)}</strong>
          </div>
          <label>
            <span>Discount code</span>
            <input placeholder="Enter code" />
          </label>
          <div className="summary-total">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <button type="button" className="button dark wide">
            Checkout Placeholder
          </button>
          <Link className="button secondary wide" to="/shop">
            Continue Shopping
          </Link>
          <p>Payment, tax, shipping, and fulfilment rules will be handled by the ecommerce backend.</p>
        </aside>
      </section>
    </>
  );
}
