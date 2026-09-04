// ==========================================
// 📁 src/pages/AboutPage.jsx
// Haqqımızda — О нас
// ==========================================

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Award, Users, Truck, Shield, Heart, Star, Instagram, Facebook, Twitter, ChevronRight } from 'lucide-react';
import { AnimatedCounter } from '../components/AnimatedCounter.jsx';


/* =========================  INFO CARD  ========================= */
const InfoCard = ({ icon: Icon, title, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-white rounded-2xl p-8 shadow-lg shadow-gray-100/50 border border-gray-100"
  >
    <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-4">
      <Icon size={28} className="text-rose-500" />
    </div>
    <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 whitespace-pre-line">{value}</p>
  </motion.div>
);


/* =========================  TEAM MEMBER  ========================= */
const TeamMember = ({ name, role, image, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -10 }}
    className="text-center"
  >
    <div className="relative w-40 h-40 mx-auto mb-4">
      <img 
        src={image} 
        alt={name}
        className="w-full h-full object-cover rounded-full ring-4 ring-rose-200"
      />
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="absolute -bottom-2 -right-2 w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center"
      >
        <Heart size={18} className="text-white" />
      </motion.div>
    </div>
    <h4 className="font-bold text-xl text-gray-900">{name}</h4>
    <p className="text-rose-500 font-medium">{role}</p>
  </motion.div>
);


