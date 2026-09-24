import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageTransition } from '../Components/Common/PageTransition';
import { allBooksCatalog } from '../Data/BooksData';
import { useCartWishlist } from '../Context/CartWishlistContext';
import { Star, ChevronRight, X, Filter, Heart, Eye, ShoppingBag } from 'lucide-react';
import { PriceFilterWidget } from '../Components/Shop/PriceFilterWidget';

export const BooksPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const genreParam = searchParams.get('genre') || '';
  const searchParam = searchParams.get('search') || '';

  // Filter States
  const [selectedGenres, setSelectedGenres] = useState<string[]>(genreParam ? [genreParam] : []);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [appliedMinPrice, setAppliedMinPrice] = useState<number>(50);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number>(1000);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // Pagination & Sorting States
  const [sortBy, setSortBy] = useState<string>('default');
  const [showCount, setShowCount] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { addToCart, toggleWishlist, isInWishlist, setQuickViewBook } = useCartWishlist();

  // Genre Options with Counts
  const genresList = [
    { name: 'Action & Adventure', count: 12 },
    { name: 'Activity Books', count: 8 },
    { name: 'Animals', count: 5 },
    { name: 'Anthologies', count: 9 },
    { name: 'Arts & Literature', count: 14 },
    { name: 'Cars & Trucks', count: 4 },
    { name: 'Classics', count: 11 },
    { name: 'Contemporary', count: 16 },
    { name: 'Cultural', count: 7 },
    { name: 'European', count: 6 },
    { name: 'Foreign Language', count: 8 },
  ];

  // Authors List with Counts
  const authorsList = [
    { name: 'Arthur Gonzalez', count: 1 },
    { name: 'Dana Chambers', count: 1 },
    { name: 'Ernesto Wade', count: 2 },
    { name: 'Karla Newman', count: 2 },
    { name: 'Suzanne Casey', count: 1 },
    { name: 'Georgia Ramirez', count: 1 },
    { name: 'Jessica Munoz', count: 1 },
    { name: 'Rex Rios', count: 1 },
  ];

  // Ratings List
  const ratingsList = [
    { stars: 5, count: 7 },
    { stars: 4, count: 23 },
    { stars: 3, count: 4 },
  ];

  const handleGenreToggle = (genreName: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genreName) ? prev.filter((g) => g !== genreName) : [...prev, genreName]
    );
  };

  const handleAuthorToggle = (authorName: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(authorName) ? prev.filter((a) => a !== authorName) : [...prev, authorName]
    );
  };

  const handleFilterPrice = (minVal: number, maxVal: number) => {
    setAppliedMinPrice(minVal);
    setAppliedMaxPrice(maxVal);
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredBooks = useMemo(() => {
    let list = [...allBooksCatalog];

    if (searchParam) {
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(searchParam.toLowerCase()) ||
          b.author.toLowerCase().includes(searchParam.toLowerCase())
      );
    }

    if (selectedGenres.length > 0) {
      list = list.filter((b) =>
        selectedGenres.some((g) => b.genre.toLowerCase().includes(g.toLowerCase()))
      );
    }

    if (selectedAuthors.length > 0) {
      list = list.filter((b) => selectedAuthors.includes(b.author));
    }

    list = list.filter((b) => b.price >= appliedMinPrice && b.price <= appliedMaxPrice);

    if (selectedRating !== null) {
      list = list.filter((b) => Math.floor(b.rating) === selectedRating);
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [searchParam, selectedGenres, selectedAuthors, appliedMinPrice, appliedMaxPrice, selectedRating, sortBy]);

  // Paginated Books
  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * showCount;
    return filteredBooks.slice(startIndex, startIndex + showCount);
  }, [filteredBooks, currentPage, showCount]);

  const totalPages = Math.ceil(filteredBooks.length / showCount) || 1;

  return (
    <PageTransition>
      <div className="bg-[#FAF9F6] min-h-screen py-8 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          
          {/* Header & Breadcrumb Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
            <h1 className="text-3xl sm:text-4xl font-black text-[#1C222E] tracking-tight">
              Shop
            </h1>

            <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
              <span className="hover:text-black cursor-pointer">Home</span>
              <span>→</span>
              <span className="text-[#1C222E] font-bold">Shop</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar Filters */}
            <div
              className={`lg:col-span-3 space-y-6 ${
                isMobileFilterOpen
                  ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto block'
                  : 'hidden lg:block'
              }`}
            >
              {/* Mobile Drawer Close Button */}
              {isMobileFilterOpen && (
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4 lg:hidden">
                  <h3 className="text-base font-extrabold text-[#1C222E]">Filters</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Widget 1: Genre */}
              <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-extrabold text-[#1C222E] uppercase tracking-wider">
                    Genre
                  </h3>
                  <span className="bg-[#FEEAD7] text-[#EA580C] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    14 CATEGORIES
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-gray-600 font-medium max-h-72 overflow-y-auto pr-1">
                  {genresList.map((g) => (
                    <label
                      key={g.name}
                      className="flex items-center justify-between cursor-pointer group hover:text-[#F26522] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedGenres.includes(g.name)}
                          onChange={() => handleGenreToggle(g.name)}
                          className="w-4 h-4 rounded border-gray-300 text-[#F26522] focus:ring-[#F26522] accent-[#F26522] cursor-pointer"
                        />
                        <span>{g.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Widget 2: Authors */}
              <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                <h3 className="text-sm font-extrabold text-[#1C222E] uppercase tracking-wider mb-4">
                  Authors
                </h3>

                <div className="space-y-2.5 text-xs text-gray-600 font-medium">
                  {authorsList.map((author) => (
                    <label
                      key={author.name}
                      className="flex items-center justify-between cursor-pointer group hover:text-[#F26522] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedAuthors.includes(author.name)}
                          onChange={() => handleAuthorToggle(author.name)}
                          className="w-4 h-4 rounded border-gray-300 text-[#F26522] focus:ring-[#F26522] accent-[#F26522] cursor-pointer"
                        />
                        <span>{author.name}</span>
                      </div>
                      <span className="text-gray-400 text-[11px]">({author.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Widget 3: Filter By Price (Matching user design) */}
              <PriceFilterWidget
                appliedMin={appliedMinPrice}
                appliedMax={appliedMaxPrice}
                onFilter={handleFilterPrice}
              />

              {/* Widget 4: Review Ratings */}
              <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                <h3 className="text-sm font-extrabold text-[#1C222E] uppercase tracking-wider mb-4">
                  Review Ratings
                </h3>

                <div className="space-y-3">
                  {ratingsList.map((item) => (
                    <button
                      key={item.stars}
                      onClick={() =>
                        setSelectedRating(selectedRating === item.stars ? null : item.stars)
                      }
                      className={`w-full flex items-center justify-between p-1.5 rounded-lg text-xs transition-colors ${
                        selectedRating === item.stars ? 'bg-orange-50/80' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-[#F59E0B]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < item.stars
                                ? 'fill-[#F59E0B] text-[#F59E0B]'
                                : 'fill-gray-200 text-gray-200'
                            }`}
                          />
                        ))}
                      </div>

                      <span className="text-gray-400 text-[11px] font-medium">({item.count})</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Main Products Area */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Top Controls Toolbar */}
              <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex items-center justify-between">
                
                {/* Mobile Filter Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1 text-xs font-bold"
                  >
                    <Filter className="w-4 h-4 text-[#F26522]" />
                    <span>Filters</span>
                  </button>
                </div>

                {/* Right Controls: Sorting & Display Count */}
                <div className="flex items-center gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-50 border border-gray-200/80 rounded-lg text-xs font-semibold px-3 py-2 text-[#1C222E] focus:outline-none focus:border-[#F26522]"
                  >
                    <option value="default">Default sorting</option>
                    <option value="price-low">Sort by price: low to high</option>
                    <option value="price-high">Sort by price: high to low</option>
                    <option value="rating">Sort by rating</option>
                  </select>

                  <select
                    value={showCount}
                    onChange={(e) => {
                      setShowCount(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="bg-gray-50 border border-gray-200/80 rounded-lg text-xs font-semibold px-3 py-2 text-[#1C222E] focus:outline-none focus:border-[#F26522]"
                  >
                    <option value="12">Show 12</option>
                    <option value="24">Show 24</option>
                    <option value="36">Show 36</option>
                  </select>
                </div>

              </div>

              {/* Products Display Grid */}
              {paginatedBooks.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                  <p className="text-base font-bold text-[#1C222E]">No books found matching criteria</p>
                  <p className="text-xs text-gray-400 mt-1">Try resetting filters to view full catalog.</p>
                  <button
                    onClick={() => {
                      setSelectedGenres([]);
                      setSelectedAuthors([]);
                      setAppliedMinPrice(50);
                      setAppliedMaxPrice(1000);
                      setSelectedRating(null);
                    }}
                    className="mt-4 px-6 py-2.5 bg-[#F26522] text-white text-xs font-bold rounded-full"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                  {paginatedBooks.map((book) => {
                    const isWish = isInWishlist(book.id);
                    return (
                      <div
                        key={book.id}
                        className="group relative flex flex-col justify-between"
                      >
                        <div>
                          {/* Book Cover with Signature Rounded-2xl and Right Floating Actions */}
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
                            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleWishlist(book);
                                }}
                                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-[0_3px_12px_rgba(0,0,0,0.14)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
                                  isWish ? 'text-[#F26522]' : 'text-gray-800 hover:text-[#F26522]'
                                }`}
                                title={isWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                aria-label="Wishlist"
                              >
                                <Heart className={`w-4 h-4 ${isWish ? 'fill-[#F26522] text-[#F26522]' : 'stroke-[2]'}`} />
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
                          {book.priceRange ? book.priceRange : `$${book.price.toFixed(2)}`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Pagination Bar */}
              <div className="pt-8 flex items-center justify-center gap-2">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-full font-extrabold text-xs flex items-center justify-center transition-all ${
                      currentPage === page
                        ? 'bg-[#F26522] text-white shadow-md'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-[#F26522] hover:text-[#F26522]'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage >= totalPages}
                  className="px-4 h-9 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-[#F26522] hover:text-[#F26522] text-[11px] font-black uppercase tracking-wider flex items-center gap-1 transition-all disabled:opacity-40"
                >
                  <span>NEXT</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </PageTransition>
  );
};
