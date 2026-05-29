import dynamic from 'next/dynamic';
import React from 'react';

type DynamicComponent = React.ComponentType<{ tool: { slug: string; name: string; description: string } }>;

export const CUSTOM_COMPONENTS: Record<string, DynamicComponent> = {
  // Interactive tools loaded lazily
  'countdown-timer': dynamic(() =>
    import('@/components/tools/CountdownTimerTool').then((m) => m.CountdownTimerTool)
  ),
  'random-name-picker': dynamic(() =>
    import('@/components/tools/RandomNamePickerTool').then((m) => m.RandomNamePickerTool)
  ),
  'spin-the-wheel': dynamic(() =>
    import('@/components/tools/SpinTheWheelTool').then((m) => m.SpinTheWheelTool)
  ),
  'password-generator': dynamic(() =>
    import('@/components/tools/PasswordGeneratorTool').then((m) => m.PasswordGeneratorTool)
  ),
  'username-generator': dynamic(() =>
    import('@/components/tools/UsernameGeneratorTool').then((m) => m.UsernameGeneratorTool)
  ),
  'fake-address-generator': dynamic(() =>
    import('@/components/tools/FakeAddressGeneratorTool').then((m) => m.FakeAddressGeneratorTool)
  ),
  'qr-code-generator': dynamic(() =>
    import('@/components/tools/QrCodeGeneratorTool').then((m) => m.QrCodeGeneratorTool)
  ),
  'word-counter': dynamic(() =>
    import('@/components/tools/WordCounterTool').then((m) => m.WordCounterTool)
  ),
  'character-counter': dynamic(() =>
    import('@/components/tools/CharacterCounterTool').then((m) => m.CharacterCounterTool)
  ),
  'case-converter': dynamic(() =>
    import('@/components/tools/CaseConverterTool').then((m) => m.CaseConverterTool)
  ),
  'binary-to-text': dynamic(() =>
    import('@/components/tools/BinaryToTextTool').then((m) => m.BinaryToTextTool)
  ),
  'text-to-binary': dynamic(() =>
    import('@/components/tools/TextToBinaryTool').then((m) => m.TextToBinaryTool)
  ),
  'date-difference': dynamic(() =>
    import('@/components/tools/DateDifferenceTool').then((m) => m.DateDifferenceTool)
  ),
};
