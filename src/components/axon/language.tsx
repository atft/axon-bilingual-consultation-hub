import { createContext, useContext, useEffect, type ReactNode } from "react";
import { content, type Language } from "@/lib/axon-content";
const LanguageContext = createContext<{ lang: Language; setLang: (lang: Language) => void }>({
  lang: "ar",
  setLang: () => {},
});
export function LanguageProvider({
  lang,
  onChange,
  children,
}: {
  lang: Language;
  onChange: (lang: Language) => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const saved = localStorage.getItem("axon-language");
    if (
      !new URLSearchParams(window.location.search).has("lang") &&
      (saved === "ar" || saved === "en") &&
      saved !== lang
    )
      onChange(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("axon-language", lang);
  }, [lang]);
  return (
    <LanguageContext.Provider value={{ lang, setLang: onChange }}>
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  return { ...ctx, t: content[ctx.lang] };
}
