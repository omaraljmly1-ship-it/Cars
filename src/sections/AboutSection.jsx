"use client";
import { motion } from "framer-motion";
import { fadeInUp, fadeInRight, staggerContainer } from "@/animations/variants";
import { aboutContent } from "@/data/siteData";
import { CheckCircle, Star } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export default function AboutSection() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          title={aboutContent.title}
          subtitle={aboutContent.subtitle}
          englishTitle="About Us"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              {aboutContent.description.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-gray-soft text-base md:text-lg leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 space-y-4">
              {aboutContent.highlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                    <CheckCircle size={16} className="text-gold" />
                  </div>
                  <span className="text-white text-base">{highlight}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10">
              <a
                href="#contact"
                className="btn-gold px-10 py-4 rounded-full inline-flex items-center gap-2 text-lg"
              >
                تواصل معنا
              </a>
            </motion.div>
          </motion.div>

          {/* Visual Card */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div className="premium-card p-8 relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-gold/10 to-transparent" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr from-gold/5 to-transparent" />

              {/* Stats grid inside card */}
              <div className="grid grid-cols-2 gap-6 relative z-10">
                <div className="text-center p-6 rounded-xl bg-black-surface border border-black-border hover:border-gold/20 transition-colors duration-300">
                  <div className="text-4xl font-black gradient-gold-text mb-2">
                    +23
                  </div>
                  <div className="text-gray-soft text-sm">سنة خبرة</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-black-surface border border-black-border hover:border-gold/20 transition-colors duration-300">
                  <div className="text-4xl font-black gradient-gold-text mb-2">
                    +50
                  </div>
                  <div className="text-gray-soft text-sm">نوع سيارة</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-black-surface border border-black-border hover:border-gold/20 transition-colors duration-300">
                  <div className="text-4xl font-black gradient-gold-text mb-2">
                    +10K
                  </div>
                  <div className="text-gray-soft text-sm">قطعة مباعة</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-black-surface border border-black-border hover:border-gold/20 transition-colors duration-300">
                  <div className="text-4xl font-black gradient-gold-text mb-2">
                    +5K
                  </div>
                  <div className="text-gray-soft text-sm">عميل سعيد</div>
                </div>
              </div>

              {/* Rating row */}
              <div className="mt-8 flex items-center justify-center gap-3 relative z-10">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-gold fill-gold"
                    />
                  ))}
                </div>
                <span className="text-gray-soft text-sm">
                  تقييم عملائنا 4.9/5
                </span>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 glass px-4 py-2.5 rounded-full gold-border-glow"
            >
              <span className="text-gold text-sm font-bold">⭐ الأفضل في الإمارات</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
