You are a senior frontend engineer and luxury-hospitality web designer. Build a production-quality, client-presentation website for **Élan Vanya**, a resort brand whose first property is **Élan Vanya Jawai** (Jawai, Pali District, Rajasthan — leopard country, granite hills). The site will be shown to the client for review and deployed to **Netlify**. It must look premium, animate smoothly, and every link, filter, form and booking step must actually work.

BEFORE WRITING CODE: produce an Implementation Plan artifact (file tree, routes, components, data model, palette tokens, phase checklist) and a Task List artifact. Wait for my approval, then build phase by phase.

---

## 1. Hard constraints (read first)

- MUST use: **Next.js 15 (App Router) + TypeScript (strict) + Tailwind CSS v4 + Motion (`motion/react`, formerly Framer Motion) + `next-themes` + `lucide-react`**. Fonts via `next/font/google`: **Cormorant Garamond** (display) + **Manrope** (body).
- MUST deploy as a **static export** to Netlify: `output: 'export'` in `next.config.ts`, `images: { unoptimized: true }`, `trailingSlash: true`, and a `netlify.toml` with `command = "npm run build"` and `publish = "out"`. Every route must work with `generateStaticParams`. NO server actions, NO API routes, NO middleware, NO database (they break static export).
- MUST keep all content in typed local data files under `src/data/` (no CMS yet). Booking, enquiry and availability run through **mock service adapters** that a real booking engine (eZee / STAAH / AxisRooms), Razorpay and WhatsApp/email can replace later without UI changes.
- NEVER invent facts and present them as real: no fake addresses, phone numbers, emails, ratings, reviews, room sizes, policies, or real-time availability. Anything not supplied MUST be shown as a clearly marked placeholder or carry a small **"Sample"/"Demo rate"** tag (one reusable `<DraftTag>` component).
- NEVER put an image of Jawai on another resort's page. Resorts without photos use a designed placeholder visual, not stock photos.
- NEVER add authentication, a CMS, payments, analytics, cookie banners or any feature not listed here.
- Ask me before: adding any dependency not listed above, deleting files, or running destructive terminal commands. Work only inside this project folder.
- Do NOT deploy to Netlify yourself. Stop after a verified local production build and give me the deploy steps.

---

## 2. Assets

The photos are in `public/images/jawai/` (I will copy them in before you start; ask me if the folder is empty). Use these exact file names and captions:

| File | What it shows | Use for |
|---|---|---|
| aerial-dusk.jpg | Aerial: lit cottage row + lawn at dusk, hills behind | Home hero, Jawai hero, OG image |
| aerial-hills.jpg | Wide aerial: resort in farmland, hills at sunset | Full-width "Leopard country" statement, leopard experience |
| aerial-landscape.jpg | Aerial: compound among scrubland and fields | About hero |
| cottages-twilight.jpg (portrait) | Cottages lit at twilight, conical hill | Featured card, final CTA, golden-hour experience |
| bedroom-wide.jpg | Cottage: four-poster bed, sofa, wood floor | Room card, gallery |
| bedroom-balcony.jpg | Bedroom with glass doors to verandah | Room gallery, resort CTA band |
| bedroom-portrait.jpg (portrait) | Four-poster with gallery wall | Gallery |
| bed-detail.jpg (portrait) | Bed close-up, leopard-print cushions | Brand story |
| verandah-lantern.jpg (portrait) | Two armchairs under bamboo pergola, woven lantern | Brand story, verandah experience |
| verandah-day.jpg | Verandah in daylight over lawn | Contact page, gallery |
| verandah-room.jpg | Verandah + open door into bedroom (split view) | "Why Élan Vanya" section |
| sitting-nook.jpg | Sofa + coffee table by verandah doors | Gallery |
| window-seat.jpg (portrait) | Sofa by glass doors | Carousel |
| dining-hall.jpg | Dining hall, green ring pendant lights | Dining experience |
| dining-side.jpg | Dining hall side view, wildlife prints | Gallery |
| bath-shower.jpg | Ensuite with screened walk-in shower | Room gallery |
| bath-vanity.jpg | Vanity, granite counter, black-framed mirror | Gallery |

Every image gets descriptive alt text. Use `object-position` tuned per image so subjects never crop badly on mobile.

---

## 3. Design system

Mood: cinematic nature luxury, i.e. editorial travel magazine plus a modern booking product. Full-bleed photography alternates with calm editorial sections. Use asymmetric grids, generous whitespace, oversized serif headlines with an italic accent word, and small uppercase tracked labels. Avoid gold gradients, glassmorphism, rounded-everything and emoji.

