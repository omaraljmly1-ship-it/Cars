# AQ - قطع غيار السيارات الأوروبية الفاخرة 🚗✨

[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=F024B6)](https://www.framer.com/motion/)

موقع إلكتروني فاخر لبيع قطع غيار السيارات الأوروبية الفاخرة، متخصص بشكل خاص في **أنظمة التعليق الهوائي** لرينج روفر، مرسيدس، بي إم دبليو، أودي، وبنتلي في دولة الإمارات العربية المتحدة. تم بناء الموقع بأحدث التقنيات ليوفر تجربة مستخدم سريعة، تفاعلية، وراقية تليق بالعملاء المهتمين بالسيارات الفاخرة.

A premium, high-performance Next.js web application showcasing and retailing luxury European car parts, specializing in **Air Suspension Systems** (أنظمة التعليق الهوائي) for prestigious brands such as Range Rover, Mercedes-Benz, BMW, Audi, and Bentley in the UAE.

---

## ✨ المميزات الرئيسية / Key Features

- **🎨 تصميم فاخر وجذاب (Premium UI/UX)**: واجهة مستخدم داكنة وعصرية (Dark Mode) تعتمد على تدرجات الألوان المتناسقة وتأثيرات الزجاج (Glassmorphism).
- **📱 متجاوب تماماً (Fully Responsive)**: متوافق مع كافة مقاسات الشاشات (الهواتف، الأجهزة اللوحية، أجهزة الكمبيوتر).
- **⚡ أداء فائق وسرعة عالية (High Performance)**: مبني على Next.js 16 و React 19 مع تحسينات ممتازة في الأداء والأرشفة (SEO).
- **🌐 دعم كامل للغة العربية والاتجاه من اليمين لليسار (RTL Support)**: الخط الافتراضي للموقع هو خط **Cairo** المتميز من Google Fonts.
- **✨ حركات تفاعلية (Dynamic Animations)**: تأثيرات حركية سلسة للغاية وخلفيات عائمة تعتمد على **Framer Motion**.
- **🧭 تصفح تفاعلي للمنتجات (Interactive Sliders)**: معرض منتجات وعلامات تجارية تفاعلي يعتمد على **Swiper.js**.

---

## 🛠️ التكنولوجيا المستخدمة / Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Slider/Carousel:** [Swiper.js](https://swiperjs.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** [Google Fonts (Cairo)](https://fonts.google.com/specimen/Cairo)

---

## 📂 هيكلية المشروع / Project Structure

```bash
Car/
├── app/                  # صفحات وإعدادات تطبيق Next.js
│   ├── assets/           # الصور والملفات الميديا الثابتة
│   ├── globals.css       # الأنماط والتنسيقات العامة
│   ├── layout.jsx        # الهيكل الرئيسي للتطبيق (Root Layout & Font)
│   └── page.jsx          # الصفحة الرئيسية المجمعة لكافة الأقسام
├── components/           # المكونات البرمجية المشتركة وقابلة لإعادة الاستخدام
│   ├── FloatingIconsBackground.jsx # خلفية الأيقونات العائمة
│   ├── TopBar.jsx        # الشريط العلوي (أوقات العمل والاتصال)
│   ├── Navbar.jsx        # شريط التنقل الرئيسي المتجاوب
│   ├── SectionHeading.jsx # عنوان الأقسام الموحد والجميل
│   └── Footer.jsx        # التذييل ومعلومات التواصل والشبكات الاجتماعية
├── sections/             # الأقسام الرئيسية للصفحة الأولى
│   ├── HeroSection.jsx   # القسم الترحيبي والعرض التشويقي الأول
│   ├── BrandsSection.jsx # الماركات العالمية المدعومة (Range Rover, etc.)
│   ├── AboutSection.jsx  # من نحن ومميزات الخدمة لدينا
│   ├── ProductsSection.jsx # المنتجات وقطع الغيار المتاحة
│   ├── StatsSection.jsx  # إحصائيات وأرقام عن الشركة للثقة
│   ├── FeaturesStrip.jsx # شريط الميزات السريعة (توصيل، ضمان، إلخ)
│   └── LocationSection.jsx # الخريطة التفاعلية وتفاصيل الموقع الجغرافي
└── package.json          # الملفات التابعة وإعدادات التثبيت والتشغيل
```

---

## 🚀 التشغيل والتطوير المحلي / Getting Started

لتشغيل المشروع محلياً على جهازك، يرجى اتباع الخطوات التالية:

### المتطلبات المسبقة (Prerequisites)
تأكد من تثبيت **Node.js** (الإصدار 18 فما فوق مستحسن) و **npm** أو **yarn**.

### 1. تثبيت الحزم البرمجية (Install Dependencies)
قم بفتح الطرفية (Terminal) في مجلد المشروع وقم بتشغيل الأمر التالي:
```bash
npm install
```

### 2. تشغيل سيرفر التطوير المحلي (Run Development Server)
لتشغيل المشروع في بيئة التطوير المحلية:
```bash
npm run dev
```
افتح الرابط التالي في المتصفح لرؤية الموقع: [http://localhost:3000](http://localhost:3000).

### 3. بناء النسخة الإنتاجية (Build for Production)
لبناء نسخة محسنة وجاهزة للنشر والإنتاج:
```bash
npm run build
```

---

## 📞 تواصل معنا / Contact Information
- **العنوان:** دبي، الإمارات العربية المتحدة.
- **الاختصاص:** أنظمة التعليق الهوائي الفاخرة للسيارات الأوروبية.
