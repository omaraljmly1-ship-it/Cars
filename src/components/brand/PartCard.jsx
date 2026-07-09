"use client";
import { motion } from "framer-motion";
import { MessageCircle, Shield, Check } from "lucide-react";
import Image from "next/image";
import { contactInfo } from "@/data/siteData";

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
 */
export default function PartCard({ 
  part, 
  brandNameAr, 
  brandNameEn, 
  modelNameAr, 
  modelNameEn, 
  generationCode, 
  generationYears 
}) {
  // Pre-fill WhatsApp message with part information
  const messageText = `مرحباً! أود الاستفسار عن توفر وسعر:\n- القطعة: ${part.nameAr} (${part.nameEn})\n- السيارة: ${brandNameAr} ${modelNameAr}\n- الهيكل/الموديل: ${generationCode} (${generationYears})`;
  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(messageText)}`;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative flex flex-col justify-between bg-black-card border border-black-border hover:border-gold/30 rounded-2xl p-5 transition-all duration-400 overflow-hidden"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-transparent transition-all duration-500 rounded-2xl pointer-events-none" />

      <div>
        {/* Real Part Image Container */}
        <div className="relative h-56 w-full bg-linear-to-b from-[#111] to-[#1a1a1a] rounded-xl border border-black-border flex items-center justify-center mb-5 overflow-hidden group-hover:border-gold/20 transition-all duration-300">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
            backgroundImage: `linear-gradient(rgba(212,168,83,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.3) 1px, transparent 1px)`,
            backgroundSize: "20px 20px"
          }} />

          {part.image ? (
            <Image
              src={part.image}
              alt={part.altAr || part.nameAr}
              fill
              sizes="(max-w-768px) 100vw, 33vw"
              className="object-cover transition-all duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="text-gray-muted text-xs">لا تتوفر صورة للقطعة</div>
          )}

          {/* Premium overlay for image */}
          <div className="absolute inset-0 bg-linear-to-t from-black-deep/50 via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Genuine Shield badge */}
          <div className="absolute top-3 right-3 glass-dark px-2.5 py-1 rounded-full flex items-center gap-1 border border-gold/20">
            <Shield size={10} className="text-gold" />
            <span className="text-[9px] text-white font-medium">أصلي معتمد</span>
          </div>
        </div>

        {/* Brand & Generation Label */}
        <div className="text-gold text-[10px] font-bold uppercase tracking-wider mb-2 font-tajawal">
          {brandNameAr} • {modelNameAr} • {generationCode}
        </div>

        {/* Part Title */}
        <div className="mb-4">
          <h3 className="text-white font-bold text-base group-hover:text-gold transition-colors duration-300 leading-snug">
            {part.nameAr}
          </h3>
          <span className="text-[11px] text-gray-muted font-medium tracking-wider uppercase block mt-0.5" dir="ltr">
            {part.nameEn}
          </span>
        </div>

        {/* Features / Details list */}
        <div className="border-t border-black-border pt-4 mb-5 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-muted">الضمان الشامل:</span>
            <span className="text-gold font-bold flex items-center gap-1">
              <Check size={10} className="text-gold" />
              ضمان تشغيل واختبار
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-muted">حالة التوفر:</span>
            <span className="text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded">متوفر حالياً</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-muted">الحالة العامة:</span>
            <span className="text-white/80 font-medium">مستورد درجة أولى</span>
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
        <span>طلب تسعيرة وتأكيد التوفر</span>
      </a>
    </motion.div>
  );
}
