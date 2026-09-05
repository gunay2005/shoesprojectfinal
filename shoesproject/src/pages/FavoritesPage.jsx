import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, CheckCircle2, ShoppingBag, Eye, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { useCart } from '../hooks/useCart';

export const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState(null);

  const handleRemove = (product, e) => {
    e.stopPropagation();
    removeFromFavorites(product.id);
    
   
    setToastMessage(`"${product.name}" seçilmişlərdən silindi`);
    
    
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-36 pb-24 bg-gradient-to-br from-rose-50/60 via-amber-50/40 to-sky-50/50">
      
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

      
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-24 right-6 z-50 flex items-center gap-3 bg-emerald-500 text-white px-5 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/20 backdrop-blur-md border border-emerald-400/30"
          >
            <CheckCircle2 size={20} className="text-white shrink-0" />
            <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
      
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-rose-100/60 pb-8"
        >
          <div>
            <div className="flex items-center gap-2 text-rose-500 font-semibold text-xs tracking-[0.2em] uppercase mb-2">
              <Heart size={14} className="fill-rose-500" />
              <span>Şəxsi Kolleksiyanız</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Seçilmiş Məhsullar
            </h1>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span className="px-4 py-1.5 bg-white/80 backdrop-blur-md text-rose-600 rounded-full text-xs font-semibold tracking-wide shadow-sm border border-rose-100">
              {favorites.length} {favorites.length === 1 ? 'məhsul' : 'məhsul'}
            </span>
          </div>
        </motion.div>

        
        {favorites.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20 px-4 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/80 shadow-xl shadow-rose-500/5 max-w-xl mx-auto my-8"
          >
            <div className="w-20 h-20 bg-gradient-to-tr from-rose-100 to-amber-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Heart size={36} strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Hələ heç bir məhsul əlavə etməmisiniz
            </h2>
            <p className="text-gray-500 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
              Bəyəndiyiniz məhsulların üzərindəki ürək işarəsinə klikləyərək onları burada saxlaya bilərsiniz.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-rose-600 transition-all duration-300 shadow-lg shadow-gray-900/10 hover:shadow-rose-600/20"
            >
              <span>Alış-verişə başla</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        ) : (
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10"
          >
            <AnimatePresence>
              {favorites.map((product, index) => {
                const mainImage = product.images?.[0] || product.image;

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    
                    <div 
                      className="relative aspect-[3/4] bg-[#f0ece6] overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <img 
                        src={mainImage} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                     
                      <button 
                        onClick={(e) => handleRemove(product, e)}
                        className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-md transition-all z-10 hover:bg-white hover:scale-110"
                        title="Seçilmişlərdən sil"
                      >
                        <Heart size={16} className="fill-rose-500 text-rose-500" />
                      </button>

                      
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between z-10">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product, product.sizes?.[0] || null, product.colors?.[0] || null, 1);
                          }}
                          className="px-3.5 py-2 bg-gray-900 text-white rounded-full text-[11px] font-semibold tracking-wide hover:bg-gray-800 transition-all flex items-center gap-1.5 shadow-lg"
                        >
                          <ShoppingBag size={13} />
                          Səbətə əlavə et
                        </button>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${product.id}`);
                          }}
                          className="w-9 h-9 bg-white/95 text-gray-900 rounded-full flex items-center justify-center hover:bg-white shadow-lg"
                        >
                          <Eye size={15} />
                        </button>
                      </div>
                    </div>

                    
                    <div className="p-4 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              className={i < Math.floor(product.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} 
                            />
                          ))}
                        </div>
                        <h3 
                          className="font-medium text-gray-900 hover:text-rose-500 transition-colors cursor-pointer text-[14px] line-clamp-1"
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          {product.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="font-bold text-[15px] text-gray-900">₼ {product.price}</span>
                        {product.oldPrice && (
                          <span className="text-[13px] text-gray-400 line-through">₼ {product.oldPrice}</span>
                        )}
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
};