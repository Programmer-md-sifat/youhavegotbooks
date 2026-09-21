import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Heart, Eye, ShoppingBag } from 'lucide-react';
import { useCartWishlist } from '../../Context/CartWishlistContext';
import { BookItem } from '../../Data/HomeData';

export interface FavouriteBookItem extends BookItem {
  priceDisplay?: string;
}

export const favouriteReadsLeft: FavouriteBookItem[] = [
  {
    id: 'ofr-l1',
    title: 'Rich Dad Poor Dad',
    author: 'Misty Figueroa',
    price: 170.03,
    rating: 5,
    reviewsCount: 190,
    coverImage: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=700&q=80',
    genre: 'Personal Finance',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'Timeless principles regarding asset generation, financial literacy, and escaping the rate race.',
    pages: 336,
    publishYear: 2024,
    inStock: true,
  },
  {
    id: 'ofr-l2',
    title: 'House of Sky and...',
    author: 'Ernesto Wade',
    price: 86.99,
    rating: 5,
    reviewsCount: 310,
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=700&q=80',
    genre: 'Epic Fantasy',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'As rebellious factions emerge across the empire, celestial forces clash in an epic battle of destinies.',
    pages: 816,
    publishYear: 2024,
    inStock: true,
  },
  {
    id: 'ofr-l3',
    title: 'Treachery: Alpha...',
    author: 'Jessica Munoz',
    price: 814.66,
    rating: 5,
    reviewsCount: 145,
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=700&q=80',
    genre: 'Dark Fantasy',
    format: ['Hardcover', 'E-Book'],
    synopsis: 'Deep space explorers confront cosmic treachery on an uncharted frontier colony.',
    pages: 420,
    publishYear: 2025,
    inStock: true,
  },
  {
    id: 'ofr-l4',
    title: 'P.S. Never in a Millio...',
    author: 'Marcella Bennett',
    price: 664.55,
    priceDisplay: '$664.55–$906.29',
    rating: 5,
    reviewsCount: 88,
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=700&q=80',
    genre: 'Contemporary Romance',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'A heartfelt journey through decades of unsent letters that bridge long distances and buried truths.',
    pages: 350,
    publishYear: 2025,
    inStock: true,
  },
];

export const favouriteReadsCenter: FavouriteBookItem[] = [
  {
    id: 'ofr-c1',
    title: 'The Story of Success',
    author: 'Arthur Gonzalez',
    price: 50.89,
    rating: 5,
    reviewsCount: 420,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80',
    genre: 'Magical Realism',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'Piranesi lives in the House. In his notebooks day after day, he records its infinite marble halls and ocean tides.',
    pages: 272,
    publishYear: 2024,
    inStock: true,
  },
  {
    id: 'ofr-c2',
    title: 'Annie Leibovitz',
    author: 'Dana Chambers',
    price: 316.15,
    rating: 5,
    reviewsCount: 380,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80',
    genre: 'Fine Art & Photography',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'An intimate, luxurious monograph traversing portraits, surreal landscapes, and iconic visual history.',
    pages: 420,
    publishYear: 2025,
    inStock: true,
  },
];

export const favouriteReadsRight: FavouriteBookItem[] = [
  {
    id: 'ofr-r1',
    title: 'My Dearest Darkest',
    author: 'Enrique Wallace',
    price: 914.53,
    rating: 5,
    reviewsCount: 260,
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=700&q=80',
    genre: 'Gothic Thriller',
    format: ['Hardcover', 'E-Book'],
    synopsis: 'Beneath the ancient ruins of Crossfield, blood magic demands loyalty and secret sacrifices.',
    pages: 384,
    publishYear: 2025,
    inStock: true,
  },
  {
    id: 'ofr-r2',
    title: 'Surrounded by Idiots',
    author: 'Georgia Ramirez',
    price: 825.85,
    rating: 5,
    reviewsCount: 510,
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=700&q=80',
    genre: 'Behavioral Psychology',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'Understanding the four primary personality archetypes to navigate interpersonal dynamics seamlessly.',
    pages: 304,
    publishYear: 2024,
    inStock: true,
  },
  {
    id: 'ofr-r3',
    title: 'A Crown of Petals an...',
    author: 'Karla Newman',
    price: 95.91,
    rating: 5,
    reviewsCount: 175,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80',
    genre: 'Dark Academia',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'A court immersed in icy intrigue where loyalty is traded for ancient throne relics.',
    pages: 390,
    publishYear: 2025,
    inStock: true,
  },
  {
    id: 'ofr-r4',
    title: 'Heavenly Bodies',
    author: 'Karla Newman',
    price: 53.00,
    rating: 5,
    reviewsCount: 210,
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=700&q=80',
    genre: 'Cosmic Romance',
    format: ['Hardcover', 'Paperback'],
    synopsis: 'Starlit empires and destined bonds collide across celestial borders in this spellbinding saga.',
    pages: 440,
    publishYear: 2024,
    inStock: true,
  },
];

