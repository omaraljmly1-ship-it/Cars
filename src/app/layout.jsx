import { Cairo } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata = {
  title: "قطع غيار السيارات الأوروبية  | AQ",
  description:
    "الوكيل المعتمد لقطع غيار السيارات الأوروبية الفاخرة في الامارات. متخصصون في أنظمة التعليق الهوائي لرينج روفر، مرسيدس، بي إم دبليو، أودي وبنتلي.",
  keywords: [
    "قطع غيار سيارات",
    "تعليق هوائي",
    "رينج روفر",
    "مرسيدس",
    "بي إم دبليو",
    "أودي",
    "بنتلي",
    "قطع غيار أصلية",
    "الامارات",
  ],
  openGraph: {
    title: "AQ | قطع غيار السيارات الأوروبية ",
    description:
      " علي قنيطه لقطع غيار السيارات الأوروبية في الامارات",
    type: "website",
    locale: "ar_AE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" suppressHydrationWarning className={`${cairo.className} antialiased`}>
      <body suppressHydrationWarning className="min-h-screen bg-black-deep text-white">
        <LanguageProvider>
          <TopBar />
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
