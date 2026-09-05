import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, CheckCircle2 } from 'lucide-react';
import { useCart } from '../hooks/useCart.jsx';

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal, clearCart, setCartItems } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Səbətiniz boşdur");
      return;
    }

    setIsSuccess(true);
    
    if (typeof clearCart === 'function') {
      clearCart();
    } else if (typeof setCartItems === 'function') {
      setCartItems([]);
    } else {
      cartItems.forEach(item => removeFromCart(item.id, item.size, item.color));
    }
    
    setTimeout(() => {
      setIsSuccess(false);
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed right-0 top-0 w-full h-[100dvh] md:max-w-md bg-white z-50 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Səbətiniz ({cartItems.length})</h2>
              <motion.button whileHover={{ rotate: 90 }} onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></motion.button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {isSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full text-center py-12">
                  <CheckCircle2 size={64} className="text-emerald-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Sifariş uğurla tamamlandı!</h3>
                  <p className="text-gray-500">Tezliklə sizinlə əlaqə saxlanılacaq.</p>
                </motion.div>
              ) : cartItems.length === 0 ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                  <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Səbətiniz boşdur</p>
                  <button onClick={() => setIsCartOpen(false)} className="mt-4 text-rose-500 font-medium hover:underline">Alış-verişə Davam Et</button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <motion.div key={`${item.id}-${item.size}-${item.color}`} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm sm:text-base">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">Ölçü: {item.size} / Rəng: {item.color}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 border rounded-lg">
                            <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} className="p-1 hover:bg-gray-100"><Minus size={14} /></button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} className="p-1 hover:bg-gray-100"><Plus size={14} /></button>
                          </div>
                          <span className="font-bold text-gray-900 text-sm sm:text-base">${item.price * item.quantity}</span>
                        </div>
                      </div>
                      <motion.button whileHover={{ scale: 1.2, rotate: 10 }} onClick={() => removeFromCart(item.id, item.size, item.color)} className="text-gray-400 hover:text-red-500 transition-colors self-start"><Trash2 size={18} /></motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {!isSuccess && cartItems.length > 0 && (
              <div className="border-t p-4 sm:p-6 space-y-3 sm:space-y-4 shrink-0 bg-white pb-safe">
                <div className="flex justify-between text-lg font-bold"><span>Cəmi</span><span>${cartTotal.toFixed(2)}</span></div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleCheckout} className="w-full bg-gray-900 text-white py-3 sm:py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors">Sifariş Et</motion.button>
                <button onClick={() => setIsCartOpen(false)} className="w-full text-center text-gray-500 hover:text-gray-900 text-sm">Alış-verişə Davam Et</button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};