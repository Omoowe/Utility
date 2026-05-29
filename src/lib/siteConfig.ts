import { CATEGORIES } from './data/categories';

export const siteConfig = {
  name: 'ToolNest',
  description:
    'Free online calculators and utility tools for finance, health, home, and everyday use.',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://toolnest.vercel.app',
  author: 'ToolNest',
  email: 'support@toolnest.com',
  twitter: '@toolnest',
  socialLinks: {
    twitter: 'https://twitter.com/toolnest',
    github: 'https://github.com/toolnest',
  },
  navigation: [
    { name: 'Home', href: '/' },
    { name: 'All Tools', href: '/calculators' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  get categories() {
    return CATEGORIES;
  },
};

export type SiteConfig = typeof siteConfig;
