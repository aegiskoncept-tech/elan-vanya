'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll listener for 40px blur transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and handle Escape key on mobile menu open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our Resorts', href: '/resorts' },
    { name: 'Experiences', href: '/#experiences' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans',
          scrolled
            ? 'bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--line)] shadow-xs py-3.5'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="group flex flex-col focus:outline-hidden"
            aria-label="Élan Vanya Resorts & Retreats - Home"
          >
            <span
              className={cn(
                'font-serif text-2xl sm:text-[1.75rem] font-medium tracking-tight transition-colors',
                scrolled
                  ? 'text-[var(--heading)]'
                  : 'text-stone-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]'
              )}
            >
              Élan Vanya
            </span>
            <span
              className={cn(
                'label-caps text-[0.62rem] tracking-[0.24em] -mt-0.5 transition-colors',
                scrolled
                  ? 'text-[var(--muted)]'
                  : 'text-stone-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]'
              )}
            >
              Resorts &amp; Retreats
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center space-x-7 lg:space-x-9"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : link.href.startsWith('/#')
                  ? false
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'relative py-1 text-[0.78rem] uppercase font-semibold tracking-[0.18em] transition-colors duration-200',
                    scrolled
                      ? isActive
                        ? 'text-[var(--accent)] font-bold'
                        : 'text-[var(--fg)] hover:text-[var(--accent)]'
                      : isActive
                      ? 'text-white font-bold'
                      : 'text-stone-200 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] rounded-full transition-all"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Utilities (Theme toggle & Book CTA) */}
          <div className="hidden md:flex items-center space-x-3.5">
            <ThemeToggle />
            <Button href="/booking" variant="primary" size="sm">
              Book your stay
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(true)}
              type="button"
              className={cn(
                'p-2 rounded border transition-colors',
                scrolled
                  ? 'border-[var(--line)] text-[var(--fg)] bg-[var(--surface-2)]'
                  : 'border-white/30 text-white bg-black/20 backdrop-blur-xs'
              )}
              aria-label="Open Mobile Menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Navigation Overlay with Clip-Path Reveal */}
      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={cn(
          'fixed inset-0 z-50 md:hidden bg-[var(--surface)] text-[var(--fg)] flex flex-col justify-between p-6 transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]',
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto [clip-path:circle(150%_at_top_right)]'
            : 'opacity-0 pointer-events-none [clip-path:circle(0%_at_top_right)]'
        )}
      >
        <div className="flex items-center justify-between pb-6 border-b border-[var(--line)]">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex flex-col"
          >
            <span className="font-serif text-2xl font-medium text-[var(--heading)]">
              Élan Vanya
            </span>
            <span className="label-caps text-[0.62rem] text-[var(--muted)]">
              Resorts &amp; Retreats
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            type="button"
            className="p-2.5 rounded-full border border-[var(--line)] text-[var(--fg)] hover:bg-[var(--surface-2)] transition-colors"
            aria-label="Close Mobile Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col space-y-6 my-auto py-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif text-[var(--heading)] hover:text-[var(--accent)] transition-colors flex items-center justify-between group"
            >
              <span>{link.name}</span>
              <ArrowRight className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </nav>

        {/* Mobile Bottom Action & Info */}
        <div className="pt-6 border-t border-[var(--line)] flex flex-col gap-4">
          <Button
            href="/booking"
            variant="primary"
            size="md"
            className="w-full text-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book your stay
          </Button>
          <p className="text-xs text-[var(--muted)] text-center tracking-wider">
            Flagship: Élan Vanya Jawai, Rajasthan
          </p>
        </div>
      </div>
    </>
  );
}
