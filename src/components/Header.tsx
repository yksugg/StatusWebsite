import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  ShieldCheck,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { categoryGroups } from "../data/catalog";
import { useStore } from "../context/StoreContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, wishlist, setCartOpen, user } = useStore();

  return (
    <header className="site-header">
      <div className="utility-bar" aria-label="Shopping assurances">
        <span>
          <Truck size={15} aria-hidden="true" /> Free UK delivery over {"\u00a3"}X
        </span>
        <span>Trusted UK supplier</span>
        <span>
          <ShieldCheck size={15} aria-hidden="true" /> Secure checkout
        </span>
        <span>Customer support</span>
      </div>

      <div className="main-header">
        <Link to="/" className="brand-mark" aria-label="Status International UK home">
          <img src="/placeholders/status-logo-placeholder.svg" alt="" />
          <span>
            Status
            <small>International UK</small>
          </span>
        </Link>

        <form className="site-search" role="search" action="/shop">
          <Search size={18} aria-hidden="true" />
          <label htmlFor="global-search" className="sr-only">
            Search products
          </label>
          <input
            id="global-search"
            name="q"
            type="search"
            placeholder="Search bulbs, batteries, extension leads..."
          />
        </form>

        <nav className={`primary-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <div className="mega-trigger">
            <button type="button" aria-expanded="false">
              Categories
            </button>
            <div className="mega-menu" aria-label="Product categories">
              {categoryGroups.map((group) => (
                <div key={group.title}>
                  <strong>{group.title}</strong>
                  {group.items.map((item) => (
                    <Link key={item} to={`/shop?category=${encodeURIComponent(item)}`}>
                      {item}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="header-actions">
          <Link to="/account" className="icon-link" aria-label="Account and login">
            <UserRound size={21} aria-hidden="true" />
            <span>{user ? "Account" : "Login"}</span>
          </Link>
          <Link to="/wishlist" className="icon-link has-count" aria-label="Wishlist">
            <Heart size={21} aria-hidden="true" />
            <span>{wishlist.length}</span>
          </Link>
          <button
            type="button"
            className="icon-link has-count"
            aria-label="Open cart"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={21} aria-hidden="true" />
            <span>{cartCount}</span>
          </button>
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
