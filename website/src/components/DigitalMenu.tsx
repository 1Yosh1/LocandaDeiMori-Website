"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageContext";

const MENU_CATEGORIES = [
  "Bruschette",
  "Antipasti",
  "Primi",
  "Secondi di Carne",
  "Secondi di Pesce",
  "Contorni",
  "Dolci",
];

const CATEGORY_IMAGES: Record<string, string> = {
  "Bruschette":       "/images/authentic/brushcettaClassica.webp",
  "Antipasti":        "/images/authentic/Antipastirustici.webp",
  "Primi":            "/images/authentic/PastaCaMuddica.webp",
  "Secondi di Carne": "/images/authentic/parmigiana.webp",
  "Secondi di Pesce": "/images/authentic/InsalataDiMare.webp",
  "Contorni":         "/images/authentic/Buratta.webp",
  "Dolci":            "/images/authentic/LalocandaPattersns.webp",
};

interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  popular: boolean;
}

export default function DigitalMenu() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("Bruschette");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("menu_items")
      .select("*")
      .order("created_at")
      .then(({ data, error }) => {
        if (data && !error) {
          setMenuItems(data);
        }
        setLoading(false);
      });
  }, []);

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="relative py-40 md:py-56 px-4 bg-espresso bg-noise overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-majolica pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-heritage pointer-events-none opacity-40" />
      
      {/* Editorial Split Header */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-end mb-24 relative z-10 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
          className="w-full lg:w-1/2"
        >
          <div className="mb-6 inline-flex items-center justify-center rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-bold border border-white/10 bg-white/5 text-cream/70 backdrop-blur-md">
            {t("menu.subtitle")}
          </div>
          <h2 className="text-6xl md:text-[5.5rem] font-display text-cream tracking-tighter leading-[0.9]">
            {t("menu.title")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="w-full lg:w-1/2 flex flex-wrap gap-x-4 gap-y-3 lg:gap-x-8 lg:gap-y-6 lg:justify-end"
        >
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "text-xs md:text-sm font-bold tracking-[0.3em] uppercase transition-all duration-500 pb-2 border-b-2 outline-none focus-visible:ring-4 focus-visible:ring-sicilian-yellow focus-visible:ring-offset-4 focus-visible:ring-offset-espresso",
                activeCategory === cat 
                  ? "border-sicilian-yellow text-cream" 
                  : "border-transparent text-cream/40 hover:text-cream/80"
              )}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Double-Bezel Image Component on the Left */}
        <motion.div
          initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.32, 0.72, 0, 1] }}
          className="hidden lg:block lg:col-span-5 sticky top-40"
        >
          <div className="p-2 md:p-3 rounded-[2.5rem] bg-white/5 ring-1 ring-white/10 shadow-2xl">
            <div className="relative aspect-[3/4] rounded-[calc(2.5rem-0.5rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 0.9, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={CATEGORY_IMAGES[activeCategory] || "/images/authentic/Antipastirustici.webp"} 
                    alt={activeCategory} 
                    fill 
                    sizes="(max-width: 1024px) 0vw, 40vw"
                    className="object-cover" 
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Menu Items List */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(8px)', y: -20 }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col gap-12"
            >
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={`skeleton-${i}`} className="animate-pulse">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 pr-10">
                        <div className="h-8 bg-white/10 rounded w-1/2 mb-3"></div>
                        <div className="h-4 bg-white/5 rounded w-full mb-2"></div>
                        <div className="h-4 bg-white/5 rounded w-4/5"></div>
                      </div>
                      <div className="h-8 bg-white/10 rounded w-16"></div>
                    </div>
                    <div className="w-full h-px bg-white/5 mt-8" />
                  </div>
                ))
              ) : filteredItems.length === 0 ? (
                <div className="text-cream/50 font-medium py-10 font-body">
                  {t("menu.loading")}
                </div>
              ) : (
                filteredItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                    className="group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-10">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="text-3xl font-display text-cream group-hover:text-sicilian-yellow transition-colors duration-500">
                            {item.name}
                          </h3>
                          {item.popular && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-bold bg-sicilian-yellow/10 text-sicilian-yellow border border-sicilian-yellow/20">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-cream/80 leading-relaxed font-light text-base font-body max-w-lg">
                          {item.description}
                        </p>
                      </div>
                      <span className="text-2xl font-display text-cream/90 group-hover:text-cream transition-colors duration-500">
                        {item.price}
                      </span>
                    </div>
                    <div className="w-full h-px bg-white/10 mt-12 group-hover:bg-white/20 transition-colors duration-500" />
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <div className="mt-32 text-center relative z-10 border-t border-white/5 pt-16 max-w-7xl mx-auto">
         <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/40 font-bold">
           All ingredients are locally sourced from Taormina markets.
         </p>
      </div>
    </section>
  );
}
