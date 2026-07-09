import { notFound } from "next/navigation";
import { getBrandBySlug } from "@/data/brandsData";
import { getCatalogBrand, getCatalogModels, getCatalogParts } from "@/data/catalogData";
import SectionHeading from "@/components/SectionHeading";
import Breadcrumb from "@/components/brand/Breadcrumb";
import PartCard from "@/components/brand/PartCard";

// Generate static params for all catalog brand + model + generation combinations
export async function generateStaticParams() {
  const activeSlugs = ["mercedes", "bmw"];
  const params = [];

  for (const slug of activeSlugs) {
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

  const generation = model.generations[genSlug];
  if (!generation) return { title: "الهيكل غير موجود" };

  return {
    title: `قطع غيار ${brand.nameAr} ${model.nameAr} ${generation.code} الأصلية | AQ`,
    description: `كتالوج صور قطع غيار ${brand.nameAr} ${model.nameAr} هيكل ${generation.code} (${generation.years || ""}). مساعدين تعليق هوائي، بالونات، صمامات، وكمبروسرات مستوردة.`,
    keywords: [
      `قطع غيار ${brand.nameAr} ${generation.code}`,
      `${brand.nameEn} ${generation.code} spare parts`,
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

  const generation = model.generations[genSlug];
  if (!generation) {
    notFound();
  }

  const parts = getCatalogParts(slug, modelSlug, genSlug);

  const breadcrumbItems = [
    { label: brand.nameAr, href: `/brands/${slug}` },
    { label: model.nameAr, href: `/brands/${slug}/${modelSlug}` },
    { label: `هيكل ${generation.code}` },
  ];

  return (
    <main className="relative min-h-screen bg-black-deep pt-36 pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -right-40 top-40 w-96 h-96 bg-gold/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-40 bottom-40 w-96 h-96 bg-gold/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Section Heading */}
        <div className="mb-12">
          <SectionHeading
            title={`قطع غيار ${brand.nameAr} ${model.nameAr} - هيكل ${generation.code}`}
            subtitle={`كتالوج مصور لقطع غيار نظام التعليق الهوائي المتاحة لهيكل ${generation.code} (${generation.years || "غير محدد"})`}
            englishTitle={`${generation.code} Spare Parts`}
          />
        </div>

        {parts.length === 0 ? (
          <div className="text-center py-20 border border-black-border rounded-3xl bg-black-card">
            <p className="text-gray-muted text-lg">لا تتوفر صور لقطع غيار هذا الهيكل حالياً.</p>
            <p className="text-gold text-sm mt-2 font-tajawal">يرجى التواصل معنا مباشرة للاستفسار عن توفرها.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {parts.map((part) => (
              <PartCard
                key={part.id}
                part={part}
                brandNameAr={brand.nameAr}
                brandNameEn={brand.nameEn}
                modelNameAr={model.nameAr}
                modelNameEn={model.nameEn}
                generationCode={generation.code}
                generationYears={generation.years}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
