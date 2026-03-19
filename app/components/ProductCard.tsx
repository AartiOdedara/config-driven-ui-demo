// =================================================================
// PRODUCT CARD — Individual product tile with config-driven actions
// =================================================================
// The ADD button triggers the "addToCart" action from config.actions
// via the EventEngine. The action message is interpolated with the
// product name (e.g. "🛒 Milk added to cart!").
//
// Product data, tags, pricing — all from backend config.
// Theme color for styling — from config.theme.primaryColor.
// =================================================================
import React from 'react';
import type { Product, AppConfig } from '../config/types';
import { executeAction } from '../engine/EventEngine';

type ProductCardProps = {
  product: Product;
  themeColor: string;
  config: AppConfig;  // Needed for EventEngine action execution
};

export function ProductCard({ product, themeColor, config }: ProductCardProps) {
  // Calculate discount percentage for display
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  /**
   * Handles ADD button click.
   * Executes the "addToCart" action from config via EventEngine.
   * The action message supports {{productName}} interpolation.
   */
  const handleAddToCart = () => {
    executeAction('addToCart', config, { productName: product.name });
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col relative">
      {/* ── Config-driven product tag ─────────────────────────── */}
      {product.tag && (
        <span
          className="absolute top-2 left-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full text-white z-10"
          style={{ backgroundColor: themeColor }}
        >
          {product.tag}
        </span>
      )}
      <div className="flex items-center justify-center h-28 bg-gray-50 group-hover:bg-gray-100 transition-colors">
        <span className="text-5xl">{product.emoji}</span>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <span className="text-xs text-gray-400 font-medium">{product.unit}</span>
        <h4 className="font-semibold text-sm text-gray-800 mt-0.5 leading-tight line-clamp-2">{product.name}</h4>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div>
            <span className="font-bold text-base text-gray-900">&#8377;{product.price}</span>
            {discount > 0 && (
              <span className="text-xs text-gray-400 line-through ml-1">&#8377;{product.originalPrice}</span>
            )}
          </div>
          {/* ── Config-driven ADD action ──────────────────────── */}
          <button
            onClick={handleAddToCart}
            className="text-xs font-bold px-3 py-1.5 rounded-lg border-2 transition-colors"
            style={{ borderColor: themeColor, color: themeColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = themeColor;
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = themeColor;
            }}
          >
            ADD
          </button>
        </div>
        {discount > 0 && (
          <span className="text-[10px] font-semibold text-green-600 mt-1">{discount}% OFF</span>
        )}
      </div>
    </div>
  );
}
