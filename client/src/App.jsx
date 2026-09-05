import { Routes, Route, Navigate } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import TopBrandsPage from "./pages/TopBrandsPage";
import NearbyStoresPage from "./pages/NearbyStoresPage";
import MarketplacePage from "./pages/MarketplacePage";
import ProductDetail from "./pages/ProductDetail";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<Navigate to="/shop/marketplace" replace />} />

        <Route path="/shop" element={<ShopPage />}>
          <Route index element={<Navigate to="top-brands" replace />} />
          <Route path="top-brands" element={<TopBrandsPage />} />
          <Route path="nearby-stores" element={<NearbyStoresPage />} />
          <Route path="marketplace" element={<MarketplacePage />} />
          <Route path="marketplace/:id" element={<ProductDetail />} />
        </Route>
      </Routes>

      <BottomNav />
    </div>
  );
}
