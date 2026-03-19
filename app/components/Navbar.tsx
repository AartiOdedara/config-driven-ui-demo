// =================================================================
// NAVBAR — Top navigation bar driven entirely by backend config
// =================================================================
// The app name, tagline, delivery info,
// and even the search bar validation — all come from config.
// =================================================================
import React from 'react';
import type { AppConfig } from '../config/types';
import { SearchBar } from './SearchBar';

type NavbarProps = {
  config: AppConfig;                       // Full config for SearchBar
  onEventChange: (event: string) => void;  // Callback to switch events
  currentEvent: string;                    // Current active event
};

export function Navbar({ config, onEventChange, currentEvent }: NavbarProps) {
  const { theme, deliveryInfo, appInfo } = config;

  return (
    <nav
      className="sticky top-0 z-50 shadow-md"
      style={{
        background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* ── Top row: App name + event switcher ─────────────── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* App name comes from config.appInfo (backend) */}
            <div className="text-2xl font-black text-white tracking-tight">
              {theme.event ? '💝' : '⚡'} {appInfo.name}
            </div>
            {/* Event tagline — only rendered if present in config */}
            {theme.eventTagline && (
              <span className="hidden sm:inline text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
                {theme.eventTagline}
              </span>
            )}
          </div>
          {/* ── Event switcher buttons ──────────────────────────── */}
          <div className="flex items-center gap-1 bg-white/10 rounded-full p-0.5">
            <button
              onClick={() => onEventChange('')}
              className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                !currentEvent
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              🛒 Normal
            </button>
            <button
              onClick={() => onEventChange('valentine')}
              className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                currentEvent === 'valentine'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              💕 Valentine
            </button>
          </div>
        </div>
        {/* ── Second row: Delivery info + search bar ──────────── */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1 text-white/90 text-xs">
            <span className="font-bold text-sm">📍</span>
            <div className="leading-tight">
              <div className="font-bold text-sm">{deliveryInfo.time}</div>
              <div className="text-[10px] opacity-80">{deliveryInfo.location}</div>
            </div>
          </div>
          {/* SearchBar — validates search input using config rules */}
          <SearchBar config={config} />
        </div>
      </div>
    </nav>
  );
}
