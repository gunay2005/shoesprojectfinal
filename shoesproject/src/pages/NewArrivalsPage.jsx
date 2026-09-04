import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, X, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import gallery from '../data/gallery.json';
import { ProductCard } from '../components/ProductCard.jsx';

const subcategories = [
  { id: 'all', label: 'Hamısı' },
  { id: 'mini', label: 'Mini' },
  { id: 'tote', label: 'Tote' },
  { id: 'clutch', label: 'Klatch' },
  { id: 'shoulder', label: 'Çiyin' },
  { id: 'bucket', label: 'Bucket' },
  { id: 'crossbody', label: 'Crossbody' },
  { id: 'belt', label: 'Bel' },
  { id: 'accessories', label: 'Aksesuar' },
];

const categoryImages = {
  all: 'https://cdn.shopify.com/s/files/1/0336/7793/files/UNACLUTCH_BLKTQ_260519_DR_CG_PF26_ECOM_HANDBAGS_0001_e5fe8135-2a15-43e6-bc2e-9191a8bc0aa5_1920x.jpg?v=1785528764',
  mini: 'https://cdn.shopify.com/s/files/1/0336/7793/files/AZARIAHNANOCROSSBODY_BRASS_250709_CultGaia_F25-AX-FTW-BAGS7035_300x.jpg?v=1755621337',
  tote: 'https://cdn.shopify.com/s/files/1/0336/7793/files/SOLAYTOTE_LWK_260709_CultGaia_F2622813_WEBBED_1_352x.jpg?v=1786388125',
  clutch: 'https://cdn.shopify.com/s/files/1/0336/7793/files/EvianaClutchIvoryFALTcopy_3_c9945d7e-d169-4470-9e85-e30d26d4f7da_352x.jpg?v=1784072658',
  shoulder: 'https://cdn.shopify.com/s/files/1/0336/7793/files/DULCESHOULDER_LWK_260108_Cult-Gaia_Product14257copy_WEBBED_352x.jpg?v=1776286680',
  bucket: 'https://cdn.shopify.com/s/files/1/0336/7793/files/RUEWRISTLETCLEARSIDE_WEB_1920x.jpg?v=1723594187',
  crossbody: 'https://cdn.shopify.com/s/files/1/0336/7793/files/260319_CultGaia_Product17698_352x.jpg?v=1774294890',
  belt: 'https://cdn2.emporium.az/i/p/500/16186380-26f6f5fbc1343e298b22d3f9afd9e5f7.jpg',
  accessories: 'https://cdn.shopify.com/s/files/1/0336/7793/files/GAIAARKCHARM_260108_Cult-Gaia_Product13581_WEBBED_300x.jpg?v=1774914387',
};

const designers = [
  'Hamısı', 'Bottega Veneta', 'Chloe', 'Fendi', 'Jacquemus',
  'Loewe', 'Miu Miu', 'Prada', 'Saint Laurent',
];

const colorFilters = ['Beige', 'Brown', 'Gold', 'Silver', 'Green', 'Red', 'Blue', 'Black', 'White'];

const colorMap = {
  'Beige': '#D4C4A8', 'Brown': '#8B5E3C', 'Gold': '#F3E5AB', 'Silver': '#C0C0C0',
  'Green': '#8A9A86', 'Red': '#FF0000', 'Blue': '#E0F2FE', 'Black': '#000000', 'White': '#F5F5F5'
};

const bagCategoryMap = {
  crossbody: 'Crossbody çantalar', belt: 'Bel çantaları', accessories: 'Aksesuarlar',
  bucket: 'Bucket çantalar', clutch: 'Klatçlar', mini: 'Kiçik çantalar',
  shoulder: 'Çiyin çantaları', tote: 'Əl çantaları',
};

const getDisplayImageIndex = (product, activeColors) => {
  if (!activeColors || activeColors.length === 0) return 0;
  if (!product.colors || product.colors.length === 0) return 0;
  for (const color of activeColors) {
    const idx = product.colors.indexOf(color);
    if (idx !== -1 && idx < (product.images?.length || 0)) {
      return idx;
    }
  }
  return 0;
};

