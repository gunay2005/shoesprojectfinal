// ==========================================
// 📁 src/pages/HomePage.jsx
// Ana Səhifə — Главная страница
// Секции: VideoHero, Marquee, Categories, Featured, Parallax, NewArrivals, DualBanners, OurLooks, Stats, Testimonials, Instagram, Features, Newsletter
// ==========================================

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, Play, Pause, Star, ArrowUpRight, Heart, Instagram, ChevronLeft } from 'lucide-react';
import products from '../data/products.json';
import categories from '../data/categories.json';
import { ProductCard } from '../components/ProductCard.jsx';
import { AnimatedCounter } from '../components/AnimatedCounter.jsx';

/* ---------- Testimonials data (inline, only for HomePage) ---------- */
const testimonials = [
  { id: 1, name: "Sofiya N.", role: "Moda Bloqçusu", text: "Bu dabanlıqların keyfiyyəti inanılmazdır. Artıq 5 tədbirdə geyindim və hələ də yeni kimi görünürlər!", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
  { id: 2, name: "Rachel L.", role: "Stilist", text: "Nəhayət, həm stil, həm də rahatlıq anlayan bir ayaqqabı mağazası tapdım. Müştərilərim hər cürdən ovsunlanıb.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { id: 3, name: "Anna V.", role: "Dizayner", text: "Yalnızca qablaşma məni satın almağa vadar etdi. Ama ayaqqabılar? Təm mükəmməllik.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { id: 4, name: "Mariya K.", role: "Sahibkar", text: "Bir dəfəyə 3 cüt aldım. Səndəllər yay stilimdir, çəkmələr isə qışı zərif keçirməyimə kömək etdi.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: 5, name: "Elena R.", role: "Model", text: "Bu stilettolar podyumdakı gizli silahımdır. Uzun çəkilişlər üçün kifayət qədər rahat və möhtəşəmdir.", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face" },
  { id: 6, name: "Cessika T.", role: "Hüquqşünas", text: "Peşəkar görünməli, ayaqlarımı isə öldürməməli ayaqqabılar axtarırdım. Bu pompalar tam olaraq budur.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face" }
];

/* =========================   VIDEO HERO  ========================= */
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
    <div className="relative h-[100svh] min-h-[600px] md:min-h-[800px] overflow-hidden">
      <motion.div style={{ y: backgroundY, opacity }} className="absolute inset-0">
        <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" poster="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1920&h=1080&fit=crop">
          <source src="https://wokiee-demo5.myshopify.com/cdn/shop/videos/c/vp/0d181eed54f748d9bffd51d3e5b7f1d3/0d181eed54f748d9bffd51d3e5b7f1d3.HD-1080p-7.2Mbps-63777432.mp4?v=0" type="video/mp4" />
        </video>
      </motion.div>

      <motion.div animate={{ background: ["linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.4), transparent)","linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.5), transparent)","linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.4), transparent)"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div key={i} className="absolute w-2 h-2 bg-rose-400/30 rounded-full" initial={{ x: Math.random() * 100 + "%", y: "100%", opacity: 0 }} animate={{ y: "-10%", opacity: [0, 1, 0], x: Math.random() * 100 + "%" }} transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }} />
        ))}
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="max-w-2xl text-white pt-16 sm:pt-0">
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.5, type: "spring" }} className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-white/10 backdrop-blur-md rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 border border-white/20">
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 bg-rose-400 rounded-full" />
            Yeni Yay Kolleksiyası 2026
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="text-4xl sm:text-6xl md:text-8xl font-bold leading-[0.95] mb-6 sm:mb-8">
            <motion.span animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 bg-[length:200%_auto]">Zərifliyə</motion.span><br/>
            <span className="text-white">Addım Atın</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-10 leading-relaxed max-w-lg">
            Əl işi qadın ayaqqabıları kolleksiyamızı kəşf edin. Gözə çarpan dabanlıqlardan gündəlik rahatlığa — mükəmməl cütdünüzü tapın.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <motion.button whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(244,63,94,0.3)" }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/shop')} className="w-full sm:w-auto px-8 py-4 bg-rose-500 text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/25">İndi Alış-veriş Et <ArrowRight size={18} /></motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/cantalar')} className="w-full sm:w-auto px-8 py-4 border-2 border-white/50 text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors backdrop-blur-sm">Çanta al <ArrowRight size={18} /></motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} onClick={toggleVideo} className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/35 transition-colors border border-white/30 z-10">
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </motion.button>

      <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block">
        <div className="w-7 h-12 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <motion.div animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 2.5 }} className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
        </div>
      </motion.div>

      <motion.div animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute top-32 right-20 hidden lg:block">
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

