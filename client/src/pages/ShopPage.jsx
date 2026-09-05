import { useNavigate, useLocation, Outlet } from "react-router-dom";

const TABS = [
  { key: "top-brands", label: "Top Brands", path: "/shop/top-brands" },
  { key: "nearby-stores", label: "Nearby Stores", path: "/shop/nearby-stores" },
  { key: "marketplace", label: "1Fi Marketplace", path: "/shop/marketplace" },
];

export default function ShopPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab =
    TABS.find((t) => location.pathname.startsWith(t.path))?.key || "top-brands";

  return (
    <div>
      <div className="tab-bar">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => navigate(tab.path)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Nested route content (Top Brands / Nearby Stores / Marketplace) renders here */}
      <Outlet />
    </div>
  );
}
