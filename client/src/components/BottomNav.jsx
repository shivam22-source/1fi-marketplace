const NAV_ITEMS = [
  {
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M3 10.5L12 3L21 10.5V21H3V10.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9 21V14H15V21"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    label: "Shop",
    active: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M4 9H20V21H4V9Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M3 9L5 4H19L21 9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9 13H15V21H9V13Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    label: "EMI Dues",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect
          x="5"
          y="3"
          width="14"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8 8H16M8 12H16M8 16H13"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Limit",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M4 19V14M9 19V10M14 19V6M19 19V3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Profile",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="8"
          r="3.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M5 21C5.8 16.8 8.2 14.5 12 14.5C15.8 14.5 18.2 16.8 19 21"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function BottomNav() {
  return (
    <div className="bottom-nav">
      {NAV_ITEMS.map((item) => (
        <div
          key={item.label}
          className={`nav-item ${item.active ? "active" : ""}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}