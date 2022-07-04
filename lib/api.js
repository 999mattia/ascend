export async function getAllProducts() {
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  return data;
}

export async function getAllNikeProducts() {
  const response = await fetch("/api/products/brands/nike");
  const data = await response.json();
  return data;
}

export async function getAllJordanProducts() {
  const response = await fetch("/api/products/brands/jordan");
  const data = await response.json();
  return data;
}

export async function getAllAdidasProducts() {
  const response = await fetch("/api/products/brands/adidas");
  const data = await response.json();
  return data;
}

export async function getProductById(id) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`);
  const data = await response.json();
  return data;
}

export async function createProduct(product) {
  const response = await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
  const data = await response.json();
  return data;
}

export async function updateProduct(product) {
  const response = await fetch(`/api/products/${product.id}`, {
    method: "PATCH",
    body: JSON.stringify(product),
  });
  const data = await response.json();
  return data;
}

export async function deleteProductById(id) {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });
}

export async function register(user) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
}

export async function getAllMessages() {
  const response = await fetch("/api/messages");
  const data = await response.json();
  return data;
}

export async function createMessage(message) {
  const response = await fetch("/api/messages", {
    method: "POST",
    body: JSON.stringify(message),
  });
  const data = await response.json();
  return data;
}

export async function createCart(cart) {
  const response = await fetch("/api/cart", {
    method: "POST",
    body: JSON.stringify(cart),
  });
  const data = await response.json();
  return data;
}

export async function getAllCarts() {
  const response = await fetch("/api/cart");
  const data = await response.json();
  return data;
}

export async function checkOut(products) {
  const response = await fetch("/api/cart/checkout", {
    method: "POST",
    body: JSON.stringify(products),
  });
}
