import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import NewsletterSignup from "./NewsletterSignup";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-newsletter">
        <NewsletterSignup compact />
      </div>
      <div className="footer-grid">
        <div>
          <h2>Status International UK</h2>
          <p>
            A draft direct-to-consumer store for trusted lighting and electrical essentials.
            Real brand imagery, product data, policies, and fulfilment details can be connected
            in the next phase.
          </p>
          <div className="social-row" aria-label="Social links">
            <a href="#" aria-label="Instagram">
              <Instagram size={19} />
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook size={19} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin size={19} />
            </a>
            <a href="mailto:support@example.com" aria-label="Email">
              <Mail size={19} />
            </a>
          </div>
        </div>
        <div>
          <h3>Shop</h3>
          <Link to="/shop">All products</Link>
          <Link to="/shop?category=Light%20Bulbs">Light bulbs</Link>
          <Link to="/shop?category=Power%20Strips">Power strips</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <div>
          <h3>Customer Service</h3>
          <Link to="/contact">Contact support</Link>
          <a href="#">Delivery information</a>
          <a href="#">Returns policy</a>
          <a href="#">Warranty support</a>
        </div>
        <div>
          <h3>Company</h3>
          <Link to="/about">About Status</Link>
          <a href="#">Privacy policy</a>
          <a href="#">Terms and conditions</a>
          <a href="#">Modern slavery statement</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 Status International UK. Draft ecommerce prototype.</span>
        <span>Catalogue, checkout, hosting, and fulfilment integrations pending.</span>
      </div>
    </footer>
  );
}
