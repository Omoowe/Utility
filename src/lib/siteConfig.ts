export const siteConfig = {
  name: 'ToolNest',
  description: 'Free online calculators for finance, health, home, and more.',
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
    { name: 'Calculators', href: '/calculators' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  categories: [
    { slug: 'finance', name: 'Finance', description: 'Financial calculators' },
    { slug: 'health', name: 'Health', description: 'Health and fitness calculators' },
    { slug: 'home', name: 'Home', description: 'Home and property calculators' },
  ],
};

export type SiteConfig = typeof siteConfig;
