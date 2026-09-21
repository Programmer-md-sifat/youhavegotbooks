import React from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../Components/Common/PageTransition';
import { useCartWishlist } from '../Context/CartWishlistContext';
import { FavouriteSvg, CartSvg } from '../Components/Common/SvgIcons';
import { Trash2, Heart, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useCartWishlist();

  return (
    <PageTransition>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <Link to="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <span className="text-[#F26522] font-semibold">Your Wishlist</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1C222E]">Saved Literary Treasures</h1>
          <p className="text-xs text-gray-500 mt-1">
            {wishlist.length} {wishlist.length === 1 ? 'volume' : 'volumes'} preserved in your personal collection.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 max-w-lg mx-auto shadow-sm">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-gray-800">Your wishlist is empty</h2>
            <p className="text-xs text-gray-500 mt-1">
              Tap the heart icon on any book cover to save it for your next reading haul.
            </p>
            <Link
              to="/books"
              className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-[#F26522] text-white text-xs font-bold uppercase rounded-full"
            >
              Explore Bookstore
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between"
              >
                <div className="relative bg-[#FAF9F6] rounded-2xl p-5 flex items-center justify-center aspect-[4/5] mb-4">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-36 h-52 object-cover rounded shadow-md"
                  />
                  <button
                    onClick={() => toggleWishlist(book)}
                    className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white text-rose-500 rounded-full shadow-sm"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#F26522]">
                      {book.genre}
                    </span>
                    <h3 className="text-sm font-bold text-[#1C222E] mt-0.5 line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-500">{book.author}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-3 border-t border-gray-100">
                    <span className="text-base font-extrabold text-[#1C222E]">
                      ${book.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(book)}
                      className="px-4 py-2 bg-[#F26522] hover:bg-[#E05312] text-white text-xs font-bold uppercase rounded-full flex items-center gap-1.5 transition-colors"
                    >
                      <CartSvg stroke="#FFFFFF" className="w-4 h-4" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
};
