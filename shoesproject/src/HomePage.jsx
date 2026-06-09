import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Play, Pause, Star, ArrowUpRight, Heart, Instagram, ChevronLeft, Sparkles } from 'lucide-react';
import { products, categories, testimonials, ProductCard, AnimatedCounter } from './App.jsx';

const VideoHero = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative h-screen min-h-[800px] overflow-hidden">
      {/* Animated background layers with parallax */}
      <motion.div 
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1920&h=1080&fit=crop"
        >
          <source src="https://wokiee-demo5.myshopify.com/cdn/shop/videos/c/vp/0d181eed54f748d9bffd51d3e5b7f1d3/0d181eed54f748d9bffd51d3e5b7f1d3.HD-1080p-7.2Mbps-63777432.mp4?v=0" type="video/mp4" />
        </video>
      </motion.div>

      {/* Animated gradient overlays */}
      <motion.div 
        animate={{ 
          background: [
            "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.4), transparent)",
            "linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.5), transparent)",
            "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.4), transparent)"
          ]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-rose-400/30 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: "100%",
              opacity: 0 
            }}
            animate={{ 
              y: "-10%",
              opacity: [0, 1, 0],
              x: Math.random() * 100 + "%"
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl text-white"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-8 border border-white/20"
          >
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-rose-400 rounded-full" 
            />
            Yeni Yay Kolleksiyası 2026
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold leading-[0.95] mb-8"
          >
            <motion.span
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 bg-[length:200%_auto]"
            >
              Zərifliyə
            </motion.span>
            <br/>
            <span className="text-white">Addım Atın</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-lg"
          >
            Əl işi qadın ayaqqabıları kolleksiyamızı kəşf edin. Gözə çarpan dabanlıqlardan gündəlik rahatlığa — mükəmməl cütdünüzü tapın.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(244,63,94,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/shop')}
              className="px-8 py-4 bg-rose-500 text-white rounded-full font-bold flex items-center gap-2 hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/25"
            >
              İndi Alış-veriş Et <ArrowRight size={18} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white/50 text-white rounded-full font-bold hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              Lookbook-a Bax
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={toggleVideo}
        className="absolute bottom-8 right-8 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors border border-white/30"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </motion.button>

      <motion.div 
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-7 h-12 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <motion.div 
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="w-1.5 h-1.5 bg-rose-400 rounded-full" 
          />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-32 right-20 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3">
            <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=60&h=60&fit=crop" alt="" className="w-12 h-12 rounded-xl object-cover" />
            <div>
              <p className="text-white text-sm font-bold">İndi Satıldı</p>
              <p className="text-white/60 text-xs">2 dəqiqə əvvəl</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


const Marquee = ({ items, direction = "left", speed = 30 }) => {
  const duplicated = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden py-6 border-y border-gray-200">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: direction === "left" ? [0, -1000] : [-1000, 0] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      >
        {duplicated.map((item, i) => (
          <div key={i} className="flex items-center gap-4 shrink-0">
            <span className="text-2xl md:text-4xl font-bold uppercase tracking-wider text-gray-900">{item.text}</span>
            {item.image && (
              <img src={item.image} alt="" className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-full" />
            )}
            <span className="text-rose-500 text-2xl">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const MarqueeImages = () => {
  const images = [
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=300&h=300&fit=crop",
  ];
  const duplicated = [...images, ...images, ...images];

  return (
    <div className="overflow-hidden py-8">
      <motion.div
        className="flex gap-4"
        animate={{ x: [0, -1500] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        {duplicated.map((img, i) => (
          <motion.div 
            key={i} 
            className="shrink-0 w-48 h-64 rounded-2xl overflow-hidden"
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};


//анимация
const AnimatedTextStrip = () => {
  const items = [
    { text: "ZƏRİF DABANLIQLAR", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=100&h=100&fit=crop" },
    { text: "YAY SƏNDƏLLƏRİ", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=100&h=100&fit=crop" },
    { text: "KLASSİK POMPALAR", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=100&h=100&fit=crop" },
    { text: "QİŞ ÇƏKMƏLƏRİ", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=100&h=100&fit=crop" },
    { text: "RAHAT FLATLAR", image: "https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=100&h=100&fit=crop" },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <Marquee items={items} direction="left" speed={20} />
    </div>
  );
};

const AnimatedTextStripReverse = () => {
  const items = [
    { text: "PULSUZ ÇATDIRILMA", image: null },
    { text: "PREMİUM DƏRİ", image: null },
    { text: "ƏL İŞİ", image: null },
    { text: "30 GÜNLÜK QAYTARMA", image: null },
    { text: "YENİ GƏLƏNLƏR", image: null },
  ];

  return (
    <div className="py-8 bg-gray-900">
      <Marquee items={items} direction="right" speed={15} />
    </div>
  );
};


const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-rose-100 text-rose-600 rounded-full text-sm font-semibold mb-4"
          >
            Stilə Görə Gəz
          </motion.span>
          <h2 className="text-5xl font-bold text-gray-900">Kateqoriyalar</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -15, scale: 1.02 }}
              onClick={() => navigate('/shop')}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl aspect-[3/4] mb-3 shadow-lg shadow-gray-200/50">
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-white font-bold text-xl">{cat.name}</h3>
                  <p className="text-white/80 text-sm mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Kəşf Et <ArrowRight size={14} />
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const FeaturedProducts = () => {
  const featured = products.slice(0, 4);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="text-rose-500 font-medium uppercase tracking-wider text-sm">Trenddə Olanlar</span>
            <h2 className="text-5xl font-bold text-gray-900 mt-2">Seçilmiş Kolleksiya</h2>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-gray-900 font-medium hover:text-rose-500 transition-colors group">
            Hamısına Bax <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};


const ParallaxBanner = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 1, 1]);
  const navigate = useNavigate();

  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&h=1080&fit=crop" 
          alt=""
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center"
      >
        <div className="max-w-xl text-white">
          <motion.span 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-rose-400 font-medium uppercase tracking-wider text-sm mb-4 block"
          >
            Məhdud Müddətli Təklif
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Yay Endirimi<br/>
            <span className="text-rose-400">40%-dək</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/80 mb-8"
          >
            Mövsümün ən böyük endirimini qaçırmayın. Premium dabanlıqlar, səndəllər və daha çoxu.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/shop')}
            className="px-10 py-5 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            Endirimdən Al <ArrowRight size={18} />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};


const NewArrivals = () => {
  const newProducts = products.filter(p => p.badge === 'Yeni' || p.badge === 'Ən Çox Satılan');
  const scrollRef = useRef(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-rose-500 font-medium uppercase tracking-wider text-sm">Təzə Gələnlər</span>
            <h2 className="text-5xl font-bold text-gray-900 mt-2">Yeni Kolleksiya</h2>
          </div>
          <div className="flex gap-2">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' })}
              className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-900 transition-colors"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' })}
              className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-900 transition-colors"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </motion.div>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {newProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="snap-start shrink-0 w-80"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DualBanners = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
            className="relative overflow-hidden rounded-3xl aspect-[4/5] group cursor-pointer"
          >
            <motion.img 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7 }}
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=1000&fit=crop" 
              alt="Heels"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <span className="text-rose-400 font-medium text-sm uppercase tracking-wider mb-3 block">
                Yay Endirimi
              </span>
              <h3 className="text-4xl font-bold text-white mb-4">40%-dək Endirim<br/>Dabanlıqlar & Pompalar</h3>
              <motion.button 
                whileHover={{ scale: 1.05, x: 5 }}
                className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Endirimdən Al <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl aspect-[4/5] group cursor-pointer"
          >
            <motion.img 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.7 }}
              src="https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&h=1000&fit=crop" 
              alt="Boots"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <span className="text-emerald-400 font-medium text-sm uppercase tracking-wider mb-3 block">
                Yeni Gələnlər
              </span>
              <h3 className="text-4xl font-bold text-white mb-4">Payız Çəkmə<br/>Kolleksiyası</h3>
              <motion.button 
                whileHover={{ scale: 1.05, x: 5 }}
                className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                İndi Kəşf Et <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


const OurLooks = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const looks = [
    { 
      id: 1,
      title: "Şəhər Şıqlığı", 
      desc: "Hər gün üçün zərif",
      image1: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop",
      image2: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
      product: products[0]
    },
    { 
      id: 2,
      title: "Gecə Parlaqlığı", 
      desc: "Xüsusi anlar üçün",
      image1: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop",
      image2: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop",
      product: products[2]
    },
    { 
      id: 3,
      title: "Ofis Stili", 
      desc: "Peşəkar görünüş",
      image1: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=800&fit=crop",
      image2: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop",
      product: products[1]
    },
    { 
      id: 4,
      title: "Həftəsonu Rahatlığı", 
      desc: "Gündəlik komfort",
      image1: "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=600&h=800&fit=crop",
      image2: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=800&fit=crop",
      product: products[3]
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-rose-500 font-medium uppercase tracking-wider text-sm">Stil Bələdçisi</span>
          <h2 className="text-5xl font-bold text-gray-900 mt-2">Görünüşlərimiz</h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">Kursoru şəkillərin üzərinə aparın və məhsulu canlı olaraq görün</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {looks.map((look, index) => (
            <motion.div
              key={look.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative overflow-hidden rounded-3xl aspect-[16/9] group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Base Image with color overlay animation */}
              <motion.img 
                src={look.image1} 
                alt={look.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                animate={{ 
                  scale: hoveredIndex === index ? 1.1 : 1,
                  filter: hoveredIndex === index ? "brightness(0.7) sepia(0.3)" : "brightness(1)"
                }}
              />

              {/* Hover Image with zoom and color change */}
              <motion.img 
                src={look.image2} 
                alt={look.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ 
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1.05 : 1.2,
                  filter: hoveredIndex === index ? "brightness(1.1) contrast(1.1)" : "brightness(1)"
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />

              {/* Animated gradient overlay */}
              <motion.div 
                className="absolute inset-0"
                animate={{
                  background: hoveredIndex === index 
                    ? "linear-gradient(to top, rgba(0,0,0,0.8), rgba(244,63,94,0.2), transparent)"
                    : "linear-gradient(to top, rgba(0,0,0,0.7), transparent, transparent)"
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Product Card on Hover */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, x: -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 30, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl"
                  >
                    <div className="flex items-center gap-4">
                      <motion.img 
                        src={look.product.image} 
                        alt="" 
                        className="w-16 h-16 rounded-xl object-cover"
                        whileHover={{ scale: 1.1 }}
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{look.product.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold text-rose-500">${look.product.price}</span>
                          {look.product.oldPrice && (
                            <span className="text-sm text-gray-400 line-through">${look.product.oldPrice}</span>
                          )}
                        </div>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
                      >
                        Seç
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Default Text with animation */}
              <motion.div 
                className="absolute bottom-6 left-6"
                animate={{
                  y: hoveredIndex === index ? -100 : 0,
                  opacity: hoveredIndex === index ? 0 : 1
                }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-3xl font-bold text-white mb-2">{look.title}</h3>
                <p className="text-white/80">{look.desc}</p>
              </motion.div>

              {/* Hover indicator */}
              <motion.div
                className="absolute top-6 right-6"
                animate={{
                  scale: hoveredIndex === index ? 1 : 0,
                  opacity: hoveredIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                  <ArrowUpRight size={20} className="text-white" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


// анимация
const StatsSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <AnimatedCounter target={2400} suffix="+" label="Bu Ay Sifariş" />
          <div className="hidden md:block w-px bg-gray-200 mx-auto" />
          <AnimatedCounter target={98} suffix="%" label="Müştəri Məmnuniyyəti" />
          <div className="hidden md:block w-px bg-gray-200 mx-auto" />
          <AnimatedCounter target={153} suffix="+" label="Ayaqqabı Stili" />
        </div>
      </div>
    </section>
  );
};


// TESTIMONIALS

const Testimonials = () => {
  return (
    <section className="py-24 bg-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-rose-500 font-medium uppercase tracking-wider text-sm">Rəylər</span>
          <h2 className="text-5xl font-bold text-gray-900 mt-2">Müştərilərimiz Nə Deyir</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-3xl p-8 shadow-lg shadow-gray-100/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-rose-200" />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">"{testimonial.text}"</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


// INSTAGRAM стр

const InstagramFeed = () => {
  const images = [
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=400&h=400&fit=crop",
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-rose-500 font-medium uppercase tracking-wider text-sm">@serra__az</span>
          <h2 className="text-5xl font-bold text-gray-900 mt-2">Bizi İnstagram-da İzləyin</h2>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer"
            >
              <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-rose-500/80 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                <Instagram size={28} className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


// FEATURES BAR

const FeaturesBar = () => {
  const features = [
    { icon: "🚚", title: "Pulsuz Çatdırılma", desc: "$150-dən yuxarı sifarişlərdə" },
    { icon: "↩️", title: "Asan Qaytarma", desc: "30 günlük qaytarma siyasəti" },
    { icon: "🔒", title: "Təhlükəsiz Ödəniş", desc: "100% təhlükəsiz ödəniş" },
    { icon: "✨", title: "Premium Keyfiyyət", desc: "Əl işi dəri" }
  ];

  return (
    <section className="py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h4 className="font-bold text-gray-900">{feature.title}</h4>
              <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


// NEWSLETTER

const Newsletter = () => {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1920&h=600&fit=crop" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-rose-400 font-medium uppercase tracking-wider text-sm mb-4 block">Əlaqədə Qalın</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Serra İcmasına Qoşulun</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Eksklüziv təkliflər, yeni kolleksiyalara erkən giriş və stil ilhamı üçün abunə olun.
          </p>
          <div className="flex max-w-md mx-auto gap-3">
            <input 
              type="email" 
              placeholder="E-poçtunuzu daxil edin"
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
            />
            <button className="px-8 py-4 bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600 transition-colors whitespace-nowrap">
              Abunə Ol
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// HOME PAGE

const HomePage = () => {
  return (
    <div>
      <VideoHero />
      <AnimatedTextStrip />
      <Categories />
      <MarqueeImages />
      <FeaturedProducts />
      <ParallaxBanner />
      <AnimatedTextStripReverse />
      <NewArrivals />
      <DualBanners />
      <OurLooks />
      <StatsSection />
      <Testimonials />
      <InstagramFeed />
      <FeaturesBar />
      <Newsletter />
    </div>
  );
};

export default HomePage;