import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, createOrder } from "../api/productApi";
import EMIPlanCard from "../components/EMIPlanCard";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedEmiId, setSelectedEmiId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchProduct = useCallback(async () => {
    setStatus("loading");
    try {
      const data = await getProductById(id);
      setProduct(data);
      setSelectedVariant(data.variants?.[0] || null);
      setSelectedEmiId(data.emiPlans?.[0]?.id || null);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  async function handleProceed() {
    if (!selectedEmiId) return;
    setSubmitting(true);
    try {
      await createOrder({
        productId: product.id,
        variant: selectedVariant,
        emiPlanId: selectedEmiId,
      });
      alert("Order placed! (This is a mock checkout for the assignment.)");
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "loading") return <Loader label="Loading product..." />;
  if (status === "error")
    return (
      <ErrorState
        title="Couldn't load this product"
        description="Please check your connection and try again."
        onRetry={fetchProduct}
      />
    );

  return (
    <div>
      <div className="detail-header">
        <span className="back" onClick={() => navigate(-1)}>
          ←
        </span>
        <span>Product details</span>
      </div>

      <div className="detail-hero">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="detail-body">
        <p className="detail-name">{product.name}</p>
        <p className="detail-price">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
        <p className="detail-desc">{product.description}</p>

        {product.variants?.length > 0 && (
          <>
            <p className="subheading">Select variant</p>
            <div className="chip-row">
              {product.variants.map((variant) => (
                <div
                  key={variant}
                  className={`chip ${selectedVariant === variant ? "selected" : ""}`}
                  onClick={() => setSelectedVariant(variant)}
                >
                  {variant}
                </div>
              ))}
            </div>
          </>
        )}

        <p className="subheading">Choose your EMI plan</p>
        {product.emiPlans.map((plan) => (
          <EMIPlanCard
            key={plan.id}
            plan={plan}
            selected={selectedEmiId === plan.id}
            onSelect={setSelectedEmiId}
          />
        ))}
      </div>

      <div className="cta-bar">
        <button
          className="cta-button"
          disabled={!selectedEmiId || submitting}
          onClick={handleProceed}
        >
          {submitting ? "Processing..." : "Continue"} <span>→</span>
        </button>
      </div>
    </div>
  );
}
