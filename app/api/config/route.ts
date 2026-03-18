// =================================================================
// BACKEND CONFIG API - This is the KEY demo point!
// In production, this data comes from a CMS, database, or admin panel.
// The frontend renders UI purely based on this config response.
// Business/marketing teams can change the entire app look & feel
// WITHOUT any code deployment - just by updating this config.
// =================================================================
import { NextRequest, NextResponse } from 'next/server';

// ─── NORMAL DAY CONFIG ───────────────────────────────────────────────
const normalConfig = {
  theme: {
    name: 'default',
    primaryColor: '#6D28D9',
    secondaryColor: '#8B5CF6',
    accentColor: '#F59E0B',
    gradientFrom: '#6D28D9',
    gradientTo: '#4C1D95',
    event: null,
    eventTagline: null,
    navStyle: 'default' as const,
  },
  heroCarousel: [
    {
      id: 'hero1',
      title: 'Groceries delivered in 10 minutes',
      subtitle: 'Free delivery on orders above Rs.199',
      bgGradient: 'from-violet-600 to-purple-800',
      emoji: '🛒',
    },
    {
      id: 'hero2',
      title: 'Fresh Fruits & Vegetables',
      subtitle: 'Farm fresh, straight to your door',
      bgGradient: 'from-green-500 to-emerald-700',
      emoji: '🥬',
    },
  ],
  offerStrip: {
    text: '🔥 Use code QUICK50 for 50% off on your first order!',
    bgColor: '#F59E0B',
    textColor: '#000',
  },
  products: [
    { id: 1, name: 'Amul Toned Milk', price: 31, originalPrice: 34, unit: '500 ml', emoji: '🥛', tag: null },
    { id: 2, name: 'Brown Bread', price: 45, originalPrice: 50, unit: '400 g', emoji: '🍞', tag: 'Bestseller' },
    { id: 3, name: 'Farm Fresh Eggs', price: 89, originalPrice: 99, unit: '12 pcs', emoji: '🥚', tag: null },
    { id: 4, name: 'Aashirvaad Atta', price: 275, originalPrice: 310, unit: '5 kg', emoji: '🌾', tag: 'Great Price' },
    { id: 5, name: 'Maggi Noodles', price: 14, originalPrice: 14, unit: '70 g', emoji: '🍜', tag: 'Bestseller' },
    { id: 6, name: 'Amul Butter', price: 57, originalPrice: 60, unit: '100 g', emoji: '🧈', tag: null },
    { id: 7, name: 'Curd (Dahi)', price: 35, originalPrice: 40, unit: '400 g', emoji: '🫙', tag: null },
    { id: 8, name: 'Onion', price: 39, originalPrice: 45, unit: '1 kg', emoji: '🧅', tag: 'Deal' },
    { id: 9, name: 'Tomato', price: 29, originalPrice: 35, unit: '500 g', emoji: '🍅', tag: null },
    { id: 10, name: 'Banana', price: 45, originalPrice: 50, unit: '6 pcs', emoji: '🍌', tag: null },
    { id: 11, name: 'Coca Cola', price: 40, originalPrice: 40, unit: '750 ml', emoji: '🥤', tag: null },
    { id: 12, name: 'Lays Chips', price: 20, originalPrice: 20, unit: '52 g', emoji: '🍟', tag: 'Snack Time' },
  ],
  banners: [
    { id: 'b1', title: 'Flat 100 OFF', subtitle: 'On orders above Rs.499', bgGradient: 'from-amber-500 to-orange-600', emoji: '🎁' },
    { id: 'b2', title: 'Fresh Veggies', subtitle: 'Starting Rs.19/kg', bgGradient: 'from-green-500 to-teal-600', emoji: '🥦' },
    { id: 'b3', title: 'Dairy Specials', subtitle: 'Milk, Curd & more', bgGradient: 'from-blue-500 to-cyan-600', emoji: '🧀' },
  ],
  deliveryInfo: {
    time: '8-12 min',
    location: 'HSR Layout, Bangalore',
  },
};

