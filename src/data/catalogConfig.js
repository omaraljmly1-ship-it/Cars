// ============================================================
// Catalog Configuration
// Controls which brands are scanned, slug mappings,
// and part-name translations from Arabic to English
// ============================================================

/**
 * Active brand folders to process from the "Cars Images" directory.
 * Add new brand folder names here to enable auto-import.
 */
export const ACTIVE_BRANDS = ["BMW", "مرسيديس", "Tsla"];

/**
 * Maps folder names → brand slugs used in the website.
 * Supports both Arabic and English folder names.
 */
export const BRAND_SLUG_MAP = {
  BMW: "bmw",
  مرسيديس: "mercedes",
  Tsla: "tesla",
};

/**
 * Display names for each brand slug (Arabic + English).
 */
export const BRAND_DISPLAY_NAMES = {
  bmw: { nameAr: "بي ام دبليو", nameEn: "BMW" },
  mercedes: { nameAr: "مرسيدس بنز", nameEn: "Mercedes-Benz" },
  tesla: { nameAr: "تسلا", nameEn: "Tesla" },
};

/**
 * Arabic part-name → Unified Arabic & English names.
 * The scanner matches filenames (without extension) against these keys.
 * Matching is normalized: trimmed + collapsed whitespace.
 */
export const PART_UNIFICATION = {
  // Front Air Springs
  "جامبين امامي": { nameAr: "جامبين أمامي", nameEn: "Front Air Spring" },
  "جامبين  امامي": { nameAr: "جامبين أمامي", nameEn: "Front Air Spring" },
  "جامبيين امامي": { nameAr: "جامبين أمامي", nameEn: "Front Air Spring" },
  "الجامبين الامامي": { nameAr: "جامبين أمامي", nameEn: "Front Air Spring" },
  "جامبين الامامي": { nameAr: "جامبين أمامي", nameEn: "Front Air Spring" },
  "جامبين امامي ": { nameAr: "جامبين أمامي", nameEn: "Front Air Spring" },
  "جامبيين امامي ": { nameAr: "جامبين أمامي", nameEn: "Front Air Spring" },
  جامبين: { nameAr: "مساعد تعليق هوائي", nameEn: "Air Spring" },

  "جامبينات الاماميه": {
    nameAr: "جامبينات أمامية",
    nameEn: "Front Air Springs",
  },
  "جامبينات اماميه": { nameAr: "جامبينات أمامية", nameEn: "Front Air Springs" },
  "جامبينات الاماميه ": {
    nameAr: "جامبينات أمامية",
    nameEn: "Front Air Springs",
  },
  "جامبينات اماميه ": {
    nameAr: "جامبينات أمامية",
    nameEn: "Front Air Springs",
  },

  // Rear Air Springs
  "جامبين خلفي": { nameAr: "جامبين خلفي", nameEn: "Rear Air Spring" },
  "جامبين  خلفي": { nameAr: "جامبين خلفي", nameEn: "Rear Air Spring" },

  "جامبينات خلفيه": { nameAr: "جامبينات خلفية", nameEn: "Rear Air Springs" },
  "جامبينات الخلفيه": { nameAr: "جامبينات خلفية", nameEn: "Rear Air Springs" },
  "جامبينات  الخلفيه": { nameAr: "جامبينات خلفية", nameEn: "Rear Air Springs" },
  "جامبينات  الخلفيه ": {
    nameAr: "جامبينات خلفية",
    nameEn: "Rear Air Springs",
  },
  "جامبينات  الخلفيه  ": {
    nameAr: "جامبينات خلفية",
    nameEn: "Rear Air Springs",
  },

  // Rear Air Balloons
  "البالون الخلفي": { nameAr: "بالون خلفي", nameEn: "Rear Air Balloon" },
  "بالون خلفي": { nameAr: "بالون خلفي", nameEn: "Rear Air Balloon" },
  "البالون الخلفي ": { nameAr: "بالون خلفي", nameEn: "Rear Air Balloon" },
  "بالون خلفي ": { nameAr: "بالون خلفي", nameEn: "Rear Air Balloon" },

  // Front & Rear Air Springs
  "جامبينات الاماميه و الخلفيه": {
    nameAr: "جامبينات أمامية وخلفية",
    nameEn: "Front & Rear Air Springs",
  },
  "جامبينات اماميه و خلفيه": {
    nameAr: "جامبينات أمامية وخلفية",
    nameEn: "Front & Rear Air Springs",
  },
  "الجامبينات الاماميه و الخلفيه": {
    nameAr: "جامبينات أمامية وخلفية",
    nameEn: "Front & Rear Air Springs",
  },
  "جامبينات الاماميه و الخلفيه ": {
    nameAr: "جامبينات أمامية وخلفية",
    nameEn: "Front & Rear Air Springs",
  },
  "جامبينات اماميه و خلفيه ": {
    nameAr: "جامبينات أمامية وخلفية",
    nameEn: "Front & Rear Air Springs",
  },

  // Compressors
  "كومبرسير رفع": {
    nameAr: "كمبروسر الرفع",
    nameEn: "Air Suspension Compressor",
  },
  "كومبريسر الرفع": {
    nameAr: "كمبروسر الرفع",
    nameEn: "Air Suspension Compressor",
  },
  "كومبيرسر الرفع": {
    nameAr: "كمبروسر الرفع",
    nameEn: "Air Suspension Compressor",
  },
  "كومبريسر الرفع ": {
    nameAr: "كمبروسر الرفع",
    nameEn: "Air Suspension Compressor",
  },
  "كومبيرسر الرفع ": {
    nameAr: "كمبروسر الرفع",
    nameEn: "Air Suspension Compressor",
  },
  "كومبريسر الرفع  ": {
    nameAr: "كمبروسر الرفع",
    nameEn: "Air Suspension Compressor",
  },
  كومبريسر: { nameAr: "كمبروسر الرفع", nameEn: "Air Suspension Compressor" },
  "كومبريسر هواء": { nameAr: "كمبروسر هواء", nameEn: "Air Compressor" },
  "كومبرسير رفع ": {
    nameAr: "كمبروسر الرفع",
    nameEn: "Air Suspension Compressor",
  },

  // Valve Blocks
  "موزع هواء": { nameAr: "موزع هواء", nameEn: "Air Valve Block" },
  "موزع الهواء": { nameAr: "موزع هواء", nameEn: "Air Valve Block" },
  "موزع هواء ": { nameAr: "موزع هواء", nameEn: "Air Valve Block" },
  "موزع الهواء ": { nameAr: "موزع هواء", nameEn: "Air Valve Block" },
  موزع: { nameAr: "موزع هواء", nameEn: "Air Valve Block" },

  // Combined Compressor & Valve Block
  "كومبريسر الرفع و موزع الهواء": {
    nameAr: "كمبروسر الرفع وموزع الهواء",
    nameEn: "Air Compressor & Valve Block",
  },
  "كومبريسر الرفع و موزع الهواء ": {
    nameAr: "كمبروسر الرفع وموزع الهواء",
    nameEn: "Air Compressor & Valve Block",
  },

  // Oil Shock Absorbers
  "جامبين امامي زيت": {
    nameAr: "جامبين زيت أمامي",
    nameEn: "Front Oil Shock Absorber",
  },
  "جامبين زيت امامي": {
    nameAr: "جامبين زيت أمامي",
    nameEn: "Front Oil Shock Absorber",
  },
  "جامبين خلفي زيت": {
    nameAr: "جامبين زيت خلفي",
    nameEn: "Rear Oil Shock Absorber",
  },
  "جامبين زيت خلفي": {
    nameAr: "جامبين زيت خلفي",
    nameEn: "Rear Oil Shock Absorber",
  },
  "جامبين امامي زيت ": {
    nameAr: "جامبين زيت أمامي",
    nameEn: "Front Oil Shock Absorber",
  },
  "جامبين خلفي زيت ": {
    nameAr: "جامبين زيت خلفي",
    nameEn: "Rear Oil Shock Absorber",
  },

  // Hydraulic Shock Absorbers
  "جامبين هايدروليك امامي": {
    nameAr: "جامبين هيدروليك أمامي",
    nameEn: "Front Hydraulic Shock Absorber",
  },
  "جامبين هديروليك امامي": {
    nameAr: "جامبين هيدروليك أمامي",
    nameEn: "Front Hydraulic Shock Absorber",
  },
  "جامبين هيدروليك امامي": {
    nameAr: "جامبين هيدروليك أمامي",
    nameEn: "Front Hydraulic Shock Absorber",
  },

  "جامبين هايدروليك خلفي": {
    nameAr: "جامبين هيدروليك خلفي",
    nameEn: "Rear Hydraulic Shock Absorber",
  },
  "جامبين هديروليك خلفي": {
    nameAr: "جامبين هيدروليك خلفي",
    nameEn: "Rear Hydraulic Shock Absorber",
  },
  "جامبين هيدروليك خلفي": {
    nameAr: "جامبين هيدروليك خلفي",
    nameEn: "Rear Hydraulic Shock Absorber",
  },

  "جامبين هايدروليك امامي وخلفي": {
    nameAr: "جامبين هيدروليك أمامي وخلفي",
    nameEn: "Front & Rear Hydraulic Shock Absorber",
  },
  "جامبين هايدروليك امامي و خلفي": {
    nameAr: "جامبين هيدروليك أمامي وخلفي",
    nameEn: "Front & Rear Hydraulic Shock Absorber",
  },
  "جامبين هديروليك امامي و خلفي": {
    nameAr: "جامبين هيدروليك أمامي وخلفي",
    nameEn: "Front & Rear Hydraulic Shock Absorber",
  },
  "جامبين هيدروليك امامي و خلفي": {
    nameAr: "جامبين هيدروليك أمامي وخلفي",
    nameEn: "Front & Rear Hydraulic Shock Absorber",
  },
  "جامبين هايدروليك امامي وخلفي ": {
    nameAr: "جامبين هيدروليك أمامي وخلفي",
    nameEn: "Front & Rear Hydraulic Shock Absorber",
  },
  "جامبين هايدروليك امامي و خلفي ": {
    nameAr: "جامبين هيدروليك أمامي وخلفي",
    nameEn: "Front & Rear Hydraulic Shock Absorber",
  },

  // Custom Series
  "جامبينات اماميه و خلفيه G05 & X6 G06": {
    nameAr: "جامبينات أمامية وخلفية (G05 / X6 G06)",
    nameEn: "Front & Rear Air Springs (G05 / X6 G06)",
  },
};

