import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: "ToolNest's privacy policy. Learn how we handle your data when using our free online calculators and tools.",
};

const LAST_UPDATED = 'May 2025';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="container-custom py-12 max-w-3xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              Your privacy is important to us. This Privacy Policy explains what information ToolNest
              (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) collects when you use our website and tools, and how we use it.
            </p>

            <h2>1. Information We Do Not Collect</h2>
            <p>
              ToolNest calculators run entirely in your browser. <strong>We do not collect, receive, or
              store any of the values you enter into our calculators.</strong> Your financial figures,
              personal measurements, or any other input data never leaves your device.
            </p>

            <h2>2. Information We May Collect</h2>
            <p>
              Like most websites, our servers may automatically record standard web server logs when you
              visit, including your IP address, browser type, operating system, referring URL, and pages
              visited. This data is used solely for security and performance monitoring.
            </p>
            <p>
              We may use third-party analytics (such as Google Analytics) to understand how visitors use
              our site in aggregate — which tools are most popular, how long pages are viewed, and
              similar non-personal metrics. These services may set cookies in your browser.
            </p>

            <h2>3. Cookies</h2>
            <p>
              We use minimal cookies and local browser storage for:
            </p>
            <ul>
              <li>Remembering your dark/light mode preference</li>
              <li>Storing your favorited tools list (local storage, not sent to us)</li>
              <li>Analytics cookies from third-party providers (see Section 2)</li>
            </ul>
            <p>
              You can disable cookies in your browser settings at any time. Disabling cookies will not
              affect calculator functionality but may reset your preferences.
            </p>

            <h2>4. Advertising</h2>
            <p>
              We display advertising through Google AdSense. Google may use cookies and web beacons to
              serve ads based on your interests. You can opt out of personalised advertising at{' '}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
                adssettings.google.com
              </a>
              .
            </p>

            <h2>5. Third-Party Links</h2>
            <p>
              Our site may contain links to external websites. We are not responsible for the privacy
              practices or content of those sites.
            </p>

            <h2>6. Children&apos;s Privacy</h2>
            <p>
              ToolNest is not directed at children under the age of 13. We do not knowingly collect
              personal information from children.
            </p>

            <h2>7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page
              with an updated &quot;Last updated&quot; date.
            </p>

            <h2>8. Contact</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:hafeezalliowe@gmail.com">hafeezalliowe@gmail.com</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
