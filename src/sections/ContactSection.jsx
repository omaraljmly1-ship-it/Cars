"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { staggerContainer, fadeInUp } from "@/animations/variants";
import { useLocale } from "@/components/LanguageProvider";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";

function Instagram({ size = 18, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

import { contactInfo } from "@/data/siteData";
import SectionHeading from "@/components/SectionHeading";

const initialForm = { name: "", phone: "", car: "", message: "" };

export default function ContactSection() {
  const { locale, t } = useLocale();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success

  const contactCards = [
    {
      icon: Phone,
      titleKey: "contactCards.callUs",
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
      hoverColor: "hover:border-blue-500/40",
      iconColor: "text-blue-400",
      bgColor: "from-blue-500/10 to-blue-500/5",
    },
    {
      icon: MessageCircle,
      titleKey: "contactCards.whatsapp",
      value: contactInfo.whatsapp,
      href: `https://wa.me/${contactInfo.whatsapp}`,
      hoverColor: "hover:border-green-500/40",
      iconColor: "text-green-400",
      bgColor: "from-green-500/10 to-green-500/5",
    },
    {
      icon: Mail,
      titleKey: "contactCards.email",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      hoverColor: "hover:border-gold/40",
      iconColor: "text-gold",
      bgColor: "from-gold/10 to-gold/5",
    },
    {
      icon: Clock,
      titleKey: "contactCards.workingHours",
      value: locale === "en" ? contactInfo.workingHoursEn : contactInfo.workingHours,
      href: null,
      hoverColor: "hover:border-purple-500/40",
      iconColor: "text-purple-400",
      bgColor: "from-purple-500/10 to-purple-500/5",
    },
  ];

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;
    setStatus("sending");
    // Compose WhatsApp message
    const text = encodeURIComponent(
      `*${t("contactCards.newMessage")}*\n\n${t("contactCards.name")}: ${form.name}\n${t("contactCards.phone")}: ${form.phone}\n${t("contactCards.carType")}: ${form.car || t("contactCards.notSpecified")}\n${t("contactCards.message")}: ${form.message}`
    );
    // Open WhatsApp after brief delay to show animation
    setTimeout(() => {
      window.open(`https://wa.me/${contactInfo.whatsapp}?text=${text}`, "_blank");
      setStatus("success");
      setForm(initialForm);
      setTimeout(() => setStatus("idle"), 4000);
    }, 800);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-black-deep via-black-card/30 to-black-deep" />

      {/* Gold ambient glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-gold/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-gold/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          title={t("contact.sectionTitle")}
          subtitle={t("contact.sectionSubtitle")}
          englishTitle={t("contact.englishTitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT — Contact cards + address */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-5"
          >
            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactCards.map((card, i) => {
                const Icon = card.icon;
                const Wrapper = card.href ? "a" : "div";
                const wrapperProps = card.href
                  ? { href: card.href, target: card.href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" }
                  : {};

                return (
                  <motion.div key={i} variants={fadeInUp}>
                    <Wrapper
                      {...wrapperProps}
                      className={`group block p-5 rounded-2xl bg-linear-to-br from-black-card to-black-surface border border-black-border ${card.hoverColor} transition-all duration-400 hover:-translate-y-1`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${card.bgColor} border border-black-border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={22} className={card.iconColor} />
                      </div>
                      <p className="text-gray-muted text-xs uppercase tracking-wider mb-1">
                        {t(card.titleKey)}
                      </p>
                      <p className="text-white font-semibold text-sm leading-relaxed" dir="ltr">
                        {card.value}
                      </p>
                    </Wrapper>
                  </motion.div>
                );
              })}
            </div>

            {/* Address */}
            <motion.div
              variants={fadeInUp}
              className="p-5 rounded-2xl bg-linear-to-br from-black-card to-black-surface border border-black-border"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-gold/10 to-gold/5 border border-black-border flex items-center justify-center shrink-0">
                  <MapPin size={22} className="text-gold" />
                </div>
                <div>
                  <p className="text-gray-muted text-xs uppercase tracking-wider mb-1">
                    {t("contact.ourAddress")}
                  </p>
                  <p
                    className="text-white font-semibold text-sm leading-relaxed"
                    dir={locale === "en" ? "ltr" : "rtl"}
                  >
                    {locale === "en" ? contactInfo.addressEn : contactInfo.address}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social CTAs */}
            <motion.div variants={fadeInUp} className="flex gap-3 flex-wrap">
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-35 btn-gold flex items-center justify-center gap-2 py-3! rounded-xl text-sm"
              >
                <MessageCircle size={18} />
                {t("contact.whatsappNow")}
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex-1 min-w-35 btn-gold-outline flex items-center justify-center gap-2 py-3! rounded-xl text-sm"
              >
                <Phone size={18} />
                {t("contact.callDirect")}
              </a>
              <a
                href={`https://instagram.com/${contactInfo.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-35 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-black-border text-gray-soft hover:text-gold hover:border-gold/30 transition-all duration-300 text-sm"
              >
                <Instagram size={18} />
                {t("contact.instagram")}
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT — Contact Form */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative"
          >
            {/* Success overlay */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-3xl bg-black-card/95 border border-green-500/30 backdrop-blur-sm"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-green-400" />
                </div>
                <p className="text-white font-bold text-lg text-center">
                  {t("contact.form.success")}
                </p>
                <p className="text-gray-soft text-sm text-center">
                  {t("contact.form.successSub")}
                </p>
              </motion.div>
            )}

            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-3xl bg-linear-to-br from-black-card to-black-surface border border-black-border space-y-5"
            >
              <div>
                <h3 className="text-white font-bold text-xl mb-1">{t("contact.sendMessage")}</h3>
                <p className="text-gray-muted text-sm">
                  {t("contact.sendMessageSubtitle")}
                </p>
              </div>

              {/* Name + Phone row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-soft text-xs mb-2 block">
                    {t("contact.form.name")} *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder={t("contact.form.placeholder.name")}
                    className="w-full bg-black-deep border border-black-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-muted focus:border-gold/40 focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="text-gray-soft text-xs mb-2 block">
                    {t("contact.form.phone")} *
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder={t("contact.form.placeholder.phone")}
                    dir="ltr"
                    className="w-full bg-black-deep border border-black-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-muted focus:border-gold/40 focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Car type */}
              <div>
                <label className="text-gray-soft text-xs mb-2 block">
                  {t("contact.form.car")}
                </label>
                <input
                  name="car"
                  value={form.car}
                  onChange={handleChange}
                  placeholder={t("contact.form.placeholder.car")}
                  className="w-full bg-black-deep border border-black-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-muted focus:border-gold/40 focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-gray-soft text-xs mb-2 block">
                  {t("contact.form.message")} *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder={t("contact.form.placeholder.message")}
                  className="w-full bg-black-deep border border-black-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-gray-muted focus:border-gold/40 focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full btn-gold flex items-center justify-center gap-3 py-4! rounded-xl text-base font-bold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>{t("contact.form.sending")}</span>
                  </>
                ) : (
                  <>
                    <Send size={19} />
                    <span>{t("contact.form.submit")}</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
