import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PageTransition } from '../Components/Common/PageTransition';
import { allBooksCatalog } from '../Data/BooksData';
import { useCartWishlist } from '../Context/CartWishlistContext';
import { BookItem } from '../Data/HomeData';
import {
  Star,
  Heart,
  ShoppingBag,
  Search,
  Minus,
  Plus,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Sparkles,
  Share2,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

interface RelatedProduct {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  rating: number;
  price: string;
  numericPrice: number;
  genre: string;
}

const defaultRelatedProducts: RelatedProduct[] = [
  {
    id: 'rel-1',
    title: 'Mask of Death',
    author: 'Jessica Munoz',
    coverImage: '/images/books/scars.jpg',
    rating: 5,
    price: '$906.29',
    numericPrice: 906.29,
    genre: 'Mystery & Thriller',
  },
  {
    id: 'rel-2',
    title: 'Life Flight',
    author: 'Misty Figueroa',
    coverImage: '/images/books/felix.jpg',
    rating: 5,
    price: '$115.72',
    numericPrice: 115.72,
    genre: 'Contemporary Fiction',
  },
  {
    id: 'rel-3',
    title: 'Treachery: Alpha Colony',
    author: 'Jessica Munoz',
    coverImage: '/images/books/ring-shout.jpg',
    rating: 5,
    price: '$814.66',
    numericPrice: 814.66,
    genre: 'Sci-Fi & Fantasy',
  },
  {
    id: 'rel-4',
    title: 'The Good Egg',
    author: 'Arthur Gonzalez',
    coverImage: '/images/books/helium.jpg',
    rating: 5,
    price: '$289.38',
    numericPrice: 289.38,
    genre: 'Humor & Philosophy',
  },
  {
    id: 'rel-5',
    title: 'P.S. Never in a Million...',
    author: 'Marcella Bennett',
    coverImage: '/images/books/certain-hunger.jpg',
    rating: 5,
    price: '$664.55–$906.29',
    numericPrice: 664.55,
    genre: 'Romance & Fiction',
  },
  {
    id: 'rel-6',
    title: 'Kemp: Warriors in the...',
    author: 'Randal Adkins',
    coverImage: '/images/books/each-of-us-a-desert.jpg',
    rating: 5,
    price: '$185.28',
    numericPrice: 185.28,
    genre: 'Historical Adventure',
  },
];

export const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCartWishlist();

  // Find book or default with full metadata support
  const book: BookItem = useMemo(() => {
    const found = allBooksCatalog.find((b) => b.id === id);
    if (found) return found;

    const foundRelated = defaultRelatedProducts.find((r) => r.id === id);
    if (foundRelated) {
      return {
        id: foundRelated.id,
        title: foundRelated.title,
        author: foundRelated.author,
        coverImage: foundRelated.coverImage,
        price: foundRelated.numericPrice,
        rating: foundRelated.rating,
        reviewsCount: 5,
        genre: foundRelated.genre,
        badge: 'POPULAR',
        format: ['E-book', 'Hardcopy'],
        synopsis: 'Nihil quo dolorum debitis velit qui et inventore. Delectus aut occaecati sunt mollitia illo. Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur et ea.',
        pages: 320,
        publishYear: 2025,
        inStock: true,
      };
    }

    return allBooksCatalog[0];
  }, [id]);

  // Gallery Images (main cover + 2 alternates)
  const galleryImages = useMemo(() => {
    const mainImg = book.coverImage || '/images/books/over-the-woodward-wall.jpg';
    return [
      mainImg,
      '/images/books/ring-shout.jpg',
      '/images/books/over-the-woodward-wall.jpg',
    ];
  }, [book]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<'E-book' | 'Hardcopy'>('Hardcopy');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'additional' | 'reviews'>('description');
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Reset scroll when book changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
    setQuantity(1);
    setSelectedFormat('Hardcopy');
  }, [id]);

  // Keyboard controls for zoom lightbox (Escape to close, Left/Right arrows to navigate)
  useEffect(() => {
    if (!isZoomOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen, galleryImages.length]);

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  const isWish = isInWishlist(book.id);

  // Price calculations based on selected format
  const hardcopyPrice = book.price > 100 ? book.price : 450.00;
  const ebookPrice = book.originalPrice && book.originalPrice < hardcopyPrice ? book.originalPrice : Math.round(hardcopyPrice * 0.35);
  const currentPrice = selectedFormat === 'Hardcopy' ? hardcopyPrice : ebookPrice;
  const formattedPriceRange = `$${ebookPrice.toFixed(2)}–$${hardcopyPrice.toFixed(2)}`;

  // SKU code
  const skuCode = `INT${(book.id.replace(/[^0-9]/g, '') || '280').padStart(3, '0')}`;

  const handleAddToCart = () => {
    addToCart(
      {
        ...book,
        price: currentPrice,
      },
      selectedFormat,
      quantity
    );
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleClearFormat = () => {
    setSelectedFormat('Hardcopy');
  };

  return (
    <PageTransition>
      <div className="w-full bg-white min-h-screen pb-24 text-[#1C222E]">
        
        {/* 1. Breadcrumb Top Bar matching screenshot: HOME  →  ACTION & ADVENTURE  →  ANNIE LEIBOVITZ: WONDERLAND */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-8 pb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            <Link to="/" className="hover:text-gray-700 transition-colors">
              HOME
            </Link>
            <span className="text-gray-300">→</span>
            <Link
              to={`/books?genre=${encodeURIComponent(book.genre || 'Action & Adventure')}`}
              className="hover:text-gray-700 transition-colors"
            >
              {book.genre ? book.genre.toUpperCase() : 'ACTION & ADVENTURE'}
            </Link>
            <span className="text-gray-300">→</span>
            <span className="text-[#F26522] font-black truncate max-w-md">
              {book.title.toUpperCase()}
            </span>
          </div>
        </div>

        {/* 2. Main Product Showcase Container */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-[0_2px_24px_rgba(0,0,0,0.03)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              
              {/* LEFT: Image Gallery with 3 Vertical Thumbnails + Main View */}
              <div className="lg:col-span-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
                
                {/* 3 Vertical Thumbnails Strip on Left */}
                <div className="flex sm:flex-col gap-3 order-2 sm:order-1 flex-shrink-0">
                  {galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 sm:w-20 aspect-[3/4.2] rounded-xl overflow-hidden bg-gray-50 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'ring-2 ring-[#F26522] shadow-md scale-105'
                          : 'border border-gray-200 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${book.title} thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Large Book Cover */}
                <div className="relative flex-1 w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#F9FAFB] border border-gray-100 shadow-sm flex items-center justify-center order-1 sm:order-2 group">
                  <img
                    src={galleryImages[activeImageIndex]}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out cursor-zoom-in"
                    onClick={() => setIsZoomOpen(true)}
                  />

                  {/* Zoom Magnifier Icon on Top Right (Matches Screenshot) */}
                  <button
                    type="button"
                    onClick={() => setIsZoomOpen(true)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-black shadow-md flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 cursor-pointer"
                    aria-label="Zoom image"
                    title="Click to Zoom"
                  >
                    <Search className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

              </div>

              {/* RIGHT: Product Details & Purchase Form */}
              <div className="lg:col-span-6 space-y-5">
                
                {/* Product Title */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
                  {book.title}
                </h1>

                {/* Meta line: Author | Stars 5 | SKU: INT280 */}
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 font-medium">
                  <div>
                    Author: <span className="text-gray-900 font-bold">{book.author}</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < 4
                              ? 'fill-[#F59E0B] text-[#F59E0B]'
                              : 'fill-none text-gray-300 stroke-[1.5]'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-800 font-bold ml-1">5</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <div>
                    SKU: <span className="text-gray-700 font-semibold">{skuCode}</span>
                  </div>
                </div>

                <div className="border-b border-gray-100 pt-2" />

                {/* Price Range */}
                <div className="text-2xl sm:text-3xl font-extrabold text-[#F26522] tracking-tight">
                  {formattedPriceRange}
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {book.synopsis ||
                    'Nihil quo dolorum debitis velit qui et inventore. Delectus aut occaecati sunt mollitia illo. Odio velit mollitia ipsam explicabo nisi quisquam dolore non. Rem omnis consectetur et ea.'}
                </p>

                {/* Select Format: ONLY TWO OPTIONS (E-book and Hardcopy as requested) */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold text-gray-600">
                    Select Format : <span className="font-extrabold text-[#111827]">{selectedFormat}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* E-book Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedFormat('E-book')}
                      className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedFormat === 'E-book'
                          ? 'border-2 border-[#F26522] text-[#F26522] bg-[#FFF7ED] shadow-xs'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-transparent'
                      }`}
                    >
                      EBOOK
                    </button>

                    {/* Hardcopy Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedFormat('Hardcopy')}
                      className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedFormat === 'Hardcopy'
                          ? 'border-2 border-[#F26522] text-[#F26522] bg-[#FFF7ED] shadow-xs'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-transparent'
                      }`}
                    >
                      HARDCOPY
                    </button>

                    {/* Clear Button */}
                    <button
                      type="button"
                      onClick={handleClearFormat}
                      className="text-xs font-semibold text-gray-400 hover:text-gray-700 underline transition-colors ml-2 cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Active Format Price */}
                <div className="text-2xl sm:text-3xl font-extrabold text-[#F26522] tracking-tight pt-1">
                  ${currentPrice.toFixed(2)}
                </div>

                {/* Quantity & Add to Cart & Wishlist Row */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  
                  {/* Quantity Stepper: [- 1 +] */}
                  <div className="flex items-center border border-gray-200 rounded-full bg-white px-3 py-1.5 shadow-xs">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-[#111827]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart Orange Button with Bag Icon */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 sm:flex-initial px-8 py-3.5 bg-[#F26522] hover:bg-[#E05312] active:scale-95 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-md shadow-[#F26522]/25 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to cart</span>
                  </button>

                  {/* Add to Wishlist Link/Button with Heart */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(book)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#F26522] transition-colors cursor-pointer px-2 py-1"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWish ? 'fill-[#F26522] text-[#F26522]' : 'stroke-[2]'
                      }`}
                    />
                    <span>{isWish ? 'Added to wishlist' : 'Add to wishlist'}</span>
                  </button>

                </div>

                {/* Toast alert on Add */}
                {addedToast && (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Added {quantity} × &quot;{book.title}&quot; ({selectedFormat}) to your shopping cart!</span>
                  </div>
                )}

                <div className="border-b border-gray-100 pt-4" />

                {/* Categories & Tags Metadata */}
                <div className="space-y-1.5 text-xs text-gray-500 pt-1">
                  <div>
                    <span className="font-bold text-gray-700">Categories: </span>
                    <span className="text-gray-600">
                      {book.genre || 'Action & Adventure'}, Activity Books, Literature
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700">Tags: </span>
                    <span className="text-gray-600">
                      Books, Fiction, Romance - Contemporary, Bestseller
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* 3. Middle Tabs Section (Description, Additional information, Reviews (5)) */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 mt-16 sm:mt-20">
          
          {/* Tab Navigation Header */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 border-b border-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-sm sm:text-base font-bold transition-all relative cursor-pointer ${
                activeTab === 'description'
                  ? 'text-[#111827]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Description
              {activeTab === 'description' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F26522] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('additional')}
              className={`pb-4 text-sm sm:text-base font-bold transition-all relative cursor-pointer ${
                activeTab === 'additional'
                  ? 'text-[#111827]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Additional information
              {activeTab === 'additional' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F26522] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm sm:text-base font-bold transition-all relative cursor-pointer ${
                activeTab === 'reviews'
                  ? 'text-[#111827]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Reviews (5)
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F26522] rounded-full" />
              )}
            </button>
          </div>

          {/* Tab Content Box */}
          <div className="max-w-4xl mx-auto py-10">
            {activeTab === 'description' && (
              <div className="space-y-5 text-xs sm:text-sm text-gray-600 leading-relaxed">
                <p>
                  Aut eligendi voluptatem adipisci unde iusto. Vitae aut voluptas velit beatae at nam maiores. Sunt dolorem cumque qui sit in esse quia occaecati. Eos et vero optio eaque nemo.
                </p>
                <p>
                  Qui omnis nihil accusantium dolorum molestiae. Assumenda rem et non. Aut fugiat fugiat voluptatum vero vitae error. Sequi fugit vitae dolor velit. Nemo et sapiente repudiandae.
                </p>
                <p>
                  Quam dolorum accusantium odio amet. Commodi consequatur distinctio voluptas repellat doloribus quia. Consectetur ad similique atque voluptas ut.
                </p>
                <p>
                  Earum vel delectus in facilis. Voluptatum minus nobis cum temporibus perferendis est ut. Sed aut saepe ipsum animi asperiores. Nihil nihil repudiandae adipisci quis ea voluptatum dicta.
                </p>
              </div>
            )}

            {activeTab === 'additional' && (
              <div className="border border-gray-200 rounded-2xl overflow-hidden text-xs sm:text-sm">
                <div className="grid grid-cols-3 p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
                  <span>Weight</span>
                  <span className="col-span-2 text-gray-600">0.85 kg</span>
                </div>
                <div className="grid grid-cols-3 p-4 bg-white border-b border-gray-200 font-semibold text-gray-700">
                  <span>Dimensions</span>
                  <span className="col-span-2 text-gray-600">6.25 × 1.2 × 9.5 inches</span>
                </div>
                <div className="grid grid-cols-3 p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
                  <span>Format</span>
                  <span className="col-span-2 text-gray-600">E-book, Hardcopy</span>
                </div>
                <div className="grid grid-cols-3 p-4 bg-white border-b border-gray-200 font-semibold text-gray-700">
                  <span>Pages</span>
                  <span className="col-span-2 text-gray-600">{book.pages || 352} pages (Archival Stock)</span>
                </div>
                <div className="grid grid-cols-3 p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
                  <span>Publisher</span>
                  <span className="col-span-2 text-gray-600">LunarPress & Co. Editions ({book.publishYear || 2025})</span>
                </div>
                <div className="grid grid-cols-3 p-4 bg-white font-semibold text-gray-700">
                  <span>Language</span>
                  <span className="col-span-2 text-gray-600">English (Original Unabridged)</span>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* 5 Verified Reviews */}
                <div className="space-y-4">
                  {[
                    {
                      name: 'Clara Oswald',
                      date: 'September 18, 2025',
                      rating: 5,
                      comment:
                        'A captivating masterpiece! The narrative twists and lush prose kept me hooked from the very first chapter.',
                    },
                    {
                      name: 'Julian Vance',
                      date: 'August 24, 2025',
                      rating: 5,
                      comment:
                        'The hardcover print quality and typography are phenomenal. A true collector item on my bookshelf.',
                    },
                    {
                      name: 'Evelyn Brooks',
                      date: 'July 12, 2025',
                      rating: 5,
                      comment:
                        'Brilliant character dynamics and deep atmosphere. Fast express delivery as well.',
                    },
                  ].map((rev, i) => (
                    <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#111827]">{rev.name}</span>
                        <div className="flex items-center gap-0.5 text-[#F59E0B]">
                          {[...Array(5)].map((_, starI) => (
                            <Star
                              key={starI}
                              className={`w-3.5 h-3.5 ${
                                starI < rev.rating
                                  ? 'fill-[#F59E0B] text-[#F59E0B]'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{rev.date}</p>
                      <p className="text-xs sm:text-sm text-gray-700">{rev.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Add a review form */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
                  <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider">
                    Add a review
                  </h4>
                  <p className="text-xs text-gray-500">
                    Your email address will not be published. Required fields are marked *
                  </p>
                  <div className="flex items-center gap-1 text-[#F59E0B]">
                    <span className="text-xs font-semibold text-gray-700 mr-2">Your rating:</span>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F59E0B] cursor-pointer" />
                    ))}
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Write your review here..."
                    className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#F26522]"
                  />
                  {reviewSubmitted ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Thank you! Your review has been submitted for moderation and will appear shortly.</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setReviewSubmitted(true)}
                      className="px-6 py-2.5 bg-[#F26522] hover:bg-[#E05312] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-sm"
                    >
                      Submit Review
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* 4. Related Products Section (Bottom Row matching uploaded screenshot) */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 mt-16 sm:mt-20">
          <div className="border-t border-gray-200 pt-12">
            
            <h2 className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight mb-8">
              Related products
            </h2>

            {/* 6 Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
              {defaultRelatedProducts.map((relProduct) => (
                <div
                  key={relProduct.id}
                  onClick={() => navigate(`/book/${relProduct.id}`)}
                  className="flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Book Cover */}
                    <div className="aspect-[3/4.2] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-all duration-300 relative mb-3">
                      <img
                        src={relProduct.coverImage}
                        alt={relProduct.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    </div>

                    {/* Book Title */}
                    <h3 className="text-xs sm:text-sm font-extrabold text-[#111827] group-hover:text-[#F26522] transition-colors leading-snug line-clamp-1">
                      {relProduct.title}
                    </h3>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 my-1 text-[#F59E0B]">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < relProduct.rating
                                ? 'fill-[#F59E0B] text-[#F59E0B]'
                                : 'fill-none text-gray-300 stroke-[1.5]'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-gray-800 ml-0.5">5</span>
                    </div>

                    {/* Author */}
                    <p className="text-[11px] text-gray-400 font-medium truncate">
                      {relProduct.author}
                    </p>
                  </div>

                  {/* Price in Brand Orange */}
                  <div className="mt-2 text-xs sm:text-sm font-black text-[#F26522] tracking-tight">
                    {relProduct.price}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* 5. Image Lightbox Zoom Modal (Clean Card Design with Generous Width) */}
        {isZoomOpen && (
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
            onClick={() => setIsZoomOpen(false)}
          >
            <div
              className="relative w-full max-w-[480px] sm:max-w-[540px] md:max-w-[580px] max-h-[92vh] bg-white rounded-[28px] sm:rounded-[32px] p-4 sm:p-5 shadow-2xl overflow-hidden flex flex-col items-center gap-3.5 border border-gray-100 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating Close Button Top Right */}
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="absolute top-6 right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer z-20 shadow-md"
                aria-label="Close zoom preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main Book Image with Wide Proportions */}
              <div className="relative w-full aspect-[3/4.1] max-h-[68vh] rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center shadow-inner">
                <img
                  src={galleryImages[activeImageIndex]}
                  alt={book.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Bottom Thumbnail Strip */}
              <div className="flex items-center justify-center gap-3 pt-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 sm:w-16 aspect-[3/4.2] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#F26522] ring-2 ring-[#F26522]/30 scale-105 shadow-md'
                        : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
};
