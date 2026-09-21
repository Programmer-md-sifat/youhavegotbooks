import React, { createContext, useContext, useState, useEffect } from 'react';
import { BookItem, bestsellerBooksData } from '../Data/HomeData';

export interface CartItem {
  book: BookItem;
  selectedFormat: string;
  quantity: number;
}

interface CartWishlistContextType {
  cart: CartItem[];
  wishlist: BookItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (book: BookItem, format?: string, qty?: number) => void;
  removeFromCart: (bookId: string, format: string) => void;
  updateQuantity: (bookId: string, format: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  wishlistCount: number;
  toggleWishlist: (book: BookItem) => void;
  isInWishlist: (bookId: string) => boolean;
  quickViewBook: BookItem | null;
  setQuickViewBook: (book: BookItem | null) => void;
  toastMessage: string | null;
}

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(undefined);

export const CartWishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with some default items if needed, or from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lunar_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    // Default sample cart
    if (bestsellerBooksData.length >= 2) {
      return [
        { book: bestsellerBooksData[0], selectedFormat: 'Hardcover', quantity: 1 },
        { book: bestsellerBooksData[1], selectedFormat: 'Paperback', quantity: 1 },
      ];
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<BookItem[]>(() => {
    const saved = localStorage.getItem('lunar_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return bestsellerBooksData.slice(0, 3);
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewBook, setQuickViewBook] = useState<BookItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('lunar_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lunar_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (book: BookItem, format?: string, qty = 1) => {
    const selectedFormat = format || (book.format && book.format[0]) || 'Hardcover';
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.book.id === book.id && item.selectedFormat === selectedFormat
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += qty;
        return next;
      }
      return [...prev, { book, selectedFormat, quantity: qty }];
    });
    showToast(`Added "${book.title}" to cart!`);
  };

  const removeFromCart = (bookId: string, format: string) => {
    setCart((prev) => prev.filter((i) => !(i.book.id === bookId && i.selectedFormat === format)));
  };

  const updateQuantity = (bookId: string, format: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.book.id === bookId && item.selectedFormat === format) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (book: BookItem) => {
    setWishlist((prev) => {
      const exists = prev.some((b) => b.id === book.id);
      if (exists) {
        showToast(`Removed "${book.title}" from wishlist.`);
        return prev.filter((b) => b.id !== book.id);
      } else {
        showToast(`Added "${book.title}" to wishlist!`);
        return [...prev, book];
      }
    });
  };

  const isInWishlist = (bookId: string) => {
    return wishlist.some((b) => b.id === bookId);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <CartWishlistContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        wishlistCount,
        toggleWishlist,
        isInWishlist,
        quickViewBook,
        setQuickViewBook,
        toastMessage,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};

export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
};
