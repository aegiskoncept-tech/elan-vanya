'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  showArrow?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  showArrow = true,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = cn(
    'btn-luxury group transition-all duration-300 font-semibold uppercase tracking-[0.14em] text-[0.82rem] rounded-[4px] cursor-pointer inline-flex items-center justify-center gap-2 select-none disabled:opacity-50 disabled:pointer-events-none',
    {
      // primary
      'bg-[var(--accent)] text-[var(--on-accent)] hover:opacity-90 shadow-sm active:scale-[0.99]':
        variant === 'primary',
      // secondary
      'bg-[var(--surface-2)] text-[var(--fg)] border border-[var(--line)] hover:bg-[var(--surface)] hover:border-[var(--muted)]':
        variant === 'secondary',
      // outline
      'bg-transparent text-[var(--fg)] border border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--accent)]':
        variant === 'outline',
      // ghost
      'bg-transparent text-[var(--fg)] hover:text-[var(--accent)] hover:bg-[var(--surface-2)]':
        variant === 'ghost',
    },
    {
      'px-3.5 py-1.5 min-h-[38px] text-[0.76rem]': size === 'sm',
      'px-6 py-3 min-h-[44px] text-[0.82rem]': size === 'md',
      'px-8 py-4 min-h-[50px] text-[0.88rem]': size === 'lg',
    },
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          className="btn-arrow w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {content}
    </button>
  );
}
