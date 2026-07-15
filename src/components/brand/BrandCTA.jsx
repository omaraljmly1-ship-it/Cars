"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animations/variants";
import { Phone, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { contactInfo } from "@/data/siteData";
import Link from "next/link";

const guarantees = [
  "قطع غيار أصلية 100% معتمدة",
  "ضمان شامل على جميع القطع",
  "شحن سريع لجميع الإمارات",
  "دعم فني متخصص بعد البيع",
];
{/* اخر جزء في صفحة البراند*/}

export default function BrandCTA({ brand }) {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0 bg-linear-to-br from-black-deep via-[#0f0a00] to-black-deep" />

      {/* Radial gold glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gold/5 blur-3xl" />
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
              {brand.nameAr} — قطع أصلية ومعتمدة
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight"
          >
            هل تحتاج قطعة لـ{" "}
            <span className="gradient-gold-text">{brand.nameAr}</span>؟
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-gray-soft text-lg mb-8 max-w-xl mx-auto leading-relaxed"
          >
            فريقنا المتخصص جاهز للمساعدة. تواصل معنا الآن للحصول على أفضل
            سعر وأسرع شحن.
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
              href={`https://wa.me/${contactInfo.whatsapp}?text=أريد الاستفسار عن قطع غيار ${brand.nameAr}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center gap-3 text-base px-10! py-4! rounded-full shadow-lg shadow-gold/20"
            >
              <MessageCircle size={20} />
              <span>تواصل عبر واتساب</span>
            </a>
            <a
              href={`tel:${contactInfo.phone}`}
              className="btn-gold-outline flex items-center gap-3 text-base px-10! py-4! rounded-full"
            >
              <Phone size={20} />
              <span>اتصل بنا مباشرة</span>
            </a>
          </motion.div>

          {/* Back link */}
          <motion.div variants={fadeInUp} className="mt-10">
            <Link
              href="/#brands"
              className="inline-flex items-center gap-2 text-gray-muted hover:text-gold transition-colors text-sm"
            >
              <ArrowRight size={15} />
              <span>استعراض علامات تجارية أخرى</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
