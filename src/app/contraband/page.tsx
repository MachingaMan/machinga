import ContrabandClient from '@/components/ContrabandClient';

export const metadata = {
  title: "Contraband Case Study | Machinga",
  description: "How a stain launched a luxury fragrance to 88 million people. Campaign concept and production for Contraband.",
  alternates: { canonical: "https://www.studiomachinga.com/contraband/" },
  openGraph: {
    title: "Contraband Case Study | Machinga",
    description: "How a stain launched a luxury fragrance to 88 million people. Campaign concept and production for Contraband.",
    url: "https://www.studiomachinga.com/contraband/",
    siteName: "Machinga",
    type: "article",
    images: [{ url: "/og/contraband.jpg", width: 1200, height: 630, alt: "Contraband Case Study | Machinga" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contraband Case Study | Machinga",
    description: "How a stain launched a luxury fragrance to 88 million people. Campaign concept and production for Contraband.",
    images: ["/og/contraband.jpg"],
  },
};

export default function ContrabandPage() {
  return <ContrabandClient />;
}
