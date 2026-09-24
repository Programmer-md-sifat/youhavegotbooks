import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageTransition } from '../Components/Common/PageTransition';
import { useCartWishlist } from '../Context/CartWishlistContext';
import { BookItem } from '../Data/HomeData';
import {
  Heart,
  Trash2,
  ShoppingBag,
  Eye,
  Star,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart, setQuickViewBook } = useCartWishlist();
  const [selectedFormat, setSelectedFormat] = useState<Record<string, string>>({});

  const handleFormatChange = (bookId: string, format: string) => {
    setSelectedFormat((prev) => ({ ...prev, [bookId]: format }));
  };

  const handleMoveAllToCart = () => {
    wishlist.forEach((book) => {
      const format = selectedFormat[book.id] || (book.format && book.format[0]) || 'Hardcover';
      addToCart(book, format, 1);
    });
  };

  return (
    <PageTransition>
      <div className="w-full bg-[#FAF9F6] min-h-screen pb-20">
        
        {/* 1. Header Banner & Breadcrumbs */}
        <div className="w-full bg-[#F3F4F6]/80 border-b border-gray-200/70 py-10 sm:py-12">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
                My Wishlist
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Manage your saved literary treasures and transfer them to your cart.
              </p>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider">
              <Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors">
                HOME
              </Link>
              <span className="text-gray-300">→</span>
              <span className="text-[#F26522] font-extrabold">WISHLIST</span>
            </div>
          </div>
        </div>

        {/* 2. Main Content Container */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-8 sm:pt-10">
          
          {wishlist.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-3xl p-12 sm:p-20 text-center border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.03)] max-w-xl mx-auto my-8">
              <div className="w-20 h-20 bg-orange-50 text-[#F26522] rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                <Heart className="w-9 h-9 stroke-[2]" />
              </div>
              <h2 className="text-2xl font-black text-[#111827] tracking-tight">
                Your Wishlist is Empty
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed max-w-md mx-auto">
                Explore our curated catalog of award-winning novels, signed hardcovers, and timeless classics, then click the heart icon to save your favorites.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/books"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#F26522] hover:bg-[#d85416] text-white text-xs font-black uppercase tracking-wider rounded-full shadow-md shadow-[#F26522]/30 hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center gap-2"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/store"
                  className="w-full sm:w-auto px-7 py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-full border border-gray-200 transition-all text-center"
                >
                  Browse Stores
                </Link>
              </div>
            </div>
          ) : (
            /* List System Layout */
            <div className="space-y-6">
              
              {/* Action Toolbar Header */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-700">
                    Showing <span className="text-[#F26522] font-black">{wishlist.length}</span> {wishlist.length === 1 ? 'saved volume' : 'saved volumes'}
                  </span>
                  <span className="hidden sm:inline-block text-gray-300">|</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    All items in stock
                  </span>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={handleMoveAllToCart}
                    className="px-5 py-2.5 rounded-full bg-[#F26522] hover:bg-[#d85416] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move All to Cart</span>
                  </button>
                </div>
              </div>

              {/* Stacked Row Items (List System) */}
              <div className="space-y-4">
                {wishlist.map((book) => {
                  const currentFormat =
                    selectedFormat[book.id] || (book.format && book.format[0]) || 'Hardcover';

                  return (
                    <div
                      key={book.id}
                      className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 p-5 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 group"
                    >
                      {/* Left: Book Cover Thumbnail + Key Details */}
                      <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1 w-full lg:w-auto">
                        
                        {/* Cover Image */}
                        <div className="relative w-24 sm:w-28 md:w-32 aspect-[3/4.2] flex-shrink-0 rounded-2xl overflow-hidden shadow-sm bg-gray-50 group-hover:shadow-md transition-shadow">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          {book.badge && (
                            <span className="absolute top-2 left-2 bg-[#F26522] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                              {book.badge}
                            </span>
                          )}
                        </div>

                        {/* Middle Info */}
                        <div className="flex-1 space-y-1.5">
                          {/* Genre & Stock Tag */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F26522] bg-orange-50 px-2.5 py-0.5 rounded-full">
                              {book.genre || 'Literature'}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              In Stock
                            </span>
                          </div>

                          {/* Book Title */}
                          <Link
                            to={`/book/${book.id}`}
                            className="block text-base sm:text-lg lg:text-xl font-extrabold text-[#111827] hover:text-[#F26522] transition-colors leading-snug"
                          >
                            {book.title}
                          </Link>

                          {/* Author */}
                          <p className="text-xs sm:text-sm text-gray-500 font-medium">
                            by <span className="text-gray-800 font-semibold">{book.author}</span>
                          </p>

                          {/* Star Rating */}
                          <div className="flex items-center gap-1.5 pt-0.5">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < (book.rating || 5)
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'fill-none text-gray-300 stroke-[1.5]'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-bold text-gray-700">
                              {book.rating || 5}.0
                            </span>
                            <span className="text-xs text-gray-400">
                              ({book.reviewsCount || 12} reviews)
                            </span>
                          </div>

                          {/* Synopsis preview */}
                          {book.synopsis && (
                            <p className="text-xs text-gray-500 line-clamp-2 pt-1 max-w-2xl leading-relaxed hidden sm:block">
                              {book.synopsis}
                            </p>
                          )}

                          {/* Format Selector Pills (if formats available) */}
                          {book.format && book.format.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-2">
                              <span className="text-[11px] font-bold text-gray-400 mr-1">
                                Format:
                              </span>
                              {book.format.map((fmt) => (
                                <button
                                  key={fmt}
                                  type="button"
                                  onClick={() => handleFormatChange(book.id, fmt)}
                                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                    currentFormat === fmt
                                      ? 'bg-[#1C222E] text-white shadow-xs'
                                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                                  }`}
                                >
                                  {fmt}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Price & Action Controls */}
                      <div className="flex lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100 gap-4 flex-shrink-0">
                        
                        {/* Price Display */}
                        <div className="text-left lg:text-right">
                          <span className="text-xs text-gray-400 font-medium block">Price</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-[#F26522] tracking-tight">
                              ${book.price.toFixed(2)}
                            </span>
                            {book.originalPrice && book.originalPrice > book.price && (
                              <span className="text-xs text-gray-400 line-through">
                                ${book.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          
                          {/* Quick View Button */}
                          <button
                            type="button"
                            onClick={() => setQuickViewBook(book)}
                            className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-black bg-white flex items-center justify-center transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                            title="Quick View"
                            aria-label="Quick View"
                          >
                            <Eye className="w-4 h-4 stroke-[2]" />
                          </button>

                          {/* Move / Add to Cart Button */}
                          <button
                            type="button"
                            onClick={() => addToCart(book, currentFormat, 1)}
                            className="px-5 sm:px-6 py-2.5 rounded-full bg-[#F26522] hover:bg-[#d85416] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-[#F26522]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Add to Cart</span>
                          </button>

                          {/* Remove from Wishlist Trash Button */}
                          <button
                            type="button"
                            onClick={() => toggleWishlist(book)}
                            className="w-10 h-10 rounded-full bg-gray-50 hover:bg-rose-50 text-gray-400 hover:text-rose-500 flex items-center justify-center transition-all border border-gray-200 hover:border-rose-200 active:scale-95 cursor-pointer"
                            title="Remove from Wishlist"
                            aria-label="Remove from Wishlist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick Navigation Links */}
              <div className="mt-12 bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#F26522] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Looking for more stories?</h4>
                    <p className="text-xs text-gray-500">Discover handpicked new arrivals and limited-time deals.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to="/books"
                    className="px-6 py-2.5 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider border border-gray-200 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    to="/cart"
                    className="px-6 py-2.5 rounded-full bg-[#1C222E] hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    View Cart
                  </Link>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </PageTransition>
  );
};
