import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BYLDRS GUARDIAN — Claim Your Lifelong Protection",
  description:
    "California's only AI-powered project protection platform. Audit bids, verify contractors, and secure your home in the Vault.",
  keywords: [
    "BYLDRS GUARDIAN",
    "home remodeling protection",
    "contractor verification",
    "California construction",
    "AI project protection",
    "bid auditing",
    "CSLB",
  ],
  authors: [{ name: "VSUAL Digital Media" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "BYLDRS GUARDIAN — Your Invitation to the Shield",
    description:
      "Remodeling shouldn't be a gamble. Accept your complimentary membership to access California's only AI-powered project protection platform.",
    siteName: "BYLDRS GUARDIAN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BYLDRS GUARDIAN — Your Invitation to the Shield",
    description:
      "Remodeling shouldn't be a gamble. Accept your complimentary membership to access California's only AI-powered project protection platform.",
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
