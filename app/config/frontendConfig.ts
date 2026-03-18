// =================================================================
// FRONTEND CONFIG - Static sections that don't change per event.
// These are bundled with the app and don't need a backend call.
// In production, you might use this for navigation, footer, etc.
// =================================================================

export const categoriesConfig = [
  { id: 'dairy', name: 'Dairy', emoji: '🥛' },
  { id: 'bakery', name: 'Bakery', emoji: '🍞' },
  { id: 'fruits', name: 'Fruits', emoji: '🍎' },
  { id: 'vegetables', name: 'Veggies', emoji: '🥦' },
  { id: 'snacks', name: 'Snacks', emoji: '🍿' },
  { id: 'beverages', name: 'Drinks', emoji: '🥤' },
  { id: 'meat', name: 'Meat', emoji: '🍗' },
  { id: 'frozen', name: 'Frozen', emoji: '🧊' },
];

export const staticSectionsConfig = {
  showCategories: true,
  showFeatured: true,
  showOfferStrip: true,
  showBannerCards: true,
  appName: 'QuickMart',
  appTagline: 'Groceries & more in 10 minutes',
};
