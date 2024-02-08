export async function fetchProducts() {
  const response = await fetch("http://localhost:3000/products");
  return response.json();
}

export async function fetchProduct(id) {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching product:", error.message);
    throw error;
  }
}

export async function createProduct(newProduct) {
  const response = await fetch(`http://localhost:3000/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });
  return response.json();
}

export async function updateProduct(updatedProduct) {
  const response = await fetch(
    `http://localhost:3000/products/${updatedProduct.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    }
  );
  return response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
