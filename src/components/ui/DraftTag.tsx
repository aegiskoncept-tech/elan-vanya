'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface DraftTagProps {
  label?: string;
  variant?: 'sample' | 'demo' | 'proposed' | 'custom';
  className?: string;
}

export function DraftTag({ label, variant = 'sample', className }: DraftTagProps) {
  const text =
    label ||
    (variant === 'demo'
      ? 'Demo rate'
      : variant === 'proposed'
      ? 'Proposed narrative'
      : 'Sample review');

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] rounded-[3px] border',
        'bg-[var(--draft-bg)] text-[var(--draft-fg)] border-[var(--draft-fg)]/20',
        className
      )}
      title="Sample placeholder content for client presentation"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--draft-fg)]/60 animate-pulse" />
      {text}
    </span>
  );
}
