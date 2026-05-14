import { Heart, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { formatPrice } from "../data/catalog";
import type { Product } from "../types";
import { useStore } from "../context/StoreContext";

type BuyBoxProps = {
  product: Product;
};

export default function BuyBox({ product }: BuyBoxProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const liked = wishlist.includes(product.id);

  return (
    <aside className="buy-box" aria-label="Buy product">
      <div className="buy-price-row">
        <strong>{formatPrice(product.price)}</strong>
        {product.compareAtPrice ? <del>{formatPrice(product.compareAtPrice)}</del> : null}
      </div>
      <p className={`stock-pill ${product.stockStatus === "In stock" ? "in-stock" : ""}`}>
        {product.stockStatus}
      </p>

      <label className="quantity-control">
        <span>Quantity</span>
        <div>
          <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
            <Minus size={16} />
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
          />
          <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">
            <Plus size={16} />
          </button>
        </div>
      </label>

      <button type="button" className="button primary wide" onClick={() => addToCart(product.id, quantity)}>
        <ShoppingBag size={18} aria-hidden="true" />
        Add to Cart
      </button>
      <button type="button" className="button dark wide" onClick={() => addToCart(product.id, quantity)}>
        Buy Now
      </button>
      <button type="button" className="button secondary wide" onClick={() => toggleWishlist(product.id)}>
        <Heart size={18} fill={liked ? "currentColor" : "none"} aria-hidden="true" />
        {liked ? "Saved to Wishlist" : "Add to Wishlist"}
      </button>

      <div className="buy-reassurance">
        <p>
          <Truck size={17} aria-hidden="true" /> Delivery placeholder ready for fulfilment integration.
        </p>
        <p>
          <ShieldCheck size={17} aria-hidden="true" /> Secure checkout note. Payment provider connects later.
        </p>
      </div>
    </aside>
  );
}
