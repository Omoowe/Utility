import React from 'react';

const DISCLAIMER_TEXT: Record<string, { icon: string; text: string }> = {
  finance: {
    icon: '💰',
    text: 'This calculator provides estimates only. Results are not financial advice. Consult a qualified financial advisor before making investment or borrowing decisions.',
  },
  'health-fitness': {
    icon: '🩺',
    text: 'Results are for informational purposes only and do not constitute medical advice. Consult a licensed healthcare professional for medical guidance.',
  },
};

interface DisclaimerBannerProps {
  category: string;
}

export function DisclaimerBanner({ category }: DisclaimerBannerProps): React.JSX.Element | null {
  const disclaimer = DISCLAIMER_TEXT[category];
  if (!disclaimer) return null;

  return (
    <div className="flex gap-3 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
      <span className="shrink-0 text-base leading-5" aria-hidden="true">{disclaimer.icon}</span>
      <p>{disclaimer.text}</p>
    </div>
  );
}
