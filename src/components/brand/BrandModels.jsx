"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/animations/variants";
import { Calendar, Package, MessageCircle, Shield, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { contactInfo } from "@/data/siteData";
import { getModelParts } from "@/data/modelPartsData";
import Link from "next/link";
import Image from "next/image";
import { getAllCatalogModels } from "@/data/catalogData";
import { Wind, Wrench, Cpu, Gauge, Settings } from "lucide-react";

function PartIllustration({ type }) {
  const iconMap = {
    strut: Gauge,
    bag: Settings,
    compressor: Wind,
    valve: Wrench,
    sensor: Cpu,
    shock: Settings,
  };
  const IconComponent = iconMap[type] || Settings;
  return <IconComponent className="text-gold w-16 h-16" />;
}
{/*عرض انواع الموديلات */}
export default function BrandModels({ brand }) {
  const isCatalog = brand.catalogEnabled;
  const modelsList = isCatalog ? getAllCatalogModels(brand.slug) : brand.models;

  const [selectedModel, setSelectedModel] = useState(isCatalog ? null : brand.models[0]);

  // Retrieve dynamic parts tailored to selected model (for non-catalog brands only)
  const modelParts = !isCatalog && selectedModel
    ? getModelParts(brand.nameAr, brand.nameEn, selectedModel.nameAr, selectedModel.nameEn)
    : [];

  return (
    <section className="section-padding relative overflow-hidden bg-black-deep">
      {/* Background accents */}
      <div className="absolute -right-20 top-20 w-80 h-80 bg-gold/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 bottom-20 w-64 h-64 bg-gold/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          title="الموديلات المتاحة"
          subtitle={`تصفح موديلات ${brand.nameAr} المتوفرة لدينا مع قطع الغيار الأصلية`}
          englishTitle="Available Models"
        />

        {/* Models Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {modelsList.map((model, index) => {
            console.log(model)
            
            const isSelected = !isCatalog && selectedModel && selectedModel.nameEn === model.nameEn;
            
            const cardInnerContent = (
              <>
                {/* Card glow on hover / active */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-transparent transition-all duration-500 z-10" />

                {/* Top accent bar */}
                <div className={`h-1 bg-linear-to-r from-gold via-gold-light to-gold transition-all duration-500 rounded-t-2xl absolute top-0 left-0 right-0 z-20 ${
                  isSelected ? "w-full" : "w-0 group-hover:w-full"
                }`} />

                {/* Image placeholder — premium linear bg or real catalog image */}
                <div className="relative h-52 bg-linear-to-br from-black-surface via-[#151515] to-black-card overflow-hidden">
                  {isCatalog && model.image && model.image !== "/images/models/fallback-model.jpg" ? (
                    <Image
                      src={model.image}
                      alt={model.nameAr}

                      fill
                      sizes="(max-w-768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-gold/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-linear-to-tr from-gold/5 to-transparent" />

                      {/* Center brand+model display */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <div className={`w-20 h-20 rounded-full border bg-linear-to-br transition-all duration-500 flex items-center justify-center ${
                          isSelected 
                            ? "border-gold bg-gold/20 scale-110 shadow-[0_0_15px_rgba(212,168,83,0.3)]" 
                            : "border-gold/20 from-gold/15 to-gold/5 group-hover:border-gold/40 group-hover:scale-110"
                        }`}>
                          <span className="text-gold font-black text-lg" dir="ltr">
                            {brand.nameEn.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-white/30 text-xs tracking-widest uppercase font-medium" dir="ltr">
                          {model.nameEn}
                        </span>
                      </div>
                    </>
                  )}

                  {/* Subtle inner glow on hover */}
                  <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/3 transition-colors duration-500" />
                </div>

                {/* Card body */}
                <div className="p-6 relative z-20">
                  {/* Model name */}
                  <h3 className={`text-xl font-bold transition-colors duration-300 mb-1 ${
                    isSelected ? "text-gold" : "text-white group-hover:text-gold"
                  }`}>
                    {model.nameAr}
                  </h3>
                  <p className="text-xs text-gray-muted uppercase tracking-wider mb-4" dir="ltr">
                    {model.nameEn}
                  </p>

                  {/* Meta row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5 text-gray-soft text-xs">
                      <Calendar size={13} className="text-gold" />
                      <span dir="ltr">{isCatalog ? `عدد الهياكل: ${model.generationsCount || 0}` : model.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-soft text-xs">
                      <Package size={13} className="text-gold" />
                      <span>{model.partsCount}+ قطعة</span>
                    </div>
                  </div>

                  {/* Visual Indicator of Active Selection */}
                  <div className="flex items-center justify-center gap-1 text-gold text-xs font-semibold py-1.5 rounded-lg border border-gold/10 bg-gold/5">
                    {isCatalog ? (
                      <span>اضغط لاستعراض الهياكل وقطع الغيار</span>
                    ) : isSelected ? (
                      <>
                        <span className="w-1.5 h-1.5 bg-gold rounded-full animate-ping" />
                        <span>تتصفح حالياً قطع غيارها بالأسفل</span>
                      </>
                    ) : (
                      <span>اضغط لاستعراض قطع غيارها المخصصة</span>
                    )}
                  </div>
                </div>
              </>
            );

            if (isCatalog) {
              return (
                <Link
                  key={index}
                  href={`/brands/${brand.slug}/${model.slug}`}
                  className="block"
                >
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ y: -5, scale: 1.01 }}
                    className="group relative premium-card cursor-pointer overflow-hidden transition-all duration-300 border-black-border"
                  >
                    {cardInnerContent}
                  </motion.div>
                </Link>
              );
            }

            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.01 }}
                onClick={() => setSelectedModel(model)}
                className={`group relative premium-card cursor-pointer overflow-hidden transition-all duration-300 ${
                  isSelected ? "border-gold shadow-[0_0_20px_rgba(212,168,83,0.15)] bg-linear-to-br from-black-card to-[#15120c]" : "border-black-border"
                }`}
              >
                {cardInnerContent}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Dynamic Model-Specific Parts Showcase (for non-catalog brands only) */}
        {!isCatalog && selectedModel && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedModel.nameEn}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass-dark border border-gold/15 rounded-3xl p-8 md:p-10 relative overflow-hidden"
            >
              {/* Ambient Background Gold Glow inside Showcase */}
              <div className="absolute -top-40 -left-40 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

              {/* Showcase Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gold/15 pb-8 mb-8 gap-4 relative z-10">
                <div>
                  <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-2 font-tajawal">
                    معرض كتالوج قطع الغيار المخصصة
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-white">
                    قطع غيار لسيارة{" "}
                    <span className="gradient-gold-text">{brand.nameAr} {selectedModel.nameAr}</span>
                  </h2>
                  <p className="text-gray-soft text-sm mt-1 max-w-2xl leading-relaxed">
                    أنظمة تعليق هوائي فاخرة وقطع غيار أصلية 100% مع ضمان شامل مصممة هندسياً خصيصاً لموديل سيارتك لضمان أعلى مستويات الأداء والأمان.
                  </p>
                </div>
                <div className="flex items-center gap-3 self-start md:self-center bg-gold/5 border border-gold/15 rounded-2xl px-5 py-3">
                  <Shield className="text-gold" size={22} />
                  <div className="text-right">
                    <p className="text-white text-xs font-bold">قطع معتمدة وأصلية</p>
                    <p className="text-gold text-[10px] font-semibold">بشهادة ضمان موثقة</p>
                  </div>
                </div>
              </div>

              {/* Showcase Parts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {modelParts.map((part) => {
                  const waMessage = `مرحباً! أود الاستفسار عن ${part.nameAr} لسيارة ${brand.nameAr} ${selectedModel.nameAr} موديل ${selectedModel.year} (OEM: ${part.oemCode})`;
                  const waUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(waMessage)}`;

                  return (
                    <motion.div
                      key={part.id}
                      whileHover={{ y: -5 }}
                      className="group relative flex flex-col justify-between bg-black-surface border border-black-border hover:border-gold/30 rounded-2xl p-5 transition-all duration-400 overflow-hidden"
                    >
                      {/* Inner glowing hover effect */}
                      <div className="absolute inset-0 bg-linear-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

                      <div>
                        {/* Premium Dynamic Part Image/Vector Chamber */}
                        <div className="relative h-44 w-full bg-linear-to-b from-[#111] to-[#1a1a1a] rounded-xl border border-black-border flex items-center justify-center mb-5 overflow-hidden group-hover:border-gold/20 transition-colors">
                          <div className="absolute inset-0 opacity-[0.02]" style={{
                            backgroundImage: `linear-gradient(rgba(212,168,83,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.3) 1px, transparent 1px)`,
                            backgroundSize: "20px 20px"
                          }} />
                          <div className="w-28 h-28 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-500">
                            <PartIllustration type={part.iconName} />
                          </div>
                        </div>

                        {/* Part Identity */}
                        <div className="mb-4">
                          <h3 className="text-white font-bold text-base group-hover:text-gold transition-colors duration-300 leading-snug">
                            {part.nameAr}
                          </h3>
                          <span className="text-[10px] text-gray-muted font-medium tracking-wider uppercase block mt-0.5" dir="ltr">
                            {part.nameEn}
                          </span>
                        </div>

                        {/* Part Description */}
                        <p className="text-gray-soft text-xs leading-relaxed mb-5 line-clamp-3 font-tajawal">
                          {part.descAr}
                        </p>

                        {/* Part Specifications List */}
                        <div className="border-t border-black-border pt-4 mb-5 space-y-2">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-gray-muted">كود القطعة OEM:</span>
                            <span className="text-white font-semibold font-mono bg-black-deep px-2 py-0.5 rounded border border-black-border" dir="ltr">
                              {part.oemCode}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-gray-muted">الضمان الشامل:</span>
                            <span className="text-gold font-bold flex items-center gap-1">
                              <CheckCircle2 size={10} />
                              {part.warrantyAr}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-gray-muted">حالة التوفر:</span>
                            <span className="text-green-400 font-medium">{part.statusAr}</span>
                          </div>
                        </div>
                      </div>

                      {/* Order / Inquire Button */}
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 rounded-xl bg-gold/10 border border-gold/20 text-gold text-xs font-bold hover:bg-gold hover:text-black hover:shadow-[0_4px_15px_rgba(212,168,83,0.3)] transition-all duration-300 flex items-center justify-center gap-2 group-hover:border-gold/30"
                      >
                        <MessageCircle size={15} />
                        <span>طلب تسعيرة القطعة الآن</span>
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
