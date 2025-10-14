import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Medical Imaging Solutions - Advanced Medical Image Analysis Software",
  description: "Professional-grade medical imaging software designed for researchers, radiologists, and healthcare institutions worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="smooth-scroll">
      <body className={`${inter.variable} ${poppins.variable} font-inter antialiased`}>
        <Header />
        <main className="min-h-screen medical-main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
