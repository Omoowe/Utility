'use client';

import React from 'react';
import { ToolConfig } from '@/lib/data/tools';
import { ToolCard } from './ToolCard';

interface RelatedToolsProps {
  tools: ToolConfig[];
}

export function RelatedTools({ tools }: RelatedToolsProps): React.JSX.Element {
  if (!tools || tools.length === 0) return <></>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map(({ compute: _c, ...tool }) => (
        <ToolCard key={tool.slug} tool={tool} size="sm" />
      ))}
    </div>
  );
}
