import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact ToolNest',
  description: 'Get in touch with the ToolNest team. Report bugs, suggest new tools, or ask questions.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="container-custom py-12 max-w-2xl">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: '🐛',
                title: 'Report a Bug',
                desc: 'Found an incorrect calculation or broken tool? Let us know.',
                subject: 'Bug Report',
              },
              {
                icon: '💡',
                title: 'Suggest a Tool',
                desc: 'Have an idea for a new calculator or tool? We love suggestions.',
                subject: 'Tool Suggestion',
              },
              {
                icon: '💬',
                title: 'General Enquiry',
                desc: 'Any other questions or feedback — reach out anytime.',
                subject: 'General Enquiry',
              },
            ].map((item) => (
              <a
                key={item.subject}
                href={`mailto:hafeezalliowe@gmail.com?subject=${encodeURIComponent(item.subject)}`}
                className="group p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all space-y-2"
              >
                <span className="text-3xl">{item.icon}</span>
                <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Send email →</p>
              </a>
            ))}
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-6 space-y-2">
            <p className="font-medium text-gray-900 dark:text-white">Email us directly</p>
            <a
              href="mailto:hafeezalliowe@gmail.com"
              className="text-blue-600 dark:text-blue-400 hover:underline text-lg font-semibold"
            >
              hafeezalliowe@gmail.com
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We aim to respond within 2–3 business days.
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none text-sm">
            <h2>What to include in your message</h2>
            <ul>
              <li>
                <strong>Bug reports:</strong> Please include the tool name, the values you entered, the
                result you received, and what you expected.
              </li>
              <li>
                <strong>Tool suggestions:</strong> Describe what the tool should calculate and who
                would find it useful.
              </li>
              <li>
                <strong>General questions:</strong> Any context you can provide helps us give you a
                faster, more helpful answer.
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
