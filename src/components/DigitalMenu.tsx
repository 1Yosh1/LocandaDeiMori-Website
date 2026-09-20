"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/components/LanguageContext";

export const MENU_CATEGORIES = [
  "Antipasti",
  "Primi",
  "Secondi",
  "Dolci",
  "Vini",
] as const;

export type MenuCategory = (typeof MENU_CATEGORIES)[number];

const CATEGORY_IMAGES: Record<MenuCategory, string> = {
  "Antipasti": "/images/authentic/Antipastirustici.webp",
  "Primi":     "/images/authentic/PastaAllaNorma.webp",
  "Secondi":   "/images/authentic/parmigiana.webp",
  "Dolci":     "/images/authentic/LalocandaPattersns.webp",
  "Vini":      "/images/authentic/lalocandaWine.webp",
};

export interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  popular?: boolean;
  allergens?: string[];
}

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  // Antipasti
  {
    id: "anti-1",
    category: "Antipasti",
    name: "Antipasto Rustico dei Mori",
    description: "Capocollo di suino nero dei Nebrodi, pecorino siciliano DOP semi-stagionato, olive nocellara condite e carciofi alla brace.",
    price: "16€",
    popular: true,
    allergens: ["Latticini"],
  },
  {
    id: "anti-2",
    category: "Antipasti",
    name: "Insalata di Mare dello Jonio",
    description: "Polpo verace locale, calamari freschi, gambero rosso e julienne di verdure croccanti al profumo di limone di Siracusa.",
    price: "18€",
    popular: true,
    allergens: ["Molluschi", "Crostacei"],
  },
  {
    id: "anti-3",
    category: "Antipasti",
    name: "Burrata Pugliese con Datterino di Pachino",
    description: "Burrata cremosa, pomodorini confit di Pachino IGP, gocce di pesto di basilico genovese e crostoni di pane casereccio all'origano.",
    price: "14€",
    popular: false,
    allergens: ["Glutine", "Latticini"],
  },
  {
    id: "anti-4",
    category: "Antipasti",
    name: "Bruschette Artigianali della Tradizione",
    description: "Tris di pane rustico cotto a legna con caponata agrodolce classica, paté di olive nere di Nocellara e pomodoro fresco con basilico.",
    price: "12€",
    popular: false,
    allergens: ["Glutine"],
  },

  // Primi
  {
    id: "primi-1",
    category: "Primi",
    name: "Pasta alla Norma Tradizionale",
    description: "Maccheroncini artigianali di grano duro, melanzane dorate, sugo di pomodoro San Marzano, ricotta infornata a scaglie e basilico fresco.",
    price: "16€",
    popular: true,
    allergens: ["Glutine", "Latticini"],
  },
  {
    id: "primi-2",
    category: "Primi",
    name: "Lasagna Artigianale al Pistacchio di Bronte",
    description: "Sfoglia all'uovo tirata a mano, vellutata besciamella, pesto puro di Pistacchio di Bronte DOP, provola ragusana affumicata e granella tostata.",
    price: "18€",
    popular: true,
    allergens: ["Glutine", "Latticini", "Frutta a guscio"],
  },
  {
    id: "primi-3",
    category: "Primi",
    name: "Pasta ca' Muddica e Acciughe di Sciacca",
    description: "Spaghetti trafilati al bronzo con acciughe fresche sott'olio, finocchietto selvatico dell'Etna, pinoli, uvetta e mollica atturrata tostata.",
    price: "15€",
    popular: false,
    allergens: ["Glutine", "Pesce", "Frutta a guscio"],
  },

  // Secondi
  {
    id: "sec-1",
    category: "Secondi",
    name: "Involtini di Pesce Spada alla Messinese",
    description: "Fettine sottili di spada dello Stretto farcite con mollica aromatizzata, capperi di Salina, pinoli, uvetta e gratinate su foglie d'alloro.",
    price: "22€",
    popular: true,
    allergens: ["Pesce", "Glutine", "Frutta a guscio"],
  },
  {
    id: "sec-2",
    category: "Secondi",
    name: "Parmigiana di Melanzane della Locanda",
    description: "Melanzane nostrane fritte a fette sottili, passata densa di pomodoro datterino, caciocavallo siciliano e abbondante basilico fresco.",
    price: "15€",
    popular: false,
    allergens: ["Latticini", "Glutine"],
  },
  {
    id: "sec-3",
    category: "Secondi",
    name: "Tagliata di Manzo al Sale dell'Etna",
    description: "Controfiletto di manzo piemontese scottato al sangue, adagiato su rucola selvatica di collina, scaglie di grana padano 24 mesi e olio EVO siciliano.",
    price: "24€",
    popular: true,
    allergens: ["Latticini"],
  },

  // Dolci
  {
    id: "dolci-1",
    category: "Dolci",
    name: "Tiramisù Tradizionale di Mamma Pina",
    description: "La nostra ricetta di famiglia: soffici savoiardi sardi bagnati al caffè espresso moka, crema al mascarpone montata e cacao amaro olandese.",
    price: "8€",
    popular: true,
    allergens: ["Glutine", "Latticini", "Uova"],
  },
  {
    id: "dolci-2",
    category: "Dolci",
    name: "Cannolo Siciliano Scomposto",
    description: "Cialda fritta al Marsala servita croccante con crema di ricotta di pecora zuccherata a vista, gocce di cioccolato di Modica e granella di pistacchio.",
    price: "8€",
    popular: true,
    allergens: ["Glutine", "Latticini", "Frutta a guscio"],
  },
  {
    id: "dolci-3",
    category: "Dolci",
    name: "Semifreddo Artigianale al Pistacchio",
    description: "Morbido semifreddo con pasta pura di Pistacchio di Bronte, cuore pralinato alle mandorle e coulis calda di cioccolato fondente 70%.",
    price: "9€",
    popular: false,
    allergens: ["Latticini", "Frutta a guscio", "Uova"],
  },

  // Vini
  {
    id: "vini-1",
    category: "Vini",
    name: "Etna Rosso DOC - Nerello Mascalese",
    description: "Tenuta delle Terre Nere. Sentori minerali vulcanici unici, piccoli frutti di bosco, pepe nero e tannini vellutati.",
    price: "36€ / Calice 8€",
    popular: true,
    allergens: ["Solfiti"],
  },
  {
    id: "vini-2",
    category: "Vini",
    name: "Grillo di Sicilia DOC Superiore",
    description: "Feudo Arancio. Bouquet floreale intenso con zagara siciliana, pesca bianca e una decisa, rinfrescante sapidità marina.",
    price: "28€ / Calice 7€",
    popular: false,
    allergens: ["Solfiti"],
  },
  {
    id: "vini-3",
    category: "Vini",
    name: "Nero d'Avola Riserva DOC",
    description: "Planeta. Corposo, avvolgente e complesso, affinato in rovere francese con note di ciliegia marasca, carruba e vaniglia.",
    price: "38€",
    popular: true,
    allergens: ["Solfiti"],
  },
  {
    id: "vini-4",
    category: "Vini",
    name: "Cerasuolo di Vittoria Classico DOCG",
    description: "Gulfi. Pregiato connubio tra Nero d'Avola e Frappato, floreale, fruttato e straordinariamente beverino.",
    price: "34€",
    popular: false,
    allergens: ["Solfiti"],
  },
];

