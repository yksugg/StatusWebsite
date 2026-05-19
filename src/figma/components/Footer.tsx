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
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder:text-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-cyan)]"
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
              <p>Unit 1, Whitehall 26 Business Park,</p>
              <p>Heathfield Lane, Birkenshaw,</p>
              <p>BD11 2HW</p>
              <p className="mt-2">Customer Service: 01274 852200</p>
              <p>Email: sales@statusinternationaluk.co.uk</p>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/status-international-uk-ltd/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-200 rounded-full hover:bg-[var(--brand-deep)] hover:text-white transition-colors">
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
          <p className="mt-2">Trading for over 30 years | Quality tested products | Based in Birkenshaw, West Yorkshire</p>
        </div>
      </div>
    </footer>
  );
}
