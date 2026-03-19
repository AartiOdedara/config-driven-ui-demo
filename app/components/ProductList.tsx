// =================================================================
// PRODUCT LIST — Grid of product cards from backend config
// =================================================================
// Renders a responsive grid of ProductCard components.
// Each card receives the full config so it can use the EventEngine
// for the ADD button action.
// =================================================================
import React from 'react';
import type { Product, AppConfig } from '../config/types';
import { ProductCard } from './ProductCard';

type ProductListProps = {
  products: Product[];
  themeColor: string;
  config: AppConfig;  // Passed to each ProductCard for event handling
};

export function ProductList({ products, themeColor, config }: ProductListProps) {
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${config.productColumns}, minmax(0, 1fr))` }}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          themeColor={themeColor}
          config={config}
        />
      ))}
    </div>
  );
}