import type { Metadata } from "next";
import { Inter, Playfair_Display, Pinyon_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Locanda dei Mori | Genuine Sicilian Hospitality in Taormina",
  description: "Experience the authentic taste of Sicily at Locanda dei Mori. From our famous pistachio bruschetta to traditional lasagna, enjoy a cozy dining experience in the heart of Taormina.",
  keywords: ["Taormina restaurant", "Sicilian food", "Locanda dei Mori", "Best bruschetta Taormina", "Pistachio lasagna Sicily"],
  authors: [{ name: "Locanda dei Mori" }],
  openGraph: {
    title: "Locanda dei Mori | Authentic Sicilian Bistro",
    description: "Semplice ma con un gusto strepitoso! Visit us in the heart of Taormina.",
    url: "https://locandadeimori.it",
    siteName: "Locanda dei Mori",
    locale: "en_US",
    type: "website",
  },
};

import { LanguageProvider } from "@/components/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Locanda dei Mori",
    "image": "https://locandadeimori.it/assets/images/authentic/culinary-1.webp",
    "@id": "https://locandadeimori.it",
    "url": "https://locandadeimori.it",
    "telephone": "+39 334 849 7735",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Bagnoli Croci, 12",
      "addressLocality": "Taormina",
      "postalCode": "98039",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.852,
      "longitude": 15.287
    },
    "servesCuisine": "Sicilian",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "11:00",
        "closes": "23:00"
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${pinyon.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream/20">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
