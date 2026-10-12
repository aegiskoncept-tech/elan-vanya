import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { PaletteProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PreviewLab } from '@/components/layout/PreviewLab';
import './globals.css';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://elanvanya.com'),
  title: {
    default: 'Élan Vanya | Luxury Wilderness Resorts & Retreats',
    template: '%s | Élan Vanya',
  },
  description:
    'Experience curated wilderness luxury at Élan Vanya Jawai, Rajasthan. Private verandahs, four-poster cottages, and authentic leopard country encounters.',
  keywords: [
    'Élan Vanya',
    'Jawai Resort',
    'Luxury Safari Rajasthan',
    'Leopard Safari Jawai',
    'Boutique Wilderness Retreat',
    'Pali Rajasthan Resort',
  ],
  authors: [{ name: 'Élan Vanya Hospitality' }],
  openGraph: {
    title: 'Élan Vanya | Luxury Wilderness Resorts & Retreats',
    description:
      'Earth-toned cottages at the edge of leopard country. Explore Élan Vanya Jawai, Rajasthan.',
    url: 'https://elanvanya.com',
    siteName: 'Élan Vanya Resorts',
    images: [
      {
        url: '/images/jawai/aerial-dusk.jpg',
        width: 1200,
        height: 800,
        alt: 'Aerial dusk view of Élan Vanya Jawai cottages against granite hills',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Élan Vanya | Luxury Wilderness Resorts & Retreats',
    description: 'Earth-toned cottages at the edge of leopard country.',
    images: ['/images/jawai/aerial-dusk.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-palette="forest">
      <head>
        {/* Anti-flash inline script to apply saved or queried palette before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var p = localStorage.getItem('elan-vanya-palette') || 'forest';
                  var params = new URLSearchParams(window.location.search);
                  var urlP = params.get('palette');
                  if (urlP && ['forest', 'ochre', 'night', 'sage'].indexOf(urlP) !== -1) {
                    p = urlP;
                  }
                  document.documentElement.setAttribute('data-palette', p);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${cormorantGaramond.variable} ${manrope.variable} min-h-screen flex flex-col font-sans bg-[var(--bg)] text-[var(--fg)] selection:bg-[var(--accent)] selection:text-[var(--on-accent)]`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PaletteProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <PreviewLab />
          </PaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