export const OurFavouriteReadsSection: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewBook } = useCartWishlist();

  return (
    <section className="w-full py-12 sm:py-16 bg-white border-t border-gray-100" id="our-favourite-reads-section">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
          <h2
            id="favourite-reads-heading"
            className="text-2xl sm:text-3xl font-extrabold text-[#0D141C] tracking-tight"
          >
            Our Favourite Reads
          </h2>

          <Link
            to="/books?sort=featured"
            className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-[#F26522] hover:bg-[#d85416] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md active:scale-95 self-start sm:self-auto"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>

        {/* 3-Column Layout: Left 4 items (col-span-3), Center 2 large items (col-span-6), Right 4 items (col-span-3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column - 4 Mini Books */}
            <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-5">
              {favouriteReadsLeft.map((book) => {
                const inWishlist = isInWishlist(book.id);
                return (
                  <div
                    key={book.id}
                    className="flex items-center gap-3.5 group p-2 rounded-2xl hover:bg-gray-50/80 transition-colors"
                  >
                    <div
                      onClick={() => setQuickViewBook(book)}
                      className="relative w-16 h-22 sm:w-18 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)] bg-gray-100 cursor-pointer transition-all duration-300"
                    >
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/book/${book.id}`}
                        className="block font-bold text-sm sm:text-[15px] text-[#0D141C] hover:text-[#F26522] transition-colors truncate leading-snug"
                        title={book.title}
                      >
                        {book.title}
                      </Link>
                      <div className="flex items-center gap-1 mt-1 text-[#F26522]">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#F26522] text-[#F26522]" />
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-[#0D141C] ml-0.5">5</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {book.author}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm sm:text-base font-bold text-[#F26522] tracking-tight">
                          {book.priceDisplay || `$${book.price.toFixed(2)}`}
                        </span>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => toggleWishlist(book)}
                            className={`p-1 rounded-full hover:scale-110 active:scale-95 transition-all ${
                              inWishlist ? 'text-[#F26522]' : 'text-gray-500 hover:text-[#F26522]'
                            }`}
                            title="Wishlist"
                          >
                            <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-[#F26522]' : ''}`} />
                          </button>
                          <button
                            type="button"
                            onClick={() => addToCart(book)}
                            className="p-1 rounded-full text-gray-500 hover:text-[#F26522] hover:scale-110 active:scale-95 transition-all"
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

            {/* Center Column - 2 Large Showcase Books with Signature Cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {favouriteReadsCenter.map((book) => {
                const inWishlist = isInWishlist(book.id);
                return (
                  <div
                    key={book.id}
                    className="group relative flex flex-col justify-between"
                  >
                    <div>
                      {/* Large Book Cover matching signature style */}
                      <div className="relative aspect-[3/4.4] w-full rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 bg-gray-50">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />

                        {/* Floating Circular Action Buttons on Right Edge */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
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

                      {/* Details Below Large Cover */}
                      <div className="mt-3.5 space-y-1">
                        <Link
                          to={`/book/${book.id}`}
                          className="block font-bold text-sm sm:text-base text-[#0D141C] hover:text-[#F26522] transition-colors leading-snug truncate"
                          title={book.title}
                        >
                          {book.title}
                        </Link>

                        <div className="flex items-center gap-1 text-[#F26522]">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-[#F26522] text-[#F26522]" />
                            ))}
                          </div>
                          <span className="text-xs font-semibold text-[#0D141C] ml-1">5</span>
                        </div>

                        <p className="text-xs text-gray-400 font-normal truncate">
                          {book.author}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 text-lg sm:text-xl font-bold text-[#F26522] tracking-tight">
                      ${book.price.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column - 4 Mini Books */}
            <div className="lg:col-span-3 flex flex-col gap-4 sm:gap-5">
              {favouriteReadsRight.map((book) => {
                const inWishlist = isInWishlist(book.id);
                return (
                  <div
                    key={book.id}
                    className="flex items-center gap-3.5 group p-2 rounded-2xl hover:bg-gray-50/80 transition-colors"
                  >
                    <div
                      onClick={() => setQuickViewBook(book)}
                      className="relative w-16 h-22 sm:w-18 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)] bg-gray-100 cursor-pointer transition-all duration-300"
                    >
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/book/${book.id}`}
                        className="block font-bold text-sm sm:text-[15px] text-[#0D141C] hover:text-[#F26522] transition-colors truncate leading-snug"
                        title={book.title}
                      >
                        {book.title}
                      </Link>
                      <div className="flex items-center gap-1 mt-1 text-[#F26522]">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#F26522] text-[#F26522]" />
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-[#0D141C] ml-0.5">5</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {book.author}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm sm:text-base font-bold text-[#F26522] tracking-tight">
                          {book.priceDisplay || `$${book.price.toFixed(2)}`}
                        </span>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => toggleWishlist(book)}
                            className={`p-1 rounded-full hover:scale-110 active:scale-95 transition-all ${
                              inWishlist ? 'text-[#F26522]' : 'text-gray-500 hover:text-[#F26522]'
                            }`}
                            title="Wishlist"
                          >
                            <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-[#F26522]' : ''}`} />
                          </button>
                          <button
                            type="button"
                            onClick={() => addToCart(book)}
                            className="p-1 rounded-full text-gray-500 hover:text-[#F26522] hover:scale-110 active:scale-95 transition-all"
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

      </div>
    </section>
  );
};
