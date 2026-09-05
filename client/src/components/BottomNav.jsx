const NAV_ITEMS = [
  { icon: "🏠", label: "Home" },
  { icon: "🛍️", label: "Shop", active: true },
  { icon: "🧾", label: "EMI Dues" },
  { icon: "📈", label: "Limit" },
  { icon: "👤", label: "Profile" },
];

export default function BottomNav() {
  return (
    <div className="bottom-nav">
      {NAV_ITEMS.map((item) => (
        <div key={item.label} className={`nav-item ${item.active ? "active" : ""}`}>
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
