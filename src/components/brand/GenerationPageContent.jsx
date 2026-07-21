"use client";

import SectionHeading from "@/components/SectionHeading";
import Breadcrumb from "@/components/brand/Breadcrumb";
import PartCard from "@/components/brand/PartCard";
import { useLocale } from "@/components/LanguageProvider";

export default function GenerationPageContent({
    brand,
    brandCatalog,
    model,
    generation,
    parts,
    slug,
    modelSlug,
}) {
    const { t, locale, isRTL } = useLocale();
    const direction = isRTL ? "rtl" : "ltr";

    const brandNameAr = brandCatalog.nameAr || brand.nameAr;
    const brandNameEn = brandCatalog.nameEn || brand.nameEn;
    const modelNameAr = model.nameAr || modelSlug;
    const modelNameEn = model.nameEn || modelSlug;

    const breadcrumbItems = [
        { label: locale === "en" ? brandNameEn : brandNameAr, href: `/brands/${slug}` },
        { label: locale === "en" ? modelNameEn : modelNameAr, href: `/brands/${slug}/${modelSlug}` },
        { label: t("generationPage.chassisLabel").replace("{code}", generation.code) },
    ];

    return (
        <main dir={direction} className="relative min-h-screen bg-black-deep pt-36 pb-24 overflow-hidden">
            <div className="absolute -right-40 top-40 w-96 h-96 bg-gold/3 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-40 bottom-40 w-96 h-96 bg-gold/2 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <Breadcrumb items={breadcrumbItems} />

                <div className="mb-12">
                    <SectionHeading
                        title={t("generationPage.partsTitle")
                            .replace("{brand}", locale === "en" ? brandNameEn : brandNameAr)
                            .replace("{model}", locale === "en" ? modelNameEn : modelNameAr)
                            .replace("{code}", generation.code)}
                        subtitle={t("generationPage.partsSubtitle")
                            .replace("{code}", generation.code)
                            .replace("{years}", generation.years || t("generationCard.notSpecified"))}
                        englishTitle={`${generation.code} Spare Parts`}
                    />
                </div>

                {parts.length === 0 ? (
                    <div className="text-center py-20 border border-black-border rounded-3xl bg-black-card">
                        <p className="text-gray-muted text-lg">{t("catalog.noImages")}</p>
                        <p className="text-gold text-sm mt-2 font-tajawal">{t("catalog.contactForAvailability")}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {parts.map((part) => (
                            <PartCard
                                key={part.id}
                                part={part}
                                brandNameAr={brandNameAr}
                                brandNameEn={brandNameEn}
                                modelNameAr={modelNameAr}
                                modelNameEn={modelNameEn}
                                generationCode={generation.code}
                                generationYears={generation.years}
                                locale={locale}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
