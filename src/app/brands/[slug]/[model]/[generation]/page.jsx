import { notFound } from "next/navigation";
import { getBrandBySlug } from "@/data/brandsData";
import { getCatalogBrand, getCatalogModels, getCatalogParts } from "@/data/catalogData";
import GenerationPageContent from "@/components/brand/GenerationPageContent";

// Generate static params for all catalog brand + model + generation combinations
export async function generateStaticParams() {
  const params = [];

  // Import full catalog and generate params for ALL brands
  const { getCatalog } = await import("@/data/catalogData");
  const catalog = getCatalog();
  const allBrandSlugs = Object.keys(catalog.brands || {});

  for (const slug of allBrandSlugs) {
    const models = getCatalogModels(slug);
    if (models) {
      for (const [modelSlug, model] of Object.entries(models)) {
        if (model.generations) {
          for (const genSlug of Object.keys(model.generations)) {
            params.push({
              slug: slug,
              model: modelSlug,
              generation: genSlug,
            });
          }
        }
      }
    }
  }

  return params;
}

// Generate SEO Metadata
export async function generateMetadata({ params }) {
  const { slug, model: modelSlug, generation: genSlug } = await params;
  const brand = getBrandBySlug(slug);
  const brandCatalog = getCatalogBrand(slug);
  if (!brand || !brandCatalog) return { title: "العلامة التجارية غير موجودة" };

  const model = brandCatalog.models[modelSlug];
  if (!model) return { title: "الموديل غير موجود" };

  const generation =
    model.generations[genSlug] ||
    Object.values(model.generations || {}).find((g) => g.slug === genSlug);
  if (!generation) return { title: "الهيكل غير موجود" };

  const brandNameAr = brandCatalog.nameAr || brand.nameAr;
  const brandNameEn = brandCatalog.nameEn || brand.nameEn;
  const modelNameAr = model.nameAr || "الموديل";
  const modelNameEn = model.nameEn || "Model";

  return {
    title: `قطع غيار ${brandNameAr} ${modelNameAr} ${generation.code} الأصلية | AQ`,
    description: `كتالوج صور قطع غيار ${brandNameAr} ${modelNameAr} هيكل ${generation.code} (${generation.years || ""}). مساعدين تعليق هوائي، بالونات، صمامات، وكمبروسرات مستوردة.`,
    keywords: [
      `قطع غيار ${brandNameAr} ${generation.code}`,
      `${brandNameEn} ${generation.code} spare parts`,
      `مساعدين ${generation.code}`,
      `بالون خلفي ${generation.code}`,
      `كمبروسر هواء ${generation.code}`,
    ],
  };
}

export default async function GenerationPage({ params }) {
  const { slug, model: modelSlug, generation: genSlug } = await params;
  const brand = getBrandBySlug(slug);
  const brandCatalog = getCatalogBrand(slug);

  if (!brand || !brandCatalog) {
    notFound();
  }

  const model = brandCatalog.models[modelSlug];
  if (!model) {
    notFound();
  }

  const brandNameAr = brandCatalog.nameAr || brand.nameAr;
  const brandNameEn = brandCatalog.nameEn || brand.nameEn;
  const modelNameAr = model.nameAr || modelSlug;
  const modelNameEn = model.nameEn || modelSlug;

  // Look up generation by key first, then fall back to matching slug field
  const generation =
    model.generations[genSlug] ||
    Object.values(model.generations || {}).find((g) => g.slug === genSlug);
  if (!generation) {
    notFound();
  }

  // Find the actual object key for this generation (needed for getCatalogParts)
  const actualGenKey =
    Object.keys(model.generations || {}).find(
      (k) => model.generations[k] === generation
    ) || genSlug;

  const parts = getCatalogParts(slug, modelSlug, actualGenKey);

  return (
    <GenerationPageContent
      brand={brand}
      brandCatalog={brandCatalog}
      model={model}
      generation={generation}
      parts={parts}
      slug={slug}
      modelSlug={modelSlug}
    />
  );
}
