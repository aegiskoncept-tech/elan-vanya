'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sparkles, X, RotateCcw, Sun, Moon, Laptop, ChevronUp } from 'lucide-react';
import { usePalette, PALETTES, PaletteId } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

export function PreviewLab() {
  const isEnabled = process.env.NEXT_PUBLIC_PREVIEW_LAB === 'true';
  const [isOpen, setIsOpen] = useState(false);
  const { palette, setPalette, resetAll } = usePalette();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isEnabled || !mounted) return null;

  return (
    <aside
      aria-label="Design System Preview Controls"
      className="fixed bottom-4 left-4 z-50 font-sans"
    >
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] shadow-xl hover:border-[var(--accent)] transition-all duration-200 cursor-pointer group"
          aria-expanded={false}
          aria-label="Open Client Design System Preview Lab"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--highlight)] animate-pulse" />
          <span className="text-[0.74rem] uppercase font-semibold tracking-[0.14em] text-[var(--heading)]">
            Preview Lab
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--accent)] transition-transform" />
        </button>
      ) : (
        <div
          role="region"
          aria-label="Client Design System Preview Lab"
          className="w-80 p-4 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] shadow-2xl backdrop-blur-md transition-all duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--highlight)]" />
              <h3 className="text-xs uppercase font-bold tracking-[0.16em] text-[var(--heading)] m-0">
                Design System Lab
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-[var(--muted)] hover:text-[var(--fg)] rounded transition-colors"
              aria-label="Close Preview Lab"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Palette selector */}
          <div className="mt-3.5">
            <label className="block text-[0.68rem] uppercase font-bold tracking-[0.16em] text-[var(--muted)] mb-2">
              Color Palette
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PALETTES.map((p) => {
                const isSelected = palette === p.id;
                const activeAccent = resolvedTheme === 'dark' ? p.darkAccent : p.lightAccent;

                return (
                  <button
                    key={p.id}
                    onClick={() => setPalette(p.id)}
                    type="button"
                    className={cn(
                      'flex items-center gap-2 p-2 rounded border text-left transition-all duration-200 cursor-pointer',
                      isSelected
                        ? 'border-[var(--accent)] bg-[var(--surface-2)] shadow-sm ring-1 ring-[var(--accent)]'
                        : 'border-[var(--line)] hover:border-[var(--muted)] bg-[var(--surface)]'
                    )}
                  >
                    <span
                      className="w-4 h-4 rounded-full flex-shrink-0 border border-black/10"
                      style={{ backgroundColor: activeAccent }}
                    />
                    <div className="min-w-0">
                      <div className="text-[0.74rem] font-semibold text-[var(--fg)] truncate">
                        {p.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mode switch */}
          <div className="mt-4">
            <label className="block text-[0.68rem] uppercase font-bold tracking-[0.16em] text-[var(--muted)] mb-2">
              Appearance Mode
            </label>
            <div className="grid grid-cols-3 gap-1 p-1 bg-[var(--surface-2)] rounded border border-[var(--line)]">
              {(['light', 'dark', 'system'] as const).map((m) => {
                const isActive = theme === m;
                return (
                  <button
                    key={m}
                    onClick={() => setTheme(m)}
                    type="button"
                    className={cn(
                      'flex items-center justify-center gap-1.5 py-1.5 px-2 rounded text-[0.72rem] font-semibold capitalize transition-all cursor-pointer',
                      isActive
                        ? 'bg-[var(--surface)] text-[var(--heading)] shadow-xs font-bold'
                        : 'text-[var(--muted)] hover:text-[var(--fg)]'
                    )}
                  >
                    {m === 'light' && <Sun className="w-3.5 h-3.5" />}
                    {m === 'dark' && <Moon className="w-3.5 h-3.5" />}
                    {m === 'system' && <Laptop className="w-3.5 h-3.5" />}
                    {m}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset button */}
          <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between">
            <span className="text-[0.65rem] text-[var(--muted)]">
              Press Reset to return to defaults
            </span>
            <button
              onClick={resetAll}
              type="button"
              className="flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
