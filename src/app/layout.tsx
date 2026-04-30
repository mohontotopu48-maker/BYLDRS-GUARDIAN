import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#002D72",
};

export const metadata: Metadata = {
  title: {
    default: "BYLDRS GUARDIAN — Claim Your Lifelong Protection",
    template: "%s | BYLDRS GUARDIAN",
  },
  description:
    "California's only AI-powered project protection platform. Audit bids, verify contractors, and secure your home in the Vault.",
  keywords: [
    "BYLDRS GUARDIAN",
    "home remodeling protection",
    "contractor verification",
    "California construction",
    "AI project protection",
    "bid auditing",
    "CSLB verification",
    "roofing contractor",
    "home improvement safety",
  ],
  authors: [{ name: "VSUAL Digital Media", url: "https://vsualdigitalmedia.com" }],
  creator: "VSUAL Digital Media",
  publisher: "VSUAL Digital Media",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  metadataBase: new URL("https://bldrsguardian.com"),
  openGraph: {
    title: "BYLDRS GUARDIAN — Your Invitation to the Shield",
    description:
      "Remodeling shouldn't be a gamble. Accept your complimentary membership to access California's only AI-powered project protection platform.",
    siteName: "BYLDRS GUARDIAN",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BYLDRS GUARDIAN — Your Invitation to the Shield",
    description:
      "Remodeling shouldn't be a gamble. Accept your complimentary membership to access California's only AI-powered project protection platform.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#3BB79E] focus:text-white focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BYLDRS GUARDIAN",
              url: "https://bldrsguardian.com",
              logo: "https://bldrsguardian.com/logo.svg",
              description: "California's only AI-powered project protection platform. Audit bids, verify contractors, and secure your home in the Vault.",
              address: [
                {
                  "@type": "PostalAddress",
                  addressLocality: "Santa Fe Springs",
                  addressRegion: "CA",
                  addressCountry: "US",
                },
                {
                  "@type": "PostalAddress",
                  addressLocality: "Irvine",
                  addressRegion: "CA",
                  addressCountry: "US",
                },
              ],
              sameAs: ["https://vsualdigitalmedia.com"],
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
