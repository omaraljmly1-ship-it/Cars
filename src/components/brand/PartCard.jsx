"use client";
import { motion } from "framer-motion";
import { MessageCircle, Shield, Check } from "lucide-react";
import Image from "next/image";
import { contactInfo } from "@/data/siteData";

// ─── Translations ────────────────────────────────────────────────────────────
// All UI strings live here. When i18n is added, replace `locale` with a prop
// or a hook (e.g. useLocale() from next-intl) and the component adapts automatically.
const translations = {
  ar: {
    genuineBadge: "أصلي معتمد",
    warrantyLabel: "الضمان الشامل:",
    warrantyValue: "ضمان تشغيل واختبار",
    availabilityLabel: "حالة التوفر:",
    availabilityValue: "متوفر حالياً",
    conditionLabel: "الحالة العامة:",
    conditionRefurbished: "أصلي مجدد",
    conditionImported: "مستورد درجة أولى",
    noImage: "لا تتوفر صورة للقطعة",
    whatsappBtn: "طلب تسعيرة وتأكيد التوفر",
    whatsappMsg: (partNameAr, partNameEn, brandNameAr, modelNameAr, generationCode, generationYears) =>
      `مرحباً! أود الاستفسار عن توفر وسعر:\n- القطعة: ${partNameAr} (${partNameEn})\n- السيارة: ${brandNameAr} ${modelNameAr}\n- الهيكل/الموديل: ${generationCode} (${generationYears})`,
  },
  en: {
    genuineBadge: "Genuine OEM",
    warrantyLabel: "Full Warranty:",
    warrantyValue: "Tested & Guaranteed",
    availabilityLabel: "Availability:",
    availabilityValue: "In Stock",
    conditionLabel: "Condition:",
    conditionRefurbished: "Original Refurbished",
    conditionImported: "Imported Grade A",
    noImage: "No image available",
    whatsappBtn: "Request a Quote",
    whatsappMsg: (partNameAr, partNameEn, brandNameAr, modelNameAr, generationCode, generationYears) =>
      `Hello! I'd like to inquire about availability and price:\n- Part: ${partNameEn} (${partNameAr})\n- Car: ${brandNameAr} ${modelNameAr}\n- Chassis/Model: ${generationCode} (${generationYears})`,
  },
};
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Premium PartCard component to display a spare part with real photo,
 * translation details, and WhatsApp inquiry button.
 *
 * @param {Object} props
 * @param {Object} props.part Part catalog entry details
 * @param {string} props.brandNameAr Brand display name in Arabic
 * @param {string} props.brandNameEn Brand display name in English
 * @param {string} props.modelNameAr Model display name in Arabic
 * @param {string} props.modelNameEn Model display name in English
 * @param {string} props.generationCode Generation/chassis code (e.g. W222)
 * @param {string} props.generationYears Generation year range (e.g. 2014 - 2020)
 * @param {string} [props.locale="ar"] Active locale — "ar" or "en"
 */
export default function PartCard({
  part,
  brandNameAr,
  brandNameEn,
  modelNameAr,
  modelNameEn,
  generationCode,
  generationYears,
  locale = "ar",
}) {
  const t = translations[locale] ?? translations.ar;
  const isRTL = locale === "ar";
  const imageAlt =
    locale === "en"
      ? part.altEn || part.nameEn || part.altAr || part.nameAr || "Spare part"
      : part.altAr || part.nameAr || part.altEn || part.nameEn || "قطعة غيار";

  // Detect if part is a shock absorber / air spring / balloon
  const isRefurbished =
    part.nameAr?.includes("جامبين") ||
    part.nameAr?.includes("مساعد") ||
    part.nameAr?.includes("بالون");

  // Pre-fill WhatsApp message with part information
  const messageText = t.whatsappMsg(
    part.nameAr,
    part.nameEn,
    brandNameAr,
    modelNameAr,
    generationCode,
    generationYears
  );
  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(messageText)}`;

  return (
    <motion.div
      dir={isRTL ? "rtl" : "ltr"}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col justify-between bg-black-card border border-black-border hover:border-gold/30 rounded-2xl p-5 transition-all duration-400 overflow-hidden"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-transparent transition-all duration-500 rounded-2xl pointer-events-none" />

      <div>
        {/* Real Part Image Container */}
        <div className="relative h-56 w-full bg-linear-to-b from-[#111] to-[#1a1a1a] rounded-xl border border-black-border flex items-center justify-center mb-5 overflow-hidden group-hover:border-gold/20 transition-all duration-300">
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(212,168,83,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.3) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />

          {part.image ? (
            <Image
              src={part.image}
              alt={imageAlt}
              fill
              sizes="(max-w-768px) 100vw, 33vw"
              className="object-cover transition-all duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="text-gray-muted text-xs">{t.noImage}</div>
          )}

          {/* Premium overlay for image */}
          <div className="absolute inset-0 bg-linear-to-t from-black-deep/50 via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Genuine Shield badge */}
          <div className={`absolute top-3 ${isRTL ? "right-3" : "left-3"} glass-dark px-2.5 py-1 rounded-full flex items-center gap-1 border border-gold/20`}>
            <Shield size={10} className="text-gold" />
            <span className="text-[9px] text-white font-medium">
              {t.genuineBadge}
            </span>
          </div>
        </div>

        {/* Brand & Generation Label */}
        <div className="text-gold text-[10px] font-bold uppercase tracking-wider mb-2 font-tajawal">
          {locale === "en" ? `${brandNameEn} • ${modelNameEn} • ${generationCode}` : `${brandNameAr} • ${modelNameAr} • ${generationCode}`}
        </div>

        {/* Part Title */}
        <div className={`mb-4 ${isRTL ? "text-right" : "text-left"}`}>
          <h3 className="text-white font-bold text-base group-hover:text-gold transition-colors duration-300 leading-snug">
            {locale === "en" ? part.nameEn : part.nameAr}
          </h3>
          <span
            className="text-[11px] text-gray-muted font-medium tracking-wider uppercase block mt-0.5"
            dir="ltr"
          >
            {locale === "en" ? part.nameAr : part.nameEn}
          </span>
        </div>

        {/* Features / Details list */}
        <div className="border-t border-black-border pt-4 mb-5 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-muted">{t.warrantyLabel}</span>
            <span className="text-gold font-bold flex items-center gap-1">
              <Check size={10} className="text-gold" />
              {t.warrantyValue}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-muted">{t.availabilityLabel}</span>
            <span className="text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded">
              {t.availabilityValue}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-muted">{t.conditionLabel}</span>
            <span className="text-white/80 font-medium">
              {isRefurbished ? t.conditionRefurbished : t.conditionImported}
            </span>
          </div>
        </div>
      </div>

      {/* Contact on WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3.5 rounded-xl bg-gold/10 border border-gold/20 text-gold text-xs font-bold hover:bg-gold hover:text-black hover:shadow-[0_4px_15px_rgba(212,168,83,0.3)] transition-all duration-300 flex items-center justify-center gap-2 group-hover:border-gold/30 cursor-pointer"
      >
        <MessageCircle size={15} />
        <span>{t.whatsappBtn}</span>
      </a>
    </motion.div>
  );
}
