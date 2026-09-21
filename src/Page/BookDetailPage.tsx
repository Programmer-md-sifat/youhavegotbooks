import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageTransition } from '../Components/Common/PageTransition';
import { allBooksCatalog } from '../Data/BooksData';
import { useCartWishlist } from '../Context/CartWishlistContext';
import { ArrowRightSvg, CartSvg, FavouriteSvg } from '../Components/Common/SvgIcons';
import { Star, Truck, ShieldCheck, RotateCcw, BookOpen, Check } from 'lucide-react';

export const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const book = allBooksCatalog.find((b) => b.id === id) || allBooksCatalog[0];
  const { addToCart, toggleWishlist, isInWishlist } = useCartWishlist();

  const [selectedFormat, setSelectedFormat] = useState('Hardcover');
  const [quantity, setQuantity] = useState(1);
  const isWish = isInWishlist(book.id);

  return (
    <PageTransition>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link to="/books" className="hover:text-black">Books</Link>
          <span>/</span>
          <span className="text-[#F26522] font-semibold">{book.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Cover showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="bg-[#FAF9F6] p-8 sm:p-12 rounded-3xl border border-gray-100 relative w-full flex justify-center shadow-sm">
              {book.badge && (
                <span className="absolute top-6 left-6 bg-[#F26522] text-white text-xs font-extrabold uppercase px-3 py-1.5 rounded-full shadow-sm">
                  {book.badge}
                </span>
              )}
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-64 h-92 object-cover rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 w-full mt-6">
              <div className="bg-white p-3.5 rounded-2xl border border-gray-100 text-center">
                <BookOpen className="w-4 h-4 text-[#F26522] mx-auto mb-1" />
                <span className="text-[11px] font-bold text-gray-800 block">{book.pages} Pages</span>
                <span className="text-[10px] text-gray-400">Archival Paper</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-gray-100 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-gray-800 block">First Edition</span>
                <span className="text-[10px] text-gray-400">Guaranteed</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-gray-100 text-center">
                <Truck className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-gray-800 block">Global Express</span>
                <span className="text-[10px] text-gray-400">Tracked Parcel</span>
              </div>
            </div>
          </div>

          {/* Book Information */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#F26522] uppercase tracking-wider">
                {book.genre}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C222E] mt-1 tracking-tight">
                {book.title}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Written by <span className="font-bold text-gray-800">{book.author}</span> • Published {book.publishYear}
              </p>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-3">
              <div className="flex text-[#F59E0B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-800">{book.rating} / 5.0</span>
              <span className="text-xs text-gray-400">({book.reviewsCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-extrabold text-[#F26522]">
                ${book.price.toFixed(2)}
              </span>
              {book.originalPrice && (
                <span className="text-base font-medium text-gray-400 line-through">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Synopsis */}
            <div className="space-y-2 border-y border-gray-100 py-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Editorial Synopsis
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {book.synopsis}
              </p>
            </div>

            {/* Format choice */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
                Binding & Format
              </label>
              <div className="flex flex-wrap gap-3">
                {book.format.map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedFormat === fmt
                        ? 'bg-[#F26522] text-white shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => addToCart(book, selectedFormat, quantity)}
                className="flex-1 min-w-[200px] py-4 bg-[#F26522] hover:bg-[#E05312] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-[#F26522]/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <CartSvg stroke="#FFFFFF" className="w-5 h-5" />
                <span>Add To Cart - ${(book.price * quantity).toFixed(2)}</span>
              </button>

              <button
                onClick={() => toggleWishlist(book)}
                className={`p-4 rounded-full border transition-all cursor-pointer ${
                  isWish
                    ? 'border-[#F26522] bg-[#FFF7ED] text-[#F26522]'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
                aria-label="Wishlist"
              >
                <FavouriteSvg
                  stroke={isWish ? '#F26522' : '#28303F'}
                  fill={isWish ? '#F26522' : 'none'}
                  className="w-5 h-5"
                />
              </button>
            </div>

            <div className="pt-4 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-3 rounded-2xl">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>In stock at LunarBooks Central Vault. Dispatches within 24 hours.</span>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
