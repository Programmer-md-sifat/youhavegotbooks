import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightSvg } from '../Common/SvgIcons';
import { heroSlidesData } from '../../Data/HomeData';
import { useCartWishlist } from '../../Context/CartWishlistContext';
import { Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const HeroSection: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slide = heroSlidesData[currentSlideIndex];
  const { addToCart, setQuickViewBook } = useCartWishlist();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#FAF9F6] to-[#FFFFFF]">
      {/* Subtle architectural ambient background glow */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-50/50 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content Column (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Massive Display Heading */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={slide.titlePrefix}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold text-[#1C222E] tracking-tight leading-[1.08]"
              >
                {slide.titlePrefix}{' '}
                <span className="block sm:inline text-[#F26522]">
                  {slide.titleHighlight}
                </span>
              </motion.h1>
            </AnimatePresence>

            {/* Description Paragraph */}
            <AnimatePresence mode="wait">
              <motion.p
                key={slide.description}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl"
              >
                {slide.description}
              </motion.p>
            </AnimatePresence>

            {/* Price & Discount Row */}
            <div className="flex items-center flex-wrap gap-3 sm:gap-4 pt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#F26522] tracking-tight">
                ${slide.price.toFixed(2)}
              </span>
              <span className="text-lg sm:text-xl font-medium text-gray-400 line-through">
                ${slide.originalPrice.toFixed(2)}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] font-bold text-xs uppercase tracking-wider">
                SAVE {slide.discountPercentage}% OFF
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/books"
                id="hero-shop-collection-btn"
                className="px-8 py-4 rounded-full bg-[#F26522] hover:bg-[#E05312] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-[#F26522]/30 hover:shadow-xl hover:shadow-[#F26522]/40 active:scale-98 flex items-center gap-3 cursor-pointer group"
              >
                <span>SHOP COLLECTION</span>
                <div className="transition-transform group-hover:translate-x-1">
                  <ArrowRightSvg stroke="#FFFFFF" className="w-5 h-5" />
                </div>
              </Link>

              <Link
                to="/books"
                id="hero-explore-genres-btn"
                className="px-8 py-4 rounded-full border-2 border-[#E2E8F0] bg-white hover:border-[#F26522] hover:text-[#F26522] text-[#1C222E] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-sm hover:shadow active:scale-98 cursor-pointer"
              >
                EXPLORE GENRES
              </Link>
            </div>
          </div>

          {/* Right Visual Column (5 cols on lg) - Matches the exact dual book design */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* The Book Display Stage */}
            <div className="relative w-full max-w-md h-[460px] sm:h-[500px] flex items-center justify-center">
              {/* Back Book (Tilted at subtle angle, classical cover) */}
              <motion.div
                key={`secondary-${slide.secondaryBook.title}`}
                initial={{ opacity: 0, rotate: -12, x: -30 }}
                animate={{ opacity: 1, rotate: -7, x: -45, y: -10 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute z-10 w-[210px] sm:w-[240px] h-[310px] sm:h-[350px] rounded-r-xl rounded-l-sm shadow-2xl overflow-hidden bg-slate-900 border border-slate-700 cursor-pointer group"
                onClick={() =>
                  setQuickViewBook({
                    id: 'hero-secondary',
                    title: slide.secondaryBook.title,
                    author: slide.secondaryBook.author,
                    coverImage: slide.secondaryBook.coverUrl,
                    price: 19.99,
                    rating: 4.85,
                    reviewsCount: 4200,
                    genre: slide.secondaryBook.genre,
                    synopsis: 'A mesmerizing exploration of boundless rooms and oceanic tides.',
                    format: ['Hardcover', 'Paperback'],
                    inStock: true,
                    pages: 272,
                    publishYear: 2024,
                  })
                }
              >
                <img
                  src={slide.secondaryBook.coverUrl}
                  alt={slide.secondaryBook.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Book spine simulation overlay */}
                <div className="absolute top-0 left-0 bottom-0 w-4 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <span className="text-[10px] tracking-widest uppercase font-bold text-amber-300/90 block">
                    {slide.secondaryBook.author}
                  </span>
                  <h4 className="text-sm font-extrabold text-white leading-tight">
                    {slide.secondaryBook.title}
                  </h4>
                </div>
              </motion.div>

              {/* Front Book (Hero prominent 3D book mockup with cosmic galaxy artwork & gold badge) */}
              <motion.div
                key={`primary-${slide.primaryBook.title}`}
                initial={{ opacity: 0, rotate: 6, x: 20 }}
                animate={{ opacity: 1, rotate: 3, x: 35, y: 15 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute z-20 w-[230px] sm:w-[260px] h-[340px] sm:h-[390px] rounded-r-2xl rounded-l-sm shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] overflow-visible bg-neutral-900 border-2 border-amber-900/40 cursor-pointer group"
                onClick={() =>
                  setQuickViewBook({
                    id: 'hero-primary',
                    title: slide.primaryBook.title,
                    author: slide.primaryBook.author,
                    coverImage: slide.primaryBook.coverUrl,
                    price: slide.price,
                    originalPrice: slide.originalPrice,
                    rating: 4.9,
                    reviewsCount: 3840,
                    genre: slide.primaryBook.genre,
                    synopsis: slide.description,
                    format: ['Hardcover', 'Paperback', 'E-Book'],
                    inStock: true,
                    pages: 542,
                    publishYear: 2025,
                  })
                }
              >
                {/* Floating Gold Circular Badge (e.g. #1 BEST SELLER) */}
                <div className="absolute -top-4 -right-4 z-30 bg-[#F59E0B] text-[#1C222E] rounded-full w-14 h-14 sm:w-16 sm:h-16 flex flex-col items-center justify-center text-center shadow-lg border-2 border-white ring-2 ring-[#F59E0B]/30 animate-bounce duration-1000">
                  <Star className="w-3.5 h-3.5 fill-[#1C222E] text-[#1C222E]" />
                  <span className="text-[9px] sm:text-[10px] font-black uppercase leading-none mt-0.5 tracking-tight">
                    #1 BEST
                    <br />
                    SELLER
                  </span>
                </div>

                {/* Inner Book Cover */}
                <div className="w-full h-full rounded-r-2xl overflow-hidden relative">
                  <img
                    src={slide.primaryBook.coverUrl}
                    alt={slide.primaryBook.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle 3D book spine highlight line */}
                  <div className="absolute top-0 left-0 bottom-0 w-5 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
                  <div className="absolute top-0 right-0 bottom-0 w-2 bg-gradient-to-l from-amber-400/20 to-transparent" />

                  {/* Title overlay on book mockup */}
                  <div className="absolute inset-0 flex flex-col justify-between p-5 bg-gradient-to-t from-black/90 via-transparent to-black/30">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] tracking-widest uppercase font-bold text-amber-400 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
                        {slide.primaryBook.genre}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-black text-white tracking-wide uppercase drop-shadow-md">
                        {slide.primaryBook.title}
                      </h3>
                      <p className="text-[11px] font-bold text-amber-200/90 tracking-wider uppercase mt-0.5">
                        {slide.primaryBook.author}
                      </p>
                      <span className="text-[10px] text-gray-300 block mt-1">THE SAGA BEGINS</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Curator's Note Card (Matches image position & appearance) */}
              <motion.div
                key={`curator-${slide.curatorNote}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -bottom-4 -left-2 sm:left-2 z-30 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-4 max-w-[230px] sm:max-w-[250px]"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#1C222E]">
                    CURATOR&apos;S NOTE
                  </span>
                </div>
                <p className="text-xs text-[#64748B] italic mt-1.5 leading-snug">
                  &ldquo;{slide.curatorNote}&rdquo;
                </p>
              </motion.div>
            </div>

            {/* Interactive Slider Pagination Dots (Underneath the book visual as in image) */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {heroSlidesData.map((_, index) => {
                const isActive = index === currentSlideIndex;
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentSlideIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'w-7 h-2 bg-[#F26522] rounded-full'
                        : 'w-2 h-2 bg-[#E2E8F0] hover:bg-gray-400 rounded-full'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
