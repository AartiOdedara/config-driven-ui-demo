// =================================================================
// OFFER STRIP — Top announcement bar driven by backend config
// =================================================================
// Text, background color, and text color all come from
// config.offerStrip. Change the announcement message, colors, etc.
// from the backend without any code changes.
// =================================================================
import React from 'react';
import type { OfferStripConfig } from '../config/types';

export function OfferStrip({ offer }: { offer: OfferStripConfig }) {
  return (
    <div
      className="text-center py-2 text-sm font-semibold tracking-wide animate-pulse"
      style={{ backgroundColor: offer.bgColor, color: offer.textColor }}
    >
      {offer.text}
    </div>
  );
}
