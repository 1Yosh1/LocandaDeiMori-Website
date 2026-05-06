"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/components/LanguageContext";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const containerRef = useRef(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      id="home" 
      className="relative min-h-[110dvh] flex items-center justify-center overflow-hidden bg-cream bg-noise"
    >
      {/* Background Image Layer - Authentic Exterior */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          y: yBg,
          backgroundImage: `url('/images/authentic/Lalocandadeimori.webp')`,
          filter: 'contrast(1.05) saturate(1.1)'
        }}
      />

      {/* Sunny Gradient Overlay - Less dark, more vibrant */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent z-[2]" />
      <div className="absolute inset-0 bg-majolica z-[3]" />
      <div className="absolute inset-0 bg-noise z-[4]" />

      {/* Main Content */}
      <motion.div 
        className="relative z-20 text-center px-4 w-full flex flex-col items-center pt-32"
        style={{ y: yContent, opacity: opacityContent }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, ease: [0.32, 0.72, 0, 1] }}
          className="w-full flex flex-col items-center"
        >
          {/* Eyebrow Tag */}
          <div className="mb-8 inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[10px] uppercase tracking-[0.3em] font-bold border border-white/30 bg-white/10 backdrop-blur-md text-cream shadow-2xl">
            {t("hero.location")}
          </div>

          <h1 className="text-7xl md:text-[9rem] lg:text-[14rem] script-font text-cream mb-6 leading-[0.9] tracking-normal drop-shadow-2xl">
            La Locanda <br />
            <span className="text-sicilian-yellow pr-2 md:pr-6 drop-shadow-none">dei</span> Mori
          </h1>
          
          <div className="w-px h-24 bg-gradient-to-b from-sicilian-yellow to-transparent mx-auto mb-12 opacity-80 shadow-[0_0_20px_rgba(247,209,91,0.5)]" />
          
          <p className="text-xs md:text-sm text-cream font-bold mb-20 max-w-lg mx-auto leading-relaxed uppercase tracking-[0.4em] font-body drop-shadow-md">
            Tradizione Sincera <br />
            <span className="text-sicilian-yellow mt-3 block scale-110">{t("hero.subtitle")}</span>
          </p>
          
          {/* Premium CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full px-2 sm:px-0">
            <button 
              onClick={onOpenBooking}
              className="group relative inline-flex items-center justify-between gap-6 px-2 py-2 bg-cream text-espresso font-bold rounded-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] w-full sm:w-auto min-w-[240px]"
            >
              <div className="absolute inset-0 bg-sicilian-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 pl-8 uppercase tracking-widest text-[11px] transition-colors duration-500">{t("hero.bookButton")}</span>
              <div className="relative z-10 w-12 h-12 rounded-full bg-espresso/5 flex items-center justify-center group-hover:bg-espresso/10 group-hover:scale-105 transition-all duration-500">
                <span className="text-lg">→</span>
              </div>
            </button>

            <a 
              href="#menu" 
              className="group relative inline-flex items-center justify-between gap-6 px-2 py-2 border border-white/40 text-cream font-bold rounded-full overflow-hidden backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all duration-500 w-full sm:w-auto min-w-[240px]"
            >
              <span className="relative z-10 pl-8 uppercase tracking-widest text-[11px]">{t("hero.menuButton")}</span>
              <div className="relative z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-105 transition-all duration-500">
                <span className="text-lg">↓</span>
              </div>
            </a>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Decorative Ceramic Corner */}
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-majolica opacity-10 pointer-events-none z-10" />
    </section>
  );
}
