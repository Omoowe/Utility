export interface CategoryColors {
  border: string;
  iconBg: string;
  badge: string;
  banner: string;
  dot: string;
}

export const CATEGORY_COLORS: Record<string, CategoryColors> = {
  'finance': {
    border:  'border-l-emerald-500',
    iconBg:  'bg-emerald-50 dark:bg-emerald-900/20',
    badge:   'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
    banner:  'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-800',
    dot:     'bg-emerald-500',
  },
  'everyday-utilities': {
    border:  'border-l-blue-500',
    iconBg:  'bg-blue-50 dark:bg-blue-900/20',
    badge:   'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    banner:  'from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 border-blue-200 dark:border-blue-800',
    dot:     'bg-blue-500',
  },
  'home-diy': {
    border:  'border-l-orange-500',
    iconBg:  'bg-orange-50 dark:bg-orange-900/20',
    badge:   'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
    banner:  'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-800',
    dot:     'bg-orange-500',
  },
  'health-fitness': {
    border:  'border-l-rose-500',
    iconBg:  'bg-rose-50 dark:bg-rose-900/20',
    badge:   'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300',
    banner:  'from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border-rose-200 dark:border-rose-800',
    dot:     'bg-rose-500',
  },
  'pets': {
    border:  'border-l-amber-500',
    iconBg:  'bg-amber-50 dark:bg-amber-900/20',
    badge:   'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    banner:  'from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-800',
    dot:     'bg-amber-500',
  },
  'business-creator': {
    border:  'border-l-violet-500',
    iconBg:  'bg-violet-50 dark:bg-violet-900/20',
    badge:   'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
    banner:  'from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-violet-200 dark:border-violet-800',
    dot:     'bg-violet-500',
  },
};

export function getCategoryColors(slug: string): CategoryColors {
  return CATEGORY_COLORS[slug] ?? CATEGORY_COLORS['everyday-utilities'];
}
