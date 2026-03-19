// =================================================================
// SEARCH BAR — Demonstrates validation + event handling config
// =================================================================
// This component showcases config-driven behavior:
//
//   VALIDATION: The search input is validated using rules from
//   config.validations.searchQuery (required, minLength, etc.)
//
//   EVENT HANDLING: On submit, the "search" action from
//   config.actions is executed via the EventEngine.
//
// This is used inside the Navbar instead of a plain <input>.
// =================================================================
'use client';

import React, { useState } from 'react';
import type { AppConfig } from '../config/types';
import { executeAction } from '../engine/EventEngine';
import { validate } from '../engine/ValidationEngine';

type SearchBarProps = {
  config: AppConfig;
};

export function SearchBar({ config }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  /**
   * Handles search submission.
   * Validates the query using config rules, then executes the
   * "search" action from config via EventEngine.
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Live-validate before executing the action
    const rules = config.validations['searchQuery'];
    if (rules) {
      const result = validate(query, rules);
      if (!result.valid) {
        // Show the first error message (from config)
        setError(result.errors[0]);
        return;
      }
    }

    // Execute the config-driven search action
    executeAction('search', config, { value: query });
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setError(''); // Clear error on type
        }}
        placeholder='Search "milk, bread, eggs..."'
        className="w-full bg-white/20 backdrop-blur text-white placeholder:text-white/60
          text-sm rounded-xl px-4 py-2 pl-9 outline-none focus:bg-white/30 transition-colors"
      />
      <span className="absolute left-3 top-2 text-white/60 text-sm">🔍</span>
      {/* ── Config-driven validation error ──────────────────────── */}
      {error && (
        <p className="absolute top-full left-0 mt-1 text-xs text-red-200 bg-red-900/50 px-2 py-0.5 rounded">
          {error}
        </p>
      )}
    </form>
  );
}
