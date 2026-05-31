import { getToolBySlug, getRelatedTools, TOOLS } from '@/lib/data/tools';
import { getContent } from '@/lib/data/content/types';
import { getCategoryBySlug } from '@/lib/data/categories';
import { CalculatorPageClient } from './CalculatorPageClient';
import { generateCalculatorSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/utils/seo';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container-custom py-20 text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Tool Not Found</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            That tool doesn&apos;t exist yet.
          </p>
          <a
            href="/calculators"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Tools
          </a>
        </div>
      </div>
    );
  }

  const content = await getContent(tool.contentFile);

  const relatedTools = getRelatedTools(slug, 3).map(
    ({ compute: _c, ...rest }) => rest
  );

  const { compute: _compute, ...toolWithoutCompute } = tool;

  const category = getCategoryBySlug(tool.category);
  const calculatorSchema = generateCalculatorSchema(toolWithoutCompute);
  const faqSchema = content?.faqs ? generateFAQSchema(content.faqs) : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: 'Home', href: '/' },
    { label: 'All Tools', href: '/calculators' },
    { label: category?.name ?? tool.category, href: `/categories/${tool.category}` },
    { label: tool.name, href: `/calculators/${tool.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CalculatorPageClient
        tool={toolWithoutCompute}
        toolSlug={slug}
        content={content}
        relatedTools={relatedTools}
      />
    </>
  );
}

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
      description: 'The tool you are looking for does not exist.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://toolnest.vercel.app';
  const url = `/calculators/${tool.slug}`;

  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords.join(', '),
    alternates: {
      canonical: `${baseUrl}${url}`,
    },
    openGraph: {
      title: `${tool.title} | ToolNest`,
      description: tool.description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.title} | ToolNest`,
      description: tool.description,
    },
  };
}
