import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();




const CURRENT_USER_KEY = 'shoes_current_user';


export const getUserKey = (user) => (user?.email ? user.email.trim().toLowerCase() : 'guest');

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // При перезагрузке страницы читаем активную сессию из памяти
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch (e) {
      console.error('Сессия не прочитана, очищается:', e);
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
    } catch (e) {
      console.error('Сессия не сохранена:', e);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);