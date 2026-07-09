"use client";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations/variants";

export default function SectionHeading({ title, subtitle, englishTitle }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="text-center mb-16"
    >
      {englishTitle && (
        <p className="text-xs text-gold/60 tracking-[0.3em] uppercase mb-3" dir="ltr">
          {englishTitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
        {title}
      </h2>
      <div className="gold-divider mb-6" />
      {subtitle && (
        <p className="text-gray-soft text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
