import Link from 'next/link';
import { CATEGORIES } from '@/lib/data/categories';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="text-6xl">🔍</div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Page Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-primary"
          >
            Go Home
          </Link>
          <Link
            href="/calculators"
            className="btn-secondary"
          >
            Browse All Tools
          </Link>
        </div>
        <div className="pt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Or browse by category:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
