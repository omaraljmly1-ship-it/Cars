import { notFound } from "next/navigation";
import { getBrandBySlug } from "@/data/brandsData";
import {
  getCatalogBrand,
  getCatalogModels,
  getCatalogGenerations,
} from "@/data/catalogData";
import SectionHeading from "@/components/SectionHeading";
import Breadcrumb from "@/components/brand/Breadcrumb";
import GenerationCard from "@/components/brand/GenerationCard";

// Generate static params for all catalog brand + model slug combinations
export async function generateStaticParams() {
  const catalog = getCatalogBrand("mercedes"); // We can get catalog for active brands
  const params = [];

  // Active brands are BMW and Mercedes
  const activeSlugs = ["mercedes", "bmw"];
  for (const slug of activeSlugs) {
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

  const breadcrumbItems = [
    { label: brand.nameAr, href: `/brands/${slug}` },
    { label: model.nameAr },
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
            title={`أجيال وهياكل ${brand.nameAr} ${model.nameAr}`}
            subtitle={`اختر رقم هيكل / جيل سيارتك لاستعراض كتالوج صور قطع الغيار المتاحة لها`}
            englishTitle={`${model.nameEn} Generations`}
          />
        </div>

        {generations.length === 0 ? (
          <div className="text-center py-20 border border-black-border rounded-3xl bg-black-card">
            <p className="text-gray-muted text-lg">
              لا تتوفر هياكل أو أجيال مسجلة لهذا الموديل حالياً.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {generations.map((gen) => (
              <GenerationCard
                key={gen.slug}
                generation={gen}
                brandSlug={slug}
                modelSlug={modelSlug}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
