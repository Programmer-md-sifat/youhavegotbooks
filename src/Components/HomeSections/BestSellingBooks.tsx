import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Eye, ShoppingBag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCartWishlist } from '../../Context/CartWishlistContext';
import { BookItem } from '../../Data/HomeData';

export const bestSellingBooksData: BookItem[] = [
  {
    id: 'bs-piranesi',
    title: 'Piranesi',
    author: 'Susanna Clarke',
    price: 50.89,
    originalPrice: 68.00,
    rating: 5,
    reviewsCount: 5,
    badge: 'BESTSELLER',
    coverImage: '/images/books/piranesi.jpg',
    genre: 'Magical Realism',
    format: ['Hardcover', 'Paperback', 'E-Book'],
    synopsis: 'Piranesi lives in the House. Perhaps he always has. In his notebooks day after day, he records its infinite marble halls and surging ocean tides.',
    pages: 272,
    publishYear: 2024,
    inStock: true,
  },
  {
    id: 'bs-annie-leibovitz',
    title: 'Annie Leibovitz: Wonderland',
    author: 'Dana Chambers',
    price: 316.15,
    originalPrice: 350.00,
    rating: 4,
    reviewsCount: 5,
    badge: 'BESTSELLER',
    coverImage: '/images/books/over-the-woodward-wall.jpg',
    genre: 'Gothic Fantasy',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'Two very different children climb over an impossible wall into an uncanny realm of talking crows and living shadows.',
    pages: 320,
    publishYear: 2025,
    inStock: true,
  },
  {
    id: 'bs-my-dearest-darkest',
    title: 'My Dearest Darkest',
    author: 'Enrique Wallace',
    price: 914.53,
    originalPrice: 990.00,
    rating: 3,
    reviewsCount: 5,
    badge: 'BESTSELLER',
    coverImage: '/images/books/ring-shout.jpg',
    genre: 'Gothic Thriller',
    format: ['Hardcover', 'E-Book'],
    synopsis: 'A haunting tale of an elite boarding school built upon forbidden roots where dark magic requires an uncompromising sacrifice.',
    pages: 384,
    publishYear: 2025,
    inStock: true,
  },
  {
    id: 'bs-house-of-sky-and-breath',
    title: 'House of Sky and Breath',
    author: 'Ernesto Wade',
    price: 86.99,
    originalPrice: 110.00,
    rating: 4,
    reviewsCount: 5,
    badge: 'BESTSELLER',
    coverImage: '/images/books/eat-a-peach.jpg',
    genre: 'Culinary Memoir & Fiction',
    format: ['Hardcover', 'Paperback', 'Audiobook'],
    synopsis: 'Bryce Quinlan and Hunt Athalar are trying to get back to normal, but as the Asteri’s power grows, rebellion beckons.',
    pages: 816,
    publishYear: 2024,
    inStock: true,
  },
  {
    id: 'bs-surrounded-by-idiots',
    title: 'Surrounded by Idiots',
    author: 'Georgia Ramirez',
    price: 825.85,
    originalPrice: 890.00,
    rating: 4,
    reviewsCount: 5,
    badge: 'BESTSELLER',
    coverImage: '/images/books/each-of-us-a-desert.jpg',
    genre: 'Fantasy Fiction',
    format: ['Hardcover', 'Paperback', 'E-Book'],
    synopsis: 'A storyteller in a desert kingdom burdened with dangerous secrets travels across dunes under a starlit eclipse.',
    pages: 412,
    publishYear: 2024,
    inStock: true,
  },
  {
    id: 'bs-treachery',
    title: 'Treachery: A...',
    author: 'Jessica Munoz',
    price: 814.66,
    originalPrice: 880.00,
    rating: 5,
    reviewsCount: 5,
    badge: 'BESTSELLER',
    coverImage: '/images/books/scars.jpg',
    genre: 'Dark Romance & Mystery',
    format: ['Hardcover', 'Audiobook'],
    synopsis: 'A gripping dark drama unraveling long-hidden family scars, fragile secrets, and forbidden loyalties.',
    pages: 368,
    publishYear: 2025,
    inStock: true,
  },
];

export const BestSellingBooks: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewBook } = useCartWishlist();
  const [isPaused, setIsPaused] = useState(false);

  // Triple the list to make infinite marquee loop continuous and seamless without gap
  const marqueeBooks = [...bestSellingBooksData, ...bestSellingBooksData, ...bestSellingBooksData];

  return (
    <section className="py-12 sm:py-16 bg-white overflow-hidden" id="bestselling-section">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 id="bestselling-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0D141C] tracking-tight">
              Bestselling books
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* View All Button */}
            <Link
              to="/books?sort=bestselling"
              className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-[#F26522] hover:bg-[#d85416] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              VIEW ALL
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Marquee Container with Gradient Side Fades */}
      <div className="relative w-full overflow-hidden group/marquee">
        {/* Left Edge Soft Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-20 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent" />
        
        {/* Right Edge Soft Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-20 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent" />

        {/* Continuous Scrolling Marquee Track */}
        <div
          className={`animate-marquee-track py-2 ${isPaused ? 'is-paused' : ''}`}
          style={{
            animationDuration: '38s',
          }}
        >
          {marqueeBooks.map((book, idx) => {
            const inWishlist = isInWishlist(book.id);
            const filledStars = book.rating || 5;

            return (
              <div
                key={`${book.id}-${idx}`}
                className="w-[230px] sm:w-[260px] md:w-[285px] flex-shrink-0 px-3 sm:px-4 group flex flex-col justify-between"
              >
                <div>
                  {/* Book Cover with Rounded Corners matching the reference image */}
                  <div className="relative aspect-[3/4.4] w-full rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 bg-gray-50">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />

                    {/* Floating Circular Action Buttons on Right Edge */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      {/* Wishlist Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(book);
                        }}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.14)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
                          inWishlist ? 'text-[#F26522]' : 'text-gray-800 hover:text-[#F26522]'
                        }`}
                        title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#F26522] text-[#F26522]' : 'stroke-[2]'}`} />
                      </button>

                      {/* Quick View Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setQuickViewBook(book);
                        }}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-gray-800 hover:text-[#F26522] shadow-[0_3px_12px_rgba(0,0,0,0.14)] flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                        title="Quick View"
                        aria-label="Quick View"
                      >
                        <Eye className="w-4 h-4 stroke-[2]" />
                      </button>

                      {/* Add to Cart Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(book);
                        }}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-gray-800 hover:text-[#F26522] shadow-[0_3px_12px_rgba(0,0,0,0.14)] flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                        title="Add to Cart"
                        aria-label="Add to Cart"
                      >
                        <ShoppingBag className="w-4 h-4 stroke-[2]" />
                      </button>
                    </div>
                  </div>

                  {/* Book Info Hierarchy matching the reference layout */}
                  <div className="mt-3.5 space-y-1">
                    {/* Title */}
                    <Link
                      to={`/book/${book.id}`}
                      className="block text-sm sm:text-base font-bold text-[#0D141C] hover:text-[#F26522] transition-colors leading-snug truncate"
                      title={book.title}
                    >
                      {book.title}
                    </Link>

                    {/* Star Rating with filled and unfilled stars + score number */}
                    <div className="flex items-center gap-1 text-[#F26522]">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < filledStars
                                ? 'fill-[#F26522] text-[#F26522]'
                                : 'fill-none text-gray-300 stroke-[1.5]'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[#0D141C] font-semibold ml-1">5</span>
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
    </section>
  );
};
