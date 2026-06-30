import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.apexportfolio.me'),
  title: {
    default: 'APEX | Custom AI Agents & Full-Stack Development',
    template: '%s | APEX',
  },
  description:
    'Apex builds custom AI agents and full-stack products for serious business operators. Autonomous systems that work 24/7, generate revenue, and scale without headcount.',
  keywords: [
    'AI agents', 'custom AI development', 'agentic systems', 'AI automation',
    'full-stack developer', 'AI agency', 'autonomous AI', 'business automation',
    'Next.js developer', 'AI builder',
  ],
  authors: [{ name: 'Kian', url: 'https://www.apexportfolio.me' }],
  creator: 'Kian',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.apexportfolio.me',
    siteName: 'APEX',
    title: 'APEX | Custom AI Agents & Full-Stack Development',
    description:
      'Apex builds custom AI agents and full-stack products for serious business operators. Autonomous systems that work 24/7, generate revenue, and scale without headcount.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'APEX — Custom AI Agents & Full-Stack Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APEX | Custom AI Agents & Full-Stack Development',
    description:
      'Apex builds custom AI agents and full-stack products for serious business operators.',
    images: ['/og-image.png'],
    creator: '@apexbuilds',
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