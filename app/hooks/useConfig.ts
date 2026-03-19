// =================================================================
// useConfig — Custom React hook for fetching backend config
// =================================================================
// Encapsulates all config-fetching logic:
//   - Calls fetchConfig() on mount and when event changes
//   - Manages loading, error, and config state
//   - Components/pages just call useConfig(event) and get data
//
// Usage:
//   const { config, loading, error } = useConfig(event);
// =================================================================
'use client';

import { useEffect, useState } from 'react';
import { fetchConfig } from '../config/configLoader';
import type { AppConfig } from '../config/types';

/** Return type of the useConfig hook */
type UseConfigResult = {
  config: AppConfig | null;
  loading: boolean;
  error: string | null;
};

/**
 * Fetches the full app config from the backend API.
 * Re-fetches whenever the event parameter changes.
 *
 * @param event - Optional event identifier (e.g. "valentine")
 */
export function useConfig(event: string): UseConfigResult {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state on every new fetch
    setLoading(true);
    setError(null);

    fetchConfig(event || undefined)
      .then((cfg) => {
        setConfig(cfg);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Config fetch failed:', err);
        setError(err.message || 'Failed to load config');
        setLoading(false);
      });
  }, [event]); // Re-run when event changes (e.g. user switches to valentine)

  return { config, loading, error };
}
