import fs from "fs";
import path from "path";

const projectRoot = process.cwd();
const srcPath = path.join(projectRoot, "src");
const sourceRoot = path.join(srcPath, "app", "assets", "images", "Cars Images");
const catalogJsonPath = path.join(srcPath, "data", "catalog.json");

const IMAGE_EXT = new Set([".jpeg", ".jpg", ".png", ".webp", ".gif"]);

function normalizeStr(s) {
  return s.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, "").toLowerCase();
}

function isImageFile(name) {
  return IMAGE_EXT.has(path.extname(name).toLowerCase()) && !name.includes("شعار");
}

function findDirMatch(parentDir, targetName) {
  if (!fs.existsSync(parentDir)) return null;
  const target = normalizeStr(targetName);
  const dirs = fs.readdirSync(parentDir, { withFileTypes: true }).filter((d) => d.isDirectory());

  for (const d of dirs) {
    if (normalizeStr(d.name) === target) return d.name;
  }
  for (const d of dirs) {
    const dn = normalizeStr(d.name);
    if (dn.includes(target) || target.includes(dn)) return d.name;
  }
  return null;
}

function findFileMatch(dir, targetName) {
  if (!fs.existsSync(dir)) return null;
  const target = normalizeStr(targetName);
  const files = fs.readdirSync(dir).filter(isImageFile);
  for (const f of files) {
    if (normalizeStr(f) === target) return f;
  }
  return null;
}

function resolvePartPath(brandFolder, modelFolder, genFolder, originalFile) {
  const brandMatch = findDirMatch(sourceRoot, brandFolder);
  if (!brandMatch) return null;

  const brandDir = path.join(sourceRoot, brandMatch);
  const modelMatch = findDirMatch(brandDir, modelFolder);
  if (!modelMatch) return null;

  const modelDir = path.join(brandDir, modelMatch);
  const genMatch = findDirMatch(modelDir, genFolder);
  if (!genMatch) return null;

  const genDir = path.join(modelDir, genMatch);
  const fileMatch = findFileMatch(genDir, originalFile);
  if (!fileMatch) return null;

  return {
    brandFolder: brandMatch,
    modelFolder: modelMatch,
    genFolder: genMatch,
    originalFile: fileMatch,
  };
}

function resolveTwoLevel(brandFolder, folderName, originalFile) {
  const brandMatch = findDirMatch(sourceRoot, brandFolder);
  if (!brandMatch) return null;

  const brandDir = path.join(sourceRoot, brandMatch);
  const folderMatch = findDirMatch(brandDir, folderName);
  if (!folderMatch) return null;

  const folderDir = path.join(brandDir, folderMatch);
  const fileMatch = findFileMatch(folderDir, originalFile);
  if (!fileMatch) return null;

  return {
    brandFolder: brandMatch,
    modelFolder: folderMatch,
    genFolder: folderMatch,
    originalFile: fileMatch,
  };
}

function resolveOneLevel(brandFolder, originalFile) {
  const brandMatch = findDirMatch(sourceRoot, brandFolder);
  if (!brandMatch) return null;

  const brandDir = path.join(sourceRoot, brandMatch);
  const fileMatch = findFileMatch(brandDir, originalFile);
  if (!fileMatch) return null;

  return null;
}

function walkImages(dir, base = dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkImages(full, base, acc);
    else if (isImageFile(entry.name)) acc.push(path.relative(base, full));
  }
  return acc;
}

const catalog = JSON.parse(fs.readFileSync(catalogJsonPath, "utf8"));
let fixed = 0;
let stillMissing = [];

