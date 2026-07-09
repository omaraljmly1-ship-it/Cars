"use client";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Send } from "lucide-react";
import { useState } from "react";
import { contactInfo } from "@/data/siteData";

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);

  const message = encodeURIComponent(
    "مرحباً! أود الاستفسار عن قطع الغيار المتاحة."
  );

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {/* Popup card */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="glass-dark rounded-2xl p-5 w-72 border border-green-500/20 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <MessageCircle size={20} className="text-green-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">فريق الدعم</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs">متاح الآن</span>
                </div>
              </div>
            </div>

            <p className="text-gray-soft text-sm mb-4 leading-relaxed">
              مرحباً! 👋 كيف يمكنني مساعدتك في إيجاد قطعة الغيار التي تحتاجها؟
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-col gap-2">
              <a
                href={`https://wa.me/${contactInfo.whatsapp}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-white text-sm font-bold transition-colors duration-300"
              >
                <Send size={15} />
                <span>ابدأ المحادثة</span>
              </a>
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-black-border text-gray-soft hover:text-white hover:border-gold/30 text-sm transition-all duration-300"
              >
                <Phone size={15} />
                <span>اتصل بنا</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((p) => !p)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 shadow-xl shadow-green-500/30 flex items-center justify-center transition-colors duration-300"
        aria-label="تواصل عبر واتساب"
      >
        {/* Ping animation when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
        )}

        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={26} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
