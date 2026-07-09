"use client";
import { motion } from "framer-motion";
import {
  heroTextVariant,
  staggerContainer,
  fadeInUp,
} from "@/animations/variants";
import { ChevronDown, Shield, Award, Truck, Wrench } from "lucide-react";

const heroFeatures = [
  { icon: Shield, label: "قطع أصلية" },
  { icon: Award, label: "ضمان شامل" },
  { icon: Truck, label: "شحن سريع" },
  { icon: Wrench, label: "دعم فني" },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {/* Loop Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/intro.mp4" type="video/mp4" />
        </video>

        {/* Premium Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black-deep" />

        {/* Decorative gold accent circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(212,168,83,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-black-deep to-transparent" />
      </div>

      {/* Large decorative text in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[20vw] font-black text-white/2 leading-none">
          PREMIUM
        </span>
      </div>

      {/* Main Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 text-center pt-32 pb-20"
      >
        {/* Badge */}
        <motion.div variants={heroTextVariant} className="mb-8 inline-block">
          <span className="glass px-6 py-2.5 rounded-full text-gold text-sm font-semibold tracking-wide inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
             علي قنيطه لقطع غيار السيارات الأوروبية
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          variants={heroTextVariant}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6"
        >
          <span className="text-white"> علي قنيطه </span>
          <br />
          <span className="gradient-gold-text">لتجارة السيارات المستعملة و قطع غيارها</span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          variants={heroTextVariant}
          className="text-lg md:text-xl text-gray-soft max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          متخصصون في أنظمة التعليق الهوائي وقطع الغيار الأصلية السيارات
          الأوروبية
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={heroTextVariant}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
        >
          <a
            href="#products"
            className="btn-gold text-lg px-10 py-4 rounded-full shadow-lg shadow-gold/20 flex items-center gap-2"
          >
            تصفح المنتجات
          </a>
          <a
            href="#contact"
            className="btn-gold-outline text-lg px-10 py-4 rounded-full flex items-center gap-2"
          >
            تواصل معنا
          </a>
        </motion.div>

        {/* Feature Icons Row */}
        <motion.div
          variants={heroTextVariant}
          className="flex flex-wrap justify-center gap-6 md:gap-12"
        >
          {heroFeatures.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex flex-col items-center gap-3 group cursor-default"
            >
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center group-hover:border-gold/40 transition-all duration-300">
                <feature.icon
                  size={28}
                  className="text-gold group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-sm text-gray-soft group-hover:text-white transition-colors duration-300">
                {feature.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-muted tracking-widest uppercase">
          اكتشف المزيد
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