/**
 * Backward-compatible mapping of raw Arabic part-name to English translations.
 */
export const PART_NAME_TRANSLATIONS = Object.entries(PART_UNIFICATION).reduce(
  (acc, [key, val]) => {
    acc[key] = val.nameEn;
    return acc;
  },
  {},
);

/**
 * Model name Arabic translations (folder name → display Arabic).
 * If a model folder name matches a key here, use the Arabic value.
 */
export const MODEL_NAME_AR = {
  "S-Class": "الفئة S",
  "E-Class": "الفئة E",
  "C-Class": "الفئة C",
  "CLS-Class": "الفئة CLS",
  "GLE & ML": "GLE و ML",
  "GLE-Cope": "GLE كوبيه",
  "BMW 7 Series": "الفئة 7",
  X5: "X5",
  X6: "X6",
  X3: "X3",
  "3 Series": "الفئة 3",
  "5 Series": "الفئة 5",
};

/**
 * Supported image file extensions (lowercase).
 */
export const SUPPORTED_EXTENSIONS = [".jpeg", ".jpg", ".png", ".webp", ".gif"];

/**
 * Source directory for car images.
 * Can be overridden via CAR_IMAGES_SOURCE_DIR environment variable.
 */
export const SOURCE_DIR =
  process.env.CAR_IMAGES_SOURCE_DIR || "C:\\Users\\HP\\Desktop\\Cars Images";

/**
 * Output directory for copied catalog images (relative to project root).
 */
export const CATALOG_OUTPUT_DIR = "public/catalog";

/**
 * Catalog JSON output path (relative to project root).
 */
export const CATALOG_JSON_PATH = "data/catalog.json";

/**
 * Import log path (relative to project root).
 */
export const IMPORT_LOG_PATH = "data/catalog-import-log.json";
