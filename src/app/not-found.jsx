"use client";
import { motion } from "framer-motion";
import { Wrench, Home } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/components/LanguageProvider";

export default function NotFound() {
  const { t } = useLocale();
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black-deep px-4">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(212,168,83,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.5) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="glass-dark border border-gold/10 p-8 rounded-3xl shadow-2xl flex flex-col items-center"
        >
          {/* Animated icon container */}
          <motion.div
            initial={{ rotate: -15 }}
            animate={{ rotate: 15 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
              ease: "easeInOut",
            }}
            className="w-20 h-20 rounded-2xl bg-linear-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center mb-6"
          >
            <Wrench size={36} className="text-gold" />
          </motion.div>

          <span className="text-gold text-sm font-semibold tracking-wider uppercase mb-2">
            404
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-3">
            {t("notFound.title")}
          </h1>
          <p className="text-gray-soft text-sm mb-8 leading-relaxed font-tajawal">
            {t("notFound.message")}
          </p>

          <Link
            href="/"
            className="btn-gold flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold transition-all duration-300"
          >
            <Home size={18} />
            <span>{t("notFound.cta")}</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
