import React from 'react';
import { StoreProvider } from './context/StoreContext';
import FlashBanner from './components/FlashBanner';
import Header from './components/Header';
import SecurityBadgeBar from './components/SecurityBadgeBar';
import HeroBanner from './components/HeroBanner';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import CartSlideOver from './components/CartSlideOver';
import WishlistDrawer from './components/WishlistDrawer';
import SpecComparisonDrawer from './components/SpecComparisonDrawer';
import QuickViewModal from './components/QuickViewModal';
import CheckoutModal from './components/CheckoutModal';
import UserDashboardModal from './components/UserDashboardModal';
import AiConcierge from './components/AiConcierge';
import MobileBottomNav from './components/MobileBottomNav';
import Toast from './components/Toast';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-20 md:pb-0">
        {/* Sticky iOS Top Navigation Header */}
        <Header />

        {/* Flash Sale Banner with Live Timer */}
        <FlashBanner />

        {/* Hero Section */}
        <main className="flex-1">
          <HeroBanner />

          {/* Bangladesh Security & Compliance Trust Bar */}
          <SecurityBadgeBar />

          {/* Interactive Catalog & Filtering */}
          <ProductGrid />
        </main>

        {/* Footer */}
        <Footer />

        {/* Drawers & Modals */}
        <CartSlideOver />
        <WishlistDrawer />
        <SpecComparisonDrawer />
        <QuickViewModal />
        <CheckoutModal />
        <UserDashboardModal />

        {/* Floating AI Shopping Concierge */}
        <AiConcierge />

        {/* Dedicated Mobile Thumb-Friendly Bottom Navigation Bar */}
        <MobileBottomNav />

        {/* Toast Notifications */}
        <Toast />
      </div>
    </StoreProvider>
  );
}
