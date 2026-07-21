import fs from "fs";
import path from "path";

const root = path.join(
  process.cwd(),
  "src/app/assets/images/Cars Images",
);
const catalog = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "src/data/catalog.json"), "utf8"),
);
const exts = new Set([".jpeg", ".jpg", ".png", ".webp", ".gif"]);

function norm(s) {
  return s.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, "").toLowerCase();
}

function walk(dir, base = dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, acc);
    else if (
      exts.has(path.extname(entry.name).toLowerCase()) &&
      !entry.name.includes("شعار")
    )
      acc.push(path.relative(base, full));
  }
  return acc;
}

const files = walk(root);
const fileByNorm = new Map();
for (const f of files) {
  const n = norm(path.basename(f));
  if (!fileByNorm.has(n)) fileByNorm.set(n, []);
  fileByNorm.get(n).push(f);
}

let ok = 0;
let miss = 0;

for (const b of Object.values(catalog.brands)) {
  for (const m of Object.values(b.models || {})) {
    for (const g of Object.values(m.generations || {})) {
      for (const p of g.parts || []) {
        const expected = [b.folderName, m.folderName, g.folderName, p.originalFile].join("/");
        const exact = files.find((f) => norm(f) === norm(expected));
        if (exact) {
          ok++;
          continue;
        }
        const bn = norm(p.originalFile);
        const cands = fileByNorm.get(bn) || [];
        const brandNorm = norm(b.folderName);
        const filtered = cands.filter((f) => norm(f).startsWith(brandNorm));
        if (filtered.length === 1) {
          console.log(`FIX|${b.slug}|${m.slug}|${g.slug}|${p.originalFile}|${filtered[0]}`);
        } else if (filtered.length > 1) {
          console.log(`MULTI|${b.slug}|${p.originalFile}|${filtered.join(" ;; ")}`);
        } else {
          console.log(`MISS|${b.slug}|${expected}|cands=${cands.length}`);
          miss++;
        }
      }
    }
  }
}

console.log(`OK ${ok} MISS ${miss} FILES ${files.length}`);
