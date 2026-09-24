import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './logo';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const PinterestIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#181D27] text-white pt-16 pb-8 border-t border-gray-800/80" id="main-footer">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Main 5-Column Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-14">
          
          {/* Column 1: Logo, Call Support & Social Icons */}
          <div className="lg:col-span-3 space-y-5">
            <div className="flex items-center">
              <Logo variant="dark" showText={true} />
            </div>

            <div className="pt-2">
              <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                GOT QUESTIONS? CALL US 24/7!
              </p>
              <div className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-[#F26522] tracking-tight mt-1">
                (+1) – 1800 – 4635
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#252C3B] hover:bg-[#F26522] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <Facebook className="w-4 h-4 fill-current stroke-none" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-[#252C3B] hover:bg-[#F26522] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <Twitter className="w-4 h-4 fill-current stroke-none" />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#252C3B] hover:bg-[#F26522] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#pinterest"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-full bg-[#252C3B] hover:bg-[#F26522] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                <PinterestIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: CONTACT INFO */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider uppercase mb-4">
              CONTACT INFO
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400 leading-relaxed font-medium">
              <p>1418 River Drive, Suite 35</p>
              <p>Cottonhall, CA 96122</p>
              <p className="pt-1">Monday – Friday: 9:00 – 20:00</p>
              <p>Saturday: 11:00 – 15:00</p>
              <p className="pt-1">
                <a
                  href="mailto:contact@example.com"
                  className="text-gray-300 hover:text-[#F26522] transition-colors font-semibold"
                >
                  contact@example.com
                </a>
              </p>
            </div>
          </div>

          {/* Column 3: COMPANY */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider uppercase mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li>
                <Link to="/about" className="hover:text-[#F26522] transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <span className="hover:text-[#F26522] cursor-pointer transition-colors">
                  Delivery Information
                </span>
              </li>
              <li>
                <span className="hover:text-[#F26522] cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#F26522] cursor-pointer transition-colors">
                  Terms & Conditions
                </span>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F26522] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <span className="hover:text-[#F26522] cursor-pointer transition-colors">
                  Support Center
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: CORPORATE */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider uppercase mb-4">
              CORPORATE
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li>
                <Link to="/store" className="hover:text-[#F26522] transition-colors">
                  Store Directory
                </Link>
              </li>
              <li>
                <span className="hover:text-[#F26522] cursor-pointer transition-colors">
                  Affiliate Program
                </span>
              </li>
              <li>
                <span className="hover:text-[#F26522] cursor-pointer transition-colors">
                  Our Suppliers
                </span>
              </li>
              <li>
                <span className="hover:text-[#F26522] cursor-pointer transition-colors">
                  Accessibility
                </span>
              </li>
              <li>
                <span className="hover:text-[#F26522] cursor-pointer transition-colors">
                  Promotions
                </span>
              </li>
              <li>
                <span className="hover:text-[#F26522] cursor-pointer transition-colors">
                  Careers
                </span>
              </li>
            </ul>
          </div>

          {/* Column 5: OUR SERVICE */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-extrabold text-white tracking-wider uppercase mb-4">
              OUR SERVICE
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li>
                <span className="hover:text-[#F26522] cursor-pointer transition-colors">
                  Help Center
                </span>
              </li>
              <li>
                <span className="hover:text-[#F26522] cursor-pointer transition-colors">
                  Returns
                </span>
              </li>
              <li>
                <span className="hover:text-[#F26522] cursor-pointer transition-colors">
                  Product Recalls
                </span>
              </li>
              <li>
                <span className="hover:text-[#F26522] cursor-pointer transition-colors">
                  Accessibility
                </span>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F26522] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <span className="hover:text-[#F26522] cursor-pointer transition-colors">
                  Store Pickup
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-6 border-t border-[#252C3B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <p>© 2026 <strong className="text-gray-300 font-bold">Lunar Books</strong>. All Right Reserved Md. Sifat</p>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-2">
            {/* MasterCard */}
            <div className="bg-[#252C3B] border border-gray-700/60 px-3 py-1.5 rounded-md flex items-center justify-center hover:border-gray-500 transition-colors" title="MasterCard">
              <svg className="h-5 w-auto" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="12" r="7" fill="#EB001B"/>
                <circle cx="24" cy="12" r="7" fill="#F79E1B"/>
                <path d="M19 6.8C20.5 8.16 21.5 10.13 21.5 12.3C21.5 14.47 20.5 16.44 19 17.8C17.5 16.44 16.5 14.47 16.5 12.3C16.5 10.13 17.5 8.16 19 6.8Z" fill="#FF5F00"/>
              </svg>
            </div>

            {/* PayPal */}
            <div className="bg-[#252C3B] border border-gray-700/60 px-3 py-1.5 rounded-md flex items-center justify-center hover:border-gray-500 transition-colors" title="PayPal">
              <svg className="h-5 w-auto" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18L13.5 8.5H17.8C19.8 8.5 21 9.4 20.6 11.2C20.2 12.9 18.8 14.1 16.8 14.1H14.5L13.9 18H12Z" fill="#003087"/>
                <path d="M14.5 16L15.6 8.5H19.5C21.3 8.5 22.3 9.4 22 11.2C21.6 12.9 20.3 14.1 18.4 14.1H16.3L15.7 18H14.2" fill="#0079C1"/>
              </svg>
            </div>

            {/* AMEX */}
            <div className="bg-[#006FCF] px-2.5 py-1.5 rounded-md flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity" title="American Express">
              <span className="text-[10px] font-black text-white tracking-widest leading-none font-mono">AMEX</span>
            </div>

            {/* Discover */}
            <div className="bg-[#252C3B] border border-gray-700/60 px-2.5 py-1.5 rounded-md flex items-center justify-center hover:border-gray-500 transition-colors" title="Discover">
              <div className="flex items-center text-[10px] font-black tracking-wider text-white">
                <span>DISC</span>
                <span className="w-2 h-2 rounded-full bg-[#FF6000] inline-block mx-0.5"></span>
                <span>VER</span>
              </div>
            </div>

            {/* VISA */}
            <div className="bg-[#252C3B] border border-gray-700/60 px-3 py-1.5 rounded-md flex items-center justify-center hover:border-gray-500 transition-colors" title="VISA">
              <span className="text-xs font-black italic tracking-widest text-[#2563EB]">VI<span className="text-[#F59E0B]">SA</span></span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
