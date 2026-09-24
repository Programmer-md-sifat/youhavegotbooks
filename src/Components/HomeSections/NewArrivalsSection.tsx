import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Eye, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartWishlist } from '../../Context/CartWishlistContext';
import { BookItem } from '../../Data/HomeData';

export const newArrivalsBooksData: BookItem[] = [
  {
    id: 'na-the-good-egg',
    title: 'The Good Egg',
    author: 'Arthur Gonzalez',
    price: 289.38,
    rating: 5,
    reviewsCount: 154,
    badge: 'NEW',
    coverImage: '/images/books/helium.jpg',
    genre: 'Poetry & Speculation',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'A heartfelt reflection on emotional buoyancy, modern vulnerability, and finding quiet ground in an unpredictable world.',
    pages: 240,
    publishYear: 2026,
    inStock: true,
  },
  {
    id: 'na-his-saving-grace',
    title: 'His Saving Grace',
    author: 'Misty Figueroa',
    price: 288.74,
    rating: 5,
    reviewsCount: 210,
    badge: 'NEW',
    coverImage: '/images/books/apple.jpg',
    genre: 'Literary Memoir',
    format: ['Hardcover', 'E-Book'],
    synopsis: 'An unflinching, rhythmic memoir exploring Indigenous heritage, childhood resonance, and peeling away the layers of identity.',
    pages: 352,
    publishYear: 2026,
    inStock: true,
  },
  {
    id: 'na-annie-leibovitz',
    title: 'Annie Leibovitz:...',
    author: 'Rita James',
    price: 35.19,
    rating: 5,
    reviewsCount: 88,
    badge: 'NEW',
    coverImage: '/images/books/certain-hunger.jpg',
    genre: 'Fiction & Satire',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'A deliciously wicked, razor-sharp psychological satire dissecting appetites, culinary mastery, and unchecked obsession.',
    pages: 320,
    publishYear: 2026,
    inStock: true,
  },
  {
    id: 'na-bear-of-byzantium',
    title: 'The Bear of Byzantium',
    author: 'Ernesto Wade',
    price: 286.90,
    rating: 5,
    reviewsCount: 340,
    badge: 'NEW',
    coverImage: '/images/books/standardization.jpg',
    genre: 'Historical Thriller',
    format: ['Hardcover', 'Audiobook'],
    synopsis: 'A gripping espionage narrative unraveling Cold War surveillance, bureaucratic paranoia, and mysterious disappearances.',
    pages: 416,
    publishYear: 2026,
    inStock: true,
  },
  {
    id: 'na-heartland-stars',
    title: 'Heartland Stars',
    author: 'Ernesto Wade',
    price: 664.55,
    rating: 5,
    reviewsCount: 95,
    badge: 'NEW',
    coverImage: '/images/books/self-care.jpg',
    genre: 'Contemporary Fiction',
    format: ['Hardcover', 'E-Book'],
    synopsis: 'A biting, comedic look behind the curated sheen of wellness startups, corporate vanity, and the modern commodification of mindfulness.',
    pages: 288,
    publishYear: 2026,
    inStock: true,
  },
  {
    id: 'na-life-flight',
    title: 'Life Flight',
    author: 'Misty Figueroa',
    price: 115.72,
    rating: 5,
    reviewsCount: 420,
    badge: 'NEW',
    coverImage: '/images/books/felix.jpg',
    genre: 'Young Adult & Identity',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'A luminous coming-of-age portrait navigating friendship, art, resilience, and reclaiming self-worth with unapologetic vibrancy.',
    pages: 368,
    publishYear: 2026,
    inStock: true,
  },
];

export const NewArrivalsSection: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewBook } = useCartWishlist();

  return (
    <section className="py-12 sm:py-16 bg-white" id="new-arrivals-section">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
          <h2 id="new-arrivals-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0D141C] tracking-tight">
            New Arrivals
          </h2>
          <Link
            to="/books?sort=new"
            className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-[#F26522] hover:bg-[#d85416] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md active:scale-95 self-start sm:self-auto"
          >
            VIEW ALL
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>

        {/* 6-Column Layout Matching the Reference Design */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 border-y sm:border-y-0 sm:border-x border-gray-100">
          {newArrivalsBooksData.map((book) => {
            const inWishlist = isInWishlist(book.id);

            return (
              <div
                key={book.id}
                className="group relative flex flex-col justify-between px-3 sm:px-4 lg:px-4 py-4 sm:py-2 transition-all duration-300"
              >
                <div>
                  {/* Book Cover Container with Rounded Corners */}
                  <div className="relative aspect-[3/4.4] w-full rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 bg-gray-50">
                    <Link to={`/book/${book.id}`} className="block w-full h-full">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
                        loading="lazy"
                      />
                    </Link>

                    {/* Floating Circular Action Buttons Stacked on Right Edge */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      {/* 1. Wishlist Button */}
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

                      {/* 2. Quick View Button */}
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

                      {/* 3. Add to Cart Button */}
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

                  {/* Book Info Hierarchy */}
                  <div className="mt-3.5 space-y-1">
                    {/* Title */}
                    <Link
                      to={`/book/${book.id}`}
                      className="block text-sm sm:text-base font-bold text-[#0D141C] hover:text-[#F26522] transition-colors leading-snug truncate"
                      title={book.title}
                    >
                      {book.title}
                    </Link>

                    {/* Star Rating with Number 5 */}
                    <div className="flex items-center gap-1 text-[#F26522]">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#F26522] text-[#F26522]" />
                        ))}
                      </div>
                      <span className="text-xs text-[#0D141C] font-semibold ml-1">{book.rating}</span>
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

