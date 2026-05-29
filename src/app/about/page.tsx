import Link from 'next/link';
import { CATEGORIES } from '@/lib/data/categories';
import { TOOLS } from '@/lib/data/tools';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About ToolNest — Free Online Calculators & Tools',
  description:
    'Learn about ToolNest, your free hub for online calculators and utility tools. No sign-up, no fees, instant results for finance, health, home, and more.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="container-custom py-12 max-w-3xl">
        <div className="space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">About ToolNest</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Free online calculators and utility tools for everyone.
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <h2>What is ToolNest?</h2>
            <p>
              ToolNest is a free collection of {TOOLS.length}+ online calculators and utility tools
              covering {CATEGORIES.length} categories: finance, everyday utilities, home &amp; DIY,
              health &amp; fitness, pets, and business &amp; creator tools.
            </p>
            <p>
              Every tool on ToolNest is free to use with no sign-up, no subscription, and no hidden fees.
              Calculations run entirely in your browser — your data is never sent to any server or stored
              anywhere.
            </p>

            <h2>Our Mission</h2>
            <p>
              We believe everyone deserves access to accurate, easy-to-use tools for making informed
              decisions about their finances, health, home projects, and daily life. ToolNest was built
              to provide these tools in a fast, ad-friendly, privacy-respecting package that works on
              any device.
            </p>

            <h2>What We Cover</h2>
            <ul>
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categories/${cat.slug}`}>
                    <strong>{cat.name}</strong>
                  </Link>
                  {' — '}
                  {cat.description}
                </li>
              ))}
            </ul>

            <h2>Accuracy Disclaimer</h2>
            <p>
              Our calculators use standard mathematical formulas and are designed to give accurate
              estimates. However, they are intended for informational and educational purposes only.
              Always consult a qualified professional — such as a financial advisor, doctor, or
              contractor — before making important decisions based on calculator results.
            </p>

            <h2>Privacy</h2>
            <p>
              ToolNest does not collect or store any of the values you enter into our calculators. All
              computations happen locally in your browser. We may use analytics to understand general
              usage patterns (pages visited, tool popularity) but never track individual calculations
              or personal data.
            </p>

            <h2>Contact</h2>
            <p>
              Have a question, suggestion, or found a bug?{' '}
              <Link href="/contact">Contact us</Link> and we&apos;ll get back to you.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
