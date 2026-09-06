import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

export default function MarketplacePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
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

  const filteredProducts = products.filter((product) => {
    const text = `${product.name} ${product.brand}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

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
        <svg
          className="search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            d="M16.5 16.5L21 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />
      </div>

      <div className="section-heading">
        <span>1Fi Marketplace</span>
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/shop/marketplace/${product.id}`)}
            />
          ))
        ) : (
          <div className="placeholder-page">No products found.</div>
        )}
      </div>
    </div>
  );
}
