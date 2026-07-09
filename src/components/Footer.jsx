"use client";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animations/variants";
import { contactInfo, navLinks } from "@/data/siteData";
import { Phone, Mail, MapPin, MessageCircle, ArrowUp } from "lucide-react";
import logo from "../app/assets/images/Logo.png"
import Image from "next/image";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black-card border-t border-black-border">
      {/* Gold line top */}
      <div className="h-px bg-linear-to-l from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Brand Column */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-3 mb-6">

              <a
                href={isHome ? "#home" : "/#home"}
                onClick={(e) => {
                  if (isHome) {
                    e.preventDefault();
                    scrollToTop();
                  }
                }}
                className="block"
              >
                <Image
                  src={logo}
                  alt="Logo"
                  className="text-xl font-bold text-white group-hover:text-gold transition-colors duration-300"
                  width={150}
                  height={150}
                  style={{ height: "auto" }}
                />
              </a>
            </div>
            <p className="text-gray-soft text-sm leading-relaxed mb-6">
              الوكيل المعتمد لقطع غيار السيارات الأوروبية في الامارات
              العربية . نتخصص في أنظمة التعليق الهوائي والقطع الأصلية.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-black-surface border border-black-border hover:border-gold/30 flex items-center justify-center text-gray-soft hover:text-gold transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-black-surface border border-black-border hover:border-gold/30 flex items-center justify-center text-gray-soft hover:text-gold transition-all duration-300"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="w-10 h-10 rounded-xl bg-black-surface border border-black-border hover:border-gold/30 flex items-center justify-center text-gray-soft hover:text-gold transition-all duration-300"
              >
                <Phone size={18} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gold rounded-full" />
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={isHome ? link.href : "/" + link.href}
                    onClick={(e) => {
                      if (isHome) {
                        e.preventDefault();
                        const el = document.querySelector(link.href);
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }}
                    className="text-gray-soft hover:text-gold transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-gold/30 rounded-full group-hover:bg-gold transition-colors" />
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gold rounded-full" />
              خدماتنا
            </h4>
            <ul className="space-y-3">
              {[
                "نظام التعليق الأمامي",
                "نظام التعليق الخلفي",
                "كمبروسر الهواء",
                "موزع الهواء",
                "فحص وتشخيص",
                "تركيب القطع",
              ].map((service, i) => (
                <li key={i}>
                  <span className="text-gray-soft text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gold/30 rounded-full" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gold rounded-full" />
              تواصل معنا
            </h4>
            <div className="space-y-4">
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-3 text-gray-soft hover:text-gold transition-colors group"
              >
                <Phone size={18} className="text-gold shrink-0" />
                <span className="text-sm" dir="ltr">
                  {contactInfo.phone}
                </span>
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 text-gray-soft hover:text-gold transition-colors group"
              >
                <Mail size={18} className="text-gold shrink-0" />
                <span className="text-sm" dir="ltr">
                  {contactInfo.email}
                </span>
              </a>
              <div className="flex items-start gap-3 text-gray-soft">
                <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                <span className="text-sm">{contactInfo.address}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black-border">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-muted text-sm">
            © {new Date().getFullYear()} أوتو بارتس. جميع الحقوق محفوظة.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold/20 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
