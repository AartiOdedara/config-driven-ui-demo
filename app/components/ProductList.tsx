import React from 'react';
import { Product } from '../config/configLoader';
import { ProductCard } from './ProductCard';

export function ProductList({ products, themeColor }: { products: Product[]; themeColor: string }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} themeColor={themeColor} />
      ))}
    </div>
  );
}
