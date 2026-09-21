import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  stroke?: string;
}

export const MenuSvg: React.FC<IconProps> = ({ className = "w-6 h-6", stroke = "currentColor", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

export const SearchSvg: React.FC<IconProps> = ({ className = "w-6 h-6", stroke = "currentColor", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const UserSvg: React.FC<IconProps> = ({ className = "w-6 h-6", stroke = "currentColor", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const FavouriteSvg: React.FC<IconProps> = ({ className = "w-6 h-6", stroke = "currentColor", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export const CartSvg: React.FC<IconProps> = ({ className = "w-6 h-6", stroke = "currentColor", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

export const BookLogoSvg: React.FC<IconProps> = ({ className = "w-8 h-8", ...props }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="40" height="40" rx="10" fill="#F26522" />
    <path d="M12 28V12C12 12 15 10 20 10C25 10 28 12 28 12V28C28 28 25 26 20 26C15 26 12 28 12 28Z" fill="white" />
    <path d="M20 10V26" stroke="#F26522" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ArrowRightSvg: React.FC<IconProps> = ({ className = "w-5 h-5", stroke = "currentColor", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const EyeSvg: React.FC<IconProps> = ({ className = "w-5 h-5", stroke = "currentColor", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M21.1303 9.8531C22.2899 11.0732 22.2899 12.9268 21.1303 14.1469C19.1745 16.2047 15.8155 19 12 19C8.18448 19 4.82549 16.2047 2.86971 14.1469C1.7101 12.9268 1.7101 11.0732 2.86971 9.8531C4.82549 7.79533 8.18448 5 12 5C15.8155 5 19.1745 7.79533 21.1303 9.8531Z" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
