'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Laptop } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn('w-9 h-9 rounded-full border border-[var(--line)] opacity-50', className)} />
    );
  }

  const cycleTheme = () => {
    if (theme === 'system') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('system');
    }
  };

  const getLabel = () => {
    if (theme === 'system') return 'Theme: System (Click for Light)';
    if (theme === 'light') return 'Theme: Light (Click for Dark)';
    return 'Theme: Dark (Click for System)';
  };

  return (
    <button
      onClick={cycleTheme}
      type="button"
      className={cn(
        'relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-[var(--line)] bg-[var(--surface-2)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200 cursor-pointer shadow-sm',
        className
      )}
      aria-label={getLabel()}
      title={getLabel()}
    >
      {theme === 'system' ? (
        <Laptop className="w-4 h-4" />
      ) : resolvedTheme === 'dark' ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
      <span className="sr-only">{getLabel()}</span>
    </button>
  );
}
