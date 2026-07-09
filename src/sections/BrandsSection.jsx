"use client";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations/variants";
import { brands } from "@/data/siteData";
import { ArrowLeft } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";

export default function BrandsSection() {
  return (
    <section id="brands" className="section-padding relative overflow-hidden">
      {/* Background subtle light flare */}
      <div className="absolute -left-20 top-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 bottom-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <SectionHeading
          title="العلامات التجارية"
          subtitle="نوفر قطع غيار أصليةللعلامات التجارية الأوروبية"
          englishTitle="Premium Brands"
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5"
        >
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brands/${brand.slug}`}
              className="premium-card group cursor-pointer relative flex flex-col justify-between"
            >
              {/* Card linear overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black-deep via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl z-10" />

              {/* Brand image area */}
              <div className="relative h-44 bg-linear-to-br from-black-surface to-black-card flex items-center justify-center overflow-hidden">
                {/* Decorative accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-bl from-gold/10 to-transparent rounded-bl-full" />

                {/* Brand logo */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  {brand.logo ? (
                    <div className="w-28 h-28 flex items-center justify-center group-hover:scale-110 transition-all duration-500 drop-shadow-lg">
                      <img
                        src={brand.logo}
                        alt={`${brand.nameEn} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextSibling.style.display = "flex";
                        }}
                      />
                      <div
                        className="w-16 h-16 rounded-full bg-linear-to-br from-gold/20 to-gold/5 border border-gold/20 items-center justify-center hidden"
                        aria-hidden="true"
                      >
                        <span className="text-gold font-bold text-lg" dir="ltr">
                          {brand.nameEn.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center group-hover:border-gold/40 group-hover:scale-110 transition-all duration-500">
                      <span className="text-gold font-bold text-lg" dir="ltr">
                        {brand.nameEn.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500" />
              </div>

              {/* Brand info */}
              <div className="relative z-20 p-5 text-center grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-gold transition-colors duration-300 font-tajawal">
                    {brand.name}
                  </h3>
                  <p
                    className="text-[10px] text-gray-muted mb-2 tracking-wider uppercase font-medium"
                    dir="ltr"
                  >
                    {brand.nameEn}
                  </p>
                  <p className="text-xs text-gray-soft mb-4 line-clamp-2 leading-relaxed">
                    {brand.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="w-full py-2.5 rounded-lg border border-gold/20 text-gold text-xs font-semibold hover:bg-gold/10 hover:border-gold/40 transition-all duration-300 flex items-center justify-center gap-2 group-hover:border-gold/30 mt-auto">
                  <span>عرض القطع</span>
                  <ArrowLeft
                    size={14}
                    className="group-hover:-translate-x-1 transition-transform duration-300"
                  />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