- Type scale: h1 `clamp(3rem,8vw,7.2rem)`, h2 `clamp(2.3rem,5vw,4.2rem)`, h3 `clamp(1.6rem,2.6vw,2.2rem)`, body 16px / 1.6, labels 0.72rem uppercase with 0.22em tracking. Headings use `text-wrap: balance`.
- Radius 4px max. Buttons: uppercase 0.82rem, 0.14em tracking, arrow icon that slides 4px on hover.
- All colours MUST come from CSS variables (semantic tokens: `--bg`, `--surface`, `--surface-2`, `--line`, `--fg`, `--muted`, `--heading`, `--accent`, `--on-accent`, `--highlight`, `--draft-bg`, `--draft-fg`, `--danger`, `--ok`). Map them into Tailwind v4 via `@theme inline`. No hard-coded hex values in components. Text over photos always uses a fixed ivory colour plus a gradient scrim.

### 3a. Theme + palette switcher (required for the client presentation)

Build a **two-axis theming system**: mode (light / dark / system) × palette (4 options). Each palette defines BOTH light and dark token values, so all 8 combinations look intentional and pass WCAG AA contrast for body text and buttons.

| Palette id | Name | Light: bg / accent / highlight | Dark: bg / accent / highlight |
|---|---|---|---|
| `forest` (default) | Forest & Ivory | #F6F3EB / #173D32 / #9C5A2B | #0E1613 / #C7D6C1 / #D9925C |
| `ochre` | Desert Ochre (from the cottage walls) | #F8F1E7 / #8A4B22 / #2F5D50 | #17110C / #E2A574 / #8FC1AE |
| `night` | Night Safari | #F2F0EC / #1E1F1C / #A27B3C | #0B0C0B / #E6D3A8 / #C79A4F |
| `sage` | Sage & Stone | #F3F4EF / #4B6650 / #8C6A4A | #111612 / #B8CDB9 / #D0A57E |

Derive the remaining tokens (surface, line, muted, heading, on-accent) for each combo yourself and list them in the plan for review.

- Use `next-themes` with `attribute="class"` for light/dark. The palette is a `data-palette` attribute on `<html>`. Both persist in localStorage, with no flash on load (set them in an inline script before paint).
- **Navbar:** a permanent sun/moon/system theme toggle (icon button with accessible label).
- **Floating "Preview Lab" panel** (bottom-left pill that expands): palette swatches with names, a light/dark/system segmented control, and a "Reset" button. Colour changes animate smoothly (200ms transition on background/colour). Show it only when `NEXT_PUBLIC_PREVIEW_LAB=true` (set true in `.env` and Netlify for now) so it can be switched off before launch with no code change.
- Also support `?palette=ochre&theme=dark` URL parameters, so I can send the client direct links to specific looks.

---

## 4. Data model (`src/data/`)

```ts
type Resort = {
  id; slug; status: 'open' | 'coming-soon'; featured?: boolean;
  name; shortName; location: { area; district; state; region };
  address: string | null; tagline; shortDescription; longDescription: string[];
  highlights: string[]; heroImage: string | null; cardImage: string | null;
  gallery: { src; alt; caption; category: 'cottages'|'dining'|'landscape' }[];
  amenities: AmenityId[]; experiences: ExperienceId[]; rooms: Room[]; faqs: Faq[];
  placeholder?: boolean;
};
type Room = { id; resortId; name; description; images: string[]; maxAdults; maxChildren;
  maxOccupancy; bed; sizeSqft: number | null; amenities: string[]; plans: RatePlan[] };
type RatePlan = { id; name; includes: string[]; nightlyRate: number; currency: 'INR'; sample: boolean };
type Faq = { q; a; verified: boolean };
```

Seed data (use exactly):
- **Élan Vanya Jawai**: status open, featured. Location: Jawai, Pali District, Rajasthan. Address null. Tagline "Earth-toned cottages at the edge of leopard country." Highlights: private bamboo-shaded verandah per cottage; four-poster beds and full-height glass doors; open lawns facing Jawai's granite hills; shared dining hall with lantern-lit buffet counter. Amenities: swimming pool, dining hall, private verandahs, landscaped lawns, ensuite bathrooms, in-room telephone (only these, because they are visible in photos; no Wi-Fi or parking until confirmed). Experiences: Leopard country (tag "details to confirm"), Verandah evenings, The dining hall, Golden hour.
- **Room**: "Safari Cottage". Four-poster bed, size null ("To be confirmed"), sample occupancy of 2 adults + 1 child. Amenities: private verandah, sitting nook, ensuite with walk-in shower, ceiling fan, in-room telephone. Rate plans (both `sample: true`): "Room only" ₹14,500/night; "Stay & Safari" (cottage stay, breakfast, one shared jeep safari per stay) ₹21,500/night.
- **FAQs** (all `verified: false`, answers are placeholders asking the client to supply them): check-in/out times, how safaris are arranged, children policy, cancellation policy, pets.
- **Two placeholder resorts**, "Destination Two" and "Destination Three": status coming-soon, no images, no rooms. Their pages show a "Register interest" CTA that pre-selects the resort on the contact form.
- **Testimonials**: 3 placeholder quotes attributed "Sample guest", with a visible "Sample reviews" tag.
- **Brand**: Instagram `@elan_vanya` (real). Email, phone and address are placeholders like "[Reservations email to be added]".
- **Pricing config**: `taxRate: 0.18`, label "Taxes (demo rate 18%)", max 5 rooms.

