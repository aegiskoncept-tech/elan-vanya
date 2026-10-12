'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Faq } from '@/data/types';
import { DraftTag } from '@/components/ui/DraftTag';

interface AccordionProps {
  items: Faq[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3 divide-y divide-[var(--line)]">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const id = `faq-${idx}`;

        return (
          <div key={idx} className="pt-4 first:pt-0">
            <button
              onClick={() => toggle(idx)}
              type="button"
              className="w-full flex items-center justify-between text-left py-2 font-serif text-lg sm:text-xl text-[var(--heading)] hover:text-[var(--accent)] transition-colors gap-4"
              aria-expanded={isOpen}
              aria-controls={id}
            >
              <span className="font-normal">{item.q}</span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-[var(--muted)] transition-transform duration-300 shrink-0',
                  isOpen && 'rotate-180 text-[var(--accent)]'
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="py-3 text-sm text-[var(--muted)] leading-relaxed space-y-2">
                    <p>{item.a}</p>
                    {!item.verified && (
                      <div className="pt-1">
                        <DraftTag label="Pending client confirmation" />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
