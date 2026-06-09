import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Clock, Star, Zap, TrendingUp, ChevronRight } from 'lucide-react';
import { products, ProductCard } from './App.jsx';


const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }) => (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-gray-900 text-white rounded-2xl p-4 min-w-[80px] text-center"
    >
      <div className="text-3xl font-bold">{String(value).padStart(2, '0')}</div>
      <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">{label}</div>
    </motion.div>
  );

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <TimeBox value={timeLeft.days} label="Gün" />
      <TimeBox value={timeLeft.hours} label="Saat" />
      <TimeBox value={timeLeft.minutes} label="Dəqiqə" />
      <TimeBox value={timeLeft.seconds} label="Saniyə" />
    </div>
  );
};

const StaggeredGrid = ({ products, title, subtitle }) => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-rose-500 font-medium uppercase tracking-wider text-sm">{subtitle}</span>
          <h2 className="text-5xl font-bold text-gray-900 mt-2">{title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const NewArrivalsHero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-[70vh] min-h-[600px] overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=1080&fit=crop" 
          alt="New Collection"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/20 border border-rose-500/30 rounded-full text-rose-400 text-sm font-medium mb-6"
          >
            <Sparkles size={16} />
            Yeni Kolleksiya 2026
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Bu Həftənin<br/>
            <span className="text-rose-400">Yeni Gələnləri</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-300 mb-8 max-w-lg"
          >
            Dünyanın ən böyük moda evlərindən ilhamlanan yeni kolleksiyamızı kəşf edin. Məhdud sayda!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-12"
          >
            <p className="text-gray-400 mb-4">Təklifin bitməsinə qalıb:</p>
            <CountdownTimer />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/shop')}
            className="px-10 py-5 bg-rose-500 text-white rounded-full font-bold text-lg hover:bg-rose-600 transition-colors flex items-center gap-3 shadow-lg shadow-rose-500/30"
          >
            Bütün Yeni Gələnləri Gör <ArrowRight size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};


const TrendingSection = () => {
  const trending = products.filter(p => p.badge === 'Ən Çox Satılan').slice(0, 3);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-rose-500 mb-2">
              <TrendingUp size={20} />
              <span className="font-medium uppercase tracking-wider text-sm">Trenddə</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Ən Populyar Yeni Gələnlər</h2>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-gray-900 font-medium hover:text-rose-500 transition-colors group">
            Hamısına Bax <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {trending.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-rose-500 text-white rounded-full text-xs font-bold">
                    #{index + 1} Ən Çox Satılan
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-white">${product.price}</span>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <span className="text-white text-sm">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const NewsletterBanner = () => {
  return (
    <section className="py-20 bg-rose-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Zap size={48} className="mx-auto text-white mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">Yeni Gələnlərdən İlk Siz Xəbər Tutan Olun</h2>
          <p className="text-rose-100 mb-8 max-w-lg mx-auto">
            E-poçtunuzu qeyd edin və yeni kolleksiyalar, eksklüziv təkliflər və endirimlərdən ilk xəbərdar olun.
          </p>
          <div className="flex max-w-md mx-auto gap-3">
            <input 
              type="email" 
              placeholder="E-poçtunuz"
              className="flex-1 px-6 py-4 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20"
            />
            <button className="px-8 py-4 bg-white text-rose-500 rounded-full font-bold hover:bg-gray-100 transition-colors whitespace-nowrap">
              Abunə Ol
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


// NEW ARRIVALS PAGE

const NewArrivalsPage = () => {
  const newProducts = products.filter(p => p.badge === 'Yeni');
  const allProducts = products.slice(0, 12);

  return (
    <div className="pt-20">
      <NewArrivalsHero />
      <StaggeredGrid 
        products={newProducts} 
        title="Yeni Gələnlər" 
        subtitle="Bu Ay" 
      />
      <TrendingSection />
      <StaggeredGrid 
        products={allProducts} 
        title="Bütün Kolleksiya" 
        subtitle="2026 Yaz/Yay" 
      />
      <NewsletterBanner />
    </div>
  );
};

export default NewArrivalsPage;