import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const srcPath = path.join(projectRoot, 'src');
const sourceRoot = path.join(srcPath, 'app', 'assets', 'images', 'Cars Images');
const catalogJsonPath = path.join(srcPath, 'data', 'catalog.json');
const publicDir = path.join(projectRoot, 'public');

const catalog = JSON.parse(fs.readFileSync(catalogJsonPath, 'utf8'));

// Helper to normalize strings for comparison
function normalizeStr(s) {
  return s.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '').toLowerCase();
}

// Build existing files map
const mappedFiles = new Set();
for (const brand of Object.values(catalog.brands)) {
  if (!brand.models) continue;
  for (const model of Object.values(brand.models)) {
    if (!model.generations) continue;
    for (const gen of Object.values(model.generations)) {
      if (!gen.parts) continue;
      for (const part of gen.parts) {
        if (part.originalFile) {
          const expectedPathStr = [brand.folderName, model.folderName, gen.folderName, part.originalFile].join('');
          mappedFiles.add(normalizeStr(expectedPathStr));
        }
      }
    }
  }
}

// Helpers
function createSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const brandMappings = {
  'audi': { slug: 'audi', nameAr: 'أودي', nameEn: 'Audi' },
  'bentley': { slug: 'bentley', nameAr: 'بنتلي', nameEn: 'Bentley' },
  'bmw': { slug: 'bmw', nameAr: 'بي ام دبليو', nameEn: 'BMW' },
  'doog ram': { slug: 'dodge-ram', nameAr: 'دودج رام', nameEn: 'Dodge RAM' },
  'hyundai': { slug: 'hyundai', nameAr: 'هيونداي', nameEn: 'Hyundai' },
  'jaguar': { slug: 'jaguar', nameAr: 'جاكوار', nameEn: 'Jaguar' },
  'jeep': { slug: 'jeep', nameAr: 'جيب', nameEn: 'Jeep' },
  'lamborghini': { slug: 'lamborghini', nameAr: 'لامبورغيني', nameEn: 'Lamborghini' },
  'porsche': { slug: 'porsche', nameAr: 'بورش', nameEn: 'Porsche' },
  'range rover': { slug: 'range-rover', nameAr: 'رنج روفر', nameEn: 'Range Rover' },
  'rolls royce': { slug: 'rolls-royce', nameAr: 'رولز رويس', nameEn: 'Rolls-Royce' },
  'tsla': { slug: 'tesla', nameAr: 'تسلا', nameEn: 'Tesla' },
  'مرسيديس': { slug: 'mercedes', nameAr: 'مرسيدس بنز', nameEn: 'Mercedes-Benz' }
};

const partTranslations = [
  { ar: 'جامبين امامي و خلفي', en: 'Front & Rear Shock Absorbers', slug: 'front-rear-shock-absorbers' },
  { ar: 'جامبينات الاماميه و الخلفيه', en: 'Front & Rear Air Springs', slug: 'front-rear-air-springs' },
  { ar: 'جامبينات اماميه و خلفيه', en: 'Front & Rear Air Springs', slug: 'front-rear-air-springs' },
  { ar: 'كومبريسر رفع', en: 'Air Suspension Compressor', slug: 'air-suspension-compressor' },
  { ar: 'كومبرسور رفع', en: 'Air Suspension Compressor', slug: 'air-suspension-compressor' },
  { ar: 'كومبرسير رفع', en: 'Air Suspension Compressor', slug: 'air-suspension-compressor' },
  { ar: 'موزع الهواء وكومبرسور رفع', en: 'Air Valve Block & Compressor', slug: 'air-valve-block-compressor' },
  { ar: 'كومبريسر الرفع و موزع الهواء', en: 'Air Compressor & Valve Block', slug: 'air-compressor-valve-block' },
  { ar: 'موزع الهواء', en: 'Air Valve Block', slug: 'air-valve-block' },
  { ar: 'موزع هواء', en: 'Air Valve Block', slug: 'air-valve-block' },
  { ar: 'نظام تعليق هوئي', en: 'Air Suspension System', slug: 'air-suspension-system' },
  { ar: 'بالون خلفي', en: 'Rear Air Balloon', slug: 'rear-air-balloon' },
  { ar: 'جامبينات خلفيه', en: 'Rear Air Springs', slug: 'rear-air-springs' },
  { ar: 'جامبين امامي', en: 'Front Shock Absorber', slug: 'front-shock-absorber' },
  { ar: 'جامبين مامي', en: 'Front Shock Absorber', slug: 'front-shock-absorber' },
  { ar: 'جامبينات الاماميه', en: 'Front Air Springs', slug: 'front-air-springs' },
  { ar: 'جامبين خلفي', en: 'Rear Shock Absorber', slug: 'rear-shock-absorber' },
  { ar: 'جامبين امامي و بالون خلفي', en: 'Front Shock & Rear Balloon', slug: 'front-shock-rear-balloon' },
  { ar: 'جامبين هايدروليك امامي وخلفي', en: 'Front & Rear Hydraulic Shock Absorber', slug: 'front-rear-hydraulic-shock-absorber' }
];

