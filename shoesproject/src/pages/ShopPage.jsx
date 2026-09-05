import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SlidersHorizontal, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import shoes from '../data/products.json';
import categories from '../data/categories.json';
import gallery from '../data/gallery.json';
import { ProductCard } from '../components/ProductCard.jsx';


const subcategories = [
  { id: 'all', label: 'Hamısı' },
  { id: 'sandals', label: 'Səndəllər' },
  { id: 'stilettos', label: 'Stilettolar' },
  { id: 'sneakers', label: 'İdman ayaqqabıları' },
  { id: 'pumps', label: 'Hündürdaban' },
  { id: 'flats', label: 'Yastıdaban' },
  { id: 'loafers', label: 'Loferlər' },
  { id: 'boots', label: 'Çəkmələr' },
];

const categoryImages = {
  all: 'https://cdn.shopify.com/s/files/1/0336/7793/files/GRAPESANDAL_CR_250924_CultGaia__R26-AX__10397_WEBBED_832x.jpg?v=1761178822',
  sandals: 'https://cultgaia.com/cdn/shop/files/RAYA_GLD_260709_CultGaia_F2622988_WEBBED.jpg?v=1786397632',
  stilettos: 'https://cdn.shopify.com/s/files/1/0336/7793/files/CALLAPUMP_WP_CALLAPUMP_WP_260709_CultGaia_F2626080_WEBBED_300x.jpg?v=1786397517',
  sneakers: 'https://cdn2.emporium.az/i/p/500/16211002-b4625fd3e398380055973cfae3d7f4ac.jpg',
  pumps: 'https://cdn.shopify.com/s/files/1/0336/7793/files/ZAYNSANDAL_GD_250709_CultGaia_F25-AX-FTW-BAGS6299_WEBBED_300x.jpg?v=1761109571',
  flats: 'https://cdn.shopify.com/s/files/1/0336/7793/files/JASMINBABOOSH_BLK_260709_CultGaia_F2621726_832x.jpg?v=1784668704',
  loafers: 'https://cdn.shopify.com/s/files/1/0336/7793/files/FIORELOAFER_BLK_260709_CultGaia_F2621731_352x.jpg?v=1784668793',
  boots: 'https://cdn2.emporium.az/i/p/500/16208466-fd8bb410773ec86f40b20bd5f9feac3d.jpg',
};

const designers = [
  'Hamısı', 'Alexander Wang', 'Bottega Veneta', 'Fendi', 'Jimmy Choo',
  'Prada', 'Saint Laurent',
];

const colorFilters = ['Bej', 'Qəhvəyi', 'Qızıl', 'Qümüş', 'Yaşıl', 'Qırmızı', 'Göy', 'Qara', 'Ağ', 'Bənövşəyi', 'Bordo', 'Çəhrayı', 'Multi', 'Narıncı', 'Sarı'];

const colorMap = {
  'Bej': '#D4C4A8', 'Qəhvəyi': '#8B5E3C', 'Qızıl': '#F3E5AB', 'Qümüş': '#C0C0C0',
  'Yaşıl': '#8A9A86', 'Qırmızı': '#FF0000', 'Göy': '#E0F2FE', 'Qara': '#000000', 'Ağ': '#F5F5F5',
  'Bənövşəyi': '#8B5CF6', 'Bordo': '#800020', 'Çəhrayı': '#FFC0CB', 'Multi': 'linear-gradient(135deg, #FF0000, #00FF00, #0000FF)',
  'Narıncı': '#FF8C00', 'Sarı': '#FFD700'
};

const euSizes = ['34', '35', '35.5', '36', '36.5', '37', '37.5', '38', '38.5', '39', '39.5', '40', '41', '42'];

const shoeCategoryMap = {
  sandals: 'Səndəllər', stilettos: 'Stilettolar', sneakers: 'İdman ayaqqabıları',
  pumps: 'Hündürdaban ayaqqabılar', flats: 'Yastıdaban ayaqqabılar', loafers: 'Loferlər', boots: 'Çəkmələr',
};


