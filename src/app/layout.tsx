import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ToolNest - Free Online Calculators',
    template: '%s | ToolNest',
  },
  description:
    'Free online calculators for finance, health, home, and more. Instant accurate calculations for mortgages, loans, taxes, and daily utilities.',
  keywords: [
    'calculator',
    'online calculator',
    'mortgage calculator',
    'loan calculator',
    'tax calculator',
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'https://toolnest.vercel.app'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://toolnest.vercel.app',
    siteName: 'ToolNest',
    title: 'ToolNest - Free Online Calculators',
    description:
      'Free online calculators for finance, health, home, and more. Instant accurate calculations.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ToolNest - Free Online Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ToolNest - Free Online Calculators',
    description:
      'Free online calculators for finance, health, home, and more.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
