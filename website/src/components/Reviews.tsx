"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  relative_time: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load reviews", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="reviews" className="py-32 md:py-48 bg-espresso bg-noise text-cream px-4 relative overflow-hidden">
      
      {/* Background Decor - Majolica Pattern Overlay */}
      <div className="absolute inset-0 bg-majolica opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cobalt/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto text-center mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="mb-6 inline-flex items-center justify-center rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-bold border border-white/10 bg-white/5 text-cream/60 backdrop-blur-md">
            {t("reviews.subtitle")}
          </div>
          <h2 className="text-5xl md:text-7xl font-display text-cream mb-6 tracking-tight">
            {t("reviews.title")}
          </h2>
          <div className="flex justify-center gap-1.5 mb-8 text-sicilian-yellow">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current shadow-[0_0_15px_rgba(247,209,91,0.5)]" />
            ))}
          </div>
          <p className="text-cream/70 font-body text-lg md:text-xl max-w-2xl mx-auto italic leading-relaxed">
            "Authentic Sicilian hospitality meets modern refinement. <br className="hidden md:block" /> A must-visit in the heart of Taormina."
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="p-1.5 rounded-[2.5rem] bg-white/5 ring-1 ring-white/10 animate-pulse">
              <div className="h-72 bg-white/5 rounded-[calc(2.5rem-0.375rem)]" />
            </div>
          ))
        ) : reviews.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-sm">
             <p className="text-cream/40 font-bold uppercase tracking-widest text-xs">Authentic reviews loading from Google...</p>
          </div>
        ) : (
          reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.32, 0.72, 0, 1] }}
              className="p-1.5 rounded-[2.5rem] bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition-colors duration-500 group"
            >
              <div className="h-full bg-white/5 backdrop-blur-md rounded-[calc(2.5rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-6 md:p-8 flex flex-col justify-between min-h-[320px]">
                <div>
                  <Quote className="text-terracotta w-8 h-8 mb-6 opacity-30 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                  <p className="text-[15px] leading-relaxed text-cream/80 mb-6 font-body font-light line-clamp-6 italic">
                    "{review.text}"
                  </p>
                </div>
                <div className="border-t border-white/5 pt-6 mt-auto">
                  <p className="font-bold text-cream font-display text-xl tracking-tight mb-1">{review.author}</p>
                  <div className="flex items-center justify-between text-[9px] text-cream/40 uppercase tracking-[0.2em] font-bold">
                    <span>Verified Guest</span>
                    <span>{review.relative_time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-20 text-center"
      >
        <a 
          href="https://www.google.com/search?q=Locanda+dei+Mori+Taormina+reviews" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-between gap-6 px-2 py-2 bg-cream text-espresso font-bold rounded-full overflow-hidden outline-none focus-visible:ring-4 focus-visible:ring-sicilian-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-wine hover:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] min-w-[240px]"
        >
          <div className="absolute inset-0 bg-sicilian-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
          <span className="relative z-10 pl-6 uppercase tracking-widest text-[10px] transition-colors duration-500">{t("reviews.readMore")}</span>
          <div className="relative z-10 w-10 h-10 rounded-full bg-espresso/5 flex items-center justify-center group-hover:bg-espresso/10 group-hover:scale-105 group-hover:translate-x-1 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
            <span className="text-sm">↗</span>
          </div>
        </a>
      </motion.div>
    </section>
  );
}