for (const brand of Object.values(catalog.brands)) {
  for (const model of Object.values(brand.models || {})) {
    for (const gen of Object.values(model.generations || {})) {
      for (const part of gen.parts || []) {
        if (!part.originalFile) continue;

        let resolved =
          resolvePartPath(brand.folderName, model.folderName, gen.folderName, part.originalFile) ||
          resolveTwoLevel(brand.folderName, model.folderName, part.originalFile) ||
          resolveTwoLevel(brand.folderName, gen.folderName, part.originalFile);

        if (!resolved) {
          const brandMatch = findDirMatch(sourceRoot, brand.folderName);
          if (brandMatch) {
            const brandDir = path.join(sourceRoot, brandMatch);
            const modelMatch = findDirMatch(brandDir, model.folderName);
            if (modelMatch) {
              const modelDir = path.join(brandDir, modelMatch);
              const genMatch = findDirMatch(modelDir, gen.folderName);
              const searchDir = genMatch ? path.join(modelDir, genMatch) : modelDir;
              const files = fs.existsSync(searchDir)
                ? fs.readdirSync(searchDir).filter(isImageFile)
                : [];

              if (files.length === 1) {
                resolved = {
                  brandFolder: brandMatch,
                  modelFolder: modelMatch,
                  genFolder: genMatch || modelMatch,
                  originalFile: files[0],
                };
              } else if (files.length > 1) {
                const bySlug = files.find((f) =>
                  normalizeStr(f).includes(normalizeStr(part.slug || "")),
                );
                if (bySlug) {
                  resolved = {
                    brandFolder: brandMatch,
                    modelFolder: modelMatch,
                    genFolder: genMatch || modelMatch,
                    originalFile: bySlug,
                  };
                }
              }
            }
          }
        }

        if (resolved) {
          let changed = false;
          if (brand.folderName !== resolved.brandFolder) {
            brand.folderName = resolved.brandFolder;
            changed = true;
          }
          if (model.folderName !== resolved.modelFolder) {
            model.folderName = resolved.modelFolder;
            changed = true;
          }
          if (gen.folderName !== resolved.genFolder) {
            gen.folderName = resolved.genFolder;
            changed = true;
          }
          if (part.originalFile !== resolved.originalFile) {
            part.originalFile = resolved.originalFile;
            changed = true;
          }
          if (changed) fixed++;
        } else {
          stillMissing.push({
            brand: brand.slug,
            model: model.slug,
            gen: gen.slug,
            file: part.originalFile,
            partId: part.id,
          });
        }
      }
    }
  }
}

// Manual filename mappings for parts with English/wrong names in catalog
const filenameFixes = {
  "air pump.jpeg": "كومبريسر رفع.jpeg",
  "valve-block.jpeg": "موزع هواء.jpeg",
  "value-block.jpeg": "موزع هواء.jpeg",
  "كتلة صمامات.jpeg": "موزع الهواء.jpeg",
  "كتلة صمام الهواء.jpeg": "موزع هواء.jpeg",
  "front-rear-air-springs.jpeg": "جامبين امامي.jpeg",
  "front-air-spring.jpeg": "جامبين مامي.jpeg",
  "compressor.jpeg": "موزع الهواء وكومبرسور رفع  .jpeg",
  "موزع هواء و صmامات.jpeg": "موزع الهواء وكومبرسور رفع  .jpeg",
  "تعليق هوائي.jpeg": "كومبرسور رفع .jpeg",
  "جامبينات  الخلفيه .jpeg": "جامبينات  الخلفيه .jpeg",
};

for (const brand of Object.values(catalog.brands)) {
  for (const model of Object.values(brand.models || {})) {
    for (const gen of Object.values(model.generations || {})) {
      for (const part of gen.parts || []) {
        const fix = filenameFixes[part.originalFile];
        if (!fix) continue;

        const resolved =
          resolvePartPath(brand.folderName, model.folderName, gen.folderName, fix) ||
          resolveTwoLevel(brand.folderName, model.folderName, fix) ||
          resolveTwoLevel(brand.folderName, gen.folderName, fix);

        if (resolved) {
          brand.folderName = resolved.brandFolder;
          model.folderName = resolved.modelFolder;
          gen.folderName = resolved.genFolder;
          part.originalFile = resolved.originalFile;
          fixed++;
          stillMissing = stillMissing.filter((m) => m.partId !== part.id);
        }
      }
    }
  }
}

