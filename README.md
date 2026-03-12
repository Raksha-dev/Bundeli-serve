# BundeliServe 🍛

A food delivery app inspired by the flavours of Bundelkhand, built with Next.js 14, Redux Toolkit, and Tailwind CSS.

## Features (MVP)
- 🏠 Home page with restaurant listings, search & filter
- 🔍 Filter by Veg Only, Open Now, Top Rated, Cafe
- 🍽️ Restaurant detail page with menu grouped by category
- ➕➖ Add/remove items with quantity controls
- 🛒 Cart managed with Redux Toolkit
- ⚠️ Cross-restaurant conflict detection
- 📦 Cart page with item management
- 📍 Delivery address form with validation
- ✅ Order confirmation page with animated success state
- 💵 Cash on Delivery only (Phase 1)

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **State Management**: Redux Toolkit + react-redux
- **Styling**: Tailwind CSS
- **Images**: next/image with Unsplash (static)
- **Data**: Static JSON (TypeScript)
- **Fonts**: Cormorant Garamond + DM Sans + DM Mono

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/app
  /page.tsx                   ← Home page
  /restaurant/[id]/page.tsx   ← Restaurant detail + menu
  /cart/page.tsx              ← Cart & checkout
  /order-confirmed/page.tsx   ← Success page
  /layout.tsx                 ← Root layout with Redux Provider
  /globals.css                ← Global styles & design tokens

/components
  /layout/Navbar.tsx          ← Top navigation with cart badge
  /RestaurantGrid.tsx         ← Search, filter, restaurant grid
  /RestaurantCard.tsx         ← Individual restaurant card
  /MenuSection.tsx            ← Menu grouped by category
  /MenuItemCard.tsx           ← Item card with +/- controls
  /CartBar.tsx                ← Sticky bottom cart bar

/store
  /cartSlice.ts               ← Redux cart slice (add/remove/clear)
  /store.ts                   ← Redux store config
  /provider.tsx               ← Client-side Redux Provider

/data
  /index.ts                   ← Static restaurant & menu data
```

## Phase 2 Roadmap
- [ ] User authentication (Supabase Auth)
- [ ] Real database (PostgreSQL via Prisma)
- [ ] Online payments (Razorpay)
- [ ] Order history
- [ ] Real-time order tracking
- [ ] Restaurant owner dashboard
- [ ] Promo codes
- [ ] Push notifications
```
