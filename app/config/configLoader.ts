// =================================================================
// CONFIG LOADER - Merges backend (API) and frontend (local) configs
// This is a core part of the config-driven UI architecture.
// =================================================================
import { categoriesConfig, staticSectionsConfig } from './frontendConfig';

export type ThemeConfig = {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  event: string | null;
  eventTagline: string | null;
  navStyle: 'default' | 'valentine';
};

export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  bgGradient: string;
  emoji: string;
};

export type OfferStrip = {
  text: string;
  bgColor: string;
  textColor: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  unit: string;
  emoji: string;
  tag: string | null;
};

export type BannerCard = {
  id: string;
  title: string;
  subtitle: string;
  bgGradient: string;
  emoji: string;
};

export type DeliveryInfo = {
  time: string;
  location: string;
};

export type BackendConfig = {
  theme: ThemeConfig;
  heroCarousel: HeroSlide[];
  offerStrip: OfferStrip;
  products: Product[];
  banners: BannerCard[];
  deliveryInfo: DeliveryInfo;
};

export type FrontendConfig = {
  categories: typeof categoriesConfig;
  staticSections: typeof staticSectionsConfig;
};

export type MergedConfig = BackendConfig & FrontendConfig;

export async function fetchBackendConfig(event?: string): Promise<BackendConfig> {
  const url = event ? `/api/config?event=${event}` : '/api/config';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch backend config');
  return res.json();
}

export async function getMergedConfig(event?: string): Promise<MergedConfig> {
  const backendConfig = await fetchBackendConfig(event);
  return {
    ...backendConfig,
    categories: categoriesConfig,
    staticSections: staticSectionsConfig,
  };
}
