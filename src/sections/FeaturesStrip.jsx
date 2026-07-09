"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animations/variants";
import { features } from "@/data/siteData";
import { Truck, ShieldCheck, Headphones, BadgeCheck } from "lucide-react";

const iconMap = {
  Truck,
  ShieldCheck,
  Headphones,
  BadgeCheck,
};

export default function FeaturesStrip() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-l from-gold/6 via-gold/2 to-gold/6" />
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-l from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-l from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {features.map((feature) => {
            const IconComponent = iconMap[feature.icon] || BadgeCheck;
            return (
              <motion.div
                key={feature.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="text-center group cursor-default"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-br from-gold/15 to-gold/5 border border-gold/10 flex items-center justify-center group-hover:border-gold/30 group-hover:scale-110 transition-all duration-300">
                  <IconComponent size={28} className="text-gold" />
                </div>
                <h4 className="text-white font-bold text-lg mb-1 group-hover:text-gold transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-gray-soft text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
