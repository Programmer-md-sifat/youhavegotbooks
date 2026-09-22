import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
} from 'lucide-react';

interface SlideContent {
  id: string;
  titleLead: string;
  titleHighlight: string;
  titleEnd: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  bgImage: string;
  fallbackImage: string;
}

const slides: SlideContent[] = [
  {
    id: 'slide-1',
    titleLead: 'Discover Stories That',
    titleHighlight: 'Inspire Your Soul',
    titleEnd: '& Broaden Your World',
    description: 'Explore over 50,000+ bestselling books, award-winning novels, and timeless classics with fast worldwide delivery.',
    primaryBtnText: 'EXPLORE BESTSELLERS',
    primaryBtnLink: '/books',
    secondaryBtnText: 'VIEW ALL GENRES',
    secondaryBtnLink: '/books',
    bgImage: '/images/hero/slide1-library.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'slide-2',
    titleLead: 'Unlock Up To 50% Off On',
    titleHighlight: 'Award-Winning Novels',
    titleEnd: '& Box Sets',
    description: 'Grab thrilling mysteries, epic fantasies, and life-changing self-growth books at half price today only.',
    primaryBtnText: 'CLAIM 50% DISCOUNT',
    primaryBtnLink: '/books',
    secondaryBtnText: 'BROWSE DEALS',
    secondaryBtnLink: '/books',
    bgImage: '/images/hero/slide2-pages.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'slide-3',
    titleLead: 'Listen & Read Anywhere with',
    titleHighlight: 'Unlimited Access',
    titleEnd: 'To 15,000+ Titles',
    description: 'Immerse yourself in world-class narrations and digital editions. Enjoy a 30-day free trial on us.',
    primaryBtnText: 'START 30-DAY FREE TRIAL',
    primaryBtnLink: '/books',
    secondaryBtnText: 'EXPLORE AUDIOBOOKS',
    secondaryBtnLink: '/books',
    bgImage: '/images/hero/slide3-books.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'slide-4',
    titleLead: 'Build An Heirloom Library of',
    titleHighlight: 'Rare Signed Hardcovers',
    titleEnd: '& First Editions',
    description: 'Cherish luxury leather bindings, gold-embossed covers, and authentic author signatures for your personal bookshelf.',
    primaryBtnText: 'SHOP COLLECTOR EDITIONS',
    primaryBtnLink: '/books',
    secondaryBtnText: 'MEET OUR AUTHORS',
    secondaryBtnLink: '/authors',
    bgImage: '/images/hero/slide4-vintage.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=2000&q=85',
  },
];

export const HeroSection: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const SLIDE_DURATION = 3000; // Exact 3 seconds per slide

  // Preload all 4 background images so transitions are instant
  useEffect(() => {
    slides.forEach((slide) => {
      const img1 = new Image();
      img1.src = slide.bgImage;
      const img2 = new Image();
      img2.src = slide.fallbackImage;
    });
  }, []);

  // Automatic slide rotation every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Ambient Floating Gold Book Dust Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool for ambient floating library dust/pages
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.03;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242, 101, 34, ${currentOpacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(242, 101, 34, 0.8)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const activeSlide = slides[currentSlideIndex];

  return (
    <section
      id="hero-video-section"
      className="relative w-full min-h-[600px] sm:min-h-[660px] lg:min-h-[740px] flex items-center justify-center overflow-hidden bg-slate-950 text-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Cinematic Ken Burns Motion Background Layer (All 4 Slides Have Book Scenes in Continuous Motion) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{
              opacity: 0.92,
              scale: 1.15,
              transition: {
                opacity: { duration: 0.9 },
                scale: { duration: 6, ease: 'easeOut' },
              },
            }}
            exit={{ opacity: 0, transition: { duration: 0.9 } }}
            className="absolute inset-0 w-full h-full bg-cover bg-center filter brightness-90 saturate-110"
            style={{
              backgroundImage: `url(${activeSlide.bgImage}), url(${activeSlide.fallbackImage})`,
            }}
          />
        </AnimatePresence>
      </div>

      {/* 2. LAYER C: Interactive Floating Dust & Book Atmosphere Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      />

      {/* 3. LAYER D: Soft Transparent Cinematic Gradient Overlays */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/60 pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-slate-950/75 via-transparent to-slate-950/75 pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,rgba(242,101,34,0.18)_0%,transparent_65%)] pointer-events-none" />

      {/* 4. Centered Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-20 flex flex-col items-center text-center">

        {/* Dynamic Animated Headline (Centered in Middle) */}
        <div className="min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={activeSlide.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.12] drop-shadow-2xl max-w-4xl"
            >
              {activeSlide.titleLead}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7E40] via-[#F26522] to-[#FFAC80]">
                {activeSlide.titleHighlight}
              </span>{' '}
              {activeSlide.titleEnd}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Dynamic Animated Description (Centered in Middle) */}
        <div className="min-h-[60px] sm:min-h-[70px] flex items-center justify-center mt-3 sm:mt-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeSlide.description}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="text-base sm:text-lg lg:text-xl text-gray-100 font-normal leading-relaxed max-w-2xl drop-shadow-lg"
            >
              {activeSlide.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Centered CTA Action Buttons */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.primaryBtnText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-8 sm:mt-10"
          >
            <Link
              to={activeSlide.primaryBtnLink}
              className="px-8 sm:px-10 py-4 rounded-full bg-[#F26522] hover:bg-[#d85416] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-[#F26522]/50 hover:shadow-[#F26522]/70 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 group cursor-pointer"
            >
              <span>{activeSlide.primaryBtnText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </Link>

            <Link
              to={activeSlide.secondaryBtnLink}
              className="px-7 sm:px-9 py-4 rounded-full bg-black/50 hover:bg-white text-white hover:text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md border border-white/25 hover:border-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {activeSlide.secondaryBtnText}
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* 3-Second Slider Progress Indicators */}
        <div className="flex items-center justify-center mt-12 sm:mt-14">
          {/* Dots / Progress Bars */}
          <div className="flex items-center gap-2.5">
            {slides.map((slide, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className="relative h-2 rounded-full overflow-hidden transition-all duration-300 cursor-pointer group"
                  style={{ width: isActive ? '36px' : '10px' }}
                >
                  <div className="absolute inset-0 bg-white/30 rounded-full" />
                  {isActive && (
                    <motion.div
                      key={currentSlideIndex}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{
                        duration: isPaused ? 0 : SLIDE_DURATION / 1000,
                        ease: 'linear',
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-[#F26522] to-amber-400 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
