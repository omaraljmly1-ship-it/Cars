"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations, defaultLocale } from "@/data/translations";

const LanguageContext = createContext(null);

function getNestedValue(obj, path) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function getInitialLocale() {
    if (typeof window === "undefined") return defaultLocale;

    const saved = window.localStorage.getItem("aq-locale");
    if (saved === "ar" || saved === "en") return saved;

    const browserLocale = window.navigator.language || "";
    return browserLocale.toLowerCase().startsWith("en") ? "en" : defaultLocale;
}

export function LanguageProvider({ children }) {
    const [locale, setLocaleState] = useState(defaultLocale);
    const [dir, setDir] = useState("rtl");

    useEffect(() => {
        const initialLocale = getInitialLocale();
        setLocaleState(initialLocale);
        const nextDir = initialLocale === "ar" ? "rtl" : "ltr";
        setDir(nextDir);
        document.documentElement.lang = initialLocale;
        document.documentElement.setAttribute("dir", nextDir);
        document.documentElement.style.direction = nextDir;
        document.body.setAttribute("dir", nextDir);
        document.body.style.direction = nextDir;
    }, []);

    const setLocale = (nextLocale) => {
        const normalized = nextLocale === "en" ? "en" : "ar";
        setLocaleState(normalized);
        const nextDir = normalized === "ar" ? "rtl" : "ltr";
        setDir(nextDir);
        window.localStorage.setItem("aq-locale", normalized);
        document.documentElement.lang = normalized;
        document.documentElement.setAttribute("dir", nextDir);
        document.documentElement.style.direction = nextDir;
        document.body.setAttribute("dir", nextDir);
        document.body.style.direction = nextDir;
    };

    const value = useMemo(() => {
        const messages = translations[locale] ?? translations[defaultLocale];

        const t = (path, fallback = "") => {
            const value = getNestedValue(messages, path);
            return value ?? fallback;
        };

        return {
            locale,
            dir,
            isRTL: locale === "ar",
            setLocale,
            t,
        };
    }, [locale, dir]);

    return (
        <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
    );
}

export function useLocale() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLocale must be used inside a LanguageProvider");
    }
    return context;
}
