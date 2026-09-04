import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// DİQQƏT: bu, "kim hazırda daxil olub" sessiyasıdır.
// AuthDrawer.jsx-dəki 'shoes_users' isə BÜTÜN qeydiyyatdan keçmiş hesabların
// siyahısıdır (login/qeydiyyat üçün). Bu ikisi qəsdən ayrıdır.
const CURRENT_USER_KEY = 'shoes_current_user';

// Cart/Favorites kimi hesaba görə fərqlənən data üçün ortaq açar generatoru.
// Email yoxdursa (nəzəri olaraq mümkün deyil, amma ehtiyat üçün) 'guest' istifadə olunur.
export const getUserKey = (user) => (user?.email ? user.email.trim().toLowerCase() : 'guest');

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Səhifə yenilənəndə aktiv sessiyanı yaddaşdan oxuyuruq
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CURRENT_USER_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch (e) {
      console.error('Sessiya oxunmadı, təmizlənir:', e);
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
    } catch (e) {
      console.error('Sessiya yadda saxlanılmadı:', e);
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