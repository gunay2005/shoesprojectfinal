import React, { useState, createContext, useContext, useEffect, useRef } from 'react'; 
import { useAuth, getUserKey } from './useAuth.jsx'; 
 
// Контекст для хранения данных и функций корзины
const CartContext = createContext(); 
 
// Формируем уникальный ключ корзины для каждого пользователя
const getCartStorageKey = (userKey) => `serra_cart:${userKey}`; 
const isGuest = (userKey) => userKey === 'guest'; 
 
export const CartProvider = ({ children }) => { 
  const { user } = useAuth(); 
  const userKey = getUserKey(user); 
 
  // Создаём корзину:  пустая, у авторизованного пользователя загружается из localStorage
  const [cartItems, setCartItems] = useState(() => { 
    if (isGuest(userKey)) return []; 
    try { 
      const saved = localStorage.getItem(getCartStorageKey(userKey)); 
      return saved ? JSON.parse(saved) : []; 
    } catch { 
      return []; 
    } 
  }); 

 
  const [isCartOpen, setIsCartOpen] = useState(false); 
 
  
  const prevUserKey = useRef(userKey); 
  useEffect(() => { 
    if (prevUserKey.current === userKey) return; 
    prevUserKey.current = userKey; 
 
    if (isGuest(userKey)) { 
      setCartItems([]); 
      return; 
    } 

    try { 
      const saved = localStorage.getItem(getCartStorageKey(userKey)); 
      setCartItems(saved ? JSON.parse(saved) : []); 
    } catch { 
      setCartItems([]); 
    } 
  }, [userKey]); 
 
 
  useEffect(() => { 
    if (isGuest(userKey)) return; 
    try { 
      localStorage.setItem(getCartStorageKey(userKey), JSON.stringify(cartItems)); 
    } catch (e) { 
      console.error('Корзина не сохранена:', e); 
    } 
  }, [cartItems, userKey]); 
 
  
  const addToCart = (product, size = null, color = null, qty = 1) => { 
    setCartItems(prev => { 
      const existing = prev.find(item =>  
        item.id === product.id &&  
        (size === null || item.size === size) &&  
        (color === null || item.color === color) 
      ); 

      if (existing) { 
        return prev.map(item => 
          item.id === product.id &&  
          (size === null || item.size === size) &&  
          (color === null || item.color === color) 
            ? { ...item, quantity: item.quantity + qty } : item 
        ); 
      } 

      return [...prev, { ...product, size, color, quantity: qty }]; 
    }); 
    setIsCartOpen(true); 
  }; 
 
  
  const removeFromCart = (id, size = null, color = null) => { 
    setCartItems(prev => prev.filter(item =>  
      !(item.id === id &&  
        (size === null || item.size === size) &&  
        (color === null || item.color === color)) 
    )); 
  }; 
 
  
  const updateQuantity = (id, size = null, color = null, quantity) => { 
    if (quantity < 1) { 
      removeFromCart(id, size, color); 
      return; 
    } 
    setCartItems(prev => prev.map(item => 
      item.id === id &&  
      (size === null || item.size === size) &&  
      (color === null || item.color === color) 
        ? { ...item, quantity } : item 
    )); 
  }; 
 
  
  const clearCart = () => { 
    setCartItems([]); 
  }; 
 
  
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0); 
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0); 
 
  return ( 
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart, 
      isCartOpen, setIsCartOpen, cartTotal, cartCount, setCartItems 
    }}> 
      {children} 
    </CartContext.Provider> 
  ); 
}; 
 

export const useCart = () => useContext(CartContext); 