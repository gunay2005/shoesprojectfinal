import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import products from '../data/products.json';

const categoryNames = {
  crossbody: 'Crossbody çantalar',
  belt: 'Bel çantaları',
  accessories: 'Aksesuarlar',
  bucket: 'Bucket çantalar',
  clutch: 'Klatçlar',
  mini: 'Kiçik çantalar',
  shoulder: 'Çiyin çantaları',
  tote: 'Əl çantaları',
};

const fallbackImages = [
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1575032617751-57ddee62e97d?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1614179689702-355944cd0918?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1590739225287-bd2f540815d1?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1564429238061-4f7e6e2e4e2a?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=600&fit=crop',
  'https://images.unsplash.com/photo-1472851294608-415522f96319?w=500&h=600&fit=crop',
];

const GalleryPage = ({ mode }) => {
  const navigate = useNavigate();
  const { subcategory, name } = useParams();

  const isDesigner = mode === 'designer';
  const slug = isDesigner ? decodeURIComponent(name) : subcategory;
  
  const title = isDesigner ? slug : (categoryNames[slug] || slug);

  const realProducts = useMemo(() => {
    if (isDesigner) {
      return products.filter((p) => 
        (p.brand || p.designer || '').toLowerCase() === slug.toLowerCase()
      );
    }
    return products.filter((p) => 
      p.category === 'bags' && p.subcategory === slug
    );
  }, [slug, isDesigner]);

  const items = useMemo(() => {
    const list = [];
    for (let i = 0; i < 20; i++) {
      if (i < realProducts.length) {
        const p = realProducts[i];
        list.push({
          type: 'product',
          id: p.id,
          image: p.image || p.images?.[0],
          name: p.name,
          price: p.price,
        });
      } else {
        const fallbackIndex = i % fallbackImages.length;
        list.push({
          type: 'placeholder',
          id: `fallback-${i}`,
          image: fallbackImages[fallbackIndex],
          name: isDesigner ? `${slug} ${i + 1}` : `${title} ${i + 1}`,
        });
      }
    }
    return list;
  }, [realProducts, slug, title, isDesigner]);

  return (
    <div className="pt-20 min-h-screen bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/cantalar')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Geri qayıt
        </motion.button>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-medium text-gray-900 tracking-tight mb-2"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[13px] text-gray-400 mb-10 tracking-wide"
        >
          20 seçilmiş görünüş
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.5 }}
              className="group cursor-pointer"
              onClick={() => item.type === 'product' && navigate(`/product/${item.id}`)}
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="mt-3">
                <p className="text-[13px] font-medium text-gray-900 truncate">{item.name}</p>
                {item.type === 'product' && item.price && (
                  <p className="text-[12px] text-gray-400 mt-0.5">{item.price} ₼</p>
                )}
                {item.type === 'placeholder' && (
                  <p className="text-[12px] text-gray-300 mt-0.5">Yaxında</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;