const getDisplayImageIndex = (product, activeColors) => {
  if (!activeColors || activeColors.length === 0) return 0;
  if (!product.colors || product.colors.length === 0) return 0;
  for (const color of activeColors) {
    const idx = product.colors.indexOf(color);
    if (idx !== -1 && idx < (product.images?.length || 0)) return idx;
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
        Ayaqqabı Kolleksiyası
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


const Sidebar = ({ activeFilter, setActiveFilter, activeColors, toggleColor, priceMin, setPriceMin, priceMax, setPriceMax, activeDesigner, setActiveDesigner, activeSizes, toggleSize, resultCount, onReset }) => {
  const [openSections, setOpenSections] = useState({ category: true, color: true, size: true, price: true, designer: true });
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
                    const bg = colorMap[color];
                    return (
                      <button key={color} onClick={() => toggleColor(color)} className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] rounded-full border transition-all ${isActive ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-900'}`}>
                        <span 
                          className="w-3 h-3 rounded-full border border-gray-300" 
                          style={{ background: bg, backgroundColor: bg }} 
                        />
                        {color}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Size */}
        <div className="mb-5 border-t border-gray-100 pt-5">
          <button onClick={() => toggle('size')} className="flex items-center justify-between w-full text-left mb-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-900">Ölçü (EU)</span>
            {openSections.size ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
          </button>
          <AnimatePresence>
            {openSections.size && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="flex flex-wrap gap-2">
                  {euSizes.map(size => {
                    const isActive = activeSizes.includes(size);
                    return (
                      <button 
                        key={size} 
                        onClick={() => toggleSize(size)} 
                        className={`w-10 h-10 text-xs font-medium rounded-lg border transition-all flex items-center justify-center ${isActive ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900'}`}
                      >
                        {size}
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

/* =========================  MOBILE FILTER DRAWER  ========================= */
const MobileFilterDrawer = ({ isOpen, onClose, activeFilter, setActiveFilter, activeColors, toggleColor, priceMin, setPriceMin, priceMax, setPriceMax, activeDesigner, setActiveDesigner, activeSizes, toggleSize, resultCount, onReset }) => {
  const [openSections, setOpenSections] = useState({ category: true, color: true, size: true, price: true, designer: true });
  const toggle = (k) => setOpenSections(p => ({ ...p, [k]: !p[k] }));

  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isOpen]);

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

              <div className="mb-5 border-t border-gray-100 pt-5">
                <button onClick={() => toggle('color')} className="flex items-center justify-between w-full text-left mb-3">
                  <span className="text-xs font-semibold tracking-wider uppercase text-gray-900">Rəng</span>
                  {openSections.color ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {openSections.color && (
                  <div className="flex flex-wrap gap-2">
                    {colorFilters.map(color => {
                      const isActive = activeColors.includes(color);
                      const bg = colorMap[color];
                      return (
                        <button key={color} onClick={() => toggleColor(color)} className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] rounded-full border transition-all ${isActive ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200'}`}>
                          <span className="w-3 h-3 rounded-full border border-gray-300" style={{ background: bg, backgroundColor: bg }} />
                          {color}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="mb-5 border-t border-gray-100 pt-5">
                <button onClick={() => toggle('size')} className="flex items-center justify-between w-full text-left mb-3">
                  <span className="text-xs font-semibold tracking-wider uppercase text-gray-900">Ölçü (EU)</span>
                  {openSections.size ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                {openSections.size && (
                  <div className="flex flex-wrap gap-2">
                    {euSizes.map(size => {
                      const isActive = activeSizes.includes(size);
                      return (
                        <button 
                          key={size} 
                          onClick={() => toggleSize(size)} 
                          className={`w-10 h-10 text-xs font-medium rounded-lg border transition-all flex items-center justify-center ${isActive ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200'}`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

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


const ShopPage = () => {
  const { subcategory } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialFilter = subcategory || searchParams.get('category') || location.state?.filter || 'all';
  const initialDesigner = location.state?.designer || 'Hamısı';
  
 
  const initialPage = parseInt(searchParams.get('page') || '1', 10);

  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [activeDesigner, setActiveDesigner] = useState(initialDesigner);
  const [activeColors, setActiveColors] = useState([]);
  const [activeSizes, setActiveSizes] = useState([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  
  const [currentPage, setCurrentPageState] = useState(initialPage);
  const ITEMS_PER_PAGE = 20;

  const isFirstFilterRun = useRef(true);

  const setCurrentPage = (pageUpdater) => {
    const nextPage = typeof pageUpdater === 'function' ? pageUpdater(currentPage) : pageUpdater;
    setCurrentPageState(nextPage);
    
    
    setSearchParams(prev => {
      if (nextPage > 1) {
        prev.set('page', nextPage.toString());
      } else {
        prev.delete('page');
      }
      return prev;
    }, { replace: true, state: location.state });
  };

 
  useEffect(() => {
    if (isFirstFilterRun.current) {
      isFirstFilterRun.current = false;
      return;
    }
    setCurrentPageState(1);
    setSearchParams(prev => {
      prev.delete('page');
      return prev;
    }, { replace: true, state: location.state });
  }, [activeFilter, activeDesigner, activeColors, activeSizes, priceMin, priceMax, sortBy, searchQuery]);

  useEffect(() => {
    const categoryFromUrl = subcategory || searchParams.get('category') || location.state?.filter || 'all';
    setActiveFilter(categoryFromUrl);

    if (location.state?.designer) {
      setActiveDesigner(location.state.designer);
    }

  }, [subcategory, searchParams.get('category'), location.state?.filter, location.state?.designer]);

  const toggleColor = (color) => {
    setActiveColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  const toggleSize = (size) => {
    setActiveSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const handleReset = () => {
    setActiveFilter('all');
    setActiveDesigner('Hamısı');
    setActiveColors([]);
    setActiveSizes([]);
    setPriceMin('');
    setPriceMax('');
    setSearchQuery('');
    setSortBy('default');
  };

  const filtered = useMemo(() => {
    let result = [...shoes];

    if (activeFilter !== 'all') {
      result = result.filter(p => 
        p.subcategory === activeFilter || 
        p.category === activeFilter
      );
    }

    if (activeDesigner !== 'Hamısı') result = result.filter(p => p.designer === activeDesigner);
    if (activeColors.length > 0) result = result.filter(p => p.colors && p.colors.some(c => activeColors.includes(c)));
    if (activeSizes.length > 0) result = result.filter(p => p.sizes && p.sizes.some(s => activeSizes.includes(s)));
    
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
  }, [activeFilter, activeDesigner, activeColors, activeSizes, priceMin, priceMax, sortBy, searchQuery]);

  const resultCount = filtered.length;

  const currentPagesTotal = Math.ceil(resultCount / ITEMS_PER_PAGE) || 1;

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const getPaginationPages = () => {
    const pages = [];
    if (currentPagesTotal <= 7) {
      for (let i = 1; i <= currentPagesTotal; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', currentPagesTotal);
      } else if (currentPage >= currentPagesTotal - 3) {
        pages.push(1, '...', currentPagesTotal - 4, currentPagesTotal - 3, currentPagesTotal - 2, currentPagesTotal - 1, currentPagesTotal);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', currentPagesTotal);
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <CategoryCircles activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

    
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
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-all"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
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

         
          {(activeFilter !== 'all' || activeDesigner !== 'Hamısı' || activeColors.length > 0 || activeSizes.length > 0 || priceMin || priceMax || searchQuery) && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-2 mt-4">
              {activeFilter !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-full">
                  {shoeCategoryMap[activeFilter] || activeFilter} <button onClick={() => setActiveFilter('all')}><X size={12} /></button>
                </span>
              )}
              {activeDesigner !== 'Hamısı' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-full">
                  {activeDesigner} <button onClick={() => setActiveDesigner('Hamısı')}><X size={12} /></button>
                </span>
              )}
              {activeColors.map(color => (
                <span key={color} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 text-xs rounded-full border border-rose-200">
                  {color} <button onClick={() => toggleColor(color)}><X size={12} /></button>
                </span>
              ))}
              {activeSizes.map(size => (
                <span key={size} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-200">
                  EU {size} <button onClick={() => toggleSize(size)}><X size={12} /></button>
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

   
      <section className="px-4 sm:px-6 lg:px-8 pb-24 pt-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          <Sidebar
            activeFilter={activeFilter} setActiveFilter={setActiveFilter}
            activeColors={activeColors} toggleColor={toggleColor}
            priceMin={priceMin} setPriceMin={setPriceMin}
            priceMax={priceMax} setPriceMax={setPriceMax}
            activeDesigner={activeDesigner} setActiveDesigner={setActiveDesigner}
            activeSizes={activeSizes} toggleSize={toggleSize}
            resultCount={resultCount} onReset={handleReset}
          />

          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
                <p className="text-gray-400 text-lg mb-2">Məhsul tapılmadı.</p>
                <p className="text-gray-300 text-sm mb-6">Başqa filtr və ya axtarış sözü yoxlayın.</p>
                <button onClick={handleReset} className="px-6 py-2.5 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition-colors">Filtrləri sıfırla</button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  key={currentPage + activeFilter + activeDesigner + activeColors.join(',') + activeSizes.join(',') + priceMin + priceMax + sortBy + searchQuery}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
                  className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  {currentProducts.map((product, index) => (
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

                {/* Пагинация */}
                {currentPagesTotal > 1 && (
                  <div className="flex items-center justify-center gap-1 sm:gap-2 mt-12 overflow-x-auto py-4">
                    <button
                      onClick={() => {
                        setCurrentPage(prev => Math.max(prev - 1, 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
                        currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      <ChevronLeft size={16} /> Əvvəlki
                    </button>

                    {getPaginationPages().map((page, index) => {
                      if (page === '...') {
                        return <span key={`ellipsis-${index}`} className="px-2 text-gray-400">...</span>;
                      }
                      const isSelected = currentPage === page;
                      return (
                        <button
                          key={page}
                          onClick={() => {
                            setCurrentPage(page);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`min-w-[36px] h-9 px-3 rounded-md text-sm font-medium transition-all ${
                            isSelected
                              ? 'bg-transparent text-gray-900 font-bold scale-110'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => {
                        setCurrentPage(prev => Math.min(prev + 1, currentPagesTotal));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === currentPagesTotal}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
                        currentPage === currentPagesTotal ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      Növbəti <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <MobileFilterDrawer
        isOpen={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}
        activeFilter={activeFilter} setActiveFilter={setActiveFilter}
        activeColors={activeColors} toggleColor={toggleColor}
        priceMin={priceMin} setPriceMin={setPriceMin}
        priceMax={priceMax} setPriceMax={setPriceMax}
        activeDesigner={activeDesigner} setActiveDesigner={setActiveDesigner}
        activeSizes={activeSizes} toggleSize={toggleSize}
        resultCount={resultCount} onReset={handleReset}
      />
    </div>
  );
};

export default ShopPage;