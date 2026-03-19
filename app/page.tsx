// =================================================================
// PAGE.TSX — The main page, now ultra-thin thanks to config-driven UI
// =================================================================
// This page does almost nothing itself:
//   1. Uses the useConfig hook to fetch ALL config from the backend
//   2. Renders the Navbar (with config)
//   3. Delegates the entire body to SectionRenderer (config-driven)
//   4. Renders a footer
//
// The SectionRenderer reads config.layout (an ordered array) and
// renders each section dynamically. Page structure, visibility,
// content — everything is controlled by the backend config.
// =================================================================
"use client";
import React, { useState } from 'react';
import { useConfig } from './hooks/useConfig';
import { Navbar } from './components/Navbar';
import { SectionRenderer } from './engine/SectionRenderer';

export default function HomePage() {
  // Event state — switches between normal and valentine themes
  const [event, setEvent] = useState<string>('');

  // Fetch ALL config from the backend (no frontend config anymore)
  const { config, loading, error } = useConfig(event);

  // ── Loading skeleton ────────────────────────────────────────────
  if (loading || !config) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-24 bg-gray-200 animate-pulse" />
        <div className="max-w-6xl mx-auto p-4 space-y-4">
          <div className="h-40 bg-gray-200 rounded-2xl animate-pulse" />
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Error state ─────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <p className="text-red-500 font-bold text-lg mb-2">Failed to load config</p>
          <p className="text-gray-500 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ── App context for conditional rendering ───────────────────────
  // This object is passed to the ConditionalEngine to evaluate
  // visibility rules. Extend it with cart state, user role, etc.
  const appContext = { event };

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-500">
      {/* ── Navbar: theme, delivery info, search — all from config ── */}
      <Navbar
        config={config}
        onEventChange={setEvent}
        currentEvent={event}
      />

      {/* ── Main content: SectionRenderer drives the entire body ── */}
      {/* It reads config.layout and renders sections in order,     */}
      {/* evaluating conditional visibility for each section.        */}
      <main className="max-w-6xl mx-auto px-4 py-4">
        <SectionRenderer config={config} context={appContext} />

        {/* ── Architecture info panel (for demo purposes) ────────── */}
        <div className="mt-8 mb-4 p-4 bg-white rounded-2xl border border-dashed border-gray-300 text-xs text-gray-500">
          <h4 className="font-bold text-gray-700 text-sm mb-2">
            Config-Driven Architecture (Demo Info)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-start gap-2">
              <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded font-bold text-[10px]">
                BACKEND API
              </span>
              <span>
                Theme, Hero, Offer Strip, Products, Banners, Categories,
                App Info, Layout, Actions, Conditions, Validations
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded font-bold text-[10px]">
                ENGINES
              </span>
              <span>
                SectionRenderer (layout), ConditionalEngine (visibility),
                EventEngine (actions), ValidationEngine (input rules)
              </span>
            </div>
          </div>
          <p className="mt-2 text-gray-400">
            100% backend-driven. Switch between Normal and Valentine using
            navbar buttons. The entire UI — layout, products, theme, actions,
            validations — changes based on backend config. Zero code changes.
          </p>
        </div>
      </main>

      {/* ── Footer — themed from config ──────────────────────────── */}
      <footer
        className="text-center py-4 text-xs text-white/70"
        style={{
          background: `linear-gradient(135deg, ${config.theme.gradientFrom}, ${config.theme.gradientTo})`,
        }}
      >
        Config-Driven UI Demo | {config.appInfo.name} | Built with Next.js + React
      </footer>
    </div>
  );
}
