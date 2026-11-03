import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CURRENCIES, THEMES, PROMO_CODES, INITIAL_USER_PROFILE } from '../data/products';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Theme & Dark Mode
  const [theme, setTheme] = useState(() => localStorage.getItem('arcus_theme') || 'indigo');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('arcus_dark');
    return saved !== null ? JSON.parse(saved) : true; // Default to sleek dark mode
  });

  // Currency (Default to Bangladeshi Taka BDT)
  const [currency, setCurrency] = useState(() => localStorage.getItem('arcus_currency') || 'BDT');

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured'); // featured, price-low, price-high, rating

  // Cart (persisted)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('arcus_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist (persisted)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('arcus_wishlist');
      return saved ? JSON.parse(saved) : ['arc-01', 'arc-03'];
    } catch {
      return ['arc-01', 'arc-03'];
    }
  });

  // Spec Comparison (up to 3 products)
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Promo & Points
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [usePoints, setUsePoints] = useState(false);

  // User & Order Tracking
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('arcus_user');
      return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  // Toast notifications
  const [toast, setToast] = useState(null);

  // Sync Theme to HTML root
  useEffect(() => {
    localStorage.setItem('arcus_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sync Dark mode to HTML class
  useEffect(() => {
    localStorage.setItem('arcus_dark', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sync Cart
  useEffect(() => {
    localStorage.setItem('arcus_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync Wishlist
  useEffect(() => {
    localStorage.setItem('arcus_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync User
  useEffect(() => {
    localStorage.setItem('arcus_user', JSON.stringify(userProfile));
  }, [userProfile]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Currency Converter helper (Defaults to authentic BDT Taka formatting)
  const formatPrice = (usdAmount) => {
    const curr = CURRENCIES[currency] || CURRENCIES.BDT;
    const converted = usdAmount * curr.rate;
    if (currency === 'BDT') {
      return `৳ ${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${curr.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  // Cart operations
  const addToCart = (product, selectedColor = null, selectedSize = null, quantity = 1) => {
    const color = selectedColor || product.colors?.[0]?.name || 'Default';
    const size = selectedSize || product.sizes?.[0] || 'Standard';
    const itemKey = `${product.id}-${color}-${size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.key === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.key === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          key: itemKey,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity
        }
      ];
    });

    showToast(`Added "${product.name}" to your cart!`);
  };

  const updateCartQuantity = (key, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.key === key) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from Wishlist' : 'Saved to Wishlist! ❤️');
      return updated;
    });
  };

  // Compare Drawer operations
  const toggleCompare = (product) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from comparison`, 'info');
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        showToast('You can compare a maximum of 3 products', 'error');
        return prev;
      }
      showToast(`Added ${product.name} to side-by-side comparison`);
      setIsCompareOpen(true);
      return [...prev, product];
    });
  };

  const removeCompare = (productId) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  // Promo code validation
  const applyPromo = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (PROMO_CODES[cleanCode]) {
      setAppliedPromo({ code: cleanCode, ...PROMO_CODES[cleanCode] });
      showToast(`Coupon ${cleanCode} applied! Saved ${PROMO_CODES[cleanCode].discountPercent}% 🎉`);
      return true;
    }
    showToast('Invalid promo code. Try ARCUS20 or VIP50', 'error');
    return false;
  };

  const removePromo = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const promoDiscount = appliedPromo ? (cartSubtotal * appliedPromo.discountPercent) / 100 : 0;
  const pointsDiscount = usePoints ? Math.min(25, cartSubtotal * 0.1) : 0; // $25 or 10% off using VIP points
  const freeShippingThreshold = 200;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0;
  const shippingCost = isFreeShipping ? 0 : 15;
  const cartTotal = Math.max(0, cartSubtotal - promoDiscount - pointsDiscount + shippingCost);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Simulate Order Tracking Progression
  const simulateNextOrderStep = () => {
    setUserProfile((prev) => {
      const currentStep = prev.currentOrder.statusStep;
      const nextStep = (currentStep + 1) % 5;
      const updatedSteps = prev.currentOrder.steps.map((s, idx) => ({
        ...s,
        done: idx <= nextStep
      }));
      return {
        ...prev,
        currentOrder: {
          ...prev.currentOrder,
          statusStep: nextStep,
          steps: updatedSteps
        }
      };
    });
    showToast('Simulated next live package dispatch step!');
  };

  return (
    <StoreContext.Provider
      value={{
        PRODUCTS,
        THEMES,
        CURRENCIES,
        theme,
        setTheme,
        darkMode,
        setDarkMode,
        currency,
        setCurrency,
        formatPrice,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        cart,
        cartCount,
        cartSubtotal,
        promoDiscount,
        pointsDiscount,
        shippingCost,
        cartTotal,
        freeShippingThreshold,
        isFreeShipping,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        compareList,
        toggleCompare,
        removeCompare,
        isCompareOpen,
        setIsCompareOpen,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAccountOpen,
        setIsAccountOpen,
        quickViewProduct,
        setQuickViewProduct,
        appliedPromo,
        applyPromo,
        removePromo,
        usePoints,
        setUsePoints,
        userProfile,
        setUserProfile,
        simulateNextOrderStep,
        toast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
