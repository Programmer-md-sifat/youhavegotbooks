import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  imageClassName?: string;
  showText?: boolean;
  variant?: 'light' | 'dark' | 'navbar' | 'footer';
}

export const Logo: React.FC<LogoProps> = ({
  className = 'flex items-center gap-2',
  imageClassName,
  showText = false,
  variant = 'light',
}) => {
  const isFooter = variant === 'dark' || variant === 'footer';

  const defaultImageClass = imageClassName
    ? imageClassName
    : isFooter
    ? 'h-10 sm:h-11 md:h-12 max-h-[50px] w-auto object-contain'
    : 'h-8 sm:h-9 md:h-10 lg:h-11 max-h-[46px] w-auto object-contain';

  return (
    <Link
      to="/"
      className={`group inline-flex items-center flex-shrink-0 ${className}`}
      id="brand-logo-link"
      aria-label="LunarBooks Home"
    >
      <div
        className={`transition-transform duration-300 group-hover:scale-[1.02] flex items-center ${
          isFooter ? 'bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-2xl shadow-sm border border-white/20' : ''
        }`}
      >
        <img
          src={isFooter ? '/footer-logo.png' : '/navbar-logo.png'}
          alt="LunarBooks Logo"
          className={defaultImageClass}
          loading="eager"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://lh3.googleusercontent.com/d/1KC5IxXsLC9NBqAM95DsOeauQe_xLdze4';
          }}
        />
      </div>
      {showText && (
        <span
          className={`text-2xl sm:text-[26px] font-extrabold tracking-tight ${
            isFooter ? 'text-white' : 'text-[#1C222E]'
          }`}
        >
          Lunar<span className="text-[#F26522]">Books</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;

