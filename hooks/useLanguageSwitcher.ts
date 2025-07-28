"use client";

import { useState, useEffect } from "react";

export const COOKIE_NAME = "googtrans";

export interface LanguageDescriptor {
  name: string;
  title: string;
}

export interface LanguageConfig {
  languages: LanguageDescriptor[];
  defaultLanguage: string;
}

export const getLanguageConfig = (): LanguageConfig | undefined => {
  if (process.env.GOOGLE_TRANSLATION_CONFIG) {
    try {
      return JSON.parse(process.env.GOOGLE_TRANSLATION_CONFIG);
    } catch {
      return undefined;
    }
  }
  return undefined;
};

const useLanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("");

  useEffect(() => {
    const cfg = getLanguageConfig();
    let languageValue = "";

    const match = document.cookie.match(
      new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`)
    );
    if (match && match[2]) {
      const parts = match[2].split("/");
      if (parts.length > 2) {
        languageValue = parts[2];
      }
    }

    if (cfg && !languageValue) {
      languageValue = cfg.defaultLanguage;
    }
    setCurrentLanguage(languageValue);
  }, []);

  const switchLanguage = (lang: string) => () => {
    document.cookie = `${COOKIE_NAME}=/auto/${lang}; path=/`;
    window.location.reload();
  };

  return {
    currentLanguage,
    switchLanguage,
    languageConfig: getLanguageConfig(),
  };
};

export default useLanguageSwitcher;
