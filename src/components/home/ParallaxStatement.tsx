'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

export function ParallaxStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[60vh] sm:h-[75vh] flex items-center justify-center overflow-hidden bg-stone-950 text-white my-12"
    >
      {/* Background Image with subtle parallax */}
      <motion.div
        style={shouldReduceMotion ? {} : { y }}
        className="absolute inset-0 -top-20 -bottom-20 w-full"
      >
        <Image
          src="/images/jawai/aerial-hills.jpg"
          alt="Wide aerial perspective of Jawai granite hills at sunset"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/60" />
      </motion.div>

      {/* Statement Typography */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-4">
        <span className="label-caps text-amber-300 tracking-[0.3em]">
          The Jawai Wilderness
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-tight drop-shadow-md">
          Granite hills. Open sky. <span className="italic font-normal text-amber-200">Leopard country.</span>
        </h2>
        <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto font-light leading-relaxed pt-2">
          An ancient geological expanse where wilderness and pastoral life exist in sacred equilibrium.
        </p>
      </div>
    </section>
  );
}
