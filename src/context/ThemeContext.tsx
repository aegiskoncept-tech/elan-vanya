'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export type PaletteId = 'forest' | 'ochre' | 'night' | 'sage';

export interface PaletteInfo {
  id: PaletteId;
  name: string;
  lightAccent: string;
  darkAccent: string;
}

export const PALETTES: PaletteInfo[] = [
  {
    id: 'forest',
    name: 'Forest & Ivory',
    lightAccent: '#173D32',
    darkAccent: '#C7D6C1',
  },
  {
    id: 'ochre',
    name: 'Desert Ochre',
    lightAccent: '#8A4B22',
    darkAccent: '#E2A574',
  },
  {
    id: 'night',
    name: 'Night Safari',
    lightAccent: '#1E1F1C',
    darkAccent: '#E6D3A8',
  },
  {
    id: 'sage',
    name: 'Sage & Stone',
    lightAccent: '#4B6650',
    darkAccent: '#B8CDB9',
  },
];

interface ThemeContextType {
  palette: PaletteId;
  setPalette: (p: PaletteId) => void;
  resetAll: () => void;
}

const PaletteContext = createContext<ThemeContextType | undefined>(undefined);

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPaletteState] = useState<PaletteId>('forest');
  const { setTheme } = useTheme();

  // Load from localStorage or URL search params on mount
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlPalette = urlParams.get('palette') as PaletteId | null;
      const urlTheme = urlParams.get('theme');

      if (urlTheme && (urlTheme === 'light' || urlTheme === 'dark' || urlTheme === 'system')) {
        setTheme(urlTheme);
      }

      if (urlPalette && ['forest', 'ochre', 'night', 'sage'].includes(urlPalette)) {
        setPalette(urlPalette);
      } else {
        const savedPalette = localStorage.getItem('elan-vanya-palette') as PaletteId | null;
        if (savedPalette && ['forest', 'ochre', 'night', 'sage'].includes(savedPalette)) {
          setPalette(savedPalette);
        } else {
          document.documentElement.setAttribute('data-palette', 'forest');
        }
      }
    } catch {
      // fallback
    }
  }, [setTheme]);

  const setPalette = (p: PaletteId) => {
    setPaletteState(p);
    try {
      localStorage.setItem('elan-vanya-palette', p);
      document.documentElement.setAttribute('data-palette', p);
    } catch {
      // ignored
    }
  };

  const resetAll = () => {
    setPalette('forest');
    setTheme('system');
  };

  return (
    <PaletteContext.Provider value={{ palette, setPalette, resetAll }}>
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error('usePalette must be used within a PaletteProvider');
  }
  return context;
}
