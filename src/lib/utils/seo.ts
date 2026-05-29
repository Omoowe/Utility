import { ToolConfig } from '@/lib/data/tools';
import { getCategoryBySlug } from '@/lib/data/categories';

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://toolnest.vercel.app';

export function generateCalculatorSchema(tool: Omit<ToolConfig, 'compute'>) {
  const category = getCategoryBySlug(tool.category);
  const applicationCategories: Record<string, string> = {
    finance: 'FinancialApplication',
    'health-fitness': 'HealthApplication',
    'home-diy': 'UtilitiesApplication',
    'everyday-utilities': 'UtilitiesApplication',
    pets: 'LifestyleApplication',
    'business-creator': 'BusinessApplication',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    description: tool.description,
    applicationCategory: applicationCategories[tool.category] ?? 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    url: `${BASE_URL}/calculators/${tool.slug}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: tool.keywords.join(', '),
    genre: category?.name ?? tool.category,
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ label: string; href: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${BASE_URL}${item.href}`,
    })),
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ToolNest',
    url: BASE_URL,
    description: 'Free online calculators and utility tools for finance, health, home, and everyday use.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/calculators?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
