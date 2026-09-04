import React, { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import { CartProvider } from './hooks/useCart.jsx';
import { FavoritesProvider } from './hooks/useFavorites.jsx';
import { Header } from './components/Header.jsx';
import { CartDrawer } from './components/CartDrawer.jsx';
import { AuthDrawer } from './components/AuthDrawer.jsx';
import { PromoModal } from './components/PromoModal.jsx';
import { Footer } from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import NewArrivalsPage from './pages/NewArrivalsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import DiscountsPage from './pages/DiscountsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ShoesDetailPage from './pages/ShoesDetailPage.jsx';
import ProductRouter from './pages/ProductRouter.jsx';
import { FavoritesPage } from './pages/FavoritesPage.jsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useLayoutEffect(() => {
    const scrollKey = `scroll_pos_${pathname}`;

    if (navType === 'POP') {
      const savedPosition = sessionStorage.getItem(scrollKey);
      if (savedPosition) {
        setTimeout(() => {
          window.scrollTo({ top: parseInt(savedPosition, 10), behavior: 'instant' });
        }, 50);
      }
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, [pathname, navType]);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        sessionStorage.setItem(`scroll_pos_${pathname}`, window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return null;
};

// Выносим внутреннее содержимое в отдельный компонент, 
// чтобы он гарантированно был внутри Router и всех Provider'ов
const MainContent = () => {
  const location = useLocation();
  const { user, login, logout } = useAuth();
  const [isAuthOpen, setIsAuthOpenState] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <PromoModal />
      
      <Header 
        user={user} 
        onOpenAuth={() => setIsAuthOpenState(true)} 
      />
      
      <CartDrawer />
      
      <AuthDrawer
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpenState(false)}
        user={user}
        onLoginSuccess={login}
        onLogout={logout}
      />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductRouter />} />
          <Route path="/cantalar" element={<NewArrivalsPage />} />
          <Route path="/discounts" element={<DiscountsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cantalar/:subcategory" element={<GalleryPage mode="subcategory" />} />
          <Route path="/designer/:name" element={<GalleryPage mode="designer" />} />
          <Route path="/shoes/:id" element={<ShoesDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

const GOOGLE_CLIENT_ID = "390413872467-rit7v62l3gaq6ku3cd08ndv92rvnat2c.apps.googleusercontent.com";

export default function AppWrapper() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <Router>
              <MainContent />
            </Router>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}