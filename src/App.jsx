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
import Toast from './components/Toast';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        {/* Flash Sale Banner with Live Timer */}
        <FlashBanner />

        {/* Sticky Modern Header */}
        <Header />

        {/* Bangladesh Security & Compliance Trust Bar */}
        <SecurityBadgeBar />

        {/* Hero Section */}
        <main className="flex-1">
          <HeroBanner />

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

        {/* Toast Notifications */}
        <Toast />
      </div>
    </StoreProvider>
  );
}
