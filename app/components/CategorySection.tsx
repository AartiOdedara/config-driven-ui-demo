import React from 'react';
import { categoriesConfig } from '../config/frontendConfig';

export function CategorySection({ themeColor }: { themeColor: string }) {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-base text-gray-800 mb-3">Shop by Category</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categoriesConfig.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center min-w-[72px] cursor-pointer group"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl
                bg-gray-50 group-hover:scale-110 transition-transform duration-200 shadow-sm border border-gray-100"
            >
              {cat.emoji}
            </div>
            <span className="text-xs font-medium mt-1.5 text-gray-600 group-hover:font-semibold">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
