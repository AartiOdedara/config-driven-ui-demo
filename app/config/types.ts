// =================================================================
// TYPES.TS — Single source of truth for ALL config-driven UI types
// =================================================================
// Every type here mirrors the shape of the JSON returned by the
// backend API (/api/config). The frontend never defines its own
// config data — it simply declares the *shape* it expects, then
// renders whatever the backend sends.
// =================================================================

// ─── Theme ───────────────────────────────────────────────────────
/** Controls colors, gradients, and event branding across the app */
export type ThemeConfig = {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  event: string | null;       // e.g. "Valentine's Day" — null on normal days
  eventTagline: string | null; // e.g. "Spread the Love"
  navStyle: 'default' | 'valentine';
};

// ─── Hero Carousel ───────────────────────────────────────────────
export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  bgGradient: string;  // Tailwind gradient classes, e.g. "from-violet-600 to-purple-800"
  emoji: string;
};

// ─── Offer Strip ─────────────────────────────────────────────────
export type OfferStripConfig = {
  text: string;
  bgColor: string;
  textColor: string;
};

// ─── Products ────────────────────────────────────────────────────
export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  unit: string;
  emoji: string;
  tag: string | null;  // e.g. "Bestseller", "Valentine's Pick"
};

// ─── Banners ─────────────────────────────────────────────────────
export type BannerCard = {
  id: string;
  title: string;
  subtitle: string;
  bgGradient: string;
  emoji: string;
};

// ─── Delivery Info ───────────────────────────────────────────────
export type DeliveryInfo = {
  time: string;
  location: string;
};

// ─── Categories ──────────────────────────────────────────────────
export type Category = {
  id: string;
  name: string;
  emoji: string;
};

// ─── App Info ────────────────────────────────────────────────────
export type AppInfo = {
  name: string;      // e.g. "QuickMart"
  tagline: string;   // e.g. "Groceries & more in 10 minutes"
};

// =================================================================
// LAYOUT — The backbone of the config-driven page composition
// =================================================================
// The backend returns an ordered array of SectionLayout items.
// The SectionRenderer iterates this array and renders each section
// in order. Re-ordering, adding, or removing sections requires
// ZERO code changes — just update the config on the server.
// =================================================================
export type SectionLayout = {
  id: string;          // unique section identifier
  type: string;        // maps to a component name in the registry
  props?: Record<string, unknown>;  // optional extra props for the section
};

// =================================================================
// ACTION CONFIG — Config-driven event handling
// =================================================================
// Instead of hard-coding onClick behavior, components look up an
// action by ID from this map. The EventEngine interprets the action
// descriptor at runtime.
//
// Supported action types:
//   "toast"              — show a message (supports {{variable}} interpolation)
//   "navigate"           — redirect to a URL
//   "validate_and_toast" — run validation first, then show success/error
// =================================================================
export type ActionConfig = {
  type: 'toast' | 'navigate' | 'validate_and_toast';
  message?: string;          // for "toast"
  url?: string;              // for "navigate"
  validationKey?: string;    // for "validate_and_toast" — references a key in validations map
  successMessage?: string;   // for "validate_and_toast"
  errorMessage?: string;     // for "validate_and_toast"
};

// =================================================================
// CONDITIONAL RENDERING CONFIG
// =================================================================
// Sections can have visibility rules evaluated at runtime.
// Each rule compares a field in the app context against a value
// using an operator.
//
// Example: show promo input ONLY during valentine event
//   { field: "event", operator: "eq", value: "valentine" }
// =================================================================
export type ConditionalRule = {
  field: string;                                        // key in the context object
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'contains' | 'isEmpty';
  value?: string | number | boolean;                     // not needed for "isEmpty"
};

export type ConditionConfig = {
  visible: boolean;           // default visibility when no rules match
  rules?: ConditionalRule[];  // if ALL rules pass → section is visible
};

// =================================================================
// VALIDATION CONFIG
// =================================================================
// Input fields are validated against rules defined in the backend.
// The ValidationEngine checks each rule and returns config-defined
// error messages. No validation logic is hard-coded in components.
//
// Supported rules: required, minLength, maxLength, pattern (regex)
// =================================================================
export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;          // regex pattern string, e.g. "^[A-Z0-9]+$"
  messages: {
    required?: string;
    minLength?: string;
    maxLength?: string;
    pattern?: string;
  };
};

// =================================================================
// APP CONFIG — The top-level type returned by the backend API
// =================================================================
// This is the SINGLE object that drives the entire UI.
// Every component, every section, every button action, every
// validation rule — all defined here.
// =================================================================
export type AppConfig = {
  theme: ThemeConfig;
  appInfo: AppInfo;
  categories: Category[];
  heroCarousel: HeroSlide[];
  offerStrip: OfferStripConfig;
  products: Product[];
  banners: BannerCard[];
  deliveryInfo: DeliveryInfo;

  productColumns: number; // Number of columns in the product grid (used by ProductList)

  // Layout: ordered list of sections to render on the page
  layout: SectionLayout[];

  // Event handling: map of actionId → action descriptor
  actions: Record<string, ActionConfig>;

  // Conditional rendering: map of sectionId → visibility rules
  conditions: Record<string, ConditionConfig>;

  // Validation: map of fieldName → validation rules
  validations: Record<string, ValidationRule>;
};
