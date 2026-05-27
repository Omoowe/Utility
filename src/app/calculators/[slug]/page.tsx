import { getToolBySlug, TOOLS, getToolsByCategory } from '@/lib/data/tools';
import { CalculatorPageClient } from './CalculatorPageClient';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface ContentFile {
  slug: string;
  intro: string;
  howItWorks: string;
  interpretationGuide: string;
  faqs: Array<{ question: string; answer: string }>;
}

/**
 * Dynamic calculator page - server component
 * Handles static generation and metadata
 */
export default async function CalculatorPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tool = getToolBySlug(resolvedParams.slug);

  if (!tool) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container-custom py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404 - Not Found</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              The calculator you're looking for doesn't exist.
            </p>
            <a
              href="/calculators"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Calculators
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Import content
  let content: ContentFile | null = null;
  try {
    const contentModule = await import(`@/lib/data/content/${tool.contentFile}`);
    content = contentModule.default as ContentFile;
  } catch (err) {
    console.error(`Failed to load content for ${tool.slug}:`, err);
  }

  // Get related tools (exclude compute function)
  const relatedTools = getToolsByCategory(tool.category)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, 3)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ compute: _compute, ...toolWithoutCompute }) => toolWithoutCompute);

  // Create serializable tool config without compute function
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { compute: _compute, ...toolWithoutCompute } = tool;

  return (
    <CalculatorPageClient
      tool={toolWithoutCompute}
      toolSlug={tool.slug}
      content={content}
      relatedTools={relatedTools}
    />
  );
}

/**
 * Generate static params for all calculator slugs
 * Pre-renders all calculator pages at build time
 */
export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tool = getToolBySlug(resolvedParams.slug);

  if (!tool) {
    return {
      title: 'Calculator Not Found',
      description: 'The calculator you are looking for does not exist.',
    };
  }

  return {
    title: `${tool.title} | ToolNest`,
    description: tool.description,
    keywords: tool.keywords.join(', '),
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `/calculators/${tool.slug}`,
      type: 'website',
    },
  };
}