function translatePart(filename) {
  const nameBase = filename.replace(/\.[^/.]+$/, "").trim(); // remove extension
  let normalizedName = nameBase.replace(/\s+/g, ' ').trim();
  
  for (const trans of partTranslations) {
    if (normalizedName.includes(trans.ar)) {
      // Keep any extra tags like G05 & X6
      const extra = normalizedName.replace(trans.ar, '').trim();
      if (extra) {
         return {
           nameAr: normalizedName,
           nameEn: `${trans.en} ${extra}`,
           slug: `${trans.slug}-${createSlug(extra)}`
         };
      }
      return {
        nameAr: trans.ar,
        nameEn: trans.en,
        slug: trans.slug
      };
    }
  }
  
  // fallback
  return {
    nameAr: normalizedName,
    nameEn: 'Car Part',
    slug: 'car-part'
  };
}

function walkSync(dir, filelist = [], baseDir = dir) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walkSync(filepath, filelist, baseDir);
    } else {
      filelist.push(path.relative(baseDir, filepath));
    }
  });
  return filelist;
}

const allFiles = walkSync(sourceRoot);
let addedCount = 0;

for (const file of allFiles) {
  // Ignore logos for catalog (will handle separately or manually)
  if (file.toLowerCase().includes('شعار')) continue;

  const normalizedFile = normalizeStr(file);
  let isMapped = false;
  for (const mapped of mappedFiles) {
    if (normalizedFile.endsWith(mapped) || mapped.endsWith(normalizedFile)) {
      isMapped = true;
      break;
    }
  }

  if (!isMapped) {
    const parts = file.split(path.sep);
    if (parts.length < 4) {
      // It might be Brand/Model/part.jpeg
      if (parts.length === 3) {
         // insert a fake generation
         parts.splice(2, 0, 'all-generations');
      } else {
         console.warn("Skipping unstructured file:", file);
         continue;
      }
    }
    
    let brandFolder = parts[0];
    let modelFolder = parts[1];
    let genFolder = parts[2];
    let filename = parts[3];

    // Find or create brand
    const brandMap = brandMappings[brandFolder.toLowerCase()] || { slug: createSlug(brandFolder), nameAr: brandFolder, nameEn: brandFolder };
    const brandSlug = brandMap.slug;
    
    if (!catalog.brands[brandSlug]) {
      catalog.brands[brandSlug] = {
        slug: brandSlug,
        nameAr: brandMap.nameAr,
        nameEn: brandMap.nameEn,
        folderName: brandFolder,
        models: {}
      };
    }
    const b = catalog.brands[brandSlug];
    if (!b.models) b.models = {};

    // Find or create model
    const modelSlug = createSlug(modelFolder);
    if (!b.models[modelSlug]) {
      b.models[modelSlug] = {
        slug: modelSlug,
        nameAr: modelFolder,
        nameEn: modelFolder,
        folderName: modelFolder,
        generations: {}
      };
    }
    const m = b.models[modelSlug];
    if (!m.generations) m.generations = {};

    // Find or create gen
    const genSlug = createSlug(genFolder);
    if (!m.generations[genSlug]) {
      m.generations[genSlug] = {
        slug: genSlug,
        nameAr: genFolder,
        nameEn: genFolder,
        folderName: genFolder,
        parts: []
      };
    }
    const g = m.generations[genSlug];
    if (!g.parts) g.parts = [];

    // Create part
    const trans = translatePart(filename);
    const partId = `${brandSlug}-${modelSlug}-${genSlug}-${trans.slug}`;
    const ext = path.extname(filename).toLowerCase();
    
    // Check if part with same id exists (very rare for new images but possible if multiple images per part)
    let finalPartId = partId;
    let counter = 1;
    while(g.parts.find(p => p.id === finalPartId)) {
        finalPartId = `${partId}-${counter}`;
        counter++;
    }

    const imagePath = `/catalog/${brandSlug}/${modelSlug}/${genSlug}/${finalPartId.replace(brandSlug+'-'+modelSlug+'-'+genSlug+'-', '')}${ext}`;

    const newPart = {
      id: finalPartId,
      nameAr: trans.nameAr,
      nameEn: trans.nameEn,
      slug: finalPartId.replace(`${brandSlug}-${modelSlug}-${genSlug}-`, ''),
      image: imagePath,
      altAr: `${trans.nameAr} - ${b.nameAr} ${m.nameAr}`,
      altEn: `${trans.nameEn} for ${b.nameEn} ${m.nameEn}`,
      originalFile: filename
    };

    g.parts.push(newPart);

    // Copy file
    const srcFile = path.join(sourceRoot, file);
    const destFile = path.join(publicDir, imagePath);
    const destDir = path.dirname(destFile);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(srcFile, destFile);
    
    console.log(`Added & Copied: ${filename} -> ${imagePath}`);
    addedCount++;
  }
}

catalog.lastUpdated = new Date().toISOString();
fs.writeFileSync(catalogJsonPath, JSON.stringify(catalog, null, 2));

console.log(`Successfully added ${addedCount} new parts to the catalog and copied images.`);
