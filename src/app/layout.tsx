import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/common/CookieConsent';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'ToolNest — Free Online Calculators & Utility Tools',
    template: '%s | ToolNest',
  },
  description:
    'Free online calculators and utility tools for finance, health, home improvement, and everyday use. No sign-up, instant results.',
  keywords: [
    'calculator',
    'online calculator',
    'mortgage calculator',
    'loan calculator',
    'bmi calculator',
    'free tools',
    'utility tools',
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'https://toolnest.vercel.app'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://toolnest.vercel.app',
    siteName: 'ToolNest',
    title: 'ToolNest — Free Online Calculators & Utility Tools',
    description:
      'Free online calculators and utility tools for finance, health, home, and everyday use.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ToolNest — Free Online Calculators & Utility Tools',
    description: 'Free online calculators and utility tools.',
  },
  robots: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* No-flash theme script — must run before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans antialiased">
        <ThemeProvider>
          <Header />
          <div className="min-h-screen">{children}</div>
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
