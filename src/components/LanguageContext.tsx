"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language } from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("it"); // Default to Italian
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load saved language or browser preference
    const saved = localStorage.getItem("locanda_lang") as Language;
    if (saved && ["it", "en", "de", "fr"].includes(saved)) {
      setLanguage(saved);
    }
    setMounted(true);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("locanda_lang", lang);
  };

  const t = (path: string): string => {
    const keys = path.split(".");
    let current: any = translations[language];

    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation missing for key: ${path} in lang: ${language}`);
        return path;
      }
      current = current[key];
    }

    return current as string;
  };

  const content = mounted ? (
    children
  ) : (
    <div style={{ visibility: 'hidden' }}>{children}</div>
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {content}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
