import type { Metadata } from "next";
import { fontSans, fontHeading } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { LenisProvider } from "@/components/layout/LenisProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Provident Groups | Expert Career Guidance & University Admissions",
    template: "%s | Provident Groups",
  },
  description:
    "Guiding your academic journey with confidence. Education consultancy, university admissions, career counseling, and placement support in Karnataka.",
  openGraph: {
    title: "Provident Groups | Expert Career Guidance & University Admissions",
    description: "Education consultancy, university admissions, and career counseling in Karnataka.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontHeading.variable}`}>
      <body className="font-sans antialiased">
        <LenisProvider>
          <Header />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </LenisProvider>
      </body>
    </html>
  );
}
