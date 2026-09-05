export default function EMIPlanCard({ plan, selected, onSelect }) {
  return (
    <div
      className={`emi-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(plan.id)}
    >
      <div>
        <div className="emi-months">{plan.months} months</div>
        <div className="emi-sub">
          {plan.interestPct === 0
            ? "No interest"
            : `${plan.interestPct}% interest`}
        </div>
        {plan.interestPct === 0 && (
          <span className="badge-no-cost">No-cost EMI</span>
        )}
      </div>
      <div className="emi-amount">
        ₹{plan.monthlyAmount.toLocaleString("en-IN")}/mo
      </div>
    </div>
  );
}
