import React from 'react';
import Link from 'next/link';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="pt-36 pb-28 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center mx-auto text-[var(--highlight)]">
        <Compass className="w-8 h-8" />
      </div>

      <span className="label-caps text-[var(--accent)] tracking-[0.25em]">
        404 &middot; Page Not Found
      </span>

      <h1 className="font-serif text-3xl sm:text-5xl text-[var(--heading)]">
        A Path Less Travelled
      </h1>

      <p className="text-base text-[var(--muted)] max-w-md mx-auto leading-relaxed">
        The destination or page you are seeking does not exist or has moved deeper into the wilderness.
      </p>

      <div className="pt-4 flex flex-wrap justify-center gap-4">
        <Button href="/" variant="primary" size="md">
          <Home className="w-4 h-4 mr-2" />
          <span>Return Home</span>
        </Button>
        <Button href="/resorts" variant="secondary" size="md">
          <span>Explore Resorts</span>
        </Button>
      </div>
    </div>
  );
}
