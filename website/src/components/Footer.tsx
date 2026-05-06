"use client";

import { MapPin, Phone, Clock, MessageCircle, Camera } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-espresso bg-noise text-cream pt-32 pb-16 px-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-majolica opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 relative z-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-10">
          <div>
            <h3 className="text-4xl font-display text-cream mb-3 tracking-tight">Locanda <span className="text-sicilian-yellow italic">dei</span> Mori</h3>
            <p className="text-[10px] uppercase tracking-[0.4em] text-sicilian-yellow/60 font-bold">Taormina • Sicilia</p>
          </div>
          <p className="text-cream/50 text-base font-body leading-relaxed max-w-sm font-light">
            {t("footer.description")}
          </p>
          <div className="flex gap-4">
             {[Camera, MessageCircle].map((Icon, i) => (
               <a key={i} href="#" className="group relative w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:border-terracotta transition-all duration-500 overflow-hidden">
                 <div className="absolute inset-0 bg-terracotta translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                 <Icon className="relative z-10 w-4 h-4 group-hover:scale-110 transition-transform duration-500" />
               </a>
             ))}
          </div>
        </div>

        {/* Contact Info Column */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-8">
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-terracotta">{t("footer.location")}</h4>
            <div className="space-y-6">
              <a 
                href="https://goo.gl/maps/Taormina" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 mb-1">
                   <MapPin className="w-3 h-3 text-terracotta" />
                   <span className="text-[10px] uppercase tracking-widest font-bold text-cream/40">Address</span>
                </div>
                <span className="text-sm font-body text-cream/80 group-hover:text-cream transition-colors">Vico di Via Iallia Bassia, 1</span>
                <span className="text-sm font-body text-cream/40">98039 Taormina ME, Italy</span>
              </a>
              <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-2 mb-1">
                   <Clock className="w-3 h-3 text-terracotta" />
                   <span className="text-[10px] uppercase tracking-widest font-bold text-cream/40">{t("footer.hours")}</span>
                </div>
                <span className="text-sm font-body text-cream/80">{t("footer.daily")}</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-terracotta">{t("footer.contact")}</h4>
            <div className="space-y-6">
              <a 
                href="tel:+393348497735" 
                className="group flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 mb-1">
                   <Phone className="w-3 h-3 text-terracotta" />
                   <span className="text-[10px] uppercase tracking-widest font-bold text-cream/40">Call</span>
                </div>
                <span className="text-sm font-body text-cream/80 group-hover:text-cream transition-colors">+39 334 849 7735</span>
                <span className="text-sm font-body text-cream/40 text-sicilian-yellow/60">Tap to dial</span>
              </a>
              <a 
                href="https://wa.me/393348497735" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col gap-2"
              >
                <div className="flex items-center gap-2 mb-1">
                   <MessageCircle className="w-3 h-3 text-terracotta" />
                   <span className="text-[10px] uppercase tracking-widest font-bold text-cream/40">WhatsApp</span>
                </div>
                <span className="text-sm font-body text-cream/80 group-hover:text-cream transition-colors">Locanda dei Mori Chat</span>
                <span className="text-sm font-body text-cream/40">Fast Availability</span>
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter/CTA Column */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-1.5 rounded-[2.5rem] bg-white/5 ring-1 ring-white/10 shadow-2xl">
            <div className="bg-espresso/40 backdrop-blur-md rounded-[calc(2.5rem-0.375rem)] p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden">
               <div className="absolute inset-0 bg-majolica opacity-10" />
               <div className="relative z-10">
                <h4 className="text-2xl font-display text-cream mb-4">Experience <br /> <span className="text-sicilian-yellow italic">Taormina</span></h4>
                <p className="text-sm text-cream/50 mb-8 font-body font-light leading-relaxed">Join us for an unforgettable evening under the Sicilian stars. Reservations are recommended.</p>
                <a 
                  href="https://wa.me/393348497735" 
                  className="group relative w-full inline-flex items-center justify-between gap-6 px-2 py-2 bg-cream text-espresso font-bold rounded-full overflow-hidden hover:scale-[0.98] transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-sicilian-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 pl-6 uppercase tracking-[0.2em] font-bold text-[10px]">Book via WhatsApp</span>
                  <div className="relative z-10 w-10 h-10 rounded-full bg-espresso/5 flex items-center justify-center group-hover:bg-espresso/10 transition-all duration-500">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] text-cream/30 uppercase tracking-[0.4em] font-bold">
          <Link href="#" className="hover:text-terracotta transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-terracotta transition-colors">Terms of Service</Link>
          <Link href="/admin/login" className="hover:text-sicilian-yellow transition-colors text-sicilian-yellow/60">Staff Portal</Link>
        </div>

        <p className="text-[10px] text-cream/20 uppercase tracking-[0.3em] font-medium text-center">
          © {currentYear} Locanda dei Mori • Handcrafted in Taormina
        </p>
      </div>
      
      {/* Small floating ficodindia pattern */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-ficodindia opacity-5 pointer-events-none" />
    </footer>
  );
}
