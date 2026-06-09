import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Plus, Minus, ChevronRight, Trash2, Check, Filter, Grid3X3, List } from 'lucide-react';
import { products, categories, useCart, ProductCard } from './App.jsx';



const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const categoriesList = ['all', ...categories.map(c => c.id)];

  const filtered = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const priceFiltered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

  const sorted = [...priceFiltered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Bütün Məhsullar</h1>
          <p className="text-gray-500 text-lg">{sorted.length} məhsul tapıldı</p>
        </motion.div>

        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categoriesList.map(cat => (
              <motion.button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat 
                    ? 'bg-gray-900 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'Hamısı' : categories.find(c => c.id === cat)?.name}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* View Mode Toggle */}
            <div className="flex border rounded-lg overflow-hidden">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2.5 ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid3X3 size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2.5 ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
              >
                <List size={18} />
              </button>
            </div>

            {/* Sort */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-rose-500 bg-white"
            >
              <option value="featured">Seçilmiş</option>
              <option value="price-low">Qiymət: Aşağıdan Yuxarı</option>
              <option value="price-high">Qiymət: Yuxarıdan Aşağı</option>
              <option value="rating">Ən Çox Reytinq</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div 
          layout 
          className={`gap-8 ${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
              : 'flex flex-col'
          }`}
        >
          <AnimatePresence>
            {sorted.map(product => (
              <motion.div 
                key={product.id} 
                layout 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};


export const ProductPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) return (
    <div className="pt-24 text-center min-h-screen flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-4">Məhsul tapılmadı</h1>
        <button onClick={() => navigate('/shop')} className="text-rose-500 font-medium hover:underline">
          Mağazaya Qayıt
        </button>
      </motion.div>
    </div>
  );

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Zəhmət olmasa, ölçü və rəng seçin');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.nav 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-gray-500 mb-8"
        >
          <Link to="/" className="hover:text-gray-900">Ana Səhifə</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-gray-900">Mağaza</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900">{product.name}</span>
        </motion.nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="space-y-4"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 shadow-xl">
              <motion.img 
                key={activeImage} 
                src={product.images[activeImage]} 
                alt={product.name}
                initial={{ opacity: 0, scale: 1.1 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <motion.button 
                  key={i} 
                  onClick={() => setActiveImage(i)}
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === i ? 'border-rose-500 ring-2 ring-rose-200' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.2 }}
          >
            {product.badge && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }}
                className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white mb-6 ${
                  product.badge === 'Endirim' ? 'bg-red-500' : product.badge === 'Yeni' ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              >
                {product.badge}
              </motion.span>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} 
                  />
                ))}
              </div>
              <span className="text-gray-500">{product.rating} ({product.reviews} rəy)</span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-bold text-gray-900">${product.price}</span>
              {product.oldPrice && (
                <>
                  <span className="text-2xl text-gray-400 line-through">${product.oldPrice}</span>
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-bold">
                    ${product.oldPrice - product.price} qənaət
                  </span>
                </>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-6 mb-6 border-b">
              {[
                { id: 'description', label: 'Təsvir' },
                { id: 'details', label: 'Detallar' },
                { id: 'shipping', label: 'Çatdırılma' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-sm font-medium transition-colors relative ${
                    activeTab === tab.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8"
              >
                {activeTab === 'description' && (
                  <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
                )}
                {activeTab === 'details' && (
                  <div className="space-y-2 text-gray-600">
                    <p><strong>Material:</strong> Premium Dəri</p>
                    <p><strong>Hündürlük:</strong> 8cm daban</p>
                    <p><strong>İstehsal:</strong> İtaliya</p>
                    <p><strong>SKU:</strong> SL-{product.id.toString().padStart(4, '0')}</p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-2 text-gray-600">
                    <p>🚚 Pulsuz çatdırılma $150-dən yuxarı sifarişlərdə</p>
                    <p>📦 3-5 iş günü ərzində çatdırılma</p>
                    <p>↩️ 30 günlük asan qaytarma</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Colors */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Rəng: <span className="text-gray-500 font-normal">{selectedColor || 'Seçin'}</span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <motion.button 
                    key={color} 
                    onClick={() => setSelectedColor(color)}
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-all ${
                      selectedColor === color 
                        ? 'border-gray-900 bg-gray-900 text-white' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">
                Ölçü: <span className="text-gray-500 font-normal">{selectedSize || 'Seçin'}</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <motion.button 
                    key={size} 
                    onClick={() => setSelectedSize(size)}
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className={`w-14 h-14 rounded-xl border-2 font-medium transition-all ${
                      selectedSize === size 
                        ? 'border-gray-900 bg-gray-900 text-white' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border-2 border-gray-200 rounded-xl">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                  className="px-4 py-3 hover:bg-gray-100 rounded-l-xl transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-14 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)} 
                  className="px-4 py-3 hover:bg-gray-100 rounded-r-xl transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  addedToCart ? 'bg-emerald-500 text-white' : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {addedToCart ? <><Check size={20} /> Əlavə Edildi!</> : <><ShoppingBag size={20} /> Səbətə Əlavə Et — ${product.price * quantity}</>}
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-14 h-14 border-2 rounded-xl flex items-center justify-center transition-all ${
                  isWishlisted ? 'border-rose-500 bg-rose-50' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <Heart size={20} className={isWishlisted ? 'fill-rose-500 text-rose-500' : ''} />
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-100">
              {[
                { icon: "🚚", text: "Pulsuz Çatdırılma" },
                { icon: "↩️", text: "Asan Qaytarma" },
                { icon: "🔒", text: "Təhlükəsiz Ödəniş" }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <p className="text-xs text-gray-500">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Bunlar da Sizi Maraqlandıra Bilər</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;