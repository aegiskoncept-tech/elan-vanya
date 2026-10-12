'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { brandConfig } from '@/data/config';
import { resorts } from '@/data/resorts';
import { DraftTag } from '@/components/ui/DraftTag';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--surface-2)] text-[var(--fg)] border-t border-[var(--line)] pt-16 pb-12 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--line)]">
          {/* Brand info (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-medium tracking-tight text-[var(--heading)]">
                Élan Vanya
              </span>
              <span className="block label-caps text-[0.66rem] text-[var(--muted)] tracking-[0.24em] mt-0.5">
                Resorts &amp; Retreats
              </span>
            </Link>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-sm">
              Distinctive wilderness sanctuaries celebrating tactile luxury, regional ecology, and the untamed rhythms of Rajasthan’s granite frontier.
            </p>
            <div className="pt-2">
              <a
                href={brandConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--line)] bg-[var(--surface)] text-xs font-semibold tracking-wider text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                aria-label="Follow Élan Vanya on Instagram"
              >
                <Instagram className="w-4 h-4 text-[var(--highlight)]" />
                <span>{brandConfig.instagram}</span>
                <ExternalLink className="w-3 h-3 text-[var(--muted)]" />
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div className="space-y-3">
            <h4 className="label-caps text-[0.72rem] text-[var(--heading)]">
              Destinations
            </h4>
            <ul className="space-y-2.5 text-sm">
              {resorts.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/resorts/${r.slug}`}
                    className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{r.name}</span>
                    {r.status === 'coming-soon' && (
                      <span className="text-[0.62rem] px-1.5 py-0.2 rounded bg-[var(--surface)] text-[var(--muted)] border border-[var(--line)]">
                        Soon
                      </span>
                    )}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/resorts"
                  className="text-xs uppercase font-bold tracking-wider text-[var(--accent)] hover:underline inline-block mt-1"
                >
                  View All Resorts &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="label-caps text-[0.72rem] text-[var(--heading)]">
              Experience
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="/#experiences" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                  Signature Safaris &amp; Dining
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                  Reservation Desk
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                  Corporate &amp; Group Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Placeholder Contact Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="label-caps text-[0.72rem] text-[var(--heading)]">
                Reservations
              </h4>
              <DraftTag label="Sample Info" />
            </div>
            <ul className="space-y-3 text-xs text-[var(--muted)]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[var(--highlight)] shrink-0 mt-0.5" />
                <span>{brandConfig.addressPlaceholder}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--highlight)] shrink-0" />
                <span className="italic">{brandConfig.emailPlaceholder}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--highlight)] shrink-0" />
                <span className="italic">{brandConfig.phonePlaceholder}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with legal status */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
          <div>
            &copy; {currentYear} {brandConfig.name} {brandConfig.descriptor}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span>Privacy Policy</span>
              <span className="text-[0.65rem] bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--line)]">To be added</span>
            </span>
            <span className="text-[var(--line)]">&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <span>Terms of Service</span>
              <span className="text-[0.65rem] bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--line)]">To be added</span>
            </span>
            <span className="text-[var(--line)]">&bull;</span>
            <span className="inline-flex items-center gap-1.5">
              <span>Cancellation Policy</span>
              <span className="text-[0.65rem] bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--line)]">To be added</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
