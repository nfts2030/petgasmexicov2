import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import type { FC, ReactNode } from 'react';
import type { Language, LanguageContextType, Translations } from './../types/language';

// Import translations (these will be created in the next step)
import esTranslations from '../translations/es.json';
import enTranslations from '../translations/en.json';

const defaultTranslations: Record<Language, Translations> = {
  es: esTranslations,
  en: enTranslations,
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Initialize language from localStorage or default to 'es'
    return (localStorage.getItem('language') as Language) || 'es';
  });
  const [translations, setTranslations] = useState<Translations>(defaultTranslations[language]);

  useEffect(() => {
    // Update translations when language changes
    setTranslations(defaultTranslations[language]);
    localStorage.setItem('language', language);
  }, [language]);

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let current: any = translations;
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        console.warn(`Translation key "${key}" not found. Missing part: "${k}"`);
        return key; // Return the key itself if translation is not found
      }
    }
    return typeof current === 'string' ? current : key;
  }, [translations]);

  const contextValue = {
    language,
    translations,
    changeLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
