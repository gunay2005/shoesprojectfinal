import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, ChevronDown, ArrowRight, Heart, User } from 'lucide-react';
import { useCart } from '../hooks/useCart.jsx';
import { useFavorites } from '../hooks/useFavorites.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import { SearchOverlay } from './SearchOverlay.jsx';
import { AuthDrawer } from './AuthDrawer.jsx';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Sağ tərəfdən açılan panelin state-i
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);

  // Qlobal AuthContext-dən istifadə edirik
  const { user, login, logout } = useAuth();

  const { cartCount, setIsCartOpen } = useCart();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const navItems = [
    { name: 'Ana Səhifə', path: '/' },
    { name: 'Ayaqqabılar', path: '/shop' },
    { name: 'Çantalar', path: '/cantalar' },
    { name: 'Endirimlər', path: '/discounts' },
    { name: 'Haqqımızda', path: '/about' },
  ];

  const bagCategories = [
    { name: 'Crossbody çantalar', filter: 'crossbody' },
    { name: 'Bel çantaları', filter: 'belt' },
    { name: 'Aksesuarlar', filter: 'accessories' },
    { name: 'Bucket çantalar', filter: 'bucket' },
    { name: 'Klatçlar', filter: 'clutch' },
    { name: 'Kiçik çantalar', filter: 'mini' },
    { name: 'Çiyin çantaları', filter: 'shoulder' },
    { name: 'Əl çantaları', filter: 'tote' },
  ];

  const shoeCategories = [
    { name: 'Səndəllər', filter: 'sandals' },
    { name: 'Stilettos', filter: 'stilettos' },
    { name: 'İdman ayaqqabıları', filter: 'sneakers' },
    { name: 'Hündürdaban ayaqqabılar', filter: 'pumps' },
    { name: 'Yastıdaban ayaqqabılar', filter: 'flats' },
    { name: 'Loferlər', filter: 'loafers' },
    { name: 'Çəkmələr', filter: 'boots' },
  ];

  const bagDesigners = [
    'Bottega Veneta', 'Chloe', 'Fendi', 'Jacquemus',
    'Loewe', 'Miu Miu', 'Prada', 'Saint Laurent',
  ];

  const shoeDesigners = [
    'Alexander Wang', 'Bottega Veneta', 'Fendi', 'Jimmy Choo',
    'Prada', 'Saint Laurent',
  ];

  const handleBagFilter = (filter) => {
    setActiveDropdown(null);
    navigate('/cantalar', { state: { filter } });
  };

  const handleBagDesignerFilter = (designer) => {
    setActiveDropdown(null);
    navigate('/cantalar', { state: { designer } });
  };

  const handleShoeFilter = (filter) => {
    setActiveDropdown(null);
    navigate('/shop', { state: { filter } });
  };

  const handleShoeDesignerFilter = (designer) => {
    setActiveDropdown(null);
    navigate('/shop', { state: { designer } });
  };

  const handleViewAllBags = () => {
    setActiveDropdown(null);
    navigate('/cantalar', { state: { filter: 'all', designer: 'Hamısı' } });
  };

  const handleViewAllShoes = () => {
    setActiveDropdown(null);
    navigate('/shop', { state: { filter: 'all', designer: 'Hamısı' } });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || !isHome ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-gray-200/50 shadow-inner bg-white">
                <img
                  src="https://i.postimg.cc/CKMDbXDT/Screenshot-2026-06-08-201415.png"
                  alt="Serra.az Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className={`text-2xl font-bold tracking-tight transition-colors ${
                  isScrolled || !isHome ? 'text-gray-900' : 'text-white'
                }`}
              >
                Serra.az
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                // Aktiv səhifəni yoxlayırıq
                const isActive = location.pathname === item.path;

                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => {
                      if (item.name === 'Ayaqqabılar') setActiveDropdown('shoes');
                      if (item.name === 'Çantalar') setActiveDropdown('bags');
                    }}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={item.path}
                      className={`text-sm font-medium tracking-wide uppercase transition-colors flex items-center gap-1 ${
                        isActive
                          ? 'text-rose-500 font-semibold' // Aktiv olan elementin rəngi
                          : isScrolled || !isHome
                          ? 'text-gray-700 hover:text-rose-500'
                          : 'text-white/90 hover:text-rose-400'
                      }`}
                    >
                      {item.name}
                      {(item.name === 'Ayaqqabılar' || item.name === 'Çantalar') && (
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${
                            (item.name === 'Ayaqqabılar' && activeDropdown === 'shoes') ||
                            (item.name === 'Çantalar' && activeDropdown === 'bags')
                              ? 'rotate-180'
                              : ''
                          }`}
                        />
                      )}
                    </Link>

                    {/* Dropdown Ayaqqabılar */}
                    <AnimatePresence>
                      {item.name === 'Ayaqqabılar' && activeDropdown === 'shoes' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.25 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden p-6"
                        >
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-900 mb-4 pb-3 border-b border-gray-100">
                                Ayaqqabılar
                              </h3>
                              <ul className="space-y-0.5">
                                {shoeCategories.map((cat) => {
                                  const isSubActive = location.pathname === '/shop' && location.state?.filter === cat.filter;
                                  return (
                                    <li key={cat.filter}>
                                      <button
                                        onClick={() => handleShoeFilter(cat.filter)}
                                        className={`text-left w-full text-[13px] transition-colors duration-200 block py-1.5 cursor-pointer ${
                                          isSubActive ? 'text-rose-600 font-semibold' : 'text-gray-500 hover:text-rose-600'
                                        }`}
                                      >
                                        {cat.name}
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>

                            <div>
                              <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-900 mb-4 pb-3 border-b border-gray-100">
                                Dizaynerlər
                              </h3>
                              <ul className="space-y-0.5">
                                {shoeDesigners.map((name) => {
                                  const isDesignerActive = location.pathname === '/shop' && location.state?.designer === name;
                                  return (
                                    <li key={name}>
                                      <button
                                        onClick={() => handleShoeDesignerFilter(name)}
                                        className={`text-left w-full text-[13px] transition-colors duration-200 block py-1.5 cursor-pointer ${
                                          isDesignerActive ? 'text-rose-600 font-semibold' : 'text-gray-500 hover:text-rose-600'
                                        }`}
                                      >
                                        {name}
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                            <button
                              onClick={handleViewAllShoes}
                              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-900 hover:text-rose-600 transition-colors duration-200 cursor-pointer"
                            >
                              Hamısına bax
                              <ArrowRight size={14} />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Dropdown Çantalar */}
                    <AnimatePresence>
                      {item.name === 'Çantalar' && activeDropdown === 'bags' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.25 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden p-6"
                        >
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-900 mb-4 pb-3 border-b border-gray-100">
                                Çantalar
                              </h3>
                              <ul className="space-y-0.5">
                                {bagCategories.map((cat) => {
                                  const isSubActive = location.pathname === '/cantalar' && location.state?.filter === cat.filter;
                                  return (
                                    <li key={cat.filter}>
                                      <button
                                        onClick={() => handleBagFilter(cat.filter)}
                                        className={`text-left w-full text-[13px] transition-colors duration-200 block py-1.5 cursor-pointer ${
                                          isSubActive ? 'text-rose-600 font-semibold' : 'text-gray-500 hover:text-rose-600'
                                        }`}
                                      >
                                        {cat.name}
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>

                            <div>
                              <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-900 mb-4 pb-3 border-b border-gray-100">
                                Dizaynerlər
                              </h3>
                              <ul className="space-y-0.5">
                                {bagDesigners.map((name) => {
                                  const isDesignerActive = location.pathname === '/cantalar' && location.state?.designer === name;
                                  return (
                                    <li key={name}>
                                      <button
                                        onClick={() => handleBagDesignerFilter(name)}
                                        className={`text-left w-full text-[13px] transition-colors duration-200 block py-1.5 cursor-pointer ${
                                          isDesignerActive ? 'text-rose-600 font-semibold' : 'text-gray-500 hover:text-rose-600'
                                        }`}
                                      >
                                        {name}
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                            <button
                              onClick={handleViewAllBags}
                              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-900 hover:text-rose-600 transition-colors duration-200 cursor-pointer"
                            >
                              Hamısına bax
                              <ArrowRight size={14} />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              {/* Seçilmişlər düyməsi */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate('/favorites')}
                className={`p-2 rounded-full transition-colors relative cursor-pointer ${
                  isScrolled || !isHome ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
                title="Seçilmişlər"
              >
                <Heart size={20} />
                {favorites.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                  >
                    {favorites.length}
                  </motion.span>
                )}
              </motion.button>

              <SearchOverlay />

              {/* Səbət düyməsi */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(true)}
                className={`p-2 rounded-full transition-colors relative cursor-pointer ${
                  isScrolled || !isHome ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Profil düyməsi */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsAuthDrawerOpen(true)}
                className={`p-2 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isScrolled || !isHome ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
                title={user ? user.name : 'Giriş et'}
              >
                <User size={20} />
              </motion.button>

              {/* Mobil menyu düyməsi */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-full transition-colors cursor-pointer ${
                  isScrolled || !isHome ? 'text-gray-700' : 'text-white'
                }`}
              >
                <Menu size={24} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobil Menyu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map((item, i) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block font-medium py-2 ${
                          isActive ? 'text-rose-500 font-semibold' : 'text-gray-700'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* AuthDrawer-a qlobal login/logout metodları ötürüldü */}
      <AuthDrawer
        isOpen={isAuthDrawerOpen}
        onClose={() => setIsAuthDrawerOpen(false)}
        user={user}
        onLoginSuccess={(userData) => {
          login(userData);
          setIsAuthDrawerOpen(false);
        }}
        onLogout={() => {
          logout();
          setIsAuthDrawerOpen(false);
          navigate('/');
        }}
      />
    </>
  );
};