export default function DigitalMenu() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("Antipasti");
  const [menuItems, setMenuItems] = useState<MenuItem[]>(DEFAULT_MENU_ITEMS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMenu() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (!url || url.includes("placeholder")) {
        return;
      }

      try {
        const { data, error } = await supabase
          .from("menu_items")
          .select("*")
          .order("created_at");

        if (data && data.length > 0 && !error) {
          setMenuItems(data);
        }
      } catch (err) {
        // Supabase project unlinked or offline - keep DEFAULT_MENU_ITEMS
        console.warn("Using default authentic menu:", err);
      }
    }

    loadMenu();
  }, []);

  const filteredItems = menuItems.filter((item) => {
    if (activeCategory === "Antipasti") {
      return item.category === "Antipasti" || item.category === "Bruschette";
    }
    if (activeCategory === "Primi") {
      return item.category === "Primi";
    }
    if (activeCategory === "Secondi") {
      return (
        item.category === "Secondi" ||
        item.category === "Secondi di Carne" ||
        item.category === "Secondi di Pesce" ||
        item.category === "Contorni"
      );
    }
    if (activeCategory === "Dolci") {
      return item.category === "Dolci";
    }
    if (activeCategory === "Vini") {
      return item.category === "Vini" || item.category === "Drink List";
    }
    return item.category === activeCategory;
  });

  return (
    <section id="menu" className="relative py-40 md:py-56 px-4 bg-espresso bg-noise overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-majolica pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-heritage pointer-events-none opacity-40" />
      
      {/* Editorial Split Header */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-end mb-24 relative z-10 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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

        {/* Category Navigation Pills */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="w-full lg:w-1/2 flex flex-wrap gap-x-4 gap-y-3 lg:gap-x-8 lg:gap-y-4 lg:justify-end"
        >
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "text-xs md:text-sm font-bold tracking-[0.3em] uppercase transition-all duration-500 pb-2 border-b-2 outline-none focus-visible:ring-4 focus-visible:ring-sicilian-yellow focus-visible:ring-offset-4 focus-visible:ring-offset-espresso cursor-pointer",
                activeCategory === cat 
                  ? "border-sicilian-yellow text-sicilian-yellow" 
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
          initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
                  animate={{ opacity: 0.95, scale: 1 }}
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
              initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(8px)", y: -20 }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col gap-10"
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
                    transition={{ delay: i * 0.08, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                    className="group"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 pr-4">
                        <div className="flex flex-wrap items-center gap-3 mb-2.5">
                          <h3 className="text-2xl md:text-3xl font-display text-cream group-hover:text-sicilian-yellow transition-colors duration-500">
                            {item.name}
                          </h3>
                          {item.popular && (
                            <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-bold bg-sicilian-yellow/15 text-sicilian-yellow border border-sicilian-yellow/30 shadow-sm">
                              Signature
                            </span>
                          )}
                        </div>
                        <p className="text-cream/80 leading-relaxed font-light text-sm md:text-base font-body max-w-lg mb-3">
                          {item.description}
                        </p>

                        {/* Allergen Badges */}
                        {item.allergens && item.allergens.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[9px] uppercase tracking-wider font-bold text-cream/35 mr-1">
                              Allergeni:
                            </span>
                            {item.allergens.map((allergen) => (
                              <span
                                key={allergen}
                                className="px-2 py-0.5 rounded-full text-[8.5px] uppercase tracking-wider font-semibold bg-white/5 border border-white/10 text-cream/60 group-hover:border-sicilian-yellow/20 group-hover:text-cream/80 transition-colors"
                              >
                                {allergen}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Price Tag */}
                      <div className="text-right">
                        <span className="text-xl md:text-2xl font-display font-bold text-sicilian-yellow group-hover:text-cream transition-colors duration-500 whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-px bg-white/10 mt-8 group-hover:bg-white/20 transition-colors duration-500" />
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <div className="mt-32 text-center relative z-10 border-t border-white/5 pt-16 max-w-7xl mx-auto">
         <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/40 font-bold">
           All ingredients are locally sourced from Taormina markets • Pane & Coperto 3€
         </p>
      </div>
    </section>
  );
}