// ─── VALENTINE'S DAY CONFIG ──────────────────────────────────────────
const valentinesConfig = {
  theme: {
    name: 'valentine',
    primaryColor: '#E11D48',
    secondaryColor: '#FB7185',
    accentColor: '#FDA4AF',
    gradientFrom: '#E11D48',
    gradientTo: '#9F1239',
    event: "Valentine's Day",
    eventTagline: 'Spread the Love',
    navStyle: 'valentine' as const,
  },
  heroCarousel: [
    {
      id: 'vhero1',
      title: "Valentine's Day Special",
      subtitle: 'Surprise your loved ones with gifts delivered in 10 mins',
      bgGradient: 'from-rose-500 to-pink-700',
      emoji: '💝',
    },
    {
      id: 'vhero2',
      title: 'Roses, Chocolates & More',
      subtitle: 'Curated hampers starting Rs.299',
      bgGradient: 'from-red-500 to-rose-700',
      emoji: '🌹',
    },
  ],
  offerStrip: {
    text: '💘 Use code LOVE20 for 20% off on Valentine gifts! 💘',
    bgColor: '#E11D48',
    textColor: '#fff',
  },
  products: [
    { id: 101, name: 'Red Roses Bouquet', price: 299, originalPrice: 499, unit: '12 stems', emoji: '🌹', tag: "Valentine's Pick" },
    { id: 102, name: 'Ferrero Rocher', price: 450, originalPrice: 550, unit: '16 pcs', emoji: '🍫', tag: 'Bestseller' },
    { id: 103, name: 'Heart Teddy Bear', price: 599, originalPrice: 799, unit: '12 inch', emoji: '🧸', tag: 'Trending' },
    { id: 104, name: 'Dairy Milk Silk', price: 175, originalPrice: 199, unit: '150 g', emoji: '🍬', tag: 'Must Have' },
    { id: 105, name: 'Scented Candles', price: 350, originalPrice: 500, unit: 'Set of 3', emoji: '🕯️', tag: 'Gift Idea' },
    { id: 106, name: 'Heart Balloons', price: 199, originalPrice: 250, unit: '5 pcs', emoji: '🎈', tag: null },
    { id: 107, name: 'Premium Cake', price: 649, originalPrice: 749, unit: '500 g', emoji: '🎂', tag: 'Fresh Baked' },
    { id: 108, name: 'Gift Card', price: 500, originalPrice: 500, unit: 'Rs.500 value', emoji: '💳', tag: null },
    { id: 109, name: 'Rose Wine', price: 899, originalPrice: 999, unit: '750 ml', emoji: '🍷', tag: 'Celebration' },
    { id: 110, name: 'Greeting Card', price: 99, originalPrice: 150, unit: '1 pc', emoji: '💌', tag: 'Personal' },
    { id: 111, name: 'Mixed Flowers', price: 499, originalPrice: 699, unit: 'Bunch', emoji: '💐', tag: 'Premium' },
    { id: 112, name: 'Photo Frame', price: 349, originalPrice: 450, unit: '6x8 inch', emoji: '🖼️', tag: 'Gift Idea' },
  ],
  banners: [
    { id: 'vb1', title: 'Gift Hampers from Rs.299', subtitle: 'Same-day delivery guaranteed', bgGradient: 'from-pink-500 to-rose-600', emoji: '🎁' },
    { id: 'vb2', title: 'Roses & Bouquets', subtitle: 'Fresh flowers, premium wrapping', bgGradient: 'from-red-500 to-pink-600', emoji: '🌹' },
    { id: 'vb3', title: 'Chocolate Combos', subtitle: 'Starting Rs.199 only', bgGradient: 'from-amber-600 to-red-600', emoji: '🍫' },
  ],
  deliveryInfo: {
    time: '10-15 min',
    location: 'HSR Layout, Bangalore',
  },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const event = searchParams.get('event');
  const today = new Date();
  const isValentine = event === 'valentine' || (today.getMonth() === 1 && today.getDate() === 14);
  const config = isValentine ? valentinesConfig : normalConfig;
  return NextResponse.json(config);
}
