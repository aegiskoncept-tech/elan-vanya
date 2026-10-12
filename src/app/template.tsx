'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { luxuryEase, durations } from '@/lib/motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: durations.reveal,
        ease: luxuryEase,
      }}
      className="flex-grow flex flex-col w-full"
    >
      {children}
    </motion.div>
  );
}
