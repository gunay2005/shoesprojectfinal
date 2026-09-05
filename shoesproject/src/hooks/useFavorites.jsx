import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth, getUserKey } from './useAuth.jsx';

const FavoritesContext = createContext();

const getFavoritesStorageKey = (userKey) => `serra_favorites:${userKey}`;
const isGuest = (userKey) => userKey === 'guest';

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const userKey = getUserKey(user);

  
 
  const [favorites, setFavorites] = useState(() => {
    if (isGuest(userKey)) return [];
    try {
      const saved = localStorage.getItem(getFavoritesStorageKey(userKey));
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  
  
  
  const prevUserKey = useRef(userKey);
  useEffect(() => {
    if (prevUserKey.current === userKey) return;
    prevUserKey.current = userKey;

    if (isGuest(userKey)) {
      setFavorites([]);
      return;
    }
    try {
      const saved = localStorage.getItem(getFavoritesStorageKey(userKey));
      setFavorites(saved ? JSON.parse(saved) : []);
    } catch {
      setFavorites([]);
    }
  }, [userKey]);

  
  useEffect(() => {
    if (isGuest(userKey)) return;
    try {
      localStorage.setItem(getFavoritesStorageKey(userKey), JSON.stringify(favorites));
    } catch (e) {
      console.error('Seçilmişlər yadda saxlanılmadı:', e);
    }
  }, [favorites, userKey]);

  const addToFavorites = (product) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== productId));
  };

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  return (
    <FavoritesContext.Provider 
      value={{ favorites, addToFavorites, removeFromFavorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);