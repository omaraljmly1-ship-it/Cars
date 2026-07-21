"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animations/variants";
import { Phone, MessageCircle, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { contactInfo } from "@/data/siteData";
import Link from "next/link";
import { useLocale } from "@/components/LanguageProvider";

{/* اخر جزء في صفحة البراند*/ }

export default function BrandCTA({ brand }) {
  const { locale, t } = useLocale();
  const isArabic = locale === "ar";
  const brandName = isArabic ? brand.nameAr : brand.nameEn;
  const ArrowIcon = isArabic ? ArrowRight : ArrowLeft;
  const guarantees = t("brandCTA.guarantees", []);
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0 bg-linear-to-br from-black-deep via-[#0f0a00] to-black-deep" />

      {/* Radial gold glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-150 h-150 rounded-full bg-gold/5 blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-linear(rgba(212,168,83,0.5) 1px, transparent 1px), linear-linear(90deg, rgba(212,168,83,0.5) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top + bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-6 inline-block">
            <span className="glass px-5 py-2 rounded-full text-gold text-xs font-semibold tracking-widest uppercase">
              {brandName} — {t("brands.heroSubtitle")}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight"
          >
            {t("brandCTA.lookingFor")} {brandName}?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-gray-soft text-lg mb-8 max-w-xl mx-auto leading-relaxed"
          >
            {t("catalog.partIntro")}
          </motion.p>

          {/* Guarantees */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10"
          >
            {guarantees.map((g, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-gold shrink-0" />
                <span className="text-gray-soft text-sm">{g}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
                t("inquiryMessages.brandCtaInquiry").replace("{brand}", brandName)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center gap-3 text-base px-10! py-4! rounded-full shadow-lg shadow-gold/20"
            >
              <MessageCircle size={20} />
              <span>{t("contact.whatsappNow")}</span>
            </a>
            <a
              href={`tel:${contactInfo.phone}`}
              className="btn-gold-outline flex items-center gap-3 text-base px-10! py-4! rounded-full"
            >
              <Phone size={20} />
              <span>{t("contact.callNow")}</span>
            </a>
          </motion.div>

          {/* Back link */}
          <motion.div variants={fadeInUp} className="mt-10">
            <Link
              href="/#brands"
              className="inline-flex items-center gap-2 text-gray-muted hover:text-gold transition-colors text-sm"
            >
              <ArrowIcon size={15} />
              <span>{t("brands.backHome")}</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
