const express = require("express");
const cors = require("cors");
const products = require("./data/products.json");

const app = express();
app.use(cors());
app.use(express.json());

const DELAY_MS = 600; // simulates real network latency

// Utility to fake network delay + optional forced failure (for testing error states)
function withDelay(res, payload, fail = false) {
  setTimeout(() => {
    if (fail) {
      return res.status(500).json({ error: "Something went wrong. Please try again." });
    }
    res.json(payload);
  }, DELAY_MS);
}

// GET /api/products?fail=true -> list all products (fail param used only for manual testing)
app.get("/api/products", (req, res) => {
  const fail = req.query.fail === "true";
  withDelay(res, { products }, fail);
});

// GET /api/products/:id?fail=true -> single product detail
app.get("/api/products/:id", (req, res) => {
  const fail = req.query.fail === "true";
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found." });
  }
  withDelay(res, { product }, fail);
});

// POST /api/orders -> simulate creating an order/checkout with a selected EMI plan
app.post("/api/orders", (req, res) => {
  const { productId, variant, emiPlanId } = req.body;
  if (!productId || !emiPlanId) {
    return res.status(400).json({ error: "productId and emiPlanId are required." });
  }
  withDelay(res, {
    orderId: `ORD-${Date.now()}`,
    status: "confirmed",
    productId,
    variant,
    emiPlanId,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`1Fi Marketplace API running on port ${PORT}`));
