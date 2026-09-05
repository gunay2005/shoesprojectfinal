

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Percent, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import products from '../data/products.json';
import gallery from '../data/gallery.json';
import { ProductCard } from '../components/ProductCard.jsx';


const SaleHero = () => {
  const navigate = useNavigate();

  const deals = [
    { percent: 40, label: "Yay Endirimi", color: "rose" },
    { percent: 30, label: "Yeni İl Təklifi", color: "amber" },
    { percent: 50, label: "Son Fırsat", color: "emerald" },
  ];

  return (
    <div className="relative min-h-[70vh] overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop" 
          alt="Sale"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-block mb-4 p-3 bg-rose-500/20 border border-rose-500/30 rounded-2xl text-rose-400">
            <Percent size={36} />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            <span className="text-rose-500">BÖYÜK</span> ENDİRİMLƏR
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Seçilmiş ayaqqabı və çanta kolleksiyalarında <span className="text-rose-400 font-bold">50%-dək endirim</span> fürsətini qaçırmayın.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {deals.map((deal, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-white flex items-center gap-3"
              >
                <span className="text-2xl font-bold text-rose-400">{deal.percent}%</span>
                <span className="text-sm font-medium text-gray-300">{deal.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};


const HorizontalProductSection = ({ title, viewAllLink, productsList, basePath = '/product' }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: offset, behavior: 'smooth' });
    }
  };

  if (!productsList || productsList.length === 0) return null;

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{title}</h2>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            to={viewAllLink}
            className="text-sm font-semibold text-gray-900 hover:text-rose-600 transition-colors hidden sm:inline-block uppercase tracking-wider"
          >
            Shop Now
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {productsList.map((product) => {
          const productLink = `${basePath}/${product.id}`;

          return (
            <div 
              key={product.id} 
              className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px] flex-shrink-0 snap-start"
            >
              <div onClick={(e) => {}}>
                <ProductCard product={{ ...product, customLink: productLink }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};


const BundleDeal = () => {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-3xl p-8 md:p-12 relative overflow-hidden text-white text-center">
        <Tag size={40} className="mx-auto mb-4 opacity-90" />
        <h2 className="text-3xl md:text-4xl font-bold mb-3">2 Al, 3 Ödə!</h2>
        <p className="text-white/90 mb-6 max-w-md mx-auto text-sm md:text-base">
          İki cüt məhsul alın və üçüncü məhsula 50% endirim əldə edin.
        </p>
        <Link
          to="/shop"
          className="inline-block px-8 py-3 bg-white text-rose-600 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors shadow-md"
        >
          Təklifdən Yararlan
        </Link>
      </div>
    </section>
  );
};


const DiscountsPage = () => {
  const shoesSale = products.filter(
    p => p.badge && p.badge.toLowerCase().includes('endirim')
  );

  const bagsSale = gallery.filter(
    item => item.badge && item.badge.toLowerCase().includes('endirim')
  );

  return (
    <div className="pt-20 bg-gray-50/50 min-h-screen overflow-x-hidden">
      <SaleHero />
      
      <HorizontalProductSection 
        title="Sale Shoes" 
        viewAllLink="/shop" 
        productsList={shoesSale} 
        basePath="/product"
      />

      <HorizontalProductSection 
        title="Sale Bags" 
        viewAllLink="/cantalar" 
        productsList={bagsSale} 
        basePath="/cantalar"
      />

      <BundleDeal />
    </div>
  );
};

export default DiscountsPage;