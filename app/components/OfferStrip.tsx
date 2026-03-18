import React from 'react';
import { OfferStrip as OfferStripType } from '../config/configLoader';

export function OfferStrip({ offer }: { offer: OfferStripType }) {
  return (
    <div
      className="text-center py-2 text-sm font-semibold tracking-wide animate-pulse"
      style={{ backgroundColor: offer.bgColor, color: offer.textColor }}
    >
      {offer.text}
    </div>
  );
}
