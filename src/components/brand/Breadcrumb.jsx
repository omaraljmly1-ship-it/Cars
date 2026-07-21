"use client";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useLocale } from "@/components/LanguageProvider";

/**
 * Breadcrumb navigation for catalog pages.
 * Supports RTL layout and gold theme.
 * 
 * @param {Array<{label: string, href?: string}>} items
 */
export default function Breadcrumb({ items }) {
  const { t, isRTL } = useLocale();
  const direction = isRTL ? "rtl" : "ltr";

  return (
    <nav dir={direction} className="flex items-center flex-wrap gap-2 text-xs md:text-sm text-gray-muted mb-8" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-gold transition-colors">
        {t("nav.home")}
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center gap-2">
            <ChevronLeft size={14} className={`text-gold/40 ${isRTL ? "rotate-0" : "rotate-180"}`} />
            {isLast || !item.href ? (
              <span className={isLast ? "text-gold font-medium" : ""}>{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-gold transition-colors">
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
