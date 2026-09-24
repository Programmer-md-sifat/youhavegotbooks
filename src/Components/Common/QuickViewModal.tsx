import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartWishlist } from '../../Context/CartWishlistContext';
import { X, Star, Heart, Check, Shield, BookOpen, ExternalLink } from 'lucide-react';
import { ArrowRightSvg } from './SvgIcons';

export const QuickViewModal: React.FC = () => {
  const navigate = useNavigate();
  const { quickViewBook, setQuickViewBook, addToCart, toggleWishlist, isInWishlist } =
    useCartWishlist();
  const [selectedFormat, setSelectedFormat] = useState('Hardcover');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewBook) return null;

  const wishlisted = isInWishlist(quickViewBook.id);

  const handleOpenDetail = () => {
    const bookId = quickViewBook.id;
    setQuickViewBook(null);
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewBook(null)}
      />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setQuickViewBook(null)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Cover & Visual */}
          <div className="flex flex-col items-center justify-center bg-[#FAF9F6] rounded-2xl p-6 relative">
            {quickViewBook.badge && (
              <span className="absolute top-4 left-4 bg-[#F26522] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm">
                {quickViewBook.badge}
              </span>
            )}
            <img
              src={quickViewBook.coverImage}
              alt={quickViewBook.title}
              onClick={handleOpenDetail}
              className="w-48 h-68 object-cover rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
            <div className="mt-4 flex items-center gap-4 text-[11px] text-gray-500">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-[#F26522]" />
                {quickViewBook.pages} Pages
              </span>
              <span>•</span>
              <span>Year {quickViewBook.publishYear}</span>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#F26522] uppercase tracking-wider">
                {quickViewBook.genre}
              </span>
              <h2
                onClick={handleOpenDetail}
                className="text-xl sm:text-2xl font-bold text-[#1C222E] mt-1 leading-snug hover:text-[#F26522] transition-colors cursor-pointer"
              >
                {quickViewBook.title}
              </h2>
              <p className="text-xs text-gray-500 mt-1">by <span className="font-semibold text-gray-700">{quickViewBook.author}</span></p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(quickViewBook.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-200 fill-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#1C222E]">{quickViewBook.rating}</span>
                <span className="text-xs text-gray-400">({quickViewBook.reviewsCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-2xl font-extrabold text-[#F26522]">
                  ${quickViewBook.price.toFixed(2)}
                </span>
                {quickViewBook.originalPrice && (
                  <span className="text-sm font-medium text-gray-400 line-through">
                    ${quickViewBook.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-600 mt-3 line-clamp-3 leading-relaxed">
                {quickViewBook.synopsis}
              </p>

              {/* Format selection */}
              <div className="mt-4">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Select Edition
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewBook.format.map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setSelectedFormat(fmt)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedFormat === fmt
                          ? 'bg-[#F26522] text-white shadow-sm'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addToCart(quickViewBook, selectedFormat, quantity);
                    setQuickViewBook(null);
                  }}
                  className="flex-1 py-3 bg-[#F26522] hover:bg-[#E05312] text-white font-bold text-xs rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <span>Add to Cart</span>
                  <ArrowRightSvg stroke="#FFFFFF" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(quickViewBook)}
                  className={`p-3 rounded-full border transition-all ${
                    wishlisted
                      ? 'border-[#F26522] bg-[#FFF7ED] text-[#F26522]'
                      : 'border-gray-200 hover:border-gray-300 text-gray-500'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#F26522]' : ''}`} />
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleOpenDetail}
                  className="text-xs font-bold text-[#F26522] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View full product page & details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-400">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-500" /> In Stock & Ready to Ship
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-blue-500" /> Authentic Publisher Copy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
