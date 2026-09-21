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
import { ChevronDown, X, LogIn, CheckCircle2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, wishlistCount, cartTotal, setIsCartOpen } = useCartWishlist();

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

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
    { name: 'SELLER', path: '/seller' },
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
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-22 sm:h-24 gap-4 md:gap-8">
          {/* Brand Logo */}
          <Logo variant="light" imageClassName="h-16 sm:h-20 md:h-24 max-h-[80px] w-auto object-contain flex-shrink-0" />

          {/* Center Search & Categories Container - Pill shape matching uploaded image */}
          <div
            ref={searchRef}
            className="hidden md:flex flex-1 max-w-2xl relative items-center"
          >
            <div className="w-full flex items-center bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:border-gray-300 focus-within:border-[#F26522] focus-within:ring-2 focus-within:ring-[#F26522]/15 transition-all">
              {/* Orange Categories Pill Button */}
              <div className="relative" ref={categoriesRef}>
                <button
                  type="button"
                  id="categories-dropdown-btn"
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="bg-[#F26522] hover:bg-[#E05312] text-white rounded-full px-5 py-2.5 flex items-center gap-2 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shadow-sm active:scale-98"
                >
                  <MenuSvg stroke="#FFFFFF" className="w-4 h-4" />
                  <span>CATEGORIES</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isCategoriesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Categories Dropdown Panel */}
                {isCategoriesOpen && (
                  <div className="absolute left-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
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

              {/* Search Form Input */}
              <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center pr-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 text-sm text-[#28303F] placeholder:text-gray-400 bg-transparent border-none focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-500 cursor-pointer"
                >
                  <SearchSvg stroke="#28303F" className="w-5 h-5" />
                </button>
              </form>
            </div>

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

      {/* Secondary Bottom Navigation (Centered Links: HOME, BOOKS, SELLER, BLOG, CONTACT) */}
      <nav className="hidden md:block border-t border-gray-100 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <ul className="flex items-center justify-center gap-8 lg:gap-12 py-3.5">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-xs lg:text-sm font-bold tracking-wider transition-all relative py-1 ${
                      active
                        ? 'text-[#F26522]'
                        : 'text-[#28303F] hover:text-[#F26522]'
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F26522] rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
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
