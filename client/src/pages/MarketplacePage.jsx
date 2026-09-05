import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

export default function MarketplacePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error

  const fetchProducts = useCallback(async () => {
    setStatus("loading");
    try {
      const data = await getProducts();
      setProducts(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (status === "loading") return <Loader label="Loading marketplace..." />;
  if (status === "error")
    return (
      <ErrorState
        title="Couldn't load the marketplace"
        description="Please check your connection and try again."
        onRetry={fetchProducts}
      />
    );

  return (
    <div>
      <div className="search-bar">
        <span>🔍</span>
        <input placeholder="Search products..." />
      </div>

      <div className="section-heading">
        <span>1Fi Marketplace</span>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/shop/marketplace/${product.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
