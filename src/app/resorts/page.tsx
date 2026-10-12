'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, X, SlidersHorizontal, Check } from 'lucide-react';
import { resorts } from '@/data/resorts';
import { jawaiAmenities } from '@/data/amenities';
import { ResortCard } from '@/components/resorts/ResortCard';
import { Button } from '@/components/ui/Button';

export default function ResortsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'az'>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Unique regions
  const regions = useMemo(() => {
    const list = Array.from(new Set(resorts.map((r) => r.location.region)));
    return ['all', ...list];
  }, []);

  // Filter & Sort logic
  const filteredResorts = useMemo(() => {
    let result = [...resorts];

    // Live search (name, area, state)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.location.area.toLowerCase().includes(q) ||
          r.location.state.toLowerCase().includes(q) ||
          r.location.region.toLowerCase().includes(q)
      );
    }

    // Region chip
    if (selectedRegion !== 'all') {
      result = result.filter((r) => r.location.region === selectedRegion);
    }

    // Open for bookings toggle
    if (onlyOpen) {
      result = result.filter((r) => r.status === 'open');
    }

    // Amenity chips (AND logic)
    if (selectedAmenities.length > 0) {
      result = result.filter((r) =>
        selectedAmenities.every((amenityId) => r.amenities.includes(amenityId))
      );
    }

    // Sort
    if (sortBy === 'featured') {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === 'az') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedRegion, onlyOpen, selectedAmenities, sortBy]);

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedAmenities([]);
    setOnlyOpen(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedRegion !== 'all' ||
    selectedAmenities.length > 0 ||
    onlyOpen ||
    sortBy !== 'featured';

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4 mb-12">
        <span className="label-caps text-[var(--accent)]">
          The Portfolio
        </span>
        <h1 className="font-serif">
          Our <span className="italic">Destinations</span> &amp; Retreats
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          From the kopjes of Pali District to upcoming mountain and river hideaways. Filter our collection by ecology, amenities, and reservation availability.
        </p>
      </div>

      {/* Top Filter & Search Controls Bar */}
      <div className="bg-[var(--surface)] border border-[var(--line)] rounded-lg p-4 sm:p-6 mb-8 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Live Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, area, or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--surface-2)] text-[var(--fg)] border border-[var(--line)] rounded-md pl-10 pr-4 py-2 text-sm focus:border-[var(--accent)] focus:outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--fg)]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort & Mobile Trigger */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2">
              <span className="label-caps text-[0.66rem] text-[var(--muted)]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'az')}
                className="bg-[var(--surface-2)] text-[var(--fg)] border border-[var(--line)] rounded px-3 py-1.5 text-xs font-semibold focus:outline-hidden cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="az">Alphabetical (A–Z)</option>
              </select>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(true)}
              type="button"
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border border-[var(--line)] bg-[var(--surface-2)] text-[var(--fg)] font-semibold"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Filters ({selectedAmenities.length + (onlyOpen ? 1 : 0) + (selectedRegion !== 'all' ? 1 : 0)})</span>
            </button>
          </div>
        </div>

        {/* Desktop Region Chips & Open toggle */}
        <div className="hidden md:flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[var(--line)]">
          {/* Region Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="label-caps text-[0.66rem] text-[var(--muted)] mr-1">Region:</span>
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                type="button"
                className={`text-xs px-3 py-1 rounded-full border transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-[var(--accent)] text-[var(--on-accent)] border-[var(--accent)] font-semibold shadow-xs'
                    : 'bg-[var(--surface-2)] text-[var(--muted)] border-[var(--line)] hover:border-[var(--muted)]'
                }`}
              >
                {reg === 'all' ? 'All Regions' : reg}
              </button>
            ))}
          </div>

          {/* Open For Bookings Toggle */}
          <label className="flex items-center gap-2 text-xs font-medium text-[var(--fg)] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyOpen}
              onChange={(e) => setOnlyOpen(e.target.checked)}
              className="w-4 h-4 accent-[var(--accent)] rounded cursor-pointer"
            />
            <span>Open for bookings only</span>
          </label>
        </div>

        {/* Desktop Amenity Chips (AND logic) */}
        <div className="hidden md:flex flex-wrap items-center gap-2 pt-2">
          <span className="label-caps text-[0.66rem] text-[var(--muted)] mr-1">Amenities:</span>
          {jawaiAmenities.map((amenity) => {
            const isSelected = selectedAmenities.includes(amenity.id);
            return (
              <button
                key={amenity.id}
                onClick={() => toggleAmenity(amenity.id)}
                type="button"
                className={`text-xs px-2.5 py-1 rounded border transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--surface-2)] border-[var(--accent)] text-[var(--accent)] font-semibold ring-1 ring-[var(--accent)]'
                    : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--line)] hover:border-[var(--muted)]'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-[var(--accent)]" />}
                <span>{amenity.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header: Count & Clear */}
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--line)] text-xs text-[var(--muted)]">
        <div>
          Showing <strong className="text-[var(--heading)] font-semibold">{filteredResorts.length}</strong> {filteredResorts.length === 1 ? 'retreat' : 'retreats'}
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            type="button"
            className="text-[var(--accent)] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear all filters</span>
          </button>
        )}
      </div>

      {/* Resorts Grid */}
      {filteredResorts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
          {filteredResorts.map((r) => (
            <ResortCard key={r.id} resort={r} featured={r.featured} />
          ))}
        </div>
      ) : (
        /* Designed Empty State */
        <div className="rounded-lg border border-dashed border-[var(--line)] bg-[var(--surface)] p-12 text-center max-w-lg mx-auto space-y-4 my-12">
          <div className="w-12 h-12 rounded-full bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center mx-auto text-[var(--muted)]">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl text-[var(--heading)]">
            No retreats match your criteria
          </h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            Try loosening your filters or resetting your search to explore all available destinations in our collection.
          </p>
          <div className="pt-2">
            <Button onClick={clearFilters} variant="primary">
              Reset all filters
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end md:hidden">
          <div className="w-full max-w-xs bg-[var(--surface)] h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
                <h3 className="font-serif text-xl text-[var(--heading)]">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded text-[var(--muted)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Region */}
              <div className="space-y-2">
                <span className="label-caps text-[0.66rem] text-[var(--muted)]">Region</span>
                <div className="flex flex-col gap-1.5">
                  {regions.map((reg) => (
                    <button
                      key={reg}
                      onClick={() => setSelectedRegion(reg)}
                      className={`text-left text-xs p-2 rounded ${
                        selectedRegion === reg
                          ? 'bg-[var(--accent)] text-[var(--on-accent)] font-semibold'
                          : 'bg-[var(--surface-2)] text-[var(--fg)]'
                      }`}
                    >
                      {reg === 'all' ? 'All Regions' : reg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Open toggle */}
              <label className="flex items-center gap-2 text-xs font-medium text-[var(--fg)] pt-2 border-t border-[var(--line)]">
                <input
                  type="checkbox"
                  checked={onlyOpen}
                  onChange={(e) => setOnlyOpen(e.target.checked)}
                  className="w-4 h-4 accent-[var(--accent)]"
                />
                <span>Open for bookings only</span>
              </label>

              {/* Amenities */}
              <div className="space-y-2 pt-2 border-t border-[var(--line)]">
                <span className="label-caps text-[0.66rem] text-[var(--muted)]">Amenities</span>
                <div className="flex flex-col gap-1.5">
                  {jawaiAmenities.map((amenity) => {
                    const isSelected = selectedAmenities.includes(amenity.id);
                    return (
                      <button
                        key={amenity.id}
                        onClick={() => toggleAmenity(amenity.id)}
                        className={`text-left text-xs p-2 rounded flex items-center justify-between ${
                          isSelected
                            ? 'bg-[var(--surface-2)] text-[var(--accent)] font-bold border border-[var(--accent)]'
                            : 'bg-[var(--surface-2)] text-[var(--fg)]'
                        }`}
                      >
                        <span>{amenity.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--line)] flex gap-2">
              <button
                onClick={clearFilters}
                className="w-1/2 py-2.5 text-xs font-semibold border border-[var(--line)] rounded"
              >
                Reset
              </button>
              <Button
                onClick={() => setMobileFiltersOpen(false)}
                variant="primary"
                className="w-1/2"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