/* =========================   MARQUEE  ========================= */
const Marquee = ({ items, direction = "left", speed = 30 }) => {
  const duplicated = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden py-4 sm:py-5 border-y border-rose-200/50 bg-gradient-to-r from-rose-50/60 via-white to-pink-50/60 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(244,63,94,0.07)]">
      <motion.div 
        className="flex gap-6 sm:gap-10 items-center whitespace-nowrap" 
        animate={{ x: direction === "left" ? [0, -1000] : [-1000, 0] }} 
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
      >
        {duplicated.map((item, i) => (
          <div key={i} className="flex items-center gap-5 sm:gap-7 shrink-0">
            <span className="text-xs sm:text-sm font-light tracking-[0.25em] text-gray-800 font-sans uppercase">
              {typeof item === 'string' ? item : item.text}
            </span>
            {item && typeof item === 'object' && item.image && (
              <motion.div 
                className="relative cursor-pointer group"
                whileHover={{ scale: 1.55, zIndex: 50 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {/* Элегантый фоновый ореол при ховере */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-400 via-pink-400 to-rose-300 opacity-30 group-hover:opacity-100 blur-sm transition duration-300" />
                
                {/* Картинка */}
                <img 
                  src={item.image} 
                  alt="" 
                  className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 object-cover rounded-full border-2 border-white shadow-md transition-shadow duration-300 group-hover:shadow-rose-400/40" 
                />
              </motion.div>
            )}
            <span className="text-rose-400/70 text-[9px] font-serif">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const MarqueeImages = () => {
  const images = [
    "https://cdn.shopify.com/s/files/1/0336/7793/files/REIGNSANDAL_GLD_260709_CultGaia_F2622962_WEBBED_832x.jpg?v=1784927339",
    "https://cdn.shopify.com/s/files/1/0336/7793/files/EVECLUTCH_260709_CultGaia_F2621934_1_1_300x.jpg?v=1786993105",
    "https://cdn.shopify.com/s/files/1/0336/7793/products/CG_S.HS23_009_WEB_4c2c48d4-472e-43e9-9b5f-781dd21710d3_300x.jpg?v=1675967301",
    "https://cdn.shopify.com/s/files/1/0336/7793/files/MaddieSandalJavaF_WEB_300x.jpg?v=1731554762",
    "https://cdn.shopify.com/s/files/1/0336/7793/files/NEEMOCLUTCH_260522_CultGaia_PF26_pick-ups_20596copy_WEBBED_300x.jpg?v=1780097466",
    "https://cdn.shopify.com/s/files/1/0336/7793/files/RiaSandalF_300x.jpg?v=1744056087",
  ];
  const duplicated = [...images, ...images, ...images];
  return (
    <div className="overflow-hidden py-6 sm:py-8">
      <motion.div className="flex gap-4 sm:gap-5" animate={{ x: [0, -1500] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }}>
        {duplicated.map((img, i) => (
          <motion.div 
            key={i} 
            className="shrink-0 w-36 h-48 sm:w-48 sm:h-64 rounded-2xl overflow-hidden border border-rose-100 shadow-md cursor-pointer" 
            whileHover={{ scale: 1.15, y: -10, boxShadow: "0 20px 25px -5px rgba(244, 63, 94, 0.25)" }} 
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

/* =========================   TEXT STRIPS  ========================= */
const AnimatedTextStrip = () => {
  const items = [
    { text: "Zərif Dabanlıqlar", image: "https://cdn.shopify.com/s/files/1/0336/7793/files/SAGESANDAL_RM_260420_CultGaia_Product-PF2619409_WEBBED_200x.jpg?v=1778277820" },
    { text: "Yay Səndəlləri", image: "https://cdn.shopify.com/s/files/1/0336/7793/files/AMINASANDAL_BLK_260108_Cult-Gaia_Product13372_WEBBED_300x.jpg?v=1770661879" },
    { text: "Klassik Pompalar", image: "https://cdn.shopify.com/s/files/1/0336/7793/files/NINASANDAL_BLK_260123_Cult-Gaia_Product14969_WEBBED_450x.jpg?v=1771952583" },
    { text: "Qış Çəkmələri", image: "https://cdn2.emporium.az/i/p/500/16212136-90d4c7ba3a657234c74abbeebadf66f4.jpg" },
    { text: "Rahat Flatlar", image: "https://cdn.shopify.com/s/files/1/0336/7793/files/CLAIRESANDAL_250709_CultGaia_F25-AX-FTW-BAGS6280_WEBBED_300x.jpg?v=1754504525" },
  ];
  return (
    <div className="py-2">
      <Marquee items={items} direction="left" speed={25} />
    </div>
  );
};

const AnimatedTextStripReverse = () => {
  const items = [
    { text: "Pulsuz Çatdırılma", image: null },
    { text: "Premium Dəri", image: null },
    { text: "Əl İşləməsi", image: null },
    { text: "30 Günlük Qaytarma", image: null },
    { text: "Yeni Gələnlər", image: null },
  ];
  return (
    <div className="py-2 bg-gray-900 text-white">
      <Marquee items={items} direction="right" speed={20} />
    </div>
  );
};

/* =========================   CATEGORIES  ========================= */
const Categories = () => {
  const navigate = useNavigate();

const handleCategoryClick = (cat) => {
  // Если категория относится к сумкам — перенаправляем на /cantalar
  if (cat.category === 'bags' || ['mini', 'clutches', 'bucket-bags', 'tote', 'shoulder', 'crossbody'].includes(cat.id)) {
    // Приводим ID к правильному имени подкатегории
    const bagFilter = cat.id === 'bucket-bags' ? 'bucket' : cat.id === 'clutches' ? 'clutch' : cat.id;
    
    navigate('/cantalar', { state: { filter: bagFilter } });
  } else {
    // В остальных случаях (обувь) переходим на /shop
    navigate(`/shop?category=${cat.id}`, { state: { filter: cat.id, category: cat.id } });
  }
};

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-16">
          <motion.span initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-block px-4 py-1.5 bg-rose-100 text-rose-600 rounded-full text-sm font-semibold mb-4">Stilə Görə Gəz</motion.span>
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900">Kateqoriyalar</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat, index) => (
            <motion.div 
              key={cat.id} 
              initial={{ opacity: 0, y: 40, scale: 0.9 }} 
              whileInView={{ opacity: 1, y: 0, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }} 
              whileHover={{ y: -15, scale: 1.02 }} 
              onClick={() => handleCategoryClick(cat)} 
              className="group cursor-pointer select-none"
            >
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[3/4] mb-3 shadow-lg shadow-gray-200/50">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5">
                  <h3 className="text-white font-bold text-base sm:text-xl">{cat.name}</h3>
                  <p className="text-white/80 text-xs sm:text-sm mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">Kəşf Et <ArrowRight size={14} /></p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================   FEATURED PRODUCTS  ========================= */
const FeaturedProducts = () => {
  const featured = products.slice(0, 4);
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-16 gap-4">
          <div>
            <span className="text-rose-500 font-medium uppercase tracking-wider text-sm">Trenddə Olanlar</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mt-2">Seçilmiş Kolleksiya</h2>
          </div>
          <Link to="/shop" className="flex items-center gap-2 text-gray-900 font-medium hover:text-rose-500 transition-colors group">Hamısına Bax <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" /></Link>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featured.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  );
};

/* =========================   PARALLAX BANNER  ========================= */
const ParallaxBanner = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 1, 1]);
  const navigate = useNavigate();

  return (
    <section className="relative h-[70vh] sm:h-[80vh] min-h-[500px] sm:min-h-[600px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src="https://cultgaia.com/cdn/shop/files/HP_Banner.jpg?v=1787029136&width=2000" alt="" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-xl text-white">
          <motion.span initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-rose-400 font-medium uppercase tracking-wider text-sm mb-3 sm:mb-4 block">
            Məhdud Müddətli Təklif
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            Yay Endirimi<br/><span className="text-rose-400">40%-dək</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8">
            Mövsümün ən böyük endirimini qaçırmayın. Premium dabanlıqlar, səndəllər və daha çoxu.
          </motion.p>

          {/* Изменен путь с '/shop' на '/discounts' */}
          <motion.button 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.6 }} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            onClick={() => navigate('/discounts')} 
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            Endirimdən Al <ArrowRight size={18} />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

/* =========================   NEW ARRIVALS (Home)  ========================= */
const NewArrivals = () => {
  const newProducts = products.filter(p => p.badge === 'Yeni' || p.badge === 'Ən Çox Satılan');
  const scrollRef = useRef(null);
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-rose-500 font-medium uppercase tracking-wider text-sm">Təzə Gələnlər</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mt-2">Yeni Kolleksiya</h2>
          </div>
          <div className="flex gap-2">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' })} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-900 transition-colors"><ChevronLeft size={18} /></motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' })} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-900 transition-colors"><ChevronRight size={18} /></motion.button>
          </div>
        </motion.div>
        <div ref={scrollRef} className="flex gap-6 sm:gap-8 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {newProducts.map((product, index) => (
            <motion.div key={product.id} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="snap-start shrink-0 w-72 sm:w-80">
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
/* =========================  DUAL BANNERS  ========================= */
const DualBanners = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Слегка увеличили ширину контейнера (max-w-6xl вместо max-w-5xl) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Левый баннер (Обувь) */}
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            onClick={() => navigate('/shop?category=shoes')}
            className="relative overflow-hidden rounded-3xl aspect-[4/3] md:aspect-[10/9] group cursor-pointer shadow-xl bg-[#e5e7e4] flex items-center justify-center"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0336/7793/files/SOPHIESANDAL_CHIVE_260709_CultGaia_F2621845_832x.jpg?v=1784667631"
              alt="Heels"
              className="w-full h-full object-contain scale-150 transform transition-transform duration-700 ease-out group-hover:scale-160"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-8 left-8 right-8 text-white z-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/80 text-white font-medium text-xs uppercase tracking-wider mb-3 backdrop-blur-md shadow-sm">
                Yay Endirimi
              </span>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-4 drop-shadow-md">
                Ayaqqabı<br />Kolleksiyası
              </h3>
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3.5 bg-white text-gray-900 rounded-full font-bold text-sm hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center gap-2 shadow-lg"
              >
                Ayaqqabı Al <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>

          {/* Правый баннер (Сумки) */}
          <motion.div
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            onClick={() => navigate('/cantalar')}
            className="relative overflow-hidden rounded-3xl aspect-[4/3] md:aspect-[10/9] group cursor-pointer shadow-xl bg-[#e5e7e4] flex items-center justify-center"
          >
            <img
              src="https://cdn.shopify.com/s/files/1/0336/7793/files/LAGUNA_DOMINGA_251120_Cult-Gaia_Product_0681_W1a_WEBBED_800x.jpg?v=1770586481"
              alt="Bags"
              className="w-full h-full object-contain scale-150 transform transition-transform duration-700 ease-out group-hover:scale-160"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-8 left-8 right-8 text-white z-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/80 text-white font-medium text-xs uppercase tracking-wider mb-3 backdrop-blur-md shadow-sm">
                Yeni Gələnlər
              </span>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-4 drop-shadow-md">
                Çantalar<br />Kolleksiyası
              </h3>
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-3.5 bg-white text-gray-900 rounded-full font-bold text-sm hover:bg-emerald-50 hover:text-emerald-600 transition-all flex items-center gap-2 shadow-lg"
              >
                Çanta Al <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

/* =========================  OUR LOOKS  ========================= */
const OurLooks = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const looks = [
    { id: 1, title: "Şəhər Şıqlığı", desc: "Hər gün üçün zərif", image1: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop", image2: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop", product: products[0] },
    { id: 2, title: "Gecə Parlaqlığı", desc: "Xüsusi anlar üçün", image1: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop", image2: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop", product: products[2] },
    { id: 3, title: "Ofis Stili", desc: "Peşəkar görünüş", image1: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=800&fit=crop", image2: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop", product: products[1] },
    { id: 4, title: "Həftəsonu Rahatlığı", desc: "Gündəlik komfort", image1: "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=600&h=800&fit=crop", image2: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=800&fit=crop", product: products[3] },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-rose-500 font-medium uppercase tracking-wider text-sm">Stil Bələdçisi</span>
          <h2 className="text-5xl font-bold text-gray-900 mt-2">Görünüşlərimiz</h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">Kursoru şəkillərin üzərinə aparın və məhsulu canlı olaraq görün</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {looks.map((look, index) => (
            <motion.div key={look.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }} className="relative overflow-hidden rounded-3xl aspect-[16/9] group cursor-pointer" onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
              <motion.img src={look.image1} alt={look.title} className="absolute inset-0 w-full h-full object-cover transition-all duration-700" animate={{ scale: hoveredIndex === index ? 1.1 : 1, filter: hoveredIndex === index ? "brightness(0.7) sepia(0.3)" : "brightness(1)" }} />
              <motion.img src={look.image2} alt={look.title} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: hoveredIndex === index ? 1 : 0, scale: hoveredIndex === index ? 1.05 : 1.2, filter: hoveredIndex === index ? "brightness(1.1) contrast(1.1)" : "brightness(1)" }} transition={{ duration: 0.6, ease: "easeOut" }} />
              <motion.div className="absolute inset-0" animate={{ background: hoveredIndex === index ? "linear-gradient(to top, rgba(0,0,0,0.8), rgba(244,63,94,0.2), transparent)" : "linear-gradient(to top, rgba(0,0,0,0.7), transparent, transparent)" }} transition={{ duration: 0.5 }} />
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div initial={{ opacity: 0, y: 30, x: -20 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, y: 30, x: -20 }} transition={{ duration: 0.4, ease: "easeOut" }} className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl">
                    <div className="flex items-center gap-4">
                      <motion.img src={look.product.image} alt="" className="w-16 h-16 rounded-xl object-cover" whileHover={{ scale: 1.1 }} />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{look.product.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold text-rose-500">${look.product.price}</span>
                          {look.product.oldPrice && <span className="text-sm text-gray-400 line-through">${look.product.oldPrice}</span>}
                        </div>
                      </div>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors">Seç</motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div className="absolute bottom-6 left-6" animate={{ y: hoveredIndex === index ? -100 : 0, opacity: hoveredIndex === index ? 0 : 1 }} transition={{ duration: 0.4 }}>
                <h3 className="text-3xl font-bold text-white mb-2">{look.title}</h3>
                <p className="text-white/80">{look.desc}</p>
              </motion.div>
              <motion.div className="absolute top-6 right-6" animate={{ scale: hoveredIndex === index ? 1 : 0, opacity: hoveredIndex === index ? 1 : 0 }} transition={{ duration: 0.3 }}>
                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center"><ArrowUpRight size={20} className="text-white" /></div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================  STATS  ========================= */
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

/* =========================  TESTIMONIALS  ========================= */
const Testimonials = () => {
  return (
    <section className="py-24 bg-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-rose-500 font-medium uppercase tracking-wider text-sm">Rəylər</span>
          <h2 className="text-5xl font-bold text-gray-900 mt-2">Müştərilərimiz Nə Deyir</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }} whileHover={{ y: -8, scale: 1.02 }} className="bg-white rounded-3xl p-8 shadow-lg shadow-gray-100/50">
              <div className="flex items-center gap-4 mb-6">
                <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-rose-200" />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">"{testimonial.text}"</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-amber-400 text-amber-400" />)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================  INSTAGRAM FEED  ========================= */
const instagramItems = [
  {
    id: 1,
    video: "https://static.pxlecdn.com/photos/794869840/original/354c0c80c397c548642d.mp4",
    username: "@maddison_lynn",
    product: {
      name: "The Evening Bow Bag",
      image: "https://static.pxlecdn.com/products/73763314/primary/thumb/c12432ba62879e03f83c63f30a65f090.jpg",
      link: "/cantalar"
    }
  },
  {
    id: 2,
    video: "https://static.pxlecdn.com/photos/788067394/original/36fde967aa15a2367f52.mp4",
    username: "@serra__az",
    product: {
      name: "Stiletto Classic",
      image: "https://static.pxlecdn.com/products/72896156/primary/thumb/208ca60b972421e353d6fdf537567524.jpg",
      link: "/shop"
    }
  },
  {
    id: 3,
    video: "https://static.pxlecdn.com/photos/782662986/original/af9ff94e18f008d1d251.mp4",
    username: "@fashion_style",
    product: {
      name: "Elegance Heels",
      image: "https://static.pxlecdn.com/products/72238340/primary/thumb/d1a4c21646ac52366f017ff321a44baf.jpg",
      link: "/shop"
    }
  },
  {
    id: 4,
    video: "https://static.pxlecdn.com/photos/783093032/original/c29bd18316a734238915.mp4",
    username: "@runway_look",
    product: {
      name: "Luxury Heels",
      image: "https://static.pxlecdn.com/products/72863476/primary/thumb/7385df0f3e8841936ce4560fcd49fb14.jpg",
      link: "/shop"
    }
  },
  {
    id: 5,
    video: "https://static.pxlecdn.com/photos/780439894/original/6ee2d35d8a783952fb9f.mp4",
    username: "@bag_collection",
    product: {
      name: "Crossbody Boots",
      image: "https://static.pxlecdn.com/products/72863482/primary/thumb/1f8d0e6ef32729b4413d0889278fa29c.jpg",
      link: "/shop"
    }
  }
];

const InstagramFeed = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

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

        {/* Сетка вертикальных карточек */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {instagramItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedItem(item)}
              className="relative overflow-hidden rounded-xl aspect-[4/5] group cursor-pointer bg-gray-900 shadow-sm"
            >
              {/* Превью видео */}
              <video
                src={item.video}
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Легкий градиент и оверлей */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

              {/* Иконка Instagram в правом верхнем углу */}
              <div className="absolute top-3 right-3 text-white/90 drop-shadow-md z-10">
                <Instagram size={20} />
              </div>

              {/* Белая кнопка Play по центру */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center text-gray-900 shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <Play size={24} className="fill-gray-900 translate-x-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Всплывающее модальное окно */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
            >
              {/* Кнопка закрытия */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/10 hover:bg-black/20 text-gray-700 rounded-full flex items-center justify-center transition-colors"
              >
                ✕
              </button>

              {/* Слева: Видео во весь рост */}
              <div className="md:w-3/5 bg-black relative flex flex-col justify-between aspect-[3/4] md:aspect-auto">
                <video
                  src={selectedItem.video}
                  autoPlay
                  controls
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-4 left-4 z-10 text-white font-medium text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                  {selectedItem.username}
                </div>
              </div>

              {/* Справа: Карточка товара */}
              <div className="md:w-2/5 p-8 flex flex-col items-center justify-center text-center bg-white">
                <div className="w-48 h-48 bg-gray-50 rounded-2xl p-4 mb-6 flex items-center justify-center border border-gray-100">
                  <img
                    src={selectedItem.product.image}
                    alt={selectedItem.product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {selectedItem.product.name}
                </h3>
              
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* =========================  FEATURES BAR  ========================= */
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
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }} className="text-center">
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

/* =========================  NEWSLETTER  ========================= */
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Регулярное выражение для проверки корректности email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setError('Düzgün e-poçt ünvanı daxil edin'); // Выводим предупреждение при ошибке
      setSuccess(false);
    } else {
      setError('');
      setSuccess(true); // Сообщение об успешной подписке
      setEmail('');
    }
  };

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1920&h=600&fit=crop" 
          alt="" 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-rose-400 font-medium uppercase tracking-wider text-sm mb-4 block">Əlaqədə Qalın</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Serra İcmasına Qoşulun</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">Eksklüziv təkliflər, yeni kolleksiyalara erkən giriş və stil ilhamı üçün abunə olun.</p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input 
                type="text" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="E-poçtunuzu daxil edin" 
                className={`flex-1 px-6 py-4 rounded-full bg-white/10 border text-white placeholder-white/50 focus:outline-none transition-colors ${
                  error 
                    ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                    : 'border-white/20 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                }`} 
              />
              <button 
                type="submit" 
                className="px-8 py-4 bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600 transition-colors whitespace-nowrap"
              >
                Abunə Ol
              </button>
            </div>

            {/* Сообщение об ошибке */}
            {error && (
              <p className="text-red-400 text-sm mt-2 text-left pl-4 font-medium">{error}</p>
            )}

            {/* Сообщение об успехе */}
            {success && (
              <p className="text-green-400 text-sm mt-3 font-medium">Uğurla tamamlandı!</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================  HOME PAGE EXPORT  ========================= */
const HomePage = () => {
  return (
    <div>
      <VideoHero />
      <AnimatedTextStrip />
      <Categories />
      <NewArrivals />
      <MarqueeImages />
      
      {/* <FeaturedProducts /> */}
      <ParallaxBanner />
      {/* <AnimatedTextStripReverse /> */}
      {/* <NewArrivals /> */}
      <DualBanners />
      {/* <OurLooks /> */}
      <StatsSection />
      {/* <Testimonials /> */}
      <InstagramFeed />
      {/* <FeaturesBar /> */}
      <Newsletter />
    </div>
  );
};

export default HomePage;