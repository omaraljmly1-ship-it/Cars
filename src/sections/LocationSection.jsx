"use client";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations/variants";
import { contactInfo } from "@/data/siteData";
import { MapPin, Clock, Phone } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useLocale } from "@/components/LanguageProvider";

export default function LocationSection() {
  const { t, locale } = useLocale();
  const address = locale === "en" ? contactInfo.addressEn : contactInfo.address;
  const workingHours = locale === "en" ? contactInfo.workingHoursEn : contactInfo.workingHours;
  return (
    <section id="location" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          title={t("location.sectionTitle")}
          subtitle={t("location.sectionSubtitle")}
          englishTitle={t("location.englishTitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="map-container h-[400px] lg:h-full min-h-[400px]">
              <iframe
                src={contactInfo.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("location.mapTitle")}
                className="w-full h-full"
              />
            </div>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Address */}
            <div className="premium-card p-6 group hover:border-gold/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/15 transition-colors">
                  <MapPin size={24} className="text-gold" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{t("contact.address")}</h4>
                  <p className="text-gray-soft text-sm leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="premium-card p-6 group hover:border-gold/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/15 transition-colors">
                  <Clock size={24} className="text-gold" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{t("contact.hours")}</h4>
                  <p className="text-gray-soft text-sm leading-relaxed">
                    {workingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="premium-card p-6 group hover:border-gold/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0 group-hover:bg-gold/15 transition-colors">
                  <Phone size={24} className="text-gold" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{t("contact.callNow")}</h4>
                  <p className="text-gray-soft text-sm leading-relaxed" dir="ltr">
                    {contactInfo.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-center py-4 rounded-xl text-lg flex items-center justify-center gap-3"
            >
              <span>{t("contact.whatsappNow")}</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
