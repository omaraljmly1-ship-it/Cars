import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const hasSrcDir = fs.existsSync(path.join(projectRoot, 'src'));
const srcPath = hasSrcDir ? path.join(projectRoot, 'src') : projectRoot;

const sourceRoot = path.join(srcPath, 'app', 'assets', 'images', 'Cars Images');
const catalogJsonPath = path.join(srcPath, 'data', 'catalog.json');
const publicDir = path.join(projectRoot, 'public');

if (!fs.existsSync(catalogJsonPath)) {
  console.error('catalog.json not found!');
  process.exit(1);
}

const catalog = JSON.parse(fs.readFileSync(catalogJsonPath, 'utf8'));
let copyCount = 0;
let missingCount = 0;

function findFileRobust(baseDir, relativePathParts) {
  let currentDir = baseDir;
  for (const part of relativePathParts) {
    if (!fs.existsSync(currentDir)) return null;
    
    const items = fs.readdirSync(currentDir);
    const matched = items.find(item => {
      return item.trim().toLowerCase() === part.trim().toLowerCase();
    });
    
    if (matched) {
      currentDir = path.join(currentDir, matched);
    } else {
      return null;
    }
  }
  return currentDir;
}

console.log('Starting catalog image copy...');

for (const [brandSlug, brand] of Object.entries(catalog.brands)) {
  const brandFolder = brand.folderName;
  if (!brand.models) continue;

  for (const [modelSlug, model] of Object.entries(brand.models)) {
    const modelFolder = model.folderName;
    if (!model.generations) continue;

    for (const [genSlug, gen] of Object.entries(model.generations)) {
      const genFolder = gen.folderName;
      if (!gen.parts) continue;

      for (const part of gen.parts) {
        if (!part.originalFile || !part.image) continue;

        // Try to find the file robustly
        const srcPath = findFileRobust(sourceRoot, [brandFolder, modelFolder, genFolder, part.originalFile]);
        const destPath = path.join(publicDir, part.image.replace(/^\//, ''));

        if (srcPath && fs.existsSync(srcPath)) {
          const destDir = path.dirname(destPath);
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }
          fs.copyFileSync(srcPath, destPath);
          console.log(`Copied: ${srcPath} -> ${destPath}`);
          copyCount++;
        } else {
          const expectedPath = path.join(sourceRoot, brandFolder, modelFolder, genFolder, part.originalFile);
          console.warn(`File not found: ${expectedPath}`);
          missingCount++;
        }
      }
    }
  }
}

console.log(`\nCopy complete.`);
console.log(`Copied images: ${copyCount}`);
console.log(`Missing images: ${missingCount}`);
