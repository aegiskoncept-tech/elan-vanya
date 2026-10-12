export const luxuryEase = [0.2, 0.7, 0.2, 1] as const;

export const durations = {
  micro: 0.25,
  reveal: 0.6,
  hero: 1.1,
} as const;

export const fadeInRise = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: durations.reveal, ease: luxuryEase } },
  exit: { opacity: 0, y: -10, transition: { duration: durations.micro, ease: luxuryEase } },
};

export const staggerContainer = (staggerDelay = 0.08) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

export const revealChild = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.reveal,
      ease: luxuryEase,
    },
  },
};

export const clipPathReveal = {
  initial: { clipPath: 'inset(10% 0 10% 0 round 4px)', opacity: 0 },
  animate: {
    clipPath: 'inset(0% 0 0% 0 round 4px)',
    opacity: 1,
    transition: { duration: durations.hero, ease: luxuryEase },
  },
};
