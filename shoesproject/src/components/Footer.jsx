import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Phone } from 'lucide-react';

export const Footer = () => {
  const menuItems = [
    { name: 'Ayaqqabı', path: '/shop' },
    { name: 'Çantalar', path: '/cantalar' },
    { name: 'Endirimlər', path: '/discounts' },
    { name: 'Haqqımızda', path: '/about' },
  ];

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                <img src="https://i.postimg.cc/CKMDbXDT/Screenshot-2026-06-08-201415.png" alt="Serra.az Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-bold">Serra.az</span>
            </div>
            <p className="text-gray-400 leading-relaxed">2015-ci ildən bəri müasir qadınlar üçün zərif ayaqqabılar hazırlayırıq. Hər addım bir hekayədir.</p>
          </div>
          
          {/* Секция Mağaza */}
          <div>
            <h4 className="font-bold text-lg mb-6">Mağaza</h4>
            <ul className="space-y-3 text-gray-400">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    onClick={handleLinkClick}
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
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

          
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-sm tracking-widest uppercase mb-4 text-white/90">ÖDƏNİŞ</h4>
              <div className="flex gap-2.5 items-center">
                
                
                <div className="w-14 h-9 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-sm">
                  <svg className="w-full h-full" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="13" cy="12" r="9" fill="#EB001B"/>
                    <circle cx="23" cy="12" r="9" fill="#00A2E8"/>
                    <path d="M18 5.75A8.96 8.96 0 0121.2 12 8.96 8.96 0 0118 18.25 8.96 8.96 0 0114.8 12 8.96 8.96 0 0118 5.75Z" fill="#7362B8"/>
                  </svg>
                </div>

               
                <div className="w-14 h-9 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-sm">
                  <svg className="w-full h-full" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="13" cy="12" r="9" fill="#EB001B"/>
                    <circle cx="23" cy="12" r="9" fill="#F79E1B"/>
                    <path d="M18 5.75A8.96 8.96 0 0121.2 12 8.96 8.96 0 0118 18.25 8.96 8.96 0 0114.8 12 8.96 8.96 0 0118 5.75Z" fill="#FF5F00"/>
                  </svg>
                </div>

              
                <div className="w-14 h-9 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
                  <svg className="w-full h-full" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M38.1 1.7L24.9 31.3H16.6L10.2 6.8C9.8 5.2 9.4 4.6 8.1 3.9C6 2.7 2.8 1.7 0 1.1L0.4 0H14C15.8 0 17.3 1.2 17.7 3.3L21.1 21.6L29.7 1.7H38.1ZM70.8 21.3C70.9 13.1 59.4 12.7 59.6 9C59.7 7.9 60.8 6.7 63.3 6.4C64.6 6.2 68.1 6.1 71.3 7.6L72.7 1.3C70.8 0.6 68.2 0 64.8 0C56.9 0 51.3 4.2 51.2 10.1C51 14.5 55.1 17 58.1 18.5C61.1 20 62.1 21 62.1 22.3C62 24.3 59.6 25.2 57.3 25.3C53.3 25.4 51 24.3 49.1 23.4L47.7 29.9C49.6 30.8 53.1 31.6 56.8 31.7C65.3 31.7 70.8 27.5 70.8 21.3ZM91.4 31.3H98.7L92.3 1.7H85.6C84 1.7 82.7 2.6 82.1 4L70.2 31.3H78.6L80.3 26.7H90.6L91.4 31.3ZM82.6 20.4L86.8 9L89.2 20.4H82.6ZM49.8 1.7L43.3 31.3H35.4L41.9 1.7H49.8Z" fill="#1A1F71"/>
                  </svg>
                </div>

              </div>
            </div>

           
            <div>
              <h4 className="font-bold text-sm tracking-widest uppercase mb-4 text-white/90">SOSİAL MEDİA</h4>
              <div className="flex gap-3">
                <motion.a 
                  href="https://www.facebook.com/p/Serra-Boutique-Baku-100067881137337/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }} 
                  className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-colors"
                >
                  <Facebook size={18} strokeWidth={2} />
                </motion.a>
                <motion.a 
                  href="https://www.instagram.com/serraa.az/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }} 
                  className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-colors"
                >
                  <Instagram size={18} strokeWidth={2} />
                </motion.a>
                <motion.a 
                  href="tel:+994775087111" 
                  whileHover={{ scale: 1.1 }} 
                  className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-colors"
                >
                  <Phone size={18} strokeWidth={2} />
                </motion.a>
              </div>
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