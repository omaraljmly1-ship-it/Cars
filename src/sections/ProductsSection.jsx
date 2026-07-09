"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations/variants";
import SectionHeading from "@/components/SectionHeading";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const productImages = [
  {
    src: "/images/products/audi-d4.jpeg",
    title: "Audi A8 D4",
    caption: "جامبينات هوائية أمامية وخلفية",
  },
  {
    src: "/images/products/audi-q7.jpeg",
    title: "Audi Q7",
    caption: "مساعدات هوائية وكمبروسر رفع",
  },
  {
    src: "/images/products/bmw.jpeg",
    title: "BMW",
    caption: "قطع غيار أصلية لجميع فئات BMW",
  },
  {
    src: "/images/products/mercedes-e.jpeg",
    title: "Mercedes-Benz E-Class",
    caption: "جامبينات وموزع هواء مرسيدس",
  },
  {
    src: "/images/products/mercedes-s.jpeg",
    title: "Mercedes-Benz S-Class",
    caption: "مساعدات هيدروليك وهوائية S-Class",
  },
  {
    src: "/images/products/porsche-panamera.jpeg",
    title: "Porsche Panamera",
    caption: "نظام تعليق هوائي بورش الأصلي",
  },
  {
    src: "/images/products/lamborghini.jpeg",
    title: "Lamborghini",
    caption: "شعار وأنظمة تعليق لامبورجيني",
  },
];

export default function ProductsSection() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    setLightboxIndex(
      (i) => (i - 1 + productImages.length) % productImages.length,
    );
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % productImages.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goNext();
      if (e.key === "ArrowRight") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, goPrev, goNext]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <section id="products" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-gold/2 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          title="منتجاتنا"
          subtitle="اضغط على أي صورة لعرضها بالحجم الكامل"
          englishTitle="Our Products"
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative px-0 md:px-10"
        >
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            loop={true}
            dir="rtl"
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: ".products-btn-prev",
              nextEl: ".products-btn-next",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              el: ".products-pagination",
            }}
            breakpoints={{
              480: { slidesPerView: 1.3, spaceBetween: 12 },
              640: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
              1280: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="w-full"
          >
            {productImages.map((img, index) => (
              <SwiperSlide key={index} className="py-4">
                <div
                  className="group relative overflow-hidden rounded-2xl cursor-zoom-in border border-gold/10 hover:border-gold/30 transition-all duration-500"
                  style={{ aspectRatio: "4/3" }}
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Zoom icon */}
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-gold/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <ZoomIn size={16} className="text-gold" />
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white font-bold text-sm font-tajawal mb-0.5">
                      {img.title}
                    </p>
                    <p className="text-gold/80 text-xs">{img.caption}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            className="products-btn-next absolute top-1/2 -left-2 lg:-left-6 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass border border-gold/10 hover:border-gold/40 items-center justify-center text-gold hover:text-white hover:bg-gold/10 active:scale-95 transition-all duration-300 shadow-xl cursor-pointer hidden md:flex"
            aria-label="Next"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="products-btn-prev absolute top-1/2 -right-2 lg:-right-6 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass border border-gold/10 hover:border-gold/40 items-center justify-center text-gold hover:text-white hover:bg-gold/10 active:scale-95 transition-all duration-300 shadow-xl cursor-pointer hidden md:flex"
            aria-label="Prev"
          >
            <ChevronRight size={20} />
          </button>

          {/* Pagination */}
          <div className="products-pagination flex justify-center gap-2 mt-5" />
        </motion.div>
      </div>

      {/* ─── Lightbox ─── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.93)" }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 z-10"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-5 glass px-4 py-1.5 rounded-full text-white/70 text-sm z-10">
            {lightboxIndex + 1} / {productImages.length}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-gold/30 hover:border-gold/40 transition-all duration-300 z-10"
            aria-label="Previous"
          >
            <ChevronRight size={24} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-gold/30 hover:border-gold/40 transition-all duration-300 z-10"
            aria-label="Next"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] mx-6 md:mx-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={lightboxIndex}
              src={productImages[lightboxIndex].src}
              alt={productImages[lightboxIndex].title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              style={{ animation: "fadeIn 0.2s ease" }}
            />
            <div className="text-center mt-4">
              <p className="text-white font-bold text-lg font-tajawal">
                {productImages[lightboxIndex].title}
              </p>
              <p className="text-gold/80 text-sm mt-1">
                {productImages[lightboxIndex].caption}
              </p>
            </div>
          </div>

          <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }`}</style>
        </div>
      )}
    </section>
  );
}
