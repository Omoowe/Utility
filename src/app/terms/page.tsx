import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: "ToolNest's terms of use. Please read before using our free online calculators and tools.",
};

const LAST_UPDATED = 'May 2025';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="container-custom py-12 max-w-3xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Terms of Use</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              By accessing and using ToolNest (&quot;the Website&quot;), you accept and agree to be bound by
              the following terms and conditions of use.
            </p>

            <h2>1. Use of the Website</h2>
            <p>
              ToolNest provides free online calculators and utility tools for personal, non-commercial
              use. You agree to use the Website only for lawful purposes and in a manner that does not
              infringe the rights of, or restrict or inhibit the use of, the Website by any third party.
            </p>

            <h2>2. Intellectual Property</h2>
            <p>
              All content on this Website — including but not limited to text, code, graphics, and
              tool designs — is owned by or licensed to ToolNest. You may not reproduce, distribute,
              or create derivative works without prior written permission, except for personal,
              non-commercial use.
            </p>

            <h2>3. Disclaimer of Warranties</h2>
            <p>
              The Website and all tools are provided &quot;as is&quot; without any warranty of any kind. We
              do not warrant that the Website will be available at all times, error-free, or that results
              will be accurate for your specific circumstances. See our{' '}
              <a href="/disclaimer">Disclaimer</a> for full details.
            </p>

            <h2>4. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, ToolNest shall not be liable for any
              loss or damage arising directly or indirectly from your use of the Website or any tool
              therein. This includes, but is not limited to, direct, indirect, incidental, punitive, and
              consequential damages.
            </p>

            <h2>5. External Links</h2>
            <p>
              Our Website may contain links to third-party websites. These links are provided for your
              convenience only. ToolNest has no control over the content of those sites and accepts no
              responsibility for them.
            </p>

            <h2>6. Privacy</h2>
            <p>
              Your use of the Website is also governed by our{' '}
              <a href="/privacy-policy">Privacy Policy</a>, which is incorporated into these terms by
              reference.
            </p>

            <h2>7. Changes to Terms</h2>
            <p>
              We may revise these Terms of Use at any time. Continued use of the Website after any
              changes constitutes your acceptance of the new terms.
            </p>

            <h2>8. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with applicable law. Any
              disputes arising in connection with these terms shall be subject to the exclusive
              jurisdiction of the relevant courts.
            </p>

            <h2>9. Contact</h2>
            <p>
              Questions about these Terms? Email us at{' '}
              <a href="mailto:hafeezalliowe@gmail.com">hafeezalliowe@gmail.com</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
