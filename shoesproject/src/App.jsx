import React, { useState, useEffect, useContext, createContext, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, Star, Heart, Search, Menu, ChevronRight, ArrowRight, Instagram, Facebook, Twitter, ArrowUpRight, ChevronDown, XCircle } from 'lucide-react';
import HomePage from './HomePage.jsx';
import ShopPage, { ProductPage } from './ShopPage.jsx';
import NewArrivalsPage from './NewArrivalsPage.jsx';
import DiscountsPage from './DiscountsPage.jsx';
import AboutPage from './AboutPage.jsx';


export const products = [
  {
    id: 1, name: "Elegant Stiletto Dabanlıqlar", price: 189, oldPrice: 249,
    category: "heels", 
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=600&h=800&fit=crop"
    ],
    rating: 4.8, reviews: 124,
    description: "Əl işi İtalyan dəri stiletto dabanlıqlar. Gecə tədbirləri və xüsusi mərasimlər üçün mükəmməl.",
    sizes: [35,36,37,38,39,40,41], colors: ["Qara","Ten","Qırmızı"], badge: "Ən Çox Satılan", inStock: true
  },
  {
    id: 2, name: "Klassik Dəri Pompalar", price: 159, oldPrice: null,
    category: "pumps", 
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1582897085656-c636d006a246?w=600&h=800&fit=crop"
    ],
    rating: 4.9, reviews: 89,
    description: "Zamansız dəri pompalar. Ofis və ya gecə çıxışları üçün çox yönlü. Premium tam dəri üst.",
    sizes: [35,36,37,38,39,40], colors: ["Qara","Ten","Tünd Mavi"], badge: null, inStock: true
  },
  {
    id: 3, name: "Qızılı İpək Səndəllər", price: 129, oldPrice: 179,
    category: "sandals", 
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&h=800&fit=crop"
    ],
    rating: 4.7, reviews: 56,
    description: "Möhtəşəm qızıl ipək səndəllər. Yastıqlı ayaq yatağı və tənzimlənən toqqa bağlama.",
    sizes: [36,37,38,39,40], colors: ["Qızılı","Gümüşü","Rose Gold"], badge: "Endirim", inStock: true
  },
  {
    id: 4, name: "Platform Ağ Krossovkalar", price: 119, oldPrice: null,
    category: "sneakers", 
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop"
    ],
    rating: 4.6, reviews: 203,
    description: "Trend ağ platform krossovkalar. Nəfəs alan tor üst ilə dəri örtüklər.",
    sizes: [36,37,38,39,40,41,42], colors: ["Ağ","Qara","Çəhrayı"], badge: "Yeni", inStock: true
  },
  {
    id: 5, name: "Dəri Çəkmələr", price: 199, oldPrice: 259,
    category: "boots", 
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop"
    ],
    rating: 4.8, reviews: 78,
    description: "Lüks dəri çəkmələr. Blok daban və yan fermuar. Soyuq aylarda rahatlıq.",
    sizes: [36,37,38,39,40,41], colors: ["Bej","Qara","Konyak"], badge: "Endirim", inStock: true
  },
  {
    id: 6, name: "Balet Flat Ayaqqabılar", price: 89, oldPrice: null,
    category: "flats", 
    image: "https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=600&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1582897085656-c636d006a246?w=600&h=800&fit=crop"
    ],
    rating: 4.5, reviews: 145,
    description: "Klassik balet flat ayaqqabılar. Hər gün üçün mükəmməl rahatlıq.",
    sizes: [35,36,37,38,39,40,41], colors: ["Ten","Qara","Çəhrayı"], badge: null, inStock: true
  },
  {
    id: 7, name: "Espadril Platform Səndəllər", price: 149, oldPrice: null,
    category: "sandals", 
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=800&fit=crop"],
    rating: 4.7, reviews: 67,
    description: "Yay espadril platform səndəllər. Çimərlik günləri və brunchlar üçün ideal.",
    sizes: [36,37,38,39,40], colors: ["Təbii","Tünd Mavi","Qırmızı"], badge: "Yeni", inStock: true
  },
  {
    id: 8, name: "Dizüstü Çəkmələr", price: 279, oldPrice: 349,
    category: "boots", 
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop"],
    rating: 4.9, reviews: 42,
    description: "Premium qara dəri dizüstü çəkmələr. Stiletto daban ilə zərif görünüş.",
    sizes: [36,37,38,39,40], colors: ["Qara","Bordo"], badge: "Ən Çox Satılan", inStock: true
  },
  {
    id: 9, name: "Kristal Gecə Dabanlıqları", price: 329, oldPrice: 399,
    category: "heels", 
    image: "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=600&h=800&fit=crop"],
    rating: 4.9, reviews: 34,
    description: "Parlaq kristal bəzədilmiş gecə dabanlıqları. Qala tədbirləri üçün mükəmməl.",
    sizes: [36,37,38,39,40], colors: ["Gümüşü","Qızılı","Şampan"], badge: "Yeni", inStock: true
  },
  {
    id: 10, name: "Loafer Mules", price: 139, oldPrice: null,
    category: "flats", 
    image: "https://images.unsplash.com/photo-1582897085656-c636d006a246?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1582897085656-c636d006a246?w=600&h=800&fit=crop"],
    rating: 4.6, reviews: 89,
    description: "Zərif arxasız loafer mules. Qızıl detallı dizayn.",
    sizes: [36,37,38,39,40,41], colors: ["Qara","Konyak","Ağ"], badge: null, inStock: true
  },
  {
    id: 11, name: "Chunky Combat Çəkmələr", price: 219, oldPrice: 279,
    category: "boots", 
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop"],
    rating: 4.7, reviews: 156,
    description: "Dəbdəbəli chunky combat çəkmələr. Platform daban və bağlama.",
    sizes: [36,37,38,39,40,41,42], colors: ["Qara","Zeytun","Ağ"], badge: "Endirim", inStock: true
  },
  {
    id: 12, name: "Mesh Qaçış Ayaqqabıları", price: 149, oldPrice: null,
    category: "sneakers", 
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=800&fit=crop"],
    rating: 4.5, reviews: 234,
    description: "Yüngül mesh qaçış ayaqqabıları. Nəfəs alan dizayn.",
    sizes: [36,37,38,39,40,41,42], colors: ["Ağ","Qara","Yaşıl"], badge: "Ən Çox Satılan", inStock: true
  },

  {
    id: 13, name: "Ağ Kristal Dabanlıqlar", price: 289, oldPrice: 359,
    category: "heels", 
    image: "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=600&h=800&fit=crop"],
    rating: 4.8, reviews: 67,
    description: "Parlaq ağ kristal dabanlıqlar. Toy və xüsusi tədbirlər üçün ideal.",
    sizes: [36,37,38,39,40], colors: ["Ağ","Gümüşü"], badge: "Yeni", inStock: true
  },
  {
    id: 14, name: "Qara Klassik Pompalar", price: 179, oldPrice: null,
    category: "pumps", 
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop"],
    rating: 4.7, reviews: 112,
    description: "Elegant qara dəri pompalar. Ofis və biznes görüşlər üçün mükəmməl.",
    sizes: [35,36,37,38,39,40,41], colors: ["Qara","Ten"], badge: "Ən Çox Satılan", inStock: true
  },
  {
    id: 15, name: "Platform Səndəllər", price: 139, oldPrice: 189,
    category: "sandals", 
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=800&fit=crop"],
    rating: 4.6, reviews: 89,
    description: "Trend platform səndəllər. Yay festivalları və gəzintilər üçün ideal.",
    sizes: [36,37,38,39,40,41], colors: ["Qara","Bej","Ağ"], badge: "Endirim", inStock: true
  },
  {
    id: 16, name: "Rəngli Krossovkalar", price: 159, oldPrice: null,
    category: "sneakers", 
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=800&fit=crop"],
    rating: 4.8, reviews: 178,
    description: "Rəngli və cəsarətli krossovkalar. Gündəlik geyim üçün mükəmməl.",
    sizes: [36,37,38,39,40,41,42], colors: ["Rəngli","Ağ","Qara"], badge: "Yeni", inStock: true
  },
  {
    id: 17, name: "Qırmızı Balet Flatlar", price: 99, oldPrice: 129,
    category: "flats", 
    image: "https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=600&h=800&fit=crop"],
    rating: 4.7, reviews: 95,
    description: "Klassik qırmızı balet flatlar. Hər gün üçün zərif və rahat.",
    sizes: [35,36,37,38,39,40], colors: ["Qırmızı","Qara","Ten"], badge: "Endirim", inStock: true
  },
  {
    id: 18, name: "Qızıl Balet Flatlar", price: 119, oldPrice: null,
    category: "flats", 
    image: "https://images.unsplash.com/photo-1582897085656-c636d006a246?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1582897085656-c636d006a246?w=600&h=800&fit=crop"],
    rating: 4.5, reviews: 76,
    description: "Parlaq qızıl balet flatlar. Parti və xüsusi anlar üçün.",
    sizes: [36,37,38,39,40,41], colors: ["Qızıl","Gümüşü"], badge: "Yeni", inStock: true
  },
  {
    id: 19, name: "Dəri Səndəllər", price: 109, oldPrice: 149,
    category: "sandals", 
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&h=800&fit=crop"],
    rating: 4.4, reviews: 134,
    description: "Sadə və rahat dəri səndəllər. Hər gün istifadə üçün ideal.",
    sizes: [36,37,38,39,40], colors: ["Qara","Bej","Qəhvəyi"], badge: "Endirim", inStock: true
  },
  {
    id: 20, name: "Blok Daban Səndəllər", price: 169, oldPrice: null,
    category: "sandals", 
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&h=800&fit=crop"],
    rating: 4.8, reviews: 56,
    description: "Zərif blok daban səndəllər. Ofis və gecə çıxışları üçün.",
    sizes: [36,37,38,39,40,41], colors: ["Ten","Qara","Ağ"], badge: "Yeni", inStock: true
  },
  {
    id: 21, name: "Dizüstü Dəri Çəkmələr", price: 299, oldPrice: 379,
    category: "boots", 
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&h=800&fit=crop"],
    rating: 4.9, reviews: 45,
    description: "Premium dizüstü dəri çəkmələr. Moda və rahatlıq bir arada.",
    sizes: [36,37,38,39,40], colors: ["Qara","Qəhvəyi"], badge: "Endirim", inStock: true
  },
  {
    id: 22, name: "Ağ Platform Krossovkalar", price: 139, oldPrice: null,
    category: "sneakers", 
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop"],
    rating: 4.6, reviews: 167,
    description: "Trend ağ platform krossovkalar. Hər gün üçün rahat və stil.",
    sizes: [36,37,38,39,40,41], colors: ["Ağ","Qara"], badge: "Yeni", inStock: true
  },
  {
    id: 23, name: "Nude Stiletto Dabanlıqlar", price: 199, oldPrice: 259,
    category: "heels", 
    image: "https://images.unsplash.com/photo-1582897085656-c636d006a246?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1582897085656-c636d006a246?w=600&h=800&fit=crop"],
    rating: 4.7, reviews: 98,
    description: "Zərif nude stiletto dabanlıqlar. Hər rəng geyimlə uyğun.",
    sizes: [35,36,37,38,39,40], colors: ["Ten","Qara"], badge: "Endirim", inStock: true
  },
  {
    id: 24, name: "Qara Loaferlər", price: 149, oldPrice: null,
    category: "flats", 
    image: "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=600&h=800&fit=crop",
    images: ["https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=600&h=800&fit=crop"],
    rating: 4.5, reviews: 123,
    description: "Klassik qara loaferlər. Ofis və gündəlik istifadə üçün.",
    sizes: [36,37,38,39,40,41], colors: ["Qara","Konyak"], badge: null, inStock: true
  }
];

