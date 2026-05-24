import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeObserver from "@/components/FadeObserver";
import LenisProvider from "@/components/LenisProvider";

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
  title: "Machinga | We exist to make the best work in the world",
  description: "Think clearly. Make decisively. Run smart. Machinga helps you move from scattered idea to running system. We are a creative digital agency building engaging content and campaigns.",
  keywords: ["Digital Agency", "Creative Agency", "Content Strategy", "Campaigns", "Machinga", "Marketing", "Brand Strategy"],
  openGraph: {
    title: "Machinga | We exist to make the best work in the world",
    description: "Think clearly. Make decisively. Run smart. Machinga helps you move from scattered idea to running system.",
    url: "https://studiomachinga.com/",
    siteName: "Machinga",
    images: [
      {
        url: "https://studiomachinga.com/assets/machinga_logos.png",
        width: 1200,
        height: 630,
        alt: "Machinga Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Machinga | We exist to make the best work in the world",
    description: "Think clearly. Make decisively. Run smart. Machinga helps you move from scattered idea to running system.",
    images: ["https://studiomachinga.com/assets/machinga_logos.png"],
  },
  alternates: {
    canonical: "https://studiomachinga.com/",
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
        <link rel="icon" type="image/png" href={`${process.env.NODE_ENV === 'production' ? '/machinga-nextjs' : ''}/assets/machinga_logos.png`} />
      </head>
      <body>
        <LenisProvider>
          <FadeObserver />
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
