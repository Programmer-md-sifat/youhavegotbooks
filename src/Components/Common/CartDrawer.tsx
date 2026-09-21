import React from 'react';
import { useCartWishlist } from '../../Context/CartWishlistContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    clearCart,
  } = useCartWishlist();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 50;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#F26522]" />
              <h2 className="text-lg font-bold text-[#1C222E]">
                Your Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FFF7ED] p-4 border-b border-[#FFEDD5]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-bold text-[#C2410C]">
                <Truck className="w-3.5 h-3.5 text-[#F26522]" />
                {remainingForFreeShipping > 0
                  ? `Add $${remainingForFreeShipping.toFixed(2)} more for Free Express Delivery`
                  : '🎉 Congratulations! You unlocked Free Worldwide Shipping!'}
              </span>
              <span className="font-extrabold text-[#F26522]">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-[#FED7AA]/50 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#F26522] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-gray-800">Your basket is empty</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                  Discover curated fiction, philosophy, and collectors editions to ignite your curiosity.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#F26522] text-white text-xs font-bold hover:bg-[#E05312] transition-colors"
                >
                  Explore Bestsellers
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.book.id}-${item.selectedFormat}`} className="pt-4 first:pt-0 flex gap-4">
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-16 h-22 object-cover rounded-lg shadow-sm flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-[#1C222E] truncate">
                        {item.book.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.book.id, item.selectedFormat)}
                        className="text-gray-400 hover:text-rose-500 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-500 mb-1">{item.book.author}</p>
                    <span className="inline-block text-[10px] uppercase font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mb-2">
                      {item.selectedFormat}
                    </span>

                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center border border-gray-200 rounded-full bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.book.id, item.selectedFormat, -1)}
                          className="p-1 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.book.id, item.selectedFormat, 1)}
                          className="p-1 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs sm:text-sm font-extrabold text-[#F26522]">
                        ${(item.book.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50/70 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="text-base font-extrabold text-[#1C222E]">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-emerald-600">
                  {cartTotal >= freeShippingThreshold ? 'FREE' : '$4.99'}
                </span>
              </div>

              <div className="pt-2">
                <Link
                  to="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 bg-[#F26522] hover:bg-[#E05312] text-white font-bold text-xs sm:text-sm rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#F26522]/20 transition-all cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center justify-between mt-3 text-[11px] text-gray-400">
                  <button
                    onClick={clearCart}
                    className="hover:text-rose-500 underline transition-colors"
                  >
                    Clear All
                  </button>
                  <span>30-Day Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
