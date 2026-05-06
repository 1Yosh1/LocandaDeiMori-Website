"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, Calendar, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageContext";
import { Language } from "@/lib/i18n";

interface NavbarProps {
  onOpenBooking: () => void;
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'it', label: 'ITA' },
  { code: 'en', label: 'ENG' },
  { code: 'de', label: 'DEU' },
  { code: 'fr', label: 'FRA' }
];

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const NAV_LINKS = [
    { name: "Home", href: "#home", labelKey: "nav.home" }, // Not translated if not in dict
    { name: "The Story", href: "#story", labelKey: "nav.story" },
    { name: "Digital Menu", href: "#menu", labelKey: "nav.menu" },
    { name: "Reviews", href: "#reviews", labelKey: "nav.reviews" },
    { name: "Gallery", href: "#gallery", labelKey: "nav.gallery" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fluid Island Nav */}
      <nav
        className={cn(
          "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-between px-2 py-2 rounded-full",
          scrolled 
            ? "top-6 bg-cream/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-lava/5 w-[95%] md:w-[750px]" 
            : "top-8 bg-black/20 backdrop-blur-md shadow-lg border border-white/10 w-[95%] md:w-[850px]"
        )}
      >
        <Link href="/" className="flex flex-col pl-4 md:pl-8">
          <span className={cn(
            "text-xl md:text-2xl font-display font-bold tracking-tight transition-colors duration-500",
            scrolled ? "text-espresso" : "text-cream"
          )}>
            Locanda dei Mori
          </span>
          <span className={cn(
            "text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-500",
            scrolled ? "text-terracotta" : "text-sicilian-yellow/80"
          )}>
            {t('hero.location')}
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-6 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 hover:text-terracotta relative group",
                scrolled ? "text-espresso/70" : "text-cream/80"
              )}
            >
              {t(link.labelKey)}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-terracotta transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 pr-2">
          {/* Desktop Language Switcher */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors",
                scrolled ? "text-espresso hover:bg-espresso/5" : "text-cream hover:bg-white/10"
              )}
            >
              <Globe className="w-3.5 h-3.5" />
              {language}
            </button>
            {showLangMenu && (
              <div className="absolute top-full right-0 mt-2 bg-cream border border-espresso/10 rounded-2xl shadow-xl overflow-hidden py-2 min-w-[120px]">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setShowLangMenu(false); }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors",
                      language === lang.code ? "bg-terracotta/10 text-terracotta" : "text-espresso hover:bg-espresso/5"
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onOpenBooking}
            className={cn(
              "hidden md:flex items-center gap-3 px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] shadow-lg",
              scrolled 
                ? "bg-espresso text-cream hover:bg-terracotta" 
                : "bg-white/20 text-cream backdrop-blur-sm hover:bg-white hover:text-espresso"
            )}
          >
            <Calendar className="w-3.5 h-3.5" />
            {t("hero.bookButton")}
          </button>

          {/* Morphing Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "relative w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500",
              scrolled ? "bg-lava/5 hover:bg-lava/10" : "bg-white/10 hover:bg-white/20"
            )}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-4">
              <span className={cn(
                "absolute h-[1.5px] bg-current transform transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                isOpen ? "w-5 rotate-45 top-2" : "w-5 top-0",
                scrolled ? "text-espresso" : "text-cream"
              )} />
              <span className={cn(
                "absolute h-[1.5px] bg-current top-2 transform transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                isOpen ? "w-0 opacity-0" : "w-4",
                scrolled ? "text-espresso" : "text-cream"
              )} />
              <span className={cn(
                "absolute h-[1.5px] bg-current transform transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                isOpen ? "w-5 -rotate-45 top-2" : "w-3 top-4",
                scrolled ? "text-espresso" : "text-cream"
              )} />
            </div>
          </button>
        </div>
      </nav>

      {/* Massive Screen-Filling Overlay Modal */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-center bg-espresso",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-majolica opacity-10" />
        <div className="absolute inset-0 bg-noise opacity-20" />
        
        <div className="relative z-10 flex flex-col items-center space-y-6 w-full px-6 pt-10 overflow-y-auto max-h-screen pb-20">
          
          <div className={cn(
             "flex gap-4 mb-8 transition-all duration-700",
             isOpen ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          )}>
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors border",
                  language === lang.code ? "bg-sicilian-yellow text-espresso border-sicilian-yellow" : "text-cream border-white/20 hover:bg-white/10"
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {NAV_LINKS.map((link, index) => (
            <div key={link.name} className="overflow-hidden">
              <Link
                href={link.href}
                className={cn(
                  "block text-4xl md:text-6xl font-display text-cream hover:text-sicilian-yellow transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] transform",
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                )}
                style={{ transitionDelay: isOpen ? `${100 + index * 50}ms` : "0ms" }}
                onClick={() => setIsOpen(false)}
              >
                {t(link.labelKey) !== link.labelKey ? t(link.labelKey) : link.name}
              </Link>
            </div>
          ))}
          
          <div className="overflow-hidden pt-10 mt-8 border-t border-white/10 w-full max-w-xs text-center flex flex-col gap-4">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className={cn(
                "inline-flex items-center justify-center gap-4 px-8 py-5 bg-cream text-espresso rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-700 hover:scale-[0.98] shadow-2xl",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              )}
              style={{ transitionDelay: isOpen ? `${100 + NAV_LINKS.length * 50}ms` : "0ms" }}
            >
              <Calendar className="w-4 h-4" />
              {t("hero.bookButton")}
            </button>
            <a
              href="tel:+393348497735"
              className={cn(
                "inline-flex items-center justify-center gap-4 px-8 py-5 border border-white/20 text-cream rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-700 hover:scale-[0.98]",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              )}
              style={{ transitionDelay: isOpen ? `${120 + NAV_LINKS.length * 50}ms` : "0ms" }}
            >
              <Phone className="w-4 h-4" />
              Call to Book
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
