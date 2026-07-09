import FloatingIconsBackground from "@/components/FloatingIconsBackground";
import HeroSection from "@/sections/HeroSection";
import BrandsSection from "@/sections/BrandsSection";
import AboutSection from "@/sections/AboutSection";
import ProductsSection from "@/sections/ProductsSection";
import StatsSection from "@/sections/StatsSection";
import FeaturesStrip from "@/sections/FeaturesStrip";
import TestimonialsSection from "@/sections/TestimonialsSection";
import LocationSection from "@/sections/LocationSection";
import ContactSection from "@/sections/ContactSection";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <main className="relative">
      <FloatingIconsBackground />
      <HeroSection />
      <BrandsSection />
      <AboutSection />
      <ProductsSection />
      <TestimonialsSection />
      <LocationSection />
      <ContactSection />
      <WhatsAppFloat />
    </main>
  );
}
