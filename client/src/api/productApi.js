const BASE_URL = "http://localhost:5000/api";

async function handleResponse(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Something went wrong. Please try again.");
  }
  return res.json();
}

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await handleResponse(res);
  return data.products;
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  const data = await handleResponse(res);
  return data.product;
}

export async function createOrder({ productId, variant, emiPlanId }) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, variant, emiPlanId }),
  });
  return handleResponse(res);
}