export const categories = [
  { id: "heels", name: "Hündür Daban", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop" },
  { id: "sandals", name: "Səndəllər", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=500&fit=crop" },
  { id: "boots", name: "Çəkmələr", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=500&fit=crop" },
  { id: "sneakers", name: "Krossovkalar", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=500&fit=crop" },
  { id: "flats", name: "Flat Ayaqqabılar", image: "https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=400&h=500&fit=crop" },
  { id: "pumps", name: "Pompalar", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=500&fit=crop" }
];

export const testimonials = [
  { id: 1, name: "Sofiya N.", role: "Moda Bloqçusu", text: "Bu dabanlıqların keyfiyyəti inanılmazdır. Artıq 5 tədbirdə geyindim və hələ də yeni kimi görünürlər!", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
  { id: 2, name: "Rachel L.", role: "Stilist", text: "Nəhayət, həm stil, həm də rahatlıq anlayan bir ayaqqabı mağazası tapdım. Müştərilərim hər cürdən ovsunlanıb.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
  { id: 3, name: "Anna V.", role: "Dizayner", text: "Yalnızca qablaşma məni satın almağa vadar etdi. Ama ayaqqabılar? Təm mükəmməllik.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  { id: 4, name: "Mariya K.", role: "Sahibkar", text: "Bir dəfəyə 3 cüt aldım. Səndəllər yay stilimdir, çəkmələr isə qışı zərif keçirməyimə kömək etdi.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: 5, name: "Elena R.", role: "Model", text: "Bu stilettolar podyumdakı gizli silahımdır. Uzun çəkilişlər üçün kifayət qədər rahat və möhtəşəmdir.", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face" },
  { id: 6, name: "Cessika T.", role: "Hüquqşünas", text: "Peşəkar görünməli, ayaqlarımı isə öldürməməli ayaqqabılar axtarırdım. Bu pompalar tam olaraq budur.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face" }
];


// анимации

export const AnimatedCounter = ({ target, suffix = "", label, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <motion.div 
        className="text-5xl md:text-7xl font-bold text-gray-900 mb-2"
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      >
        {count.toLocaleString()}{suffix}
      </motion.div>
      <p className="text-gray-500 uppercase tracking-widest text-sm">{label}</p>
    </motion.div>
  );
};


// CART контент

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, size, color, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size && item.color === color);
      if (existing) {
        return prev.map(item => item.id === product.id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { ...product, size, color, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id, size, color) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size && item.color === color)));
  };

  const updateQuantity = (id, size, color, quantity) => {
    if (quantity < 1) { removeFromCart(id, size, color); return; }
    setCartItems(prev => prev.map(item => item.id === id && item.size === size && item.color === color
      ? { ...item, quantity } : item));
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);


// искать

export const SearchOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleProductClick = (productId) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full transition-colors text-gray-700 hover:bg-gray-100"
      >
        <Search size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-4 p-4 border-b">
                  <Search size={24} className="text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ayaqqabı axtar..."
                    className="flex-1 text-lg outline-none text-gray-900 placeholder-gray-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => { setIsOpen(false); setQuery(''); }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </motion.button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                  {results.length > 0 ? (
                    <div className="p-4 space-y-3">
                      <p className="text-sm text-gray-500 mb-3">{results.length} nəticə tapıldı</p>
                      {results.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleProductClick(product.id)}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-500">{product.category}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-bold text-rose-500">${product.price}</span>
                              {product.oldPrice && <span className="text-sm text-gray-400 line-through">${product.oldPrice}</span>}
                            </div>
                          </div>
                          <ArrowRight size={18} className="text-gray-400" />
                        </motion.div>
                      ))}
                    </div>
                  ) : query.trim() ? (
                    <div className="p-8 text-center">
                      <XCircle size={48} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500">"{query}" üçün nəticə tapılmadı</p>
                      <p className="text-sm text-gray-400 mt-1">Başqa açar söz ilə cəhd edin</p>
                    </div>
                  ) : (
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-4">Populyar axtarışlar:</p>
                      <div className="flex flex-wrap gap-2">
                        {['Dabanlıq', 'Səndəl', 'Çəkmə', 'Krossovka', 'Pompa'].map(term => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-rose-100 hover:text-rose-600 transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


// HEADER with Dropdown

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const navItems = [
    { name: 'Ana Səhifə', path: '/' },
    { name: 'Mağaza', path: '/shop' },
    { name: 'Yeni Gələnlər', path: '/new-arrivals' },
    { name: 'Endirimlər', path: '/discounts' },
    { name: 'Haqqımızda', path: '/about' },
  ];

  const categoryDropdown = [
    { name: 'Hündür Daban', path: '/shop', icon: '👠' },
    { name: 'Səndəllər', path: '/shop', icon: '🩴' },
    { name: 'Çəkmələr', path: '/shop', icon: '👢' },
    { name: 'Krossovkalar', path: '/shop', icon: '👟' },
    { name: 'Flat Ayaqqabılar', path: '/shop', icon: '🥿' },
    { name: 'Pompalar', path: '/shop', icon: '👡' },
  ];
// header esas
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHome ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden"
            >
              <img 
                src="https://i.postimg.cc/CKMDbXDT/Screenshot-2026-06-08-201415.png" 
                alt="Serra.az Logo"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <span className={`text-2xl font-bold tracking-tight transition-colors ${isScrolled || !isHome ? 'text-gray-900' : 'text-white'}`}>
              Serra.az
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative" 
                onMouseEnter={() => item.name === 'Mağaza' && setDropdownOpen(true)}
                onMouseLeave={() => item.name === 'Mağaza' && setDropdownOpen(false)}>
                <Link to={item.path}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-rose-500 flex items-center gap-1 ${
                    isScrolled || !isHome ? 'text-gray-700' : 'text-white/90'
                  }`}>
                  {item.name}
                  {item.name === 'Mağaza' && <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />}
                </Link>

                <AnimatePresence>
                  {item.name === 'Mağaza' && dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden py-2"
                    >
                      {categoryDropdown.map((cat, i) => (
                        <motion.div
                          key={cat.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Link 
                            to={cat.path}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 hover:bg-rose-50 transition-colors group"
                          >
                            <span className="text-xl">{cat.icon}</span>
                            <span className="text-gray-700 font-medium group-hover:text-rose-600">{cat.name}</span>
                            <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all" />
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <SearchOverlay />
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className={`p-2 rounded-full transition-colors relative ${isScrolled || !isHome ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </motion.span>
              )}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ${isScrolled || !isHome ? 'text-gray-700' : 'text-white'}`}>
              <Menu size={24} />
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to={item.path}
                    onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 font-medium py-2">
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};


// CART DRAWER

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Səbətiniz ({cartItems.length})</h2>
              <motion.button whileHover={{ rotate: 90 }} onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </motion.button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
                  <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Səbətiniz boşdur</p>
                  <button onClick={() => setIsCartOpen(false)} className="mt-4 text-rose-500 font-medium hover:underline">
                    Alış-verişə Davam Et
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <motion.div key={`${item.id}-${item.size}-${item.color}`}
                      initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
                      className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">Ölçü: {item.size} / Rəng: {item.color}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 border rounded-lg">
                            <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} className="p-1 hover:bg-gray-100"><Minus size={14} /></button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} className="p-1 hover:bg-gray-100"><Plus size={14} /></button>
                          </div>
                          <span className="font-bold text-gray-900">${item.price * item.quantity}</span>
                        </div>
                      </div>
                      <motion.button whileHover={{ scale: 1.2, rotate: 10 }} onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="text-gray-400 hover:text-red-500 transition-colors self-start">
                        <Trash2 size={18} />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Cəmi</span><span>${cartTotal.toFixed(2)}</span>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors">
                  Sifariş Et
                </motion.button>
                <button onClick={() => setIsCartOpen(false)} className="w-full text-center text-gray-500 hover:text-gray-900 text-sm">
                  Alış-verişə Davam Et
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


// FOOTER

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="https://i.postimg.cc/CKMDbXDT/Screenshot-2026-06-08-201415.png" 
                  alt="Serra.az Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold">Serra.az</span>
            </div>
            <p className="text-gray-400 leading-relaxed">2015-ci ildən bəri müasir qadınlar üçün zərif ayaqqabılar hazırlayırıq. Hər addım bir hekayədir.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Mağaza</h4>
            <ul className="space-y-3 text-gray-400">
              {['Yeni Gələnlər','Ən Çox Satılanlar','Endirimlər','Dabanlıqlar','Çəkmələr','Səndəllər'].map(item => (
                <li key={item}><Link to="/shop" className="hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Kömək</h4>
            <ul className="space-y-3 text-gray-400">
              {['Çatdırılma Məlumatı','Qaytarma','Ölçü Bələdçisi','FAQ','Əlaqə'].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Bizi İzləyin</h4>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.a key={i} href="#" whileHover={{ scale: 1.2, rotate: 10 }} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-500 transition-colors">
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2026 Serra.az. Bütün hüquqlar qorunur.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Məxfilik Siyasəti</a>
            <a href="#" className="hover:text-white transition-colors">İstifadə Şərtləri</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// PRODUCT CARD 

export const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <motion.div 
        whileHover={{ y: -8 }}
        className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4] cursor-pointer shadow-lg shadow-gray-200/50"
        onClick={() => navigate(`/product/${product.id}`)}>
        <img src={product.image} alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-4 left-4 flex gap-2">
          {product.badge && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                product.badge === 'Endirim' ? 'bg-red-500' : product.badge === 'Yeni' ? 'bg-emerald-500' : 'bg-rose-500'
              }`}>{product.badge}</motion.span>
          )}
        </div>
        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
          onClick={(e) => { e.stopPropagation(); setIsWishlisted(!isWishlisted); }}
          className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur rounded-full shadow-lg transition-all">
          <Heart size={18} className={isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-600'} />
        </motion.button>
        <AnimatePresence>
          {isHovered && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                className="w-full py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
                Sürətli Baxış
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="mt-4 px-1">
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>
        <h3 className="font-medium text-gray-900 hover:text-rose-500 transition-colors cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}>{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-lg text-gray-900">${product.price}</span>
          {product.oldPrice && <span className="text-sm text-gray-400 line-through">${product.oldPrice}</span>}
        </div>
      </div>
    </motion.div>
  );
};


// APP

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <CartDrawer />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/new-arrivals" element={<NewArrivalsPage />} />
              <Route path="/discounts" element={<DiscountsPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;