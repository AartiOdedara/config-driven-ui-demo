// =================================================================
// SECTION RENDERER — The heart of the config-driven page
// =================================================================
// This component iterates the ordered "layout" array from the
// backend config and renders each section dynamically.
//
// How it works:
//   1. Receives the full AppConfig and an AppContext
//   2. For each item in config.layout:
//      a. Evaluates visibility via ConditionalEngine
//      b. Maps the "type" string to a React component via registry
//      c. Renders the component with appropriate props from config
//
// To add a new section type:
//   1. Create the component
//   2. Add it to the SECTION_REGISTRY below
//   3. Add the section to the layout array in the backend config
//   That's it — no other code changes needed.
// =================================================================
'use client';

import React from 'react';
import type { AppConfig } from '@/app/config/types';
import { evaluateCondition, type AppContext } from './ConditionalEngine';

// ── Component imports ────────────────────────────────────────────
import { HeroCarousel } from '@/app/components/HeroCarousel';
import { OfferStrip } from '@/app/components/OfferStrip';
import { CategorySection } from '@/app/components/CategorySection';
import { BannerCards } from '@/app/components/Banner';
import { ProductList } from '@/app/components/ProductList';
import { PromoCodeInput } from '@/app/components/PromoCodeInput';

// =================================================================
// SECTION REGISTRY — Maps "type" strings from config to components
// =================================================================
// Each entry is a function that receives the full config and returns
// a React element. This indirection lets the backend control which
// components appear and in what order.
// =================================================================
const SECTION_REGISTRY: Record<
  string,
  (config: AppConfig) => React.ReactNode
> = {
  // ── Offer Strip — top announcement bar ──────────────────────
  OfferStrip: (config) => (
    <OfferStrip offer={config.offerStrip} />
  ),

  // ── Hero Carousel — rotating banners ────────────────────────
  HeroCarousel: (config) => (
    <HeroCarousel slides={config.heroCarousel} config={config} />
  ),

  // ── Category chips — shop by category ───────────────────────
  CategorySection: (config) => (
    <CategorySection
      categories={config.categories}
      themeColor={config.theme.primaryColor}
    />
  ),

  // ── Banner cards — promotional cards grid ───────────────────
  BannerCards: (config) => (
    <BannerCards banners={config.banners} />
  ),

  // ── Promo code input — demonstrates validation + event handling
  PromoCodeInput: (config) => (
    <PromoCodeInput config={config} />
  ),

  // ── Product list — product grid with ADD buttons ────────────
  ProductList: (config) => (
    <div className="mb-6">
      {/* Section header with dynamic title based on event */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-800">
          {config.theme.event
            ? `${config.theme.event} Specials`
            : 'Popular Products'}
        </h2>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full cursor-pointer"
          style={{
            backgroundColor: config.theme.primaryColor + '15',
            color: config.theme.primaryColor,
          }}
        >
          See All
        </span>
      </div>
      <ProductList
        products={config.products}
        themeColor={config.theme.primaryColor}
        config={config}
      />
    </div>
  ),
};

// =================================================================
// SectionRenderer component
// =================================================================
type SectionRendererProps = {
  config: AppConfig;
  context: AppContext;
};

export function SectionRenderer({ config, context }: SectionRendererProps) {
  return (
    <>
      {config.layout.map((section) => {
        // ── Step 1: Evaluate visibility via ConditionalEngine ──
        const condition = config.conditions[section.id];
        const isVisible = evaluateCondition(condition, context);

        // If the condition says hidden, skip rendering entirely
        if (!isVisible) return null;

        // ── Step 2: Look up the component in the registry ─────
        const renderFn = SECTION_REGISTRY[section.type];

        if (!renderFn) {
          // Unknown section type — log a warning and skip
          console.warn(
            `SectionRenderer: unknown section type "${section.type}" (id: "${section.id}")`
          );
          return null;
        }

        // ── Step 3: Render the component ──────────────────────
        return (
          <React.Fragment key={section.id}>
            {renderFn(config)}
          </React.Fragment>
        );
      })}
    </>
  );
}
