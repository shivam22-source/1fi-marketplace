export default function ProductCard({ product, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={product.image} alt={product.name} />
      <p className="card-title">{product.name}</p>
      <p className="card-price">₹{product.price.toLocaleString("en-IN")}</p>
      <p className="card-subtitle">{product.brand}</p>
    </div>
  );
}
