import { getBrandBySlug, getAllBrandSlugs } from "@/data/brandsData";
import { notFound } from "next/navigation";
import BrandHero from "@/components/brand/BrandHero";
import BrandModels from "@/components/brand/BrandModels";
import BrandParts from "@/components/brand/BrandParts";
import BrandCTA from "@/components/brand/BrandCTA";

// Generate static params for all brands
export async function generateStaticParams() {
  const slugs = getAllBrandSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate SEO metadata per brand
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return { title: "Brand Not Found" };

  return {
    title: `قطع غيار ${brand.nameAr} الأصلية | AQ`,
    description: brand.descriptionAr,
    keywords: [
      `قطع غيار ${brand.nameAr}`,
      `${brand.nameEn} spare parts`,
      `${brand.nameEn} air suspension`,
      "قطع غيار أصلية",
      "الإمارات",
    ],
    openGraph: {
      title: `${brand.nameAr} | قطع غيار أصلية | AQ`,
      description: brand.descriptionAr,
      type: "website",
      locale: "ar_AE",
    },
  };
}

export default async function BrandPage({ params }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
 console.log(brand)
  if (!brand) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-black-deep">
      <BrandHero brand={brand} />
      <BrandModels brand={brand} />
      <BrandParts brand={brand} />
      <BrandCTA brand={brand} />
    </main>
  );
}
