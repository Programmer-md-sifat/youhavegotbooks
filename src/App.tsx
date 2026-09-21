import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartWishlistProvider, useCartWishlist } from './Context/CartWishlistContext';
import { SmoothScroll } from './Components/Common/SmoothScroll';
import { Navbar } from './Components/Common/Navbar';
import { Footer } from './Components/Common/Footer';
import { CartDrawer } from './Components/Common/CartDrawer';
import { QuickViewModal } from './Components/Common/QuickViewModal';
import { HomePage } from './Page/HomePage';
import { BooksPage } from './Page/BooksPage';
import { BookDetailPage } from './Page/BookDetailPage';
import { CartPage } from './Page/CartPage';
import { WishlistPage } from './Page/WishlistPage';
import { SellerPage } from './Page/SellerPage';
import { BlogPage } from './Page/BlogPage';
import { ContactPage } from './Page/ContactPage';
import { CheckCircle2 } from 'lucide-react';

const ToastNotification: React.FC = () => {
  const { toastMessage } = useCartWishlist();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#1C222E] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <CheckCircle2 className="w-5 h-5 text-[#F26522] flex-shrink-0" />
      <span className="text-xs font-semibold">{toastMessage}</span>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <CartWishlistProvider>
        <SmoothScroll>
          <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#28303F] selection:bg-[#F26522] selection:text-white">
            {/* Header / Navbar */}
            <Navbar />

            {/* Main Content Pages */}
            <div className="flex-1 w-full">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<BooksPage />} />
                <Route path="/books/:id" element={<BookDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/seller" element={<SellerPage />} />
                <Route path="/vendor" element={<SellerPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </div>

            {/* Footer */}
            <Footer />

            {/* Slide-out Cart Drawer */}
            <CartDrawer />

            {/* Quick View Book Modal */}
            <QuickViewModal />

            {/* Floating Toast Notification */}
            <ToastNotification />
          </div>
        </SmoothScroll>
      </CartWishlistProvider>
    </BrowserRouter>
  );
}