/* =========================  TIMELINE ITEM  ========================= */
const TimelineItem = ({ year, title, description, isLeft, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="flex items-center gap-4 md:gap-8 flex-row"
  >
    <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
      <div className="bg-white rounded-2xl p-5 md:p-6 shadow-lg shadow-gray-100/50 border border-gray-100">
        <span className="text-rose-500 font-bold text-base md:text-lg">{year}</span>
        <h3 className="font-bold text-lg md:text-xl text-gray-900 mt-1">{title}</h3>
        <p className="text-sm md:text-base text-gray-500 mt-2">{description}</p>
      </div>
    </div>
    <div className="w-4 h-4 bg-rose-500 rounded-full border-4 border-white shadow-lg shrink-0" />
    <div className="flex-1 hidden md:block" />
  </motion.div>
);


/* =========================  HERO WITH RESPONSIVE VIDEO  ========================= */
const AboutHero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden bg-gray-800">
      {/* Видеоблок с максимальной яркостью и минимальным затемнением */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <video 
          playsInline
          autoPlay 
          loop 
          muted 
          preload="auto"
          poster="//www.aldoshoes.com/cdn/shop/files/preview_images/c2a76ab404924741a9d0d9c17ba55d77.thumbnail.0000000000.jpg?v=1787167098&width=3840" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-85 scale-105"
        >
          <source type="video/mp4" src="https://www.aldoshoes.com/cdn/shop/videos/c/vp/c2a76ab404924741a9d0d9c17ba55d77/c2a76ab404924741a9d0d9c17ba55d77.HD-1080p-4.8Mbps-92071424.mp4?v=0" />
        </video>
        {/* Очень легкий градиент только для читаемости текста */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
      </motion.div>

      {/* Текстовый контент слева */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full flex justify-start">
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }}
          className="max-w-xl text-left"
        >
          <span className="inline-block py-1 px-4 rounded-full bg-rose-500/30 border border-rose-500/40 text-rose-200 text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-md shadow-sm">
            Bizimlə Tanış Olun
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            HƏR ADDIM <span className="text-rose-400">BİR HEKAYƏDİR</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-100 font-light leading-relaxed drop-shadow-md">
            Serra.az — müasir qadınların zəriflik və rahatlığı bir arada axtardığı ünvan. 2015-ci ildən bəri zövqünüzü oxşayırıq.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

/* =========================  STATS  ========================= */
const StatsSection = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8">
        <AnimatedCounter target={8500} suffix="+" label="Məmnun Müştəri" />
        <AnimatedCounter target={24} suffix="" label="Kolleksiya" />
        <AnimatedCounter target={15} suffix="+" label="Ölkəyə Çatdırılma" />
        <AnimatedCounter target={98} suffix="%" label="Məmnuniyyət" />
      </div>
    </div>
  </section>
);


/* =========================  STORE INFO  ========================= */
const StoreInfo = () => {
  const infoItems = [
    { 
      icon: MapPin, 
      title: "Ünvan", 
      value: "Bakı, Azərbaycan, Nizami küç. 45" 
    },
    { 
      icon: Phone, 
      title: "Telefon", 
      value: (
        <a href="tel:+994501234567" className="hover:text-rose-500 transition-colors">
          +994 50 123 45 67
        </a>
      ) 
    },
    { 
      icon: Mail, 
      title: "E-poçt", 
      value: (
        <a href="mailto:info@serra.az" className="hover:text-rose-500 transition-colors">
          info@serra.az
        </a>
      ) 
    },
    { 
      icon: Clock, 
      title: "İş Saatları", 
      value: "Həftə içi: 10:00 - 20:00\nŞənbə: 11:00 - 18:00" 
    },
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
          <span className="text-rose-500 font-medium uppercase tracking-wider text-sm">Əlaqə</span>
          <h2 className="text-5xl font-bold text-gray-900 mt-2">Mağazamız</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {infoItems.map((item, index) => (
              <InfoCard key={index} {...item} delay={index * 0.1} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.7155447404043!2d49.9511230756738!3d40.3708312584321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403065275004294b%3A0x4112c11a304e0842!2sSerra%20Boutique!5e0!3m2!1sru!2sus!4v1788506297583!5m2!1sru!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="rounded-3xl"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg pointer-events-none">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center">
                  <MapPin size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Serra Boutique</h4>
                  <p className="text-sm text-gray-500">Bakı, Azərbaycan</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* =========================  TIMELINE  ========================= */
const Timeline = () => {
  const events = [
    { year: "2015", title: "Başlanğıc", description: "Serra.az kiçik bir onlayn mağaza olaraq yaranır. İlk kolleksiyamız cəmi 12 məhsuldan ibarət idi." },
    { year: "2017", title: "İlk Mağaza", description: "Bakının mərkəzində ilk fiziki mağazamızı açırıq. Müştərilərimiz artıq ayaqqabıları canlı görə bilir." },
    { year: "2019", title: "Beynəlxalq Çatdırılma", description: "15 ölkəyə çatdırılma xidmətimiz işə düşür. Serra.az artıq regional brend olur." },
    { year: "2021", title: "Premium Kolleksiya", description: "İtalyan dəri və əl işi məhsullarla premium xəttimizi təqdim edirik." },
    { year: "2023", title: "10.000+ Müştəri", description: "Məmnun müştərilərimizin sayı 10.000-i ötür. Böyük bir icma olaraq böyüyürük." },
    { year: "2026", title: "Yeni Era", description: "Tamamilə yenilənmiş veb sayt və mobil tətbiq ilə yeni era başlayır. Sizinlə birlikdə!" },
  ];

  return (
    <section className="py-20 bg-gray-50 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-rose-500 font-medium uppercase tracking-wider text-sm">Tariximiz</span>
          <h2 className="text-5xl font-bold text-gray-900 mt-2">Serra.az Yolculuğu</h2>
        </motion.div>

        <div className="relative space-y-12">
          {/* Вертикальная линия по центру на десктопе, слева на мобилках */}
          <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-0.5 bg-rose-200 md:-translate-x-1/2" />

          {events.map((event, index) => (
            <TimelineItem
              key={index}
              {...event}
              isLeft={index % 2 === 0}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


/* =========================  TEAM  ========================= */
const TeamSection = () => {
  const team = [
    { name: "Aygün M.", role: "Founder & CEO", image: "https://i.postimg.cc/C1B4f9TL/download-(43).jpg" },
    { name: "Leyla K.", role: "Baş Dizayner", image: "https://i.postimg.cc/7P12QqVG/download-(44).jpg" },
    { name: "Nigar R.", role: "Marketing Direktor", image: "https://i.postimg.cc/mgPhR4QN/Seria-pensativa-jovem-mulher-bonita-vestindo-camisa-branca-sentir-se-como-cool-empresario-confiante.jpg" },
    { name: "Emin T.", role: "Müştəri Xidmətləri", image: "https://i.postimg.cc/Y28SW0R9/Retrato-Corporativo-Foto-para-Linked-In-Perfil-Profissional-Sao-Paulo-BR.jpg" },
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
          <span className="text-rose-500 font-medium uppercase tracking-wider text-sm">Komanda</span>
          <h2 className="text-5xl font-bold text-gray-900 mt-2">Komandamızla Tanış Olun</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <TeamMember key={index} {...member} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};


/* =========================  VALUES  ========================= */
const ValuesSection = () => {
  const values = [
    { icon: Heart, title: "Sevgi", description: "Hər cüt ayaqqabı ilə sevgi və ehtirasla hazırlayırıq." },
    { icon: Shield, title: "Keyfiyyət", description: "Yalnız premium materiallar və əl işi sənətkarlıq." },
    { icon: Truck, title: "Sürət", description: "Sifarişləriniz 24 saat ərzində hazırlanır və göndərilir." },
    { icon: Users, title: "İcma", description: "8.500+ məmnun müştəri ilə böyük bir ailəyik." },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-rose-400 font-medium uppercase tracking-wider text-sm">Dəyərlərimiz</span>
          <h2 className="text-5xl font-bold text-white mt-2">Nə üçün Serra.az?</h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-rose-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <value.icon size={36} className="text-rose-400" />
              </div>
              <h3 className="font-bold text-xl text-white mb-3">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


/* =========================  TESTIMONIALS  ========================= */
const AboutTestimonials = () => {
  const testimonials = [
    { name: "Sofiya N.", role: "Moda Bloqçusu", text: "Serra.az-dan alış-veriş etmək həmişə zövqdür. Keyfiyyət və xidmət mükəmməldir!", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" },
    { name: "Rachel L.", role: "Stilist", text: "Müştərilərimə həmişə Serra.az-ı tövsiyə edirəm. Stil və rahatlıq bir arada.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
    { name: "Anna V.", role: "Dizayner", text: "Qablaşma məni satın almağa vadar etdi. Ayaqqabılar isə heyrətamizdir!", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
  ];

  return (
    <section className="py-20 bg-rose-50">
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

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


/* =========================  CTA  ========================= */
const CTASection = () => (
  <section className="py-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Serra Ailəsinə Qoşulun
        </h2>
        <p className="text-xl text-gray-500 mb-8 max-w-lg mx-auto">
          Yeni kolleksiyalar, eksklüziv təkliflər və stil ilhamı üçün abunə olun.
        </p>
        <div className="flex max-w-md mx-auto gap-3">
          <input 
            type="email" 
            placeholder="E-poçtunuz"
            className="flex-1 px-6 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:border-rose-500 text-gray-900"
          />
          <button className="px-8 py-4 bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600 transition-colors whitespace-nowrap">
            Abunə Ol
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);


/* =========================  PAGE EXPORT  ========================= */
const AboutPage = () => {
  return (
    <div className="pt-20">
      <AboutHero />
      {/* <StatsSection /> */}
      <StoreInfo />
      <Timeline />
      {/* <TeamSection /> */}
      {/* <ValuesSection /> */}
      {/* <AboutTestimonials /> */}
      {/* <CTASection /> */}
    </div>
  );
};

export default AboutPage;