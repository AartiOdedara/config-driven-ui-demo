'use client';

import React, { useState, useEffect } from 'react';
import { HeroSlide } from '../config/configLoader';

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`transition-all duration-700 ease-in-out ${
            i === current ? 'block' : 'hidden'
          }`}
        >
          <div
            className={`bg-gradient-to-r ${slide.bgGradient} rounded-2xl p-6 sm:p-8 text-white flex items-center justify-between min-h-[160px]`}
          >
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">{slide.title}</h2>
              <p className="text-sm sm:text-base opacity-90 mt-2 max-w-md">{slide.subtitle}</p>
              <button className="mt-4 bg-white/20 backdrop-blur hover:bg-white/30 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors">
                Order Now →
              </button>
            </div>
            <div className="text-6xl sm:text-8xl ml-4 hidden sm:block">{slide.emoji}</div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'bg-white w-5' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
