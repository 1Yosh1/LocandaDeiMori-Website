"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TestaDiMoroIcon, FicodindiaIcon, GalloIcon } from "./Icons";
import { useLanguage } from "@/components/LanguageContext";

export default function OurStory() {
  const { t } = useLanguage();

  return (
    <section id="story" className="py-32 md:py-48 bg-cream bg-noise px-4 overflow-hidden relative">
      {/* Background Decor - Majolica and Ficodindia */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-majolica opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-heritage opacity-40 pointer-events-none" />
      
      {/* Heritage Floating Icons */}
      <TestaDiMoroIcon className="absolute top-20 left-10 w-32 h-32 text-espresso/5 pointer-events-none -rotate-12" />
      <GalloIcon className="absolute bottom-40 right-20 w-40 h-40 text-terracotta/5 pointer-events-none rotate-12" />

      <div className="absolute bottom-0 left-0 w-96 h-96 bg-ficodindia opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 lg:gap-32 items-center">
        
        {/* Story Text (Left side in Editorial Split) */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
          className="w-full lg:w-1/2 order-1 relative z-10"
        >
          {/* Eyebrow Tag */}
          <div className="mb-8 inline-flex items-center justify-center rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-bold border border-terracotta/20 bg-terracotta/5 text-terracotta">
            Heritage
          </div>

          <h2 className="text-5xl md:text-7xl font-display text-espresso mb-10 tracking-tight leading-[1.1]">
            {t("story.title")}
          </h2>
          
          <div className="space-y-8 text-espresso/85 leading-relaxed text-lg md:text-xl font-body font-light max-w-lg">
            <p>{t("story.text1")}</p>
            <p>{t("story.text2")}</p>
          </div>

          <div className="mt-16 pt-10 border-t border-espresso/10">
             <div className="flex items-center gap-6">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-terracotta/5 border border-terracotta/10 text-terracotta">
                   <FicodindiaIcon className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-espresso/40">
                  L'Anima di Taormina
                </span>
             </div>
          </div>
        </motion.div>

        {/* Visual Composition (Right side in Editorial Split using Double-Bezel) */}
        <motion.div
          initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="w-full lg:w-1/2 order-2 relative"
        >
          {/* Outer Shell (Double-Bezel Pattern) */}
          <div className="p-2 md:p-3 rounded-[2.5rem] bg-black/5 ring-1 ring-black/5 shadow-2xl">
            {/* Inner Core */}
            <div className="relative aspect-[4/5] rounded-[calc(2.5rem-0.5rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] bg-espresso">
              <Image 
                src="/images/authentic/lalocandainside.webp" 
                alt="Locanda dei Mori Authentic Interior" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[3000ms] hover:scale-105 ease-[cubic-bezier(0.32,0.72,0,1)] opacity-90"
              />
            </div>
          </div>
          
          {/* Glass floating card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="absolute -bottom-8 -left-4 md:-left-12 p-1.5 rounded-[2rem] bg-white/20 ring-1 ring-white/40 shadow-2xl backdrop-blur-2xl z-20 max-w-[280px]"
          >
            <div className="bg-cream/90 rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] p-8 text-center relative overflow-hidden">
               {/* Majolica background detail */}
               <div className="absolute inset-0 bg-majolica opacity-5" />
               
               <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-sicilian-yellow/10 border border-sicilian-yellow/20 text-sicilian-yellow">
                   <TestaDiMoroIcon className="w-10 h-10" />
                </div>
                <p className="font-display text-2xl text-espresso italic leading-tight">
                  "{t("story.subtitle")}"
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
