import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../Components/Common/PageTransition';
import { useCartWishlist } from '../Context/CartWishlistContext';
import { ArrowRightSvg } from '../Components/Common/SvgIcons';
import { Trash2, Plus, Minus, CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCartWishlist();
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'LUNAR46') {
      setAppliedDiscount(0.46);
      setCouponMessage('🎉 Promo code applied! 46% off your entire order.');
    } else if (couponCode.toUpperCase() === 'WELCOME10') {
      setAppliedDiscount(0.10);
      setCouponMessage('🎉 Welcome coupon applied! 10% off.');
    } else {
      setCouponMessage('❌ Invalid promo code. Try LUNAR46 or WELCOME10.');
    }
  };

  const discountAmount = cartTotal * appliedDiscount;
  const shippingFee = cartTotal >= 50 || cartTotal === 0 ? 0 : 4.99;
  const grandTotal = Math.max(0, cartTotal - discountAmount + shippingFee);

  const handlePlaceOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderSuccess(true);
      clearCart();
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12">
        <div className="mb-8">
          <Link to="/books" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#F26522] mb-3">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Browsing Books</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-[#1C222E]">Shopping Basket</h1>
        </div>

        {orderSuccess ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#1C222E]">Order Confirmed!</h2>
            <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
              Thank you for supporting authors and independent curation. Your tracking code and gift invoice have been dispatched to your email.
            </p>
            <Link
              to="/books"
              className="mt-6 inline-flex items-center justify-center px-8 py-3.5 bg-[#F26522] text-white text-xs font-bold uppercase rounded-full shadow-md hover:bg-[#E05312] transition-colors"
            >
              Explore More Books
            </Link>
          </div>
        ) : cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm max-w-lg mx-auto">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-gray-800">Your basket is currently empty</h2>
            <p className="text-xs text-gray-500 mt-1">
              Explore our bestsellers and start collecting remarkable works today.
            </p>
            <Link
              to="/books"
              className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-[#F26522] text-white text-xs font-bold uppercase rounded-full"
            >
              Go to Store
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Items List */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 text-xs text-gray-400 font-bold uppercase">
                <span>Book Details</span>
                <span>Subtotal</span>
              </div>

              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={`${item.book.id}-${item.selectedFormat}`} className="py-5 first:pt-0 flex gap-4 sm:gap-6 items-center">
                    <img
                      src={item.book.coverImage}
                      alt={item.book.title}
                      className="w-16 h-24 sm:w-20 sm:h-28 object-cover rounded-xl shadow-sm flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm sm:text-base font-bold text-[#1C222E] truncate">
                          {item.book.title}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.book.id, item.selectedFormat)}
                          className="text-gray-400 hover:text-rose-500 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-gray-500">{item.book.author}</p>
                      <span className="inline-block text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mt-1.5">
                        {item.selectedFormat}
                      </span>

                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center border border-gray-200 rounded-full bg-gray-50">
                          <button
                            onClick={() => updateQuantity(item.book.id, item.selectedFormat, -1)}
                            className="p-1 hover:bg-gray-200 rounded-full text-gray-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-bold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.book.id, item.selectedFormat, 1)}
                            className="p-1 hover:bg-gray-200 rounded-full text-gray-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs text-gray-400">
                          @ ${item.book.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-sm sm:text-base font-extrabold text-[#1C222E]">
                        ${(item.book.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-[#1C222E]">Order Summary</h3>

              {/* Promo code form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Promo code (e.g. LUNAR46)"
                    className="flex-1 px-3.5 py-2 text-xs border border-gray-200 rounded-xl uppercase font-mono focus:outline-none focus:border-[#F26522]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-bold rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p className="text-[11px] font-medium text-[#F26522]">{couponMessage}</p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-3 border-t border-gray-100 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#F26522] font-semibold">
                    <span>Discount ({(appliedDiscount * 100).toFixed(0)}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tracked Global Shipping</span>
                  <span className="font-semibold">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#1C222E] pt-3 border-t border-gray-100">
                  <span>Estimated Total</span>
                  <span className="text-[#F26522] text-lg">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                disabled={isCheckingOut}
                onClick={handlePlaceOrder}
                className="w-full py-4 bg-[#F26522] hover:bg-[#E05312] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-[#F26522]/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isCheckingOut ? (
                  <span>Processing Secure Checkout...</span>
                ) : (
                  <>
                    <span>Complete Order</span>
                    <ArrowRightSvg stroke="#FFFFFF" className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-gray-400">
                256-Bit SSL Encrypted Payment. 30-day money-back guarantee.
              </p>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
