// =================================================================
// BANNER CARDS — Promotional banner grid from backend config
// =================================================================
import React from 'react';
import type { BannerCard } from '../config/types';

export function BannerCards({ banners }: { banners: BannerCard[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      {banners.map((b) => (
        <div
          key={b.id}
          className={`bg-gradient-to-br ${b.bgGradient} rounded-2xl p-5 text-white cursor-pointer
            hover:scale-[1.02] transition-transform duration-200 shadow-md`}
        >
          <div className="text-3xl mb-2">{b.emoji}</div>
          <h3 className="font-bold text-lg leading-tight">{b.title}</h3>
          <p className="text-sm opacity-90 mt-1">{b.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