---

## 5. Routes and pages

`/`, `/resorts`, `/resorts/[slug]`, `/about`, `/contact`, `/booking`, plus a designed `not-found.tsx`. Each route exports unique `metadata` (title, description, canonical, Open Graph image). Use a shared root layout with Nav, Footer, ThemeToggle and PreviewLab.

**Nav**: wordmark "Élan Vanya / Resorts & Retreats", links (Home, Our Resorts, Experiences → `/#experiences`, About Us, Contact), a "Book your stay" CTA and the theme toggle. It is transparent over hero images and becomes solid with a blur after 40px of scroll. The active link gets an animated underline. On mobile, a full-screen menu opens with a clip-path reveal; it has a focus trap, Esc to close and body scroll lock.

**Home** (in order):
1. Cinematic hero (aerial-dusk, slow 22s Ken Burns zoom). Eyebrow "A collection of distinctive getaways", headline "Find your *kind* of escape." with a staggered line reveal, CTAs "Explore our resorts" and "Plan your stay", and a meta row "Now open · Élan Vanya Jawai, Rajasthan" with a scroll cue.
2. Booking search panel overlapping the hero bottom: resort select (coming-soon options disabled), check-in, check-out, steppers for adults/children/rooms, and "Check availability". Horizontal on desktop, stacked on mobile.
3. Collection: large Jawai card plus two placeholder cards, and a "View all resorts" link.
4. Why Élan Vanya: 4 pillars with icons (Distinctive destinations, Thoughtfully designed stays, Experiences with a sense of place, Personal hospitality) and the verandah-room image.
5. Experiences (`id="experiences"`): 4 tall photo cards; the description reveals on hover (always visible on touch devices).
6. Brand story: "More than a stay. *A change of pace.*" with two offset images and a link to About.
7. Full-width statement "Granite hills. Open sky. Leopard country." on aerial-hills with subtle parallax.
8. "Moments from Jawai" carousel using scroll-snap, prev/next buttons, mouse drag and keyboard support.
9. Testimonial slider (sample-tagged).
10. Final CTA "Your next escape starts here." on cottages-twilight.
11. Footer: resort links, explore links, placeholder contacts, Instagram link, and Privacy / Terms / Cancellation shown as "To be added".

**/resorts**: editorial header, live search (name, area, state), region chips, amenity chips (AND logic), an "Open for bookings" toggle, sort (Featured / A–Z), "Clear filters", a result count, a designed empty state, and a mobile filter drawer. The grid uses varied card sizes and reads from data only.

**/resorts/[slug]**: hero with breadcrumbs (and BreadcrumbList JSON-LD); a sticky section sub-nav with scroll-spy (Overview, Gallery, Rooms, Amenities, Experiences, Location, FAQs); intro and highlights; a gallery with category tabs (featured tile + grid + "+N more"). The **lightbox** supports arrow keys, Esc, swipe, a focus trap and focus return. The page also has room cards with rate plans, an amenity icon grid, experience cards that open a modal, and a location section (area, "address to be supplied", a "Open in Google Maps" link to a Jawai search, and a styled map placeholder; no embedded iframe). It ends with an FAQ accordion (animated height, `aria-expanded`) and a **floating booking bar** that appears after scrolling past the hero and opens a bottom sheet with the search form locked to this resort. Placeholder resorts render a "coming soon" variant of the template. Unknown slugs return `notFound()`. Add `Resort` JSON-LD for Jawai only, with no rating, price or full address. Omit FAQPage schema while answers are unverified.

**/about**: hero (aerial-landscape), "A collection, not a chain.", a philosophy split section, 3 hospitality principles, a photo mosaic, featured properties and a CTA. All brand-history copy carries a "Proposed narrative" tag.

**/contact**: two columns. Left: image, placeholder reservation details, and the Instagram handle with a copy button. Right: an enquiry form (name, email, phone, preferred resort, check-in, check-out, guests, enquiry type [Resort booking / Event or celebration / Group stay / General enquiry], message, consent checkbox). Validate with **react-hook-form + zod** (ask first, since they are new dependencies) or a small hand-written validator. Show inline errors, keep values when validation fails, disable the button while submitting, and show a success state that says plainly: "This is a prototype. Your enquiry was not sent." Also add Netlify Forms attributes (`data-netlify="true"`, hidden form-name input and a static form stub in `public/`) so real submissions work once deployed.

