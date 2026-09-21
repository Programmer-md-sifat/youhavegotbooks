import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  imageClassName?: string;
  showText?: boolean;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({
  className = "flex items-center gap-2",
  imageClassName,
  showText = false,
  variant = 'light',
}) => {
  const defaultImageClass = imageClassName 
    ? imageClassName 
    : (variant === 'dark' ? "h-12 sm:h-14 w-auto object-contain" : "h-16 sm:h-20 md:h-24 max-h-[80px] w-auto object-contain");

  return (
    <Link to="/" className={`group inline-flex items-center ${className}`} id="brand-logo-link">
      <div 
        className={`transition-transform group-hover:scale-105 duration-300 flex items-center ${
          variant === 'dark' ? 'bg-white px-3 py-1.5 rounded-xl shadow-sm' : ''
        }`}
      >
        <img
          src="/logo.png"
          alt="LunarBooks Logo"
          className={defaultImageClass}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://lh3.googleusercontent.com/d/1OTZUacOwEJnahxoOHgEaxPbY4i6Yit2q';
          }}
        />
      </div>
      {showText && (
        <span
          className={`text-2xl sm:text-[26px] font-extrabold tracking-tight ${
            variant === 'dark' ? 'text-white' : 'text-[#1C222E]'
          }`}
        >
          Lunar<span className="text-[#F26522]">Books</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
