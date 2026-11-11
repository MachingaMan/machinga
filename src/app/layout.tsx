import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeObserver from "@/components/FadeObserver";
import LenisProvider from "@/components/LenisProvider";
import LazyVideos from "@/components/LazyVideos";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.studiomachinga.com"),
  title: "Machinga | We build creative systems & solutions",
  description: "Think clearly. Make decisively. Run smart. Machinga helps you move from scattered idea to running system. We are a creative digital agency building engaging content and campaigns.",
  keywords: ["Digital Agency", "Creative Agency", "Content Strategy", "Campaigns", "Machinga", "Marketing", "Brand Strategy"],
  openGraph: {
    title: "Machinga | We build creative systems & solutions",
    description: "Think clearly. Make decisively. Run smart. Machinga helps you move from scattered idea to running system.",
    url: "https://www.studiomachinga.com/",
    siteName: "Machinga",
    images: [
      {
        url: "/og/machinga.jpg",
        width: 1200,
        height: 630,
        alt: "Machinga. Think. Make. Run.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Machinga | We build creative systems & solutions",
    description: "Think clearly. Make decisively. Run smart. Machinga helps you move from scattered idea to running system.",
    images: ["/og/machinga.jpg"],
  },
  alternates: {
    canonical: "https://www.studiomachinga.com/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${inter.className}`}>
      <head>
        <link rel="icon" type="image/png" href={`/assets/machinga_logos.png`} />
      </head>
      <body>
        <LenisProvider>
          <FadeObserver />
          <LazyVideos />
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
