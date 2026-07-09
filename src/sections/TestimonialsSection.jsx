"use client";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/animations/variants";
import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    nameAr: "محمد العتيبي",
    nameEn: "Mohammed Al-Otaibi",
    car: "Range Rover Vogue 2022",
    rating: 5,
    textAr:
      "خدمة ممتازة وقطع أصلية. طلبت مساعد هوائي أمامي لرنج روفر الخاص بي وتم توصيله في نفس اليوم مع ضمان كامل. أنصح الجميع بالتعامل مع هذه الشركة.",
    tag: "تعليق هوائي",
  },
  {
    id: 2,
    nameAr: "سالم الزهراني",
    nameEn: "Salem Al-Zahrani",
    car: "Mercedes S-Class 2021",
    rating: 5,
    textAr:
      "تعاملت معهم أكثر من مرة لشراء قطع غيار مرسيدس. الأسعار تنافسية والقطع أصلية 100٪. الفريق محترف ويعطيك دعم فني ممتاز.",
    tag: "قطع مرسيدس",
  },
  {
    id: 3,
    nameAr: "خالد المطيري",
    nameEn: "Khalid Al-Mutairi",
    car: "BMW X7 2023",
    rating: 5,
    textAr:
      "أفضل مكان لقطع غيار السيارات الفاخرة. وجدوا لي قطعة BMW نادرة في وقت قياسي. خدمة العملاء رائعة والشحن سريع جداً.",
    tag: "قطع BMW",
  },
  {
    id: 4,
    nameAr: "عبدالله الشمري",
    nameEn: "Abdullah Al-Shammari",
    car: "Bentley Bentayga 2022",
    rating: 5,
    textAr:
      "قطع بنتلي نادرة وجدتها عندهم فقط في الإمارات. جودة ممتازة وسعر معقول مقارنة بالوكالة. شكراً للفريق المحترف.",
    tag: "قطع بنتلي",
  },
  {
    id: 5,
    nameAr: "فيصل الحربي",
    nameEn: "Faisal Al-Harbi",
    car: "Porsche Cayenne 2023",
    rating: 5,
    textAr:
      "تجربة تسوق راقية من أول تواصل حتى استلام القطع. كمبروسر الهواء وصل معبأ بشكل ممتاز مع شهادة الضمان. خدمة على مستوى السيارة نفسها.",
    tag: "قطع بورش",
  },
  {
    id: 6,
    nameAr: "ناصر القحطاني",
    nameEn: "Nasser Al-Qahtani",
    car: "Rolls-Royce Cullinan 2023",
    rating: 5,
    textAr:
      "الوحيدون الذين يتعاملون بمستوى يليق بسيارة رولز رويس. قطع أصلية، تعامل فاخر، وشحن موثوق. لن أتعامل مع غيرهم.",
    tag: "قطع رولز رويس",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="text-gold fill-gold" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-black-deep via-black-surface/20 to-black-deep" />

      {/* Top & bottom lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />

      {/* Glow blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          title="آراء عملائنا"
          subtitle="ثقة آلاف العملاء من أصحاب السيارات الفاخرة في الإمارات"
          englishTitle="Testimonials"
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            dir="rtl"
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true, el: ".testimonials-pagination", dynamicBullets: true }}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 20 },
              1200: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="pb-10"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="group h-full p-6 rounded-2xl bg-linear-to-br from-black-card to-black-surface border border-black-border hover:border-gold/30 transition-all duration-500 flex flex-col gap-4 relative overflow-hidden">
                  {/* Corner glow */}
                  <div className="absolute top-0 left-0 w-24 h-24 bg-linear-to-br from-gold/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-2xl" />

                  {/* Quote icon */}
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center shrink-0">
                    <Quote size={18} className="text-gold rotate-180" />
                  </div>

                  {/* Review text */}
                  <p className="text-gray-soft text-sm leading-relaxed flex-1">
                    {t.textAr}
                  </p>

                  {/* Tag chip */}
                  <span className="inline-block self-start text-xs px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 font-medium">
                    {t.tag}
                  </span>

                  {/* Divider */}
                  <div className="h-px bg-black-border" />

                  {/* Author row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center shrink-0">
                        <span className="text-gold font-bold text-sm">
                          {t.nameAr.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{t.nameAr}</p>
                        <p className="text-gray-muted text-xs" dir="ltr">{t.car}</p>
                      </div>
                    </div>
                    <StarRating count={t.rating} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="testimonials-pagination flex justify-center gap-2 mt-2" />
        </motion.div>
      </div>
    </section>
  );
}
