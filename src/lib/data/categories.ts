export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  seoBlurb: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'finance',
    name: 'Finance',
    description: 'Financial calculators for mortgages, loans, savings, taxes, and investments.',
    icon: '💰',
    seoBlurb:
      'Plan your finances with free online calculators. Calculate mortgage payments, loan repayments, compound interest, ROI, and more.',
  },
  {
    slug: 'everyday-utilities',
    name: 'Everyday Utilities',
    description: 'Everyday tools for dates, random generation, text conversion, and more.',
    icon: '🔧',
    seoBlurb:
      'Handy everyday utilities including age calculators, date difference tools, random generators, word counters, and text converters.',
  },
  {
    slug: 'home-diy',
    name: 'Home & DIY',
    description: 'Home improvement calculators for materials, dimensions, and costs.',
    icon: '🏠',
    seoBlurb:
      'Plan your home projects with calculators for tiles, paint, flooring, concrete, wallpaper, and more renovation materials.',
  },
  {
    slug: 'health-fitness',
    name: 'Health & Fitness',
    description: 'Health and fitness calculators for BMI, calories, water intake, and nutrition.',
    icon: '💪',
    seoBlurb:
      'Track your health with free calculators for BMI, daily calorie needs, water intake, body fat percentage, and protein intake.',
  },
  {
    slug: 'pets',
    name: 'Pets',
    description: 'Pet care calculators for dog age, cat age, and calorie needs.',
    icon: '🐾',
    seoBlurb:
      'Care for your pets with calculators for dog and cat age in human years and daily calorie requirements.',
  },
  {
    slug: 'business-creator',
    name: 'Business & Creator',
    description: 'Business and creator tools for profit margins and YouTube earnings.',
    icon: '📈',
    seoBlurb:
      'Grow your business or channel with calculators for profit margins, YouTube earnings estimates, and more creator tools.',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryName(slug: string): string {
  return getCategoryBySlug(slug)?.name ?? slug;
}
