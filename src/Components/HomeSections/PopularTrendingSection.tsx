import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Eye, ShoppingBag, ChevronRight } from 'lucide-react';
import { useCartWishlist } from '../../Context/CartWishlistContext';
import { BookItem } from '../../Data/HomeData';

// 6 Trending Products for the left sidebar column (matching uploaded design)
export const trendingProductsData: BookItem[] = [
  {
    id: 'tp-1',
    title: 'Life Flight',
    author: 'Misty Figueroa',
    price: 115.72,
    originalPrice: 135.00,
    rating: 5,
    reviewsCount: 120,
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=700&q=80',
    genre: 'Gothic Thriller',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'A high-stakes emergency airlift through an apocalyptic tempest exposes a web of psychological deception.',
    pages: 352,
    publishYear: 2025,
    inStock: true,
  },
  {
    id: 'tp-2',
    title: 'Goodbye Again',
    author: 'Gilberto Mills',
    price: 989.56,
    originalPrice: 1100.00,
    rating: 5,
    reviewsCount: 88,
    coverImage: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=700&q=80',
    genre: 'Literary Fiction',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'Reflections on departures, memory, and finding stillness across forgotten transit hubs.',
    pages: 288,
    publishYear: 2024,
    inStock: true,
  },
  {
    id: 'tp-3',
    title: 'The Good Egg',
    author: 'Arthur Gonzalez',
    price: 289.38,
    originalPrice: 320.00,
    rating: 5,
    reviewsCount: 210,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80',
    genre: 'Magical Realism',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'A heartfelt fable on balancing perfectionism with personal acceptance amidst life pressures.',
    pages: 196,
    publishYear: 2024,
    inStock: true,
  },
  {
    id: 'tp-4',
    title: 'His Saving Grace',
    author: 'Misty Figueroa',
    price: 288.74,
    originalPrice: 340.00,
    rating: 5,
    reviewsCount: 94,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80',
    genre: 'Romance & Drama',
    format: ['Paperback', 'E-Book'],
    synopsis: 'Finding redemption and quiet solace in a coastal sanctuary under the watchful eye of an estranged protector.',
    pages: 410,
    publishYear: 2025,
    inStock: true,
  },
  {
    id: 'tp-5',
    title: 'Annie Leibovitz: Wonderland',
    author: 'Rita James',
    price: 35.19,
    originalPrice: 50.00,
    rating: 5,
    reviewsCount: 340,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80',
    genre: 'Photography & Art',
    format: ['Hardcover', 'E-Book'],
    synopsis: 'Five decades of extraordinary fashion portraits and iconic encounters captured with cinematic vision.',
    pages: 448,
    publishYear: 2023,
    inStock: true,
  },
  {
    id: 'tp-6',
    title: 'The Bear of Byzantium',
    author: 'Ernesto Wade',
    price: 286.90,
    originalPrice: 310.00,
    rating: 5,
    reviewsCount: 162,
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=700&q=80',
    genre: 'Historical Epic',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'An empire on the brink of crusade defends its marble ramparts with a legendary mercenary legion.',
    pages: 560,
    publishYear: 2025,
    inStock: true,
  },
];

