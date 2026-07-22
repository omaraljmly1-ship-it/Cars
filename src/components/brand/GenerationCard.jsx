"use client";
import { motion } from "framer-motion";
import { Calendar, Package, ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/LanguageProvider";
import Link from "next/link";
import Image from "next/image";

/**
 * Premium Card component representing a car model generation.
 * Shows year, chassis code, part count, and first part thumbnail.
 * 
 * @param {Object} props
 * @param {Object} props.generation Generation data
 * @param {string} props.brandSlug Brand slug
 * @param {string} props.modelSlug Model slug
 */
export default function GenerationCard({ generation, brandSlug, modelSlug }) {
  const { t, locale } = useLocale();
  const isArabic = locale === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;
  const partsCount = generation.parts ? generation.parts.length : 0;
  const latestPartImage = partsCount > 0 ? generation.parts[generation.parts.length - 1].image : null;
  const targetUrl = `/brands/${brandSlug}/${modelSlug}/${generation.slug}`;

  return (
    <Link href={targetUrl} className="block group">
      <motion.div
        whileHover={{ y: -5 }}
        className="premium-card relative h-72 border border-black-border hover:border-gold/30 transition-all duration-300 flex flex-col justify-between overflow-hidden p-6"
      >
        {/* Shimmer / ambient light on hover */}
        <div className="absolute inset-0 bg-linear-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-transparent transition-all duration-500 rounded-2xl z-10" />

        {/* Top border highlight */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-gold/0 via-gold to-gold/0 transition-all duration-500 rounded-t-2xl w-0 group-hover:w-full z-20" />

        {/* Background Image / Placeholder */}
        <div className="absolute inset-0 z-0">
          {latestPartImage ? (
            <Image
              src={latestPartImage}
              alt={generation.code}
              fill
              sizes="(max-w-768px) 100vw, 33vw"
              className="object-cover opacity-15 group-hover:opacity-25 transition-opacity duration-500 scale-105 group-hover:scale-100"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-b from-black-card to-[#121212] opacity-50" />
          )}
          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black-deep via-black-deep/70 to-black-deep/30" />
        </div>

        {/* Card Header */}
        <div className="relative z-10 flex justify-between items-start">
          <span className="glass px-3 py-1 rounded-full text-[10px] font-bold text-gold border border-gold/20 uppercase tracking-wider">
            {generation.code}
          </span>
          <div className="flex items-center gap-1 text-gray-soft text-xs">
            <Package size={12} className="text-gold" />
            <span>{partsCount} {t("generationCard.spareParts")}</span>
          </div>
        </div>

        {/* Card Body & Footer */}
        <div className="relative z-10 mt-auto">
          {/* Years / Code */}
          <div className="flex items-center gap-1.5 text-gray-soft text-xs mb-2">
            <Calendar size={13} className="text-gold" />
            <span dir="ltr">{generation.years || t("generationCard.notSpecified")}</span>
          </div>

          <h3 className="text-xl font-black text-white group-hover:text-gold transition-colors duration-300 flex items-center justify-between">
            <span>{t("generationCard.chassis")} {generation.code}</span>
            <ArrowIcon
              size={18}
              className={`text-gray-muted group-hover:text-gold transition-all duration-300 transform ${isArabic ? "-translate-x-2 group-hover:translate-x-0" : "translate-x-2 group-hover:translate-x-0"
                }`}
            />
          </h3>

          <p className="text-xs text-gray-muted mt-2 group-hover:text-gray-soft transition-colors duration-300">
            {partsCount > 0 ? t("generationCard.clickToExplore") : t("generationCard.noPartsRegistered")}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
