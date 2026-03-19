// =================================================================
// CONFIG LOADER — Backend-only config fetching
// =================================================================
// ALL config comes from the
// backend API. This file simply fetches and returns it.
//
// Why keep this file at all?
//   - Single place to change the fetch URL / add headers / caching
//   - Abstraction: components import fetchConfig(), not raw fetch()
//   - Easy to add retry logic, auth tokens, etc. later
// =================================================================
import type { AppConfig } from './types';

/**
 * Fetches the complete application config from the backend API.
 * The backend is the SINGLE source of truth — no local overrides.
 *
 * @param event - Optional event identifier (e.g. "valentine")
 * @returns The full AppConfig object that drives every part of the UI
 */
export async function fetchConfig(event?: string): Promise<AppConfig> {
  const url = event ? `/api/config?event=${event}` : '/api/config';
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch config: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
