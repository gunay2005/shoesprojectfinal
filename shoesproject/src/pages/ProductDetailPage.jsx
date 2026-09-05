import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, ShoppingBag, Minus, Plus, Check, ChevronLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '../hooks/useCart.jsx';
import gallery from '../data/gallery.json';

const colorMap = {
  'Beige': '#D4C4A8', 'Brown': '#8B5E3C', 'Gold': '#F3E5AB', 'Silver': '#C0C0C0',
  'Green': '#8A9A86', 'Red': '#FF0000', 'Blue': '#E0F2FE', 'Black': '#000000', 'White': '#F5F5F5'
};

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const product = useMemo(() => gallery.find(p => p.id === id), [id]);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('One Size');
  const [qty, setQty] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedColor(product.colors?.[0] || '');
      setSelectedSize(product.sizes?.[0] || 'One Size');
      setActiveImage(0);
      setQty(1);
      setAddedToCart(false);
    }
  }, [id, product]);

  const handleBackToShop = () => {
    navigate(`/cantalar${location.search}`);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Məhsul tapılmadı.</p>
          <button onClick={handleBackToShop} className="px-6 py-2.5 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-800 transition-colors">
            Çantalara qayıt
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const colorIndex = product.colors.indexOf(color);
    if (colorIndex !== -1 && colorIndex < images.length) {
      setActiveImage(colorIndex);
    }
  };

  const handleImageSelect = (index) => {
    setActiveImage(index);
    if (product.colors && index < product.colors.length) {
      setSelectedColor(product.colors[index]);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const related = useMemo(() => {
    let candidates = gallery.filter(
      p => p.subcategory === product.subcategory && p.id !== product.id
    );
    if (candidates.length < 4) {
      const otherSub = gallery.filter(
        p => p.category === product.category &&
             p.id !== product.id &&
             p.subcategory !== product.subcategory
      );
      candidates = [...candidates, ...otherSub];
    }
    return shuffleArray(candidates).slice(0, 4);
  }, [product]);

  return (
    <div className="min-h-screen bg-[#faf8f5] overflow-x-hidden">
      <div className="pt-20 pb-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={handleBackToShop}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft size={14} />
            Çantalara qayıt
          </button>
        </div>
      </div>

      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md mx-auto lg:max-w-none"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3 shadow-sm max-h-[420px] mx-auto">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    src={images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 justify-center overflow-x-auto no-scrollbar pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => handleImageSelect(i)}
                      className={`w-14 h-16 rounded-lg overflow-hidden border shrink-0 transition-all ${activeImage === i ? 'border-gray-900 ring-1 ring-gray-900' : 'border-transparent hover:border-gray-300'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col min-w-0"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-gray-500 truncate">
                  {product.designer}
                </span>
                {product.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold text-white shrink-0 ${product.badge === 'Endirim' ? 'bg-red-500' : 'bg-emerald-500'}`}>
                    {product.badge}
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 break-words">
                {product.name}
              </h1>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                ))}
                <span className="text-xs text-gray-500 ml-1">({product.reviews || 0} rəy)</span>
              </div>

              <div className="flex items-center gap-2.5 mb-4 flex-wrap">
                <span className="text-2xl font-bold text-gray-900">₼ {product.price}</span>
                {product.oldPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">₼ {product.oldPrice}</span>
                    <span className="px-2 py-0.5 bg-red-50 text-red-500 text-[11px] font-bold rounded-full">
                      -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-gray-900 mb-2">
                    Rəng: <span className="text-gray-500 font-normal">{selectedColor}</span>
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorSelect(color)}
                        title={color}
                        className={`w-8 h-8 rounded-full border transition-all flex items-center justify-center shrink-0 ${selectedColor === color ? 'border-gray-900 ring-1 ring-gray-900 scale-105' : 'border-gray-200 hover:border-gray-400'}`}
                        style={{ backgroundColor: colorMap[color] || '#ccc' }}
                      >
                        {selectedColor === color && <Check size={12} className="text-gray-900" strokeWidth={3} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-gray-900 mb-2">
                    Ölçü: <span className="text-gray-500 font-normal">{selectedSize}</span>
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-1.5 text-xs rounded-lg border transition-all ${selectedSize === size ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shrink-0">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Minus size={12} />
                  </button>
                  <span className="w-8 text-center text-xs font-semibold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-9 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Plus size={12} />
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className={`flex-1 h-10 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all min-w-0 px-2 ${
                    addedToCart ? 'bg-emerald-500 text-white' : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {addedToCart ? <><Check size={16} className="shrink-0" /> <span className="truncate">Səbətə əlavə edildi</span></> : <><ShoppingBag size={16} className="shrink-0" /> <span className="truncate">Səbətə əlavə et</span></>}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all shrink-0 ${isWishlisted ? 'bg-rose-50 border-rose-200' : 'bg-white border-gray-200 hover:border-gray-400'}`}
                >
                  <Heart size={16} className={isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-600'} />
                </motion.button>
              </div>

              <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gray-200/60">
                <div className="flex flex-col items-center text-center gap-1">
                  <Truck size={16} className="text-gray-400" />
                  <span className="text-[10px] text-gray-500 uppercase tracking-tight">Pulsuz çatdırılma</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <Shield size={16} className="text-gray-400" />
                  <span className="text-[10px] text-gray-500 uppercase tracking-tight">Original məhsul</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <RotateCcw size={16} className="text-gray-400" />
                  <span className="text-[10px] text-gray-500 uppercase tracking-tight">14 gün qaytarma</span>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="flex items-center justify-between w-full text-left py-2 border-b border-gray-100"
                >
                  <span className="text-xs font-semibold text-gray-900">Məhsul haqqında</span>
                  <span className="text-gray-400 text-sm">{showFullDesc ? '−' : '+'}</span>
                </button>
                <AnimatePresence>
                  {showFullDesc && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-gray-600 leading-relaxed py-3">
                        {product.fullDescription || product.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-bold text-gray-900 tracking-wide mb-6">Oxşar məhsullar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => navigate(`/product/${p.id}${location.search}`)}
                  className="cursor-pointer group min-w-0"
                >
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 mb-2">
                    <img src={p.image || p.images?.[0]} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider truncate">{p.designer}</p>
                  <h3 className="text-xs font-medium text-gray-900 mt-0.5 line-clamp-1">{p.name}</h3>
                  <p className="text-xs font-bold text-gray-900 mt-0.5">₼ {p.price}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;