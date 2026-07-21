import { notFound } from "next/navigation";
import { getBrandBySlug } from "@/data/brandsData";
import {
  getCatalogBrand,
  getCatalogModels,
  getCatalogGenerations,
} from "@/data/catalogData";
import ModelPageContent from "@/components/brand/ModelPageContent";

// Generate static params for all catalog brand + model slug combinations
export async function generateStaticParams() {
  const params = [];

  // Import the full catalog and generate params for ALL brands
  const { getCatalog } = await import("@/data/catalogData");
  const catalog = getCatalog();
  const allBrandSlugs = Object.keys(catalog.brands || {});

  for (const slug of allBrandSlugs) {
    const models = getCatalogModels(slug);
    if (models) {
      for (const modelSlug of Object.keys(models)) {
        params.push({
          slug: slug,
          model: modelSlug,
        });
      }
    }
  }
  return params;
}

// Generate SEO Metadata
export async function generateMetadata({ params }) {
  const { slug, model: modelSlug } = await params;
  const brand = getBrandBySlug(slug);
  const brandCatalog = getCatalogBrand(slug);
  if (!brand || !brandCatalog) return { title: "العلامة التجارية غير موجودة" };

  const model = brandCatalog.models[modelSlug];
  if (!model) return { title: "الموديل غير موجود" };

  return {
    title: `قطع غيار ${brand.nameAr} ${model.nameAr} الأصلية | AQ`,
    description: `تصفح كتالوج قطع غيار ${brand.nameAr} ${model.nameAr} لجميع الأجيال والهياكل. نوفر مساعدين هوائيين، كمبروسرات هواء، وصمامات تحكم مستوردة من ألمانيا.`,
    keywords: [
      `قطع غيار ${brand.nameAr} ${model.nameAr}`,
      `${brand.nameEn} ${model.nameEn} parts`,
      `${model.nameEn} air suspension`,
      `هيكل ${model.nameEn}`,
    ],
  };
}

export default async function ModelPage({ params }) {
  const { slug, model: modelSlug } = await params;

  const brand = getBrandBySlug(slug);
  const brandCatalog = getCatalogBrand(slug);

  if (!brand || !brandCatalog) {
    notFound();
  }

  const model = brandCatalog.models[modelSlug];
  if (!model) {
    notFound();
  }

  const generations = model.generations ? Object.values(model.generations) : [];

  return (
    <ModelPageContent
      brand={brand}
      brandCatalog={brandCatalog}
      model={model}
      generations={generations}
      slug={slug}
      modelSlug={modelSlug}
    />
  );
}
