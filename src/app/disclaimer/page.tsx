import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'ToolNest disclaimer. Our calculators provide estimates for informational purposes only and do not constitute professional advice.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="container-custom py-12 max-w-3xl">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Disclaimer</h1>

          <div className="prose dark:prose-invert max-w-none">
            <h2>Informational Purposes Only</h2>
            <p>
              The calculators and tools provided on ToolNest are intended for general informational and
              educational purposes only. Results produced by our tools are estimates based on the
              information you provide and standard mathematical formulas. They should not be relied upon
              as the sole basis for any financial, medical, legal, or other professional decision.
            </p>

            <h2>No Professional Advice</h2>
            <p>
              Nothing on this website constitutes financial, investment, tax, legal, medical, or any
              other professional advice. Before making any significant financial, health, or legal
              decision, you should consult with a suitably qualified and licensed professional.
            </p>

            <h2>Accuracy of Results</h2>
            <p>
              While we strive to ensure our calculators are accurate and up to date, we make no
              representations or warranties of any kind — express or implied — about the completeness,
              accuracy, reliability, or suitability of the results. Figures may differ from those
              provided by professional tools or institutions due to varying assumptions, rounding, or
              regulatory differences.
            </p>

            <h2>Finance Calculators</h2>
            <p>
              Our mortgage, loan, and other financial calculators produce estimates only. Actual loan
              terms, interest rates, tax obligations, and repayment amounts will vary based on your
              lender, jurisdiction, credit profile, and current market conditions. Tax rates used are
              for illustrative purposes and may not reflect the current tax year or your individual
              circumstances.
            </p>

            <h2>Health & Fitness Calculators</h2>
            <p>
              BMI, calorie, and other health calculators are general tools and do not account for
              individual variations in body composition, medical history, or health conditions. Always
              consult a doctor or registered dietitian before making changes to your diet or exercise
              routine.
            </p>

            <h2>Home & DIY Calculators</h2>
            <p>
              Material quantity estimates (tiles, paint, flooring, etc.) are approximate and based on
              standard industry formulas. Always purchase additional materials to account for waste and
              cutting. Consult a professional contractor for large or complex projects.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, ToolNest and its operators shall not be liable
              for any direct, indirect, incidental, or consequential damages arising from your use of
              or reliance on any calculator or tool on this website.
            </p>

            <h2>Changes</h2>
            <p>
              We reserve the right to update this disclaimer at any time. Continued use of ToolNest
              after changes constitutes acceptance of the revised disclaimer.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this disclaimer? Email us at{' '}
              <a href="mailto:hafeezalliowe@gmail.com">hafeezalliowe@gmail.com</a>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
