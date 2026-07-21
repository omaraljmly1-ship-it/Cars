"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { contactInfo } from "@/data/siteData";
import logo from "../app/assets/images/Logo.png";
import Image from "next/image";
import { useLocale } from "@/components/LanguageProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const pathname = usePathname();
  const { locale, setLocale, t, isRTL } = useLocale();
  const isHome = pathname === "/";

  const navItems = [
    { href: "#home", label: t("nav.home") },
    { href: "#brands", label: t("nav.brands") },
    { href: "#about", label: t("nav.about") },
    { href: "#products", label: t("nav.products") },
    { href: "#contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const handleSectionScroll = () => {
      const sections = navItems.map((link) => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(navItems[index].href);
          }
        }
      });
    };

    window.addEventListener("scroll", handleSectionScroll);
    return () => window.removeEventListener("scroll", handleSectionScroll);
  }, [isHome, navItems]);

  const handleNavClick = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${scrolled || isOpen
          ? "glass-dark shadow-2xl py-3 top-0"
          : "bg-transparent py-5 top-0 md:top-[38px]"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <a
          href={isHome ? "#home" : "/#home"}
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              handleNavClick("#home");
            }
          }}
          className="flex items-center gap-3 group"
        >
          <Image
            src={logo}
            alt={t("common.logoAlt")}
            className="text-xl font-bold text-white group-hover:text-gold transition-colors duration-300"
            width={200}
            height={150}
            style={{ height: "auto" }}
          />
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((link) => (
            <a
              key={link.href}
              href={isHome ? link.href : "/" + link.href}
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  handleNavClick(link.href);
                }
              }}
              className={`relative text-sm font-medium transition-colors duration-300 py-2 ${activeSection === link.href ? "text-gold" : "text-white hover:text-gold"
                }`}
            >
              {link.label}
              {activeSection === link.href && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 right-0 left-0 h-0.5 bg-linear-to-l from-gold to-gold-light rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
            className="hidden sm:flex items-center gap-2 rounded-full border border-gold/30 bg-black/20 px-3 py-2 text-sm text-white hover:border-gold/60 hover:text-gold"
            aria-label={t("common.switchLanguage")}
          >
            <span className="font-semibold">{locale === "ar" ? "EN" : "AR"}</span>
            <span>{locale === "ar" ? t("common.en") : t("common.ar")}</span>
          </button>
          <a
            href={`tel:${contactInfo.phone}`}
            className="hidden sm:flex btn-gold text-sm items-center gap-2 py-2.5! px-6! rounded-full"
          >
            <Phone size={16} />
            <span>{t("nav.callNow")}</span>
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white hover:text-gold transition-colors p-2"
            aria-label={t("common.toggleMenu")}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden glass-dark border-t border-gold/10 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4">
          {navItems.map((link) => (
            <a
              key={link.href}
              href={isHome ? link.href : "/" + link.href}
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  handleNavClick(link.href);
                } else {
                  setIsOpen(false);
                }
              }}
              className={`text-lg font-medium py-2 border-b border-black-border transition-colors ${activeSection === link.href ? "text-gold border-gold/30" : "text-white hover:text-gold"
                }`}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
            className="rounded-full border border-gold/30 bg-black/20 px-4 py-3 text-sm text-white hover:border-gold/60 hover:text-gold"
          >
            {locale === "ar" ? t("langSwitch.toEnglish") : t("langSwitch.toArabic")}
          </button>
          <a
            href={`tel:${contactInfo.phone}`}
            className="btn-gold text-center mt-2 rounded-full"
          >
            {t("nav.callNow")}
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
