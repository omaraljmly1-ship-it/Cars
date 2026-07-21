"use client";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/animations/variants";
import { useLocale } from "@/components/LanguageProvider";
import {
  Gauge, Settings, Wind, Wrench, Zap, Shield, Star,
  Cpu, Navigation, Car, Lightbulb, Mountain, Package
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { contactInfo } from "@/data/siteData";
import { MessageCircle } from "lucide-react";
import { getAllCatalogParts } from "@/data/catalogData";

const iconMap = {
  Gauge, Settings, Wind, Wrench, Zap, Shield, Star,
  Cpu, Navigation, Car, Lightbulb, Mountain, Package,
  Settings2: Settings,
  Navigation2: Navigation,
  Plug: Zap,
};

export default function BrandParts({ brand }) {
  const { t, locale } = useLocale();
  const isCatalog = brand.catalogEnabled;
  const isArabic = locale === "ar";
  let partsList = brand.parts;
  let totalParts = brand.parts.reduce((acc, p) => acc + p.count, 0);
  if (isCatalog) {
    const catalogParts = getAllCatalogParts(brand.slug);
    totalParts = catalogParts.length;

    // Group catalog parts by unified name to show categories
    const grouped = {};
    for (const part of catalogParts) {
      const nameLower = part.nameEn.toLowerCase();
      let nameEn = part.nameEn;
      let nameAr = part.nameAr;
      let icon = "Package";

      if (nameLower.includes("front") && nameLower.includes("rear") && nameLower.includes("air")) {
        nameEn = "Front & Rear Air Suspension";
        nameAr = "نظام التعليق الهوائي الأمامي والخلفي";
        icon = "Gauge";
      } else if (nameLower.includes("front") && nameLower.includes("air")) {
        nameEn = "Front Air Suspension";
        nameAr = "نظام التعليق الهوائي الأمامي";
        icon = "Gauge";
      } else if ((nameLower.includes("rear") && nameLower.includes("air")) || nameLower.includes("balloon")) {
        nameEn = "Rear Air Suspension";
        nameAr = "نظام التعليق الهوائي الخلفي";
        icon = "Settings";
      } else if (nameLower.includes("compressor") && (nameLower.includes("valve") || nameLower.includes("block"))) {
        nameEn = "Air Compressor & Control Valves";
        nameAr = "كمبروسر الهواء وصمامات التحكم";
        icon = "Wind";
      } else if (nameLower.includes("compressor")) {
        nameEn = "Air Compressor";
        nameAr = "كمبروسر الهواء";
        icon = "Wind";
      } else if (nameLower.includes("valve") || nameLower.includes("block")) {
        nameEn = "Control Valves";
        nameAr = "صمامات التحكم";
        icon = "Wrench";
      } else if (nameLower.includes("oil")) {
        if (nameLower.includes("front") && nameLower.includes("rear")) {
          nameEn = "Front & Rear Oil Shock Absorbers";
          nameAr = "جامبينات زيت أمامية وخلفية";
          icon = "Zap";
        } else if (nameLower.includes("front")) {
          nameEn = "Front Oil Shock Absorbers";
          nameAr = "جامبينات زيت أمامية";
          icon = "Zap";
        } else if (nameLower.includes("rear")) {
          nameEn = "Rear Oil Shock Absorbers";
          nameAr = "جامبينات زيت خلفية";
          icon = "Zap";
        } else {
          nameEn = "Oil Shock Absorbers";
          nameAr = "جامبينات زيت";
          icon = "Zap";
        }
      } else if (nameLower.includes("hydraulic")) {
        if (nameLower.includes("front") && nameLower.includes("rear")) {
          nameEn = "Front & Rear Hydraulic Shock Absorbers";
          nameAr = "جامبينات هيدروليك أمامية وخلفية";
          icon = "Zap";
        } else if (nameLower.includes("front")) {
          nameEn = "Front Hydraulic Shock Absorbers";
          nameAr = "جامبينات هيدروليك أمامية";
          icon = "Zap";
        } else if (nameLower.includes("rear")) {
          nameEn = "Rear Hydraulic Shock Absorbers";
          nameAr = "جامبينات هيدروليك خلفية";
          icon = "Zap";
        } else {
          nameEn = "Hydraulic Shock Absorbers";
          nameAr = "جامبينات هيدروليك";
          icon = "Zap";
        }
      } else if (nameLower.includes("shock") || nameLower.includes("spring")) {
        if (nameLower.includes("front") && nameLower.includes("rear")) {
          nameEn = "Front & Rear Shock Absorbers";
          nameAr = "جامبينات أمامية وخلفية";
          icon = "Zap";
        } else if (nameLower.includes("front")) {
          nameEn = "Front Shock Absorbers";
          nameAr = "جامبينات أمامية";
          icon = "Zap";
        } else if (nameLower.includes("rear")) {
          nameEn = "Rear Shock Absorbers";
          nameAr = "جامبينات خلفية";
          icon = "Zap";
        } else {
          nameEn = "Shock Absorbers";
          nameAr = "جامبينات";
          icon = "Zap";
        }
      }

      const key = nameEn;
      if (!grouped[key]) {
        grouped[key] = {
          nameEn,
          nameAr,
          count: 0,
          icon,
        };
      }
      grouped[key].count++;
    }
    partsList = Object.values(grouped);
  }

  return (
    <section id="parts" className="section-padding relative overflow-hidden bg-linear-to-b from-black-deep via-black-card/40 to-black-deep">
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          title={t("brands.partsTitle")}
          subtitle={`${t("brands.partsTitle")} ${isArabic ? brand.nameAr : brand.nameEn} — ${totalParts}+ ${t("catalog.partsAvailable")}`}
          englishTitle={t("brands.partsTitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5"
        >
          {partsList.map((part, index) => {
            const IconComponent = iconMap[part.icon] || Package;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative p-4 sm:p-5 md:p-6 rounded-2xl bg-linear-to-br from-black-card to-black-surface border border-black-border hover:border-gold/30 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gold/0 group-hover:bg-gold/3 transition-colors duration-500" />

                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-gold/8 via-gold/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-2xl" />

                <div className="relative z-10 flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  {/* Icon */}
                  <div className="shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-gold/15 to-gold/5 border border-gold/10 flex items-center justify-center group-hover:border-gold/30 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="text-gold w-5 h-5 sm:w-7 sm:h-7" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 w-full">
                    <h3 className="text-white font-bold text-sm sm:text-base mb-0.5 group-hover:text-gold transition-colors duration-300 leading-snug wrap-break-word">
                      {isArabic ? part.nameAr : part.nameEn}
                    </h3>
                    <p className="text-gray-muted text-[10px] sm:text-xs mb-2 sm:mb-3 uppercase tracking-wider truncate" dir="ltr">
                      {isArabic ? part.nameEn : part.nameAr}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs text-gray-soft">
                        <span className="text-gold font-semibold text-xs sm:text-sm">{part.count}</span>{" "}
                        {t("catalog.partCount")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="relative z-10 mt-3 sm:mt-4 h-1 bg-black-border rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.min((part.count / 15) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full bg-linear-to-r from-gold-dark to-gold rounded-full"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* WhatsApp inquiry CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
              t("inquiryMessages.brandInquiry").replace("{brand}", isArabic ? brand.nameAr : brand.nameEn)
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-3 text-base px-10! py-4! rounded-full shadow-lg shadow-gold/20"
          >
            <MessageCircle size={20} />
            <span>{t("brands.partsCta")} {isArabic ? brand.nameAr : brand.nameEn}</span>
          </a>
        </motion.div>
      </div>

      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
