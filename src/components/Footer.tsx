import { Mail } from 'lucide-react';
import { useState } from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-50 border-t mt-16">
      {/* Newsletter Section */}
      <div className="bg-[var(--brand-deep)] text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl mb-2">Join the Status mailing list</h3>
            <p className="mb-6 text-gray-200">Get new launches, offers, and home essentials delivered to your inbox</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--brand-cyan)]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[var(--brand-cyan)] text-white rounded-lg hover:bg-[var(--brand-blue)] transition-colors"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="mt-3 text-[var(--brand-cyan)]">✓ Thanks for subscribing!</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="font-semibold mb-4 text-[var(--brand-deep)]">About Status</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[var(--brand-deep)]">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[var(--brand-deep)]">
                  Quality & Testing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[var(--brand-deep)]">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[var(--brand-deep)]">
                  Press & Media
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4 text-[var(--brand-deep)]">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[var(--brand-deep)]">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[var(--brand-deep)]">
                  Delivery Information
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[var(--brand-deep)]">
                  Returns & Refunds
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[var(--brand-deep)]">
                  Product Support
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[var(--brand-deep)]">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4 text-[var(--brand-deep)]">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[var(--brand-deep)]">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[var(--brand-deep)]">
                  Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[var(--brand-deep)]">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-[var(--brand-deep)]">
                  Clearance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('wishlist')} className="hover:text-[var(--brand-deep)]">
                  Wishlist
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="font-semibold mb-4 text-[var(--brand-deep)]">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-[var(--brand-deep)]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--brand-deep)]">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--brand-deep)]">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--brand-deep)]">
                  Accessibility
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--brand-deep)]">
                  Modern Slavery Statement
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-gray-600">
              <p className="mb-2">Status International UK</p>
              <p>West Yorkshire, United Kingdom</p>
              <p className="mt-2">Customer Service: 0800 123 4567</p>
              <p>Email: support@status-uk.com</p>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-gray-200 rounded-full hover:bg-[var(--brand-deep)] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-gray-200 rounded-full hover:bg-[var(--brand-deep)] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-gray-200 rounded-full hover:bg-[var(--brand-deep)] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-gray-200 rounded-full hover:bg-[var(--brand-deep)] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-wrap justify-center gap-8 items-center text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span>UK Stock</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Fast Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span>Expert Support</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          <p>&copy; 2026 Status International UK. All rights reserved.</p>
          <p className="mt-2">Trading for over 30 years | Quality tested products | Based in West Yorkshire</p>
        </div>
      </div>
    </footer>
  );
}