// 8 Popular Books for the right grid (matching uploaded design 4 cols x 2 rows)
export const popularBooksData: BookItem[] = [
  {
    id: 'pb-1',
    title: 'Rich Dad Poor Dad',
    author: 'Misty Figueroa',
    price: 170.03,
    originalPrice: 200.00,
    rating: 5,
    reviewsCount: 310,
    coverImage: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=700&q=80',
    genre: 'Personal Finance',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'Core principles of financial literacy, wealth creation, and cultivating an abundance mindset.',
    pages: 336,
    publishYear: 2023,
    inStock: true,
  },
  {
    id: 'pb-2',
    title: 'The Story of Success',
    author: 'Arthur Gonzalez',
    price: 50.89,
    originalPrice: 75.00,
    rating: 5,
    reviewsCount: 195,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80',
    genre: 'Self Improvement',
    format: ['Hardcover', 'Paperback', 'Audiobook'],
    synopsis: 'Uncovering the hidden factors, timing, and deliberate practice behind extraordinary human achievements.',
    pages: 320,
    publishYear: 2024,
    inStock: true,
  },
  {
    id: 'pb-3',
    title: 'Annie Leibovitz:...',
    author: 'Dana Chambers',
    price: 316.15,
    originalPrice: 360.00,
    rating: 5,
    reviewsCount: 140,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80',
    genre: 'Contemporary Art',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'A sumptuous monograph traversing fantasy worlds, surreal landscapes, and intimate portraiture.',
    pages: 420,
    publishYear: 2025,
    inStock: true,
  },
  {
    id: 'pb-4',
    title: 'My Dearest Darkest',
    author: 'Enrique Wallace',
    price: 914.53,
    originalPrice: 980.00,
    rating: 5,
    reviewsCount: 280,
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=700&q=80',
    genre: 'Gothic Mystery',
    format: ['Hardcover', 'E-Book'],
    synopsis: 'Beneath the ancient ruins of Crossfield, blood magic demands loyalty and secret sacrifices.',
    pages: 384,
    publishYear: 2025,
    inStock: true,
  },
  {
    id: 'pb-5',
    title: 'House of Sky and Breath',
    author: 'Ernesto Wade',
    price: 86.99,
    originalPrice: 115.00,
    rating: 5,
    reviewsCount: 420,
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=700&q=80',
    genre: 'Fantasy Romance',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'In a world governed by celestial despots, two rebellion warriors ignite an empire-wide revolt.',
    pages: 816,
    publishYear: 2024,
    inStock: true,
  },
  {
    id: 'pb-6',
    title: 'Surrounded by Idiots',
    author: 'Georgia Ramirez',
    price: 825.85,
    originalPrice: 890.00,
    rating: 5,
    reviewsCount: 310,
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=700&q=80',
    genre: 'Behavioral Psychology',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'Understanding the four primary personality archetypes to navigate interpersonal dynamics seamlessly.',
    pages: 304,
    publishYear: 2024,
    inStock: true,
  },
  {
    id: 'pb-7',
    title: 'Treachery: Alpha Colon...',
    author: 'Jessica Munoz',
    price: 814.66,
    originalPrice: 880.00,
    rating: 5,
    reviewsCount: 168,
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=700&q=80',
    genre: 'Dark Fantasy',
    format: ['Hardcover', 'E-Book'],
    synopsis: 'An obsidian order of shadow knights confronts an unprecedented breach through celestial rift zones.',
    pages: 490,
    publishYear: 2025,
    inStock: true,
  },
  {
    id: 'pb-8',
    title: 'A Crown of Petals and Ice',
    author: 'Karla Newman',
    price: 95.91,
    originalPrice: 120.00,
    rating: 5,
    reviewsCount: 220,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80',
    genre: 'High Fantasy',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'A frozen throne where frosty courts clash over an ancient celestial talisman that commands winter itself.',
    pages: 432,
    publishYear: 2025,
    inStock: true,
  },
];

