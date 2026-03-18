"use client";
import React, { useEffect, useState } from 'react';
import { getMergedConfig, MergedConfig } from './config/configLoader';
import { Navbar } from './components/Navbar';
import { OfferStrip } from './components/OfferStrip';
import { HeroCarousel } from './components/HeroCarousel';
import { BannerCards } from './components/Banner';
import { ProductList } from './components/ProductList';
import { CategorySection } from './components/CategorySection';

export default function HomePage() {
  const [config, setConfig] = useState<MergedConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    getMergedConfig(event || undefined).then((cfg) => {
      setConfig(cfg);
      setLoading(false);
    });
  }, [event]);

  // Skeleton loader
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

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-500">
      {/* Navbar - from backend config (theme + delivery info) */}
      <Navbar
        theme={config.theme}
        deliveryInfo={config.deliveryInfo}
        onEventChange={setEvent}
        currentEvent={event}
      />

      {/* Offer Strip - from backend config */}
      {config.staticSections.showOfferStrip && (
        <OfferStrip offer={config.offerStrip} />
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-4">
        {/* Hero Carousel - from backend config */}
        <HeroCarousel slides={config.heroCarousel} />

        {/* Categories - from FRONTEND config (local file, not API) */}
        {config.staticSections.showCategories && (
          <CategorySection themeColor={config.theme.primaryColor} />
        )}

        {/* Banner Cards - from backend config */}
        {config.staticSections.showBannerCards && (
          <BannerCards banners={config.banners} />
        )}

        {/* Products Section - from backend config */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">
              {config.theme.event
                ? `${config.theme.event} Specials`
                : 'Popular Products'}
            </h2>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full cursor-pointer"
              style={{ backgroundColor: config.theme.primaryColor + '15', color: config.theme.primaryColor }}
            >
              See All
            </span>
          </div>
          <ProductList products={config.products} themeColor={config.theme.primaryColor} />
        </div>

        {/* Config Source Indicator (for demo/session purposes) */}
        <div className="mt-8 mb-4 p-4 bg-white rounded-2xl border border-dashed border-gray-300 text-xs text-gray-500">
          <h4 className="font-bold text-gray-700 text-sm mb-2">Config Source (Demo Info)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-start gap-2">
              <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded font-bold text-[10px]">BACKEND</span>
              <span>Theme, Hero, Offer Strip, Products, Banners, Delivery Info</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-bold text-[10px]">FRONTEND</span>
              <span>Categories, Static Section Visibility, App Name/Tagline</span>
            </div>
          </div>
          <p className="mt-2 text-gray-400">
            Switch between Normal and Valentine using buttons in the navbar. The entire UI changes based on backend config — no code changes needed.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-center py-4 text-xs text-white/70"
        style={{
          background: `linear-gradient(135deg, ${config.theme.gradientFrom}, ${config.theme.gradientTo})`,
        }}
      >
        Config-Driven UI Demo | {config.staticSections.appName} | Built with Next.js + React
      </footer>
    </div>
  );
}
