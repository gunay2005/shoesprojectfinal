import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, XCircle } from 'lucide-react';
import products from '../data/products.json';

export const SearchOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleProductClick = (productId) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <motion.button whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(true)} className="p-2 rounded-full transition-colors text-gray-700 hover:bg-gray-100">
        <Search size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
            <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ type: "spring", damping: 25 }} className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-4 p-4 border-b">
                  <Search size={24} className="text-gray-400" />
                  <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ayaqqabı axtar..." className="flex-1 text-lg outline-none text-gray-900 placeholder-gray-400" />
                  <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={() => { setIsOpen(false); setQuery(''); }} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={20} className="text-gray-500" />
                  </motion.button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                  {results.length > 0 ? (
                    <div className="p-4 space-y-3">
                      <p className="text-sm text-gray-500 mb-3">{results.length} nəticə tapıldı</p>
                      {results.map((product, index) => (
                        <motion.div key={product.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} onClick={() => handleProductClick(product.id)} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-500">{product.category}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-bold text-rose-500">${product.price}</span>
                              {product.oldPrice && <span className="text-sm text-gray-400 line-through">${product.oldPrice}</span>}
                            </div>
                          </div>
                          <ArrowRight size={18} className="text-gray-400" />
                        </motion.div>
                      ))}
                    </div>
                  ) : query.trim() ? (
                    <div className="p-8 text-center">
                      <XCircle size={48} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">"{query}" üçün nəticə tapılmadı</p>
                      <p className="text-sm text-gray-400 mt-1">Başqa açar söz ilə cəhd edin</p>
                    </div>
                  ) : (
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-4">Populyar axtarışlar:</p>
                      <div className="flex flex-wrap gap-2">
                        {['Dabanlıq', 'Səndəl', 'Çəkmə', 'Krossovka', 'Pompa'].map(term => (
                          <button key={term} onClick={() => setQuery(term)} className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-rose-100 hover:text-rose-600 transition-colors">{term}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};