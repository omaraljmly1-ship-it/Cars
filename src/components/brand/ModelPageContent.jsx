"use client";

import SectionHeading from "@/components/SectionHeading";
import Breadcrumb from "@/components/brand/Breadcrumb";
import GenerationCard from "@/components/brand/GenerationCard";
import { useLocale } from "@/components/LanguageProvider";

export default function ModelPageContent({ brand, brandCatalog, model, generations, slug, modelSlug }) {
    const { t, locale, isRTL } = useLocale();
    const direction = isRTL ? "rtl" : "ltr";

    const breadcrumbItems = [
        { label: locale === "en" ? brand.nameEn : brand.nameAr, href: `/brands/${slug}` },
        { label: locale === "en" ? model.nameEn : model.nameAr },
    ];

    const title = t("modelPage.generationsTitle")
        .replace("{brand}", locale === "en" ? brand.nameEn : brand.nameAr)
        .replace("{model}", locale === "en" ? model.nameEn : model.nameAr);

    const subtitle = t("modelPage.generationsSubtitle");

    return (
        <main dir={direction} className="relative min-h-screen bg-black-deep pt-36 pb-24 overflow-hidden">
            <div className="absolute -right-40 top-40 w-96 h-96 bg-gold/3 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-40 bottom-40 w-96 h-96 bg-gold/2 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <Breadcrumb items={breadcrumbItems} />

                <div className="mb-12">
                    <SectionHeading
                        title={title}
                        subtitle={subtitle}
                        englishTitle={locale === "en" ? `${model.nameEn} Generations` : null}
                    />
                </div>

                {generations.length === 0 ? (
                    <div className="text-center py-20 border border-black-border rounded-3xl bg-black-card">
                        <p className="text-gray-muted text-lg">{t("modelPage.noGenerations")}</p>
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
