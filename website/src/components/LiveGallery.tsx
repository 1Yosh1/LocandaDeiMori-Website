"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageContext";

interface Photo {
  id: string;
  url: string;
  caption: string;
}

const AUTHENTIC_PHOTOS: Photo[] = [
  { id: 'a1', url: '/images/authentic/Frontofrestaurant.webp', caption: 'The iconic facade of Locanda dei Mori in the heart of Taormina.' },
  { id: 'a2', url: '/images/authentic/lalocandainside.webp', caption: 'A warm, inviting atmosphere rooted in Sicilian heritage.' },
  { id: 'a3', url: '/images/authentic/PastaAllaNorma.webp', caption: 'Classic Pasta alla Norma, prepared with artisanal care.' },
  { id: 'a4', url: '/images/authentic/isolabela.webp', caption: 'Inspired by the breathtaking beauty of Isola Bella.' },
  { id: 'a5', url: '/images/authentic/Antipastirustici.webp', caption: 'Rustic appetizers celebrating local seasonal ingredients.' },
  { id: 'a6', url: '/images/authentic/Lalocandadeimori.webp', caption: 'A tribute to the artisanal heritage of Sicily.' },
  { id: 'a7', url: '/images/authentic/InsalataDiMare.webp', caption: 'Fresh Insalata di Mare, a taste of the Mediterranean.' },
  { id: 'a8', url: '/images/authentic/parmigiana.webp', caption: 'Traditional Melanzane alla Parmigiana, baked to perfection.' },
  { id: 'a9', url: '/images/authentic/PastaCaMuddica.webp', caption: 'Pasta ca muddica, an ancient flavor of our land.' },
  { id: 'a10', url: '/images/authentic/BrushcettaSpeciale.webp', caption: 'Artisanal bruschetta topped with the finest local produce.' },
  { id: 'a11', url: '/images/authentic/brushcettaClassica.webp', caption: 'Simplicity and heart: our classic tomato bruschetta.' },
  { id: 'a12', url: '/images/authentic/Buratta.webp', caption: 'Creamy burrata from the local dairy heritage.' },
  { id: 'a13', url: '/images/authentic/lalocandaWine.webp', caption: 'Hand-selected wines that tell the story of Etna.' },
  { id: 'a14', url: '/images/authentic/lalocandawine2.webp', caption: 'Exquisite pairings for a complete Sicilian journey.' },
  { id: 'a15', url: '/images/authentic/lalocanda2.webp', caption: 'Intimate corners and sun-drenched heritage.' },
  { id: 'a16', url: '/images/authentic/LalocandaPattersns.webp', caption: 'The artisanal Majolica patterns that define our soul.' },
];

export default function LiveGallery() {
  const [photos, setPhotos] = useState<Photo[]>(AUTHENTIC_PHOTOS);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // We could still fetch from Instagram/API, but we prioritize the authentic local assets
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          // Merge or prioritize? For now, we use our authentic ones as the base
          // as they are higher quality and more "branded"
          // setPhotos(data);
        }
      })
      .catch((err) => console.error("Gallery API error", err));
  }, []);

  return (
    <section id="gallery" className="py-32 md:py-48 bg-cream bg-noise px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-ficodindia opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 lg:gap-32 items-start mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
          className="w-full lg:w-1/2 sticky top-40"
        >
          <div className="mb-6 inline-flex items-center justify-center rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] font-bold border border-lava/10 bg-lava/5 text-lava/60">
            {t("gallery.subtitle")}
          </div>
          <h2 className="text-5xl md:text-7xl font-display text-espresso mb-8 tracking-tighter leading-tight">
            {t("gallery.title")}
          </h2>
          <p className="text-espresso/60 max-w-md text-lg font-body leading-relaxed font-light">
            Step into the vibrant life of our bistro through the eyes of our guests. 
            A celebration of food, culture, and Taormina hospitality.
          </p>
          
          <div className="mt-12">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-between gap-6 px-2 py-2 bg-espresso text-cream font-bold rounded-full overflow-hidden outline-none focus-visible:ring-4 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-cream hover:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] min-w-[240px]"
            >
              <div className="absolute inset-0 bg-terracotta translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
              <span className="relative z-10 pl-6 uppercase tracking-widest text-[10px] transition-colors duration-500">{t("gallery.follow")}</span>
              <div className="relative z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-105 group-hover:translate-x-1 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                <Camera className="w-4 h-4" />
              </div>
            </a>
          </div>
        </motion.div>

        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 md:gap-8 pb-16 md:pb-24 relative z-10">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="p-1 rounded-[2rem] bg-black/5 ring-1 ring-black/5 animate-pulse aspect-square" />
            ))
          ) : (
            photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: index * 0.1, ease: [0.32, 0.72, 0, 1] }}
                className={cn(
                  "relative group cursor-pointer overflow-visible",
                  index % 4 === 1 || index % 4 === 2 ? "translate-y-12 md:translate-y-24" : ""
                )}
              >
                {/* Double-Bezel Architecture */}
                <div className="p-1.5 rounded-[2rem] bg-black/5 ring-1 ring-black/5 shadow-xl transition-all duration-700 group-hover:scale-[1.02] group-hover:-rotate-1 group-hover:shadow-2xl">
                  <div className="relative aspect-square rounded-[calc(2rem-0.375rem)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] bg-espresso">
                    <Image 
                      src={photo.url} 
                      alt={photo.caption || "Locanda dei Mori Photo"} 
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-[2000ms] group-hover:scale-110 ease-[cubic-bezier(0.32,0.72,0,1)] opacity-90"
                    />
                    <div className="absolute inset-0 bg-espresso/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center p-4">
                       <Camera className="text-cream w-6 h-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
