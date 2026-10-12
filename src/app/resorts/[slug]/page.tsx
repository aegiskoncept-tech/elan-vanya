import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/image';
import { Metadata } from 'next';
import { MapPin, Sparkles, Check, ArrowRight } from 'lucide-react';
import { resorts } from '@/data/resorts';
import { jawaiExperiences } from '@/data/experiences';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ScrollSpyNav } from '@/components/resorts/ScrollSpyNav';
import { GallerySection } from '@/components/resorts/GallerySection';
import { RoomCard } from '@/components/resorts/RoomCard';
import { AmenityGrid } from '@/components/resorts/AmenityGrid';
import { LocationSection } from '@/components/resorts/LocationSection';
import { FloatingBookingBar } from '@/components/resorts/FloatingBookingBar';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { DraftTag } from '@/components/ui/DraftTag';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return resorts.map((r) => ({
    slug: r.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resort = resorts.find((r) => r.slug === slug);

  if (!resort) {
    return { title: 'Resort Not Found' };
  }

  return {
    title: `${resort.name} | Élan Vanya`,
    description: resort.shortDescription,
    openGraph: {
      title: `${resort.name} | Élan Vanya`,
      description: resort.shortDescription,
      images: resort.heroImage ? [{ url: resort.heroImage }] : undefined,
    },
  };
}

export default async function ResortDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const resort = resorts.find((r) => r.slug === slug);

  if (!resort) {
    notFound();
  }

  // Schema.org Resort JSON-LD for Jawai only (without unverified rating or price)
  const resortJsonLd =
    resort.slug === 'jawai'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Resort',
          name: resort.name,
          description: resort.shortDescription,
          url: `https://elanvanya.com/resorts/${resort.slug}/`,
          image: resort.heroImage ? `https://elanvanya.com${resort.heroImage}` : undefined,
          address: {
            '@type': 'PostalAddress',
            addressLocality: resort.location.area,
            addressRegion: resort.location.state,
            addressCountry: 'IN',
          },
        }
      : null;

  // Placeholder / Coming soon variant
  if (resort.status === 'coming-soon') {
    return (
      <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: 'Our Resorts', href: '/resorts' },
              { label: resort.name },
            ]}
          />
        </div>

        <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-8 sm:p-14 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center mx-auto text-[var(--highlight)]">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--line)] text-xs font-semibold text-[var(--muted)]">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Sanctuary in Development &middot; Opening 2027</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-[var(--heading)]">
              {resort.name}
            </h1>
            <p className="text-xs uppercase tracking-widest text-[var(--accent)] font-bold">
              {resort.location.area}, {resort.location.region}
            </p>
            <p className="text-base text-[var(--muted)] leading-relaxed pt-2">
              {resort.tagline}
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4 text-sm text-[var(--muted)] leading-relaxed pt-4 border-t border-[var(--line)]">
            {resort.longDescription.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="pt-6">
            <Button
              href={`/contact?resort=${resort.slug}`}
              variant="primary"
              size="lg"
            >
              Register Early Interest
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Jawai Full Experience
  return (
    <div className="w-full">
      {resortJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(resortJsonLd) }}
        />
      )}

      {/* Hero Header with Breadcrumbs */}
      <section className="relative w-full min-h-[75vh] flex flex-col justify-between overflow-hidden bg-stone-950 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={resort.heroImage || '/images/jawai/aerial-dusk.jpg'}
            alt={resort.name}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/60" />
        </div>

        {/* Top breadcrumbs */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32">
          <Breadcrumbs
            items={[
              { label: 'Our Resorts', href: '/resorts' },
              { label: resort.name },
            ]}
          />
        </div>

        {/* Hero Title & Meta */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Open for Bookings</span>
          </div>

          <h1 className="text-white drop-shadow-md">
            {resort.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-stone-200">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>{resort.location.area}, {resort.location.district}, {resort.location.state}</span>
            </span>
            <span>&bull;</span>
            <span>{resort.tagline}</span>
          </div>
        </div>
      </section>

      {/* Sticky Section Sub-Navigation */}
      <ScrollSpyNav />

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section 1: Overview */}
        <section id="overview" className="py-12 scroll-mt-24 border-b border-[var(--line)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <span className="label-caps text-[var(--accent)]">
                The Retreat
              </span>
              <h2 className="font-serif">
                Earth-toned cottages at the edge of <span className="italic">leopard country</span>.
              </h2>
              <div className="space-y-4 text-base text-[var(--muted)] leading-relaxed">
                {resort.longDescription.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* Highlights Card */}
            <div className="lg:col-span-5 rounded-lg border border-[var(--line)] bg-[var(--surface-2)] p-6 sm:p-8 space-y-4">
              <h3 className="font-serif text-xl text-[var(--heading)]">
                Resort Highlights
              </h3>
              <ul className="space-y-3 text-sm text-[var(--fg)]">
                {resort.highlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-1" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Gallery */}
        <GallerySection gallery={resort.gallery} />

        {/* Section 3: Rooms & Rates */}
        <section id="rooms" className="py-16 scroll-mt-24 border-b border-[var(--line)]">
          <div className="space-y-2 mb-10 pb-4 border-b border-[var(--line)]">
            <span className="label-caps text-[var(--accent)]">
              Accommodations
            </span>
            <h2 className="font-serif">Safari Cottages &amp; Rates</h2>
            <p className="text-sm text-[var(--muted)]">
              All cottage suites offer private verandahs, handcrafted four-poster beds, and garden vistas.
            </p>
          </div>

          <div className="space-y-8">
            {resort.rooms.map((room) => (
              <RoomCard key={room.id} room={room} resortSlug={resort.slug} />
            ))}
          </div>
        </section>

        {/* Section 4: Amenities */}
        <AmenityGrid />

        {/* Section 5: Experiences */}
        <section id="experiences" className="py-16 scroll-mt-24 border-b border-[var(--line)]">
          <div className="space-y-2 mb-10 pb-4 border-b border-[var(--line)]">
            <span className="label-caps text-[var(--accent)]">
              Jawai Expeditions
            </span>
            <h2 className="font-serif">Curated Wilderness Experiences</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jawaiExperiences.map((exp) => (
              <div
                key={exp.id}
                className="rounded-lg border border-[var(--line)] bg-[var(--surface)] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  {exp.tag && (
                    <div className="absolute top-3 left-3">
                      <DraftTag label={exp.tag} />
                    </div>
                  )}
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-2xl text-[var(--heading)]">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {exp.fullDesc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Location */}
        <LocationSection resort={resort} />

        {/* Section 7: FAQs Accordion */}
        <section id="faqs" className="py-16 scroll-mt-24">
          <div className="space-y-2 mb-8 pb-4 border-b border-[var(--line)] flex items-center justify-between">
            <div>
              <span className="label-caps text-[var(--accent)]">
                Essential Information
              </span>
              <h2 className="font-serif">Frequently Asked Questions</h2>
            </div>
            <DraftTag label="Draft responses" />
          </div>

          <div className="max-w-3xl">
            <Accordion items={resort.faqs} />
          </div>
        </section>
      </div>

      {/* Floating Booking Bar */}
      <FloatingBookingBar resort={resort} />
    </div>
  );
}
