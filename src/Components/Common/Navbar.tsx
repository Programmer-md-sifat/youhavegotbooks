import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MenuSvg,
  SearchSvg,
  UserSvg,
  FavouriteSvg,
  CartSvg,
} from './SvgIcons';
import { Logo } from './logo';
import { useCartWishlist } from '../../Context/CartWishlistContext';
import { categoriesData } from '../../Data/HomeData';
import { allBooksCatalog } from '../../Data/BooksData';
import { topBookCategoriesData } from '../HomeSections/TopBookCategoriesSection';
import { ChevronDown, ChevronRight, X, LogIn, CheckCircle2, Search } from 'lucide-react';

const CategoryGridIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
    <circle cx="4.5" cy="4.5" r="1.75" />
    <circle cx="10" cy="4.5" r="1.75" />
    <circle cx="15.5" cy="4.5" r="1.75" />
    <circle cx="4.5" cy="10" r="1.75" />
    <circle cx="10" cy="10" r="1.75" />
    <circle cx="15.5" cy="10" r="1.75" />
    <circle cx="4.5" cy="15.5" r="1.75" />
    <circle cx="10" cy="15.5" r="1.75" />
    <circle cx="15.5" cy="15.5" r="1.75" />
  </svg>
);

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, wishlistCount, cartTotal, setIsCartOpen } = useCartWishlist();

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isBooksMegaOpen, setIsBooksMegaOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const megaMenuTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Close mega menu on route change
  useEffect(() => {
    setIsBooksMegaOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const handleBooksMouseEnter = () => {
    if (megaMenuTimerRef.current) {
      clearTimeout(megaMenuTimerRef.current);
    }
    setIsBooksMegaOpen(true);
  };

  const handleBooksMouseLeave = () => {
    megaMenuTimerRef.current = setTimeout(() => {
      setIsBooksMegaOpen(false);
    }, 180);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target as Node)
      ) {
        setIsCategoriesOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter books for live search
  const filteredSearchBooks = searchTerm.trim()
    ? allBooksCatalog.filter(
        (b) =>
          b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.genre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearchFocused(false);
      navigate(`/books?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'BOOKS', path: '/books' },
    { name: 'E-BOOKS', path: '/books?format=E-Book' },
    { name: 'DEALS', path: '/books?filter=deals' },
    { name: 'GIFT & STATIONERY', path: '/store?category=Gift%20%26%20Stationery' },
    { name: 'STORE', path: '/store' },
    { name: 'BLOG', path: '/blog' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-40 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* Top Primary Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-22 gap-4 md:gap-8">
          {/* Brand Logo */}
          <Logo variant="light" imageClassName="h-8 sm:h-9 md:h-10 lg:h-11 max-h-[46px] w-auto object-contain flex-shrink-0" />

          {/* Center Categories & Search (Separated Components as in Reference Image) */}
          <div className="hidden md:flex flex-1 max-w-3xl items-center gap-3.5 mx-2 lg:mx-6">
            {/* 1. Standalone Orange Categories Pill Button */}
            <div className="relative flex-shrink-0" ref={categoriesRef}>
              <button
                type="button"
                id="categories-dropdown-btn"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="bg-[#F26522] hover:bg-[#E05312] text-white rounded-full px-5 h-11 flex items-center gap-2.5 text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shadow-xs active:scale-98"
              >
                <CategoryGridIcon className="w-4 h-4 text-white flex-shrink-0" />
                <span>Categories</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${
                    isCategoriesOpen ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2.5}
                />
              </button>

              {/* Categories Dropdown Panel */}
              {isCategoriesOpen && (
                <div className="absolute left-0 mt-2.5 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                    Explore By Genre
                  </div>
                  <div className="py-1 max-h-72 overflow-y-auto">
                    {categoriesData.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setIsCategoriesOpen(false);
                          navigate(`/books?genre=${encodeURIComponent(cat.name)}`);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-[#28303F] hover:bg-[#FFF7ED] hover:text-[#F26522] rounded-xl flex items-center justify-between transition-colors group cursor-pointer"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-gray-400 group-hover:text-[#F26522] bg-gray-50 group-hover:bg-[#FFEDD5] px-1.5 py-0.5 rounded-full font-semibold">
                          {cat.itemCount}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-gray-50 px-2">
                    <Link
                      to="/books"
                      onClick={() => setIsCategoriesOpen(false)}
                      className="block w-full py-1.5 text-center text-xs font-bold text-[#F26522] hover:underline"
                    >
                      View All Catalogs &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Standalone Search Bar Pill with Magnifying Glass on the Right */}
            <div ref={searchRef} className="relative flex-1">
              <form
                onSubmit={handleSearchSubmit}
                className="w-full flex items-center bg-[#F3F4F6] hover:bg-[#EBEEF2] focus-within:bg-white focus-within:border-gray-200 border border-transparent rounded-full h-11 px-5 transition-all focus-within:ring-2 focus-within:ring-[#F26522]/20 shadow-xs"
              >
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search products..."
                  className="w-full bg-transparent text-sm text-[#1C222E] placeholder:text-gray-400 border-none focus:outline-none pr-2"
                />
                <button
                  type="submit"
                  aria-label="Search products"
                  className="p-1 text-gray-800 hover:text-[#F26522] transition-colors cursor-pointer flex-shrink-0"
                >
                  <Search className="w-4.5 h-4.5" strokeWidth={2.2} />
                </button>
              </form>

              {/* Live Autocomplete Search Results */}
              {isSearchFocused && searchTerm.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between px-2 py-1 border-b border-gray-50 mb-2">
                    <span className="text-xs font-semibold text-gray-400">
                      Search Results ({filteredSearchBooks.length})
                    </span>
                    <button
                      onClick={() => setIsSearchFocused(false)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {filteredSearchBooks.length > 0 ? (
                    <div className="max-h-80 overflow-y-auto space-y-1">
                      {filteredSearchBooks.slice(0, 5).map((book) => (
                        <div
                          key={book.id}
                          onClick={() => {
                            setIsSearchFocused(false);
                            setSearchTerm('');
                            navigate(`/books/${book.id}`);
                          }}
                          className="flex items-center gap-3 p-2 hover:bg-[#FFF7ED] rounded-xl cursor-pointer transition-colors group"
                        >
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-10 h-14 object-cover rounded shadow-sm flex-shrink-0"
                            loading="lazy"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-[#1C222E] group-hover:text-[#F26522] truncate">
                              {book.title}
                            </h4>
                            <p className="text-[11px] text-gray-500 truncate">{book.author}</p>
                            <span className="text-xs font-bold text-[#F26522]">
                              ${book.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-xs text-gray-500">
                      No books found matching &quot;{searchTerm}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Action Icons (User, Favourite/Wishlist with '3' badge, Cart with '2' badge & $0.00) */}
          <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
            {/* User Profile Button */}
            <button
              onClick={() => setIsUserModalOpen(!isUserModalOpen)}
              id="user-account-btn"
              aria-label="User Account"
              className="p-1.5 hover:bg-gray-50 rounded-full transition-colors relative cursor-pointer group"
            >
              <UserSvg stroke="#28303F" className="w-6 h-6 group-hover:scale-105 transition-transform" />
            </button>

            {/* Favourite / Wishlist Link with Orange Badge (Showing '3' by default as in photo) */}
            <Link
              to="/wishlist"
              id="wishlist-header-link"
              aria-label="View Wishlist"
              className="p-1.5 hover:bg-gray-50 rounded-full transition-colors relative cursor-pointer group"
            >
              <FavouriteSvg
                stroke="#28303F"
                className="w-6 h-6 group-hover:scale-105 transition-transform"
              />
              <span className="absolute -top-1 -right-1 bg-[#F26522] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                {wishlistCount}
              </span>
            </Link>

            {/* Cart Trigger with Orange Badge (Showing '2' by default as in photo) and Price */}
            <button
              onClick={() => setIsCartOpen(true)}
              id="cart-header-btn"
              aria-label="Shopping Cart"
              className="flex items-center gap-2.5 p-1.5 hover:bg-gray-50 rounded-full md:rounded-xl transition-colors cursor-pointer group"
            >
              <div className="relative">
                <CartSvg
                  stroke="#28303F"
                  className="w-6 h-6 group-hover:scale-105 transition-transform"
                />
                <span className="absolute -top-1 -right-1 bg-[#F26522] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                  {cartCount}
                </span>
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight pr-1">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                  CART
                </span>
                <span className="text-xs font-extrabold text-[#28303F]">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              <MenuSvg stroke="#28303F" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Bottom Navigation (Left-Aligned Links: HOME, BOOKS with Chevron, STORE, BLOG, CONTACT) */}
      <nav className="hidden md:block border-t border-gray-100 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 relative">
          <ul className="flex items-center justify-start gap-5 md:gap-6 lg:gap-8 xl:gap-9 py-3.5 overflow-x-auto no-scrollbar">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const isBooks = link.name === 'BOOKS';

              return (
                <li
                  key={link.name}
                  onMouseEnter={isBooks ? handleBooksMouseEnter : undefined}
                  onMouseLeave={isBooks ? handleBooksMouseLeave : undefined}
                  className="relative group"
                >
                  <Link
                    to={link.path}
                    className={`text-xs lg:text-sm font-bold tracking-wider transition-all relative py-1 flex items-center gap-1.5 ${
                      active || (isBooks && isBooksMegaOpen)
                        ? 'text-[#F26522]'
                        : 'text-[#28303F] hover:text-[#F26522]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isBooks && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isBooksMegaOpen ? 'rotate-180 text-[#F26522]' : 'text-gray-500 group-hover:text-[#F26522]'
                        }`}
                        strokeWidth={2.5}
                      />
                    )}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F26522] rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Books Mega Menu Dropdown (Left-Aligned below Books Menu) */}
          {isBooksMegaOpen && (
            <div
              onMouseEnter={handleBooksMouseEnter}
              onMouseLeave={handleBooksMouseLeave}
              className="absolute top-full left-6 sm:left-8 lg:left-12 mt-1 w-[960px] lg:w-[1080px] xl:w-[1160px] max-w-[95vw] bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100/80 p-6 sm:p-8 lg:p-9 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              {/* Top Pointer Arrow pointing directly to Books Menu */}
              <div className="absolute -top-2 left-16 sm:left-20 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100 shadow-[-2px_-2px_4px_rgba(0,0,0,0.02)]" />

              {/* 3-Column x 2-Row Category Grid (6 Categories Total Matching Reference Image) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-10 lg:gap-x-16 gap-y-7 sm:gap-y-8 relative z-10">
                {topBookCategoriesData.slice(0, 6).map((cat) => (
                  <div key={cat.id} className="flex flex-col group">
                    {/* Category Title */}
                    <Link
                      to={`/books?genre=${encodeURIComponent(cat.genreParam)}`}
                      onClick={() => setIsBooksMegaOpen(false)}
                      className="font-bold text-[#111827] text-[16px] sm:text-[17px] lg:text-[18px] group-hover:text-[#F26522] transition-colors leading-snug tracking-tight mb-2.5 block"
                    >
                      {cat.title}
                    </Link>

                    {/* Subcategories List (4 items matching reference image) */}
                    <ul className="space-y-2 mb-2.5">
                      {cat.subcategories.slice(0, 4).map((sub, idx) => (
                        <li key={idx}>
                          <Link
                            to={sub.path}
                            onClick={() => setIsBooksMegaOpen(false)}
                            className="text-[13.5px] sm:text-[14px] text-gray-500 hover:text-[#F26522] transition-colors inline-block truncate max-w-full font-normal leading-normal"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/* View More Link */}
                    <Link
                      to={`/books?genre=${encodeURIComponent(cat.genreParam)}`}
                      onClick={() => setIsBooksMegaOpen(false)}
                      className="inline-flex items-center gap-1.5 text-[13.5px] sm:text-[14px] font-bold text-[#111827] hover:text-[#F26522] transition-colors mt-0.5 cursor-pointer group/vm"
                    >
                      <span>View More</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#F26522] stroke-[3] transition-transform group-hover/vm:translate-x-0.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-6 space-y-4 shadow-lg animate-in slide-in-from-top-4 duration-200">
          {/* Mobile Search input */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search books, authors..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-xs text-[#28303F] focus:outline-none focus:border-[#F26522]"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <SearchSvg stroke="#28303F" className="w-4 h-4" />
            </button>
          </form>

          {/* Links */}
          <ul className="space-y-2 pt-2 border-t border-gray-100">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-bold ${
                    isActive(link.path) ? 'text-[#F26522]' : 'text-[#28303F]'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
            <Link
              to="/wishlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-bold text-[#F26522]"
            >
              Wishlist ({wishlistCount} items)
            </Link>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="font-bold text-[#28303F]"
            >
              View Cart ({cartCount} items)
            </button>
          </div>
        </div>
      )}

      {/* User Login / Profile Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsUserModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-[#FFF7ED] text-[#F26522] rounded-full flex items-center justify-center mx-auto mb-3">
                <UserSvg stroke="#F26522" className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#1C222E]">Bibliophile Account</h3>
              <p className="text-xs text-gray-500 mt-1">
                Access your reading history, tracked shipments, and exclusive book club perks.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-gray-50 rounded-2xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-gray-800">VIP Member Status Active</span>
                  <p className="text-gray-500">Enjoy 15% automatic discount on all collector prints.</p>
                </div>
              </div>
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="w-full py-3 bg-[#F26522] hover:bg-[#E05312] text-white font-bold text-sm rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Continue Reading Journey</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
