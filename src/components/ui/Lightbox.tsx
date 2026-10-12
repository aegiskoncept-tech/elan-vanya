'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '@/data/types';

interface LightboxProps {
  images: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  triggerRef,
}: LightboxProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard navigation & Esc handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Body scroll lock & focus management
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the close button or modal container
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      // Focus return to trigger
      triggerRef?.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, triggerRef]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    if (diff > 50) {
      handlePrev();
    } else if (diff < -50) {
      handleNext();
    }
    touchStartX.current = null;
  };

  if (!isOpen || images.length === 0) return null;

  const currentItem = images[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      ref={modalRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-md focus:outline-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header: Counter & Close */}
      <div className="flex items-center justify-between text-white/80 py-2 border-b border-white/10">
        <span className="text-xs font-semibold tracking-widest uppercase">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          type="button"
          className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
          aria-label="Close image lightbox (Esc)"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Frame & Navigation Buttons */}
      <div className="relative flex-1 flex items-center justify-center my-4">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          type="button"
          className="absolute left-2 sm:left-6 z-10 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all backdrop-blur-xs"
          aria-label="Previous image (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Active Image */}
        <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
          <Image
            src={currentItem.src}
            alt={currentItem.alt}
            fill
            sizes="90vw"
            priority
            className="object-contain"
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          type="button"
          className="absolute right-2 sm:right-6 z-10 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all backdrop-blur-xs"
          aria-label="Next image (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Caption */}
      <div className="text-center py-2 max-w-2xl mx-auto">
        <p className="text-sm font-light text-stone-200">
          {currentItem.caption}
        </p>
      </div>
    </div>
  );
}
