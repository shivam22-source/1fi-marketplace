# 1Fi Marketplace — SDE Intern Assignment

A React + Express implementation of the **1Fi Marketplace** section inside the Shop page,
matching 1Fi's existing purple/pill-based design system.

## What's implemented

- Shop page with 3 tabs: **Top Brands** (blank), **Nearby Stores** (blank), **1Fi Marketplace** (fully built)
- Marketplace product listing (grid, fetched from a mock API — nothing hardcoded in components)
- Product detail screen: image, price, description, variant selector, selectable EMI plans, and a CTA to proceed
- Loading and error states (with retry) on every screen that fetches data
- Reusable components: `ProductCard`, `EMIPlanCard`, `Loader`, `ErrorState`, `BottomNav`
- Mock Express API serving product + EMI data, with a simulated network delay

## Folder structure

```
1fi-marketplace/
├── server/                 Express mock API
│   ├── data/products.json  Mock product + EMI data
│   ├── index.js            API routes (GET /products, GET /products/:id, POST /orders)
│   └── package.json
│
└── client/                 React (Vite) frontend
    └── src/
        ├── api/productApi.js       All fetch calls (centralized)
        ├── components/             ProductCard, EMIPlanCard, Loader, ErrorState, BottomNav
        ├── pages/                  ShopPage, TopBrandsPage, NearbyStoresPage, MarketplacePage, ProductDetail
        ├── App.jsx                 Routes
        ├── main.jsx                Entry point
        └── index.css               Global styles (purple accent, pill shapes, cards)
```

## How to run — exact steps

You need **Node.js** installed (v18+ recommended). Run the backend and frontend in **two separate terminals**.

### 1. Start the backend (API server)

```bash
cd 1fi-marketplace/server
npm install
npm start
```

This runs on **http://localhost:5000**. Confirm it works by opening
`http://localhost:5000/api/products` in a browser — you should see JSON product data.

### 2. Start the frontend (React app)

Open a **new terminal** (keep the server running in the first one):

```bash
cd 1fi-marketplace/client
npm install
npm run dev
```

This runs on **http://localhost:5173**. Open that URL in your browser — you'll land on the
Marketplace tab directly.

### 3. What you should see

- Three pill tabs at the top (Top Brands / Nearby Stores / 1Fi Marketplace)
- Marketplace tab shows a product grid (Samsung phone, MacBook, headphones, earbuds)
- Tap any product → detail screen with variant chips, EMI plan cards, and a "Continue" CTA
- Bottom nav bar (Home / Shop / EMI Dues / Limit / Profile) always visible

## Notes / assumptions

- Since backend integration to the real 1Fi app isn't available, product and EMI data are served
  from a local mock Express API instead of hardcoded in the UI, as allowed by the assignment.
- Top Brands and Nearby Stores are intentionally left blank per the assignment's scope.
- Checkout ("Continue" button) calls a mock `/api/orders` endpoint and shows a confirmation —
  no real payment integration, since that's out of scope.
- Visual style (purple accent `#6D3AF0`, pill-shaped tabs/buttons/chips, white rounded cards on
  a light grey background) was reverse-engineered from the reference screenshots of the existing
  Shop page to keep the Marketplace section visually consistent.

## Possible next steps (not required, just noted)

- Add product search/filter functionality (search bar is present but not wired up yet)
- Persist selected EMI plan across screens using URL state or context
- Add unit tests for API layer and EMI calculation logic