const CategoryCircles = ({ activeFilter, setActiveFilter }) => (
  <section className="px-4 sm:px-6 lg:px-8 pt-24 pb-6">
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-2xl md:text-3xl font-light text-gray-900 tracking-[0.1em] uppercase mb-8"
      >
        Çanta Kolleksiyası
      </motion.h2>
      <div className="flex flex-wrap justify-center gap-5 md:gap-8">
        {subcategories.map((cat, i) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => setActiveFilter(cat.id)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 transition-all duration-300 ${
              activeFilter === cat.id ? 'border-gray-900 shadow-lg scale-105' : 'border-gray-200 group-hover:border-gray-400 group-hover:shadow-md'
            }`}>
              <img src={categoryImages[cat.id]} alt={cat.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <span className={`text-[11px] md:text-xs font-medium tracking-wider uppercase transition-colors ${activeFilter === cat.id ? 'text-gray-900 font-semibold' : 'text-gray-500 group-hover:text-gray-900'}`}>
              {cat.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  </section>
);

const Sidebar = ({ activeFilter, setActiveFilter, activeColors, toggleColor, priceMin, setPriceMin, priceMax, setPriceMax, activeDesigner, setActiveDesigner, resultCount, onReset }) => {
  const [openSections, setOpenSections] = useState({ category: true, color: true, price: true, designer: true });
  const toggle = (k) => setOpenSections(p => ({ ...p, [k]: !p[k] }));

  return (
    <div className="hidden lg:block w-64 flex-shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold text-gray-900 tracking-wide uppercase flex items-center gap-2">
            <SlidersHorizontal size={16} /> Filters
          </h3>
          <button onClick={onReset} className="text-xs text-rose-500 hover:text-rose-600 font-medium">Sıfırla</button>
        </div>

        {/* Category */}
        <div className="mb-5">
          <button onClick={() => toggle('category')} className="flex items-center justify-between w-full text-left mb-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-900">Kateqoriya</span>
            {openSections.category ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
          </button>
          <AnimatePresence>
            {openSections.category && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="space-y-1.5">
                  {subcategories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${activeFilter === cat.id ? 'bg-gray-900 border-gray-900' : 'border-gray-300 group-hover:border-gray-900'}`}>
                        {activeFilter === cat.id && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <input type="radio" name="cat" className="hidden" checked={activeFilter === cat.id} onChange={() => setActiveFilter(cat.id)} />
                      <span className={`text-[13px] transition-colors ${activeFilter === cat.id ? 'text-gray-900 font-medium' : 'text-gray-500 group-hover:text-gray-900'}`}>{cat.label}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Color */}
        <div className="mb-5 border-t border-gray-100 pt-5">
          <button onClick={() => toggle('color')} className="flex items-center justify-between w-full text-left mb-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-900">Rəng</span>
            {openSections.color ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
          </button>
          <AnimatePresence>
            {openSections.color && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="flex flex-wrap gap-2">
                  {colorFilters.map(color => {
                    const isActive = activeColors.includes(color);
                    return (
                      <button key={color} onClick={() => toggleColor(color)} className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] rounded-full border transition-all ${isActive ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-900'}`}>
                        <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: colorMap[color] || '#ccc' }} />
                        {color}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price */}
        <div className="mb-5 border-t border-gray-100 pt-5">
          <button onClick={() => toggle('price')} className="flex items-center justify-between w-full text-left mb-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-900">Qiymət (₼)</span>
            {openSections.price ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
          </button>
          <AnimatePresence>
            {openSections.price && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" value={priceMin} onChange={e => setPriceMin(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900" />
                  <span className="text-gray-400 text-sm">—</span>
                  <input type="number" placeholder="Max" value={priceMax} onChange={e => setPriceMax(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Designer */}
        <div className="border-t border-gray-100 pt-5">
          <button onClick={() => toggle('designer')} className="flex items-center justify-between w-full text-left mb-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-900">Dizayner</span>
            {openSections.designer ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
          </button>
          <AnimatePresence>
            {openSections.designer && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="space-y-1.5">
                  {designers.map(d => (
                    <label key={d} className="flex items-center gap-2.5 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${activeDesigner === d ? 'bg-gray-900 border-gray-900' : 'border-gray-300 group-hover:border-gray-900'}`}>
                        {activeDesigner === d && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <input type="radio" name="des" className="hidden" checked={activeDesigner === d} onChange={() => setActiveDesigner(d)} />
                      <span className={`text-[13px] transition-colors ${activeDesigner === d ? 'text-gray-900 font-medium' : 'text-gray-500 group-hover:text-gray-900'}`}>{d}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100 text-center">
          <span className="text-xs text-gray-400">{resultCount} məhsul</span>
        </div>
      </div>
    </div>
  );
};

const MobileFilterDrawer = ({ isOpen, onClose, activeFilter, setActiveFilter, activeColors, toggleColor, priceMin, setPriceMin, priceMax, setPriceMax, activeDesigner, setActiveDesigner, resultCount, onReset }) => {
  const [openSections, setOpenSections] = useState({ category: true, color: true, price: true, designer: true });
  const toggle = (k) => setOpenSections(p => ({ ...p, [k]: !p[k] }));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] z-50 bg-white shadow-2xl overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 tracking-wide flex items-center gap-2">
                  <SlidersHorizontal size={20} /> Filters
                </h3>
                <div className="flex items-center gap-3">
                  <button onClick={onReset} className="text-sm text-rose-500 hover:text-rose-600 font-medium">Sıfırla</button>
                  <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"><X size={18} /></button>
                </div>
              </div>

              {/* Category */}
              <div className="mb-5">
                <button onClick={() => toggle('category')} className="flex items-center justify-between w-full text-left mb-3">
                  <span className="text-xs font-semibold tracking-wider uppercase text-gray-900">Kateqoriya</span>
                  {openSections.category ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {openSections.category && (
                  <div className="space-y-1.5">
                    {subcategories.map(cat => (
                      <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${activeFilter === cat.id ? 'bg-gray-900 border-gray-900' : 'border-gray-300'}`}>
                          {activeFilter === cat.id && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                        <input type="radio" name="mcat" className="hidden" checked={activeFilter === cat.id} onChange={() => setActiveFilter(cat.id)} />
                        <span className={`text-[13px] ${activeFilter === cat.id ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{cat.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Color */}
              <div className="mb-5 border-t border-gray-100 pt-5">
                <button onClick={() => toggle('color')} className="flex items-center justify-between w-full text-left mb-3">
                  <span className="text-xs font-semibold tracking-wider uppercase text-gray-900">Rəng</span>
                  {openSections.color ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {openSections.color && (
                  <div className="flex flex-wrap gap-2">
                    {colorFilters.map(color => {
                      const isActive = activeColors.includes(color);
                      return (
                        <button key={color} onClick={() => toggleColor(color)} className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] rounded-full border transition-all ${isActive ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'}`}>
                          <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: colorMap[color] || '#ccc' }} />
                          {color}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mb-5 border-t border-gray-100 pt-5">
                <button onClick={() => toggle('price')} className="flex items-center justify-between w-full text-left mb-3">
                  <span className="text-xs font-semibold tracking-wider uppercase text-gray-900">Qiymət (₼)</span>
                  {openSections.price ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {openSections.price && (
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder="Min" value={priceMin} onChange={e => setPriceMin(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900" />
                    <span className="text-gray-400">—</span>
                    <input type="number" placeholder="Max" value={priceMax} onChange={e => setPriceMax(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900" />
                  </div>
                )}
              </div>

              {/* Designer */}
              <div className="border-t border-gray-100 pt-5">
                <button onClick={() => toggle('designer')} className="flex items-center justify-between w-full text-left mb-3">
                  <span className="text-xs font-semibold tracking-wider uppercase text-gray-900">Dizayner</span>
                  {openSections.designer ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {openSections.designer && (
                  <div className="space-y-1.5">
                    {designers.map(d => (
                      <label key={d} className="flex items-center gap-2.5 cursor-pointer">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${activeDesigner === d ? 'bg-gray-900 border-gray-900' : 'border-gray-300'}`}>
                          {activeDesigner === d && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                        <input type="radio" name="mdes" className="hidden" checked={activeDesigner === d} onChange={() => setActiveDesigner(d)} />
                        <span className={`text-[13px] ${activeDesigner === d ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>{d}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <span className="text-sm text-gray-500">{resultCount} məhsul tapıldı</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 mt-12 select-none">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 text-sm font-medium transition-colors px-3 py-2 ${
          currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:text-gray-900'
        }`}
      >
        <span>&lt;</span> Əvvəlki
      </button>

      <div className="flex items-center gap-1 sm:gap-2">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-400 text-sm">
                ...
              </span>
            );
          }
          const isSelected = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-sm font-medium rounded transition-colors ${
                isSelected
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-200/60'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 text-sm font-medium transition-colors px-3 py-2 ${
          currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:text-gray-900'
        }`}
      >
        Növbəti <span>&gt;</span>
      </button>
    </div>
  );
};

const NewArrivalsPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Инициализируем страницу и фильтры из URL параметров или sessionStorage, либо дефолтные значения
  const initialPage = parseInt(searchParams.get('page') || sessionStorage.getItem('new_arrivals_page') || '1', 10);
  const initialFilter = searchParams.get('filter') || location.state?.filter || 'all';
  const initialDesigner = searchParams.get('designer') || location.state?.designer || 'Hamısı';

  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [activeDesigner, setActiveDesigner] = useState(initialDesigner);
  const [activeColors, setActiveColors] = useState([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 12;

  // Сохраняем текущую страницу в sessionStorage и URL при её изменении
  const handlePageChange = (page) => {
    setCurrentPage(page);
    sessionStorage.setItem('new_arrivals_page', page.toString());
    setSearchParams((prev) => {
      prev.set('page', page.toString());
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (location.state) {
      if (location.state.filter) setActiveFilter(location.state.filter);
      if (location.state.designer) setActiveDesigner(location.state.designer);
    }
  }, [location.state]);

  // Сбрасываем страницу на 1 только если пользователь реально изменил фильтры/поиск, а не пришел обратно
  useEffect(() => {
    // Если страница была восстановлена из sessionStorage, не сбрасываем её в первый рендер
    const savedPage = parseInt(sessionStorage.getItem('new_arrivals_page') || '1', 10);
    if (currentPage !== savedPage && savedPage > 1) {
      setCurrentPage(savedPage);
    }
  }, []);

  // При изменении фильтров сбрасываем на 1 страницу (но не при первом монтировании, если сохранен page)
  const handleFilterChangeType = (setter) => (val) => {
    setter(val);
    setCurrentPage(1);
    sessionStorage.setItem('new_arrivals_page', '1');
    setSearchParams((prev) => {
      prev.set('page', '1');
      return prev;
    });
  };

  const toggleColor = (color) => {
    setActiveColors(prev => {
      const updated = prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color];
      return updated;
    });
    setCurrentPage(1);
    sessionStorage.setItem('new_arrivals_page', '1');
  };

  const handleReset = () => {
    setActiveFilter('all');
    setActiveDesigner('Hamısı');
    setActiveColors([]);
    setPriceMin('');
    setPriceMax('');
    setSearchQuery('');
    setSortBy('default');
    setCurrentPage(1);
    sessionStorage.removeItem('new_arrivals_page');
    setSearchParams({});
  };

  // Блокируем скролл фона (body), пока открыт мобильный Drawer фильтров,
  // чтобы не было "двойного" скролла на мобильных устройствах.
  // Никак не затрагивает desktop, т.к. кнопка открытия скрыта на lg (lg:hidden).
  useEffect(() => {
    if (mobileFiltersOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileFiltersOpen]);

  const filtered = useMemo(() => {
    let result = [...gallery];

    if (activeFilter !== 'all') {
      const normalizedFilter = activeFilter
        .replace('-bags', '')
        .replace('clutches', 'clutch');

      result = result.filter(p => 
        p.subcategory === activeFilter || 
        p.subcategory === normalizedFilter ||
        p.category === activeFilter
      );
    }

    if (activeDesigner !== 'Hamısı') {
      result = result.filter(p => p.designer === activeDesigner);
    }

    if (activeColors.length > 0) {
      result = result.filter(p => p.colors && p.colors.some(c => activeColors.includes(c)));
    }

    const min = parseFloat(priceMin), max = parseFloat(priceMax);
    if (!isNaN(min)) result = result.filter(p => p.price >= min);
    if (!isNaN(max)) result = result.filter(p => p.price <= max);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.designer && p.designer.toLowerCase().includes(q)) || 
        (p.subcategory && p.subcategory.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [activeFilter, activeDesigner, activeColors, priceMin, priceMax, sortBy, searchQuery]);

  const resultCount = filtered.length;
  const totalPages = Math.ceil(resultCount / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <CategoryCircles activeFilter={activeFilter} setActiveFilter={handleFilterChangeType(setActiveFilter)} />

      {/* Top bar: search + sort + mobile filter toggle */}
      <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-4 sticky top-20 z-30 bg-[#faf8f5]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-gray-900 transition-colors shrink-0"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>

              <div className="relative flex-1 sm:w-80">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Axtar..."
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                    sessionStorage.setItem('new_arrivals_page', '1');
                  }}
                  className="w-full pl-11 pr-10 py-3 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all"
                />
                {searchQuery && (
                  <button onClick={() => { setSearchQuery(''); setCurrentPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none px-5 pr-10 py-2.5 text-sm tracking-wider uppercase bg-white border border-gray-200 text-gray-500 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors rounded-full cursor-pointer"
              >
                <option value="default">Sırala: Standart</option>
                <option value="price-asc">Qiymət: Aşağıdan yuxarı</option>
                <option value="price-desc">Qiymət: Yuxarıdan aşağı</option>
                <option value="name">Ad: A-Z</option>
              </select>
              <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Active chips */}
          {(activeFilter !== 'all' || activeDesigner !== 'Hamısı' || activeColors.length > 0 || priceMin || priceMax || searchQuery) && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-2 mt-4">
              {activeFilter !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-full">
                  {bagCategoryMap[activeFilter] || activeFilter} <button onClick={() => handleFilterChangeType(setActiveFilter)('all')}><X size={12} /></button>
                </span>
              )}
              {activeDesigner !== 'Hamısı' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-full">
                  {activeDesigner} <button onClick={() => handleFilterChangeType(setActiveDesigner)('Hamısı')}><X size={12} /></button>
                </span>
              )}
              {activeColors.map(color => (
                <span key={color} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 text-xs rounded-full border border-rose-200">
                  {color} <button onClick={() => toggleColor(color)}><X size={12} /></button>
                </span>
              ))}
              {priceMin && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full">Min: {priceMin} ₼ <button onClick={() => setPriceMin('')}><X size={12} /></button></span>}
              {priceMax && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full">Max: {priceMax} ₼ <button onClick={() => setPriceMax('')}><X size={12} /></button></span>}
              {searchQuery && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full">"{searchQuery}" <button onClick={() => setSearchQuery('')}><X size={12} /></button></span>}
              <button onClick={handleReset} className="text-xs text-gray-500 hover:text-rose-600 underline transition-colors ml-1">Hamısını sıfırla</button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Main: sidebar + grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24 pt-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          <Sidebar
            activeFilter={activeFilter} setActiveFilter={handleFilterChangeType(setActiveFilter)}
            activeColors={activeColors} toggleColor={toggleColor}
            priceMin={priceMin} setPriceMin={setPriceMin}
            priceMax={priceMax} setPriceMax={setPriceMax}
            activeDesigner={activeDesigner} setActiveDesigner={handleFilterChangeType(setActiveDesigner)}
            resultCount={resultCount} onReset={handleReset}
          />

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            <motion.div
              key={activeFilter + activeDesigner + activeColors.join(',') + priceMin + priceMax + sortBy + searchQuery + currentPage}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {paginatedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                >
                  <ProductCard 
                    product={product} 
                    displayImageIndex={getDisplayImageIndex(product, activeColors)}
                  />
                </motion.div>
              ))}
            </motion.div>

            {filtered.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}

            {filtered.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
                <p className="text-gray-400 text-lg mb-2">Məhsul tapılmadı.</p>
                <p className="text-gray-300 text-sm mb-6">Başqa filtr və ya axtarış sözü yoxlayın.</p>
                <button onClick={handleReset} className="px-6 py-2.5 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition-colors">Filtrləri sıfırla</button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}
        activeFilter={activeFilter} setActiveFilter={handleFilterChangeType(setActiveFilter)}
        activeColors={activeColors} toggleColor={toggleColor}
        priceMin={priceMin} setPriceMin={setPriceMin}
        priceMax={priceMax} setPriceMax={setPriceMax}
        activeDesigner={activeDesigner} setActiveDesigner={handleFilterChangeType(setActiveDesigner)}
        resultCount={resultCount} onReset={handleReset}
      />
    </div>
  );
};

export default NewArrivalsPage;