---

## 6. Booking flow (`/booking`), top priority

A 5-step flow with a progress indicator: **Search → Rooms → Guest details → Review → Confirmation**.

- Shared state in a **Zustand** store (ask before installing) or React context + `useReducer`, persisted to sessionStorage. All entry points (nav CTA, home search, resort CTAs, floating bar) pre-fill it; resort pages preselect their resort.
- Validation: check-in must be today or later; check-out must be after check-in; at least 1 adult; at least 1 adult per room; 1–5 rooms; the resort must exist and be open.
- Rooms step: shows a skeleton while loading (650ms mock delay), then a context bar (resort, dates, nights, guests, "Edit search"). It lists rooms that fit occupancy (`adults ≤ maxAdults×rooms`, `adults+children ≤ maxOccupancy×rooms`, `children ≤ maxChildren×rooms`). Each rate plan shows its nightly rate, a "Demo rate" tag, an estimated total and a "Select" button. The empty state offers "Add a room and search again".
- Pricing: `subtotal = rate × nights × rooms`, `tax = round(subtotal × 0.18)`, `total = subtotal + tax`. Use `en-IN` currency formatting. Changing dates must recalculate everything.
- Guest step: first name, last name, email, phone (10–15 digits, `+` allowed), optional requests.
- Review step: a full breakdown with "Change" links back to each step (no data lost), a sample policy notice, and a required checkbox "I understand this is a demonstration booking."
- Confirmation: animated check, reference `EV-DEMO-XXXXXX`, a full summary, and a clear notice that no reservation, payment or email was made. Buttons: "Return home" and "Start a new booking".
- A sticky summary sidebar on desktop (image, dates, nights, guests, room, plan, breakdown) that collapses into an expandable summary on mobile.
- Services in `src/services/`: `availability.ts`, `pricing.ts`, `reservation.ts`, `enquiry.ts`, each exporting an interface plus a `Mock*` implementation with a `live: false` flag. Pricing logic must be pure functions.

---

## 7. Motion rules

- One shared easing token `[0.2, 0.7, 0.2, 1]` and durations of 0.25s (micro), 0.6s (reveal) and 1.1s (hero). Use page transitions with fade plus a 10px rise, applied via `template.tsx`.
- Scroll reveals use `whileInView` with `once: true` and `amount: 0.15`; images use a clip-path inset reveal; cards are staggered by 80ms.
- Hover effects: image scale 1.05 over 1.2s, title shifting 6px, arrow sliding.
- Everything MUST respect `prefers-reduced-motion` (use `useReducedMotion` and disable parallax and Ken Burns). Content MUST be readable without JavaScript animation finishing, with no permanently hidden elements and no scroll-jacking. Animate only transform, opacity and clip-path.

---

## 8. Quality bar and verification

- Semantic HTML, a single h1 per page, labelled form controls, visible focus rings, minimum 44px tap targets and no horizontal overflow at any width.
- After each phase, use the browser agent to check the site at **375px, 768px and 1440px** in **light and dark** and in **at least two palettes**. Fix anything that clips, overlaps or has low contrast, and record findings in the walkthrough.
- Final checks:
  - `npm run lint`, `tsc --noEmit` and `npm run build` must all pass with zero errors.
  - Serve `out/` locally and click through the full booking flow end to end, the resort filters (including the empty state), the gallery lightbox (keyboard included), the contact form (errors + success) and direct loads of `/resorts/jawai/` and `/resorts/unknown/`.
  - The Preview Lab hides when `NEXT_PUBLIC_PREVIEW_LAB=false`.
- Lighthouse on the home page: Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95. Lazy-load below-the-fold images and give the hero `priority`.

## 9. Build phases (stop and show me a walkthrough after each)

1. Project setup, tokens, 4 palettes × 2 modes, theme toggle, Preview Lab, Nav, Footer.
2. Home page.
3. `/resorts` and `/resorts/[slug]` with gallery and lightbox.
4. Booking flow and services.
5. About, Contact (with Netlify Forms), 404, metadata/JSON-LD and the Netlify config.
6. Full verification pass, then a final walkthrough listing every placeholder the client must supply (address, contacts, real rates, policies, reviews, safari details, extra resort data).

After each step, output: ✅ [what was completed] · 🔍 [what you verified] · ⏭️ [next step].

Done when: every route builds statically, the booking flow completes end to end, all 8 palette/mode combinations look correct and the Preview Lab works, all verification checks pass, and the `out/` folder is ready to drag and drop onto Netlify (or connect via Git) with the steps written in `README.md`.