export const PopularTrendingSection: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewBook } = useCartWishlist();

  return (
    <section className="py-12 lg:py-16 bg-white border-t border-gray-100" id="popular-trending-section">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Trending Products (Refined Cream Card) */}
          <div className="lg:col-span-4 bg-[#FFF9F3] border border-[#FBECE2] rounded-3xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(242,101,34,0.04)]">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1C222E] mb-6 tracking-tight">
              Trending Products
            </h3>

            <div className="space-y-4">
              {trendingProductsData.map((item) => {
                const inWishlist = isInWishlist(item.id);
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 pb-4 border-b border-[#F7EBE2] last:border-0 last:pb-0 group"
                  >
                    {/* Thumbnail with rounded corners and quick view */}
                    <div
                      onClick={() => setQuickViewBook(item)}
                      className="relative flex-shrink-0 w-16 h-22 sm:w-18 sm:h-24 rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)] bg-gray-100 cursor-pointer transition-all duration-300"
                    >
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Info with aligned typography & action triggers */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/book/${item.id}`}
                        className="block text-sm sm:text-[15px] font-bold text-[#0D141C] hover:text-[#F26522] transition-colors truncate leading-snug"
                        title={item.title}
                      >
                        {item.title}
                      </Link>

                      {/* 5 Stars with score */}
                      <div className="flex items-center gap-1 mt-1 text-[#F26522]">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-[#F26522] text-[#F26522]" />
                          ))}
                        </div>
                        <span className="text-xs text-[#0D141C] font-semibold ml-1">
                          {item.rating || 5}
                        </span>
                      </div>

                      <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {item.author}
                      </p>

                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-sm sm:text-base font-bold text-[#F26522] tracking-tight">
                          ${item.price.toFixed(2)}
                        </span>

                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleWishlist(item);
                            }}
                            className={`p-1.5 rounded-full bg-white shadow-sm border border-gray-100 hover:scale-110 active:scale-95 transition-all ${
                              inWishlist ? 'text-[#F26522]' : 'text-gray-600 hover:text-[#F26522]'
                            }`}
                            title="Wishlist"
                          >
                            <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-[#F26522]' : ''}`} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(item);
                            }}
                            className="p-1.5 rounded-full bg-white shadow-sm border border-gray-100 text-gray-600 hover:text-[#F26522] hover:scale-110 active:scale-95 transition-all"
                            title="Add to Cart"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Popular Books (Header + 4x2 Grid with Signature Cards) */}
          <div className="lg:col-span-8">
            {/* Header row with VIEW ALL button */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D141C] tracking-tight">
                Popular Books
              </h2>
              <Link
                to="/books?sort=popular"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#F26522] hover:bg-[#d85416] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
              >
                <span>VIEW ALL</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>

            {/* 4 Columns x 2 Rows Grid matching New Arrivals & Bestsellers */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
              {popularBooksData.map((book) => {
                const inWishlist = isInWishlist(book.id);
                return (
                  <div key={book.id} className="group relative flex flex-col justify-between">
                    <div>
                      {/* Book Cover with Signature Rounded-2xl and Right Floating Actions */}
                      <div className="relative aspect-[3/4.4] w-full rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 bg-gray-50">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />

                        {/* Floating Circular Action Buttons Stacked on Right Edge */}
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                          {/* Wishlist Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleWishlist(book);
                            }}
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.14)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
                              inWishlist ? 'text-[#F26522]' : 'text-gray-800 hover:text-[#F26522]'
                            }`}
                            title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                            aria-label="Wishlist"
                          >
                            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${inWishlist ? 'fill-[#F26522] text-[#F26522]' : 'stroke-[2]'}`} />
                          </button>

                          {/* Quick View Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setQuickViewBook(book);
                            }}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-gray-800 hover:text-[#F26522] shadow-[0_3px_12px_rgba(0,0,0,0.14)] flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                            title="Quick View"
                            aria-label="Quick View"
                          >
                            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                          </button>

                          {/* Add to Cart Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart(book);
                            }}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-gray-800 hover:text-[#F26522] shadow-[0_3px_12px_rgba(0,0,0,0.14)] flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                            title="Add to Cart"
                            aria-label="Add to Cart"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                          </button>
                        </div>
                      </div>

                      {/* Book Info Hierarchy */}
                      <div className="mt-3.5 space-y-1">
                        <Link
                          to={`/book/${book.id}`}
                          className="block text-sm sm:text-base font-bold text-[#0D141C] hover:text-[#F26522] transition-colors leading-snug truncate"
                          title={book.title}
                        >
                          {book.title}
                        </Link>

                        {/* Star Rating with Score */}
                        <div className="flex items-center gap-1 text-[#F26522]">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-[#F26522] text-[#F26522]" />
                            ))}
                          </div>
                          <span className="text-xs text-[#0D141C] font-semibold ml-1">
                            {book.rating || 5}
                          </span>
                        </div>

                        {/* Author */}
                        <p className="text-xs text-gray-400 font-normal truncate">{book.author}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mt-2 text-lg sm:text-xl font-bold text-[#F26522] tracking-tight">
                      ${book.price.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
