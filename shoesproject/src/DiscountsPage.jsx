import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Percent, Tag, Clock, Star, Zap, ShoppingBag, ChevronRight, Flame } from 'lucide-react';
import { products, ProductCard } from './App.jsx';


const SaleHero = () => {
  const navigate = useNavigate();
  const [hoveredDeal, setHoveredDeal] = useState(null);

  const deals = [
    { percent: 40, label: "Yay Endirimi", color: "rose" },
    { percent: 30, label: "Yeni İl Təklifi", color: "amber" },
    { percent: 50, label: "Son Fırsat", color: "emerald" },
  ];

  return (
    <div className="relative min-h-[80vh] overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop" 
          alt="Sale"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Percent size={64} className="text-rose-500" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-7xl md:text-9xl font-bold text-white mb-6"
          >
            <span className="text-rose-500">BÖYÜK</span><br/>
            ENDİRİM
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl text-gray-300 mb-12"
          >
            Seçilmiş məhsullarda <span className="text-rose-400 font-bold">50%-dək endirim</span>
          </motion.p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {deals.map((deal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onMouseEnter={() => setHoveredDeal(index)}
                onMouseLeave={() => setHoveredDeal(null)}
                className={`relative px-8 py-6 rounded-3xl cursor-pointer transition-all ${
                  deal.color === 'rose' ? 'bg-rose-500/20 border-2 border-rose-500/50' :
                  deal.color === 'amber' ? 'bg-amber-500/20 border-2 border-amber-500/50' :
                  'bg-emerald-500/20 border-2 border-emerald-500/50'
                }`}
              >
                <motion.div
                  animate={{ scale: hoveredDeal === index ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.5 }}
                  className={`text-5xl font-bold mb-2 ${
                    deal.color === 'rose' ? 'text-rose-400' :
                    deal.color === 'amber' ? 'text-amber-400' :
                    'text-emerald-400'
                  }`}
                >
                  {deal.percent}%
                </motion.div>
                <div className="text-white font-medium">{deal.label}</div>

                {hoveredDeal === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Flame size={24} className="text-orange-500" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/shop')}
            className="px-12 py-5 bg-rose-500 text-white rounded-full font-bold text-lg hover:bg-rose-600 transition-colors flex items-center gap-3 mx-auto shadow-lg shadow-rose-500/30"
          >
            <ShoppingBag size={20} />
            Endirimləri Keşf Et
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};


const FlashSale = () => {
  const flashProducts = products.filter(p => p.badge === 'Endirim').slice(0, 4);

  return (
    <section className="py-20 bg-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center">
              <Zap size={28} className="text-white" />
            </div>
            <div>
              <span className="text-rose-500 font-medium uppercase tracking-wider text-sm">Məhdud Müddət</span>
              <h2 className="text-4xl font-bold text-gray-900">Flash Satış</h2>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-rose-500">
            <Clock size={20} />
            <span className="font-bold">Yalnız bu həftəsonu!</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {flashProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute -top-3 -right-3 z-10">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                >
                  -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </motion.div>
              </div>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const CategoryDeals = () => {
  const categoryDeals = [
    { category: "heels", name: "Dabanlıqlar", discount: 35, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop" },
    { category: "boots", name: "Çəkmələr", discount: 40, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=400&fit=crop" },
    { category: "sandals", name: "Səndəllər", discount: 30, image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=400&fit=crop" },
    { category: "sneakers", name: "Krossovkalar", discount: 25, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=400&fit=crop" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-rose-500 font-medium uppercase tracking-wider text-sm">Kateqoriya Üzrə</span>
          <h2 className="text-5xl font-bold text-gray-900 mt-2">Endirimli Kateqoriyalar</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {categoryDeals.map((deal, index) => (
            <motion.div
              key={deal.category}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-3xl aspect-[16/9] group cursor-pointer"
            >
              <img 
                src={deal.image} 
                alt={deal.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="absolute top-6 left-6">
                <motion.div
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="px-4 py-2 bg-rose-500 text-white rounded-full font-bold text-sm"
                >
                  {deal.discount}% ENDİRİM
                </motion.div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-3xl font-bold text-white mb-2">{deal.name}</h3>
                <p className="text-white/80 mb-4">Seçilmiş {deal.name.toLowerCase()}lərdə endirim</p>
                <Link 
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors"
                >
                  İndi Alış-veriş Et <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const BundleDeal = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-3xl p-12 md:p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Tag size={48} className="mx-auto text-white mb-6" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">2 Al, 3 Ödə!</h2>
            <p className="text-xl text-white/80 mb-8 max-w-lg mx-auto">
              İki cüt ayaqqabı alın və üçüncü cütə <span className="font-bold text-white">50% endirim</span> əldə edin.
              Məhdud müddətli təklif!
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-rose-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Təklifdən Yararlan
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// DISCOUNTS PAGE

const DiscountsPage = () => {
  const discountProducts = products.filter(p => p.oldPrice !== null);

  return (
    <div className="pt-20">
      <SaleHero />
      <FlashSale />
      <CategoryDeals />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-rose-500 font-medium uppercase tracking-wider text-sm">Bütün Endirimlər</span>
            <h2 className="text-5xl font-bold text-gray-900 mt-2">Endirimdə Olanlar</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {discountProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BundleDeal />
    </div>
  );
};

export default DiscountsPage;