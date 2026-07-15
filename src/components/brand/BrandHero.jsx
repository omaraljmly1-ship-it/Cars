"use client";
import { motion } from "framer-motion";
import { ArrowRight, Star, Shield } from "lucide-react";
import Link from "next/link";
{/*الهيرو سكشن بتاع كل براند */}

export default function BrandHero({ brand }) {
  return (
    <section
      className={`relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-linear-to-br ${brand.heroGradient}`}
    >
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(212,168,83,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.4) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Gold ambient glow blobs */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gold/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      {/* Large brand name watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="text-[18vw] font-black leading-none uppercase"
          style={{ color: "rgba(255,255,255,0.02)", letterSpacing: "-0.05em" }}
        >
          {brand.nameEn}
        </span>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-black-deep to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center pt-32 pb-16">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-block"
        >
          <Link
            href="/#brands"
            className="inline-flex items-center gap-2 text-gray-muted hover:text-gold transition-colors text-sm"
          >
            <ArrowRight size={16} />
            <span>العودة إلى العلامات التجارية</span>
          </Link>
        </motion.div>

        {/* Brand logo circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
          className="mx-auto mb-8 w-32 h-32 rounded-full border-2 border-gold/40 bg-linear-to-br from-gold/20 to-gold/5 flex items-center justify-center gold-glow overflow-hidden"
        >
          {brand.logo ? (
            <img
              src={brand.logo}
              alt={`${brand.nameEn} logo`}
              className="w-full h-full object-contain p-3"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <span
            className="text-gold font-black text-3xl"
            dir="ltr"
            style={{ display: brand.logo ? "none" : "flex" }}
          >
            {brand.nameEn.slice(0, 2).toUpperCase()}
          </span>
        </motion.div>

        {/* Brand name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl md:text-7xl font-black mb-3"
        >
          <span className="gradient-gold-text">{brand.nameAr}</span>
        </motion.h1>

        {/* English name */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-muted text-sm uppercase tracking-[0.3em] mb-4"
          dir="ltr"
        >
          {brand.nameEn}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl md:text-2xl text-white/80 mb-6 font-light"
        >
          {brand.taglineAr}
        </motion.p>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="gold-divider mx-auto mb-8"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-gray-soft max-w-2xl mx-auto text-base leading-relaxed mb-10"
        >
          {brand.descriptionAr}
        </motion.p>

        {/* Stats badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
            <Star size={16} className="text-gold" />
            <span className="text-sm text-white">
              {brand.models.length} موديل متاح
            </span>
          </div>
          <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
            <Shield size={16} className="text-gold" />
            <span className="text-sm text-white">
              {brand.parts.reduce((a, p) => a + p.count, 0)}+ قطعة متوفرة
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
