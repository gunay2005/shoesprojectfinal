import React, { useState } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react'; 
import { useCart } from '../hooks/useCart.jsx'; 
import { useFavorites } from '../hooks/useFavorites.jsx'; 
 
export const ProductCard = ({ product, displayImageIndex = 0 }) => { 
   
  const [isHovered, setIsHovered] = useState(false); 
 
 
  const navigate = useNavigate(); 
 
   
  const location = useLocation(); 
 
   
  const { addToCart } = useCart(); 
 
  
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites(); 
 
  const isWishlisted = favorites.some((fav) => fav.id === product.id); 
 
  const mainImage = 
    product.images?.[displayImageIndex] || 
    product.image || 
    product.images?.[0]; 
 
  const hasHoverImage = !!product.hoverImage; 
 
  const handleAddToCart = (e) => { 
    e.stopPropagation(); 
 
    addToCart( 
      product, 
      product.sizes?.[0] || null, 
      product.colors?.[0] || null, 
      1 
    ); 
  }; 
 
  const handleWishlist = (e) => { 
    e.stopPropagation(); 
 
    if (isWishlisted) { 
      removeFromFavorites(product.id); 
    } else { 
      addToFavorites(product); 
    } 
  }; 
 
  const handleCardClick = () => { 
     
    navigate(`/product/${product.id}${location.search}`); 
  }; 
 
  return ( 
    <motion.div 
       
      initial={{ opacity: 0, y: 30 }} 
 
      
      whileInView={{ opacity: 1, y: 0 }} 
 
      
      viewport={{ once: true }} 
 
      className="group" 
 
      
      onMouseEnter={() => setIsHovered(true)} 
 
       
      onMouseLeave={() => setIsHovered(false)} 
    > 
      <motion.div 
       
        whileHover={{ y: -6 }} 
 
        
        transition={{ 
          duration: 0.35, 
          ease: [0.22, 1, 0.36, 1] 
        }} 
 
        className="relative overflow-hidden rounded-2xl bg-[#f0ece6] aspect-[3/4] cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-500" 
 
        onClick={handleCardClick} 
      > 
        <img 
          src={mainImage} 
          alt={product.name} 
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${ 
            isHovered && hasHoverImage 
              ? 'opacity-0 scale-105' 
              : 'opacity-100 scale-100' 
          }`} 
        /> 
 
        {hasHoverImage && ( 
          <img 
            src={product.hoverImage} 
            alt={`${product.name} — hover`} 
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${ 
              isHovered 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105' 
            }`} 
          /> 
        )} 
 
        <AnimatePresence> 
          {isHovered && ( 
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.3 }} 
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-[1]" 
            /> 
          )} 
        </AnimatePresence> 
 
        <div className="absolute top-3 left-3 z-10"> 
          {product.badge && ( 
            <motion.span 
              initial={{ scale: 0, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
 
              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase text-white ${ 
                product.badge === 'Endirim' 
                  ? 'bg-red-500' 
                  : product.badge === 'Yeni' 
                  ? 'bg-emerald-500' 
                  : 'bg-rose-500' 
              }`} 
            > 
              {product.badge} 
            </motion.span> 
          )} 
        </div> 
 
    
        <motion.button 
          whileHover={{ scale: 1.15 }} 
          whileTap={{ scale: 0.85 }} 
          onClick={handleWishlist} 
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-md transition-all z-10 hover:bg-white" 
        > 
          <Heart 
            size={15} 
            className={ 
              isWishlisted 
                ? 'fill-rose-500 text-rose-500' 
                : 'text-gray-600' 
            } 
          /> 
        </motion.button> 
 
        <AnimatePresence> 
          {isHovered && ( 
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 10 }} 
              transition={{ 
                duration: 0.3, 
                ease: [0.22, 1, 0.36, 1] 
              }} 
              className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10" 
            > 
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={handleAddToCart} 
                className="px-3.5 py-2 bg-gray-900 text-white rounded-full text-[11px] font-semibold tracking-wide hover:bg-gray-800 transition-all duration-200 flex items-center gap-1.5 shadow-lg shadow-black/20" 
              > 
                <ShoppingBag size={13} strokeWidth={2.5} /> 
                Səbətə əlavə et 
              </motion.button> 
 
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }} 
 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  handleCardClick(); 
                }} 
 
                className="w-9 h-9 bg-white/95 backdrop-blur-md text-gray-900 rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg border border-white/50" 
                title="Bax" 
              > 
                <Eye size={15} strokeWidth={2} /> 
              </motion.button> 
            </motion.div> 
          )} 
        </AnimatePresence> 
      </motion.div> 
 
      <div className="mt-3.5 px-0.5"> 
 
        <div className="flex items-center gap-1 mb-1"> 
          {[...Array(5)].map((_, i) => ( 
            <Star 
              key={i} 
              size={12} 
 
              className={ 
                i < Math.floor(product.rating || 0) 
                  ? 'fill-amber-400 text-amber-400' 
                  : 'text-gray-300' 
              } 
            /> 
          ))} 
 
          <span className="text-[11px] text-gray-400 ml-1"> 
            ({product.reviews || 0}) 
          </span> 
        </div> 
 
        <h3 
          className="font-medium text-gray-900 hover:text-rose-500 transition-colors cursor-pointer text-[14px] leading-tight" 
 
          onClick={handleCardClick} 
        > 
          {product.name} 
        </h3> 
 
        <div className="flex items-center gap-2 mt-1"> 
          <span className="font-bold text-[15px] text-gray-900"> 
            ₼ {product.price} 
          </span> 
 
          {product.oldPrice && ( 
            <span className="text-[13px] text-gray-400 line-through"> 
              ₼ {product.oldPrice} 
            </span> 
          )} 
        </div> 
      </div> 
    </motion.div> 
  ); 
};