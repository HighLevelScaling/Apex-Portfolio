import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import {
  absoluteUrl,
  creatorHandle,
  creatorName,
  seoKeywords,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
} from './seo';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  category: 'technology',
  title: {
    default: siteTitle,
    template: '%s | APEX',
  },
  description: siteDescription,
  keywords: seoKeywords,
  authors: [{ name: creatorName, url: siteUrl }],
  creator: creatorName,
  publisher: siteName,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: absoluteUrl('/og-image.png'),
        width: 1200,
        height: 630,
        alt: 'APEX — Custom AI Agents & Full-Stack Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [absoluteUrl('/og-image.png')],
    creator: creatorHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
    </html>
  );
}