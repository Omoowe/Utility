'use client';

import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb navigation component with schema markup
 * Displays navigation path and provides schema for SEO
 */
export function BreadcrumbNav({ items }: BreadcrumbNavProps): React.JSX.Element {
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://toolnest.vercel.app'}${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <nav className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => (
          <div key={item.href} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-400">/</span>}
            {index === items.length - 1 ? (
              <span className="text-gray-900 dark:text-white font-medium">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
