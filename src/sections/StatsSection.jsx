"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animations/variants";
import { stats } from "@/data/siteData";
import { useCountUp } from "@/hooks/useCountUp";
import { Award, Car, Package, Users } from "lucide-react";

const iconMap = {
  Award,
  Car,
  Package,
  Users,
};

function StatCard({ stat }) {
  const { count, ref } = useCountUp(stat.number, 2500);
  const IconComponent = iconMap[stat.icon] || Package;

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      whileHover={{ y: -5, scale: 1.03 }}
      className="relative text-center p-8 rounded-2xl bg-linear-to-br from-black-card to-black-surface border border-black-border hover:border-gold/30 transition-all duration-500 group"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gold/0 group-hover:bg-gold/3 transition-colors duration-500" />

      <div className="relative z-10">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-br from-gold/15 to-gold/5 border border-gold/10 flex items-center justify-center group-hover:border-gold/30 transition-colors duration-300">
          <IconComponent size={30} className="text-gold" />
        </div>
        <div className="text-4xl md:text-5xl font-black gradient-gold-text mb-2">
          {count.toLocaleString()}
          <span className="text-gold">{stat.suffix}</span>
        </div>
        <div className="text-gray-soft text-base font-medium">{stat.label}</div>
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-black-deep via-black-surface/30 to-black-deep" />

      {/* Gold line accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-l from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-l from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
