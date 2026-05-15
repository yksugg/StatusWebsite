import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { getCartCount, isLoggedIn, getCurrentUser } from '../utils/storage';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    updateCartCount();
    updateUserState();
    
    window.addEventListener('cartUpdated', updateCartCount);
    window.addEventListener('userUpdated', updateUserState);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('userUpdated', updateUserState);
    };
  }, []);

  const updateCartCount = () => {
    setCartCount(getCartCount());
  };

  const updateUserState = () => {
    setLoggedIn(isLoggedIn());
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('shop');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top utility bar */}
      <div className="bg-[var(--brand-deep)] text-white text-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center md:justify-between py-2 gap-4">
            <div className="flex flex-wrap items-center gap-4 justify-center">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free UK delivery over £50
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Trusted UK supplier
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure checkout
              </span>
            </div>
            <div className="hidden md:block">
              <span>Customer support: 0800 123 4567</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="bg-[var(--brand-deep)] text-white px-4 py-2 rounded">
                <span className="font-bold text-xl">STATUS</span>
              </div>
              <div className="hidden lg:block">
                <div className="text-sm text-gray-600">International UK</div>
              </div>
            </button>

            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bulbs, batteries, extension leads..."
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-cyan)] focus:border-transparent"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-[var(--brand-deep)]">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Desktop Navigation Icons */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => onNavigate('login')}
                className="flex flex-col items-center gap-1 hover:text-[var(--brand-deep)] transition-colors"
              >
                <User className="w-6 h-6" />
                <span className="text-xs">{loggedIn ? 'Account' : 'Login'}</span>
              </button>
              <button
                onClick={() => onNavigate('wishlist')}
                className="flex flex-col items-center gap-1 hover:text-[var(--brand-deep)] transition-colors relative"
              >
                <Heart className="w-6 h-6" />
                <span className="text-xs">Wishlist</span>
              </button>
              <button
                onClick={() => onNavigate('cart')}
                className="flex flex-col items-center gap-1 hover:text-[var(--brand-deep)] transition-colors relative"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="text-xs">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--brand-cyan)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Main Menu */}
          <nav className="hidden md:flex items-center gap-8 pb-4">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-[var(--brand-deep)] transition-colors ${currentPage === 'home' ? 'text-[var(--brand-deep)]' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className={`hover:text-[var(--brand-deep)] transition-colors ${currentPage === 'shop' ? 'text-[var(--brand-deep)]' : ''}`}
            >
              Shop
            </button>
            <div className="relative">
              <button
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
                className="flex items-center gap-1 hover:text-[var(--brand-deep)] transition-colors"
              >
                Categories
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {/* Mega Menu */}
              {isMegaMenuOpen && (
                <div
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                  className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-6 w-[600px] grid grid-cols-3 gap-6 border"
                >
                  <div>
                    <h3 className="font-semibold mb-3 text-[var(--brand-deep)]">Lighting</h3>
                    <ul className="space-y-2 text-sm">
                      <li><button onClick={() => onNavigate('shop')} className="hover:text-[var(--brand-cyan)]">LED Bulbs</button></li>
                      <li><button onClick={() => onNavigate('shop')} className="hover:text-[var(--brand-cyan)]">Smart Lighting</button></li>
                      <li><button onClick={() => onNavigate('shop')} className="hover:text-[var(--brand-cyan)]">Decorative Lighting</button></li>
                      <li><button onClick={() => onNavigate('shop')} className="hover:text-[var(--brand-cyan)]">Desk Lamps</button></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-[var(--brand-deep)]">Electrical</h3>
                    <ul className="space-y-2 text-sm">
                      <li><button onClick={() => onNavigate('shop')} className="hover:text-[var(--brand-cyan)]">Extension Leads</button></li>
                      <li><button onClick={() => onNavigate('shop')} className="hover:text-[var(--brand-cyan)]">Plugs & Adaptors</button></li>
                      <li><button onClick={() => onNavigate('shop')} className="hover:text-[var(--brand-cyan)]">Cable Reels</button></li>
                      <li><button onClick={() => onNavigate('shop')} className="hover:text-[var(--brand-cyan)]">Timers & Controls</button></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-[var(--brand-deep)]">Power & More</h3>
                    <ul className="space-y-2 text-sm">
                      <li><button onClick={() => onNavigate('shop')} className="hover:text-[var(--brand-cyan)]">Batteries</button></li>
                      <li><button onClick={() => onNavigate('shop')} className="hover:text-[var(--brand-cyan)]">Torches</button></li>
                      <li><button onClick={() => onNavigate('shop')} className="hover:text-[var(--brand-cyan)]">Work Lights</button></li>
                      <li><button onClick={() => onNavigate('shop')} className="hover:text-[var(--brand-cyan)]">Outdoor & Garden</button></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => onNavigate('about')}
              className={`hover:text-[var(--brand-deep)] transition-colors ${currentPage === 'about' ? 'text-[var(--brand-deep)]' : ''}`}
            >
              About
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`hover:text-[var(--brand-deep)] transition-colors ${currentPage === 'contact' ? 'text-[var(--brand-deep)]' : ''}`}
            >
              Contact
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-cyan)]"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Mobile Nav Links */}
            <nav className="space-y-3">
              <button onClick={() => { onNavigate('home'); setIsMenuOpen(false); }} className="block w-full text-left py-2 hover:text-[var(--brand-deep)]">
                Home
              </button>
              <button onClick={() => { onNavigate('shop'); setIsMenuOpen(false); }} className="block w-full text-left py-2 hover:text-[var(--brand-deep)]">
                Shop
              </button>
              <button onClick={() => { onNavigate('about'); setIsMenuOpen(false); }} className="block w-full text-left py-2 hover:text-[var(--brand-deep)]">
                About
              </button>
              <button onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }} className="block w-full text-left py-2 hover:text-[var(--brand-deep)]">
                Contact
              </button>
              <div className="border-t pt-3">
                <button onClick={() => { onNavigate('login'); setIsMenuOpen(false); }} className="flex items-center gap-2 w-full py-2 hover:text-[var(--brand-deep)]">
                  <User className="w-5 h-5" /> {loggedIn ? 'My Account' : 'Login / Sign Up'}
                </button>
                <button onClick={() => { onNavigate('wishlist'); setIsMenuOpen(false); }} className="flex items-center gap-2 w-full py-2 hover:text-[var(--brand-deep)]">
                  <Heart className="w-5 h-5" /> Wishlist
                </button>
                <button onClick={() => { onNavigate('cart'); setIsMenuOpen(false); }} className="flex items-center gap-2 w-full py-2 hover:text-[var(--brand-deep)]">
                  <ShoppingCart className="w-5 h-5" /> Cart {cartCount > 0 && `(${cartCount})`}
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
