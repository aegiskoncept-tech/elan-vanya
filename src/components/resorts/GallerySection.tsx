'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { GalleryItem, GalleryCategory } from '@/data/types';
import { Lightbox } from '@/components/ui/Lightbox';
import { Maximize2, Images } from 'lucide-react';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export function GallerySection({ gallery }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'cottages', label: 'Cottages & Suites' },
    { id: 'dining', label: 'The Dining Hall' },
    { id: 'landscape', label: 'Landscape & Kopjes' },
  ];

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') return gallery;
    return gallery.filter((item) => item.category === selectedCategory);
  }, [gallery, selectedCategory]);

  // Featured photo is first or marked featured
  const featuredPhoto = filteredPhotos[0];
  const gridPhotos = filteredPhotos.slice(1);

  // If not expanded, show only initial 6 grid photos
  const displayedGrid = expanded ? gridPhotos : gridPhotos.slice(0, 5);
  const remainingCount = gridPhotos.length - 5;

  const openLightbox = (indexInFiltered: number) => {
    // Find index in master gallery
    const targetItem = filteredPhotos[indexInFiltered];
    const masterIndex = gallery.findIndex((g) => g.src === targetItem.src);
    setActivePhotoIndex(masterIndex !== -1 ? masterIndex : 0);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="py-16 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[var(--line)] pb-4">
        <div className="space-y-1">
          <span className="label-caps text-[var(--accent)]">
            Sanctuary Visuals
          </span>
          <h2 className="font-serif">The Photo Journal</h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setExpanded(false);
              }}
              type="button"
              className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[var(--accent)] text-[var(--on-accent)] border-[var(--accent)] font-semibold shadow-xs'
                  : 'bg-[var(--surface-2)] text-[var(--muted)] border-[var(--line)] hover:border-[var(--muted)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Layout: Featured Large + Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Featured Big Tile (Span 7) */}
        {featuredPhoto && (
          <div
            onClick={() => openLightbox(0)}
            className="md:col-span-7 relative aspect-[16/11] rounded-lg overflow-hidden border border-[var(--line)] group cursor-pointer shadow-sm hover:shadow-lg transition-all"
          >
            <Image
              src={featuredPhoto.src}
              alt={featuredPhoto.alt}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
              <span className="text-sm font-medium drop-shadow-sm">{featuredPhoto.caption}</span>
              <Maximize2 className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        )}

        {/* Small Tiles Grid (Span 5) */}
        <div className="md:col-span-5 grid grid-cols-2 gap-4">
          {displayedGrid.slice(0, 4).map((item, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx + 1)}
              className="relative aspect-square rounded-lg overflow-hidden border border-[var(--line)] group cursor-pointer shadow-xs hover:shadow-md transition-all"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Grid (if opened) */}
      {expanded && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {displayedGrid.slice(4).map((item, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx + 5)}
              className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[var(--line)] group cursor-pointer shadow-xs hover:shadow-md transition-all"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors" />
            </div>
          ))}
        </div>
      )}

      {/* +N More Photos Toggle Button */}
      {!expanded && remainingCount > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setExpanded(true)}
            type="button"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--line)] bg-[var(--surface-2)] text-[var(--heading)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
          >
            <Images className="w-4 h-4" />
            <span>Show +{remainingCount} more photos</span>
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      <Lightbox
        images={gallery}
        currentIndex={activePhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setActivePhotoIndex(newIdx)}
      />
    </section>
  );
}
