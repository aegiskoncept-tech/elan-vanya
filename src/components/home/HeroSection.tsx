'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown, Compass, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { luxuryEase, durations } from '@/lib/motion';

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden bg-stone-950 text-stone-100">
      {/* Background Image with 22s slow Ken Burns zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="relative w-full h-full"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.08, 1],
                  transition: {
                    duration: 22,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'reverse',
                  },
                }
          }
        >
          <Image
            src="/images/jawai/aerial-dusk.jpg"
            alt="Aerial view of Élan Vanya Jawai cottages lit at dusk with dramatic granite hills"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
        </motion.div>
        {/* Cinematic Scrim overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-stone-950/60" />
      </div>

      {/* Hero Headline & Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-36 sm:pt-44 pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.reveal, ease: luxuryEase, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15"
          >
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span className="label-caps text-[0.68rem] text-stone-200 tracking-[0.24em]">
              A collection of distinctive getaways
            </span>
          </motion.div>

          {/* Staggered Heading */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: durations.hero, ease: luxuryEase, delay: 0.25 }}
              className="text-white drop-shadow-md"
            >
              Find your <span className="italic font-normal text-amber-200/95">kind</span> of escape.
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.reveal, ease: luxuryEase, delay: 0.45 }}
            className="text-base sm:text-lg text-stone-200/90 max-w-xl leading-relaxed drop-shadow-xs font-light"
          >
            Earth-toned sanctuaries set in ancient granite lands. Immersive wilderness, handcrafted cottages, and deep desert stillness.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durations.reveal, ease: luxuryEase, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Button
              href="/resorts"
              variant="primary"
              size="lg"
              className="bg-white text-stone-900 hover:bg-stone-100 hover:text-stone-950 border-none shadow-xl"
            >
              Explore our resorts
            </Button>
            <Button
              href="/booking"
              variant="secondary"
              size="lg"
              className="bg-black/40 backdrop-blur-md text-white border-white/25 hover:bg-black/60 hover:border-white/50"
            >
              Plan your stay
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Meta Row & Scroll Cue */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: durations.reveal, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/15 text-xs text-stone-300"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium tracking-wide">
              Now open &middot; <strong className="text-white font-semibold">Élan Vanya Jawai</strong>, Pali District, Rajasthan
            </span>
          </div>

          <a
            href="#search-panel"
            className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors group cursor-pointer text-xs font-medium uppercase tracking-[0.15em]"
          >
            <span>Scroll to explore</span>
            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1 text-amber-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
