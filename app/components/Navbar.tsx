import React from 'react';
import { ThemeConfig, DeliveryInfo } from '../config/configLoader';
import { staticSectionsConfig } from '../config/frontendConfig';

export function Navbar({
  theme,
  deliveryInfo,
  onEventChange,
  currentEvent,
}: {
  theme: ThemeConfig;
  deliveryInfo: DeliveryInfo;
  onEventChange: (event: string) => void;
  currentEvent: string;
}) {
  return (
    <nav
      className="sticky top-0 z-50 shadow-md"
      style={{
        background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Top row */}
        <div className="flex items-center justify-between">
          {/* Logo + Delivery Info */}
          <div className="flex items-center gap-3">
            <div className="text-2xl font-black text-white tracking-tight">
              {theme.event ? '💝' : '⚡'} {staticSectionsConfig.appName}
            </div>
            {theme.eventTagline && (
              <span className="hidden sm:inline text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
                {theme.eventTagline}
              </span>
            )}
          </div>

          {/* Event Switcher (Demo Controls) */}
          <div className="flex items-center gap-1 bg-white/10 rounded-full p-0.5">
            <button
              onClick={() => onEventChange('')}
              className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                !currentEvent
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              🛒 Normal
            </button>
            <button
              onClick={() => onEventChange('valentine')}
              className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                currentEvent === 'valentine'
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              💕 Valentine
            </button>
          </div>
        </div>

        {/* Delivery bar + Search */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1 text-white/90 text-xs">
            <span className="font-bold text-sm">📍</span>
            <div className="leading-tight">
              <div className="font-bold text-sm">{deliveryInfo.time}</div>
              <div className="text-[10px] opacity-80">{deliveryInfo.location}</div>
            </div>
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder='Search "milk, bread, eggs..."'
              className="w-full bg-white/20 backdrop-blur text-white placeholder:text-white/60
                text-sm rounded-xl px-4 py-2 pl-9 outline-none focus:bg-white/30 transition-colors"
            />
            <span className="absolute left-3 top-2 text-white/60 text-sm">🔍</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
