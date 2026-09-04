// ==========================================
// 📁 src/components/AnimatedCounter.jsx
// ==========================================

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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