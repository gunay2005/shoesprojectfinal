// ==========================================
// 📁 src/hooks/useProducts.js
// Хук доступа к данным (products + categories)
// ==========================================

import products from '../data/products.json';
import categories from '../data/categories.json';

export const useProducts = () => {
  return { products, categories };
};