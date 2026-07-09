/**
 * Generates dynamic suspension parts catalogue tailored specifically to a selected brand and model.
 * Adheres to clean code principles by separating data concerns from UI components.
 * 
 * @param {string} brandNameAr - Brand name in Arabic (e.g. "مرسيدس بنز")
 * @param {string} brandNameEn - Brand name in English (e.g. "Mercedes-Benz")
 * @param {string} modelNameAr - Model name in Arabic (e.g. "الفئة S")
 * @param {string} modelNameEn - Model name in English (e.g. "S-Class")
 * @returns {Array} List of dynamically-constructed parts
 */
export function getModelParts(brandNameAr, brandNameEn, modelNameAr, modelNameEn) {
  const brandSlug = brandNameEn.slice(0, 3).toUpperCase();
  const modelSlug = modelNameEn.replace(/\s+/g, "").slice(0, 4).toUpperCase();

  return [
    {
      id: "front-strut",
      nameAr: "مساعد هواء أمامي كامل",
      nameEn: "Front Air Suspension Strut",
      descAr: `مساعد هوائي أمامي كامل ومطور خصيصاً لسيارة ${brandNameAr} ${modelNameAr}. يضمن توازناً مثالياً وامتصاصاً فائقاً للصدمات في مختلف ظروف القيادة.`,
      warrantyAr: "ضمان 12 شهر",
      statusAr: "متوفر في المستودع جاهز للشحن السريع",
      oemCode: `OEM-${brandSlug}-${modelSlug}-FL`,
      iconName: "strut"
    },
    {
      id: "rear-bag",
      nameAr: "بالون تعليق هوائي خلفي",
      nameEn: "Rear Air Spring Bag",
      descAr: `بالون تعليق خلفي مصنع من مطاط عالي الكثافة ومتعدد الطبقات لسيارة ${brandNameAr} ${modelNameAr}. يتحمل الحمولات والظروف البيئية الصعبة بكل سلاسة.`,
      warrantyAr: "ضمان 12 شهر",
      statusAr: "متوفر جاهز للتركيب والشحن",
      oemCode: `OEM-${brandSlug}-${modelSlug}-RL`,
      iconName: "bag"
    },
    {
      id: "compressor",
      nameAr: "كمبروسر هواء نظام التعليق",
      nameEn: "Air Suspension Compressor",
      descAr: `مضخة وكمبروسر هواء أصلي ذو قدرة تشغيل عالية وهدوء تام لنظام التعليق الهوائي في سيارة ${brandNameAr} ${modelNameAr}. معالج كيميائياً ضد الحرارة.`,
      warrantyAr: "ضمان 6 أشهر",
      statusAr: "متوفر جاهز للشحن",
      oemCode: `OEM-${brandSlug}-${modelSlug}-COMP`,
      iconName: "compressor"
    },
    {
      id: "valve-block",
      nameAr: "موزع صمامات التعليق الهوائي",
      nameEn: "Air Suspension Valve Block",
      descAr: `موزع وصمام تحكم هيدروليكي ذكي لتوزيع ضغط الهواء بدقة متناهية بين جميع الإطارات لسيارة ${brandNameAr} ${modelNameAr} لضمان التوازن المثالي.`,
      warrantyAr: "ضمان 12 شهر",
      statusAr: "متوفر في المستودع",
      oemCode: `OEM-${brandSlug}-${modelSlug}-VAL`,
      iconName: "valve"
    },
    {
      id: "height-sensor",
      nameAr: "حساس ارتفاع مستوى السيارة",
      nameEn: "Ride Height Level Sensor",
      descAr: `حساس إلكتروني فائق الدقة يقيس ارتفاع جسم سيارة ${brandNameAr} ${modelNameAr} باستمرار ويرسل إشارات للتعديل التلقائي لمستوى القيادة.`,
      warrantyAr: "ضمان 12 شهر",
      statusAr: "متوفر جاهز للشحن",
      oemCode: `OEM-${brandSlug}-${modelSlug}-SEN`,
      iconName: "sensor"
    },
    {
      id: "hydraulic-shock",
      nameAr: "مساعد هيدروليكي خلفي نشط",
      nameEn: "Active Rear Hydraulic Shock Absorber",
      descAr: `ممتص صدمات هيدروليكي خلفي نشط يعمل بالتوازي مع نظام التعليق الهوائي لسيارة ${brandNameAr} ${modelNameAr} لتوفير نعومة ركوب استثنائية.`,
      warrantyAr: "ضمان 12 شهر",
      statusAr: "متوفر في المستودع",
      oemCode: `OEM-${brandSlug}-${modelSlug}-RSH`,
      iconName: "shock"
    }
  ];
}