// Fix known structural issues
const structuralFixes = [
  { brand: "bmw", model: "bmw-7-series", gen: "e65-e66-2001-2008", genFolder: "E65 & E66 (2001 - 2008)" },
  { brand: "bmw", model: "bmw-7-series", gen: "f01-f02-2008-2015", genFolder: "F01 & F02 (2008 - 2015)" },
  { brand: "bmw", model: "bmw-7-series", gen: "g11-g12-2016-2020", genFolder: "G11 & G12 (2016 -2020)" },
  { brand: "bmw", model: "x5", gen: "g05-2019-2022", genFolder: "G05 (2019 - 2022)", file: "جامبينات اماميه و خلفيه G05 & X6 G06.jpeg" },
  { brand: "mercedes", model: "gle-ml", modelFolder: "GLE & ML" },
  { brand: "mercedes", model: "gle-ml", gen: "w164-ml-2005-2011", genFolder: "W164 ML ( 2005 - 2011)" },
  { brand: "mercedes", model: "gle-ml", gen: "w166-mlgle-2011-2019", genFolder: "W166 ML&GLE ( 2011 - 2019 )" },
  { brand: "mercedes", model: "gle-ml", gen: "w167-gle-2019-2025", genFolder: "W167 GLE (2019 - 2025 )" },
  { brand: "mercedes", model: "s-class", gen: "w221-2006-2013", file: "موزع هواء.jpeg", oldFile: "كتلة صmام الهواء.jpeg" },
  { brand: "range-rover", model: "range-rover-sport-vogue", modelFolder: "Range Rover Sport & Vogue" },
  { brand: "range-rover", model: "range-rover-l460-l461", modelFolder: "Range Rover L460 L461 (2020- 2025)" },
  { brand: "rolls-royce", model: "ghost", gen: "all", genFolder: "Ghost", modelFolder: "Ghost" },
  { brand: "rolls-royce", model: "phantom", modelFolder: "Phantom", gen: "phantom-2003-2016", genFolder: "Phantom (2003 - 2016)", file: "موزع الهواء.jpeg", oldFile: "كتلة صmامات.jpeg" },
  { brand: "rolls-royce", model: "phantom", gen: "rr11-2016-2021", genFolder: "RR11 (2016 - 2021)" },
  { brand: "rolls-royce", model: "phantom", gen: "rr11-2003-2016", genFolder: "RR11 (2003 - 2016)" },
  { brand: "tesla", model: "model-x", modelFolder: "Tesla Model X (2015 - 2018)", genFolder: "Tesla Model X (2015 - 2018)" },
  { brand: "dodge", model: "dodge-ram-2011-2018", genFolder: "DODGE RAM (2011 - 2018)", file: "موزع الهواء وكومبرسور رفع  .jpeg", oldFile: "موزع هواء و صmامات.jpeg" },
];

for (const fix of structuralFixes) {
  const brand = catalog.brands[fix.brand];
  if (!brand) continue;
  const model = brand.models?.[fix.model];
  if (fix.modelFolder && model) model.folderName = fix.modelFolder;
  const gen = model?.generations?.[fix.gen];
  if (fix.genFolder && gen) gen.folderName = fix.genFolder;
  if (fix.file && gen) {
    for (const part of gen.parts || []) {
      if (!fix.oldFile || part.originalFile === fix.oldFile) {
        part.originalFile = fix.file;
        fixed++;
      }
    }
  }
}

// Re-run resolution after structural fixes
stillMissing = [];
for (const brand of Object.values(catalog.brands)) {
  for (const model of Object.values(brand.models || {})) {
    for (const gen of Object.values(model.generations || {})) {
      for (const part of gen.parts || []) {
        const resolved = resolvePartPath(
          brand.folderName,
          model.folderName,
          gen.folderName,
          part.originalFile,
        );
        if (!resolved) {
          stillMissing.push(`${brand.slug}/${model.slug}/${gen.slug}/${part.originalFile}`);
        }
      }
    }
  }
}

catalog.lastUpdated = new Date().toISOString();
fs.writeFileSync(catalogJsonPath, JSON.stringify(catalog, null, 2));

console.log(`Fixed ${fixed} entries.`);
console.log(`Still missing after fix: ${stillMissing.length}`);
for (const m of stillMissing) console.warn(`  - ${m}`);
