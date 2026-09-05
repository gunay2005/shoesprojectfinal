import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PromoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenPromo = localStorage.getItem('hasSeenPromoModal');

    if (!hasSeenPromo) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenPromoModal', 'true');
    setIsOpen(false);
  };

  const handleAction = () => {
    handleClose();
    navigate('/shop');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6 pointer-events-auto overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto md:overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 rounded-lg md:rounded-none my-auto"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 left-4 md:top-5 md:left-5 z-30 text-gray-800 hover:text-black transition-colors p-2 bg-white/90 shadow-sm rounded-full"
              aria-label="Close modal"
            >
              <X size={22} strokeWidth={1.5} />
            </button>

            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center text-center bg-white order-2 md:order-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-900 mb-2 tracking-wide mt-6 md:mt-0">
                Serra.az-da
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-gray-900 mb-6 md:mb-8 tracking-tight">
                50%-Dək Endirim
              </h3>

              <button
                onClick={handleAction}
                className="w-full bg-black hover:bg-gray-900 text-white font-medium py-3.5 sm:py-4 px-6 rounded-none transition-colors text-xs tracking-[0.2em] uppercase mb-4 sm:mb-6"
              >
                İNDİ SİFARİŞ ET
              </button>

              <button
                onClick={handleClose}
                className="text-xs text-gray-500 hover:text-black underline transition-colors mb-6 md:mb-8 font-light"
              >
                Əsas səhifəyə qayıt
              </button>

              <p className="text-[10px] sm:text-[11px] text-red-500 leading-tight font-light max-w-xs">
                *Endirimlər zamanı çatdırılma müddətlərində gecikmə ola bilər
              </p>
            </div>

            <div className="w-full md:w-1/2 relative min-h-[220px] sm:min-h-[280px] md:min-h-[500px] order-1 md:order-2">
              <img
                src="https://cdn.shopify.com/s/files/1/0336/7793/files/EvianaClutchIvoryFALTcopy_3_c9945d7e-d169-4470-9e85-e30d26d4f7da_832x.jpg?v=1784072658"
                alt="Serra Promo"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};