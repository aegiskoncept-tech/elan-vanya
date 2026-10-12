# Élan Vanya — Luxury Wilderness Resorts & Retreats

A production-quality, client-presentation website built with **Next.js 15 (App Router)**, **TypeScript (Strict)**, **Tailwind CSS v4**, **Motion (`motion/react`)**, and **next-themes**. Optimized for static export and deployment to **Netlify**.

---

## 🚀 Key Features

1. **Cinematic Design System**:
   - Two-axis theming system: **4 Palettes** (`Forest & Ivory`, `Desert Ochre`, `Night Safari`, `Sage & Stone`) &times; **2 Modes** (`Light`, `Dark`).
   - Accessible sun/moon/system toggle in navbar.
   - Interactive **Preview Lab** floating panel (toggled via `NEXT_PUBLIC_PREVIEW_LAB`).
   - Direct client URL parameter linking (e.g., `?palette=ochre&theme=dark`).
2. **Editorial Portfolio & Destination Pages**:
   - `/resorts`: Live search, region chips, AND-logic amenity filters, booking toggle, sorting, and empty state.
   - `/resorts/jawai`: Authentic high-resolution photography, scroll-spy section sub-nav, categorized gallery tabs with keyboard-accessible Lightbox modal, verified amenities, location guides, and collapsible FAQ accordions.
   - Dedicated "Coming Soon" templates for planned retreats (Destination Two & Three).
3. **End-to-End 5-Step Booking Flow** (`/booking`):
   - **Step 1 (Search)**: Date ranges, room counts (1–5), adult/child occupancy limits.
   - **Step 2 (Rooms)**: 650ms loading skeleton, capacity filtering, sample rate packages.
   - **Step 3 (Guests)**: Strict form validation (names, emails, phone numbers).
   - **Step 4 (Review)**: Comprehensive breakdown with change links and demo disclaimer.
   - **Step 5 (Confirmation)**: Generated `EV-DEMO-XXXXXX` reference, itinerary recap, and clear prototype notice.
   - Responsive sticky summary sidebar that expands/collapses on mobile.
4. **Editorial Pages & Prototype Netlify Forms**:
   - `/about`: Brand genesis, 3 hospitality tenets, photo mosaic.
   - `/contact`: Reservations desk contacts, Instagram handle with copy button, validated contact form, and static Netlify form detection stub (`public/__forms.html`).
   - `/not-found`: Designed luxury 404 page.

---

## 🛠️ Local Development & Build Commands

```bash
# Install dependencies
npm install

# Run dev server locally on port 3030
npm run dev -- --port 3030

# Verify TypeScript types
npx tsc --noEmit

# Compile production static export to out/
npm run build
```

---

## 🌐 Netlify Deployment Guide

This project is configured as a **100% static export** (`output: 'export'` in `next.config.ts`), requiring no Node server runtime, API routes, or middleware.

### Option A: Drag & Drop (Instant)
1. Run `npm run build`.
2. Locate the generated `out/` folder in the project root.
3. Log into your [Netlify Dashboard](https://app.netlify.com).
4. Drag and drop the `out/` directory into the Netlify "Sites" area.

### Option B: Git Repository Connection
1. Push the repository to GitHub, GitLab, or Bitbucket.
2. In Netlify, click **Add new site > Import an existing project**.
3. Select this repository.
4. Build configuration (automatically read from `netlify.toml`):
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
5. Under **Environment variables**, set:
   - `NEXT_PUBLIC_PREVIEW_LAB` = `true` (or `false` for production client launch)

---

## 📋 Client Supply Inventory (Required Before Live Launch)

To transition from prototype presentation to live commercial production, the client must supply the following real data points:

1. **Registered & Physical Address**:
   - Exact postal address and GPS coordinates for Élan Vanya Jawai to replace `[Registered office address to be added]`.
2. **Contact Details**:
   - Official reservations email to replace `[Reservations email to be added]`.
   - Official phone and WhatsApp reservations helpline to replace `[Reservations phone to be added]`.
3. **Rates & Room Inventory**:
   - Live nightly room rates and seasonal meal plans to replace demo tags (`₹14,500` / `₹21,500`).
   - Exact square footage (`sizeSqft`) for the Safari Cottage suite.
4. **Policies & Verified Answers**:
   - Official check-in and check-out timings.
   - Official safari booking arrangements, permits, and tracker inclusions.
   - Finalized child policy, extra bed pricing, and pet policy.
   - Official cancellation, modification, and refund terms.
5. **Guest Reviews & Narrative**:
   - Authenticated guest reviews to replace the 3 sample-tagged quotes.
   - Final approved copy for brand history and corporate story.
6. **Integration Credentials**:
   - Booking Engine API (AxisRooms / eZee / STAAH) adapter keys to replace `MockAvailabilityService`.
   - Payment Gateway keys (Razorpay / Stripe) to activate live checkout.
